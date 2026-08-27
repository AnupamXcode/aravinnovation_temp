import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { RiskGovInteractivePage } from "@/components/services/RiskGovInteractivePage";

export async function generateMetadata() {
  return {
    title: "Risk, Compliance and Governance | Arav Innovations",
    description:
      "Protecting Your Business with Comprehensive Risk, Compliance, and Governance Solutions. ISO 27001, DPDP Act, GDPR, Risk Mitigation, and Incident Response.",
    alternates: {
      canonical: "https://aravinnovations.com/riskandgovernance",
    },
    openGraph: {
      title: "Risk, Compliance and Governance | Arav Innovations",
      description:
        "Protecting Your Business with Comprehensive Risk, Compliance, and Governance Solutions. ISO 27001, DPDP Act, GDPR, Risk Mitigation, and Incident Response.",
      url: "https://aravinnovations.com/riskandgovernance",
      siteName: "Arav Innovations",
      type: "website",
    },
  };
}

export default async function RiskAndGovernanceDirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("risk-compliance-governance") || {
    id: "risk-compliance-governance",
    slug: "risk-compliance-governance",
    title: "Risk, Compliance, and Governance",
    shortTitle: "Risk & Governance",
    eyebrow: "GOVERNANCE & RESILIENCE",
    description: "Protecting Your Business with Comprehensive Risk, Compliance, and Governance Solutions.",
    tagline: "Protecting Your Business with Comprehensive Risk, Compliance, and Governance Solutions",
    icon: "ShieldCheck",
    heroImage: "/images/services/risk-governance.jpg",
    businessProblem: { title: "Friction", description: "", painPoints: [] },
    ourSolution: { title: "Solution", description: "", keyPillars: [] },
    capabilities: [],
    process: [],
    technologies: [],
    engagementModels: [],
    relatedCaseStudySlugs: ["cross-border-fintech-security"],
    faqs: [],
  };

  return <RiskGovInteractivePage service={service as any} />;
}
