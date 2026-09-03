import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { TrainingStaffInteractivePage } from "@/components/services/TrainingStaffInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Training & Staff Augmentation Services | Arav Innovations",
    description: "Build technology capabilities and extend delivery teams with tailored training, specialist expertise, staff augmentation and knowledge transfer.",
    alternates: {
      canonical: "https://aravinnovations.com/services/training-staff-augmentation",
    },
  };
}

export default async function TrainingStaffPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug("training-staff-augmentation");

  if (!service) {
    notFound();
  }

  return <TrainingStaffInteractivePage service={service} />;
}
