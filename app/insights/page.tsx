import * as React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BookOpen, Sparkles } from "lucide-react";

export const metadata = {
  title: "Insights & Technical Perspectives | Arav Innovations",
  description:
    "Engineering guides, B2B digital growth strategies, DPDP regulatory insights, and cloud architecture deep dives by Arav Innovations.",
};

export default function InsightsPage() {
  const articles = [
    {
      slug: "dpdp-act-readiness-guide-enterprises",
      title: "Navigating India's Digital Personal Data Protection (DPDP) Act: A CTO's Implementation Checklist",
      category: "Risk Governance",
      readTime: "7 min read",
      summary:
        "Practical engineering steps to identify personal data touchpoints, establish Data Principal consent workflows, and avoid regulatory liabilities.",
      date: "August 2026",
    },
    {
      slug: "nextjs-app-router-subsecond-performance",
      title: "Architecting Sub-Second Enterprise Portals with Next.js App Router & Cloudflare Edge",
      category: "Web & App Dev",
      readTime: "6 min read",
      summary:
        "How server-side rendering, selective hydration, and edge caching combine to produce perfect 100/100 Core Web Vitals on high-concurrency enterprise web portals.",
      date: "August 2026",
    },
    {
      slug: "b2b-demand-generation-closed-loop-attribution",
      title: "Why Traditional B2B Agency Retainers Fail: Building Closed-Loop CRM Attribution",
      category: "Digital Marketing",
      readTime: "5 min read",
      summary:
        "Moving past vanity impressions to measure closed-won pipeline directly tied to LinkedIn ABM and high-intent Google Search campaigns.",
      date: "July 2026",
    },
    {
      slug: "cloud-finops-slashing-aws-azure-waste",
      title: "Cloud FinOps 101: How We Uncover 30%+ Unused Cloud Spend in Enterprise Workloads",
      category: "IT Strategy",
      readTime: "8 min read",
      summary:
        "Practical strategies for right-sizing overprovisioned Kubernetes clusters, database query indexing, and automated lifecycle policies.",
      date: "June 2026",
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Breadcrumb items={[{ label: "Insights & Articles" }]} />
          <Badge variant="secondary" size="md">
            Thought Leadership
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] tracking-tight">
            Insights & Engineering Perspectives
          </h1>
          <p className="text-lg text-[#7A6A5F] leading-relaxed">
            In-depth analysis on modern software architecture, B2B demand generation, regulatory compliance, and cloud optimization authored by our practice leads.
          </p>
        </div>

        {/* Featured Article */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FBF3EA] border border-[#EFE2D6] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="primary" size="sm">
                Featured Insight
              </Badge>
              <span className="text-xs text-[#7A6A5F] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E8672A]" /> {articles[0].readTime}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27]">
              {articles[0].title}
            </h2>
            <p className="text-sm text-[#7A6A5F] leading-relaxed">
              {articles[0].summary}
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Request Full Whitepaper
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#EFE2D6] space-y-3 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] block">
              Article Takeaways
            </span>
            <ul className="text-xs text-[#7A6A5F] space-y-2">
              <li>&bull; DPDP Compliance requirements for digital portals</li>
              <li>&bull; Consent managers & Data Principal rights</li>
              <li>&bull; Architecture changes for data residency in India</li>
            </ul>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(1).map((art, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-[#EFE2D6] shadow-sm hover:shadow-xl hover:border-[#E8672A]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" size="sm">
                    {art.category}
                  </Badge>
                  <span className="text-[11px] text-[#7A6A5F]">{art.readTime}</span>
                </div>

                <h3 className="text-lg font-bold font-display text-[#3A2E27] line-clamp-3">
                  {art.title}
                </h3>

                <p className="text-xs text-[#7A6A5F] leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EFE2D6] flex items-center justify-between">
                <span className="text-[11px] text-[#7A6A5F]">{art.date}</span>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#E8672A] hover:underline inline-flex items-center gap-1"
                >
                  Inquire Topic <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
