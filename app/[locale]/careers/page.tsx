import * as React from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { companyContactInfo } from "@/data/navigation";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import {
  Globe2,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Careers & Culture | Arav Innovations",
  description:
    "Join Arav Innovations — work on mission-critical enterprise software, IT consulting, digital marketing, and governance projects globally.",
  alternates: {
    canonical: "https://aravinnovations.com/careers",
  },
  openGraph: {
    title: "Careers & Culture | Arav Innovations",
    description:
      "Join our multidisciplinary engineering, strategy, and governance teams operating globally.",
    url: "https://aravinnovations.com/careers",
    siteName: "Arav Innovations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Culture | Arav Innovations",
    description:
      "Join our multidisciplinary engineering, strategy, and governance teams operating globally.",
  },
};

export default function CareersPage() {
  const openings = [
    {
      title: "Senior Full-Stack Engineer (Next.js / Node.js)",
      location: "Bengaluru / Remote (India)",
      type: "Full-Time",
      department: "Web & App Engineering",
      experience: "4 - 7 Years",
    },
    {
      title: "Enterprise Cloud & FinOps Architect",
      location: "Noida / Dubai (Hybrid)",
      type: "Full-Time",
      department: "IT Strategy & Cloud",
      experience: "6 - 10 Years",
    },
    {
      title: "Senior Technical SEO & Growth Strategist",
      location: "Remote (Global)",
      type: "Full-Time",
      department: "Digital Marketing",
      experience: "3 - 6 Years",
    },
    {
      title: "Cybersecurity & DPDP Compliance Consultant",
      location: "Bengaluru / Hybrid",
      type: "Full-Time",
      department: "Risk Governance",
      experience: "4 - 8 Years",
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300">
      <BreadcrumbSchema items={[{ name: "Careers & Culture", url: "/careers" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <ScrollReveal direction="up">
            <Breadcrumb items={[{ label: "Careers & Culture" }]} />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <Badge variant="secondary" size="md">
              Join Our Team
            </Badge>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight">
              Build High-Impact Digital Systems With Us
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
              At Arav Innovations, we believe in high agency, engineering craftsmanship, transparent communication, and rapid career acceleration across cross-border projects.
            </p>
          </ScrollReveal>
        </div>

        {/* Culture / Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal direction="up" delay={0.1}>
            <TiltCard maxTilt={6} scale={1.02} className="h-full group">
              <div className="h-full p-8 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-3 shadow-xs hover:border-[#f15e1c]/40 transition-all duration-300">
                <div className="p-3 rounded-2xl bg-white dark:bg-[#161616] w-fit text-[#f15e1c] shadow-2xs group-hover:bg-[#f15e1c] group-hover:text-white transition-all duration-300 [&>svg]:text-[#f15e1c] [&>svg]:group-hover:text-white [&>svg]:transition-colors [&>svg]:duration-300">
                  <Zap className="w-5 h-5 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors">
                  High Agency & Autonomy
                </h3>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  We empower engineers and strategists to make impactful decisions without layers of bureaucratic red tape.
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <TiltCard maxTilt={6} scale={1.02} className="h-full group">
              <div className="h-full p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm space-y-3 hover:border-[#f15e1c]/40 transition-all duration-300">
                <div className="p-3 rounded-2xl bg-[#FCE3D3]/60 dark:bg-[#161616] w-fit text-[#f15e1c] group-hover:bg-[#f15e1c] group-hover:text-white transition-all duration-300 shadow-xs [&>svg]:text-[#f15e1c] [&>svg]:group-hover:text-white [&>svg]:transition-colors [&>svg]:duration-300">
                  <Globe2 className="w-5 h-5 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors">
                  Global Client Exposure
                </h3>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  Collaborate directly with ambitious enterprise clients and cross-functional teams globally.
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <TiltCard maxTilt={6} scale={1.02} className="h-full group">
              <div className="h-full p-8 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-3 shadow-xs hover:border-[#f15e1c]/40 transition-all duration-300">
                <div className="p-3 rounded-2xl bg-white dark:bg-[#161616] w-fit text-[#f15e1c] shadow-2xs group-hover:bg-[#f15e1c] group-hover:text-white transition-all duration-300 [&>svg]:text-[#f15e1c] [&>svg]:group-hover:text-white [&>svg]:transition-colors [&>svg]:duration-300">
                  <Sparkles className="w-5 h-5 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors">
                  Continuous Upskilling
                </h3>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  Generous learning stipends, certification sponsorships (AWS, Azure, CISSP, Drata), and internal masterclasses.
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>

        {/* Open Roles */}
        <div className="space-y-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Current Openings
                </h2>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-1">
                  Explore open engineering, consulting, and growth roles.
                </p>
              </div>
              <a
                href={`mailto:${companyContactInfo.careersEmail}`}
                className="text-xs font-semibold text-[#f15e1c] hover:underline"
              >
                Don’t see your role? Email us directly &rarr;
              </a>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-4">
            {openings.map((job, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} direction="up">
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm hover:shadow-xl hover:border-[#f15e1c]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" size="sm">
                        {job.department}
                      </Badge>
                      <span className="text-[11px] font-semibold text-[#7A6A5F] dark:text-[#B8ACA0]">
                        {job.type}
                      </span>
                      <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                        &bull; {job.experience}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                      {job.title}
                    </h3>
                    <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">{job.location}</p>
                  </div>

                  <a
                    href={`mailto:${companyContactInfo.careersEmail}?subject=Application:%20${encodeURIComponent(
                      job.title
                    )}`}
                    className="shrink-0"
                  >
                    <Button variant="primary" size="md">
                      Apply for Position <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
