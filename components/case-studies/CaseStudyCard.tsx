import * as React from "react";
import Link from "next/link";
import { CaseStudy } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, MapPin, Building } from "lucide-react";

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-7 sm:p-8 border border-[#EFE2D6] shadow-sm hover:shadow-xl hover:border-[#E8672A]/40 transition-all duration-200 group">
      <div className="space-y-5">
        {/* Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE2D6] pb-4">
          <Badge variant="secondary" size="sm">
            {caseStudy.serviceCategory}
          </Badge>
          <div className="flex items-center gap-3 text-xs text-[#7A6A5F]">
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-[#E8672A]" />
              {caseStudy.clientIndustry}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#E8672A]" />
              {caseStudy.location}
            </span>
          </div>
        </div>

        {/* Title & Summary */}
        <div>
          <h3 className="text-xl font-bold font-display text-[#3A2E27] group-hover:text-[#E8672A] transition-colors">
            {caseStudy.title}
          </h3>
          <p className="mt-2 text-sm text-[#7A6A5F] leading-relaxed">
            {caseStudy.summary}
          </p>
        </div>

        {/* Breakdown: Challenge -> Solution */}
        <div className="space-y-2.5 text-xs bg-[#FBF3EA] p-4 rounded-2xl border border-[#EFE2D6]">
          <div>
            <span className="font-bold text-[#3A2E27] uppercase tracking-wider block text-[10px] text-[#E8672A]">
              Challenge
            </span>
            <p className="text-[#7A6A5F] mt-0.5 line-clamp-2">{caseStudy.challenge}</p>
          </div>
          <div className="pt-2 border-t border-[#EFE2D6]">
            <span className="font-bold text-[#3A2E27] uppercase tracking-wider block text-[10px] text-[#E8672A]">
              Solution & Execution
            </span>
            <p className="text-[#7A6A5F] mt-0.5 line-clamp-2">{caseStudy.solution}</p>
          </div>
        </div>

        {/* Key Result Metrics */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#3A2E27]">
            Documented Results
          </span>
          <div className="grid grid-cols-1 gap-2">
            {caseStudy.results.map((res, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#3A2E27]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E8672A] shrink-0 mt-0.5" />
                <span className="text-[#7A6A5F] font-medium">{res.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 pt-5 border-t border-[#EFE2D6] flex items-center justify-between">
        <span className="text-xs font-mono text-[#7A6A5F]">
          {caseStudy.client}
        </span>
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="inline-flex items-center text-sm font-semibold text-[#E8672A] group-hover:text-[#d4581f] transition-colors gap-1.5"
        >
          <span>Full Case Study</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
