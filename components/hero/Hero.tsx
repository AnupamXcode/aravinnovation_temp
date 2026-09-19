"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { ArrowRight, ShieldCheck, Globe2, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] xl:min-h-[90vh] flex flex-col justify-center py-12 sm:py-16 lg:py-20 overflow-hidden bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300">
      {/* Background Video Layer with 3D Rotating Glass Cube on Right */}
      <HeroVideoBackground />

      {/* Main Editorial / Enterprise Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 my-auto">
        
        {/* Left-Aligned Content Column Block */}
        <div className="max-w-xl lg:max-w-2xl text-left flex flex-col items-start justify-start">
          
          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] xl:text-[64px] text-[#221811] dark:text-[#FAF5EE] tracking-tight leading-[1.08] text-left"
          >
            Build, Grow &amp; Scale With<br />
            Technology , AI &amp; Digital<br />
            Growth
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-[#3A2E27]/90 dark:text-[#FAF5EE]/90 max-w-xl text-left leading-relaxed font-medium"
          >
            We help businesses turn technology challenges and growth goals into scalable digital solutions and measurable outcomes.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 sm:gap-5 w-full sm:w-auto"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-semibold shadow-md hover:shadow-xl shadow-[#f15e1c]/25 bg-[#f15e1c] text-white hover:bg-[#d84e12] transition-all transform hover:-translate-y-0.5 min-h-[52px] justify-center"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Book a Consultation
              </Button>
            </Link>

            <Link href="#services" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-semibold bg-white/80 dark:bg-black/60 backdrop-blur-md border border-[#3A2E27]/20 dark:border-white/20 text-[#221811] dark:text-[#FAF5EE] hover:bg-white dark:hover:bg-black hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all min-h-[52px] justify-center"
              >
                Explore Solutions
              </Button>
            </Link>
          </motion.div>

          {/* Restored Enterprise Capability / Credibility Row with Pipe Dividers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-12 lg:mt-16 pt-6 border-t border-[#3A2E27]/15 dark:border-white/15 w-full max-w-2xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:divide-x sm:divide-[#3A2E27]/20 dark:sm:divide-white/20 gap-4 sm:gap-0 justify-start">
              
              <div className="flex items-center gap-2.5 sm:pr-6 text-left justify-start">
                <div className="w-7 h-7 rounded-lg bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#f15e1c]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#221811] dark:text-[#FAF5EE] tracking-tight whitespace-nowrap">
                  Enterprise Technology Partner
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:px-6 text-left justify-start">
                <div className="w-7 h-7 rounded-lg bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 flex items-center justify-center shrink-0">
                  <Globe2 className="w-4 h-4 text-[#f15e1c]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#221811] dark:text-[#FAF5EE] tracking-tight whitespace-nowrap">
                  India &amp; UAE Strategic Hubs
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:pl-6 text-left justify-start">
                <div className="w-7 h-7 rounded-lg bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#f15e1c]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#221811] dark:text-[#FAF5EE] tracking-tight whitespace-nowrap">
                  Outcome-Driven Architecture
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
