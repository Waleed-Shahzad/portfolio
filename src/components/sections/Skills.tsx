"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="relative isolate py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Toolbelt"
          title="The stack I reach for"
          description="A curated set of languages, frameworks, and platforms I use day-to-day. Deep on MERN, comfortable across the rest."
        />

        <div className="mt-16 space-y-8">
          {skillGroups.map((group, gi) => (
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
              className="glass-card rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-sm font-mono uppercase tracking-[0.25em] text-[--color-accent-cyan]">
                  {group.title}
                </h3>
                <span className="font-mono text-xs text-[--color-text-subtle]">
                  {String(gi + 1).padStart(2, "0")} / {String(skillGroups.length).padStart(2, "0")}
                </span>
              </div>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04 } },
                }}
                className="mt-5 flex flex-wrap gap-2.5"
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
                        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    whileHover={{ y: -3, scale: 1.04 }}
                    className="group inline-flex cursor-default items-center gap-2 rounded-full border border-[--color-border-subtle] bg-[--color-bg-elevated]/70 px-4 py-2 text-sm text-[--color-text-muted] transition-colors hover:border-[--color-accent-cyan]/60 hover:text-[--color-text-primary]"
                    data-cursor="hover"
                  >
                    <Icon className="h-4 w-4 text-[--color-accent-cyan] transition-transform group-hover:scale-110" />
                    {name}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
