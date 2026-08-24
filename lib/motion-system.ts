"use client";

import * as React from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Level 1: Ambient Motion Helper
 * Returns boolean whether ambient animation layer should be active (respecting reduced motion & device width)
 */
export function useAmbientMotion(): boolean {
  const [shouldAnimate, setShouldAnimate] = React.useState<boolean>(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (reduceMotion) {
      setShouldAnimate(false);
      return;
    }
    const checkWidth = () => {
      // Disable background particle physics on mobile screens < 768px for performance budget
      setShouldAnimate(window.innerWidth >= 768);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [reduceMotion]);

  return shouldAnimate;
}

/**
 * Level 3: Magnetic Hover Proximity Hook
 * Tracks cursor proximity relative to element center and applies smooth spring offset
 */
export function useMagneticHover(distanceThreshold: number = 100, strength: number = 0.35) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  React.useEffect(() => {
    if (reduceMotion || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < distanceThreshold) {
        x.set(distX * strength);
        y.set(distY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion, distanceThreshold, strength, x, y]);

  return { ref, x: springX, y: springY };
}
