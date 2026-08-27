import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { TrainingStaffInteractivePage } from "@/components/services/TrainingStaffInteractivePage";

export async function generateMetadata() {
  return {
    title: "Training and Staff Augmentation | Arav Innovations",
    description:
      "Empowering Teams, Enhancing Capabilities. Specialized technology training, pre-vetted senior developer pods, and seamless onboarding to help your organization build high-performing teams.",
    alternates: {
      canonical: "https://aravinnovations.com/trainingandstaff",
    },
    openGraph: {
      title: "Training and Staff Augmentation | Arav Innovations",
      description:
        "Empowering Teams, Enhancing Capabilities. Specialized technology training, pre-vetted senior developer pods, and seamless onboarding to help your organization build high-performing teams.",
      url: "https://aravinnovations.com/trainingandstaff",
      siteName: "Arav Innovations",
      type: "website",
    },
  };
}

export default async function TrainingAndStaffDirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("training-staff-augmentation") || {
    id: "training-staff-augmentation",
    slug: "training-staff-augmentation",
    title: "Training and Staff Augmentation",
    shortTitle: "Training & Staff",
    eyebrow: "TALENT & CAPABILITY",
    description: "Empowering Teams, Enhancing Capabilities.",
    tagline: "Empowering Teams, Enhancing Capabilities",
    icon: "GraduationCap",
    heroImage: "/images/services/training-staffing.jpg",
    businessProblem: { title: "Friction", description: "", painPoints: [] },
    ourSolution: { title: "Solution", description: "", keyPillars: [] },
    capabilities: [],
    process: [],
    technologies: [],
    engagementModels: [],
    relatedCaseStudySlugs: ["enterprise-cloud-transformation"],
    faqs: [],
  };

  return <TrainingStaffInteractivePage service={service as any} />;
}
