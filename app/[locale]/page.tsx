import * as React from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
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
import { caseStudiesData } from "@/data/case-studies";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Award,
  CheckCircle,
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

  const tBeforeAfter = await getTranslations("BeforeAfter");
  const tServices = await getTranslations("Services");
  const tCaseStudies = await getTranslations("CaseStudies");
  const tWhyArav = await getTranslations("WhyArav");
  const tMethodology = await getTranslations("Methodology");
  const tTestimonials = await getTranslations("Testimonials");
  const tFinalCta = await getTranslations("FinalCta");
  const tMovingLogo = await getTranslations("MovingLogo");

  const differentiators = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: tWhyArav("diff1Title"),
      description: tWhyArav("diff1Desc"),
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: tWhyArav("diff2Title"),
      description: tWhyArav("diff2Desc"),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: tWhyArav("diff3Title"),
      description: tWhyArav("diff3Desc"),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: tWhyArav("diff4Title"),
      description: tWhyArav("diff4Desc"),
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
              {tMovingLogo("heading")}
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
                {tBeforeAfter("badge")}
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                {tBeforeAfter("title")}
              </h2>
              <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4]">
                {tBeforeAfter("description")}
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
                  {tServices("badge")}
                </Badge>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-[1.1]">
                  {tServices("title")}
                </h2>
                <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4]">
                  {tServices("description")}
                </p>
              </div>
              <Link href={`/${locale}/services`}>
                <Button variant="outline" size="md" className="rounded-full px-7 py-3 border-[#f7d7b0] dark:border-[#253630] bg-white dark:bg-[#172420] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {tServices("viewAll")}
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
                  {tCaseStudies("badge")}
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {tCaseStudies("title")}
                </h2>
                <p className="text-base text-[#4a5c55] dark:text-[#d3eee4]">
                  {tCaseStudies("description")}
                </p>
              </div>
              <Link href={`/${locale}/case-studies`}>
                <Button variant="outline" size="md" className="rounded-full px-7 py-3 border-[#f7d7b0] dark:border-[#253630] bg-white dark:bg-[#172420] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {tCaseStudies("viewAll")}
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
                {tTestimonials("badge")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {tTestimonials("title")}
              </h2>
              <p className="text-base text-[#4a5c55] dark:text-[#d3eee4]">
                {tTestimonials("description")}
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
                {tWhyArav("badge")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {tWhyArav("title")}
              </h2>
              <p className="text-base text-[#4a5c55] dark:text-[#d3eee4]">
                {tWhyArav("description")}
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
                {tMethodology("badge")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {tMethodology("title")}
              </h2>
              <p className="text-base text-[#4a5c55] dark:text-[#d3eee4]">
                {tMethodology("description")}
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
                  {tFinalCta("badge")}
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight mt-3 leading-[1.1]">
                  {tFinalCta("title")}
                </h2>
                <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed mt-3">
                  {tFinalCta("description")}
                </p>

                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#22312b] border border-[#f7d7b0] dark:border-[#31473f] space-y-3.5 mt-6 shadow-md">
                  <h4 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {tFinalCta("nextTitle")}
                  </h4>
                  <ul className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] space-y-2.5">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>{tFinalCta("nextStep1")}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>{tFinalCta("nextStep2")}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>{tFinalCta("nextStep3")}</span>
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
