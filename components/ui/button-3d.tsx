"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Button3DProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  magneticEffect?: boolean;
}

export const Button3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  (
    {
      children,
      onClick,
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      type = "button",
      ariaLabel,
      magneticEffect = true,
      ...props
    },
    ref
  ) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const internalRef = useRef<HTMLButtonElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef;
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsTouchDevice(
          window.matchMedia("(pointer: coarse)").matches ||
            "ontouchstart" in window
        );
      }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magneticEffect || isTouchDevice || shouldReduceMotion) return;

      const rect = resolvedRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle 8% magnetic tracking
      setMousePosition({ x: x * 0.08, y: y * 0.08 });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      setIsHovering(false);
    };

    // Size variants
    const sizeMap = {
      sm: "px-4 py-2 text-xs h-8 gap-1.5",
      md: "px-6 py-2.5 text-sm h-10 gap-2",
      lg: "px-8 py-3.5 text-base h-12 gap-2.5 font-semibold",
    };

    // Arav Brand Color variants
    const variantMap = {
      primary:
        "bg-[#f15e1c] text-white hover:bg-[#d8480d] border border-transparent hover:border-[#f15e1c] shadow-lg shadow-[#f15e1c]/30",
      secondary:
        "bg-[#2e936f] text-white hover:bg-[#227658] border border-transparent shadow-lg shadow-[#2e936f]/30",
      outline:
        "border-2 border-[#f15e1c] text-[#f15e1c] hover:bg-[#f15e1c] hover:text-white bg-transparent shadow-xs hover:shadow-md",
      ghost:
        "text-[#1b2823] dark:text-[#ffffff] hover:bg-[#f7d7b0]/40 dark:hover:bg-[#253630] hover:text-[#f15e1c] bg-transparent",
      link:
        "text-[#f15e1c] underline-offset-4 hover:underline p-0 h-auto font-semibold bg-transparent shadow-none border-none",
    };

    const isInteractive = !disabled && !isLoading;

    return (
      <motion.button
        ref={resolvedRef}
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => isInteractive && setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        animate={
          shouldReduceMotion || !isInteractive
            ? {}
            : {
                y: isHovering ? -4 : 0,
                x: isHovering && !isTouchDevice ? mousePosition.x : 0,
                rotateX: isHovering && !isTouchDevice ? 2 : 0,
                rotateY: isHovering && !isTouchDevice ? (mousePosition.x > 0 ? 2 : -2) : 0,
              }
        }
        whileTap={
          shouldReduceMotion || !isInteractive
            ? {}
            : {
                y: 0,
                scale: 0.97,
              }
        }
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        }}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-full select-none tracking-tight",
          "transition-colors duration-200 ease-out group",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f15e1c] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#101b17]",
          variant !== "link" && sizeMap[size],
          variantMap[variant],
          !isInteractive ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        )}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        {...(props as any)}
      >
        {/* Ripple background layer on hover */}
        {variant !== "link" && isInteractive && (
          <motion.span
            className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={isHovering ? { scale: 1, opacity: 0 } : { scale: 0, opacity: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}

        {/* 3D shadow layer for depth */}
        {variant !== "link" && isInteractive && (
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-md transition-opacity duration-200 pointer-events-none -z-10",
              isHovering ? "opacity-100" : "opacity-0",
              variant === "primary" && "bg-[#f15e1c]/40",
              variant === "secondary" && "bg-[#2e936f]/40",
              variant === "outline" && "bg-[#f15e1c]/20"
            )}
            style={{
              transform: isHovering ? "translateZ(-15px) translateY(4px)" : "translateZ(-30px)",
            }}
          />
        )}

        {/* Button Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-current" />
          ) : (
            leftIcon
          )}
          {children}
          {!isLoading && rightIcon && (
            <span className="transition-transform duration-150 group-hover:translate-x-1 inline-flex shrink-0">
              {rightIcon}
            </span>
          )}
        </span>
      </motion.button>
    );
  }
);

Button3D.displayName = "Button3D";
