import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, options, error, placeholder = "Select an option", id, required, ...props },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]"
          >
            {label} {required && <span className="text-[#f15e1c]">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          required={required}
          className={cn(
            "w-full rounded-lg border bg-white dark:bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#1b2823] dark:text-[#ffffff] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#f15e1c] focus:border-transparent disabled:opacity-50 disabled:bg-[#f7d7b0]/20 cursor-pointer",
            error
              ? "border-[#f15e1c] focus:ring-[#f15e1c]"
              : "border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/60",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-[#f15e1c] font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
