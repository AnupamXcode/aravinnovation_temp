import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { WebDevInteractivePage } from "@/components/services/WebDevInteractivePage";

export async function generateMetadata() {
  return {
    title: "Web and Application Development | Arav Innovations",
    description:
      "Innovative Web and App Solutions Tailored for Success. Full-stack responsive web design, custom mobile applications, e-commerce engines, and ongoing maintenance.",
    alternates: {
      canonical: "https://aravinnovations.com/webdevelopment",
    },
    openGraph: {
      title: "Web and Application Development | Arav Innovations",
      description:
        "Innovative Web and App Solutions Tailored for Success. Full-stack responsive web design, custom mobile applications, e-commerce engines, and ongoing maintenance.",
      url: "https://aravinnovations.com/webdevelopment",
      siteName: "Arav Innovations",
      type: "website",
    },
  };
}

export default async function WebDevelopmentDirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("web-application-development") || {
    id: "web-application-development",
    slug: "web-application-development",
    title: "Web and Application Development",
    shortTitle: "Web Development",
    eyebrow: "FULL-STACK ENGINEERING",
    description: "Full-stack responsive web design, custom mobile applications, e-commerce engines, and ongoing maintenance.",
    tagline: "Innovative Web and App Solutions Tailored for Success",
    icon: "Code2",
    heroImage: "/images/services/web-development.jpg",
    businessProblem: { title: "Friction", description: "", painPoints: [] },
    ourSolution: { title: "Solution", description: "", keyPillars: [] },
    capabilities: [],
    process: [],
    technologies: [],
    engagementModels: [],
    relatedCaseStudySlugs: ["enterprise-cloud-transformation"],
    faqs: [],
  };

  return <WebDevInteractivePage service={service as any} />;
}
