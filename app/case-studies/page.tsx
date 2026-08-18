import * as React from "react";
import Link from "next/link";
import { caseStudiesData } from "@/data/case-studies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Case Studies & Enterprise Results | Arav Innovations",
  description:
    "Explore how Arav Innovations delivers verifiable impact across enterprise cloud architecture, Next.js web applications, SEO expansion, and regulatory compliance in India & UAE.",
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Case Studies" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <Badge variant="secondary" size="md">
              Verified Execution
            </Badge>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Case Studies & Realized Outcomes
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              Detailed breakdowns of our client engagements across India and the United Arab Emirates. Each case study documents the client challenge, objective, technical approach, solution, and realized business impact.
            </p>
          </ScrollReveal>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudiesData.map((caseStudy, idx) => (
            <ScrollReveal key={caseStudy.slug} delay={idx * 0.1} direction="up">
              <CaseStudyCard caseStudy={caseStudy} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <ScrollReveal direction="up">
          <div className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] p-8 sm:p-12 border border-[#EFE2D6] dark:border-[#2C241E] text-center max-w-3xl mx-auto space-y-5 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Facing a Similar Technical or Growth Challenge?
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              Schedule a confidential 30-minute discovery call with our practice leaders to evaluate your architecture, marketing funnel, or compliance readiness.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Schedule a Discovery Call
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
