import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]", className)}
    >
      <Link
        href="/"
        className="flex items-center hover:text-[#f15e1c] transition-colors"
      >
        <Home className="w-3.5 h-3.5 mr-1 text-[#f15e1c]" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-[#4a5c55]/50 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-semibold text-[#1b2823] dark:text-[#ffffff] truncate">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#f15e1c] transition-colors truncate"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
