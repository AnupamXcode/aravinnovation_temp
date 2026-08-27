import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { SEOInteractivePage } from "@/components/services/SEOInteractivePage";

export async function generateMetadata() {
  return {
    title: "SEO Services and Organic Growth | Arav Innovations",
    description:
      "Turn Search Visibility Into Sustainable Growth. Data-driven SEO strategies that improve visibility, attract qualified organic traffic, and turn search demand into measurable business growth.",
    alternates: {
      canonical: "https://aravinnovations.com/seo",
    },
    openGraph: {
      title: "SEO Services and Organic Growth | Arav Innovations",
      description:
        "Turn Search Visibility Into Sustainable Growth. Data-driven SEO strategies that improve visibility, attract qualified organic traffic, and turn search demand into measurable business growth.",
      url: "https://aravinnovations.com/seo",
      siteName: "Arav Innovations",
      type: "website",
    },
  };
}

export default async function SEODirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("seo-services") || {
    id: "seo-services",
    slug: "seo-services",
    title: "SEO Services and Organic Growth",
    shortTitle: "SEO Services",
    eyebrow: "SEARCH INTELLIGENCE",
    description: "Turn Search Visibility Into Sustainable Growth.",
    tagline: "Turn Search Visibility Into Sustainable Growth",
    icon: "Search",
    heroImage: "/images/services/seo.jpg",
    businessProblem: { title: "Friction", description: "", painPoints: [] },
    ourSolution: { title: "Solution", description: "", keyPillars: [] },
    capabilities: [],
    process: [],
    technologies: [],
    engagementModels: [],
    relatedCaseStudySlugs: ["enterprise-cloud-transformation"],
    faqs: [],
  };

  return <SEOInteractivePage service={service as any} />;
}
