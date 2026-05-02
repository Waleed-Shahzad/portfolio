"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative isolate py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Trajectory"
          title="Seven years, five teams, one craft"
          description="Each role compounded the last — frontend mastery to full-stack ownership to leading teams that ship."
        />

        <div ref={ref} className="relative mt-20">
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px bg-[--color-border-strong] sm:left-1/2 sm:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-px origin-top bg-[linear-gradient(180deg,var(--color-accent-cyan),var(--color-accent-violet),var(--color-accent-pink))] sm:left-1/2 sm:-translate-x-1/2"
          />

          <ul className="space-y-12 sm:space-y-16">
            {experience.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={item.company} className="relative">
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-4 top-3 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[--color-accent-cyan] shadow-[0_0_0_4px_var(--color-bg-base),0_0_24px_var(--color-accent-glow)] sm:left-1/2"
                  />

                  <motion.article
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`glass-card relative ml-12 rounded-2xl p-6 sm:ml-0 sm:w-[calc(50%-2rem)] sm:p-7 ${
                      isLeft ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                    }`}
                  >
                    <div
                      className={`flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[--color-accent-cyan] ${
                        isLeft ? "sm:justify-end" : ""
                      }`}
                    >
                      <Briefcase className="h-3.5 w-3.5" />
                      {item.period}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-[--color-text-primary] sm:text-2xl">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-[--color-text-muted]">
                      {item.company}
                    </p>

                    <ul className={`mt-5 space-y-2 text-sm leading-relaxed text-[--color-text-muted] ${isLeft ? "sm:text-right" : ""}`}>
                      {item.bullets.slice(0, 3).map((b) => (
                        <li
                          key={b}
                          className={`flex gap-2 ${isLeft ? "sm:justify-end sm:flex-row-reverse" : ""}`}
                        >
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[--color-accent-cyan]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {item.projects.length ? (
                      <div className={`mt-5 flex flex-wrap gap-2 ${isLeft ? "sm:justify-end" : ""}`}>
                        {item.projects.map((p) => (
                          <span
                            key={p}
                            className="inline-flex items-center rounded-full border border-[--color-border-subtle] bg-[--color-bg-elevated]/70 px-3 py-1 text-xs text-[--color-text-muted]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </motion.article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
