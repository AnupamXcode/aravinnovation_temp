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
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Industries", url: "/industries" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Industries" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" size="md">
                Industry Solutions
              </Badge>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Technology Solutions Aligned With Your Industry Context
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              We apply our enterprise engineering, compliance, and growth capabilities to solve the specific operational, regulatory, and transaction demands of high-impact sectors.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Industry Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
          {industriesData.map((ind) => {
            const IconComponent = iconMap[ind.icon] || Building2;
            const isActive = ind.slug === activeSlug;
            return (
              <button
                key={ind.slug}
                type="button"
                onClick={() => setActiveSlug(ind.slug)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer border",
                  isActive
                    ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md shadow-[#f15e1c]/20 scale-[1.02]"
                    : "bg-white dark:bg-[#0a0a0a] border-[#EFE2D6] dark:border-[#1f1f1f] text-[#3A2E27] dark:text-[#FAF5EE] hover:border-[#f15e1c]/50 hover:bg-[#FCE3D3]/40 dark:hover:bg-[#161616]"
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
          <div className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] p-6 sm:p-10 shadow-xl space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                  <span>Selected Sector Focus</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  {selectedIndustry.name}
                </h2>
                <p className="text-sm sm:text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {selectedIndustry.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="md"
                    className="bg-[#f15e1c] hover:bg-[#d4581f] text-white"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {selectedIndustry.ctaText || "Discuss Industry Challenge"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Grid Breakdown: Challenges vs Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Common Sector Challenges */}
              <div className="p-6 rounded-2xl bg-[#FBF3EA]/60 dark:bg-[#111111] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-4">
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <span>Common Business & Tech Challenges</span>
                </div>
                <ul className="space-y-3">
                  {selectedIndustry.challenges.map((ch, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                      <ChevronRight className="w-4 h-4 text-[#f15e1c] shrink-0 mt-0.5" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How Arav Solves It */}
              <div className="p-6 rounded-2xl bg-[#2e936f]/10 dark:bg-[#2e936f]/15 border border-[#2e936f]/30 space-y-4">
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  <div className="p-2 rounded-xl bg-[#2e936f]/20 text-[#2e936f]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Where & How Arav Can Support</span>
                </div>
                <p className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {selectedIndustry.aravApproach}
                </p>
                <div className="pt-2 border-t border-[#2e936f]/20">
                  <span className="text-xs font-bold text-[#2e936f] block mb-2">Expected Business Outcome:</span>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#3A2E27] dark:text-[#FAF5EE]">
                    <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                    <span>{selectedIndustry.expectedOutcome}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Relevant Capabilities & Recommended Tech */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] mb-3">
                  Relevant Core Capabilities:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-[#FFFDF9] dark:bg-[#161616] text-[#3A2E27] dark:text-[#FAF5EE] text-xs font-medium border border-[#EFE2D6] dark:border-[#1f1f1f] flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#f15e1c]" />
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] mb-3">
                  Recommended Architecture & Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry.recommendedTech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-[#FBF3EA] dark:bg-[#111111] text-[#7A6A5F] dark:text-[#B8ACA0] text-xs font-mono border border-[#EFE2D6] dark:border-[#1f1f1f]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* All Sectors Cards Overview Grid */}
        <div className="space-y-6 pt-8">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Explore All 10 Enterprise Sectors
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
              Click any sector card below to inspect common business challenges and aligned technology solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industriesData.map((ind, idx) => {
              const IconComponent = iconMap[ind.icon] || Building2;
              const isSelected = ind.slug === activeSlug;

              return (
                <ScrollReveal key={ind.slug} delay={idx * 0.05} direction="up">
                  <TiltCard maxTilt={5} scale={1.01} className="h-full">
                    <div
                      onClick={() => setActiveSlug(ind.slug)}
                      className={cn(
                        "h-full rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4",
                        isSelected
                          ? "bg-white dark:bg-[#0a0a0a] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/20"
                          : "bg-white dark:bg-[#0a0a0a] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c]/40 hover:shadow-md"
                      )}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={cn(
                            "p-2.5 rounded-xl transition-colors",
                            isSelected ? "bg-[#f15e1c] text-white" : "bg-[#FCE3D3]/60 dark:bg-[#161616] text-[#f15e1c]"
                          )}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FBF3EA] dark:bg-[#111111] text-[#f15e1c] font-semibold border border-[#EFE2D6] dark:border-[#1f1f1f]">
                            Sector
                          </span>
                        </div>

                        <h4 className="text-base font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                          {ind.name}
                        </h4>
                        <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed line-clamp-2">
                          {ind.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#EFE2D6] dark:border-[#1f1f1f] flex items-center justify-between text-xs font-semibold text-[#f15e1c]">
                        <span>View Sector Breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
