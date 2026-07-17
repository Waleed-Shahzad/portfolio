"use client";

import { type RefObject, useRef } from "react";
import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";

type Shape = {
  size: number;
  top: string;
  left: string;
  color: string;
  parallax: number;
};

const SHAPES: Shape[] = [
  { size: 320, top: "5%", left: "8%", color: "rgba(6, 182, 212, 0.20)", parallax: 120 },
  { size: 220, top: "60%", left: "85%", color: "rgba(168, 85, 247, 0.20)", parallax: -160 },
  { size: 180, top: "75%", left: "10%", color: "rgba(236, 72, 153, 0.16)", parallax: 80 },
  { size: 140, top: "20%", left: "70%", color: "rgba(16, 185, 129, 0.14)", parallax: -100 },
];

function FloatingBlob({
  shape,
  progress,
  reduced,
}: {
  shape: Shape;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const y = useTransform(progress, [0, 1], [0, shape.parallax]);

  return (
    <motion.span
      className="absolute block rounded-full will-change-transform"
      style={{
        width: shape.size,
        height: shape.size,
        top: shape.top,
        left: shape.left,
        background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
        ...(reduced ? {} : { y }),
      }}
    />
  );
}

export function FloatingShapes() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {SHAPES.map((s, i) => (
        <FloatingBlob key={i} shape={s} progress={scrollYProgress} reduced={reduced} />
      ))}
    </div>
  );
}
