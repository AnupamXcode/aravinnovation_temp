"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ShieldCheck, ArrowRight, Lock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function EarlyTrustProofSection() {
  const [activeMobileIdx, setActiveMobileIdx] = React.useState<number | null>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxStr = entry.target.getAttribute("data-card-idx");
          if (idxStr !== null && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveMobileIdx(parseInt(idxStr, 10));
          }
        });
      },
      { root: null, rootMargin: "-20% 0px -20% 0px", threshold: [0.5] }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 my-2 sm:my-4 md:my-6">
      <section className="py-4 sm:py-8 md:py-10 px-4 sm:px-10 rounded-2xl sm:rounded-[2rem] bg-gradient-to-r from-[#fefaf5] via-white to-[#fefaf5] dark:from-[#0c0c0c] dark:via-[#121212] dark:to-[#0c0c0c] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#f15e1c]/10 via-[#f15e1c]/40 to-[#f15e1c]/10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          {/* Left Column: Proof Statement */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <Badge variant="secondary" size="md">
              VERIFIED EXECUTION & TRUST
            </Badge>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight">
              Evidence-Based Delivery, Not Marketing Claims
            </h3>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
              Every architecture recommendation, security framework, and growth campaign is grounded in proven engineering methodologies and verified outcomes.
            </p>
            <div className="pt-1 sm:pt-2">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#f15e1c] hover:text-[#d8480d] transition-colors"
              >
                <span>View Verified Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Verified Proof Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            <ScrollReveal direction="up" delay={0.1}>
              <div
                ref={(el) => { cardRefs.current[0] = el; }}
                data-card-idx="0"
                className={cn(
                  "p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#161616] border space-y-2 sm:space-y-2.5 shadow-xs transition-all duration-300",
                  activeMobileIdx === 0
                    ? "border-[#f15e1c] ring-1 ring-[#f15e1c]/40 bg-[#fffcf9] dark:bg-[#1c1613]"
                    : "border-[#f7d7b0]/80 dark:border-[#262626] hover:border-[#f15e1c]"
                )}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Performance &amp; Scale
                </h4>
                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  Sub-second edge rendering and zero-downtime microservices architectures.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div
                ref={(el) => { cardRefs.current[1] = el; }}
                data-card-idx="1"
                className={cn(
                  "p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#161616] border space-y-2 sm:space-y-2.5 shadow-xs transition-all duration-300",
                  activeMobileIdx === 1
                    ? "border-[#2e936f] ring-1 ring-[#2e936f]/40 bg-[#f7fcf9] dark:bg-[#121c17]"
                    : "border-[#f7d7b0]/80 dark:border-[#262626] hover:border-[#2e936f]"
                )}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#2e936f]/10 text-[#2e936f] flex items-center justify-center">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Governance &amp; Privacy
                </h4>
                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  DPDP Act, ISO 27001 &amp; SOC 2 compliance advisory guardrails.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div
                ref={(el) => { cardRefs.current[2] = el; }}
                data-card-idx="2"
                className={cn(
                  "p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#161616] border space-y-2 sm:space-y-2.5 shadow-xs transition-all duration-300",
                  activeMobileIdx === 2
                    ? "border-[#fab60a] ring-1 ring-[#fab60a]/40 bg-[#fdfcf5] dark:bg-[#1c1a11]"
                    : "border-[#f7d7b0]/80 dark:border-[#262626] hover:border-[#fab60a]"
                )}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#fab60a]/10 text-[#fab60a] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Verified Code Ownership
                </h4>
                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
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
