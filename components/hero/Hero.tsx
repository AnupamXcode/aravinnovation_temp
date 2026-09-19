"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[calc(100vh-80px)] xl:min-h-[90vh] flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300">
      {/* Background Video Layer */}
      <HeroVideoBackground />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 my-auto flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl lg:max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 flex flex-col items-center">
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] text-[#221811] dark:text-[#FAF5EE] tracking-tight leading-[1.1] sm:leading-[1.08] max-w-3xl lg:max-w-4xl mx-auto text-center"
          >
            Build, Grow & Scale With Technology, AI & Digital Growth
          </motion.h1>

          {/* Core Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-[#3A2E27]/90 dark:text-[#FAF5EE]/90 max-w-2xl mx-auto text-center leading-relaxed font-medium"
          >
            We help businesses turn technology challenges and growth goals into scalable digital solutions and measurable outcomes.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y:  15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:wmauto rounded-full px-8 py-4 text-base font-semibold shadow-md hever:shadow-xl shadow-[#f15e1c]/25 bg-[#f15e1c] text-white hover:bg-[#d84e12] transition-all transform hover:-translate-y-0.5 min-h-[52px] justify-center"
                rightIcon=<ArrowRight className="w-4 h-4 ml-1" />
              >
                Book a Consultation
              </Button>
            </Link>

            <Link href="#services" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:wmauto rounded-full px-8 py-4 text-base font-semibold bg-white/80 dark:bg-black/60 backdrop-blur-md border border-[#3A2E27]/20 dark:border-white/20 text-[#221811] dark:text-[#FAF5EE] hover:bg-white dark:hover:bg-black hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all min-h-[52px] justify-center"
              >
                Explore Solutions
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
