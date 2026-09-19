"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroVideoBackground } from "./HeroVideoBackground";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  Sparkles,
  Layers,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full flex flex-col justify-center py-10 sm:py-14 md:py-16 lg:py-20 overflow-hidden bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300 min-h-[580px] sm:min-h-[640px] lg:min-h-[680px]">
      {/* Background Video Layer (Autoplay, Loop, Muted, PlaysInline preserved) */}
      <HeroVideoBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Controlled Content Area (45%-52% desktop width) */}
          <div className="lg:col-span-7 text-left space-y-4 sm:space-y-6 max-w-2xl">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fce3d3]/60 dark:bg-[#161616]/80 border border-[#f7d7b0]/80 dark:border-[#282828] backdrop-blur-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#f15e1c] shrink-0 animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#f15e1c]">
                TECHNOLOGY &bull; AI &bull; DIGITAL GROWTH
              </span>
            </motion.div>

            {/* Semantic H1 Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="font-display font-extrabold text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] text-[#221811] dark:text-[#FAF5EE] tracking-tight leading-[1.14] sm:leading-[1.1] max-w-2xl"
            >
              Build, Grow &amp; Scale With Technology, AI &amp; Digital Growth
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-sm sm:text-base lg:text-lg text-[#3A2E27]/90 dark:text-[#FAF5EE]/90 max-w-xl leading-relaxed font-medium"
            >
              We help businesses turn technology challenges, ideas and growth goals into scalable digital solutions, AI-powered experiences and measurable digital growth.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-7 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold shadow-md hover:shadow-xl shadow-[#f15e1c]/25 bg-[#f15e1c] text-white hover:bg-[#d84e12] transition-all transform hover:-translate-y-0.5 min-h-[48px] justify-center"
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                >
                  Book a Consultation
                </Button>
              </Link>

              <Link href="#services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-7 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold bg-white/80 dark:bg-black/60 backdrop-blur-md border border-[#3A2E27]/20 dark:border-white/20 text-[#221811] dark:text-[#FAF5EE] hover:bg-white dark:hover:bg-black hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all min-h-[48px] justify-center"
                >
                  Explore Solutions
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Strategic Proof Badges Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="pt-4 sm:pt-5 border-t border-[#3A2E27]/15 dark:border-white/15 flex flex-wrap items-center gap-3 sm:gap-6 text-left text-[12px] sm:text-xs font-semibold text-[#2C211A] dark:text-[#EFE2D6]"
            >
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
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Enterprise Capabilities Visual Card (Desktop lg:flex, Mobile compact strip) */}
          <div className="lg:col-span-5 w-full">
            {/* Desktop Visual Card (lg:block hidden) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block w-full max-w-md mx-auto relative group"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#f15e1c]/20 via-[#fab60a]/15 to-[#2e936f]/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              {/* Glassmorphism Capabilities Pillar Card */}
              <div className="relative p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-[#f7d7b0] dark:border-[#222222] shadow-2xl space-y-4">
                {/* Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#f7d7b0]/70 dark:border-[#202020]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-pulse" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#221811] dark:text-[#FAF5EE]">
                      ARAV DIGITAL CORE
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#fce3d3]/80 dark:bg-[#181818] border border-[#f7d7b0] dark:border-[#282828] text-[10px] font-mono font-bold text-[#f15e1c]">
                    Global Capabilities
                  </span>
                </div>

                {/* 3 Core Pillar Rows */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-[#FFFDF9]/90 dark:bg-[#121212]/90 border border-[#f7d7b0]/60 dark:border-[#222222] flex items-center justify-between group/item hover:border-[#f15e1c]/60 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#f15e1c]/12 text-[#f15e1c] shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-display text-[#221811] dark:text-[#FAF5EE]">
                          AI &amp; Intelligent Automation
                        </div>
                        <div className="text-[11px] text-[#3A2E27]/75 dark:text-[#FAF5EE]/70 font-medium">
                          Custom AI Models &amp; Workflows
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0 opacity-80" />
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFFDF9]/90 dark:bg-[#121212]/90 border border-[#f7d7b0]/60 dark:border-[#222222] flex items-center justify-between group/item hover:border-[#2e936f]/60 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#2e936f]/12 text-[#2e936f] shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-display text-[#221811] dark:text-[#FAF5EE]">
                          Web &amp; Cloud Solutions
                        </div>
                        <div className="text-[11px] text-[#3A2E27]/75 dark:text-[#FAF5EE]/70 font-medium">
                          Scalable Enterprise Ecosystems
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0 opacity-80" />
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFFDF9]/90 dark:bg-[#121212]/90 border border-[#f7d7b0]/60 dark:border-[#222222] flex items-center justify-between group/item hover:border-[#fab60a]/60 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#fab60a]/15 text-[#fab60a] shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-display text-[#221811] dark:text-[#FAF5EE]">
                          Measurable Digital Growth
                        </div>
                        <div className="text-[11px] text-[#3A2E27]/75 dark:text-[#FAF5EE]/70 font-medium">
                          Performance &amp; Market Scaling
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0 opacity-80" />
                  </div>
                </div>

                {/* Card Footer Banner */}
                <div className="pt-2 text-center flex items-center justify-between text-[11px] font-mono text-[#3A2E27]/80 dark:text-[#FAF5EE]/75 border-t border-[#f7d7b0]/50 dark:border-[#1e1e1e]">
                  <span className="font-semibold text-[#2e936f] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2e936f] inline-block" />
                    Strategic Consulting Model
                  </span>
                  <span className="font-bold text-[#f15e1c]">
                    India &bull; UAE &bull; Global
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Mobile Compact Capability Strip (block lg:hidden) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="block lg:hidden mt-2 pt-4 border-t border-[#3A2E27]/15 dark:border-white/15"
            >
              <div className="p-4 rounded-2xl bg-white/75 dark:bg-[#0a0a0a]/80 backdrop-blur-md border border-[#f7d7b0] dark:border-[#222222] space-y-2.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f15e1c]">
                  3 CORE ENTERPRISE PILLARS
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 text-left">
                  <div className="p-2 rounded-xl bg-[#FFFDF9] dark:bg-[#121212] border border-[#f7d7b0]/50 dark:border-[#202020] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#f15e1c] shrink-0" />
                    <span className="text-[11px] font-bold text-[#221811] dark:text-[#FAF5EE] truncate">
                      AI Solutions
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFFDF9] dark:bg-[#121212] border border-[#f7d7b0]/50 dark:border-[#202020] flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                    <span className="text-[11px] font-bold text-[#221811] dark:text-[#FAF5EE] truncate">
                      Web &amp; Cloud
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFFDF9] dark:bg-[#121212] border border-[#f7d7b0]/50 dark:border-[#202020] flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-[#fab60a] shrink-0" />
                    <span className="text-[11px] font-bold text-[#221811] dark:text-[#FAF5EE] truncate">
                      Digital Growth
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
