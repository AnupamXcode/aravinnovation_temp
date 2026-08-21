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
      aria-label="Arav Innovations - Elevating Brands, One Click at a Time"
    >
      <div className="relative w-52 sm:w-60 h-13 sm:h-15 flex items-center">
        <Image
          src="/logos/arav-logo.png"
          alt="Arav Innovations Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
    </Link>
  );
}
