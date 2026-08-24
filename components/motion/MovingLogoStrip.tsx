"use client";

import * as React from "react";
import { clientLogos } from "@/data/clients";
import { cn } from "@/lib/utils";

export function MovingLogoStrip({ className }: { className?: string }) {
  // Duplicate logos array twice to create seamless continuous marquee loop
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <div className={cn("relative overflow-hidden w-full group py-3", className)}>
      {/* Edge Blur Gradients */}
      <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-[#101b17] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-[#101b17] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max items-center gap-4 sm:gap-6 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {duplicatedLogos.map((client, idx) => (
          <div
            key={`${client.id}-${idx}`}
            className="h-14 sm:h-16 px-6 rounded-2xl bg-[#ffffff] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] flex items-center justify-center text-center transition-all duration-300 hover:border-[#f15e1c] hover:bg-[#f7d7b0]/30 dark:hover:bg-[#1e2c27] hover:scale-105 shadow-xs shrink-0 cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <span className="text-xs sm:text-sm font-display font-extrabold text-[#1b2823] dark:text-[#ffffff] tracking-wider uppercase">
                {client.logoText || client.name}
              </span>
              <span className="text-[10px] font-mono text-[#4a5c55] dark:text-[#d3eee4] tracking-tight mt-0.5">
                {client.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
