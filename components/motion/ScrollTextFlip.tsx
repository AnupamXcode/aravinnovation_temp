"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollTextFlipProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollTextFlip({
  children,
  className = "",
}: ScrollTextFlipProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "center 60%"],
  });

  // Upward sliding popping effect: y shifts from +60px up to 0px, scale pops 0.88 -> 1
  const rawY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

  const smoothY = useSpring(rawY, { damping: 20, stiffness: 140, mass: 0.5 });
  const smoothOpacity = useSpring(rawOpacity, { damping: 25, stiffness: 130 });
  const smoothScale = useSpring(rawScale, { damping: 20, stiffness: 140 });

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-visible", className)}
    >
      <motion.div
        style={{
          y: smoothY,
          opacity: smoothOpacity,
          scale: smoothScale,
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
