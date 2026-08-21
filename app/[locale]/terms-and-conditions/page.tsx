import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { FileCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Terms & Conditions | Arav Innovations",
  description: "Terms and Conditions governing the use of Arav Innovations digital services and web platform.",
};

export default async function TermsAndConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20 md:py-28 bg-[#FFFDF9] dark:bg-[#12100E] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <Badge variant="secondary" size="md">
            Terms of Service
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
            Terms & Conditions
          </h1>
          <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
            Last updated: August 2026
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-6 text-sm text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#221D18] border border-[#EFE2D6] dark:border-[#3D332B] font-mono text-xs text-[#E8672A]">
            <FileCode className="w-5 h-5 shrink-0" />
            <span>[CONTENT REQUIRED FROM ARAV — OFFICIAL TERMS & CONDITIONS DOCUMENTATION PENDING FINAL BUSINESS APPROVAL]</span>
          </div>

          <p>
            By accessing or using the services provided by Arav Innovations, you agree to comply with and be bound by these Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
