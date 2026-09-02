import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPosts, getBlogCategories } from "@/lib/cms";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { EmptyState } from "@/components/ui/empty-state";
import { ArrowRight, Sparkles } from "lucide-react";
import { InsightsFilterClient } from "@/components/insights/InsightsFilterClient";

export const metadata: Metadata = {
  title: "Insights & Engineering Perspectives | Arav Innovations",
  description:
    "Engineering guides, B2B digital growth strategies, DPDP regulatory insights, and cloud architecture deep dives authored by practice leads at Arav Innovations.",
  alternates: {
    canonical: "https://aravinnovations.com/insights",
  },
  openGraph: {
    title: "Insights & Engineering Perspectives | Arav Innovations",
    description:
      "Engineering guides, B2B digital growth strategies, DPDP regulatory insights, and cloud architecture deep dives.",
    url: "https://aravinnovations.com/insights",
    siteName: "Arav Innovations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Engineering Perspectives | Arav Innovations",
    description:
      "Engineering guides, B2B digital growth strategies, DPDP regulatory insights, and cloud architecture deep dives.",
  },
};

export default async function InsightsPage() {
  const articles = await getBlogPosts();
  const categories = await getBlogCategories();

  return (
    <div className="w-full pt-4 sm:pt-8 pb-12 sm:pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Insights", url: "/insights" }]} />
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Insights & Perspectives" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" size="md">
                <Sparkles className="w-3.5 h-3.5 text-[#f15e1c]" />
                <span>Executive Thought Leadership</span>
              </Badge>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Insights & Engineering Perspectives
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              In-depth analysis on modern software architecture, B2B demand generation, regulatory data privacy, and cloud FinOps optimization authored by our global practice leads.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Filter & Articles Container */}
        <InsightsFilterClient initialPosts={articles} categories={categories} />

        {/* Topic Discussion CTA */}
        <ScrollReveal direction="up">
          <div className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4 shadow-xl">
            <h3 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Need Architectural Guidance on Any of These Topics?
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed max-w-xl mx-auto">
              Our practice directors consult globally with enterprise teams on cloud architecture, DPDP compliance, and performance marketing frameworks.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="md" className="min-h-[44px]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Connect With Practice Leads
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
