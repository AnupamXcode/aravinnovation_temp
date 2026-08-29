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

  // Upward sliding popping effect: y shifts from +70px up to 0px, scale pops 0.86 -> 1
  const rawY = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.5, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);

  // Slower, smooth fluid spring lerp (increased mass & lower stiffness)
  const smoothY = useSpring(rawY, { damping: 28, stiffness: 85, mass: 0.8 });
  const smoothOpacity = useSpring(rawOpacity, { damping: 30, stiffness: 90 });
  const smoothScale = useSpring(rawScale, { damping: 28, stiffness: 85, mass: 0.8 });

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
