import * as React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { companyContactInfo } from "@/data/navigation";
import {
  Globe2,
  ShieldCheck,
  Zap,
  Users,
  Target,
  ArrowRight,
  MapPin,
  CheckCircle,
  Building,
} from "lucide-react";

export const metadata = {
  title: "About Us | Arav Innovations",
  description:
    "Learn about Arav Innovations — a multidisciplinary B2B technology consulting, full-stack software development, digital marketing, and governance firm operating in India and UAE.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Engineering Precision Over Fluff",
      description:
        "We reject superficial vanity metrics and non-actionable reports. Every initiative is backed by architectural sound principles, clean code, and provable business ROI.",
      icon: <Zap className="w-5 h-5 text-[#E8672A]" />,
    },
    {
      title: "Cross-Border Integrity & Compliance",
      description:
        "With active operations in India and the UAE, we adhere strictly to global security frameworks, DPDP Act mandates, and regional data governance requirements.",
      icon: <ShieldCheck className="w-5 h-5 text-[#E8672A]" />,
    },
    {
      title: "Radical Transparency & Code Ownership",
      description:
        "You own 100% of your source code, infrastructure configurations, ad accounts, and IP. No vendor lock-in, no hidden markups, and zero proprietary black boxes.",
      icon: <Target className="w-5 h-5 text-[#E8672A]" />,
    },
    {
      title: "Long-Term Client Partnership",
      description:
        "We measure our success by the longevity and compound growth of the enterprises we serve, evolving from initial sprint execution into long-term strategic advisory.",
      icon: <Users className="w-5 h-5 text-[#E8672A]" />,
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
        {/* Hero */}
        <section className="space-y-6 max-w-3xl">
          <Breadcrumb items={[{ label: "About Us" }]} />
          <Badge variant="secondary" size="md">
            Our Purpose & Vision
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#3A2E27] tracking-tight leading-[1.12]">
            Redefining Enterprise Technology & Growth Consulting
          </h1>
          <p className="text-lg sm:text-xl text-[#7A6A5F] leading-relaxed">
            Arav Innovations was founded to eliminate the traditional divide between high-level management consulting and hands-on technical execution. We combine seven specialized practices under one roof to deliver cohesive, resilient digital transformation for ambitious organizations.
          </p>
        </section>

        {/* Story / Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="secondary" size="sm">
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3A2E27]">
              Built for Modern Enterprise Demands
            </h2>
            <p className="text-sm text-[#7A6A5F] leading-relaxed">
              In an era where technology dictates commercial survivability, businesses often struggle with fragmented vendor ecosystems: hiring one agency for digital marketing, another for cloud migrations, a third for software development, and distinct legal advisors for privacy compliance.
            </p>
            <p className="text-sm text-[#7A6A5F] leading-relaxed">
              At Arav Innovations, we provide a unified multidisciplinary model. Our senior architects, developers, growth strategists, and governance specialists work in tight synchronization, ensuring that your IT infrastructure directly accelerates your top-line revenue while remaining rock-solid and compliant.
            </p>
            <div className="pt-2">
              <Link href="/services">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Our 7 Core Practices
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-[#FBF3EA] border border-[#EFE2D6] space-y-6">
              <div className="flex items-center gap-3">
                <Globe2 className="w-6 h-6 text-[#E8672A]" />
                <h3 className="text-xl font-bold font-display text-[#3A2E27]">
                  Dual-Regional Presence
                </h3>
              </div>
              <p className="text-xs text-[#7A6A5F] leading-relaxed">
                Operating across two of the world’s most dynamic economic corridors: India (fastest-growing engineering powerhouse) and the United Arab Emirates (premier global commerce hub).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#EFE2D6] space-y-1">
                  <span className="text-xs font-bold text-[#3A2E27] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E8672A]" /> India Hub
                  </span>
                  <p className="text-[11px] text-[#7A6A5F]">
                    {companyContactInfo.offices[0].status}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EFE2D6] space-y-1">
                  <span className="text-xs font-bold text-[#3A2E27] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E8672A]" /> UAE Hub
                  </span>
                  <p className="text-[11px] text-[#7A6A5F]">
                    {companyContactInfo.offices[1].status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              Core Principles
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#3A2E27]">
              The Values That Guide Our Engagements
            </h2>
            <p className="text-sm text-[#7A6A5F]">
              How we work with our team, our enterprise partners, and our broader ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white border border-[#EFE2D6] shadow-sm hover:shadow-xl hover:border-[#E8672A]/40 transition-all space-y-3"
              >
                <div className="p-3 rounded-2xl bg-[#FCE3D3]/60 w-fit">{v.icon}</div>
                <h3 className="text-lg font-bold font-display text-[#3A2E27]">
                  {v.title}
                </h3>
                <p className="text-sm text-[#7A6A5F] leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-[#FBF3EA] p-8 sm:p-12 border border-[#EFE2D6] text-center max-w-3xl mx-auto space-y-5">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27]">
            Connect With Our Leadership
          </h3>
          <p className="text-sm text-[#7A6A5F] leading-relaxed">
            Ready to explore how Arav Innovations can augment your technical team or optimize your digital strategy?
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get In Touch
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
