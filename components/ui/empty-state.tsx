import * as React from "react";
import Link from "next/link";
import { Button } from "./button";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon = <FolderOpen className="w-8 h-8 text-[#f15e1c]" />,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white dark:bg-[#000000] p-8 sm:p-12 border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm text-center max-w-md mx-auto space-y-4",
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#FCE3D3]/60 dark:bg-[#161616] border border-[#F4A97F]/30 dark:border-[#262626] flex items-center justify-center mx-auto shadow-xs">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
        {description}
      </p>
      {actionLabel && actionHref && (
        <div className="pt-2">
          <Link href={actionHref}>
            <Button variant="primary" size="md" className="rounded-full shadow-sm">
              {actionLabel}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
