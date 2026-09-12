"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollParallaxLayerProps {
  children?: React.ReactNode;
  speed?: number; // e.g. -35 to 35
  depth?: "background" | "midground" | "foreground";
  rotateRange?: [number, number];
  scaleRange?: [number, number];
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollParallaxLayer({
  children,
  speed,
  depth = "background",
  rotateRange,
  scaleRange,
  className,
  style,
}: ScrollParallaxLayerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const baseSpeed =
    speed !== undefined
      ? speed
      : depth === "background"
      ? -20
      : depth === "foreground"
      ? 45
      : 25;

  const effectiveSpeed = isMobile ? baseSpeed * 0.3 : baseSpeed;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [effectiveSpeed, -effectiveSpeed]);
  const smoothY = useSpring(rawY, { damping: 28, stiffness: 110, mass: 0.6 });

  const rawRotate = useTransform(
    scrollYProgress,
    [0, 1],
    rotateRange || [0, 0]
  );
  const smoothRotate = useSpring(rawRotate, { damping: 30, stiffness: 100 });

  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleRange || [1, 1]
  );
  const smoothScale = useSpring(rawScale, { damping: 30, stiffness: 100 });

  if (shouldReduceMotion) {
    return (
      <div className={cn("pointer-events-none select-none", className)} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("pointer-events-none select-none", className)}>
      <motion.div
        style={{
          y: smoothY,
          rotate: rotateRange ? smoothRotate : undefined,
          scale: scaleRange ? smoothScale : undefined,
          willChange: "transform",
          ...style,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
