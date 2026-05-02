"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingShapes } from "@/components/ui/FloatingShapes";
import { profile } from "@/data/stats";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ParticleField = dynamic(
  () => import("@/components/ui/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

const portrait = {
  src: "/images/waleed-orange.jpg",
  alt: "Waleed Shahzad — Full Stack Developer",
};

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 sm:pt-32"
    >
      <div className="grid-pattern absolute inset-0 -z-20 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <FloatingShapes />
      <ParticleField />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-10">
        <motion.div
          style={reduced ? undefined : { y: textY, opacity: textOpacity }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[--color-border-strong] bg-[--color-bg-card] px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[--color-accent-cyan]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Available for select engagements
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl font-semibold tracking-tight leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            <span className="block text-[--color-text-primary]">Waleed Shahzad</span>
            <span className="mt-3 block text-balance">
              <span className="text-gradient-animated">Full Stack Developer</span>
              <span className="text-[--color-text-primary]"> &amp; Team Lead</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 font-mono text-sm sm:text-base text-[--color-text-muted]"
          >
            <span className="text-[--color-accent-cyan]">{">"}</span>{" "}
            {reduced ? (
              "Engineering scalable web & mobile products"
            ) : (
              <TypeAnimation
                sequence={[
                  "Engineering scalable web & mobile products",
                  1800,
                  "MERN · React Native · AWS",
                  1600,
                  "Leading teams. Shipping production code.",
                  1600,
                ]}
                speed={55}
                repeat={Infinity}
                cursor
              />
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-[--color-text-muted] md:text-lg"
          >
            Seven years building scalable web and mobile products across MERN,
            AWS, and React Native — with a focus on performance, clean
            architecture, and the small details that make software feel
            inevitable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href={`mailto:${profile.email}`} variant="primary">
              <Mail className="h-4 w-4" />
              Hire me
            </MagneticButton>
            <MagneticButton
              href={profile.resumePath}
              variant="ghost"
              download
            >
              <Download className="h-4 w-4" />
              Download CV
            </MagneticButton>
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[--color-text-subtle] hover:text-[--color-accent-cyan] transition-colors"
            data-cursor="hover"
            aria-label="Scroll down to about section"
          >
            <span>Scroll</span>
            <span className="relative block h-9 w-[1px] bg-[--color-border-strong] overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-3 bg-[--color-accent-cyan] animate-scroll-indicator" />
            </span>
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.a>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { y: portraitY, scale: portraitScale }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-[linear-gradient(120deg,var(--color-accent-cyan),var(--color-accent-violet),var(--color-accent-pink))] opacity-30 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-[--color-border-strong] bg-[--color-bg-elevated] shadow-2xl shimmer-border">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[--color-bg-base]/70 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[--color-accent-cyan]">
                  Currently
                </div>
                <div className="text-base font-medium text-[--color-text-primary]">
                  Team Lead @ Tanbits
                </div>
              </div>
            </div>

            <motion.div
              aria-hidden
              animate={
                reduced
                  ? undefined
                  : { y: [0, -10, 0], rotate: [-3, 3, -3] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 hidden rounded-2xl border border-[--color-border-strong] bg-[--color-bg-elevated]/90 px-4 py-3 backdrop-blur md:block"
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[--color-text-subtle]">
                MERN · AWS · React Native
              </div>
              <div className="mt-1 text-xs text-[--color-text-primary]">
                7+ yrs shipping production code
              </div>
            </motion.div>

            <motion.div
              aria-hidden
              animate={
                reduced ? undefined : { y: [0, 12, 0], rotate: [3, -3, 3] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-[--color-border-strong] bg-[--color-bg-elevated]/90 px-4 py-3 backdrop-blur md:block"
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[--color-accent-violet]">
                Performance
              </div>
              <div className="mt-1 text-xs text-[--color-text-primary]">
                +40% application speed
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
