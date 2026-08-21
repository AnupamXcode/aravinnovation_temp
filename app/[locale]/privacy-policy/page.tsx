import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy | Arav Innovations",
  description: "Privacy Policy for Arav Innovations — Effective 27th Dec 2024.",
};

export default async function PrivacyPolicyPage({
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
            Legal & Compliance
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm font-semibold text-[#E8672A]">
            Privacy Policy for Arav Innovation &bull; Effective Date: 27th Dec 2024
          </p>
        </div>

        {/* Content Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-8 text-sm text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed">
          <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
            At Arav Innovation, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, services, or engage with us in any capacity. By using our services, you agree to the terms outlined in this Privacy Policy.
          </p>

          {/* 1. Information We Collect */}
          <section className="space-y-4 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              1. Information We Collect
            </h2>
            <div className="space-y-3 pl-2">
              <h3 className="font-semibold text-[#E8672A]">1.1 Information You Provide to Us</h3>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">We may collect the following personal information directly from you:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#7A6A5F] dark:text-[#B8ACA0]">
                <li>Name, email address, phone number, and mailing address</li>
                <li>Business or company name</li>
                <li>Payment details for billing purposes</li>
                <li>Information shared through forms, surveys, or email communications</li>
              </ul>
            </div>

            <div className="space-y-3 pl-2 pt-2">
              <h3 className="font-semibold text-[#E8672A]">1.2 Information Collected Automatically</h3>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">When you visit our website or interact with our services, we may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#7A6A5F] dark:text-[#B8ACA0]">
                <li>IP address and browser type</li>
                <li>Device type and operating system</li>
                <li>Pages visited, time spent on pages, and other usage statistics</li>
                <li>Cookies and similar tracking technologies (see Section 6 for details)</li>
              </ul>
            </div>

            <div className="space-y-3 pl-2 pt-2">
              <h3 className="font-semibold text-[#E8672A]">1.3 Information from Third Parties</h3>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                We may receive information about you from third-party platforms (e.g., social media platforms) or partners when you interact with our content or services through these platforms.
              </p>
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section className="space-y-4 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              2. How We Use Your Information
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">We use your information for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#7A6A5F] dark:text-[#B8ACA0]">
              <li>To provide and manage our digital marketing services</li>
              <li>To communicate with you regarding inquiries, updates, and services</li>
              <li>To process payments and manage billing</li>
              <li>To personalize your experience and improve our offerings</li>
              <li>To analyze website and service performance</li>
              <li>To comply with legal and regulatory obligations</li>
            </ul>
          </section>

          {/* 3. Sharing Your Information */}
          <section className="space-y-4 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              3. Sharing Your Information
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2 text-[#7A6A5F] dark:text-[#B8ACA0]">
              <li>
                <strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Service Providers:</strong> We may share your information with third-party vendors who perform services on our behalf (e.g., payment processors, hosting providers, analytics tools).
              </li>
              <li>
                <strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Legal Obligations:</strong> We may disclose your information if required to do so by law or in response to valid legal requests (e.g., subpoenas, court orders).
              </li>
              <li>
                <strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Business Transfers:</strong> If Arav Innovation is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </li>
            </ul>
          </section>

          {/* 4. Data Retention */}
          <section className="space-y-3 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              4. Data Retention
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
              We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          {/* 5. Data Security */}
          <section className="space-y-3 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              5. Data Security
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* 6. Cookies and Tracking Technologies */}
          <section className="space-y-3 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#7A6A5F] dark:text-[#B8ACA0]">
              <li>Enhance your browsing experience</li>
              <li>Understand how our website is used</li>
              <li>Provide relevant advertisements</li>
            </ul>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0] pt-1">
              You can manage your cookie preferences through your browser settings. Note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          {/* 7. Your Rights */}
          <section className="space-y-3 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              7. Your Rights
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#7A6A5F] dark:text-[#B8ACA0]">
              <li><strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Correction:</strong> Request corrections to inaccurate or incomplete information.</li>
              <li><strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Deletion:</strong> Request the deletion of your personal information, subject to legal and contractual obligations.</li>
              <li><strong className="text-[#3A2E27] dark:text-[#FAF5EE]">Objection:</strong> Object to the processing of your personal information for specific purposes.</li>
            </ul>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0] pt-1">
              To exercise these rights, please contact us at <a href="mailto:support@aravinnovations.com" className="text-[#E8672A] font-semibold hover:underline">support@aravinnovations.com</a>.
            </p>
          </section>

          {/* 8. Third-Party Links */}
          <section className="space-y-3 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              8. Third-Party Links
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
              Our website or services may include links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* 9. Children’s Privacy */}
          <section className="space-y-3 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              9. Children’s Privacy
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
              Our services are not directed at children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
            </p>
          </section>

          {/* 10. Changes to This Privacy Policy */}
          <section className="space-y-3 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this policy periodically for updates. The effective date at the top of this policy indicates the most recent revision.
            </p>
          </section>

          {/* 11. Contact Us */}
          <section className="space-y-4 pt-6 border-t-2 border-[#E8672A]/30">
            <h2 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              11. Contact Us
            </h2>
            <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
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
            By using our services, you acknowledge that you have read, understood, and agree to this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
