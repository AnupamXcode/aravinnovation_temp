import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { DigitalMarketingInteractivePage } from "@/components/services/DigitalMarketingInteractivePage";

export async function generateMetadata() {
  const service = getServiceBySlug("digital-marketing-brand-development");
  return {
    title: "Digital Marketing & Brand Development | Arav Innovations",
    description:
      "Building Brands, Driving Growth. Omnichannel performance marketing, technical SEO, high-intent campaign management, and closed-loop ROI optimization.",
    alternates: {
      canonical: "https://aravinnovations.com/digitalmarketing",
    },
    openGraph: {
      title: "Digital Marketing & Brand Development | Arav Innovations",
      description:
        "Building Brands, Driving Growth. Omnichannel performance marketing, technical SEO, high-intent campaign management, and closed-loop ROI optimization.",
      url: "https://aravinnovations.com/digitalmarketing",
      siteName: "Arav Innovations",
      type: "website",
    },
  };
}

export default async function DigitalMarketingDirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("digital-marketing-brand-development") || {
    id: "digital-marketing-brand-development",
    slug: "digital-marketing-brand-development",
    title: "Digital Marketing and Brand Development",
    shortTitle: "Digital Marketing",
    eyebrow: "GROWTH & PERFORMANCE",
    description: "Omnichannel performance marketing, technical SEO, and high-intent campaign management.",
    tagline: "Building Brands, Driving Growth",
    icon: "TrendingUp",
    heroImage: "/images/services/digital-marketing.jpg",
    businessProblem: { title: "Friction", description: "", painPoints: [] },
    ourSolution: { title: "Solution", description: "", keyPillars: [] },
    capabilities: [],
    process: [],
    technologies: [],
    engagementModels: [],
    relatedCaseStudySlugs: ["full-funnel-b2b-demand-generation"],
    faqs: [],
  };

  return <DigitalMarketingInteractivePage service={service as any} />;
}
