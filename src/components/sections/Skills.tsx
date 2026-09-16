"use client";

import { motion } from "framer-motion";
import {
  Braces,
  Cloud,
  Database,
  KanbanSquare,
  Layers,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups, type Skill } from "@/data/skills";
import { accents, accentVars } from "@/lib/accents";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";

const GROUP_ICONS: Record<string, LucideIcon> = {
  Languages: Braces,
  "Frameworks & Libraries": Layers,
  "E-commerce & CMS": ShoppingBag,
  Databases: Database,
  "Cloud & Hosting": Cloud,
  "Tools & Collaboration": KanbanSquare,
};

/** Every skill once, in declaration order — used by the marquee band. */
const tickerSkills: Skill[] = (() => {
  const seen = new Set<string>();
  const out: Skill[] = [];
  for (const group of skillGroups) {
    for (const skill of group.skills) {
      if (seen.has(skill.name)) continue;
      seen.add(skill.name);
      out.push(skill);
    }
  }
  return out;
})();

const totalSkills = tickerSkills.length;

function TickerRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 pr-3"
      aria-hidden={duplicate || undefined}
    >
      {tickerSkills.map(({ name, Icon }) => (
        <span
          key={name}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-(--color-border-subtle) bg-(--color-bg-elevated)/60 px-3.5 py-1.5 text-xs text-(--color-text-subtle)"
        >
          <Icon className="h-3.5 w-3.5 opacity-70" />
          {name}
        </span>
      ))}
    </div>
  );
}

export function Skills() {
  const marqueeRef = usePauseOffscreen<HTMLDivElement>();

  return (
    <section id="skills" className="relative isolate py-24 sm:py-32">
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="grid-pattern absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000,transparent)]" />
        <div className="absolute -right-40 top-16 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.13),transparent_70%)]" />
        <div className="absolute -left-40 bottom-16 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.11),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Toolbelt"
          title="The stack I reach for"
          description="A curated set of languages, frameworks, and platforms I use day-to-day. Deep on MERN, comfortable across the rest."
        />

        {/* Marquee band — a quick pass over everything before the breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          ref={marqueeRef}
          className="marquee-mask relative mt-14 overflow-hidden border-y border-(--color-border-subtle) py-4"
        >
          <div className="marquee-track gap-3">
            <TickerRow />
            <TickerRow duplicate />
          </div>
        </motion.div>

        <div className="mt-12 space-y-5">
          {skillGroups.map((group, gi) => {
            const accent = accents[group.accent];
            const GroupIcon = GROUP_ICONS[group.title] ?? Layers;

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, x: gi % 2 === 0 ? -40 : 40, y: 24 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: gi * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={accentVars(accent)}
                className="group glass-card relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-[var(--a-line)] sm:p-8"
              >
                {/* left accent rail */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, var(--a), transparent)",
                  }}
                />
                {/* corner glow */}
                <span
                  aria-hidden
                  className="absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-30 transition-opacity duration-500 group-hover:opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle, var(--a-glow), transparent 70%)",
                  }}
                />
                <span
                  aria-hidden
                  className="hatch absolute -bottom-3 -right-3 h-24 w-24 opacity-20 [mask-image:linear-gradient(315deg,#000,transparent)]"
                />

                <span className="absolute right-6 top-6 font-mono text-[10px] tracking-[0.25em] text-(--color-text-subtle) sm:right-8 sm:top-8">
                  {String(gi + 1).padStart(2, "0")} /{" "}
                  {String(skillGroups.length).padStart(2, "0")}
                </span>

                <div className="relative grid gap-6 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-8">
                  {/* Left rail: icon, title, count */}
                  <div className="flex items-start gap-4">
                    <div
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "var(--a-soft)",
                        color: "var(--a)",
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ["--tw-ring-color" as any]: "var(--a-line)",
                        boxShadow: "0 0 28px -10px var(--a-glow)",
                      }}
                    >
                      <GroupIcon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 pr-12 lg:pr-0">
                      <h3
                        className="text-sm font-mono uppercase tracking-[0.25em]"
                        style={{ color: "var(--a)" }}
                      >
                        {group.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                        {group.tagline}
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-subtle)">
                        {group.skills.length} tools
                      </p>
                    </div>
                  </div>

                  {/* Right: the chips */}
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.04 } },
                    }}
                    className="flex flex-wrap content-center gap-2.5 border-(--color-border-subtle) lg:h-full lg:border-l lg:pl-8"
                  >
                    {group.skills.map(({ name, Icon }) => (
                      <motion.li
                        key={name}
                        variants={{
                          hidden: { opacity: 0, y: 14, scale: 0.92 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              duration: 0.45,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                        whileHover={{ y: -3, scale: 1.04 }}
                        className="group/chip inline-flex cursor-default items-center gap-2 rounded-full border border-(--color-border-subtle) bg-(--color-bg-elevated)/70 px-4 py-2 text-sm text-(--color-text-muted) transition-colors hover:border-[var(--a-line)] hover:text-(--color-text-primary)"
                        data-cursor="hover"
                      >
                        <Icon
                          className="h-4 w-4 transition-transform group-hover/chip:scale-110"
                          style={{ color: "var(--a)" }}
                        />
                        {name}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-(--color-text-subtle)"
        >
          {skillGroups.length} categories · {totalSkills} technologies
        </motion.p>
      </div>
    </section>
  );
}
