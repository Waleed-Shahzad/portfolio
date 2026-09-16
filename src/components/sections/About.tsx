"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Layers,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealText } from "@/components/ui/RevealText";
import { stats, profile } from "@/data/stats";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { accents, accentVars, type Accent } from "@/lib/accents";

const valueProps = [
  {
    Icon: Code2,
    accent: accents.cyan,
    title: "Production-grade craft",
    body: "Clean architectures, typed contracts, and a relentless focus on what runs in production — not just the demo.",
  },
  {
    Icon: Layers,
    accent: accents.violet,
    title: "Full-stack fluency",
    body: "Comfortable across the seam — Node/Express APIs, SQL or NoSQL, React/Next on the web, React Native on mobile.",
  },
  {
    Icon: Rocket,
    accent: accents.pink,
    title: "Performance obsessed",
    body: "Profiling, caching strategies, and database tuning. Recently shipped a 40% speed-up on a live SaaS platform.",
  },
  {
    Icon: ShieldCheck,
    accent: accents.emerald,
    title: "Security & compliance",
    body: "Regular audits, hardened authentication, and security baked into every PR — not bolted on at the end.",
  },
];

const statAccents: Accent[] = [
  accents.cyan,
  accents.violet,
  accents.pink,
  accents.emerald,
];

const facts = [
  { Icon: MapPin, label: "Based in", value: profile.location },
  { Icon: Layers, label: "Day-to-day", value: "MERN · TypeScript · AWS" },
  { Icon: Sparkles, label: "Focus", value: "Web & mobile products" },
];

/** Decorative concentric-orbit mark used in the status panel. */
function OrbitMark() {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className="h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id="about-orbit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-cyan)" />
          <stop offset="100%" stopColor="var(--color-accent-violet)" />
        </linearGradient>
      </defs>

      <g fill="none" stroke="url(#about-orbit)">
        <circle cx="100" cy="100" r="34" opacity="0.55" />
        <circle cx="100" cy="100" r="62" opacity="0.35" />
        <circle cx="100" cy="100" r="90" opacity="0.18" strokeDasharray="4 8" />
      </g>

      <circle cx="100" cy="100" r="9" fill="url(#about-orbit)" opacity="0.9" />

      <g
        className="animate-[spin_16s_linear_infinite]"
        style={{ transformOrigin: "100px 100px", transformBox: "view-box" }}
      >
        <circle cx="134" cy="100" r="4" fill="var(--color-accent-cyan)" />
      </g>
      <g
        className="animate-[spin_26s_linear_infinite_reverse]"
        style={{ transformOrigin: "100px 100px", transformBox: "view-box" }}
      >
        <circle cx="100" cy="38" r="3.5" fill="var(--color-accent-violet)" />
      </g>
      <g
        className="animate-[spin_38s_linear_infinite]"
        style={{ transformOrigin: "100px 100px", transformBox: "view-box" }}
      >
        <circle cx="10" cy="100" r="3" fill="var(--color-accent-pink)" />
      </g>
    </svg>
  );
}

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
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(6,182,212,0.45),rgba(168,85,247,0.45),transparent)]" />
        <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_35%,#000,transparent)]" />
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18),transparent_70%)] blur-2xl" />
        <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.16),transparent_70%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div style={reduced ? undefined : { y: headingY }}>
          <SectionHeading
            eyebrow="About"
            title="Engineering products with motion, polish, and intent"
            description="I lead small, high-trust teams to ship web and mobile applications that hold up under real users. Below is the short version — the long version is on the rest of this page."
          />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-8">
            <div className="relative pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-1.5 bottom-1.5 w-px bg-[linear-gradient(180deg,var(--color-accent-cyan),var(--color-accent-violet),transparent)]"
              />
              <RevealText
                text={profile.summary}
                className="text-lg leading-relaxed text-[--color-text-muted] md:text-xl"
              />
            </div>

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
                  style={accentVars(v.accent)}
                  className="group glass-card relative overflow-hidden rounded-2xl p-5 transition-colors hover:border-[var(--a-line)]"
                  data-cursor="hover"
                >
                  {/* corner glow, revealed on hover */}
                  <span
                    aria-hidden
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, var(--a-glow), transparent 70%)",
                    }}
                  />
                  <span className="sheen absolute inset-0 overflow-hidden rounded-2xl" />

                  <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.25em] text-[--color-text-subtle]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--a-soft)",
                      color: "var(--a)",
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ["--tw-ring-color" as any]: "var(--a-line)",
                      boxShadow: "0 0 24px -8px var(--a-glow)",
                    }}
                  >
                    <v.Icon className="h-5 w-5" />
                  </div>

                  <h3 className="relative mt-4 text-base font-semibold text-[--color-text-primary]">
                    {v.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-[--color-text-muted]">
                    {v.body}
                  </p>

                  {/* underline that draws in on hover */}
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--a), transparent)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4 self-start">
            <motion.div
              style={reduced ? undefined : { scale: statsScale }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s, i) => {
                const accent = statAccents[i % statAccents.length];
                return (
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
                    style={accentVars(accent)}
                    className="group glass-card relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-[var(--a-line)]"
                  >
                    {/* top edge accent */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, var(--a), transparent)",
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                      style={{
                        background:
                          "radial-gradient(circle, var(--a-glow), transparent 70%)",
                      }}
                    />
                    <span
                      aria-hidden
                      className="hatch absolute -bottom-2 -right-2 h-16 w-16 opacity-30 [mask-image:linear-gradient(315deg,#000,transparent)]"
                    />

                    <div className="relative">
                      <div
                        className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                        style={{
                          backgroundImage:
                            "linear-gradient(140deg, #ffffff 15%, var(--a) 110%)",
                        }}
                      >
                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="mt-2 flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1 w-5 shrink-0 rounded-full"
                          style={{ background: "var(--a)" }}
                        />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[--color-text-subtle]">
                          {s.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Status panel — fills the column and adds a graphic anchor */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group glass-card relative overflow-hidden rounded-2xl p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-14 top-1/2 h-44 w-44 -translate-y-1/2 opacity-40 sm:-right-12 sm:h-56 sm:w-56 sm:opacity-70"
              >
                <OrbitMark />
              </div>

              <div className="relative max-w-[72%] sm:max-w-[62%]">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.1)] px-3 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                    Open to work
                  </span>
                </div>

                <dl className="mt-5 space-y-3.5">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-start gap-3">
                      <f.Icon className="mt-0.5 h-4 w-4 shrink-0 text-[--color-accent-cyan]" />
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-text-subtle]">
                          {f.label}
                        </dt>
                        <dd className="text-sm text-[--color-text-primary]">
                          {f.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
