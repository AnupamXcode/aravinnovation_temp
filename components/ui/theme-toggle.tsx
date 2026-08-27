"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={cn(
        "relative z-30 inline-flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all duration-200 cursor-pointer select-none",
        "bg-white dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630]",
        "text-[#1b2823] dark:text-[#ffffff] hover:text-[#f15e1c] dark:hover:text-[#f15e1c]",
        "shadow-xs hover:shadow-md hover:border-[#f15e1c]/50 dark:hover:border-[#f15e1c]/50",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        className
      )}
    >
      <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
        {mounted ? (
          isDark ? (
            <Sun className="w-4 h-4 text-[#f15e1c] transition-transform duration-200" />
          ) : (
            <Moon className="w-4 h-4 text-[#2e936f] transition-transform duration-200" />
          )
        ) : (
          <Moon className="w-4 h-4 text-[#2e936f]" />
        )}
      </div>

      <span className="text-xs font-semibold tracking-wide font-display pointer-events-none">
        {mounted ? (isDark ? "Light Mode" : "Dark Mode") : "Dark Mode"}
      </span>
    </button>
  );
}
