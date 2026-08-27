import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { AuditInteractivePage } from "@/components/services/AuditInteractivePage";

export async function generateMetadata() {
  return {
    title: "Audit and Improvement | Arav Innovations",
    description:
      "Uncover Insights, Drive Excellence. Operational, financial, and compliance audits designed to eliminate friction, optimize workflows, and build systems for continuous performance improvement.",
    alternates: {
      canonical: "https://aravinnovations.com/audit",
    },
    openGraph: {
      title: "Audit and Improvement | Arav Innovations",
      description:
        "Uncover Insights, Drive Excellence. Operational, financial, and compliance audits designed to eliminate friction, optimize workflows, and build systems for continuous performance improvement.",
      url: "https://aravinnovations.com/audit",
      siteName: "Arav Innovations",
      type: "website",
    },
  };
}

export default async function AuditDirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("audit-and-improvement") || {
    id: "audit-and-improvement",
    slug: "audit-and-improvement",
    title: "Audit and Improvement",
    shortTitle: "Audit & Improvement",
    eyebrow: "DIAGNOSTICS & EFFICIENCY",
    description: "Uncover Insights, Drive Excellence.",
    tagline: "Uncover Insights, Drive Excellence",
    icon: "BarChart3",
    heroImage: "/images/services/audit.jpg",
    businessProblem: { title: "Friction", description: "", painPoints: [] },
    ourSolution: { title: "Solution", description: "", keyPillars: [] },
    capabilities: [],
    process: [],
    technologies: [],
    engagementModels: [],
    relatedCaseStudySlugs: ["enterprise-cloud-transformation"],
    faqs: [],
  };

  return <AuditInteractivePage service={service as any} />;
}
