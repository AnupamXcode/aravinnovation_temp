"use client";

import * as React from "react";
import { Link, useRouter } from "@/i18n/routing";
import { CaseStudy } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { ArrowRight, CheckCircle2, MapPin, Building } from "lucide-react";

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const router = useRouter();

  return (
    <TiltCard
      maxTilt={6}
      scale={1.01}
      className="h-full cursor-pointer"
      onClick={() => router.push(`/case-studies/${caseStudy.slug}`)}
    >
      <div className="h-full flex flex-col justify-between rounded-3xl bg-white dark:bg-[#171411] p-7 sm:p-8 border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:shadow-2xl hover:shadow-[#f15e1c]/10 hover:border-[#f15e1c]/40 dark:hover:border-[#f15e1c]/40 transition-all duration-300 group">
        <div className="space-y-5">
          {/* Header Tags */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE2D6] dark:border-[#2C241E] pb-4">
            <Badge variant="secondary" size="sm">
              {caseStudy.serviceCategory}
            </Badge>
            <div className="flex items-center gap-3 text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#f15e1c]" />
                {caseStudy.clientIndustry}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#f15e1c]" />
                {caseStudy.location}
              </span>
            </div>
          </div>

          {/* Title & Summary */}
          <div>
            <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors">
              {caseStudy.title}
            </h3>
            <p className="mt-2 text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              {caseStudy.summary}
            </p>
          </div>

          {/* Visual Metric Highlight Callout */}
          {caseStudy.results && caseStudy.results.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1C1814] border border-[#EFE2D6] dark:border-[#2C241E] flex items-center justify-between">
              <div>
                <span className="text-2xl font-black font-mono text-[#f15e1c] block">
                  {caseStudy.results[0].metric}
                </span>
                <span className="text-xs font-mono font-semibold text-[#7A6A5F] dark:text-[#B8ACA0] block">
                  {caseStudy.results[0].label}
                </span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0" />
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-6 pt-5 border-t border-[#EFE2D6] dark:border-[#2C241E] flex items-center justify-between relative z-20">
          <span className="text-xs font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
            {caseStudy.client}
          </span>
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center text-sm font-semibold text-[#f15e1c] group-hover:text-[#d4581f] transition-colors gap-1.5 py-1"
          >
            <span>Full Case Study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
