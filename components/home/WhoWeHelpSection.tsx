import * as React from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Cpu,
  Globe,
  RefreshCw,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const audienceList = [
  {
    title: "Growing & Scaling Enterprises",
    need: "Business Need: Standardizing technology operations and eliminating architectural roadblocks.",
    support: "Arav Support: Strategic IT roadmaps, cloud architecture tuning, and guided technical governance.",
    icon: <TrendingUp className="w-6 h-6 text-[#f15e1c]" />,
  },
  {
    title: "Enterprise Technology Leaders",
    need: "Business Need: Modernizing legacy infrastructure and maintaining data privacy compliance.",
    support: "Arav Support: Next.js microservices refactoring, SOC-2 audit readiness, and DPDP governance.",
    icon: <Building2 className="w-6 h-6 text-[#2e936f]" />,
  },
  {
    title: "Software & SaaS Product Teams",
    need: "Business Need: Accelerating release velocity, securing APIs, and integrating AI automation.",
    support: "Arav Support: Dedicated senior engineering squads, full-stack React/Next.js engineering, and AI workflows.",
    icon: <Cpu className="w-6 h-6 text-[#fab60a]" />,
  },
  {
    title: "Digital & Commerce Platforms",
    need: "Business Need: Building organic search authority and maximizing conversion rates.",
    support: "Arav Support: Technical SEO audits, programmatic indexing, and conversion funnel optimization.",
    icon: <Globe className="w-6 h-6 text-[#f15e1c]" />,
  },
];

export function WhoWeHelpSection() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 select-none">
      <section className="py-4 sm:py-5 md:py-6 px-4 sm:px-12 lg:px-14 rounded-2xl sm:rounded-[2.5rem] bg-[#FFFFFF] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 max-w-[1760px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-2">
          <ScrollTextFlip>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
              Who We Help
            </h2>
          </ScrollTextFlip>
          <p className="text-xs sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium max-w-2xl mx-auto leading-relaxed">
            We partner with decision-makers who require practical strategy, dependable engineering, and measurable growth across their technology ecosystem.
          </p>
        </div>

        {/* 4 Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {audienceList.map((audience, idx) => (
            <ScrollReveal key={audience.title} direction="up" delay={idx * 0.08} className="h-full">
              <Link
                href="/contact"
                aria-label={`Discuss requirements for ${audience.title}`}
                className="h-full rounded-2xl bg-[#fefaf5] dark:bg-[#161616] p-5 sm:p-6 border border-[#f7d7b0] dark:border-[#262626] hover:border-[#f15e1c] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group block cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    {React.cloneElement(audience.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug">
                    {audience.title}
                  </h3>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                    {audience.need}
                  </p>
                  <p className="text-xs text-[#2e936f] dark:text-[#2e936f] leading-relaxed font-semibold pt-1 border-t border-[#f7d7b0]/30 dark:border-[#262626]">
                    {audience.support}
                  </p>
                </div>

                <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-[#f7d7b0]/50 dark:border-[#262626]">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#f15e1c] group-hover:text-[#d8480d] transition-colors">
                    <span>Book a Free Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Industries Served Strip */}
        <div className="mt-8 pt-6 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] text-center space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#f15e1c]">
            INDUSTRIES SERVED
          </span>
          <p className="text-xs sm:text-sm font-medium text-[#4a5c55] dark:text-[#d3eee4]">
            B2B SaaS &bull; Financial Services &bull; Healthcare Tech &bull; Supply Chain &bull; Clean Energy &bull; Digital Commerce
          </p>
        </div>
      </section>
    </div>
  );
}
