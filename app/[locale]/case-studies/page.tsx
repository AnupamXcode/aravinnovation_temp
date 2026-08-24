import * as React from "react";
import Link from "next/link";
import { getCaseStudies } from "@/lib/cms";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata = {
  title: "Case Studies & Enterprise Results | Arav Innovations",
  description:
    "Explore how Arav Innovations delivers verifiable impact across enterprise cloud architecture, Next.js web applications, SEO expansion, and regulatory compliance globally.",
  alternates: {
    canonical: "https://aravinnovations.com/case-studies",
  },
};

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CaseStudiesPage");
  const caseStudies = await getCaseStudies(locale);

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Case Studies", url: "/case-studies" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: t("badge") }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <Badge variant="secondary" size="md">
              {t("badge")}
            </Badge>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              {t("title")}
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              {t("description")}
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => (
            <ScrollReveal key={study.slug} delay={idx * 0.1} direction="up">
              <CaseStudyCard caseStudy={study} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              {t("title")}
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
              {t("description")}
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Discuss Your Challenge
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
