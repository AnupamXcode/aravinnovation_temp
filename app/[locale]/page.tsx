import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
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
    <div className="flex flex-col min-h-screen w-full bg-[#FAF5EE] dark:bg-[#0E0C0A] space-y-8 pb-16">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TRUSTED CLIENTS MOVING STRIP (Full-Bleed Viewport Width - Light Neutral Base) */}
      <section className="w-full py-9 bg-[#F9F6F0] dark:bg-[#14110E] border-y border-[#EFE2D6] dark:border-[#2C241E] shadow-sm transition-all duration-300 overflow-hidden">
        <ScrollReveal direction="up">
          <div className="text-center mb-4 px-4">
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#7A6A5F] dark:text-[#B8ACA0]">
              Trusted By Fast-Growing Enterprises &amp; Industry Leaders Globally
            </span>
          </div>
          <MovingLogoStrip />
        </ScrollReveal>
      </section>

      {/* 3. WHAT WE DO — 7 DISTINCT SERVICE CARDS (Soft Warm-Orange Section Base + Elevated White Cards) */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full" id="services">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#FCEFE6]/80 dark:bg-[#181411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300 relative overflow-hidden">
          {/* Subtle Top Accent Divider */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E8672A]/60 to-transparent" />

          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-3xl space-y-3">
                <Badge variant="secondary" size="md">
                  Our 7 Core Practices
                </Badge>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-[1.1]">
                  Comprehensive Technology &amp; Growth Services
                </h2>
                <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0]">
                  We go far beyond basic digital marketing. Discover our dedicated engineering, strategic advisory, compliance, and staff augmentation capabilities.
                </p>
              </div>
              <Link href="/services">
                <Button variant="outline" size="md" className="rounded-full px-7 py-3 border-[#EFE2D6] dark:border-[#2C241E] bg-white dark:bg-[#1F1A16] hover:border-[#E8672A]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View All Practices
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {servicesData.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 0.06} direction="up">
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* 4. WHO WE HELP — INDUSTRY GRID (Warm Beige Base + Contrast Cards) */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#F7EFE6]/80 dark:bg-[#16120F] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300 relative overflow-hidden">
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E8672A]/40 to-transparent" />

          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Industry Verticals
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Tailored Frameworks for High-Growth Sectors
              </h2>
              <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
                Specialized domain expertise addressing strict data sovereignty, high transaction concurrency, and vertical market dynamics.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {industriesData.map((ind, idx) => (
              <ScrollReveal key={ind.slug} delay={idx * 0.08} direction="up">
                <TiltCard maxTilt={5} scale={1.02} className="h-full group">
                  <div className="h-full rounded-[2rem] bg-white dark:bg-[#1F1A16] p-8 border border-[#EFE2D6] dark:border-[#2C241E] shadow-md hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#E8672A]/10 hover:border-[#E8672A]/50 dark:hover:border-[#E8672A]/50 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 rounded-2xl icon-box-hover shadow-xs">
                          <Building2 className="w-6 h-6 text-[#E8672A]" />
                        </div>
                        <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#FCE3D3]/60 dark:bg-[#261F1A] text-[#3A2E27] dark:text-[#FAF5EE] font-semibold border border-[#EFE2D6] dark:border-[#2C241E]">
                          {ind.statusNote || "[CONFIRMED]"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors mb-2.5">
                        {ind.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mb-5">
                        {ind.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                      {ind.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-[#3A2E27] dark:text-[#FAF5EE]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8672A] shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/solutions">
              <Button variant="secondary" size="lg" className="rounded-full px-8 py-3.5 bg-white dark:bg-[#1F1A16] border border-[#EFE2D6] dark:border-[#2C241E]" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Explore Full Industry Solutions Matrix
              </Button>
            </Link>
          </div>
        </section>
      </div>

      {/* 5. WHY ARAV — DIFFERENTIATOR GRID (Light Neutral Foundation) */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#FFFDF9] dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Why Partner With Arav
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Engineered for Precision, Speed &amp; Integrity
              </h2>
              <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
                We eliminate the traditional disconnect between high-level management consulting and hands-on technical execution.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <TiltCard maxTilt={5} scale={1.01} className="h-full group">
                  <div className="h-full rounded-[2.2rem] bg-white dark:bg-[#171411] p-8 sm:p-10 border border-[#EFE2D6] dark:border-[#2C241E] hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#E8672A]/40 dark:hover:border-[#E8672A]/40 transition-all duration-300 space-y-4 shadow-sm">
                    <div className="p-4 rounded-2xl icon-box-hover w-fit shadow-xs text-[#E8672A]">
                      {diff.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors">
                      {diff.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* 6. CASE STUDIES / RESULTS PREVIEW (Soft Warm-Orange Base + Elevated White Cards) */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#FCEFE6]/80 dark:bg-[#181411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300 relative overflow-hidden">
          {/* Subtle Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E8672A]/50 to-transparent" />

          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-3xl space-y-3">
                <Badge variant="secondary" size="md">
                  Proven Track Record
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Featured Enterprise Case Studies
                </h2>
                <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
                  Examining how we solve critical architectural bottlenecks, build resilient digital platforms, and scale revenue.
                </p>
              </div>
              <Link href="/case-studies">
                <Button variant="outline" size="md" className="rounded-full px-7 py-3 border-[#EFE2D6] dark:border-[#2C241E] bg-white dark:bg-[#1F1A16] hover:border-[#E8672A]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  All Case Studies
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudiesData.slice(0, 3).map((study, idx) => (
              <ScrollReveal key={study.slug} delay={idx * 0.1} direction="up">
                <CaseStudyCard caseStudy={study} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* 7. HOW WE WORK — 5-STEP STAGGERED PROCESS TIMELINE (Light Neutral Base) */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full" id="process">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#F9F6F0] dark:bg-[#14110E] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <Badge variant="secondary" size="md">
                Engagement Lifecycle
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Our 5-Step Execution Methodology
              </h2>
              <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
                A disciplined, transparent delivery framework that ensures zero surprises and rapid time-to-value.
              </p>
            </div>
          </ScrollReveal>

          <ProcessTimeline />
        </section>
      </div>

      {/* 8. WHAT THEY SAY (TESTIMONIALS - Warm Beige Base + White Testimonial Cards) */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-[#F7EFE6]/80 dark:bg-[#16120F] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300 relative overflow-hidden">
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E8672A]/40 to-transparent" />

          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Client Testimonials
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                What They Say
              </h2>
              <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
                Verified testimonials from CTOs, Founders, and Marketing Heads partnering with Arav Innovations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <TestimonialSlider />
          </ScrollReveal>
        </section>
      </div>

      {/* 9. FINAL CTA SECTION & LEAD FORM (High Impact Warm Gradient Container) */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 w-full" id="contact">
        <section className="py-16 md:py-24 px-6 sm:px-14 lg:px-16 rounded-[2.5rem] bg-gradient-to-br from-[#FFFDF9] via-[#FCEFE6] to-[#F7EFE6] dark:from-[#181411] dark:via-[#16120F] dark:to-[#12100E] border-2 border-[#E8672A]/40 shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Messaging */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal direction="up">
                <Badge variant="secondary" size="md">
                  Get In Touch
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight mt-3 leading-[1.1]">
                  Ready to Transform Your Digital Capabilities?
                </h2>
                <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mt-3">
                  Whether you are modernizing legacy infrastructure, launching an enterprise web application, accelerating B2B demand generation, or augmenting your engineering sprint with senior talent, we are ready to assist.
                </p>

                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-3.5 mt-6 shadow-md">
                  <h4 className="text-base font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                    What Happens Next:
                  </h4>
                  <ul className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0] space-y-2.5">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#E8672A] shrink-0" />
                      <span>Discovery call with a senior practice director within 24 hours</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#E8672A] shrink-0" />
                      <span>Technical scope definition &amp; preliminary milestone roadmap</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#E8672A] shrink-0" />
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
