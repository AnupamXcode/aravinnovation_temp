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
  distance = 32,
  duration = 0.55,
  once = true,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -5% 0px" });
  const { config } = useSiteConfig();

  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const animationsDisabled =
    config.animationsEnabled === false ||
    config.scrollAnimationsEnabled === false ||
    prefersReducedMotion ||
    isMobile;

  if (animationsDisabled) {
    return <div className={cn(className)}>{children}</div>;
  }

  const effectiveDistance = distance;
  const effectiveDuration = duration;
  const effectiveDelay = delay;

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: effectiveDistance, opacity: 0.1 };
      case "down":
        return { y: -effectiveDistance, opacity: 0.1 };
      case "left":
        return { x: effectiveDistance, opacity: 0.1 };
      case "right":
        return { x: -effectiveDistance, opacity: 0.1 };
      default:
        return { opacity: 0.1, y: effectiveDistance };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{
        duration: effectiveDuration,
        delay: effectiveDelay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
