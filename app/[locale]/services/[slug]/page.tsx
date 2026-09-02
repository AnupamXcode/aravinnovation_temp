import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import { getBlogPosts } from "@/lib/cms";
import { caseStudiesData } from "@/data/case-studies";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { LeadForm } from "@/components/forms/LeadForm";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from "@/components/seo/StructuredData";
import { ServiceMaintenanceBanner } from "@/components/services/ServiceMaintenanceBanner";
import { ITStrategyInteractivePage } from "@/components/services/ITStrategyInteractivePage";
import { DigitalMarketingInteractivePage } from "@/components/services/DigitalMarketingInteractivePage";
import { WebDevInteractivePage } from "@/components/services/WebDevInteractivePage";
import { RiskGovInteractivePage } from "@/components/services/RiskGovInteractivePage";
import { AuditInteractivePage } from "@/components/services/AuditInteractivePage";
import { TrainingStaffInteractivePage } from "@/components/services/TrainingStaffInteractivePage";
import { SEOInteractivePage } from "@/components/services/SEOInteractivePage";
import { AIPortfolioInteractivePage } from "@/components/services/AIPortfolioInteractivePage";
import {
  Compass,
  Code2,
  TrendingUp,
  Search,
  ShieldCheck,
  BarChart3,
  Users2,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Briefcase,
  Cpu,
  Sparkles,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Practice Not Found",
    };
  }

  const url = `https://aravinnovations.com/services/${slug}`;

  return {
    title: `${service.title} | Arav Innovations`,
    description: service.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.title} | Arav Innovations`,
      description: service.description,
      url,
      siteName: "Arav Innovations",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Arav Innovations`,
      description: service.description,
    },
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-8 h-8 transition-colors duration-300" />,
  Code2: <Code2 className="w-8 h-8 transition-colors duration-300" />,
  TrendingUp: <TrendingUp className="w-8 h-8 transition-colors duration-300" />,
  Search: <Search className="w-8 h-8 transition-colors duration-300" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 transition-colors duration-300" />,
  BarChart3: <BarChart3 className="w-8 h-8 transition-colors duration-300" />,
  Users2: <Users2 className="w-8 h-8 transition-colors duration-300" />,
  Cpu: <Cpu className="w-8 h-8 transition-colors duration-300" />,
  Sparkles: <Sparkles className="w-8 h-8 transition-colors duration-300" />,
};

