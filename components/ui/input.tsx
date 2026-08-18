import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#3A2E27]"
          >
            {label} {required && <span className="text-[#E8672A]">*</span>}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          required={required}
          className={cn(
            "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#3A2E27] placeholder:text-[#7A6A5F]/60 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#E8672A] focus:border-transparent disabled:opacity-50 disabled:bg-[#FBF3EA]",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-[#EFE2D6] hover:border-[#E8672A]/50",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-[#7A6A5F]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
