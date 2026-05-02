"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Layers, Rocket, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealText } from "@/components/ui/RevealText";
import { stats, profile } from "@/data/stats";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const valueProps = [
  {
    Icon: Code2,
    title: "Production-grade craft",
    body: "Clean architectures, typed contracts, and a relentless focus on what runs in production — not just the demo.",
  },
  {
    Icon: Layers,
    title: "Full-stack fluency",
    body: "Comfortable across the seam — Node/Express APIs, SQL or NoSQL, React/Next on the web, React Native on mobile.",
  },
  {
    Icon: Rocket,
    title: "Performance obsessed",
    body: "Profiling, caching strategies, and database tuning. Recently shipped a 40% speed-up on a live SaaS platform.",
  },
  {
    Icon: ShieldCheck,
    title: "Security & compliance",
    body: "Regular audits, hardened authentication, and security baked into every PR — not bolted on at the end.",
  },
];

export function About() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const statsScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);

  return (
    <section ref={ref} id="about" className="relative isolate py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div style={reduced ? undefined : { y: headingY }}>
          <SectionHeading
            eyebrow="About"
            title="Engineering products with motion, polish, and intent"
            description="I lead small, high-trust teams to ship web and mobile applications that hold up under real users. Below is the short version — the long version is on the rest of this page."
          />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-6">
            <RevealText
              text={profile.summary}
              className="text-lg leading-relaxed text-[--color-text-muted] md:text-xl"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {valueProps.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="group glass-card relative rounded-2xl p-5 transition-colors hover:border-[--color-accent-cyan]/40"
                  data-cursor="hover"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[--color-accent-cyan]/10 text-[--color-accent-cyan] transition-transform group-hover:scale-110">
                    <v.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[--color-text-primary]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[--color-text-muted]">
                    {v.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            style={reduced ? undefined : { scale: statsScale }}
            className="grid grid-cols-2 gap-4 self-start"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="glass-card group relative overflow-hidden rounded-2xl p-6"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[linear-gradient(120deg,var(--color-accent-cyan),var(--color-accent-violet))] opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
                />
                <div className="relative">
                  <div className="text-4xl font-semibold tracking-tight text-[--color-text-primary] sm:text-5xl">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-[--color-text-subtle]">
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