export default async function DynamicServicePage({ params }: ServicePageProps) {
  const { slug, locale } = (await params) as any;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const allPosts = await getBlogPosts(locale);
  const relatedPosts = allPosts.slice(0, 3);

  // Render Immersive IT Strategy Interactive Page for IT Strategy Slugs
  if (service.slug === "it-strategy-implementation" || slug === "it-strategy-consulting" || slug === "itstrategy") {
    return <ITStrategyInteractivePage service={service} relatedPosts={relatedPosts} />;
  }

  // Render Immersive Digital Marketing Interactive Page for Digital Marketing Slugs
  if (service.slug === "digital-marketing-brand-development" || slug === "digitalmarketing" || slug === "digital-marketing") {
    return <DigitalMarketingInteractivePage service={service} relatedPosts={relatedPosts} />;
  }

  // Render Immersive Web Development Interactive Page for Web Development Slugs
  if (service.slug === "web-app-development" || slug === "webdevelopment" || slug === "web-development" || slug === "web-application-development") {
    return <WebDevInteractivePage service={service} relatedPosts={relatedPosts} />;
  }

  // Render Immersive Risk & Governance Interactive Page for Risk & Governance Slugs
  if (service.slug === "risk-compliance-governance" || slug === "riskandgovernance" || slug === "risk-governance" || slug === "risk-governance-compliance") {
    return <RiskGovInteractivePage service={service} />;
  }

  // Render Immersive Audit & Improvement Interactive Page for Audit Slugs
  if (service.slug === "audit-improvement" || service.slug === "audit-and-improvement" || slug === "audit" || slug === "audit-improvement" || slug === "audit-and-improvement") {
    return <AuditInteractivePage service={service} />;
  }

  // Render Immersive Training & Staff Augmentation Interactive Page for Training & Staff Slugs
  if (service.slug === "training-staff-augmentation" || slug === "trainingandstaff" || slug === "training-staff") {
    return <TrainingStaffInteractivePage service={service} />;
  }

  // Render Immersive SEO Interactive Page for SEO Slugs
  if (service.slug === "seo-services" || slug === "seo" || slug === "seo-services") {
    return <SEOInteractivePage service={service} />;
  }

  // Render Immersive AI Portfolio Interactive Page for AI Slugs
  if (service.slug === "ai-portfolio" || slug === "ai-solutions" || slug === "ai-portfolio") {
    return <AIPortfolioInteractivePage service={service} />;
  }

  // Find related case study
  const relatedCaseStudy = caseStudiesData.find(
    (c) =>
      service.relatedCaseStudySlugs.includes(c.slug) ||
      c.serviceSlug === service.slug
  );

  return (
    <div className="pt-4 sm:pt-8 pb-12 sm:pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
      <BreadcrumbSchema
        items={[
          { name: "Services", url: "/services" },
          { name: service.shortTitle, url: `/services/${service.slug}` },
        ]}
      />
      <ServiceSchema
        name={service.title}
        description={service.description}
        url={`https://aravinnovations.com/services/${service.slug}`}
        category={service.eyebrow}
      />
      <FAQSchema faqs={service.faqs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
        {/* 1. SERVICE HERO SECTION */}
        <section className="space-y-6">
          <ScrollReveal direction="up">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: service.shortTitle },
              ]}
            />
          </ScrollReveal>

          <ServiceMaintenanceBanner slug={service.slug} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-8 space-y-6">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="inline-flex items-center gap-2">
                  <Badge variant="secondary" size="md">
                    {service.eyebrow}
                  </Badge>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight leading-[1.1] mt-3">
                  {service.title}
                </h1>

                <p className="text-xl font-medium text-[#f15e1c] font-display mt-2">
                  {service.tagline}
                </p>

                <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0] max-w-2xl leading-relaxed mt-2">
                  {service.description}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <a href="#inquire" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto shadow-md hover:shadow-xl hover:shadow-[#f15e1c]/25"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Inquire About {service.shortTitle}
                    </Button>
                  </a>
                  <Link href="/case-studies" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      View Verified Case Studies
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Feature Card */}
            <div className="lg:col-span-4">
              <ScrollReveal direction="left" delay={0.2}>
                <TiltCard maxTilt={5} className="group">
                  <div className="rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] p-8 border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-6">
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#000000] w-fit border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-2xs group-hover:bg-[#f15e1c] group-hover:text-white transition-all duration-300 [&>svg]:text-[#f15e1c] [&>svg]:group-hover:text-white [&>svg]:transition-colors [&>svg]:duration-300">
                      {iconMap[service.icon]}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                        Practice Highlights
                      </h3>
                      <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-1">
                        Specialized delivery squads active across India and the United Arab Emirates.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-[#EFE2D6] dark:border-[#1f1f1f] text-xs">
                      <div className="flex items-center gap-2 font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                        <CheckCircle2 className="w-4 h-4 text-[#f15e1c]" />
                        <span>Cross-Border Regulatory Compliance</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                        <CheckCircle2 className="w-4 h-4 text-[#f15e1c]" />
                        <span>Dedicated Technical Lead & SLA</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                        <CheckCircle2 className="w-4 h-4 text-[#f15e1c]" />
                        <span>100% Client IP & Codebase Ownership</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 2. BUSINESS PROBLEM & PAIN POINTS */}
        <ScrollReveal direction="up">
          <section className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] p-8 sm:p-12 border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm">
            <div className="max-w-3xl space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f15e1c]">
                <AlertTriangle className="w-4 h-4" />
                <span>The Core Challenge</span>
              </div>
              <h2 className="text-3xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                {service.businessProblem.title}
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                {service.businessProblem.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.businessProblem.painPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[#f15e1c] mt-2 shrink-0" />
                  <span className="text-sm text-[#3A2E27] dark:text-[#FAF5EE] font-medium leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 3. OUR SOLUTION & KEY PILLARS */}
        <section className="space-y-12">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                Engineered Approach
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                {service.ourSolution.title}
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                {service.ourSolution.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.ourSolution.keyPillars.map((pillar, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} direction="up">
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full rounded-3xl bg-white dark:bg-[#000000] p-8 border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm hover:shadow-xl hover:border-[#f15e1c]/40 transition-all duration-300 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#FCE3D3]/60 dark:bg-[#161616] text-[#f15e1c] flex items-center justify-center font-mono font-bold border border-[#F4A97F]/30 dark:border-[#262626]">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 4. CAPABILITIES BREAKDOWN */}
        <ScrollReveal direction="up">
          <section className="rounded-3xl bg-[#FFFDF9] dark:bg-[#000000] p-8 sm:p-12 border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm">
            <div className="max-w-2xl space-y-3 mb-10">
              <Badge variant="secondary" size="md">
                Full Scope
              </Badge>
              <h2 className="text-3xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Capabilities & Deliverables
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                Specific workstreams managed by our {service.shortTitle} team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.capabilities.map((cap, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-base font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] pb-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                    {cap.category}
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {cap.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-[#FBF3EA]/60 dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#f15e1c] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 5. PROCESS SECTION */}
        <section className="space-y-12">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                Execution Roadmap
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                How We Deliver {service.shortTitle}
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                A milestone-driven process designed for transparency and tangible artifacts.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {service.process.map((step, idx) => (
              <ScrollReveal key={step.step} delay={idx * 0.08} direction="up">
                <TiltCard maxTilt={6} scale={1.02} className="h-full">
                  <div className="h-full rounded-3xl bg-white dark:bg-[#000000] p-6 border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-[#f15e1c] mb-3">
                        STEP 0{step.step}
                      </div>
                      <h3 className="text-base font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mb-4">
                        {step.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
                      <span className="text-[10px] uppercase font-bold text-[#7A6A5F] dark:text-[#B8ACA0] block">
                        Deliverable:
                      </span>
                      <span className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] mt-0.5 block">
                        {step.deliverable}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 6. TECHNOLOGY STACK & EXPERTISE */}
        <ScrollReveal direction="up">
          <section className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] p-8 sm:p-12 border border-[#EFE2D6] dark:border-[#1f1f1f]">
            <div className="max-w-2xl space-y-3 mb-10">
              <Badge variant="secondary" size="md">
                Technology Ecosystem
              </Badge>
              <h2 className="text-3xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Tools, Platforms & Frameworks
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                Enterprise-grade tooling vetted for security, scalability, and long-term maintainability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.technologies.map((tech, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE]">
                    {tech.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.stack.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] shadow-2xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 7. ENGAGEMENT MODELS */}
        <section className="space-y-10">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                Engagement Models
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Transparent Collaboration Models
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                Flexible commercial structures tailored to your internal technical leadership and scaling phase.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {service.engagementModels.map((model, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} direction="up">
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full rounded-3xl bg-white dark:bg-[#000000] p-8 border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm hover:shadow-xl hover:border-[#f15e1c]/40 transition-all flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#FCE3D3]/60 dark:bg-[#161616] w-fit text-[#f15e1c] border border-[#F4A97F]/30 dark:border-[#262626]">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                        {model.title}
                      </h3>
                      <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                        {model.description}
                      </p>
                      <div className="p-3 rounded-xl bg-[#FBF3EA] dark:bg-[#0a0a0a] text-xs text-[#3A2E27] dark:text-[#FAF5EE] font-medium border border-[#EFE2D6] dark:border-[#1f1f1f]">
                        <span className="font-bold text-[#f15e1c]">Best for: </span>
                        {model.bestFor}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
                      <a href="#inquire">
                        <Button variant="primary" size="md" className="w-full justify-center">
                          {model.ctaText || "Inquire About Model"}
                        </Button>
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 8. FEATURED CASE STUDY (IF APPLICABLE) */}
        {relatedCaseStudy && (
          <ScrollReveal direction="up">
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary" size="md">
                    Case Study
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] mt-2">
                    See This Practice in Action
                  </h2>
                </div>
                <Link href="/case-studies">
                  <Button variant="outline" size="sm">
                    All Case Studies
                  </Button>
                </Link>
              </div>

              <CaseStudyCard caseStudy={relatedCaseStudy} />
            </section>
          </ScrollReveal>
        )}

        {/* 9. FREQUENTLY ASKED QUESTIONS */}
        {service.faqs && service.faqs.length > 0 && (
          <ScrollReveal direction="up">
            <section className="space-y-8 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <Badge variant="secondary" size="md">
                  FAQ
                </Badge>
                <h2 className="text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion items={service.faqs} />
            </section>
          </ScrollReveal>
        )}

        {/* 10. DEDICATED PRE-FILLED LEAD FORM CTA */}
        <section className="pt-8" id="inquire">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal direction="up">
                <Badge variant="secondary" size="md">
                  Get Started
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight mt-3">
                  Discuss Your {service.shortTitle} Requirement
                </h2>
                <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed mt-3">
                  Connect with our dedicated practice lead. We will review your current technical environment, define key milestones, and propose an actionable engagement plan.
                </p>
                <div className="p-5 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] text-xs text-[#7A6A5F] dark:text-[#B8ACA0] space-y-2 mt-6">
                  <div className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">What to Expect:</div>
                  <p>&bull; 30-minute scoping discussion with a senior technical consultant</p>
                  <p>&bull; Preliminary capability fit & milestone estimation within 48h</p>
                  <p>&bull; Direct NDA protection for all shared code and documentation</p>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7">
              <ScrollReveal direction="left" delay={0.2}>
                <LeadForm initialService={service.title} source={`service_page_${service.slug}`} />
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
