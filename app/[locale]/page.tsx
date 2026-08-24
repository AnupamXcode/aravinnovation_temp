import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { ArchitectureCaseStudyCard } from "@/components/case-studies/ArchitectureCaseStudyCard";
import { BeforeAfterSlider } from "@/components/motion/BeforeAfterSlider";
import { InteractiveServiceSelector } from "@/components/services/InteractiveServiceSelector";
import { TestimonialSlider } from "@/components/testimonials/TestimonialSlider";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProcessTimeline } from "@/components/motion/ProcessTimeline";
import { MovingLogoStrip } from "@/components/motion/MovingLogoStrip";
import { servicesData } from "@/data/services";
import { industriesData } from "@/data/industries";
import { caseStudiesData } from "@/data/case-studies";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Award,
  CheckCircle,
  Sparkles,
  ChevronRight,
  Building2,
} from "lucide-react";

import { getSEOForPath, SITE_BASE_URL } from "@/lib/seo";

export async function generateMetadata() {
  const seo = getSEOForPath("/");
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: {
      canonical: seo.canonicalOverride || SITE_BASE_URL,
    },
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      url: SITE_BASE_URL,
      siteName: "Arav Innovations",
      type: "website",
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    robots: {
      index: !seo.robots.includes("NoIndex"),
      follow: !seo.robots.includes("NoFollow"),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const differentiators = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Agile Production Engineering",
      description:
        "Senior full-stack pods operating with subsecond Next.js architecture, cloud-native microservices, and continuous CI/CD automated deployment pipelines.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Governance & Risk Audit Built-In",
      description:
        "Full DPDP Act (India), SOC-2, and ISO compliance rigor applied across every software layer, data storage strategy, and customer-facing portal.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Data-Driven ROI & Demand Gen",
      description:
        "Replaces vanity metrics with closed-loop attribution, high-intent LinkedIn & Search campaigns, and multi-channel conversion funnel modeling.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dual Regional Engineering Hubs",
      description:
        "Regional delivery centers in Gurgaon (HQ) and Dubai (UAE), bridging GCC and South Asian enterprise technology standards seamlessly.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#ffffff] dark:bg-[#101b17] text-[#1b2823] dark:text-[#ffffff] space-y-12 pb-16 transition-colors duration-300">
      {/* STAGE 1 & 2: PROBLEM & TECHNOLOGY — HERO SECTION */}
      <Hero />

      {/* TRUSTED CLIENTS MOVING LOGO STRIP */}
      <section className="w-full py-9 bg-[#fefaf5] dark:bg-[#172420] border-y border-[#f7d7b0] dark:border-[#253630] shadow-sm transition-all duration-300 overflow-hidden">
        <ScrollReveal direction="up">
          <div className="text-center mb-4 px-4">
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#4a5c55] dark:text-[#d3eee4]">
              Trusted By Fast-Growing Enterprises &amp; Industry Leaders Globally
            </span>
          </div>
          <MovingLogoStrip />
        </ScrollReveal>
      </section>

      {/* STAGE 3: INTERACTION ZONE — BEFORE/AFTER VALUE PROPOSITION SLIDER */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <section className="py-16 md:py-20 px-6 sm:px-12 rounded-[2.5rem] bg-[#ffffff] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-xl text-center space-y-8 transition-colors duration-300">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                Interactive Transformation
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                From Legacy Friction to Modern Acceleration
              </h2>
              <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4]">
                See how Arav Innovations replaces slow, manual architectures with cloud-native, automated, and observable enterprise systems.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <BeforeAfterSlider />
          </ScrollReveal>
        </section>
      </div>

      {/* STAGE 3 (CONTINUED): INTERACTION ZONE — WHAT WE DO 7-SERVICE INTERACTIVE SELECTOR */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full" id="services">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#f7d7b0]/30 dark:bg-[#1e2c27]/90 border border-[#f7d7b0] dark:border-[#253630] shadow-2xl transition-all duration-300 relative overflow-hidden">
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#f15e1c]/60 to-transparent" />

          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-3xl space-y-3">
                <Badge variant="secondary" size="md">
                  Our 7 Core Practices
                </Badge>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-[1.1]">
                  Interactive Practice Browser
                </h2>
                <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4]">
                  Select a practice below to inspect capabilities, delivery SLAs, and engineering frameworks.
                </p>
              </div>
              <Link href="/services">
                <Button variant="outline" size="md" className="rounded-full px-7 py-3 border-[#f7d7b0] dark:border-[#253630] bg-white dark:bg-[#172420] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View All Practices
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <InteractiveServiceSelector />
        </section>
      </div>

      {/* STAGE 4: PROOF — TECHNICAL ARCHITECTURE CASE STUDIES */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#f7d7b0]/30 dark:bg-[#1e2c27]/90 border border-[#f7d7b0] dark:border-[#253630] shadow-2xl transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#f15e1c]/50 to-transparent" />

          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-3xl space-y-3">
                <Badge variant="secondary" size="md">
                  Proven Track Record
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Featured Architecture Case Studies
                </h2>
                <p className="text-base text-[#4a5c55] dark:text-[#d3eee4]">
                  Examining how we solve critical architectural bottlenecks, build resilient digital platforms, and scale revenue.
                </p>
              </div>
              <Link href="/case-studies">
                <Button variant="outline" size="md" className="rounded-full px-7 py-3 border-[#f7d7b0] dark:border-[#253630] bg-white dark:bg-[#172420] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  All Case Studies
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudiesData.slice(0, 3).map((study, idx) => (
              <ScrollReveal key={study.slug} delay={idx * 0.1} direction="up">
                <ArchitectureCaseStudyCard caseStudy={study} locale={locale} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* STAGE 4 (CONTINUED): PROOF — CLIENT TESTIMONIALS */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-2xl transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#f15e1c]/40 to-transparent" />

          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Client Endorsements
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Executive Endorsements
              </h2>
              <p className="text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Verified testimonials from CTOs, Founders, and Product Heads partnering with Arav Innovations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <TestimonialSlider />
          </ScrollReveal>
        </section>
      </div>

      {/* STAGE 5: TRANSFORMATION — WHY ARAV & METHODOLOGY */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#ffffff] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Why Partner With Arav
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Engineered for Precision, Speed &amp; Integrity
              </h2>
              <p className="text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We eliminate the traditional disconnect between high-level management consulting and hands-on technical execution.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <TiltCard maxTilt={5} scale={1.01} className="h-full group">
                  <div className="h-full rounded-[2.2rem] bg-white dark:bg-[#22312b] p-8 sm:p-10 border border-[#f7d7b0] dark:border-[#31473f] hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#f15e1c]/40 transition-all duration-300 space-y-4 shadow-sm">
                    <div className="p-4 rounded-2xl icon-box-hover w-fit shadow-xs text-[#f15e1c]">
                      {diff.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                      {diff.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* STAGE 5 (CONTINUED): TRANSFORMATION — 5-STEP METHODOLOGY TIMELINE */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full" id="process">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <Badge variant="secondary" size="md">
                Engagement Lifecycle
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Our 5-Step Execution Methodology
              </h2>
              <p className="text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A disciplined, transparent delivery framework that ensures zero surprises and rapid time-to-value.
              </p>
            </div>
          </ScrollReveal>

          <ProcessTimeline />
        </section>
      </div>

      {/* STAGE 6: ACTION — FINAL LEAD FORM & CTA SECTION */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full" id="contact">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-gradient-to-br from-[#ffffff] via-[#fefaf5] to-[#f7d7b0]/50 dark:from-[#172420] dark:via-[#1e2c27] dark:to-[#253630] border-2 border-[#f15e1c]/40 shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Messaging */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal direction="up">
                <Badge variant="secondary" size="md">
                  Get In Touch
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight mt-3 leading-[1.1]">
                  Ready to Transform Your Digital Capabilities?
                </h2>
                <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed mt-3">
                  Whether you are modernizing legacy infrastructure, launching an enterprise web application, accelerating B2B demand generation, or augmenting your engineering sprint with senior talent, we are ready to assist.
                </p>

                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#22312b] border border-[#f7d7b0] dark:border-[#31473f] space-y-3.5 mt-6 shadow-md">
                  <h4 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                    What Happens Next:
                  </h4>
                  <ul className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] space-y-2.5">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>Discovery call with a senior practice director within 24 hours</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>Technical scope definition &amp; preliminary milestone roadmap</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>Transparent engagement model (Sprint, Retainer, or Pod)</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Col: Interactive Lead Form */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="left" delay={0.2}>
                <LeadForm source="homepage_final_cta" />
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
