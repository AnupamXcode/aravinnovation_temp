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
        "bg-white dark:bg-[#1C1814] border-[#EFE2D6] dark:border-[#3D332B]",
        "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] dark:hover:text-[#E8672A]",
        "shadow-xs hover:shadow-md hover:border-[#E8672A]/50 dark:hover:border-[#E8672A]/50",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        className
      )}
    >
      <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
        {mounted ? (
          isDark ? (
            <Sun className="w-4 h-4 text-[#E8672A] transition-transform duration-200" />
          ) : (
            <Moon className="w-4 h-4 text-[#7A6A5F] transition-transform duration-200" />
          )
        ) : (
          <Moon className="w-4 h-4 text-[#7A6A5F]" />
        )}
      </div>

      <span className="text-xs font-semibold tracking-wide font-display pointer-events-none">
        {mounted ? (isDark ? "Light Mode" : "Dark Mode") : "Dark Mode"}
      </span>
    </button>
  );
}
