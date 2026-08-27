import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { getServiceBySlug } from "@/data/services";
import { TrainingStaffInteractivePage } from "@/components/services/TrainingStaffInteractivePage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const service = getServiceBySlug("training-staff-augmentation");
  return {
    title: `${service?.title || "Training and Staff Augmentation"} | Arav Innovations`,
    description: service?.description || "Vetted on-demand technical talent, enterprise upskilling programs & dedicated engineering squads.",
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
