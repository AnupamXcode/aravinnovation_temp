import * as React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { companyContactInfo } from "@/data/navigation";
import { LocalBusinessSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import {
  Globe2,
  ShieldCheck,
  Zap,
  Users,
  Target,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About Us | Arav Innovations",
  description:
    "Learn about Arav Innovations — a multidisciplinary B2B technology consulting, full-stack software development, digital marketing, and governance firm operating globally.",
  alternates: {
    canonical: "https://aravinnovations.com/about",
  },
  openGraph: {
    title: "About Us | Arav Innovations",
    description:
      "Multidisciplinary B2B technology consulting, full-stack software engineering, digital marketing, risk & governance globally.",
    url: "https://aravinnovations.com/about",
    siteName: "Arav Innovations",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Arav Innovations",
    description:
      "Multidisciplinary B2B technology consulting, software engineering, digital marketing, risk & governance globally.",
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "Engineering Precision Over Fluff",
      description:
        "We reject superficial vanity metrics and non-actionable reports. Every initiative is backed by architectural sound principles, clean code, and provable business ROI.",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Cross-Border Integrity & Compliance",
      description:
        "With a global footprint and active operations in India and the UAE, we adhere strictly to global security frameworks, DPDP Act mandates, and regional data governance requirements.",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      title: "Radical Transparency & Code Ownership",
      description:
        "You own 100% of your source code, infrastructure configurations, ad accounts, and IP. No vendor lock-in, no hidden markups, and zero proprietary black boxes.",
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Long-Term Client Partnership",
      description:
        "We measure our success by the longevity and compound growth of the enterprises we serve, evolving from initial sprint execution into long-term strategic advisory.",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const highlights = [
    "7 Integrated Practices under unified leadership",
    "Dual Delivery Centers in Bengaluru/Noida & Dubai",
    "100% Code & IP Ownership guaranteed to clients",
    "Zero shelfware: actionable blueprints & engineering",
    "Strict compliance with DPDP, GDPR & SOC-2 standards",
    "Agile sprint delivery with dedicated practice directors",
  ];

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "About Us", url: "/about" }]} />
      <LocalBusinessSchema location="both" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
        {/* 1. Hero Section */}
        <section className="space-y-6 max-w-3xl">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "About Us" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" size="md">
                <span className="w-2 h-2 rounded-full bg-[#E8672A] animate-pulse" />
                <span>Result-Driven Digital Excellence</span>
              </Badge>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-[1.12]">
              Shaping Future-Ready Enterprises Globally
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg sm:text-xl text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed font-normal">
              Arav Innovations is a multidisciplinary technology, strategy, digital growth, governance, and staff augmentation firm. We bridge the gap between high-level management consulting and hands-on technical execution to deliver lasting business impact.
            </p>
          </ScrollReveal>
        </section>

        {/* 2. Story & Differentiators */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up">
              <Badge variant="secondary" size="sm">
                Our Foundation
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] mt-3">
                Built to Solve Complex Modern Challenges
              </h2>
              <p className="text-sm sm:text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mt-4">
                In today’s fast-moving market, growing businesses struggle with fragmented vendors: hiring one agency for digital marketing, another for cloud migrations, a third for software development, and distinct legal advisors for privacy compliance.
              </p>
              <p className="text-sm sm:text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mt-3">
                At Arav Innovations, we provide a cohesive multidisciplinary model. Our senior architects, developers, growth strategists, and governance specialists work in tight synchronization, ensuring that your IT infrastructure directly accelerates your top-line revenue while remaining rock-solid, secure, and compliant.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    <CheckCircle2 className="w-4 h-4 text-[#E8672A] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/services">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore Our 7 Practices
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="md">
                    Talk to an Advisor
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={0.2}>
              <TiltCard maxTilt={5} className="group">
                <div className="p-8 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#E8672A] text-white shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <Globe2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                        Dual-Regional Presence
                      </h3>
                      <span className="text-xs text-[#E8672A] font-semibold">Global Operations</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                    Operating across two of the world’s most dynamic economic corridors: India (fastest-growing engineering powerhouse) and the United Arab Emirates (premier global commerce and tech hub).
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] space-y-1">
                      <span className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#E8672A]" /> India Headquarters
                      </span>
                      <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                        {companyContactInfo.offices[0].status}
                      </p>
                      <p className="text-[11px] font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                        {companyContactInfo.phoneIndia}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] space-y-1">
                      <span className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#E8672A]" /> UAE & Middle East Hub
                      </span>
                      <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                        {companyContactInfo.offices[1].status}
                      </p>
                      <p className="text-[11px] font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                        {companyContactInfo.phoneUAE}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </section>

        {/* 3. Core Principles Grid */}
        <section className="space-y-12">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                Guiding Philosophy
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                The Values That Drive Every Sprint
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                How we work with our engineering pods, enterprise clients, and leadership teams.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="up">
                <TiltCard maxTilt={5} scale={1.01} className="h-full group">
                  <div className="h-full p-8 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:shadow-xl hover:border-[#E8672A]/40 transition-all space-y-3">
                    <div className="p-3.5 rounded-2xl icon-box-hover w-fit shadow-xs">
                      {v.icon}
                    </div>
                    <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 4. Bottom CTA */}
        <ScrollReveal direction="up">
          <section className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] p-8 sm:p-12 border border-[#EFE2D6] dark:border-[#2C241E] text-center max-w-3xl mx-auto space-y-5 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Connect With Our Practice Leadership
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              Ready to explore how Arav Innovations can engineer your next digital platform or optimize your enterprise growth?
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start a Confidential Discussion
                </Button>
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
