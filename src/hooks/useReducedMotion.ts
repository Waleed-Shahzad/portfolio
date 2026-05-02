"use client";

import { useAnimations } from "@/components/providers/AnimationProvider";

/**
 * Returns true when motion should be suppressed — either because the user has
 * toggled animations off in the UI, or because they have prefers-reduced-motion
 * enabled and never explicitly opted in. Drop-in for the previous OS-only hook.
 */
export function useReducedMotion() {
  const { enabled } = useAnimations();
  return !enabled;
}
