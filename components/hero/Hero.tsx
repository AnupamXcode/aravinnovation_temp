"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-8 sm:pt-14 md:pt-20 pb-16 md:pb-28 overflow-hidden bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300 min-h-[88vh] flex items-center">
      {/* 1. Full-Bleed Continuous Photographic Environment Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/homepage-main-bg.png"
          alt="Arav Innovations Executive Technology Platform Environment"
          fill
          priority
          unoptimized
          className="object-cover object-center lg:object-right-top transition-opacity duration-700 opacity-100 dark:opacity-90"
        />

        {/* Minimal Localized Vignette Mask for Text Readability - Sharp Background Intact */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9]/90 via-[#FFFDF9]/40 to-transparent dark:hidden pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/40 via-transparent to-[#FFFDF9]/85 dark:hidden pointer-events-none" />

        {/* Dark Mode Vignette */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/50 to-transparent pointer-events-none" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]/90 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Content (Sitting Directly on Background Image) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-7 text-left max-w-3xl">
            {/* Eyebrow Label */}
            <ScrollTextFlip>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#4A3D35] dark:text-[#D8CBC0]">
                <span className="w-2 h-2 rounded-full bg-[#f15e1c] shrink-0" />
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
                  ENTERPRISE TECHNOLOGY <span className="text-[#f15e1c] font-bold mx-1">&bull;</span> DIGITAL TRANSFORMATION <span className="text-[#f15e1c] font-bold mx-1">&bull;</span> GROWTH
                </span>
              </div>
            </ScrollTextFlip>

            {/* Main Heading */}
            <ScrollReveal direction="up" delay={0.15}>
              <h1 className="font-display font-extrabold text-4xl sm:text-[3.25rem] md:text-6xl lg:text-[66px] xl:text-[74px] 2xl:text-[80px] text-[#221811] dark:text-[#FAF5EE] tracking-tight leading-[1.06]">
                Technology That Moves<br className="hidden sm:inline" />
                <span className="text-[#f15e1c]"> Business </span><span className="text-[#2e936f]">Forward.</span>
              </h1>
            </ScrollReveal>

            {/* Supporting Description */}
            <ScrollReveal direction="up" delay={0.25}>
              <p className="text-base sm:text-lg lg:text-[18px] text-[#5A4A3F] dark:text-[#D8CBC0] max-w-xl leading-relaxed font-medium">
                Arav Innovations helps businesses modernize technology, build better digital experiences, strengthen governance and turn technology investments into practical business progress.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-semibold shadow-md hover:shadow-lg shadow-[#f15e1c]/25 bg-[#f15e1c] text-white hover:bg-[#d84e12] transition-all transform hover:-translate-y-0.5"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    Start a Conversation
                  </Button>
                </Link>

                <Link href="#services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-semibold bg-white/70 dark:bg-black/50 backdrop-blur-xs border border-[#3A2E27]/25 dark:border-white/20 text-[#221811] dark:text-[#FAF5EE] hover:bg-white/95 dark:hover:bg-black/80 hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all"
                  >
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Bottom Proof Row with Truthful Capabilities */}
            <ScrollReveal direction="up" delay={0.45}>
              <div className="pt-6 border-t border-[#3A2E27]/15 dark:border-white/15 flex flex-wrap items-center gap-6 sm:gap-8 text-left text-xs sm:text-sm font-semibold text-[#2C211A] dark:text-[#EFE2D6]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#f15e1c] shrink-0" />
                  <span>Integrated Practice Ecosystem</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4.5 h-4.5 text-[#f15e1c] shrink-0" />
                  <span>India &amp; UAE Operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4.5 h-4.5 text-[#2e936f] shrink-0" />
                  <span>Zero-Downtime Delivery</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Environmental Glass Script Overlay */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center pointer-events-none relative min-h-[280px]">
            <ScrollReveal direction="left" delay={0.3}>
              <div className="text-center transform -rotate-3 select-none opacity-85 hover:opacity-100 transition-opacity">
                <p className="font-serif italic text-lg xl:text-xl text-[#5A4A3F] dark:text-[#C5B8AC] tracking-wide drop-shadow-xs">
                  Technology for a<br />
                  <span className="font-semibold not-italic text-[#f15e1c]">Brighter Tomorrow</span>
                </p>
                <div className="w-24 h-0.5 mx-auto mt-1.5 bg-gradient-to-r from-transparent via-[#f15e1c]/60 to-transparent rounded-full" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

