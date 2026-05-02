"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { profile } from "@/data/stats";
import { FloatingShapes } from "@/components/ui/FloatingShapes";

const channels = [
  {
    Icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    accent: "var(--color-accent-cyan)",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phoneRaw}`,
    accent: "var(--color-accent-violet)",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/waleed-shahzad",
    href: profile.linkedin,
    accent: "var(--color-accent-pink)",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <FloatingShapes />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Let&rsquo;s talk"
          title="Got something interesting to build?"
          description="Whether it&rsquo;s a greenfield product, a stalled one that needs rescuing, or a team that needs a steady technical lead — I&rsquo;d love to hear about it."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(0,_1.15fr)] lg:gap-10">
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-base leading-relaxed text-[--color-text-muted] md:text-lg"
            >
              Pick whichever channel suits you — or use the form. Either way,
              messages land in the same inbox.
            </motion.p>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map((c, i) => (
                <motion.li
                  key={c.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={c.href}
                    target={c.label === "LinkedIn" ? "_blank" : undefined}
                    rel={
                      c.label === "LinkedIn" ? "noopener noreferrer" : undefined
                    }
                    className="glass-card group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[--color-accent-cyan]/40"
                  >
                    <span
                      className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                      style={{ background: c.accent }}
                      aria-hidden
                    />
                    <span
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${c.accent}20`, color: c.accent }}
                    >
                      <c.Icon className="h-5 w-5" />
                    </span>
                    <div className="relative min-w-0">
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[--color-text-subtle]">
                        {c.label}
                      </div>
                      <div className="mt-1 truncate text-sm text-[--color-text-primary] sm:text-base">
                        {c.value}
                      </div>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-2 flex items-center gap-2 text-sm text-[--color-text-subtle]"
            >
              <MapPin className="h-4 w-4" />
              {profile.location}
            </motion.div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
