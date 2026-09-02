import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { getBlogPosts } from "@/lib/cms";
import { DigitalMarketingInteractivePage } from "@/components/services/DigitalMarketingInteractivePage";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug("digital-marketing-brand-development");
  const title = "Digital Marketing & Brand Development | Arav Innovations";
  const description =
    "B2B digital marketing, brand strategy, SEO, AI-search visibility, paid acquisition and conversion optimization from Arav Innovations.";
  const url = "https://aravinnovations.com/services/digital-marketing-brand-development";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Arav Innovations",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function DigitalMarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("digital-marketing-brand-development");

  if (!service) {
    notFound();
  }

  const allPosts = await getBlogPosts(locale);
  const relevantCategories = new Set(["Digital Growth", "SEO", "Strategy", "Web & App Dev", "General"]);
  const filtered = allPosts.filter((p) => relevantCategories.has(p.category));
  const relatedPosts = (filtered.length >= 3 ? filtered : allPosts).slice(0, 3);

  return <DigitalMarketingInteractivePage service={service} relatedPosts={relatedPosts} />;
}
