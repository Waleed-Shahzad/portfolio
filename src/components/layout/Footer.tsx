"use client";

import { ArrowUp, Linkedin, Mail } from "lucide-react";

import { profile } from "@/data/stats";

export function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative isolate border-t border-[--color-border-subtle] bg-[--color-bg-base]/50">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center lg:px-10">
        <div className="text-sm font-semibold text-[--color-text-primary]">
          {profile.name}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email Waleed"
            data-cursor="hover"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[--color-border-strong] text-[--color-text-muted] transition-colors hover:border-[--color-accent-cyan] hover:text-[--color-accent-cyan]"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Waleed on LinkedIn"
            data-cursor="hover"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[--color-border-strong] text-[--color-text-muted] transition-colors hover:border-[--color-accent-cyan] hover:text-[--color-accent-cyan]"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            data-cursor="hover"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[--color-border-strong] px-4 text-xs font-mono uppercase tracking-[0.2em] text-[--color-text-muted] transition-colors hover:border-[--color-accent-cyan] hover:text-[--color-accent-cyan]"
          >
            Top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
