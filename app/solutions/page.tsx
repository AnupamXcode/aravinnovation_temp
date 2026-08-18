import * as React from "react";
import Link from "next/link";
import { industriesData } from "@/data/industries";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";
import { ArrowRight, CheckCircle2, Building2, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Industry Solutions & Vertical Frameworks | Arav Innovations",
  description:
    "Tailored enterprise technology, compliance, and growth solutions for FinTech, Healthcare, Logistics, B2B SaaS, Retail, and Education across India and UAE.",
};

export default function SolutionsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Breadcrumb items={[{ label: "Solutions & Industries" }]} />
          <Badge variant="secondary" size="md">
            Vertical Specialization
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] tracking-tight">
            Industry-Specific Technology & Growth Solutions
          </h1>
          <p className="text-lg text-[#7A6A5F] leading-relaxed">
            We adapt our 7 core practices to the regulatory, architectural, and operational realities of your vertical market.
          </p>
        </div>

        {/* Industry Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesData.map((ind) => (
            <div
              key={ind.slug}
              className="rounded-3xl bg-white p-8 border border-[#EFE2D6] shadow-sm hover:shadow-xl hover:border-[#E8672A]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[#FCE3D3]/60 text-[#E8672A]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FBF3EA] text-[#3A2E27] font-semibold border border-[#EFE2D6]">
                    {ind.statusNote || "[CONFIRMED]"}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[#3A2E27] mb-2">
                  {ind.name}
                </h3>
                <p className="text-xs text-[#7A6A5F] leading-relaxed mb-6">
                  {ind.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-[#EFE2D6]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3A2E27] block mb-2">
                    Core Capabilities:
                  </span>
                  {ind.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#3A2E27]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E8672A] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EFE2D6]">
                <Link href={`/contact?industry=${ind.slug}`}>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Inquire for {ind.name}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Form CTA */}
        <div className="pt-8">
          <LeadForm source="industry_solutions_page" />
        </div>
      </div>
    </div>
  );
}
