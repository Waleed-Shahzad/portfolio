"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";

import { sendContactEmail, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/cn";

const initial: ContactState = { status: "idle", message: "" };

type FieldProps = {
  label: string;
  name: "name" | "email" | "subject" | "message";
  type?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
  autoComplete?: string;
  rows?: number;
};

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  error,
  autoComplete,
  rows = 5,
}: FieldProps) {
  const inputClasses = cn(
    "peer w-full resize-none rounded-2xl border bg-[--color-bg-base]/60 px-4 pt-6 pb-2 text-sm text-[--color-text-primary] placeholder-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[--color-bg-elevated]",
    error
      ? "border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/40"
      : "border-[--color-border-strong] focus:border-[--color-accent-cyan] focus:ring-[--color-accent-cyan]/40"
  );
  const labelClasses = cn(
    "pointer-events-none absolute left-4 top-2 text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-200",
    "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case",
    "peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-[0.2em]",
    error
      ? "text-rose-400 peer-placeholder-shown:text-rose-400/70"
      : "text-[--color-accent-cyan] peer-placeholder-shown:text-[--color-text-subtle] peer-focus:text-[--color-accent-cyan]"
  );

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={rows}
          placeholder=" "
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder=" "
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={inputClasses}
        />
      )}
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 ml-1 text-xs text-rose-400"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactEmail, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[--color-accent-cyan]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[--color-accent-violet]/15 blur-3xl"
      />

      <div className="relative">
        <h3 className="text-xl font-semibold text-[--color-text-primary] sm:text-2xl">
          Send a message
        </h3>
        <p className="mt-1 text-sm text-[--color-text-muted]">
          Fill the form — it lands directly in my inbox. Replies usually within 24 hours.
        </p>

        <form ref={formRef} action={action} className="mt-7 space-y-5" noValidate>
          {/* honeypot — invisible to humans, catches naive bots */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="Your name"
              name="name"
              required
              autoComplete="name"
              error={state.fieldErrors?.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              error={state.fieldErrors?.email}
            />
          </div>
          <Field
            label="Subject"
            name="subject"
            required
            error={state.fieldErrors?.subject}
          />
          <Field
            label="Message"
            name="message"
            textarea
            required
            error={state.fieldErrors?.message}
          />

          <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <AnimatePresence mode="wait">
              {state.status !== "idle" ? (
                <motion.div
                  key={state.status + state.message}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs",
                    state.status === "success"
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-rose-500/40 bg-rose-500/10 text-rose-300"
                  )}
                  role={state.status === "error" ? "alert" : "status"}
                >
                  {state.status === "success" ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5" />
                  )}
                  {state.message}
                </motion.div>
              ) : (
                <span className="hidden sm:block" />
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={pending}
              whileHover={{ scale: pending ? 1 : 1.02 }}
              whileTap={{ scale: pending ? 1 : 0.98 }}
              className={cn(
                "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent-cyan] focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-bg-base]",
                pending
                  ? "cursor-wait bg-[--color-bg-elevated] text-[--color-text-muted]"
                  : "bg-[linear-gradient(120deg,var(--color-accent-cyan),var(--color-accent-violet))] text-[--color-bg-base] shadow-[--shadow-glow-cyan] hover:brightness-110"
              )}
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  Send message
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
