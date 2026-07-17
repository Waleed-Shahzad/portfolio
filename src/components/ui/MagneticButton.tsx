"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  download?: boolean;
  target?: string;
  rel?: string;
  className?: string;
  "aria-label"?: string;
};

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  download,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent-cyan] focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-bg-base]";

  const variants = {
    primary:
      "text-[--color-bg-base] shadow-[--shadow-glow-cyan] bg-[linear-gradient(120deg,var(--color-accent-cyan),var(--color-accent-violet))] hover:brightness-110",
    ghost:
      "text-[--color-text-primary] border border-[--color-border-strong] hover:border-[--color-accent-cyan] hover:text-[--color-accent-cyan]",
  } as const;

  return (
    <motion.a
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      href={href}
      download={download}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </motion.a>
  );
}
