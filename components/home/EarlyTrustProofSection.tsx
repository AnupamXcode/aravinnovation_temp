"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ShieldCheck, ArrowRight, Lock, Zap } from "lucide-react";

export function EarlyTrustProofSection() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 my-4 md:my-6">
      <section className="py-8 md:py-10 px-6 sm:px-10 rounded-[2rem] bg-gradient-to-r from-[#fefaf5] via-white to-[#fefaf5] dark:from-[#0c0c0c] dark:via-[#121212] dark:to-[#0c0c0c] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#f15e1c]/10 via-[#f15e1c]/40 to-[#f15e1c]/10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Proof Statement */}
          <div className="lg:col-span-5 space-y-3">
            <Badge variant="secondary" size="md">
              VERIFIED EXECUTION & TRUST
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight">
              Evidence-Based Delivery, Not Marketing Claims
            </h3>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
              Every architecture recommendation, security framework, and growth campaign is grounded in proven engineering methodologies and verified outcomes.
            </p>
            <div className="pt-1">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#f15e1c] hover:text-[#d8480d] transition-colors"
              >
                <span>View Verified Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Verified Proof Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0]/80 dark:border-[#262626] space-y-2 shadow-xs hover:border-[#f15e1c] transition-all">
                <div className="w-8 h-8 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Performance &amp; Scale
                </h4>
                <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] leading-normal">
                  Sub-second edge rendering and zero-downtime microservices architectures.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0]/80 dark:border-[#262626] space-y-2 shadow-xs hover:border-[#2e936f] transition-all">
                <div className="w-8 h-8 rounded-xl bg-[#2e936f]/10 text-[#2e936f] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Governance &amp; Privacy
                </h4>
                <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] leading-normal">
                  DPDP Act, ISO 27001 &amp; SOC 2 compliance advisory guardrails.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0]/80 dark:border-[#262626] space-y-2 shadow-xs hover:border-[#fab60a] transition-all">
                <div className="w-8 h-8 rounded-xl bg-[#fab60a]/10 text-[#fab60a] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Verified Code Ownership
                </h4>
                <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] leading-normal">
                  100% IP ownership delivered directly into your internal Git repos.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
