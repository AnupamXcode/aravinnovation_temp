"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Sparkles, Globe, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function DirectAnswerAEOBlock() {
  return (
    <section
      aria-label="About Arav Innovations"
      className="w-full py-4 sm:py-6 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300"
    >
      <ScrollReveal direction="up">
        <div className="max-w-5xl mx-auto rounded-2xl p-4 sm:p-6 bg-[#fefaf5] dark:bg-[#0c0c0c] border border-[#f7d7b0] dark:border-[#222222] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#f15e1c]">
              ABOUT ARAV INNOVATIONS
            </span>
            <p className="text-xs sm:text-sm text-[#1b2823] dark:text-[#ffffff] font-medium leading-relaxed">
              Arav Innovations is a multidisciplinary B2B technology consulting, full-stack engineering, digital marketing, and governance firm operating globally across India and UAE. We focus on practical software solutions, AI integration, and measurable growth.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#2e936f] dark:text-[#74c4ab] shrink-0 bg-white dark:bg-[#161616] px-3 py-1.5 rounded-xl border border-[#f7d7b0]/60 dark:border-[#262626]">
            <Globe className="w-3.5 h-3.5" />
            <span>India &bull; UAE Global Delivery</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
