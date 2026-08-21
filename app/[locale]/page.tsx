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

export const metadata = {
  title: "Arav Innovations | Enterprise IT Strategy, Software Engineering & Growth",
  description:
    "Arav Innovations is a multidisciplinary technology, strategy, digital growth, governance, and staff augmentation firm operating globally.",
  alternates: {
    canonical: "https://aravinnovations.com",
  },
  openGraph: {
    title: "Arav Innovations | Enterprise IT Strategy, Software Engineering & Growth",
    description:
      "Enterprise IT Strategy, Full-Stack Software Engineering, Performance Marketing, Governance, and Staff Augmentation globally.",
    url: "https://aravinnovations.com",
    siteName: "Arav Innovations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arav Innovations | Enterprise IT Strategy, Software Engineering & Growth",
    description:
      "Enterprise IT Strategy, Full-Stack Software Engineering, Performance Marketing, Governance, and Staff Augmentation globally.",
  },
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const differentiators = [
    {
      title: "Multidisciplinary Engineering Depth",
      description:
        "We combine enterprise cloud architecture, full-stack software development, technical SEO, and regulatory compliance under one cohesive leadership team.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Global Footprint, Cross-Border Hubs",
      description:
        "Seamless delivery through hubs in India and the UAE with localized regulatory compliance (DPDP, GDPR, GCC mandates) and cost-effective scaling for clients worldwide.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Client-Centric, Zero Shelfware",
      description:
        "We reject bloated 200-page theoretical reports. Every audit, strategy sprint, and architecture blueprint is actionable and backed by code-level execution.",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: "Rigorous Outcome Verification",
      description:
        "From sub-second page loads and cloud bill reductions to closed-loop B2B pipeline attribution, our deliverables are tied directly to business ROI.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#FAF5EE] dark:bg-[#0E0C0A] space-y-6 pb-12">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TRUSTED CLIENTS MOVING STRIP (Task H) */}
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <section className="py-8 px-6 sm:px-10 rounded-[2.5rem] bg-white dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="text-center mb-4">
              <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#7A6A5F] dark:text-[#B8ACA0]">
                Trusted By Fast-Growing Enterprises &amp; Industry Leaders Globally
              </span>
            </div>
            <MovingLogoStrip />
          </ScrollReveal>
        </section>
      </div>

      {/* 3. WHAT WE DO — 7 DISTINCT SERVICE CARDS (Full-Bleed Rounded Container) */}
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full" id="services">
        <section className="py-16 md:py-24 px-6 sm:px-12 rounded-[2.5rem] bg-[#FFFDF9] dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" size="md">
                  Our 7 Core Practices
                </Badge>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
                  Comprehensive Technology &amp; Growth Services
                </h2>
                <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
                  We go far beyond basic digital marketing. Discover our dedicated engineering, strategic advisory, compliance, and staff augmentation capabilities.
                </p>
              </div>
              <Link href="/services">
                <Button variant="outline" size="md" className="rounded-full px-6 border-[#EFE2D6] dark:border-[#2C241E] hover:border-[#E8672A]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View All Practices
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesData.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 0.08} direction="up">
                <ServiceCard
                  service={service}
                  featured={index === 0 || index === 1}
                />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* 4. WHO WE HELP — INDUSTRY GRID */}
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-12 rounded-[2.5rem] bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Industry Verticals
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Tailored Frameworks for High-Growth Sectors
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                Specialized domain expertise addressing strict data sovereignty, high transaction concurrency, and vertical market dynamics.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industriesData.map((ind, idx) => (
              <ScrollReveal key={ind.slug} delay={idx * 0.08} direction="up">
                <TiltCard maxTilt={6} scale={1.02} className="h-full group">
                  <div className="h-full rounded-[2rem] bg-white dark:bg-[#1A1613] p-7 border border-[#EFE2D6] dark:border-[#2C241E] hover:shadow-xl hover:border-[#E8672A]/40 dark:hover:border-[#E8672A]/40 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl icon-box-hover shadow-xs">
                          <Building2 className="w-5 h-5 text-[#E8672A]" />
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#FCE3D3]/60 dark:bg-[#261F1A] text-[#3A2E27] dark:text-[#FAF5EE] font-semibold border border-[#EFE2D6] dark:border-[#2C241E]">
                          {ind.statusNote || "[CONFIRMED]"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors mb-2">
                        {ind.name}
                      </h3>
                      <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mb-4">
                        {ind.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                      {ind.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#3A2E27] dark:text-[#FAF5EE]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8672A]" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/solutions">
              <Button variant="secondary" size="md" className="rounded-full px-6" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Explore Full Industry Solutions Matrix
              </Button>
            </Link>
          </div>
        </section>
      </div>

      {/* 5. WHY ARAV — 4-TILE DIFFERENTIATOR GRID */}
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-12 rounded-[2.5rem] bg-[#FFFDF9] dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Why Partner With Arav
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Engineered for Precision, Speed &amp; Integrity
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                We eliminate the traditional disconnect between high-level management consulting and hands-on technical execution.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <TiltCard maxTilt={5} scale={1.01} className="h-full group">
                  <div className="h-full rounded-[2rem] bg-[#FBF3EA]/60 dark:bg-[#1A1613] p-8 border border-[#EFE2D6] dark:border-[#2C241E] hover:bg-white dark:hover:bg-[#1F1A16] hover:shadow-xl transition-all duration-300 space-y-4">
                    <div className="p-3.5 rounded-2xl icon-box-hover w-fit shadow-xs text-[#E8672A]">
                      {diff.icon}
                    </div>
                    <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* 6. CASE STUDIES / RESULTS PREVIEW */}
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-12 rounded-[2.5rem] bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" size="md">
                  Proven Track Record
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Featured Enterprise Case Studies
                </h2>
                <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                  Examining how we solve critical architectural bottlenecks, build resilient digital platforms, and scale revenue.
                </p>
              </div>
              <Link href="/case-studies">
                <Button variant="outline" size="md" className="rounded-full px-6 border-[#EFE2D6] dark:border-[#2C241E] hover:border-[#E8672A]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  All Case Studies
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudiesData.slice(0, 3).map((study, idx) => (
              <ScrollReveal key={study.slug} delay={idx * 0.1} direction="up">
                <CaseStudyCard caseStudy={study} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* 7. HOW WE WORK — 5-STEP STAGGERED PROCESS TIMELINE */}
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full" id="process">
        <section className="py-16 md:py-24 px-6 sm:px-12 rounded-[2.5rem] bg-[#FFFDF9] dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <Badge variant="secondary" size="md">
                Engagement Lifecycle
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Our 5-Step Execution Methodology
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                A disciplined, transparent delivery framework that ensures zero surprises and rapid time-to-value.
              </p>
            </div>
          </ScrollReveal>

          <ProcessTimeline />
        </section>
      </div>

      {/* 8. WHAT THEY SAY (TESTIMONIALS) */}
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <section className="py-16 md:py-24 px-6 sm:px-12 rounded-[2.5rem] bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Client Testimonials
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                What They Say
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                Verified testimonials from CTOs, Founders, and Marketing Heads partnering with Arav Innovations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <TestimonialSlider />
          </ScrollReveal>
        </section>
      </div>

      {/* 9. FINAL CTA SECTION & LEAD FORM */}
      <div className="max-w-7xl lg:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full" id="contact">
        <section className="py-16 md:py-24 px-6 sm:px-12 rounded-[2.5rem] bg-[#FFFDF9] dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Messaging */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal direction="up">
                <Badge variant="secondary" size="md">
                  Get In Touch
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight mt-3">
                  Ready to Transform Your Digital Capabilities?
                </h2>
                <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mt-3">
                  Whether you are modernizing legacy infrastructure, launching an enterprise web application, accelerating B2B demand generation, or augmenting your engineering sprint with senior talent, we are ready to assist.
                </p>

                <div className="p-6 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-3 mt-6">
                  <h4 className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                    What Happens Next:
                  </h4>
                  <ul className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#E8672A]" />
                      <span>Discovery call with a senior practice director within 24 hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#E8672A]" />
                      <span>Technical scope definition &amp; preliminary milestone roadmap</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#E8672A]" />
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
