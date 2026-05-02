"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AnimationContextValue = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (next: boolean) => void;
};

const STORAGE_KEY = "portfolio-animations";

export const AnimationContext = createContext<AnimationContextValue>({
  enabled: true,
  toggle: () => {},
  setEnabled: () => {},
});

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(true);

  useEffect(() => {
    let initial = true;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "off") initial = false;
      else if (saved === "on") initial = true;
      else {
        // first visit: respect OS preference
        initial = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
    } catch {
      // localStorage unavailable; default to true
    }
    setEnabledState(initial);
    document.documentElement.dataset.animations = initial ? "on" : "off";
  }, []);

  const setEnabled = useCallback((next: boolean) => {
    setEnabledState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // ignore
    }
    document.documentElement.dataset.animations = next ? "on" : "off";
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  return (
    <AnimationContext.Provider value={{ enabled, toggle, setEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimations() {
  return useContext(AnimationContext);
}
