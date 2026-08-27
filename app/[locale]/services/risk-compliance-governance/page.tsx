import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { RiskGovInteractivePage } from "@/components/services/RiskGovInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const service = getServiceBySlug("risk-compliance-governance");
  return {
    title: `${service?.title || "Risk, Compliance, and Governance"} | Arav Innovations`,
    description: service?.description || "Regulatory compliance frameworks, data privacy (GDPR/DPDP), cybersecurity posture & risk mitigation.",
    alternates: {
      canonical: "https://aravinnovations.com/services/risk-compliance-governance",
    },
  };
}

export default async function RiskGovPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("risk-compliance-governance");

  if (!service) {
    notFound();
  }

  return <RiskGovInteractivePage service={service} />;
}
