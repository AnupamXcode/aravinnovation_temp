import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { getBlogPosts } from "@/lib/cms";
import { AIPortfolioInteractivePage } from "@/components/services/AIPortfolioInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const service = getServiceBySlug("ai-portfolio");
  return {
    title: `${service?.title || "AI Portfolio & Enterprise Solutions"} | Arav Innovations`,
    description: service?.description || "Deploy production-ready AI solutions, custom LLM integrations, intelligent workflow automation, and RAG architectures.",
    alternates: {
      canonical: "https://aravinnovations.com/services/ai-portfolio",
    },
    openGraph: {
      title: `${service?.title || "AI Portfolio & Enterprise Solutions"} | Arav Innovations`,
      description: service?.description || "Deploy production-ready AI solutions, custom LLM integrations, intelligent workflow automation, and RAG architectures.",
      url: "https://aravinnovations.com/services/ai-portfolio",
      type: "website",
    },
  };
}

export default async function AIPortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("ai-portfolio");

  if (!service) {
    notFound();
  }

  const relatedPosts = await getBlogPosts(locale);

  return <AIPortfolioInteractivePage service={service} relatedPosts={relatedPosts} />;
}
