"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Marks an element with data-offscreen="true" while it is outside the viewport
 * so CSS can pause infinite decorative animations (marquee, orbit) that would
 * otherwise keep the compositor busy for content nobody can see.
 */
export function usePauseOffscreen<T extends HTMLElement>(
  margin = "200px"
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.offscreen = entry.isIntersecting ? "false" : "true";
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return ref;
}
