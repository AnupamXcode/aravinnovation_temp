import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { ITStrategyInteractivePage } from "@/components/services/ITStrategyInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "IT Strategy & Implementation | Arav Innovations",
    description:
      "Arav Innovations helps businesses modernize legacy systems, build practical IT roadmaps, adopt cloud and strengthen technology architecture for scalable growth.",
    alternates: {
      canonical: "https://aravinnovations.com/services/it-strategy-implementation",
    },
    openGraph: {
      title: "IT Strategy & Implementation | Arav Innovations",
      description:
        "Arav Innovations helps businesses modernize legacy systems, build practical IT roadmaps, adopt cloud and strengthen technology architecture for scalable growth.",
      url: "https://aravinnovations.com/services/it-strategy-implementation",
      siteName: "Arav Innovations",
      type: "website",
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does IT strategy and implementation include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our IT strategy and implementation service includes technical audits, phased multi-year technology roadmaps, legacy system modernization blueprints, cloud architecture & migration strategy, IT governance, zero-trust security controls, and continuous system optimization.",
      },
    },
    {
      "@type": "Question",
      name: "When should a business consider modernizing its IT infrastructure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A business should consider modernizing when legacy technical debt slows down product features, cloud costs become unpredictable, security risks multiply, or current architecture cannot scale with user growth and business expansion.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help us create a technology roadmap before implementation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We frequently begin engagements with an assessment and roadmapping phase to audit current state systems, align priorities with leadership, and construct a prioritized execution plan before engineering begins.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support cloud migration and modernization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We design secure, scalable multi-cloud and hybrid environments across AWS, Azure, and GCP, incorporating containerized microservices, Infrastructure-as-Code (Terraform), and FinOps cost governance.",
      },
    },
    {
      "@type": "Question",
      name: "Can Arav Innovations continue supporting the technology after implementation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer long-term partnership engagement options including continuous optimization, performance tuning, cloud cost governance, 24/7 telemetry monitoring, and ongoing technology advisory.",
      },
    },
  ],
};

export default async function ITStrategyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("it-strategy-implementation");

  if (!service) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ITStrategyInteractivePage service={service} />
    </>
  );
}

