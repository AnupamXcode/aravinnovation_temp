import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "subtle";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "subtle",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-[#f15e1c] text-white border-transparent shadow-xs",
    secondary:
      "bg-[#f7d7b0] text-[#1b2823] border-[#f15e1c]/30 dark:bg-[#253630] dark:text-[#ffffff] dark:border-[#f15e1c]/40",
    outline:
      "border border-[#f15e1c]/40 text-[#f15e1c] bg-transparent dark:border-[#f15e1c]/60 dark:text-[#f15e1c]",
    subtle:
      "bg-[#fefaf5] text-[#4a5c55] border-[#f7d7b0] dark:bg-[#172420] dark:text-[#d3eee4] dark:border-[#253630]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-medium rounded-full",
    md: "text-xs px-3.5 py-1 font-semibold rounded-full tracking-wide uppercase",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border transition-all duration-200 select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
