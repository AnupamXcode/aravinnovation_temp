"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  variant?: "header" | "footer";
}

export function BrandLogo({ className }: BrandLogoProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3 group select-none", className)}
      aria-label="Arav Innovations Home"
    >
      {!imgError ? (
        <div className="relative h-9 w-36 sm:w-44 flex items-center">
          <Image
            src="/logos/logo.svg"
            alt="Arav Innovations"
            width={170}
            height={36}
            className="h-9 w-auto object-contain transition-transform group-hover:scale-[1.02] dark:brightness-110"
            priority
            onError={() => {
              setImgError(true);
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-[#3A2E27] dark:text-[#FAF5EE]">
              ARAV<span className="text-[#E8672A] font-bold">.</span>INNOVATIONS
            </span>
          </div>
          <span className="text-[9px] tracking-wider uppercase font-semibold text-[#7A6A5F] dark:text-[#B8ACA0] -mt-0.5">
            Technology • Strategy • Growth
          </span>
        </div>
      )}
    </Link>
  );
}
