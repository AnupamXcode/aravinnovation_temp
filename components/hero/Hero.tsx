import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroVideoBackground } from "./HeroVideoBackground";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full sm:min-h-[calc(100vh-90px)] flex flex-col justify-center py-6 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300">
      {/* 1. Full-Bleed Background Video Subcomponent */}
      <HeroVideoBackground />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Main Hero Content Column - Immediate Paint & Zero Hydration Delay */}
          <div className="lg:col-span-8 text-left max-w-3xl space-y-4.5 sm:space-y-7">
            {/* Eyebrow Label & Single Semantic H1 for SEO/AEO */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#4A3D35] dark:text-[#D8CBC0] justify-start">
                <span className="w-2 h-2 rounded-full bg-[#f15e1c] shrink-0" />
                <h1 className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#f15e1c]">
                  <span className="sm:hidden">ENTERPRISE TECHNOLOGY • AI • DIGITAL GROWTH</span>
                  <span className="hidden sm:inline">Enterprise Technology, AI &amp; Digital Growth Solutions</span>
                </h1>
              </div>

              {/* Main Visual Headline */}
              <p className="font-display font-extrabold text-3xl sm:text-[3.25rem] md:text-6xl lg:text-[66px] xl:text-[74px] 2xl:text-[80px] text-[#221811] dark:text-[#FAF5EE] tracking-tight leading-[1.1] sm:leading-[1.06]">
                <span className="sm:hidden">
                  Technology That<br />
                  Moves <span className="text-[#f15e1c]">Business</span><br />
                  <span className="text-[#2e936f]">Forward.</span>
                </span>
                <span className="hidden sm:inline">
                  Technology That Moves<br />
                  <span className="text-[#f15e1c]"> Business </span><span className="text-[#2e936f]">Forward.</span>
                </span>
              </p>
            </div>

            {/* Supporting Description — CEO Blueprint Approved Copy */}
            <p className="text-sm sm:text-lg lg:text-[18px] text-[#3A2E27] dark:text-[#FAF5EE] max-w-xl leading-relaxed font-medium">
              <span className="sm:hidden">
                We turn complex technology into smarter systems, stronger digital experiences, and measurable business growth.
              </span>
              <span className="hidden sm:inline">
                Arav Innovations helps growing enterprises modernize legacy technology, build exceptional digital experiences, automate workflows with AI, strengthen governance, and turn technology investments into predictable revenue growth.
              </span>
            </p>

            {/* Primary CTAs — CEO Blueprint Text */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-7 py-3 sm:px-8 sm:py-3.5 text-sm font-semibold shadow-md hover:shadow-lg shadow-[#f15e1c]/25 bg-[#f15e1c] text-white hover:bg-[#d84e12] transition-all transform hover:-translate-y-0.5"
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                >
                  Talk to an Expert
                </Button>
              </Link>

              <Link href="#services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-7 py-3 sm:px-8 sm:py-3.5 text-sm font-semibold bg-white/70 dark:bg-black/50 backdrop-blur-xs border border-[#3A2E27]/25 dark:border-white/20 text-[#221811] dark:text-[#FAF5EE] hover:bg-white/95 dark:hover:bg-black/80 hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all"
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>

            {/* Bottom Proof Row */}
            <div className="pt-4 sm:pt-6 border-t border-[#3A2E27]/15 dark:border-white/15 flex flex-wrap items-center gap-3.5 sm:gap-8 text-left text-xs sm:text-sm font-semibold text-[#2C211A] dark:text-[#EFE2D6]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#f15e1c] shrink-0" />
                <span className="sm:hidden">One Connected Technology Partner</span>
                <span className="hidden sm:inline">Unified Practice Ecosystem</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#f15e1c] shrink-0" />
                <span>India &amp; UAE Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#2e936f] shrink-0" />
                <span className="sm:hidden">Built Around Business Outcomes</span>
                <span className="hidden sm:inline">Outcome-First Engineering</span>
              </div>
            </div>
          </div>

          {/* Right Column: Environmental Glass Script Overlay */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center pointer-events-none relative min-h-[280px]">
            <div className="text-center transform -rotate-3 select-none opacity-85 hover:opacity-100 transition-opacity">
              <p className="font-serif italic text-lg xl:text-xl text-[#5A4A3F] dark:text-[#C5B8AC] tracking-wide drop-shadow-xs">
                Technology for a<br />
                <span className="font-semibold not-italic text-[#f15e1c]">Brighter Tomorrow</span>
              </p>
              <div className="w-24 h-0.5 mx-auto mt-1.5 bg-gradient-to-r from-transparent via-[#f15e1c]/60 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

