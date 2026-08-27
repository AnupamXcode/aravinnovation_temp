import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { DigitalMarketingInteractivePage } from "@/components/services/DigitalMarketingInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const service = getServiceBySlug("digital-marketing-brand-development");
  return {
    title: `${service?.title || "Digital Marketing & Brand Development"} | Arav Innovations`,
    description: service?.description || "B2B demand generation, brand positioning, multi-channel performance marketing & closed-loop attribution.",
    alternates: {
      canonical: "https://aravinnovations.com/services/digital-marketing-brand-development",
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

  return <DigitalMarketingInteractivePage service={service} />;
}
