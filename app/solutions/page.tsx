import * as React from "react";
import Link from "next/link";
import { industriesData } from "@/data/industries";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Building2, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Industry Solutions & Vertical Frameworks | Arav Innovations",
  description:
    "Tailored enterprise technology, compliance, and growth solutions for FinTech, Healthcare, Logistics, B2B SaaS, Retail, and Education across India and UAE.",
};

export default function SolutionsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Solutions & Industries" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <Badge variant="secondary" size="md">
              Vertical Specialization
            </Badge>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Industry-Specific Technology & Growth Solutions
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              We adapt our 7 core practices to the regulatory, architectural, and operational realities of your vertical market.
            </p>
          </ScrollReveal>
        </div>

        {/* Industry Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesData.map((ind, idx) => (
            <ScrollReveal key={ind.slug} delay={idx * 0.08} direction="up">
              <TiltCard maxTilt={6} scale={1.02} className="h-full">
                <div className="h-full rounded-3xl bg-white dark:bg-[#171411] p-8 border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:shadow-2xl hover:border-[#E8672A]/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-[#FCE3D3]/60 dark:bg-[#261F1A] text-[#E8672A] border border-[#F4A97F]/30 dark:border-[#3D332B]">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FBF3EA] dark:bg-[#1E1915] text-[#3A2E27] dark:text-[#FAF5EE] font-semibold border border-[#EFE2D6] dark:border-[#2C241E]">
                        {ind.statusNote || "[CONFIRMED]"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] mb-2">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mb-6">
                      {ind.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] block mb-2">
                        Core Capabilities:
                      </span>
                      {ind.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#3A2E27] dark:text-[#FAF5EE]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E8672A] shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                    <Link href={`/contact?industry=${ind.slug}`}>
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        Inquire for {ind.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Lead Form CTA */}
        <ScrollReveal direction="up">
          <div className="pt-8">
            <LeadForm source="industry_solutions_page" />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
