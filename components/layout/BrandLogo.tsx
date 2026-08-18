"use client";

import * as React from "react";
import Link from "next/link";
import { AravLogo } from "./AravLogoSvg";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  variant?: "header" | "footer";
}

export function BrandLogo({ className, variant = "header" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center group select-none transition-transform hover:scale-[1.02]", className)}
      aria-label="Arav Innovations - Elevating Growth, One Click at a Time"
    >
      <AravLogo showTagline={variant === "header"} />
    </Link>
  );
}
