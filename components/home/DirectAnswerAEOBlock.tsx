"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Sparkles, Globe, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export function DirectAnswerAEOBlock() {
  return (
    <section
      aria-label="About Arav Innovations"
      className="w-full py-6 md:py-10 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300"
    >
      <ScrollReveal direction="up">
        <div className="max-w-6xl mx-auto rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#fefaf5] via-white to-[#fdf6ee] dark:from-[#0a0a0a] dark:via-[#111111] dark:to-[#161616] border-2 border-[#f7d7b0] dark:border-[#222222] shadow-xl space-y-6 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#f15e1c]/5 dark:bg-[#f15e1c]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header with AEO Question Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f7d7b0]/60 dark:border-[#222222] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center font-bold shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#f15e1c]">
                  EXECUTIVE BRIEFING &bull; DIRECT ANSWER
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  What Does Arav Innovations Do?
                </h2>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#2e936f] dark:text-[#74c4ab]">
              <Globe className="w-3.5 h-3.5" />
              <span>India &bull; UAE Global Operations</span>
            </div>
          </div>

          {/* Core Direct Answer Content — Exact CEO Blueprint Copy */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <p className="text-base sm:text-lg font-bold text-[#1b2823] dark:text-[#ffffff] leading-relaxed">
                Arav Innovations is an enterprise technology transformation and digital growth firm with strategic delivery hubs in India and the UAE.
              </p>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                We integrate IT strategy, custom software engineering, AI workflow automation, performance marketing, and enterprise risk &amp; compliance into a unified operational ecosystem designed to drive measurable business outcomes.
              </p>
            </div>

            <div className="md:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#141414] border border-[#f7d7b0] dark:border-[#262626] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Unified Enterprise Ecosystem</span>
              </div>
              <ul className="text-xs text-[#1b2823] dark:text-[#ffffff] space-y-1.5 font-semibold">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f15e1c]" />
                  <span>IT Strategy &amp; Legacy Modernization</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2e936f]" />
                  <span>AI &amp; Intelligent Workflow Automation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fab60a]" />
                  <span>Custom Web, Cloud &amp; Mobile Engineering</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f15e1c]" />
                  <span>Digital Marketing, Technical SEO &amp; AEO</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2e936f]" />
                  <span>Enterprise Risk, Governance &amp; Compliance</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-[#f7d7b0]/50 dark:border-[#222222]">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#f15e1c] hover:text-[#d84e12] inline-flex items-center gap-1 group"
                >
                  <span>Request an Expert Consultation</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
