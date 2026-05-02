"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X, Download } from "lucide-react";

import { profile } from "@/data/stats";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 32);
    if (latest > previous && latest > 200) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.href.slice(1))).filter(
      (el): el is HTMLElement => !!el
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-6",
          scrolled
            ? "border-[--color-border-strong] bg-[--color-bg-base]/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-transparent bg-[--color-bg-base]/40 backdrop-blur"
        )}
      >
        <a
          href="#home"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[--color-text-primary]"
          data-cursor="hover"
        >
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(120deg,var(--color-accent-cyan),var(--color-accent-violet))] text-xs font-bold text-[--color-bg-base]">
            W
          </span>
          <span className="hidden sm:inline">Waleed Shahzad</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.href} className="relative">
              <a
                href={item.href}
                data-cursor="hover"
                className={cn(
                  "relative inline-flex rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  active === item.href.slice(1)
                    ? "text-[--color-text-primary]"
                    : "text-[--color-text-muted] hover:text-[--color-text-primary]"
                )}
              >
                {active === item.href.slice(1) ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[--color-bg-elevated] border border-[--color-border-strong]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resumePath}
            download
            data-cursor="hover"
            className="hidden items-center gap-2 rounded-full bg-[linear-gradient(120deg,var(--color-accent-cyan),var(--color-accent-violet))] px-4 py-1.5 text-xs font-semibold text-[--color-bg-base] transition-transform hover:scale-105 sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" />
            CV
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-cursor="hover"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[--color-border-strong] text-[--color-text-primary] md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-[--color-border-strong] bg-[--color-bg-elevated]/95 p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-base transition-colors",
                      active === item.href.slice(1)
                        ? "bg-[--color-bg-base] text-[--color-text-primary]"
                        : "text-[--color-text-muted] hover:bg-[--color-bg-base]"
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
