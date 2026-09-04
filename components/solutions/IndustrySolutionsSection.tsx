"use client";

import * as React from "react";
import Link from "next/link";
import { IndustrySolution } from "@/data/industries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Cpu,
  Truck,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  Layers,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
};

interface IndustrySolutionsSectionProps {
  industries: IndustrySolution[];
  locale?: string;
}

export function IndustrySolutionsSection({
  industries,
  locale = "en",
}: IndustrySolutionsSectionProps) {
  const [selectedSlug, setSelectedSlug] = React.useState<string>(
    industries[0]?.slug || "fintech-financial-services"
  );

  const activeIndustry =
    industries.find((ind) => ind.slug === selectedSlug) || industries[0];

  if (!activeIndustry) return null;

  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-8 lg:px-12 rounded-[2.5rem] bg-[#f7d7b0]/30 dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 relative overflow-hidden"
      id="industry-solutions"
    >
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#f15e1c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#2e936f]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 space-y-3 relative z-10">
        <Badge variant="secondary" size="md">
          TAILORED INDUSTRY SOLUTIONS
        </Badge>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-tight">
          Vertical Digital Transformation
        </h2>
        <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed max-w-2xl mx-auto font-medium">
          We apply our architectural, engineering, and compliance capabilities directly to specialized industry environments to eliminate operational bottlenecks and drive revenue.
        </p>
      </div>

      {/* Industry Tab Navigation Bar */}
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 relative z-10">
        {industries.map((ind) => {
          const isSel = ind.slug === selectedSlug;
          return (
            <button
              key={ind.slug}
              type="button"
              onClick={() => setSelectedSlug(ind.slug)}
              className={cn(
                "px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-extrabold font-display transition-all duration-300 cursor-pointer border flex items-center gap-2 min-h-[44px]",
                isSel
                  ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-xl shadow-[#f15e1c]/30 scale-105"
                  : "bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#d3eee4] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] dark:hover:border-[#f15e1c]"
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-lg transition-colors shrink-0",
                  isSel ? "text-white" : "text-[#f15e1c]"
                )}
              >
                {iconMap[ind.icon] || <Briefcase className="w-4 h-4" />}
              </div>
              <span className="truncate">{ind.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Selected Industry Composition Panel */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left Column: Industry Challenges & Arav Strategic Approach */}
        <div className="lg:col-span-6 space-y-6">
          {/* Industry Overview Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center font-bold shrink-0">
                {iconMap[activeIndustry.icon] || <Briefcase className="w-6 h-6" />}
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-[#f15e1c]">
                {activeIndustry.name}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
              {activeIndustry.description}
            </p>
          </div>

          {/* Industry Specific Challenges */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg space-y-4">
            <h4 className="text-sm font-extrabold font-mono text-[#f15e1c] uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#f15e1c]" />
              <span>Core Industry Bottlenecks &amp; Pain Points</span>
            </h4>
            <ul className="space-y-3">
              {(activeIndustry.challenges || [
                "Legacy system lock-in and high maintenance debt",
                "Regulatory compliance guardrails and data privacy risks",
                "Sub-optimal user onboarding experiences",
              ]).map((ch, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-[#2e936f] dark:text-[#d3eee4]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    !
                  </span>
                  <span className="leading-snug">{ch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Arav Technical Approach */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#2e936f] text-white border border-[#2e936f] shadow-xl space-y-3">
            <h4 className="text-xs font-mono font-black text-[#ffec69] uppercase tracking-widest flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#ffec69]" />
              <span>ARAV STRATEGIC APPROACH</span>
            </h4>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
              {activeIndustry.aravApproach ||
                "We deploy modular microservice architectures wrapped around legacy backends to ensure zero downtime and strict compliance."}
            </p>
          </div>
        </div>

        {/* Right Column: Capabilities, Target Outcome & Action CTAs */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          {/* Key Capabilities Grid */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg space-y-4">
            <h4 className="text-sm font-extrabold font-mono text-[#2e936f] dark:text-[#34d399] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2e936f] dark:text-[#34d399]" />
              <span>Tailored Solution Capabilities</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeIndustry.capabilities.map((cap, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-2xl bg-[#f7d7b0]/40 dark:bg-[#161616] border border-[#f15e1c]/20 dark:border-[#1a1a1a] flex items-center gap-2.5 text-xs font-bold text-[#2e936f] dark:text-[#d3eee4]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2e936f] dark:text-[#34d399] shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Tech Stack Pills */}
          {activeIndustry.recommendedTech && (
            <div className="p-5 rounded-3xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#2e936f] dark:text-[#34d399] font-extrabold tracking-wider">
                RECOMMENDED TECH STACK &amp; FRAMEWORKS
              </span>
              <div className="flex flex-wrap gap-2">
                {activeIndustry.recommendedTech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-[#f7d7b0] dark:bg-[#161616] text-[#f15e1c] dark:text-[#ffffff] text-xs font-mono font-bold border border-[#f15e1c]/30 dark:border-[#1a1a1a]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Expected Business Outcome Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border-2 border-[#2e936f] dark:border-[#2e936f] shadow-xl space-y-3">
            <span className="text-xs font-mono font-bold text-[#2e936f] dark:text-[#34d399] uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2e936f] dark:text-[#34d399]" />
              <span>Target Business Outcome</span>
            </span>
            <p className="text-base sm:text-lg font-bold font-display text-[#2e936f] dark:text-[#ffffff] leading-snug">
              {activeIndustry.expectedOutcome ||
                "Achieve operational stability, 99.99% uptime SLA, and zero compliance breach penalties."}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href={`/contact?industry=${activeIndustry.slug}`}
              className="w-full sm:w-auto flex-1"
            >
              <Button
                variant="primary"
                size="md"
                className="w-full rounded-2xl bg-[#f15e1c] hover:bg-[#d94e10] py-3.5 text-sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {activeIndustry.ctaText || `Discuss ${activeIndustry.name} Solution`}
              </Button>
            </Link>

            {activeIndustry.relatedCaseStudySlug && (
              <Link
                href={`/${locale}/case-studies`}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="md"
                  className="w-full rounded-2xl border-[#f7d7b0] text-[#2e936f] hover:border-[#f15e1c] py-3.5 text-xs"
                >
                  View Related Case Studies &rarr;
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
