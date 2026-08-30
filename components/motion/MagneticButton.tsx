"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useMagneticHover } from "@/lib/motion-system";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  threshold?: number;
  strength?: number;
  className?: string;
}

export function MagneticButton({
  children,
  threshold = 90,
  strength = 0.3,
  className = "",
}: MagneticButtonProps) {
  const { ref, x, y } = useMagneticHover(threshold, strength);

  return (
    <motion.div ref={ref} style={{ x, y }} className={cn("inline-block", className)}>
      {children}
    </motion.div>
  );
}

export default MagneticButton;
