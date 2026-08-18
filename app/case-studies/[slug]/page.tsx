import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getCaseStudyBySlug, caseStudiesData } from "@/data/case-studies";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  Building,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Code2,
  TrendingUp,
} from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: `${caseStudy.title} | Arav Innovations`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Meta */}
        <div className="space-y-6">
          <Breadcrumb
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: caseStudy.serviceCategory },
            ]}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" size="md">
              {caseStudy.serviceCategory}
            </Badge>
            <span className="text-xs text-[#7A6A5F] flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-[#E8672A]" />
              {caseStudy.clientIndustry}
            </span>
            <span className="text-xs text-[#7A6A5F] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#E8672A]" />
              {caseStudy.location}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] tracking-tight leading-tight">
            {caseStudy.title}
          </h1>

          <p className="text-lg text-[#7A6A5F] leading-relaxed border-l-4 border-[#E8672A] pl-4 italic bg-[#FBF3EA] py-3 rounded-r-xl">
            {caseStudy.summary}
          </p>
        </div>

        {/* Section 1: Challenge & Objective */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#FBF3EA] border border-[#EFE2D6] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8672A] block">
              01. The Challenge
            </span>
            <h3 className="text-lg font-bold font-display text-[#3A2E27]">
              Initial Operational Bottlenecks
            </h3>
            <p className="text-xs text-[#7A6A5F] leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#EFE2D6] shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8672A] block">
              02. Project Objective
            </span>
            <h3 className="text-lg font-bold font-display text-[#3A2E27]">
              Key Desired Milestones
            </h3>
            <p className="text-xs text-[#7A6A5F] leading-relaxed">
              {caseStudy.objective}
            </p>
          </div>
        </div>

        {/* Section 2: Approach & Technical Solution */}
        <div className="p-8 rounded-3xl bg-white border border-[#EFE2D6] shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8672A] block mb-2">
              03. Strategic Approach
            </span>
            <h3 className="text-2xl font-bold font-display text-[#3A2E27] mb-3">
              How Arav Innovations Executed
            </h3>
            <p className="text-sm text-[#7A6A5F] leading-relaxed">
              {caseStudy.approach}
            </p>
          </div>

          <div className="pt-6 border-t border-[#EFE2D6]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8672A] block mb-2">
              04. Deployed Solution
            </span>
            <p className="text-sm text-[#7A6A5F] leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>

          {/* Technologies Used */}
          <div className="pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] block mb-2">
              Technologies & Frameworks Deployed:
            </span>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologiesUsed.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-[#FBF3EA] text-xs font-semibold text-[#3A2E27] border border-[#EFE2D6]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Documented Results */}
        <div className="p-8 rounded-3xl bg-[#FBF3EA] border border-[#EFE2D6] space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <Badge variant="secondary" size="md">
              Verified Metrics
            </Badge>
            <h3 className="text-2xl font-bold font-display text-[#3A2E27]">
              Realized Project Impact
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {caseStudy.results.map((res, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-[#EFE2D6] text-center space-y-2 shadow-2xs"
              >
                <div className="text-sm font-mono font-bold text-[#E8672A]">
                  {res.metric}
                </div>
                <div className="text-xs font-semibold text-[#3A2E27]">
                  {res.label}
                </div>
                <p className="text-[11px] text-[#7A6A5F]">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Quote */}
        {caseStudy.testimonial && (
          <div className="p-8 rounded-3xl bg-white border border-[#EFE2D6] shadow-sm space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E8672A]">
              Client Executive Endorsement
            </div>
            <blockquote className="text-base italic text-[#3A2E27] font-medium leading-relaxed">
              “{caseStudy.testimonial.quote}”
            </blockquote>
            <div className="pt-2 border-t border-[#EFE2D6] text-xs text-[#7A6A5F]">
              <span className="font-bold text-[#3A2E27]">{caseStudy.testimonial.author}</span> &bull; {caseStudy.testimonial.designation}, {caseStudy.testimonial.company}
            </div>
          </div>
        )}

        {/* CTA Lead Form */}
        <div className="pt-8">
          <LeadForm
            initialService={caseStudy.serviceCategory}
            source={`case_study_${caseStudy.slug}`}
          />
        </div>
      </div>
    </div>
  );
}
