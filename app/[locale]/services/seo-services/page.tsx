import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { SEOInteractivePage } from "@/components/services/SEOInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const service = getServiceBySlug("seo-services");
  return {
    title: `${service?.title || "SEO Services"} | Arav Innovations`,
    description: service?.description || "Technical SEO audits, programmatic indexing, enterprise topical authority & organic revenue growth.",
    alternates: {
      canonical: "https://aravinnovations.com/services/seo-services",
    },
  };
}

export default async function SEOServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("seo-services");

  if (!service) {
    notFound();
  }

  return <SEOInteractivePage service={service} />;
}
