"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  variant?: "header" | "footer";
}

export function BrandLogo({ className, variant = "header" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center group select-none transition-transform hover:scale-[1.02] shrink-0",
        className
      )}
      aria-label="Arav Innovations - Technology & Digital Transformation"
    >
      <div
        className={cn(
          "relative flex items-center",
          variant === "footer"
            ? "w-56 sm:w-64 h-14 sm:h-16"
            : "w-48 sm:w-56 h-12 sm:h-14"
        )}
      >
        <Image
          src="/logos/arav-logo.png"
          alt="Arav Innovations Logo"
          fill
          sizes="(max-width: 640px) 200px, 256px"
          className="object-contain object-left"
          priority
        />
      </div>
    </Link>
  );
}
