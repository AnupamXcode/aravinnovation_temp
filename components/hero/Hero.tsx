"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero3DDigitalArchitecture } from "@/components/hero/Hero3DDigitalArchitecture";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParallaxContainer } from "@/components/motion/ParallaxContainer";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  Award,
  BarChart3,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-4 sm:pt-10 md:pt-16 pb-8 md:pb-12 overflow-hidden bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300 md:min-h-[75vh] flex items-center">
      {/* Soft Ambient Background 3D Glows */}
      <ParallaxContainer speed={-15} className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[950px] md:h-[950px] bg-radial from-[#FCE3D3]/70 via-[#FBF3EA]/30 to-transparent dark:from-[#f15e1c]/15 dark:via-[#1A1613]/40 dark:to-transparent rounded-full blur-3xl" />
        <div className="absolute top-12 right-12 w-80 h-80 bg-[#F4A97F]/20 dark:bg-[#f15e1c]/10 rounded-full blur-3xl" />
      </ParallaxContainer>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            <ScrollTextFlip>
              {/* Single Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f7d7b0]/40 dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#f15e1c]">
                  ENTERPRISE TECHNOLOGY &bull; STRATEGY &bull; DIGITAL GROWTH
                </span>
              </div>
            </ScrollTextFlip>

            <ScrollReveal direction="up" delay={0.15}>
              {/* Word-by-Word Masked Text Reveal Headline */}
              <TextReveal
                text="Building High-Impact Technology Platforms & Accelerated B2B Growth"
                className="font-display font-extrabold text-4xl sm:text-6xl lg:text-[58px] text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-[1.08]"
                stagger={0.05}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              {/* Punchy Supporting Copy */}
              <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Enterprise IT strategy, full-stack software engineering, data compliance (DPDP/SOC-2), and high-intent digital marketing for global brands.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.35}>
              {/* Pill Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm shadow-lg hover:shadow-xl hover:shadow-[#f15e1c]/25"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    Schedule Exploratory Call
                  </Button>
                </Link>

                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm border-[#EFE2D6] dark:border-[#1f1f1f] text-[#f15e1c] hover:border-[#f15e1c]"
                  >
                    Explore Practices
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.45}>
              {/* Trust Badges */}
              <div className="pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f] flex flex-wrap items-center justify-center lg:justify-start gap-8 text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#f15e1c] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    7 Dedicated Practices
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4.5 h-4.5 text-[#f15e1c] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    India, UAE, US, EU &amp; Canada
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4.5 h-4.5 text-[#f15e1c] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    100/100 Core Web Vitals
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Signature 3D Digital Architecture Ecosystem */}
          <div className="lg:col-span-6 relative w-full">
            <ScrollReveal direction="left" delay={0.3}>
              <ParallaxContainer depth="midground" speed={30}>
                <Hero3DDigitalArchitecture />
              </ParallaxContainer>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

