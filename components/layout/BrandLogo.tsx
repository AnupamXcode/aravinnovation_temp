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
  if (variant === "footer") {
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex items-center gap-3 sm:gap-4 group select-none transition-transform hover:scale-[1.02] shrink-0 text-left",
          className
        )}
        aria-label="Arav Innovations - Technology & Digital Transformation"
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0">
          <Image
            src="/logos/arav-logo-footer.png"
            alt="Arav Innovations Logo"
            fill
            sizes="(max-width: 640px) 64px, 80px"
            className="object-contain object-left drop-shadow-md"
          />
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-white uppercase tracking-wider block leading-none">
            ARAV INNOVATIONS
          </span>
          <span className="text-[11px] sm:text-xs font-mono text-[#ffec69] font-bold block uppercase tracking-wider">
            Architecting Tomorrow, Today
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center group select-none transition-transform hover:scale-[1.02] shrink-0 text-left",
        className
      )}
      aria-label="Arav Innovations - Technology & Digital Transformation"
    >
      <div className="relative flex items-center w-36 xs:w-44 sm:w-52 md:w-56 h-9 xs:h-10 sm:h-12 md:h-14">
        <Image
          src="/logos/arav-logo.png"
          alt="Arav Innovations Logo"
          fill
          sizes="(max-width: 640px) 160px, 224px"
          className="object-contain object-left"
          priority
        />
      </div>
    </Link>
  );
}
