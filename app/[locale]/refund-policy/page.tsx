import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { AlertCircle, Mail, Phone, MapPin, CheckCircle2, ChevronRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Refund Policy | Arav Innovations",
  description: "Refund and cancellation terms for digital marketing & IT services at Arav Innovations.",
};

const sections = [
  { id: "non-refundable", title: "Non-Refundable Services" },
  { id: "reason-no-refund", title: "Reason for No Refund" },
  { id: "dispute-resolution", title: "Dispute Resolution" },
  { id: "contact-us", title: "Contact Us" },
];

export default async function RefundPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-24 md:py-32 bg-[#FFFDF9] dark:bg-[#000000] min-h-screen">
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="secondary" size="md" className="rounded-full px-4">
            Commercial Terms
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
            Refund Policy
          </h1>
          <p className="text-sm font-mono font-semibold text-[#f15e1c]">
            Arav Innovation &bull; Commercial Terms &amp; Refund Policy
          </p>
        </div>

        {/* 2-Column Desktop Architecture with Sticky Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
          {/* Left Column: Sticky Table of Contents */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-32 space-y-4 p-6 rounded-3xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm">
            <div className="flex items-center gap-2 font-bold font-display text-sm text-[#3A2E27] dark:text-[#FAF5EE] border-b border-[#EFE2D6] dark:border-[#1f1f1f] pb-3">
              <FileText className="w-4 h-4 text-[#f15e1c]" />
              <span>Table of Contents</span>
            </div>
            <nav className="space-y-1 text-xs">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center justify-between p-2 rounded-xl text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] hover:bg-white dark:hover:bg-[#221D18] transition-all font-medium group"
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#f15e1c]" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Column: Policy Document Body */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-10 text-sm text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed">
            <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
              At Arav Innovation, we strive to deliver high-quality digital marketing services tailored to your specific needs. Due to the nature of our services, which involve customized strategies, non-tangible deliverables, and substantial resource allocation, we have a strict no refund policy.
            </p>

            {/* Non-Refundable Services */}
            <section id="non-refundable" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Non-Refundable Services
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                All payments made for the following services are non-refundable:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Social Media Marketing",
                  "Search Engine Optimization (SEO)",
                  "Pay-Per-Click Advertising (PPC)",
                  "Content Creation and Marketing",
                  "Email Marketing",
                  "Branding and Graphic Design",
                  "Website Development and Management",
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#FBF3EA] dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#f15e1c] shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reason for No Refund */}
            <section id="reason-no-refund" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Reason for No Refund
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                As a service-based business, our work involves significant time, effort, and expertise to deliver results. Once a project is initiated:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#7A6A5F] dark:text-[#B8ACA0]">
                <li>Resources are allocated specifically for your account.</li>
                <li>Custom strategies are developed and executed based on your requirements.</li>
                <li>Results depend on various external factors, such as market trends and platform algorithms, which are beyond our control.</li>
              </ul>
              <div className="p-5 rounded-2xl bg-[#FCE3D3]/60 dark:bg-[#161616] border border-[#F4A97F]/40 dark:border-[#262626] flex items-start gap-3 mt-4">
                <AlertCircle className="w-5 h-5 text-[#f15e1c] shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-[#3A2E27] dark:text-[#FAF5EE]">
                  Due to these reasons, payments made for our services cannot be refunded under any circumstances.
                </p>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section id="dispute-resolution" className="space-y-3 pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Dispute Resolution
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                If you have any concerns about the quality or delivery of our services, we encourage you to contact us. We are committed to addressing any issues and ensuring your satisfaction with our work.
              </p>
            </section>

            {/* Contact Us */}
            <section id="contact-us" className="space-y-4 pt-6 border-t-2 border-[#f15e1c]/30 scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Contact Us
              </h2>
              <div className="p-6 rounded-2xl bg-[#FBF3EA] dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  <Mail className="w-4 h-4 text-[#f15e1c]" />
                  <span>Email: <a href="mailto:support@aravinnovations.com" className="text-[#f15e1c] hover:underline">support@aravinnovations.com</a></span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  <Phone className="w-4 h-4 text-[#f15e1c]" />
                  <span>Phone: <a href="tel:+919650625777" className="text-[#f15e1c] hover:underline">+91 9650625777</a></span>
                </div>
                <div className="flex items-start gap-2 font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  <MapPin className="w-4 h-4 text-[#f15e1c] shrink-0 mt-1" />
                  <span>Address: Platinum Floor D 14/23 Ardee City Sec 52 Gurgaon 122002</span>
                </div>
              </div>
            </section>

            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] pt-4 italic border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
              By engaging our services, you acknowledge and agree to this Refund Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
