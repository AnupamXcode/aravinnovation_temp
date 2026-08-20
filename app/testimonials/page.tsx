import * as React from "react";
import Link from "next/link";
import { testimonialsData } from "@/data/testimonials";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { Star, Quote, MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Clients & Testimonials | Arav Innovations",
  description:
    "Read verified client reviews and feedback on Arav Innovations' enterprise engineering, strategy, digital growth, and staff augmentation partnerships.",
  alternates: {
    canonical: "https://aravinnovations.com/testimonials",
  },
  openGraph: {
    title: "Clients & Testimonials | Arav Innovations",
    description:
      "Verified feedback from CTOs and growth executives on Arav Innovations' engineering and digital consulting.",
    url: "https://aravinnovations.com/testimonials",
    siteName: "Arav Innovations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clients & Testimonials | Arav Innovations",
    description:
      "Verified feedback from CTOs and growth executives on Arav Innovations' engineering and digital consulting.",
  },
};

export default function TestimonialsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Testimonials & Reviews", url: "/testimonials" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Testimonials & Reviews" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <Badge variant="secondary" size="md">
              Client Validation
            </Badge>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Client Feedback & Executive Reviews
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              Read verified feedback from engineering leaders, CTOs, and growth executives who have partnered with Arav Innovations across India and the United Arab Emirates.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((test, idx) => (
            <ScrollReveal key={test.id} delay={idx * 0.1} direction="up">
              <TiltCard maxTilt={5} scale={1.01} className="h-full">
                <div className="h-full p-8 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:shadow-2xl hover:border-[#E8672A]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                  <Quote className="absolute top-6 right-6 w-16 h-16 text-[#FCE3D3]/40 dark:text-[#E8672A]/10 pointer-events-none" />

                  <div>
                    <div className="flex items-center space-x-1 mb-4 text-[#E8672A]">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-base sm:text-lg font-medium text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed relative z-10">
                      “{test.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                    <div className="font-bold text-base text-[#3A2E27] dark:text-[#FAF5EE] font-display">
                      {test.author}
                    </div>
                    <div className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                      {test.designation} &bull; <span className="font-medium text-[#3A2E27] dark:text-[#FAF5EE]">{test.company}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-[#E8672A]">
                      <span>{test.service}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-[#7A6A5F] dark:text-[#B8ACA0]">
                        <MapPin className="w-3.5 h-3.5 text-[#E8672A]" /> {test.location}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up">
          <div className="rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] p-8 sm:p-12 border border-[#EFE2D6] dark:border-[#2C241E] text-center max-w-3xl mx-auto space-y-5 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Experience the Arav Difference
            </h3>
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              Let’s discuss your current business requirements and demonstrate how our engineering & strategy squads can deliver measurable ROI.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start a Discussion
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
