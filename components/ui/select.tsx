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
            className="block text-xs font-semibold uppercase tracking-wider text-[#3A2E27]"
          >
            {label} {required && <span className="text-[#E8672A]">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          required={required}
          className={cn(
            "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#3A2E27] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#E8672A] focus:border-transparent disabled:opacity-50 disabled:bg-[#FBF3EA] cursor-pointer",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-[#EFE2D6] hover:border-[#E8672A]/50",
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
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
