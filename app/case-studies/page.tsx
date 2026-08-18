import * as React from "react";
import Link from "next/link";
import { caseStudiesData } from "@/data/case-studies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Case Studies & Enterprise Results | Arav Innovations",
  description:
    "Explore how Arav Innovations delivers verifiable impact across enterprise cloud architecture, Next.js web applications, SEO expansion, and regulatory compliance in India & UAE.",
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <Breadcrumb items={[{ label: "Case Studies" }]} />
          <Badge variant="secondary" size="md">
            Verified Execution
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] tracking-tight">
            Case Studies & Realized Outcomes
          </h1>
          <p className="text-lg text-[#7A6A5F] leading-relaxed">
            Detailed breakdowns of our client engagements across India and the United Arab Emirates. Each case study documents the client challenge, objective, technical approach, solution, and realized business impact.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudiesData.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="rounded-3xl bg-[#FBF3EA] p-8 sm:p-12 border border-[#EFE2D6] text-center max-w-3xl mx-auto space-y-5">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27]">
            Facing a Similar Technical or Growth Challenge?
          </h3>
          <p className="text-sm text-[#7A6A5F] leading-relaxed">
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
      </div>
    </div>
  );
}
