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
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
