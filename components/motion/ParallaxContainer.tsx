"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number; // custom pixel translation e.g. -50 to 50
  direction?: "up" | "down" | "rotate" | "scale";
  depth?: "background" | "midground" | "foreground";
  smooth?: boolean; // enable physics spring lerping lag
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxContainer({
  children,
  speed,
  direction = "up",
  depth = "midground",
  smooth = true,
  className,
  style,
}: ParallaxContainerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
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

  // Calculate base magnitude based on depth profile if custom speed is omitted
  const baseMagnitude =
    speed !== undefined
      ? speed
      : depth === "background"
      ? 25
      : depth === "foreground"
      ? 60
      : 40;

  // Scale down translation on mobile devices to maintain crisp responsive composition
  const effectiveMagnitude = isMobile ? baseMagnitude * 0.35 : baseMagnitude;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate raw target transform based on direction
  const rawValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up"
      ? [effectiveMagnitude, -effectiveMagnitude]
      : direction === "down"
      ? [-effectiveMagnitude, effectiveMagnitude]
      : direction === "rotate"
      ? [-8, 8]
      : direction === "scale"
      ? [0.96, 1.04]
      : [effectiveMagnitude, -effectiveMagnitude]
  );

  // Smooth physical spring lerp lag behind scroll
  const springValue = useSpring(rawValue, {
    damping: 30,
    stiffness: 120,
    mass: 0.5,
  });

  const finalTransform = smooth && !shouldReduceMotion ? springValue : rawValue;

  if (shouldReduceMotion) {
    return (
      <div className={cn(className)} style={style}>
        {children}
      </div>
    );
  }

  const motionStyles =
    direction === "rotate"
      ? { rotate: finalTransform, ...style }
      : direction === "scale"
      ? { scale: finalTransform, ...style }
      : { y: finalTransform, ...style };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ ...motionStyles, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
