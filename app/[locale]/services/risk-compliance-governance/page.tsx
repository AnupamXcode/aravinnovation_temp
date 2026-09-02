import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { getBlogPosts } from "@/lib/cms";
import { RiskGovInteractivePage } from "@/components/services/RiskGovInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Risk, Compliance & Governance | Arav Innovations",
    description:
      "Strengthen enterprise risk management, compliance readiness and governance with practical frameworks for cybersecurity, privacy, data and AI governance.",
    alternates: {
      canonical: "https://aravinnovations.com/services/risk-compliance-governance",
    },
    openGraph: {
      title: "Risk, Compliance & Governance | Arav Innovations",
      description:
        "Strengthen enterprise risk management, compliance readiness and governance with practical frameworks for cybersecurity, privacy, data and AI governance.",
      url: "https://aravinnovations.com/services/risk-compliance-governance",
      siteName: "Arav Innovations",
      type: "website",
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
  const posts = await getBlogPosts(locale);

  if (!service) {
    notFound();
  }

  return <RiskGovInteractivePage service={service} relatedPosts={posts} />;
}
