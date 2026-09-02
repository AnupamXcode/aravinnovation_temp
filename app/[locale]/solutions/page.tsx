import * as React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { industriesData } from "@/data/industries";
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Industry Solutions | Arav Innovations",
  description:
    "Explore tailored digital architecture, governance, and demand generation frameworks for Fintech, Healthcare, E-Commerce, Logistics, SaaS, and Real Estate.",
  alternates: {
    canonical: "https://aravinnovations.com/solutions",
  },
  openGraph: {
    title: "Industry Solutions | Arav Innovations",
    description:
      "Tailored digital architecture, governance, and demand generation frameworks for Fintech, Healthcare, Logistics, and SaaS globally.",
    url: "https://aravinnovations.com/solutions",
    siteName: "Arav Innovations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Solutions | Arav Innovations",
    description:
      "Tailored digital architecture, governance, and demand generation frameworks for Fintech, Healthcare, Logistics, and SaaS globally.",
  },
};

export default function SolutionsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Industry Solutions", url: "/solutions" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Solutions" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" size="md">
                Industry Capabilities
              </Badge>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Vertical-Specific Engineering & Growth Solutions
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              We design and implement defensible technology architectures aligned with the specific regulatory, security, and transaction demands of high-growth industries across India and the UAE.
            </p>
          </ScrollReveal>
        </div>

        {/* Industry Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesData.map((ind, idx) => (
            <ScrollReveal key={ind.slug} delay={idx * 0.08} direction="up">
              <TiltCard maxTilt={6} scale={1.02} className="h-full group">
                <div className="h-full rounded-3xl bg-white dark:bg-[#000000] p-8 border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm hover:shadow-2xl hover:border-[#f15e1c]/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-[#FCE3D3]/60 dark:bg-[#161616] text-[#f15e1c] border border-[#F4A97F]/30 dark:border-[#262626] group-hover:bg-[#f15e1c] group-hover:text-white transition-all duration-300 shadow-xs [&>svg]:text-[#f15e1c] [&>svg]:group-hover:text-white [&>svg]:transition-colors [&>svg]:duration-300">
                        <Building2 className="w-5 h-5 transition-colors duration-300" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FBF3EA] dark:bg-[#0a0a0a] text-[#f15e1c] font-semibold border border-[#EFE2D6] dark:border-[#1f1f1f]">
                        Enterprise Sector
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors mb-2">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mb-6">
                      {ind.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] block mb-2">
                        Core Capabilities:
                      </span>
                      {ind.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#3A2E27] dark:text-[#FAF5EE]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#f15e1c] shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
                    <Link href="/contact">
                      <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Request Industry Scope
                      </Button>
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
