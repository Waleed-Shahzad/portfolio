"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Pause } from "lucide-react";

import { useAnimations } from "@/components/providers/AnimationProvider";

export function AnimationToggle() {
  const { enabled, toggle } = useAnimations();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Pause background animations" : "Enable background animations"}
      aria-pressed={enabled}
      title={enabled ? "Pause animations" : "Enable animations"}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="group fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[--color-border-strong] bg-[--color-bg-elevated]/85 text-[--color-text-primary] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors hover:border-[--color-accent-cyan]/60 hover:text-[--color-accent-cyan] sm:bottom-6 sm:right-6"
    >
      {/* glow ring when active */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${
          enabled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          boxShadow:
            "0 0 0 1px rgba(6, 182, 212, 0.35), 0 0 24px -2px rgba(6, 182, 212, 0.45)",
        }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {enabled ? (
          <motion.span
            key="on"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            <Sparkles className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            <Pause className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>

      <span className="sr-only">{enabled ? "Animations on" : "Animations off"}</span>

      {/* tooltip */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-[--color-border-strong] bg-[--color-bg-elevated]/90 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[--color-text-muted] opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
        {enabled ? "Pause motion" : "Resume motion"}
      </span>
    </motion.button>
  );
}
