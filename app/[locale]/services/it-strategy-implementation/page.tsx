import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { ITStrategyInteractivePage } from "@/components/services/ITStrategyInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const service = getServiceBySlug("it-strategy-implementation");
  return {
    title: `${service?.title || "IT Strategy & Implementation"} | Arav Innovations`,
    description: service?.description || "Enterprise tech roadmaps, digital transformation blueprints, cloud architecture & IT governance.",
    alternates: {
      canonical: "https://aravinnovations.com/services/it-strategy-implementation",
    },
  };
}

export default async function ITStrategyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("it-strategy-implementation");

  if (!service) {
    notFound();
  }

  return <ITStrategyInteractivePage service={service} />;
}
