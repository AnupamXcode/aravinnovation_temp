"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BorderTraceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  borderColor?: string;
  duration?: number;
}

/**
 * BorderTraceButton
 * 
 * Category: Hover Animation
 * Description: Border animates around the element on hover using clip-path.
 * Technical spec: clipPath: inset(0 100% 0 0) → inset(0) | border: primary | duration: 500ms
 */
export function BorderTraceButton({
  children = "Hover Me",
  className = "",
  borderColor = "#f15e1c",
  duration = 0.5,
  onClick,
  ...props
}: BorderTraceButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 font-semibold text-sm rounded-full overflow-hidden transition-colors cursor-pointer select-none",
        "bg-white dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f15e1c]",
        className
      )}
      {...props}
    >
      {/* Border Trace overlay on hover using clip-path */}
      <motion.span
        className="absolute inset-0 rounded-[inherit] border-2 pointer-events-none z-20"
        style={{ borderColor }}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: isHovered ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
        transition={{ duration, ease: "easeInOut" }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

export default BorderTraceButton;
