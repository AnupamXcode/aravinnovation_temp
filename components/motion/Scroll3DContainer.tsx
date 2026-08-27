"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

interface Scroll3DContainerProps {
  children: React.ReactNode;
  variant?: "hero" | "card" | "testimonial" | "cta" | "footer";
  delay?: number;
  className?: string;
}

export function Scroll3DContainer({
  children,
  delay = 0,
  className = "",
}: Scroll3DContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px -20px -20px 0px" });

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.98 }}
        transition={{
          duration: 0.55,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
