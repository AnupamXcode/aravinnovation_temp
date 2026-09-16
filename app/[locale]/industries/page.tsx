"use client";

import * as React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { industriesData } from "@/data/industries";
import {
  Building2,
  Cpu,
  HeartPulse,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Factory,
  Home,
  Truck,
  Rocket,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Cpu,
  HeartPulse,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Factory,
  Home,
  Truck,
  Rocket,
};

export default function IndustriesPage() {
  const [activeSlug, setActiveSlug] = React.useState<string>(industriesData[0].slug);

  const selectedIndustry = React.useMemo(() => {
    return industriesData.find((ind) => ind.slug === activeSlug) || industriesData[0];
  }, [activeSlug]);

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Industries", url: "/industries" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Industries" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" size="md">
                Enterprise Sector Solutions
              </Badge>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-tight">
              Technology &amp; Growth Solutions Aligned With Your Sector
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-sm sm:text-base md:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
              We apply enterprise engineering, governance, and digital growth capabilities to solve specific operational, regulatory, and scalability demands across 10 core industries.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Industry Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-[#f7d7b0]/60 dark:border-[#1f1f1f]">
          {industriesData.map((ind) => {
            const IconComponent = iconMap[ind.icon] || Building2;
            const isActive = ind.slug === activeSlug;
            return (
              <button
                key={ind.slug}
                type="button"
                onClick={() => setActiveSlug(ind.slug)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer border min-h-[44px]",
                  isActive
                    ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md shadow-[#f15e1c]/20 scale-[1.02]"
                    : "bg-white dark:bg-[#0a0a0a] border-[#f7d7b0]/80 dark:border-[#1f1f1f] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c]/50 hover:bg-[#fefaf5] dark:hover:bg-[#161616]"
                )}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Spotlight Card */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1f1f1f] p-5 sm:p-8 lg:p-10 shadow-lg space-y-6 sm:space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-[#f7d7b0]/50 dark:border-[#1f1f1f]">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                  <span>Featured Sector Overview</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {selectedIndustry.name}
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {selectedIndustry.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3 pt-2 lg:pt-0">
                <Link href={`/industries/${selectedIndustry.slug}`} className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto bg-[#f15e1c] hover:bg-[#d8480d] text-white min-h-[44px]"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    View Full {selectedIndustry.name} Solutions
                  </Button>
                </Link>
              </div>
            </div>

            {/* Grid Breakdown: Challenges vs Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
              {/* Common Sector Challenges */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#fefaf5] dark:bg-[#111111] border border-[#f7d7b0]/80 dark:border-[#1f1f1f] space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#1b2823] dark:text-[#ffffff]">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <span>Key Sector Business Challenges</span>
                </div>
                <ul className="space-y-2.5">
                  {selectedIndustry.challenges.map((ch, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-[#f15e1c] shrink-0 mt-0.5" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How Arav Solves It */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#2e936f]/10 dark:bg-[#2e936f]/15 border border-[#2e936f]/30 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#1b2823] dark:text-[#ffffff]">
                  <div className="p-2 rounded-xl bg-[#2e936f]/20 text-[#2e936f] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Arav Delivery &amp; Support Model</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {selectedIndustry.aravApproach}
                </p>
                <div className="pt-2 border-t border-[#2e936f]/20">
                  <span className="text-xs font-bold text-[#2e936f] block mb-1">Expected Measurable Outcome:</span>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1b2823] dark:text-[#ffffff]">
                    <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                    <span>{selectedIndustry.expectedOutcome}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Relevant Capabilities & Recommended Tech */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 pt-2">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff] mb-2.5">
                  Aligned Capabilities:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-[#fefaf5] dark:bg-[#161616] text-[#1b2823] dark:text-[#ffffff] text-xs font-medium border border-[#f7d7b0]/60 dark:border-[#1f1f1f] flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#f15e1c]" />
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff] mb-2.5">
                  Recommended Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry.recommendedTech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-[#fefaf5] dark:bg-[#111111] text-[#4a5c55] dark:text-[#d3eee4] text-xs font-mono border border-[#f7d7b0]/60 dark:border-[#1f1f1f]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* All 10 Sector Cards Overview Grid (Each Card is Clickable to /industries/[slug]) */}
        <div className="space-y-4 sm:space-y-6 pt-4">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
              All 10 Enterprise Sectors
            </h3>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              Select any industry card below to navigate to dedicated sector solutions, challenges, capabilities, and consultation links.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {industriesData.map((ind, idx) => {
              const IconComponent = iconMap[ind.icon] || Building2;

              return (
                <ScrollReveal key={ind.slug} delay={idx * 0.04} direction="up">
                  <Link href={`/industries/${ind.slug}`} className="block h-full group focus:outline-hidden">
                    <TiltCard maxTilt={4} scale={1.01} className="h-full">
                      <div className="h-full rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1f1f1f] group-hover:border-[#f15e1c] group-hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="p-2.5 rounded-xl bg-[#f7d7b0]/40 dark:bg-[#161616] text-[#f15e1c] group-hover:bg-[#f15e1c] group-hover:text-white transition-colors">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#fefaf5] dark:bg-[#111111] text-[#f15e1c] font-bold border border-[#f7d7b0]/60 dark:border-[#1f1f1f]">
                              ENTERPRISE SECTOR
                            </span>
                          </div>

                          <h4 className="text-base sm:text-lg font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                            {ind.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed line-clamp-2">
                            {ind.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1f1f1f] flex items-center justify-between text-xs font-mono font-bold text-[#f15e1c]">
                          <span>Explore Industry Solution</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
