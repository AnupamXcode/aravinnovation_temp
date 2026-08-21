import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { Lock, ChevronRight, FileText, ShieldCheck, Server, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Security & DPDP Compliance | Arav Innovations",
  description: "Enterprise security architecture, DPDP Act 2023 compliance, and data governance frameworks.",
};

const sections = [
  { id: "security-framework", title: "1. Security & Compliance Framework" },
  { id: "dpdp-governance", title: "2. DPDP Act 2023 Compliance" },
  { id: "data-encryption", title: "3. Encryption & Storage Security" },
  { id: "incident-response", title: "4. Incident Response & SLA" },
];

export default async function SecurityDPDPPage({
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
            Data Governance &amp; Security
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
            Security &amp; DPDP Governance
          </h1>
          <p className="text-sm font-mono font-semibold text-[#E8672A]">
            Arav Innovations Enterprise Security Standards
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

          {/* Right Column: Policy Body */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-10 text-sm text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed">
            <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
              Arav Innovations implements strict organizational and technical security controls (SOC-2, ISO 27001, and DPDP Act 2023) to protect data confidentiality, integrity, and availability across all client operations globally.
            </p>

            <section id="security-framework" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#E8672A]" />
                <span>1. Security &amp; Compliance Framework</span>
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                We maintain an enterprise-grade security architecture designed to defend against modern threat vectors and ensure continuous regulatory compliance across regional delivery centers in India and the GCC.
              </p>
            </section>

            <section id="dpdp-governance" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#E8672A]" />
                <span>2. DPDP Act 2023 Compliance</span>
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                In accordance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023, data principal rights, consent management protocols, and purpose-limitation controls are enforced across all customer data workflows.
              </p>
            </section>

            <section id="data-encryption" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-2">
                <Key className="w-5 h-5 text-[#E8672A]" />
                <span>3. Encryption &amp; Storage Security</span>
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                All data in transit is encrypted using TLS 1.3 standards, and data at rest is secured via AES-256 encryption across enterprise cloud environments.
              </p>
            </section>

            <section id="incident-response" className="space-y-4 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] scroll-mt-32">
              <h2 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-2">
                <Server className="w-5 h-5 text-[#E8672A]" />
                <span>4. Incident Response &amp; SLA</span>
              </h2>
              <p className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                Our 24/7 SecOps team actively monitors infrastructure and maintains zero-day vulnerability patching SLAs and incident response readiness.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
