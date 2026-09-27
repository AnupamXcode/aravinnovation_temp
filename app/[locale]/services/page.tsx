import * as React from "react";
import Link from "next/link";
import { getServices } from "@/lib/cms";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { ArrowRight, Globe2, Sparkles, Cpu, TrendingUp, ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata = {
  title: "Our Core Services | Arav Innovations",
  description:
    "Explore Arav Innovations' enterprise service areas: IT Strategy, Digital Marketing & Branding, Web & App Development, Risk & Compliance, Auditing, Staff Augmentation, Technical SEO, and AI Portfolio.",
  alternates: {
    canonical: "https://aravinnovations.com/services",
  },
};

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPage");
  const allServices = await getServices(locale);

  // Categorize services into structured groups
  const techEngineeringSlugs = ["it-strategy-implementation", "web-app-development", "ai-portfolio"];
  const digitalGrowthSlugs = ["digital-marketing-brand-development", "seo-services"];
  
  const techEngineeringServices = techEngineeringSlugs
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter(Boolean);

  const digitalGrowthServices = digitalGrowthSlugs
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter(Boolean);

  const governanceTalentServices = allServices.filter(
    (s) => !techEngineeringSlugs.includes(s.slug) && !digitalGrowthSlugs.includes(s.slug)
  );

  return (
    <div className="pt-6 sm:pt-10 pb-12 sm:pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300 scroll-mt-24">
      <BreadcrumbSchema items={[{ name: "Services & Practices", url: "/services" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Services Page Hero */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl space-y-4">
            <Breadcrumb items={[{ label: t("badge") }]} />
            <div className="pt-2">
              <Badge variant="secondary" size="md">
                <Sparkles className="w-3.5 h-3.5 text-[#f15e1c]" />
                <span>Enterprise Consulting & Practices</span>
              </Badge>
            </div>
            <ScrollTextFlip>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-tight">
                {t("title")}
              </h1>
            </ScrollTextFlip>
            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#B8ACA0] leading-relaxed">
              {t("description")}
            </p>
          </div>
        </ScrollReveal>

        {/* SECTION 1: Technology & Engineering (3-Column Grid) */}
        <section className="space-y-6 sm:space-y-8">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
              <div className="p-2.5 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] dark:bg-[#f15e1c]/20">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Technology &amp; Engineering
                </h2>
                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] font-medium">
                  Enterprise IT strategy, cloud-native full-stack platforms, and production AI systems.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {techEngineeringServices.map((service, index) => (
              <ScrollReveal key={service!.slug} delay={index * 0.08} direction="up" className="h-full">
                <ServiceCard service={service!} featured={index === 0} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* SECTION 2: Digital Growth (2-Column Visually Intentional Grid) */}
        <section className="space-y-6 sm:space-y-8">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
              <div className="p-2.5 rounded-xl bg-[#2e936f]/10 text-[#2e936f] dark:bg-[#2e936f]/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Digital Growth
                </h2>
                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] font-medium">
                  High-intent B2B demand generation, performance brand marketing, and technical SEO authority.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {digitalGrowthServices.map((service, index) => (
                <ScrollReveal key={service!.slug} delay={index * 0.08} direction="up" className="h-full">
                  <ServiceCard service={service!} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Governance, Audit & Augmentation (3-Column Grid) */}
        {governanceTalentServices.length > 0 && (
          <section className="space-y-6 sm:space-y-8">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
                <div className="p-2.5 rounded-xl bg-[#fab60a]/15 text-[#fab60a]">
                  <ShieldCheck className="w-6 h-6 text-[#1b2823] dark:text-[#fab60a]" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    Governance, Audit &amp; Talent Augmentation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] font-medium">
                    Regulatory DPDP &amp; ISO compliance, operational audits, and dedicated engineering talent.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {governanceTalentServices.map((service, index) => (
                <ScrollReveal key={service.slug} delay={index * 0.08} direction="up" className="h-full">
                  <ServiceCard service={service} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Regional Advisory Banner */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] p-6 sm:p-10 text-center max-w-4xl mx-auto space-y-4 sm:space-y-6 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#f15e1c] text-white mx-auto flex items-center justify-center shadow-xs">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              {t("customEngagementTitle")}
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] max-w-xl mx-auto leading-relaxed">
              {t("customEngagementDesc")}
            </p>
            <div className="pt-1 sm:pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t("discussScope")}
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}

