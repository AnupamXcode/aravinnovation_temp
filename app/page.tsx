import * as React from "react";
import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { TestimonialSlider } from "@/components/testimonials/TestimonialSlider";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Lightbulb,
  Workflow,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "Arav Innovations | Enterprise IT Strategy, Software Engineering & Growth",
  description:
    "Arav Innovations is a multidisciplinary technology, strategy, digital growth, governance, and staff augmentation firm operating across India and the UAE.",
};

export default function HomePage() {
  const steps = [
    {
      step: "01",
      title: "Understand & Discover",
      description:
        "Deep-dive technical, business, and operational audits to uncover root bottlenecks, technical debt, and market opportunities.",
      icon: <Lightbulb className="w-5 h-5 text-[#E8672A]" />,
    },
    {
      step: "02",
      title: "Strategize & Architect",
      description:
        "Formulate precise architectural blueprints, technology roadmaps, and commercial go-to-market strategies aligned with measurable KPIs.",
      icon: <Workflow className="w-5 h-5 text-[#E8672A]" />,
    },
    {
      step: "03",
      title: "Implement & Engineer",
      description:
        "High-velocity agile execution using modern stacks (Next.js, Cloud-Native, React Native) and vetted full-stack engineering pods.",
      icon: <Zap className="w-5 h-5 text-[#E8672A]" />,
    },
    {
      step: "04",
      title: "Optimize & Secure",
      description:
        "Continuous performance tuning, Core Web Vitals remediation, data privacy compliance (DPDP/SOC-2), and conversion rate optimization.",
      icon: <ShieldCheck className="w-5 h-5 text-[#E8672A]" />,
    },
    {
      step: "05",
      title: "Deliver Measurable Results",
      description:
        "Rigorous verification, post-launch observability, SLA-backed maintenance, and long-term capability transfer to internal teams.",
      icon: <CheckCircle className="w-5 h-5 text-[#E8672A]" />,
    },
  ];

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

      {/* 2. TRUSTED CLIENTS STRIP (Strict Section 9 Placeholder Rule) */}
      <section className="py-10 bg-[#FBF3EA] border-y border-[#EFE2D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7A6A5F]">
              Trusted By Fast-Growing Enterprises & Industry Leaders Across India & UAE
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-16 rounded-xl bg-white border border-[#EFE2D6] flex items-center justify-center p-3 text-center transition-all hover:border-[#E8672A]/40 shadow-2xs"
              >
                <span className="text-[11px] font-mono font-medium text-[#7A6A5F]">
                  [LOGO PENDING APPROVAL]
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO — 7 DISTINCT SERVICE CARDS */}
      <section className="py-20 md:py-28 bg-[#FFFDF9]" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl space-y-3">
              <Badge variant="secondary" size="md">
                Our 7 Core Practices
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27]">
                Comprehensive Technology & Growth Services
              </h2>
              <p className="text-base text-[#7A6A5F]">
                We go far beyond basic digital marketing. Discover our dedicated engineering, strategic advisory, compliance, and staff augmentation capabilities.
              </p>
            </div>
            <Link href="/services">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Practices
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                featured={index === 0 || index === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO WE HELP — INDUSTRY GRID */}
      <section className="py-20 bg-[#FBF3EA] border-y border-[#EFE2D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Industry Verticals
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27]">
              Tailored Frameworks for High-Growth Sectors
            </h2>
            <p className="text-sm text-[#7A6A5F]">
              Specialized domain expertise addressing strict data sovereignty, high transaction concurrency, and vertical market dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industriesData.map((ind) => (
              <div
                key={ind.slug}
                className="rounded-2xl bg-white p-6 border border-[#EFE2D6] hover:shadow-lg hover:border-[#E8672A]/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold font-display text-[#3A2E27]">
                    {ind.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FCE3D3]/60 text-[#3A2E27] font-semibold">
                    {ind.statusNote || "[CONFIRMED]"}
                  </span>
                </div>
                <p className="text-xs text-[#7A6A5F] leading-relaxed mb-4">
                  {ind.description}
                </p>
                <div className="space-y-1.5 pt-3 border-t border-[#EFE2D6]">
                  {ind.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#3A2E27]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8672A]" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
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
      <section className="py-20 md:py-28 bg-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Why Partner With Arav
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27]">
              Engineered for Precision, Speed & Integrity
            </h2>
            <p className="text-sm text-[#7A6A5F]">
              We eliminate the traditional disconnect between high-level management consulting and hands-on technical execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <div
                key={index}
                className="rounded-3xl bg-[#FBF3EA]/60 p-8 border border-[#EFE2D6] hover:bg-white hover:shadow-xl transition-all duration-200 space-y-4"
              >
                <div className="p-3.5 rounded-2xl bg-white w-fit border border-[#EFE2D6] shadow-2xs">
                  {diff.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-[#3A2E27]">
                  {diff.title}
                </h3>
                <p className="text-sm text-[#7A6A5F] leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CASE STUDIES / RESULTS PREVIEW (3 Cards) */}
      <section className="py-20 bg-[#FBF3EA] border-y border-[#EFE2D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl space-y-3">
              <Badge variant="secondary" size="md">
                Proven Track Record
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27]">
                Featured Enterprise Case Studies
              </h2>
              <p className="text-sm text-[#7A6A5F]">
                Examining how we solve critical architectural bottlenecks, build resilient digital platforms, and scale revenue.
              </p>
            </div>
            <Link href="/case-studies">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                All Case Studies
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudiesData.slice(0, 3).map((study) => (
              <CaseStudyCard key={study.slug} caseStudy={study} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW WE WORK — 5-STEP PROCESS */}
      <section className="py-20 md:py-28 bg-[#FFFDF9]" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="secondary" size="md">
              Engagement Lifecycle
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27]">
              Our 5-Step Execution Methodology
            </h2>
            <p className="text-sm text-[#7A6A5F]">
              A disciplined, transparent delivery framework that ensures zero surprises and rapid time-to-value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {steps.map((step, idx) => (
              <div
                key={step.step}
                className="relative rounded-2xl bg-white p-6 border border-[#EFE2D6] shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-[#E8672A]">
                      {step.step}
                    </span>
                    <div className="p-2 rounded-lg bg-[#FCE3D3]/50">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold font-display text-[#3A2E27] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#7A6A5F] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-[#E8672A]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-20 bg-[#FBF3EA] border-y border-[#EFE2D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Client Feedback
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27]">
              What Enterprise Leaders Say About Arav
            </h2>
            <p className="text-sm text-[#7A6A5F]">
              Verified testimonials from CTOs, Engineering Heads, and Growth Directors across India and the GCC.
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* 9. FINAL CTA SECTION & LEAD FORM */}
      <section className="py-20 md:py-28 bg-[#FFFDF9]" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Messaging */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="secondary" size="md">
                Get In Touch
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] tracking-tight">
                Ready to Transform Your Digital Capabilities?
              </h2>
              <p className="text-base text-[#7A6A5F] leading-relaxed">
                Whether you are modernizing legacy infrastructure, launching an enterprise web application, accelerating B2B demand generation, or augmenting your engineering sprint with senior talent, we are ready to assist.
              </p>

              <div className="p-6 rounded-2xl bg-[#FBF3EA] border border-[#EFE2D6] space-y-3">
                <h4 className="text-sm font-bold text-[#3A2E27]">
                  What Happens Next:
                </h4>
                <ul className="text-xs text-[#7A6A5F] space-y-2">
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
            </div>

            {/* Right Col: Interactive Lead Form */}
            <div className="lg:col-span-7">
              <LeadForm source="homepage_final_cta" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
