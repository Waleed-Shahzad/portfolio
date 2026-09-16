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

/**
 * Pixels of deliberate movement in one direction before the bar hides or
 * reappears. Without this, trackpad jitter flipped `hidden` on nearly every
 * scroll frame and restarted the header spring each time.
 */
const HIDE_DELTA = 8;

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    const delta = latest - previous;
    setScrolled(latest > 32);
    if (open || latest < 160) {
      setHidden(false);
      return;
    }
    if (delta > HIDE_DELTA) setHidden(true);
    else if (delta < -HIDE_DELTA) setHidden(false);
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-300 sm:px-6",
            scrolled || open
              ? "border-(--color-border-strong) bg-(--color-bg-elevated)/95 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]"
              : "border-transparent bg-(--color-bg-base)/60"
          )}
        >
          <a
            href="#home"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-(--color-text-primary)"
            data-cursor="hover"
          >
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(120deg,var(--color-accent-cyan),var(--color-accent-violet))] text-xs font-bold text-(--color-bg-base)">
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
                      ? "text-(--color-text-primary)"
                      : "text-(--color-text-muted) hover:text-(--color-text-primary)"
                  )}
                >
                  {active === item.href.slice(1) ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-(--color-bg-elevated) border border-(--color-border-strong)"
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
              className="hidden items-center gap-2 rounded-full bg-[linear-gradient(120deg,var(--color-accent-cyan),var(--color-accent-violet))] px-4 py-1.5 text-xs font-semibold text-(--color-bg-base) transition-transform hover:scale-105 sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" />
              CV
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-cursor="hover"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border-strong) bg-(--color-bg-elevated)/80 text-(--color-text-primary) md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer lives outside the header: the header's transform would
          otherwise turn `fixed` into "fixed to the header", and the scrim
          could never cover the viewport. */}
      <AnimatePresence>
        {open
          ? [
              <motion.button
                key="scrim"
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-[rgba(7,7,11,0.72)] md:hidden"
              />,
              <motion.div
                key="menu"
                id="mobile-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-x-4 top-20 z-[45] overflow-hidden rounded-3xl border border-(--color-border-strong) p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] md:hidden"
                style={{
                  background: "linear-gradient(180deg, #171d2c 0%, #0f1117 100%)",
                }}
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
                            ? "bg-(--color-bg-base) text-(--color-text-primary)"
                            : "text-(--color-text-muted) hover:bg-(--color-bg-base) hover:text-(--color-text-primary)"
                        )}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <a
                  href={profile.resumePath}
                  download
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(120deg,var(--color-accent-cyan),var(--color-accent-violet))] px-4 py-3 text-sm font-semibold text-(--color-bg-base)"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </motion.div>,
            ]
          : null}
      </AnimatePresence>
    </>
  );
}
