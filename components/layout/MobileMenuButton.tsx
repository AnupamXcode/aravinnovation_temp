"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  className?: string;
}

export function MobileMenuButton({
  isOpen,
  onClick,
  ariaLabel = "Toggle navigation menu",
  ariaExpanded,
  className,
}: MobileMenuButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 350, damping: 28 };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded ?? isOpen}
      className={cn(
        "relative w-11 h-11 rounded-xl bg-[#f15e1c] text-white hover:bg-[#d44e14] active:scale-95 transition-all shadow-md flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f15e1c] focus:ring-offset-2",
        className
      )}
    >
      <span className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
        {/* Top Line */}
        <motion.span
          initial={false}
          animate={
            isOpen
              ? { rotate: 45, y: 7 }
              : { rotate: 0, y: 0 }
          }
          transition={transition}
          className="w-5 h-0.5 bg-white rounded-full origin-center block"
        />

        {/* Middle Line */}
        <motion.span
          initial={false}
          animate={
            isOpen
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 1, scaleX: 1 }
          }
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
          className="w-5 h-0.5 bg-white rounded-full block"
        />

        {/* Bottom Line */}
        <motion.span
          initial={false}
          animate={
            isOpen
              ? { rotate: -45, y: -7 }
              : { rotate: 0, y: 0 }
          }
          transition={transition}
          className="w-5 h-0.5 bg-white rounded-full origin-center block"
        />
      </span>
    </button>
  );
}
