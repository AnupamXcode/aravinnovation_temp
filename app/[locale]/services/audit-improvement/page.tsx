import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { getBlogPosts } from "@/lib/cms";
import { AuditInteractivePage } from "@/components/services/AuditInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Audit & Improvement Services | Arav Innovations",
    description:
      "Identify operational, process, technology and compliance gaps with structured audit and improvement services designed to turn findings into practical business improvements.",
    alternates: {
      canonical: "https://aravinnovations.com/services/audit-improvement",
    },
    openGraph: {
      title: "Audit & Improvement Services | Arav Innovations",
      description:
        "Identify operational, process, technology and compliance gaps with structured audit and improvement services designed to turn findings into practical business improvements.",
      url: "https://aravinnovations.com/services/audit-improvement",
      type: "website",
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

  const relatedPosts = await getBlogPosts(locale);

  return <AuditInteractivePage service={service} relatedPosts={relatedPosts} />;
}
