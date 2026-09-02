import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, required, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]"
          >
            {label} {required && <span className="text-[#f15e1c]">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          required={required}
          className={cn(
            "w-full rounded-lg border bg-white dark:bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#1b2823] dark:text-[#ffffff] placeholder:text-[#4a5c55]/60 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#f15e1c] focus:border-transparent disabled:opacity-50 disabled:bg-[#f7d7b0]/20 resize-y",
            error
              ? "border-[#f15e1c] focus:ring-[#f15e1c]"
              : "border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/60",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#f15e1c] font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
