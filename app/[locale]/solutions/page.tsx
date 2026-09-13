import * as React from "react";
import IndustriesPage from "../industries/page";

export const metadata = {
  title: "Industry Solutions | Arav Innovations",
  description:
    "Explore tailored digital architecture, governance, and demand generation frameworks for Fintech, Healthcare, E-Commerce, Logistics, SaaS, and Real Estate across India & UAE.",
  alternates: {
    canonical: "https://aravinnovations.com/solutions",
  },
  openGraph: {
    title: "Industry Solutions | Arav Innovations",
    description:
      "Tailored digital architecture, governance, and demand generation frameworks for Fintech, Healthcare, Logistics, and SaaS globally.",
    url: "https://aravinnovations.com/solutions",
    siteName: "Arav Innovations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Solutions | Arav Innovations",
    description:
      "Tailored digital architecture, governance, and demand generation frameworks for Fintech, Healthcare, Logistics, and SaaS globally.",
  },
};

export default function SolutionsPage() {
  return <IndustriesPage />;
}
