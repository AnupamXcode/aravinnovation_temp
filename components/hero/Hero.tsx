"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero3DScene } from "@/components/motion/Hero3DScene";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300 min-h-[85vh] flex items-center">
      {/* Soft Ambient Background 3D Glows */}
      <ParallaxContainer speed={-15} className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[950px] md:h-[950px] bg-radial from-[#FCE3D3]/70 via-[#FBF3EA]/30 to-transparent dark:from-[#E8672A]/15 dark:via-[#1A1613]/40 dark:to-transparent rounded-full blur-3xl" />
        <div className="absolute top-12 right-12 w-80 h-80 bg-[#F4A97F]/20 dark:bg-[#E8672A]/10 rounded-full blur-3xl" />
      </ParallaxContainer>

      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <ScrollReveal direction="up" delay={0.05}>
              {/* Single Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f7d7b0]/40 dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#253630] text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#f15e1c]">
                  ENTERPRISE TECHNOLOGY &bull; STRATEGY &bull; DIGITAL GROWTH
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
              {/* Word-by-Word Masked Text Reveal Headline */}
              <TextReveal
                text="Building High-Impact Technology Platforms & Accelerated B2B Growth"
                className="font-display font-extrabold text-4xl sm:text-6xl lg:text-[62px] text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-[1.08]"
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
                    className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm shadow-lg hover:shadow-xl hover:shadow-[#E8672A]/25"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    Schedule Exploratory Call
                  </Button>
                </Link>

                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm border-[#EFE2D6] dark:border-[#2C241E] text-[#E8672A] hover:border-[#E8672A]"
                  >
                    Explore Practices
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.45}>
              {/* Trust Badges */}
              <div className="pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] flex flex-wrap items-center justify-center lg:justify-start gap-8 text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#E8672A] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    7 Dedicated Practices
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4.5 h-4.5 text-[#E8672A] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    India, UAE, US, EU &amp; Canada
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4.5 h-4.5 text-[#E8672A] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    Engineering &amp; ROI Led
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Clean Interactive Centerpiece */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={0.3}>
              <Hero3DScene />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

