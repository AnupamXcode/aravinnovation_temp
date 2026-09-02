import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, Mail, Phone, MapPin, ChevronRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata = {
  title: "Privacy Policy | Arav Innovations",
  description: "Privacy Policy for Arav Innovations — Effective 27th Dec 2024.",
};

const sections = [
  { id: "info-we-collect", title: "1. Information We Collect" },
  { id: "how-we-use", title: "2. How We Use Your Information" },
  { id: "sharing-info", title: "3. Sharing Your Information" },
  { id: "data-retention", title: "4. Data Retention" },
  { id: "data-security", title: "5. Data Security" },
  { id: "cookies-tracking", title: "6. Cookies & Tracking" },
  { id: "your-rights", title: "7. Your Rights" },
  { id: "third-party", title: "8. Third-Party Links" },
  { id: "childrens-privacy", title: "9. Children's Privacy" },
  { id: "policy-changes", title: "10. Changes to This Policy" },
  { id: "contact-us", title: "11. Contact Us" },
];

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-24 md:py-32 bg-[#FFFDF9] dark:bg-[#000000] min-h-screen">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        {/* Policy Header */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="space-y-4 max-w-3xl">
            <Badge variant="secondary" size="md" className="rounded-full px-4">
              Legal &amp; Compliance
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm font-mono font-semibold text-[#f15e1c]">
              Privacy Policy for Arav Innovations &bull; Effective Date: 27th Dec 2024
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Desktop Architecture with Sticky Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
          {/* Left Column: Sticky Table of Contents (Desktop) */}
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
                  className="flex items-center justify-between p-2.5 rounded-xl text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] hover:bg-white dark:hover:bg-[#221D18] transition-all font-semibold group"
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#f15e1c]" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Column: Policy Document Body */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-10 text-sm text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed">
            <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
              At Arav Innovations, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, services, or engage with us in any capacity. By using our services, you agree to the terms outlined in this Privacy Policy.
            </p>

            {/* 1. Information We Collect */}
            <ScrollReveal direction="up" delay={0.1}>
              <section id="info-we-collect" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f] scroll-mt-32 group">
                <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors">
                  1. Information We Collect
                </h2>
                <div className="space-y-3 pl-2">
                  <h3 className="font-semibold text-[#f15e1c]">1.1 Information You Provide to Us</h3>
                  <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">We may collect the following personal information directly from you:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[#7A6A5F] dark:text-[#B8ACA0]">
                    <li>Name, email address, phone number, and mailing address</li>
                    <li>Business or company name</li>
                    <li>Payment details for billing purposes</li>
                    <li>Information shared through forms, surveys, or email communications</li>
                  </ul>
                </div>
              </section>
            </ScrollReveal>

            {/* 2. How We Use Your Information */}
            <ScrollReveal direction="up" delay={0.15}>
              <section id="how-we-use" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f] scroll-mt-32 group">
                <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors">
                  2. How We Use Your Information
                </h2>
                <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">We use your information for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-[#7A6A5F] dark:text-[#B8ACA0]">
                  <li>To provide and manage our digital marketing &amp; engineering services</li>
                  <li>To communicate regarding inquiries, project roadmaps, and technical updates</li>
                  <li>To process payments and manage billing</li>
                  <li>To personalize your experience and optimize performance</li>
                  <li>To comply with legal and regulatory obligations</li>
                </ul>
              </section>
            </ScrollReveal>

            {/* 3. Sharing Your Information */}
            <ScrollReveal direction="up" delay={0.2}>
              <section id="sharing-info" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#1f1f1f] scroll-mt-32 group">
                <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors">
                  3. Sharing Your Information
                </h2>
                <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">We may share your information under strict governance terms with verified infrastructure partners and legal authorities when required.</p>
              </section>
            </ScrollReveal>

            {/* Contact Section */}
            <ScrollReveal direction="up" delay={0.25}>
              <section id="contact-us" className="space-y-4 pt-6 border-t-2 border-[#f15e1c]/30 scroll-mt-32">
                <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  11. Contact Us
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
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
