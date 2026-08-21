"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { useSiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.5,
  once = true,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px" });
  const { config } = useSiteConfig();

  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const animationsDisabled =
    config.animationsEnabled === false ||
    config.scrollAnimationsEnabled === false ||
    prefersReducedMotion;

  if (animationsDisabled) {
    return <div className={cn(className)}>{children}</div>;
  }

  const getInitialPosition = () => {
    // Reduce distance on mobile viewports
    const actualDistance = typeof window !== "undefined" && window.innerWidth < 640 ? Math.min(distance, 12) : distance;
    switch (direction) {
      case "up":
        return { y: actualDistance, opacity: 0 };
      case "down":
        return { y: -actualDistance, opacity: 0 };
      case "left":
        return { x: actualDistance, opacity: 0 };
      case "right":
        return { x: -actualDistance, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
