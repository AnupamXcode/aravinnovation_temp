import * as React from "react";
import { getServiceBySlug } from "@/data/services";
import { ITStrategyInteractivePage } from "@/components/services/ITStrategyInteractivePage";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Strategic IT Solutions & Digital Transformation | Arav Innovations",
  description:
    "Enterprise IT strategy, infrastructure assessment, cybersecurity, cloud modernization, and 24/7 telemetry support engineered for CFO-aligned ROI.",
  alternates: {
    canonical: "https://aravinnovations.com/services/it-strategy-implementation",
  },
};

export default async function ITStrategyDirectRoutePage({
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
