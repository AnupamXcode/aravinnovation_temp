import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { AlertCircle, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Refund Policy | Arav Innovations",
  description: "Refund and cancellation terms for digital marketing & IT services at Arav Innovations.",
};

export default async function RefundPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20 md:py-28 bg-[#FFFDF9] dark:bg-[#12100E] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-4 text-center sm:text-left">
          <Badge variant="secondary" size="md">
            Commercial Terms
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
            Refund Policy
          </h1>
          <p className="text-sm font-semibold text-[#E8672A]">
            Arav Innovation &bull; Commercial Terms & Refund Policy
          </p>
        </div>

        {/* Content Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-8 text-sm text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed">
          <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
            At Arav Innovation, we strive to deliver high-quality digital marketing services tailored to your specific needs. Due to the nature of our services, which involve customized strategies, non-tangible deliverables, and substantial resource allocation, we have a strict no refund policy.
          </p>

          {/* Non-Refundable Services */}
          <section className="space-y-4 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
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
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E8672A] shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Reason for No Refund */}
          <section className="space-y-4 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
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
            <div className="p-4 rounded-2xl bg-[#FCE3D3]/60 dark:bg-[#261F1A] border border-[#F4A97F]/40 dark:border-[#3D332B] flex items-start gap-3 mt-4">
              <AlertCircle className="w-5 h-5 text-[#E8672A] shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-[#3A2E27] dark:text-[#FAF5EE]">
                Due to these reasons, payments made for our services cannot be refunded under any circumstances.
              </p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="space-y-3 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Dispute Resolution
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
              If you have any concerns about the quality or delivery of our services, we encourage you to contact us. We are committed to addressing any issues and ensuring your satisfaction with our work.
            </p>
          </section>

          {/* Contact Us */}
          <section className="space-y-4 pt-6 border-t-2 border-[#E8672A]/30">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Contact Us
            </h2>
            <div className="p-5 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                <Mail className="w-4 h-4 text-[#E8672A]" />
                <span>Email: <a href="mailto:support@aravinnovations.com" className="text-[#E8672A] hover:underline">support@aravinnovations.com</a></span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                <Phone className="w-4 h-4 text-[#E8672A]" />
                <span>Phone: <a href="tel:+919650625777" className="text-[#E8672A] hover:underline">+91 9650625777</a></span>
              </div>
              <div className="flex items-start gap-2 font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                <MapPin className="w-4 h-4 text-[#E8672A] shrink-0 mt-1" />
                <span>Address: Platinum Floor D 14/23 Ardee City Sec 52 Gurgaon 122002</span>
              </div>
            </div>
          </section>

          <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] pt-4 italic border-t border-[#EFE2D6] dark:border-[#2C241E]">
            By engaging our services, you acknowledge and agree to this Refund Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
