import * as React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { companyContactInfo } from "@/data/navigation";
import {
  Briefcase,
  Globe2,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Careers & Culture | Arav Innovations",
  description:
    "Join Arav Innovations — work on mission-critical enterprise software, IT consulting, digital marketing, and governance projects across India and UAE.",
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
      location: "Remote (India & UAE)",
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
    <div className="pt-28 pb-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Breadcrumb items={[{ label: "Careers & Culture" }]} />
          <Badge variant="secondary" size="md">
            Join Our Team
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] tracking-tight">
            Build High-Impact Digital Systems With Us
          </h1>
          <p className="text-lg text-[#7A6A5F] leading-relaxed">
            At Arav Innovations, we believe in high agency, engineering craftsmanship, transparent communication, and rapid career acceleration across cross-border projects.
          </p>
        </div>

        {/* Culture / Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#FBF3EA] border border-[#EFE2D6] space-y-3">
            <div className="p-3 rounded-2xl bg-white w-fit text-[#E8672A] shadow-2xs">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-[#3A2E27]">
              High Agency & Autonomy
            </h3>
            <p className="text-xs text-[#7A6A5F] leading-relaxed">
              We empower engineers and strategists to make impactful decisions without layers of bureaucratic red tape.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#EFE2D6] shadow-sm space-y-3">
            <div className="p-3 rounded-2xl bg-[#FCE3D3]/60 w-fit text-[#E8672A]">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-[#3A2E27]">
              Cross-Border Exposure
            </h3>
            <p className="text-xs text-[#7A6A5F] leading-relaxed">
              Collaborate directly with enterprise clients and cross-functional teams in both India and the UAE.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FBF3EA] border border-[#EFE2D6] space-y-3">
            <div className="p-3 rounded-2xl bg-white w-fit text-[#E8672A] shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-[#3A2E27]">
              Continuous Upskilling
            </h3>
            <p className="text-xs text-[#7A6A5F] leading-relaxed">
              Generous learning stipends, certification sponsorships (AWS, Azure, CISSP, Drata), and internal masterclasses.
            </p>
          </div>
        </div>

        {/* Open Roles */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27]">
                Current Openings
              </h2>
              <p className="text-xs text-[#7A6A5F] mt-1">
                Explore open engineering, consulting, and growth roles.
              </p>
            </div>
            <a
              href={`mailto:${companyContactInfo.careersEmail}`}
              className="text-xs font-semibold text-[#E8672A] hover:underline"
            >
              Don’t see your role? Email us directly &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {openings.map((job, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE2D6] shadow-2xs hover:shadow-lg hover:border-[#E8672A]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" size="sm">
                      {job.department}
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#7A6A5F]">
                      {job.type}
                    </span>
                    <span className="text-[11px] text-[#7A6A5F]">
                      &bull; {job.experience}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-[#3A2E27]">
                    {job.title}
                  </h3>
                  <p className="text-xs text-[#7A6A5F]">{job.location}</p>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
