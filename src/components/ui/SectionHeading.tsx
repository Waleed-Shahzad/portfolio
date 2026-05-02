"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-[--color-border-strong] bg-[--color-bg-card] px-4 py-1 text-xs font-mono uppercase tracking-[0.2em] text-[--color-accent-cyan]"
      >
        <span className="block h-1.5 w-1.5 rounded-full bg-[--color-accent-cyan] animate-pulse-glow" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[--color-text-primary] sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[--color-text-muted] md:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
