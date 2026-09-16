import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { ArrowRight, ShieldCheck, Zap, Globe2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full sm:min-h-[calc(100vh-90px)] flex flex-col justify-center py-6 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300">
      {/* Background Video Layer */}
      <HeroVideoBackground />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Main Hero Content Column */}
          <div className="lg:col-span-8 text-left max-w-3xl space-y-4 sm:space-y-6">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#4A3D35] dark:text-[#D8CBC0] justify-start">
              <span className="w-2 h-2 rounded-full bg-[#f15e1c] shrink-0 animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#f15e1c]">
                TECHNOLOGY &bull; AI &bull; DIGITAL GROWTH
              </span>
            </div>

            {/* Semantic H1 Headline */}
            <h1 className="font-display font-extrabold text-[28px] xs:text-[34px] sm:text-[3.25rem] md:text-5xl lg:text-[58px] xl:text-[66px] text-[#221811] dark:text-[#FAF5EE] tracking-tight leading-[1.14] sm:leading-[1.08]">
              Build, Grow &amp; Scale With Technology, AI &amp; Digital Growth
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-lg lg:text-[18px] text-[#3A2E27] dark:text-[#FAF5EE] max-w-2xl leading-relaxed font-medium">
              We help businesses turn technology challenges, ideas and growth goals into scalable digital solutions, AI-powered experiences and measurable digital growth.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-7 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold shadow-md hover:shadow-lg shadow-[#f15e1c]/25 bg-[#f15e1c] text-white hover:bg-[#d84e12] transition-all transform hover:-translate-y-0.5 min-h-[48px]"
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                >
                  Book a Consultation
                </Button>
              </Link>

              <Link href="#services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-7 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold bg-white/80 dark:bg-black/60 backdrop-blur-xs border border-[#3A2E27]/25 dark:border-white/20 text-[#221811] dark:text-[#FAF5EE] hover:bg-white dark:hover:bg-black hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all min-h-[48px]"
                >
                  Explore Solutions
                </Button>
              </Link>
            </div>

            {/* Proof Row */}
            <div className="pt-4 sm:pt-6 border-t border-[#3A2E27]/15 dark:border-white/15 flex flex-wrap items-center gap-3 sm:gap-8 text-left text-[12px] sm:text-sm font-semibold text-[#2C211A] dark:text-[#EFE2D6]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#f15e1c] shrink-0" />
                <span>Enterprise Technology Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#f15e1c] shrink-0" />
                <span>India &amp; UAE Strategic Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#2e936f] shrink-0" />
                <span>Outcome-Driven Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Card */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center pointer-events-none relative min-h-[280px]">
            <div className="text-center transform -rotate-2 select-none opacity-90 hover:opacity-100 transition-opacity p-6 rounded-3xl bg-white/70 dark:bg-black/60 backdrop-blur-md border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#f15e1c] mb-2">
                ARAV CONSULTING MODEL
              </p>
              <p className="font-serif italic text-lg xl:text-xl text-[#3A2E27] dark:text-[#FAF5EE] tracking-wide leading-snug">
                Technology for a<br />
                <span className="font-semibold not-italic text-[#2e936f]">Measurable Impact</span>
              </p>
              <div className="w-20 h-0.5 mx-auto mt-3 bg-gradient-to-r from-transparent via-[#f15e1c]/60 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
