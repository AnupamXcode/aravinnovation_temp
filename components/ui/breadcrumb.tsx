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
      className={cn("flex items-center space-x-2 text-xs sm:text-sm text-[#7A6A5F]", className)}
    >
      <Link
        href="/"
        className="flex items-center hover:text-[#E8672A] transition-colors"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-[#7A6A5F]/50 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-semibold text-[#3A2E27] truncate">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#E8672A] transition-colors truncate"
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
