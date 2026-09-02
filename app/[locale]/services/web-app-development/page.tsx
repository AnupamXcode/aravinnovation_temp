import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { getBlogPosts } from "@/lib/cms";
import { WebDevInteractivePage } from "@/components/services/WebDevInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const service = getServiceBySlug("web-application-development") || getServiceBySlug("web-app-development");
  return {
    title: "Web & Application Development | Arav Innovations",
    description:
      "Build scalable websites, web applications and digital products with Arav Innovations through product strategy, UX/UI, full-stack engineering, integrations and continuous improvement.",
    alternates: {
      canonical: "https://aravinnovations.com/services/web-app-development",
    },
    openGraph: {
      title: "Web & Application Development | Arav Innovations",
      description:
        "Build scalable websites, web applications and digital products with Arav Innovations through product strategy, UX/UI, full-stack engineering, integrations and continuous improvement.",
      url: "https://aravinnovations.com/services/web-app-development",
      siteName: "Arav Innovations",
      type: "website",
    },
  };
}

export default async function WebAppDevAliasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("web-application-development") || getServiceBySlug("web-app-development");
  const posts = await getBlogPosts(locale);

  if (!service) {
    notFound();
  }

  return <WebDevInteractivePage service={service} relatedPosts={posts} />;
}
