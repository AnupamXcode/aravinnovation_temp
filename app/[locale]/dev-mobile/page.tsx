import { notFound } from "next/navigation";
import { DevMobileStudio } from "@/components/dev/DevMobileStudio";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const isDev =
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENVIRONMENT === "development";

  if (!isDev) {
    return {};
  }

  return {
    title: "Mobile Dev Studio | [LOCAL DEV ONLY]",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DevMobilePage() {
  const isDev =
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENVIRONMENT === "development";

  // STRICT PRODUCTION ISOLATION:
  // When running in production (or deployed to Vercel production),
  // return 404 immediately so the route does NOT exist in production runtime.
  if (!isDev) {
    notFound();
  }

  return <DevMobileStudio />;
}
