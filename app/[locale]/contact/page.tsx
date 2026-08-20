import * as React from "react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { companyContactInfo } from "@/data/navigation";
import { LocalBusinessSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import {
  MapPin,
  Mail,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "Contact Us & Regional Offices | Arav Innovations",
  description:
    "Get in touch with Arav Innovations' leadership and practice directors globally to discuss your technology, growth, or staffing requirements.",
  alternates: {
    canonical: "https://aravinnovations.com/contact",
  },
  openGraph: {
    title: "Contact Us & Regional Offices | Arav Innovations",
    description:
      "Connect with our solutions architects globally for confidential discovery discussions and engagement scoping.",
    url: "https://aravinnovations.com/contact",
    siteName: "Arav Innovations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us & Regional Offices | Arav Innovations",
    description:
      "Connect with our solutions architects globally for confidential discovery discussions and engagement scoping.",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Contact Us", url: "/contact" }]} />
      <LocalBusinessSchema location="both" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Contact Us" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <Badge variant="secondary" size="md">
              Direct Consultation
            </Badge>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Let’s Discuss Your Enterprise Technology & Growth Goals
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              Global reach with active presence in India & UAE, plus operations across the US, EU, and Canada. Our practice leads and solutions architects are available for confidential discovery discussions, technical audits, and engagement scoping.
            </p>
          </ScrollReveal>
        </div>

        {/* Main Grid: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={0.1}>
              <LeadForm source="contact_page" />
            </ScrollReveal>
          </div>

          {/* Right Column: Office Hubs & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left" delay={0.2}>
              <TiltCard maxTilt={4}>
                <div className="p-8 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-6 shadow-xl">
                  <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                    Regional Hubs & Addresses
                  </h3>

                  {/* India HQ */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#3A2E27] dark:text-[#FAF5EE]">
                      <MapPin className="w-4 h-4 text-[#E8672A]" />
                      <span>India Headquarters</span>
                    </div>
                    <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                      {companyContactInfo.offices[0].address}
                    </p>
                    <div className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] pt-1">
                      Phone: {companyContactInfo.phoneIndia}
                    </div>
                  </div>

                  {/* UAE Hub */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#3A2E27] dark:text-[#FAF5EE]">
                      <MapPin className="w-4 h-4 text-[#E8672A]" />
                      <span>UAE & Middle East Hub</span>
                    </div>
                    <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                      {companyContactInfo.offices[1].address}
                    </p>
                    <div className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] pt-1">
                      Phone: {companyContactInfo.phoneUAE}
                    </div>
                  </div>

                  {/* Direct Emails */}
                  <div className="pt-2 space-y-2.5 text-xs text-[#7A6A5F] dark:text-[#B8ACA0] border-t border-[#EFE2D6] dark:border-[#2C241E]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#E8672A]" />
                      <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">General Inquiries:</span>
                      <a href={`mailto:${companyContactInfo.email}`} className="text-[#E8672A] hover:underline">
                        {companyContactInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#E8672A]" />
                      <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">Sales & New Business:</span>
                      <a href={`mailto:${companyContactInfo.salesEmail}`} className="text-[#E8672A] hover:underline">
                        {companyContactInfo.salesEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Response Guarantee Box */}
            <ScrollReveal direction="left" delay={0.3}>
              <div className="p-6 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8672A]">
                  <Clock className="w-4 h-4" />
                  <span>Response SLA</span>
                </div>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  All inquiries submitted during standard business hours (IST / GST) receive an executive acknowledgment and preliminary review within 4 business hours.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
