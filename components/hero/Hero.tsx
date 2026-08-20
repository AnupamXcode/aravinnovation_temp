"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero3DScene } from "@/components/motion/Hero3DScene";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      {/* Soft Ambient Background 3D Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[850px] md:h-[850px] bg-radial from-[#FCE3D3]/70 via-[#FBF3EA]/40 to-transparent dark:from-[#E8672A]/10 dark:via-[#1A1613]/50 dark:to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#F4A97F]/20 dark:bg-[#E8672A]/10 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <ScrollReveal direction="up" delay={0.1}>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <Badge variant="secondary" size="md" className="py-1.5 px-3.5 border-[#E8672A]/30">
                  <span className="w-2 h-2 rounded-full bg-[#E8672A] animate-pulse" />
                  <span className="text-[#3A2E27] dark:text-[#FAF5EE] font-semibold text-xs tracking-wider">
                    RESULT-DRIVEN DIGITAL EXCELLENCE &bull; GLOBAL
                  </span>
                </Badge>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              {/* Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-[1.12]">
                Shaping Online Futures & Scaling Enterprises{" "}
                <span className="text-[#E8672A] underline decoration-[#F4A97F]/60 decoration-wavy decoration-2">
                  Globally
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              {/* Supporting Line */}
              <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Partner with Arav Innovations for IT strategy, full-stack software development, performance digital marketing, compliance, audits, and dedicated talent solutions engineered for business growth.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto shadow-md hover:shadow-xl hover:shadow-[#E8672A]/25"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => {
                      trackEvent({
                        type: "cta_click",
                        label: "Contact Us (Hero)",
                        location: "hero_primary",
                        targetUrl: "/contact",
                      });
                    }}
                  >
                    Contact Us →
                  </Button>
                </Link>

                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      trackEvent({
                        type: "cta_click",
                        label: "Explore 7 Practices (Hero)",
                        location: "hero_secondary",
                        targetUrl: "/services",
                      });
                    }}
                  >
                    Explore 7 Practices
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              {/* Trust Badges */}
              <div className="pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E8672A] shrink-0" />
                  <span className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    7 Dedicated Practices
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#E8672A] shrink-0" />
                  <span className="text-[10px] sm:text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] leading-tight">
                    India, UAE, US, EU & Canada Operations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#E8672A] shrink-0" />
                  <span className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    Engineering & ROI Led
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3D Interactive Centerpiece */}
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
