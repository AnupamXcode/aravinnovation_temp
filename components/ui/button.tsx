import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8672A] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-[#E8672A] text-white hover:bg-[#d4581f] shadow-md hover:shadow-xl hover:shadow-[#E8672A]/25 border border-transparent",
      secondary:
        "bg-[#FCE3D3] dark:bg-[#2C221B] text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#fbd3bb] dark:hover:bg-[#382B22] border border-[#F4A97F]/40 shadow-sm hover:shadow-md",
      outline:
        "border-2 border-[#E8672A] text-[#E8672A] hover:bg-[#E8672A] hover:text-white bg-transparent shadow-xs hover:shadow-md",
      ghost:
        "text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FBF3EA] dark:hover:bg-[#201B17] hover:text-[#E8672A] bg-transparent",
      link: "text-[#E8672A] underline-offset-4 hover:underline p-0 h-auto font-semibold bg-transparent hover:translate-y-0",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 h-8",
      md: "text-sm px-5 py-2.5 gap-2 h-10",
      lg: "text-base px-7 py-3.5 gap-2.5 h-12 font-semibold",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
