import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { WebDevInteractivePage } from "@/components/services/WebDevInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const service = getServiceBySlug("web-application-development");
  return {
    title: `${service?.title || "Web and Application Development"} | Arav Innovations`,
    description:
      service?.description ||
      "High-performance web applications engineered for modern businesses, scalable workflows, and seamless digital experiences.",
    alternates: {
      canonical: "https://aravinnovations.com/services/web-application-development",
    },
    openGraph: {
      title: `${service?.title || "Web and Application Development"} | Arav Innovations`,
      description:
        service?.description ||
        "High-performance web applications engineered for modern businesses, scalable workflows, and seamless digital experiences.",
      url: "https://aravinnovations.com/services/web-application-development",
      siteName: "Arav Innovations",
      type: "website",
    },
  };
}

export default async function WebAppDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("web-application-development");

  if (!service) {
    notFound();
  }

  return <WebDevInteractivePage service={service} />;
}
