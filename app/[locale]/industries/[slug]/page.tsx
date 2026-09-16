import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { getIndustryBySlug, getAllIndustrySlugs, industriesData } from "@/data/industries";
import {
  Building2,
  Cpu,
  HeartPulse,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Factory,
  Home,
  Truck,
  Rocket,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  ShieldCheck,
  ChevronRight,
  Code2,
  Lock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Cpu,
  HeartPulse,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Factory,
  Home,
  Truck,
  Rocket,
};

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllIndustrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const industry = getIndustryBySlug(resolvedParams.slug);

  if (!industry) {
    return { title: "Industry Solution Not Found | Arav Innovations" };
  }

  return {
    title: `${industry.name} Technology & Digital Solutions | Arav Innovations`,
    description: industry.description,
    openGraph: {
      title: `${industry.name} Technology & Digital Solutions | Arav Innovations`,
      description: industry.description,
      url: `https://aravinnovations.com/industries/${industry.slug}`,
      siteName: "Arav Innovations",
      type: "website",
    },
    alternates: {
      canonical: `https://aravinnovations.com/industries/${industry.slug}`,
    },
  };
}

export default async function DynamicIndustryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const industry = getIndustryBySlug(resolvedParams.slug);

  if (!industry) {
    notFound();
  }

  const IconComponent = iconMap[industry.icon] || Building2;

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
      <BreadcrumbSchema
        items={[
          { name: "Industries", url: "/industries" },
          { name: industry.name, url: `/industries/${industry.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* HERO SECTION */}
        <div className="space-y-4 max-w-4xl">
          <ScrollReveal direction="up">
            <Breadcrumb
              items={[
                { label: "Industries", href: "/industries" },
                { label: industry.name },
              ]}
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" size="md">
                SECTOR SPECIFIC SOLUTIONS
              </Badge>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#f15e1c]/10 text-[#f15e1c] border border-[#f15e1c]/30 shrink-0">
                <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-tight">
                {industry.name}
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
              {industry.description}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="md"
                  className="bg-[#f15e1c] hover:bg-[#d8480d] text-white min-h-[44px]"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {industry.ctaText || "Book a Free Consultation"}
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="md"
                  className="border-[#f7d7b0] dark:border-[#262626] text-[#1b2823] dark:text-[#ffffff] min-h-[44px]"
                >
                  Explore Core Services
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* SECTION 1: SECTOR CHALLENGES VS ARAV DELIVERY APPROACH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Business Challenges */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1f1f1f] space-y-4 shadow-sm">
              <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1b2823] dark:text-[#ffffff]">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <span>Common Business &amp; Technical Challenges</span>
              </div>
              <ul className="space-y-3 pt-1">
                {industry.challenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-[#f15e1c] shrink-0 mt-0.5" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* How Arav Can Support */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#2e936f]/10 dark:bg-[#2e936f]/15 border border-[#2e936f]/30 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1b2823] dark:text-[#ffffff]">
                  <div className="p-2.5 rounded-xl bg-[#2e936f]/20 text-[#2e936f] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span>How Arav Solves These Bottlenecks</span>
                </div>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                  {industry.aravApproach}
                </p>
              </div>

              <div className="pt-3 border-t border-[#2e936f]/30">
                <span className="text-xs font-mono font-bold text-[#2e936f] uppercase tracking-wider block mb-1">
                  Expected Business Outcome
                </span>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                  <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                  <span>{industry.expectedOutcome}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* SECTION 2: RELEVANT CAPABILITIES & RECOMMENDED TECH */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1f1f1f] space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                Capabilities &amp; Tech Stack
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                Relevant Engineering &amp; Growth Capabilities
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff] mb-3">
                  Core Practice Areas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {industry.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-2 rounded-xl bg-[#fefaf5] dark:bg-[#161616] text-[#1b2823] dark:text-[#ffffff] text-xs sm:text-sm font-semibold border border-[#f7d7b0]/80 dark:border-[#1f1f1f] flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-[#f15e1c]" />
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff] mb-3">
                  Recommended Technology Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {industry.recommendedTech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-2 rounded-xl bg-[#fefaf5] dark:bg-[#111111] text-[#4a5c55] dark:text-[#d3eee4] text-xs sm:text-sm font-mono border border-[#f7d7b0]/80 dark:border-[#1f1f1f]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 3: EVIDENCE & METHODOLOGY */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#fefaf5] via-white to-[#fefaf5] dark:from-[#0c0c0c] dark:via-[#121212] dark:to-[#0c0c0c] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md space-y-6">
          <div className="space-y-1">
            <Badge variant="secondary" size="md">
              VERIFIED METHODOLOGY
            </Badge>
            <h3 className="text-xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Evidence &amp; Delivery Framework
            </h3>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              How we guarantee security, performance, and transparency for {industry.name} engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0]/80 dark:border-[#262626] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm sm:text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                100% IP &amp; Code Ownership
              </h4>
              <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                Direct commits to your internal repositories with clean TypeScript pipelines.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0]/80 dark:border-[#262626] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#2e936f]/10 text-[#2e936f] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm sm:text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                Governance Guardrails
              </h4>
              <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                DPDP Act, ISO 27001, and SOC-2 audit compliance built directly into the system.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0]/80 dark:border-[#262626] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#fab60a]/10 text-[#fab60a] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-sm sm:text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                SLA &amp; Subsecond Loading
              </h4>
              <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                Sub-second edge rendering and dedicated engineering support pods.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: CONSULTATION CALL TO ACTION */}
        <div className="p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#f15e1c] to-[#d8480d] text-white space-y-4 text-center max-w-4xl mx-auto shadow-xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
            Ready to Accelerate Your {industry.name} Technology Goals?
          </h3>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
            Schedule a technical consultation with our engineering and growth directors to review your system architecture, compliance requirements, or expansion goals.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#f15e1c] hover:bg-[#fefaf5] font-bold min-h-[48px] px-8"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book a Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
