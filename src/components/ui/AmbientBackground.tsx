"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";

const blobs = [
  {
    size: 620,
    top: "-10%",
    left: "-8%",
    color: "rgba(6, 182, 212, 0.30)",
    duration: 22,
    motion: { x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.95, 1] },
  },
  {
    size: 540,
    top: "20%",
    left: "60%",
    color: "rgba(168, 85, 247, 0.28)",
    duration: 26,
    motion: { x: [0, -70, 50, 0], y: [0, 60, -40, 0], scale: [1, 0.92, 1.08, 1] },
  },
  {
    size: 480,
    top: "65%",
    left: "5%",
    color: "rgba(236, 72, 153, 0.22)",
    duration: 20,
    motion: { x: [0, 50, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.12, 0.96, 1] },
  },
  {
    size: 440,
    top: "75%",
    left: "65%",
    color: "rgba(16, 185, 129, 0.18)",
    duration: 24,
    motion: { x: [0, -60, 30, 0], y: [0, 40, -50, 0], scale: [1, 1.08, 0.94, 1] },
  },
];

export function AmbientBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-30 overflow-hidden"
    >
      {/* slow rotating conic wash */}
      <motion.div
        className="absolute -inset-[40%]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0%, rgba(6, 182, 212, 0.10) 14%, transparent 28%, rgba(168, 85, 247, 0.12) 50%, transparent 64%, rgba(236, 72, 153, 0.10) 82%, transparent 100%)",
          filter: "blur(40px)",
        }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      {/* floating gradient blobs */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
            filter: "blur(70px)",
            mixBlendMode: "screen",
          }}
          animate={reduced ? undefined : b.motion}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* aurora vertical ribbon */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(6, 182, 212, 0.10) 0%, transparent 100%)",
          mixBlendMode: "screen",
        }}
        animate={reduced ? undefined : { y: [0, 40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background:
            "linear-gradient(0deg, rgba(168, 85, 247, 0.10) 0%, transparent 100%)",
          mixBlendMode: "screen",
        }}
        animate={reduced ? undefined : { y: [0, -40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* faint grid overlay */}
      <div
        className="absolute inset-0 grid-pattern opacity-[0.18]"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(7, 7, 11, 0.55) 100%)",
        }}
      />
    </div>
  );
}
