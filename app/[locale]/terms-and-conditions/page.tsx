import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { Sparkles, ShieldCheck, Mail, CheckCircle2, ChevronRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Terms & Conditions | Arav Innovations",
  description: "Terms and Conditions governing Arav Innovation services — Effective 27th Dec 2024.",
};

const sections = [
  { id: "why-choose", title: "Why Choose Arav Innovations?" },
  { id: "your-privacy", title: "Your Privacy, Our Priority" },
  { id: "terms-overview", title: "Terms Overview" },
  { id: "scope-of-services", title: "Scope of Services" },
  { id: "client-obligations", title: "Client Obligations" },
  { id: "payment-terms", title: "Payment Terms" },
  { id: "contact-us", title: "Contact Us" },
];

export default async function TermsAndConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-24 md:py-32 bg-[#FFFDF9] dark:bg-[#12100E] min-h-screen">
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="secondary" size="md" className="rounded-full px-4">
            Terms of Service
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm font-mono font-semibold text-[#E8672A]">
            Arav Innovation &bull; Effective Date: 27th Dec 2024 &bull; Updated 2024
          </p>
        </div>

        {/* 2-Column Desktop Architecture with Sticky Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E]">
          {/* Left Column: Sticky Table of Contents */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-32 space-y-4 p-6 rounded-3xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm">
            <div className="flex items-center gap-2 font-bold font-display text-sm text-[#3A2E27] dark:text-[#FAF5EE] border-b border-[#EFE2D6] dark:border-[#2C241E] pb-3">
              <FileText className="w-4 h-4 text-[#E8672A]" />
              <span>Table of Contents</span>
            </div>
            <nav className="space-y-1 text-xs">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center justify-between p-2 rounded-xl text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:bg-white dark:hover:bg-[#221D18] transition-all font-medium group"
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#E8672A]" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Column: Policy Document Body */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-10 text-sm text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed">
            {/* Welcome Intro */}
            <div className="space-y-3">
              <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
                Welcome to Arav Innovations! At Arav Innovations, we are dedicated to delivering cutting-edge IT solutions, exceptional digital marketing strategies, and a suite of comprehensive services designed to help businesses thrive in today&apos;s competitive landscape. We prioritize transparency, innovation, and customer satisfaction in every project we undertake.
              </p>
            </div>

            {/* Why Choose Arav Innovations */}
            <section id="why-choose" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E8672A]" />
                <span>Why Choose Arav Innovations?</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] space-y-1">
                  <div className="font-bold text-[#E8672A]">Expert IT Services</div>
                  <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">Tailored solutions to optimize your business operations with the latest technological advancements.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] space-y-1">
                  <div className="font-bold text-[#E8672A]">Strategic Digital Marketing</div>
                  <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">Result-driven campaigns to enhance your brand visibility and online presence.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] space-y-1">
                  <div className="font-bold text-[#E8672A]">Web Development Excellence</div>
                  <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">Custom websites and platforms designed to engage your audience and drive conversions.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] space-y-1">
                  <div className="font-bold text-[#E8672A]">Audit &amp; Compliance Services</div>
                  <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">Ensure your business adheres to industry standards with our meticulous compliance solutions.</p>
                </div>
              </div>
            </section>

            {/* Your Privacy, Our Priority */}
            <section id="your-privacy" className="space-y-3 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#E8672A]" />
                <span>Your Privacy, Our Priority</span>
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                We are committed to safeguarding your personal information. Any data you share with us will be handled responsibly and securely in line with applicable regulations, ensuring your peace of mind while working with us.
              </p>
            </section>

            {/* Terms Overview */}
            <section id="terms-overview" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Terms Overview
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                Welcome to Arav Innovation. These Terms and Conditions govern your use of our digital marketing services. By engaging our services, you agree to comply with the following terms and conditions. Please read them carefully.
              </p>
            </section>

            {/* Scope of Services */}
            <section id="scope-of-services" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Scope of Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  "Social Media Marketing",
                  "Search Engine Optimization (SEO)",
                  "Pay-Per-Click Advertising (PPC)",
                  "Content Marketing",
                  "Email Marketing",
                  "Website Development and Management",
                  "Branding and Graphic Design",
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FBF3EA] dark:bg-[#1E1915] text-xs font-medium text-[#3A2E27] dark:text-[#FAF5EE]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E8672A] shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Client Obligations */}
            <section id="client-obligations" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Client Obligations
              </h2>
              <ul className="list-disc pl-5 space-y-2.5 text-[#7A6A5F] dark:text-[#B8ACA0]">
                <li>
                  <strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Timely Communication:</strong> The client must provide timely access to necessary materials, including logos, images, brand guidelines, and any other required resources.
                </li>
                <li>
                  <strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Accuracy of Information:</strong> The client is responsible for ensuring all information provided is accurate, current, and complete.
                </li>
                <li>
                  <strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Approvals:</strong> The client must provide approvals for drafts, designs, or campaigns within agreed timelines to avoid delays.
                </li>
              </ul>
            </section>

            {/* Payment Terms */}
            <section id="payment-terms" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Payment Terms
              </h2>
              <ul className="list-disc pl-5 space-y-2.5 text-[#7A6A5F] dark:text-[#B8ACA0]">
                <li>
                  <strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Fees:</strong> Fees for services will be agreed upon in a proposal or contract and must be paid according to the payment schedule outlined.
                </li>
                <li>
                  <strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Late Payments:</strong> Late payments may incur additional fees or interest, as specified in the invoice or agreement.
                </li>
                <li>
                  <strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Refunds:</strong> All payments are non-refundable unless otherwise specified in the contract.
                </li>
              </ul>
            </section>

            {/* Contact Us */}
            <section id="contact-us" className="space-y-4 pt-6 border-t-2 border-[#E8672A]/30 scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Contact Us
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                For inquiries, feedback, or support, feel free to reach out to us. Our team is always ready to assist you. Connect with us today at <a href="mailto:support@aravinnovations.com" className="text-[#E8672A] font-semibold hover:underline">support@aravinnovations.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
