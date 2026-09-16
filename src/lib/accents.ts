import type { CSSProperties } from "react";

/**
 * Accent palettes used by the decorative cards in About / Skills.
 * Values are plain strings so they can be handed to inline styles — Tailwind
 * cannot generate classes from runtime values, so per-card colours travel as
 * CSS custom properties instead.
 */
export type Accent = {
  base: string;
  soft: string;
  line: string;
  glow: string;
};

const build = (r: number, g: number, b: number): Accent => ({
  base: `rgb(${r}, ${g}, ${b})`,
  soft: `rgba(${r}, ${g}, ${b}, 0.12)`,
  line: `rgba(${r}, ${g}, ${b}, 0.38)`,
  glow: `rgba(${r}, ${g}, ${b}, 0.45)`,
});

export const accents = {
  cyan: build(6, 182, 212),
  violet: build(168, 85, 247),
  pink: build(236, 72, 153),
  emerald: build(52, 211, 153),
  amber: build(251, 191, 36),
  blue: build(96, 165, 250),
} as const;

export type AccentName = keyof typeof accents;

/** Spread onto a `style` prop to expose an accent as --a / --a-soft / --a-line / --a-glow. */
export function accentVars(a: Accent): CSSProperties {
  return {
    "--a": a.base,
    "--a-soft": a.soft,
    "--a-line": a.line,
    "--a-glow": a.glow,
  } as CSSProperties;
}
