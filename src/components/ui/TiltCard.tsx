"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function TiltCard({ children, className, intensity = 8 }: TiltCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -intensity, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
