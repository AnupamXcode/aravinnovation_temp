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
    primary: "bg-[#E8672A] text-white border-transparent",
    secondary: "bg-[#FCE3D3] text-[#3A2E27] border-[#F4A97F]/40",
    outline: "border border-[#E8672A]/40 text-[#E8672A] bg-transparent",
    subtle: "bg-[#FBF3EA] text-[#7A6A5F] border-[#EFE2D6]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium rounded-full",
    md: "text-xs px-3 py-1 font-semibold rounded-full tracking-wide uppercase",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border transition-colors",
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
