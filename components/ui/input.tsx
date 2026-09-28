import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, required, showPasswordToggle, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const [showPassword, setShowPassword] = React.useState(false);

    const isPasswordType = type === "password";
    const actualType = isPasswordType && showPassword ? "text" : type;
    const isToggleVisible = isPasswordType || showPasswordToggle;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]"
          >
            {label} {required && <span className="text-[#f15e1c]">*</span>}
          </label>
        )}
        <div className="relative w-full">
          <input
            id={inputId}
            type={actualType}
            ref={ref}
            required={required}
            className={cn(
              "w-full rounded-lg border bg-white dark:bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#1b2823] dark:text-[#ffffff] placeholder:text-[#4a5c55]/60 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#f15e1c] focus:border-transparent disabled:opacity-50 disabled:bg-[#f7d7b0]/20",
              isToggleVisible && "pr-10",
              error
                ? "border-[#f15e1c] focus:ring-[#f15e1c]"
                : "border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/60",
              className
            )}
            {...props}
          />
          {isToggleVisible && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5c55] hover:text-[#f15e1c] dark:text-[#a0a0a0] dark:hover:text-[#ffffff] transition-colors p-1"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-[#f15e1c] font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
