"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { accents, accentVars, type Accent } from "@/lib/accents";

/** Card accents follow the timeline gradient from top to bottom. */
const cardAccents: Accent[] = [accents.cyan, accents.violet, accents.pink];

export function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.4"],
  });
  // scaleY stays on the compositor; animating height re-laid out the timeline every frame
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative isolate py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Experience"
          title="Where I have worked"
          description="Seven years across six companies, from frontend work to full stack ownership to leading teams."
        />

        <div ref={ref} className="relative mt-20">
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px bg-(--color-border-strong) sm:left-1/2 sm:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute left-4 top-0 bottom-0 w-px origin-top will-change-transform bg-[linear-gradient(180deg,var(--color-accent-cyan),var(--color-accent-violet),var(--color-accent-pink))] sm:left-1/2 sm:-translate-x-1/2"
          />

          <ul className="space-y-12 sm:space-y-16">
            {experience.map((item, i) => {
              const isLeft = i % 2 === 0;
              const accent = cardAccents[i % cardAccents.length];
              return (
                <li
                  key={item.company}
                  className="group relative"
                  style={accentVars(accent)}
                >
                  {/* timeline dot — grows when its own card is hovered */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-4 top-3 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--a)] shadow-[0_0_0_4px_var(--color-bg-base),0_0_24px_var(--a-glow)] transition-transform duration-300 group-has-[article:hover]:scale-125 sm:left-1/2"
                  />

                  <motion.article
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`group/card glass-card relative ml-12 overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-[var(--a-line)] sm:ml-0 sm:w-[calc(50%-2rem)] sm:p-7 ${
                      isLeft ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                    }`}
                  >
                    {/* corner glow, revealed on hover — sits on the timeline side */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -top-16 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 ${
                        isLeft ? "-right-16" : "-left-16"
                      }`}
                      style={{
                        background:
                          "radial-gradient(circle, var(--a-glow), transparent 70%)",
                      }}
                    />
                    {/* underline that draws in from the timeline side */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute bottom-0 h-px w-0 transition-all duration-500 group-hover/card:w-full ${
                        isLeft ? "right-0" : "left-0"
                      }`}
                      style={{
                        background: isLeft
                          ? "linear-gradient(270deg, var(--a), transparent)"
                          : "linear-gradient(90deg, var(--a), transparent)",
                      }}
                    />

                    <div className="relative">
                      <div
                        className={`flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--a)] ${
                          isLeft ? "sm:justify-end" : ""
                        }`}
                      >
                        <Briefcase className="h-3.5 w-3.5" />
                        {item.period}
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-(--color-text-primary) sm:text-2xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm text-(--color-text-muted) transition-colors duration-300 group-hover/card:text-[var(--a)]">
                        {item.company}
                      </p>

                      <ul className={`mt-5 space-y-2 text-sm leading-relaxed text-(--color-text-muted) ${isLeft ? "sm:text-right" : ""}`}>
                        {item.bullets.slice(0, 3).map((b) => (
                          <li
                            key={b}
                            className={`flex gap-2 ${isLeft ? "sm:justify-end sm:flex-row-reverse" : ""}`}
                          >
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--a)]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {item.projects.length ? (
                        <div className={`mt-5 flex flex-wrap gap-2 ${isLeft ? "sm:justify-end" : ""}`}>
                          {item.projects.map((p) => (
                            <span
                              key={p}
                              className="inline-flex items-center rounded-full border border-(--color-border-subtle) bg-(--color-bg-elevated)/70 px-3 py-1 text-xs text-(--color-text-muted) transition-colors duration-300 group-hover/card:border-[var(--a-line)] group-hover/card:text-(--color-text-primary)"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
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
