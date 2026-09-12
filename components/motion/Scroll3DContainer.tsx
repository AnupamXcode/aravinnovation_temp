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
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -5% 0px" });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile((prev) => {
      const mobile = window.innerWidth < 768;
      return prev !== mobile ? mobile : prev;
    });
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        initial={{ opacity: 0.2, y: 24, scale: 0.99 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.2, y: 24, scale: 0.99 }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
