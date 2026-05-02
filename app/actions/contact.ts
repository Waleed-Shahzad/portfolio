"use server";

import { Resend } from "resend";
import { z } from "zod";

import { profile } from "@/data/stats";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
};

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email"),
  subject: z.string().trim().min(3, "Subject is too short").max(120),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
  // honeypot — spam bots usually fill every field; humans never see it
  company: z.string().max(0).optional(),
});

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  // honeypot triggered — pretend success
  if (parsed.data.company) {
    return { status: "success", message: "Thanks — message sent." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing");
    return {
      status: "error",
      message: "Email service is not configured yet. Please email me directly.",
    };
  }

  const to = process.env.CONTACT_EMAIL ?? profile.email;
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

  const { name, email, subject, message } = parsed.data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio inquiry — ${subject}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;background:#f8fafc;padding:24px;color:#0f172a">
          <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0">
            <div style="padding:20px 24px;background:linear-gradient(120deg,#06b6d4,#a855f7);color:#fff">
              <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.85">New message</div>
              <div style="font-size:18px;font-weight:600;margin-top:4px">${safeSubject}</div>
            </div>
            <div style="padding:24px">
              <table style="width:100%;font-size:14px;line-height:1.6">
                <tr><td style="color:#64748b;width:80px">Name</td><td style="font-weight:500">${safeName}</td></tr>
                <tr><td style="color:#64748b">Email</td><td><a href="mailto:${safeEmail}" style="color:#0891b2;text-decoration:none">${safeEmail}</a></td></tr>
                <tr><td style="color:#64748b;vertical-align:top;padding-top:12px">Message</td><td style="padding-top:12px;white-space:pre-wrap">${safeMessage}</td></tr>
              </table>
            </div>
            <div style="padding:14px 24px;background:#f1f5f9;font-size:12px;color:#64748b">
              Sent from waleed-shahzad.vercel.app
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return {
        status: "error",
        message:
          "Couldn't send right now. Please try again, or email me directly.",
      };
    }

    return {
      status: "success",
      message: "Message sent — I'll get back to you within 24 hours.",
    };
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return {
      status: "error",
      message: "Something broke on my end. Please email me directly.",
    };
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
