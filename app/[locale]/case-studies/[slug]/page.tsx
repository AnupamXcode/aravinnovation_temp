import * as React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCaseStudyBySlug, caseStudiesData } from "@/data/case-studies";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { LeadForm } from "@/components/forms/LeadForm";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import {
  Building,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
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

  const url = `https://aravinnovations.com/case-studies/${slug}`;

  return {
    title: `${caseStudy.title} | Arav Innovations`,
    description: caseStudy.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${caseStudy.title} | Arav Innovations`,
      description: caseStudy.summary,
      url,
      siteName: "Arav Innovations",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} | Arav Innovations`,
      description: caseStudy.summary,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyPageProps) {
  const { slug, locale } = (await params) as any;
  setRequestLocale(locale);
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
      <BreadcrumbSchema
        items={[
          { name: "Case Studies", url: "/case-studies" },
          { name: caseStudy.title, url: `/case-studies/${caseStudy.slug}` },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Meta */}
        <div className="space-y-6">
          <ScrollReveal direction="up">
            <Breadcrumb
              items={[
                { label: "Case Studies", href: "/case-studies" },
                { label: caseStudy.serviceCategory },
              ]}
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/services/${caseStudy.serviceSlug}`}>
                <Badge variant="secondary" size="md" className="hover:border-[#f15e1c] transition-colors">
                  {caseStudy.serviceCategory} &rarr;
                </Badge>
              </Link>
              <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#f15e1c]" />
                {caseStudy.clientIndustry}
              </span>
              <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#f15e1c]" />
                {caseStudy.location}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-tight">
              {caseStudy.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed border-l-4 border-[#f15e1c] pl-4 italic bg-[#FBF3EA] dark:bg-[#1A1613] py-3 rounded-r-2xl border border-[#EFE2D6] dark:border-[#1f1f1f]">
              {caseStudy.summary}
            </p>
          </ScrollReveal>
        </div>

        {/* Section 1: Challenge & Objective */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ScrollReveal direction="up" delay={0.1}>
            <TiltCard maxTilt={5} scale={1.01} className="h-full">
              <div className="h-full p-6 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-3 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f15e1c] block">
                  01. The Challenge
                </span>
                <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Initial Operational Bottlenecks
                </h3>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <TiltCard maxTilt={5} scale={1.01} className="h-full">
              <div className="h-full p-6 rounded-3xl bg-white dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f15e1c] block">
                  02. Project Objective
                </span>
                <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Key Desired Milestones
                </h3>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {caseStudy.objective}
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>

        {/* Section 2: Approach & Technical Solution */}
        <ScrollReveal direction="up">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#f15e1c] block mb-2">
                03. Strategic Approach
              </span>
              <h3 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] mb-3">
                How Arav Innovations Executed
              </h3>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                {caseStudy.approach}
              </p>
            </div>

            <div className="pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f15e1c] block mb-2">
                04. Deployed Solution
              </span>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>

            {/* Technologies Used */}
            <div className="pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] block mb-2">
                Technologies & Frameworks Deployed:
              </span>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologiesUsed.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-[#FBF3EA] dark:bg-[#0a0a0a] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#1f1f1f]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 3: Documented Results */}
        <ScrollReveal direction="up">
          <div className="p-8 rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <Badge variant="secondary" size="md">
                Verified Metrics
              </Badge>
              <h3 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Realized Project Impact
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.results.map((res, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] text-center space-y-2 shadow-2xs"
                >
                  <div className="text-sm font-mono font-bold text-[#f15e1c]">
                    {res.metric}
                  </div>
                  <div className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    {res.label}
                  </div>
                  <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                    {res.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonial Quote */}
        {caseStudy.testimonial && (
          <ScrollReveal direction="up">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#f15e1c]">
                Client Executive Endorsement
              </div>
              <blockquote className="text-base italic text-[#3A2E27] dark:text-[#FAF5EE] font-medium leading-relaxed">
                “{caseStudy.testimonial.quote}”
              </blockquote>
              <div className="pt-2 border-t border-[#EFE2D6] dark:border-[#1f1f1f] text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                <span className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">{caseStudy.testimonial.author}</span> &bull; {caseStudy.testimonial.designation}, {caseStudy.testimonial.company}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* CTA Lead Form */}
        <ScrollReveal direction="up">
          <div className="pt-8">
            <LeadForm
              initialService={caseStudy.serviceCategory}
              source={`case_study_${caseStudy.slug}`}
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
