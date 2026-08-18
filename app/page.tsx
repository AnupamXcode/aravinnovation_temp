import * as React from "react";
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
    "Arav Innovations is a multidisciplinary technology, strategy, digital growth, governance, and staff augmentation firm operating across India and the UAE.",
};

export default function HomePage() {
  const differentiators = [
    {
      title: "Multidisciplinary Engineering Depth",
      description:
        "We combine enterprise cloud architecture, full-stack software development, technical SEO, and regulatory compliance under one cohesive leadership team.",
      icon: <Users className="w-6 h-6 text-[#E8672A]" />,
    },
    {
      title: "Cross-Border India & UAE Presence",
      description:
        "Regional delivery hubs in India and the UAE providing seamless timezone overlap, localized regulatory compliance (DPDP, GDPR, GCC mandates), and cost-effective scaling.",
      icon: <Award className="w-6 h-6 text-[#E8672A]" />,
    },
    {
      title: "Client-Centric, Zero Shelfware",
      description:
        "We reject bloated 200-page theoretical reports. Every audit, strategy sprint, and architecture blueprint is actionable and backed by code-level execution.",
      icon: <Sparkles className="w-6 h-6 text-[#E8672A]" />,
    },
    {
      title: "Rigorous Outcome Verification",
      description:
        "From sub-second page loads and cloud bill reductions to closed-loop B2B pipeline attribution, our deliverables are tied directly to business ROI.",
      icon: <ShieldCheck className="w-6 h-6 text-[#E8672A]" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TRUSTED CLIENTS STRIP (Strict Placeholder Rule) */}
      <section className="py-10 bg-[#FBF3EA] dark:bg-[#161310] border-y border-[#EFE2D6] dark:border-[#2C241E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7A6A5F] dark:text-[#B8ACA0]">
                Trusted By Fast-Growing Enterprises & Industry Leaders Across India & UAE
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-16 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] flex items-center justify-center p-3 text-center transition-all hover:border-[#E8672A]/40 dark:hover:border-[#E8672A]/40 shadow-2xs"
                >
                  <span className="text-[11px] font-mono font-medium text-[#7A6A5F] dark:text-[#B8ACA0]">
                    [LOGO PENDING APPROVAL]
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. WHAT WE DO — 7 DISTINCT SERVICE CARDS */}
      <section className="py-20 md:py-28 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary" size="md">
                  Our 7 Core Practices
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Comprehensive Technology & Growth Services
                </h2>
                <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
                  We go far beyond basic digital marketing. Discover our dedicated engineering, strategic advisory, compliance, and staff augmentation capabilities.
                </p>
              </div>
              <Link href="/services">
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
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
        </div>
      </section>

      {/* 4. WHO WE HELP — INDUSTRY GRID */}
      <section className="py-20 bg-[#FBF3EA] dark:bg-[#161310] border-y border-[#EFE2D6] dark:border-[#2C241E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <TiltCard maxTilt={6} scale={1.02} className="h-full">
                  <div className="h-full rounded-3xl bg-white dark:bg-[#1A1613] p-7 border border-[#EFE2D6] dark:border-[#2C241E] hover:shadow-xl hover:border-[#E8672A]/40 dark:hover:border-[#E8672A]/40 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-[#FCE3D3]/60 dark:bg-[#261F1A] text-[#E8672A] border border-[#F4A97F]/30 dark:border-[#3D332B]">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#FCE3D3]/60 dark:bg-[#261F1A] text-[#3A2E27] dark:text-[#FAF5EE] font-semibold">
                          {ind.statusNote || "[CONFIRMED]"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] mb-2">
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
              <Button variant="secondary" size="md" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Explore Full Industry Solutions Matrix
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY ARAV — 4-TILE DIFFERENTIATOR GRID */}
      <section className="py-20 md:py-28 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Why Partner With Arav
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Engineered for Precision, Speed & Integrity
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                We eliminate the traditional disconnect between high-level management consulting and hands-on technical execution.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full rounded-3xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] p-8 border border-[#EFE2D6] dark:border-[#2C241E] hover:bg-white dark:hover:bg-[#1F1A16] hover:shadow-xl transition-all duration-300 space-y-4">
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-[#261F1A] w-fit border border-[#EFE2D6] dark:border-[#3D332B] shadow-2xs">
                      {diff.icon}
                    </div>
                    <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
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
        </div>
      </section>

      {/* 6. CASE STUDIES / RESULTS PREVIEW */}
      <section className="py-20 bg-[#FBF3EA] dark:bg-[#161310] border-y border-[#EFE2D6] dark:border-[#2C241E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
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
        </div>
      </section>

      {/* 7. HOW WE WORK — 5-STEP STAGGERED PROCESS TIMELINE */}
      <section className="py-20 md:py-28 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-20 bg-[#FBF3EA] dark:bg-[#161310] border-y border-[#EFE2D6] dark:border-[#2C241E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge variant="secondary" size="md">
                Client Feedback
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                What Enterprise Leaders Say About Arav
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                Verified testimonials from CTOs, Engineering Heads, and Growth Directors across India and the GCC.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <TestimonialSlider />
          </ScrollReveal>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION & LEAD FORM */}
      <section className="py-20 md:py-28 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      <span>Technical scope definition & preliminary milestone roadmap</span>
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
        </div>
      </section>
    </div>
  );
}
