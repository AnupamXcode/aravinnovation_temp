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
import { ArrowRight, Globe2 } from "lucide-react";
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
  const services = await getServices(locale);

  return (
    <div className="pt-4 sm:pt-8 pb-12 sm:pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Services & Practices", url: "/services" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <ScrollReveal direction="up">
          <div className="mb-8">
            <Breadcrumb items={[{ label: t("badge") }]} />
          </div>
        </ScrollReveal>

        {/* Hero Banner */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-3xl space-y-4 mb-16">
            <Badge variant="secondary" size="md">
              {t("badge")}
            </Badge>
            <ScrollTextFlip>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
                {t("title")}
              </h1>
            </ScrollTextFlip>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              {t("description")}
            </p>
          </div>
        </ScrollReveal>

        {/* 7 Practice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.slug} delay={index * 0.08} direction="up">
              <ServiceCard
                service={service}
                featured={index === 0 || index === 1}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Regional Advisory Banner */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-20 rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#f15e1c] text-white mx-auto flex items-center justify-center shadow-xs">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              {t("customEngagementTitle")}
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] max-w-xl mx-auto leading-relaxed">
              {t("customEngagementDesc")}
            </p>
            <div className="pt-2">
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
