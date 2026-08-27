import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { AuditInteractivePage } from "@/components/services/AuditInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const service = getServiceBySlug("audit-improvement");
  return {
    title: `${service?.title || "Audit and Improvement"} | Arav Innovations`,
    description: service?.description || "System efficiency reviews, process bottleneck remediation, codebase audits & cloud cost optimization.",
    alternates: {
      canonical: "https://aravinnovations.com/services/audit-improvement",
    },
  };
}

export default async function AuditImprovementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("audit-improvement");

  if (!service) {
    notFound();
  }

  return <AuditInteractivePage service={service} />;
}
