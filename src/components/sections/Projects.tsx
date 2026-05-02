"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiApollographql,
  SiExpress,
  SiFormik,
  SiGraphql,
  SiJsonwebtokens,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRedux,
  SiSequelize,
  SiShopify,
  SiSocketdotio,
  SiTypescript,
} from "react-icons/si";
import { FaAws, FaDatabase } from "react-icons/fa";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { projects, accentMap, type ProjectItem } from "@/data/projects";
import { cn } from "@/lib/cn";

const ICONS: Record<string, IconType> = {
  React: SiReact,
  "React Native": SiReact,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Sequelize: SiSequelize,
  Redux: SiRedux,
  Redis: SiRedis,
  AWS: FaAws,
  WebSocket: SiSocketdotio,
  GraphQL: SiGraphql,
  Apollo: SiApollographql,
  TypeScript: SiTypescript,
  JWT: SiJsonwebtokens,
  Formik: SiFormik,
  "Material UI": SiMui,
  Shopify: SiShopify,
  Liquid: SiShopify,
  "Storefront API": SiShopify,
  DynamoDB: FaDatabase,
};

const spanClasses: Record<NonNullable<ProjectItem["span"]>, string> = {
  default: "md:col-span-1 md:row-span-1",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
};

function ProjectCard({
  p,
  i,
  children,
}: {
  p: ProjectItem;
  i: number;
  children: ReactNode;
}) {
  const motionProps = {
    initial: { opacity: 0, y: 40, scale: 0.9 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.7,
      delay: (i % 4) * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
    className:
      "glass-card relative flex h-full flex-col justify-between overflow-hidden rounded-[--radius-card] p-6 transition-all duration-300 hover:border-[--color-accent-cyan]/40 hover:-translate-y-1",
  };

  if (p.url) {
    return (
      <motion.a
        {...motionProps}
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${p.name} in a new tab`}
      >
        {children}
      </motion.a>
    );
  }

  return <motion.article {...motionProps}>{children}</motion.article>;
}

export function Projects() {
  return (
    <section id="projects" className="relative isolate py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Selected work"
          title="Products I&rsquo;ve helped ship"
          description="A bento of recent and meaningful projects across web and mobile. Hover to peek at the stack."
        />

        <div className="mt-16 grid auto-rows-[minmax(220px,_auto)] grid-cols-1 gap-5 md:grid-cols-3">
          {projects.map((p, i) => {
            const accent = accentMap[p.accent];
            return (
              <TiltCard
                key={p.name}
                className={cn(
                  "group h-full",
                  spanClasses[p.span ?? "default"]
                )}
                intensity={6}
              >
                <ProjectCard p={p} i={i}>
                  <div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{
                      background: `radial-gradient(circle, ${accent.from}, transparent 70%)`,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center gap-2 rounded-full border border-[--color-border-subtle] bg-[--color-bg-elevated]/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em]"
                        style={{ color: accent.from }}
                      >
                        <span
                          className="block h-1.5 w-1.5 rounded-full"
                          style={{ background: accent.from, boxShadow: `0 0 8px ${accent.glow}` }}
                        />
                        {p.category}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-[--color-text-subtle] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[--color-accent-cyan]" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[--color-text-primary] sm:text-2xl">
                      {p.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[--color-text-muted]">
                      {p.blurb}
                    </p>
                  </div>

                  <ul className="relative mt-6 flex flex-wrap items-center gap-2">
                    {p.stack.map((s) => {
                      const Icon = ICONS[s];
                      return (
                        <li
                          key={s}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[--color-border-subtle] bg-[--color-bg-base]/60 px-2.5 py-1 text-xs text-[--color-text-muted] transition-colors group-hover:border-[--color-border-strong] group-hover:text-[--color-text-primary]"
                          title={s}
                        >
                          {Icon ? (
                            <Icon className="h-3.5 w-3.5" style={{ color: accent.from }} />
                          ) : null}
                          {s}
                        </li>
                      );
                    })}
                  </ul>
                </ProjectCard>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
