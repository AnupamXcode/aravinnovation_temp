"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface PageEntranceProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function PageEntrance({
  children,
  className,
  delay = 0.05,
}: PageEntranceProps) {
  const { config } = useSiteConfig();
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const disabled =
    config.animationsEnabled === false ||
    config.entranceAnimationsEnabled === false ||
    prefersReducedMotion;

  if (disabled) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
