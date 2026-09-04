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
      <div className="h-full flex flex-col justify-between rounded-3xl bg-white dark:bg-[#000000] p-7 sm:p-8 border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm hover:shadow-2xl hover:shadow-[#f15e1c]/10 hover:border-[#f15e1c]/40 dark:hover:border-[#f15e1c]/40 transition-all duration-300 group">
        <div className="space-y-5">
          {/* Header Tags */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f] pb-4">
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
            <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug break-words">
              {caseStudy.title}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
              {caseStudy.summary}
            </p>
          </div>

          {/* Visual Metric Highlight Callout */}
          {caseStudy.results && caseStudy.results.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-between shadow-xs">
              <div>
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#f15e1c] block">
                  {caseStudy.results[0].metric}
                </span>
                <span className="text-xs font-mono font-bold text-[#2e936f] dark:text-[#2e936f] block uppercase tracking-wider">
                  {caseStudy.results[0].label}
                </span>
              </div>
              <CheckCircle2 className="w-6 h-6 text-[#2e936f] shrink-0" />
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-6 pt-5 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] flex items-center justify-between relative z-20">
          <span className="text-xs font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4]">
            {caseStudy.client}
          </span>
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center text-sm font-extrabold text-[#f15e1c] group-hover:text-[#d8480d] transition-colors gap-1.5 py-1 uppercase tracking-wider"
          >
            <span>Full Case Study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
