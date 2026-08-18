import * as React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowRight, Globe2 } from "lucide-react";

export const metadata = {
  title: "Our 7 Core Practices | Arav Innovations",
  description:
    "Explore Arav Innovations' 7 enterprise practice areas: IT Strategy, Web & App Development, Digital Marketing, SEO, Risk Governance & Compliance, Auditing, and Staff Augmentation.",
};

export default function ServicesHubPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <ScrollReveal direction="up">
          <div className="mb-8">
            <Breadcrumb items={[{ label: "Services & Practices" }]} />
          </div>
        </ScrollReveal>

        {/* Hero Banner */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-3xl space-y-4 mb-16">
            <Badge variant="secondary" size="md">
              Full-Spectrum Capabilities
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Seven Core Practices Engineered for Enterprise Impact
            </h1>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              Arav Innovations delivers end-to-end capabilities spanning executive technology strategy, high-scale software engineering, commercial digital marketing, data governance, independent audits, and dedicated talent pods.
            </p>
          </div>
        </ScrollReveal>

        {/* 7 Practice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ScrollReveal key={service.slug} delay={index * 0.08} direction="up">
              <ServiceCard
                service={service}
                featured={index === 0 || index === 1}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Regional Advisory Banner */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-20 rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#E8672A] text-white mx-auto flex items-center justify-center shadow-xs">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Need a Customized Multi-Practice Engagement?
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] max-w-xl mx-auto leading-relaxed">
              Many of our enterprise engagements combine strategic advisory with full-stack execution and staff augmentation. Speak with our leadership team to configure a bespoke scope.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Discuss Your Enterprise Scope
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
