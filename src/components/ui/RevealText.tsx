"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/cn";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type RevealTextProps = {
  text: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span";
  className?: string;
  wordClassName?: string;
};

export function RevealText({
  text,
  as: Tag = "p",
  className,
  wordClassName,
}: RevealTextProps) {
  const words = text.split(" ");

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("flex flex-wrap gap-x-2", className)}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="overflow-hidden inline-flex"
        >
          <motion.span
            variants={word}
            className={cn("inline-block", wordClassName)}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
