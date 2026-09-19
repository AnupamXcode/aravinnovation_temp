"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  TrendingUp,
  Code2,
  ShieldCheck,
  BarChart3,
  Users2,
  Search,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface ServiceCategoryGroup {
  groupName: string;
  groupTag: string;
  description: string;
  services: ServiceItem[];
}

export interface ServiceItem {
  id: number;
  number: string;
  groupCategory: string;
  category: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  tone: string;
  href: string;
  iconName: string;
  outcomes: string[];
}

export const groupedServicesData: ServiceCategoryGroup[] = [
  {
    groupName: "TECHNOLOGY & ENGINEERING",
    groupTag: "GROUP 01",
    description: "Core strategy, scalable software architecture, and AI-powered enterprise systems.",
    services: [
      {
        id: 0,
        number: "01",
        groupCategory: "TECHNOLOGY & ENGINEERING",
        category: "Strategy & Architecture",
        name: "IT Strategy & Implementation",
        shortName: "IT Strategy",
        description: "Turn technology complexity into a clear, practical roadmap for your business.",
        image: "/images/homepage-services/it-strategy-homepage.webp",
        tone: "#f15e1c",
        href: "/services/it-strategy-implementation",
        iconName: "Compass",
        outcomes: [
          "Enterprise Tech Roadmaps",
          "Legacy Modernization",
          "Cloud & FinOps Optimization",
        ],
      },
      {
        id: 1,
        number: "02",
        groupCategory: "TECHNOLOGY & ENGINEERING",
        category: "Software & Web Platforms",
        name: "Web & Application Development",
        shortName: "Web & App Dev",
        description: "Build scalable websites, applications and digital platforms around your business workflow.",
        image: "/images/homepage-services/web-dev-homepage.webp",
        tone: "#fab60a",
        href: "/services/web-app-development",
        iconName: "Code2",
        outcomes: [
          "Custom SaaS & Web Apps",
          "Business Portals & Platforms",
          "High-Performance Frontend & API Architecture",
        ],
      },
      {
        id: 2,
        number: "03",
        groupCategory: "TECHNOLOGY & ENGINEERING",
        category: "AI & Automation",
        name: "AI Portfolio / AI Solutions",
        shortName: "AI Portfolio",
        description: "Apply AI and automation to improve processes, customer experiences and business decision-making.",
        image: "/images/homepage-services/ai-portfolio-homepage.webp",
        tone: "#f15e1c",
        href: "/services/ai-portfolio",
        iconName: "Cpu",
        outcomes: [
          "Workflow Automation",
          "Custom Conversational AI & RAG",
          "Enterprise LLM Pipelines",
        ],
      },
    ],
  },
  {
    groupName: "DIGITAL GROWTH",
    groupTag: "GROUP 02",
    description: "Data-driven B2B demand generation, brand positioning, and organic search visibility.",
    services: [
      {
        id: 3,
        number: "04",
        groupCategory: "DIGITAL GROWTH",
        category: "B2B Demand Gen",
        name: "Digital Marketing & Brand Development",
        shortName: "Marketing & Brand",
        description: "Build a stronger digital presence and turn attention into meaningful business opportunities.",
        image: "/images/homepage-services/digital-marketing-homepage.webp",
        tone: "#2e936f",
        href: "/services/digital-marketing-brand-development",
        iconName: "TrendingUp",
        outcomes: [
          "B2B Demand Generation",
          "Brand Strategy & Positioning",
          "Conversion Funnel Optimization",
        ],
      },
      {
        id: 4,
        number: "05",
        groupCategory: "DIGITAL GROWTH",
        category: "Search & AEO",
        name: "SEO Services",
        shortName: "SEO Services & AEO",
        description: "Improve search visibility, attract higher-intent visitors and build sustainable organic growth.",
        image: "/images/homepage-services/seo-homepage.webp",
        tone: "#2e936f",
        href: "/services/seo-services",
        iconName: "Search",
        outcomes: [
          "Technical SEO Audits",
          "High-Intent Organic Keyword Strategy",
          "AI Search Engine Optimization (AEO)",
        ],
      },
    ],
  },
  {
    groupName: "GOVERNANCE & ASSURANCE",
    groupTag: "GROUP 03",
    description: "Risk management frameworks, DPDP compliance, and cloud system architecture audits.",
    services: [
      {
        id: 5,
        number: "06",
        groupCategory: "GOVERNANCE & ASSURANCE",
        category: "GRC & Privacy",
        name: "Risk, Compliance & Governance",
        shortName: "Risk & Governance",
        description: "Strengthen governance, manage technology risk and build practical compliance frameworks.",
        image: "/images/homepage-services/risk-compliance-homepage.webp",
        tone: "#f15e1c",
        href: "/services/risk-compliance-governance",
        iconName: "ShieldCheck",
        outcomes: [
          "India DPDP Act Readiness",
          "SOC-2 & ISO 27001 Preparation",
          "Security & Third-Party Risk Audits",
        ],
      },
      {
        id: 6,
        number: "07",
        groupCategory: "GOVERNANCE & ASSURANCE",
        category: "System Audits",
        name: "Audit & Improvement",
        shortName: "Audit & Improvement",
        description: "Identify gaps, improve systems and processes, and create a stronger foundation for continuous improvement.",
        image: "/images/homepage-services/audit-improvement-homepage.webp",
        tone: "#2e936f",
        href: "/services/audit-improvement",
        iconName: "BarChart3",
        outcomes: [
          "Cloud FinOps & Bill Audits",
          "Software Architecture Review",
          "Process Efficiency Benchmarking",
        ],
      },
    ],
  },
  {
    groupName: "PEOPLE & CAPABILITY",
    groupTag: "GROUP 04",
    description: "Senior engineering talent pods and technical team upskilling on demand.",
    services: [
      {
        id: 7,
        number: "08",
        groupCategory: "PEOPLE & CAPABILITY",
        category: "Talent Pods",
        name: "Training & Staff Augmentation",
        shortName: "Training & Staff",
        description: "Extend your team's capabilities with targeted training and skilled technology support.",
        image: "/images/homepage-services/training-staff-homepage.webp",
        tone: "#fab60a",
        href: "/services/training-staff-augmentation",
        iconName: "Users2",
        outcomes: [
          "Dedicated Senior Developer Pods",
          "Specialized Tech Roles",
          "Team Technical Upskilling",
        ],
      },
    ],
  },
];

const renderServiceIcon = (iconName: string) => {
  const props = { className: "w-5 h-5 shrink-0" };
  switch (iconName) {
    case "Compass":
      return <Compass {...props} />;
    case "TrendingUp":
      return <TrendingUp {...props} />;
    case "Code2":
      return <Code2 {...props} />;
    case "ShieldCheck":
      return <ShieldCheck {...props} />;
    case "BarChart3":
      return <BarChart3 {...props} />;
    case "Users2":
      return <Users2 {...props} />;
    case "Search":
      return <Search {...props} />;
    case "Cpu":
      return <Cpu {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};

const getServiceGridClass = (count: number) => {
  if (count >= 3) {
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full";
  }
  if (count === 2) {
    return "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto w-full";
  }
  return "grid grid-cols-1 max-w-xl mx-auto w-full";
};

export function InteractiveServiceStack3D() {
  const [selectedGroupIdx, setSelectedGroupIdx] = React.useState<number>(0);

  return (
    <section className="w-full py-10 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#000000] text-[#221811] dark:text-[#FAF5EE]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-12">
        <Badge variant="secondary" size="md">
          ENTERPRISE CAPABILITIES
        </Badge>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#221811] dark:text-[#FAF5EE] tracking-tight">
          Targeted Expertise Across Four Connected Pillars
        </h2>
        <p className="text-sm sm:text-base text-[#3A2E27] dark:text-[#FAF5EE] font-medium max-w-xl mx-auto">
          We structure our capabilities around the specific technology, growth, governance, and talent goals of growing businesses.
        </p>

        {/* Filter Tabs for 4 Organizational Groups */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setSelectedGroupIdx(0)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border",
              selectedGroupIdx === 0
                ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-sm"
                : "bg-white dark:bg-[#121212] text-[#3A2E27] dark:text-[#FAF5EE] border-[#EFE2D6] dark:border-[#222222] hover:border-[#f15e1c]"
            )}
          >
            All Services
          </button>
          {groupedServicesData.map((group, gIdx) => (
            <button
              key={gIdx}
              type="button"
              onClick={() => setSelectedGroupIdx(gIdx + 1)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border",
                selectedGroupIdx === gIdx + 1
                  ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-sm"
                  : "bg-white dark:bg-[#121212] text-[#3A2E27] dark:text-[#FAF5EE] border-[#EFE2D6] dark:border-[#222222] hover:border-[#f15e1c]"
              )}
            >
              {group.groupName}
            </button>
          ))}
        </div>
      </div>

      {/* Render Groups */}
      <div className="space-y-12 sm:space-y-16">
        {groupedServicesData
          .filter((_, gIdx) => selectedGroupIdx === 0 || selectedGroupIdx === gIdx + 1)
          .map((group, gIdx) => (
            <div key={gIdx} className="space-y-6">
              {/* Group Category Heading */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EFE2D6] dark:border-[#1f1f1f] pb-3 gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#f15e1c] tracking-widest">
                    {group.groupTag}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold font-display text-[#221811] dark:text-[#FAF5EE]">
                    {group.groupName}
                  </h3>
                </div>
                <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] font-medium">
                  {group.description}
                </span>
              </div>

              {/* Controlled Responsive Service Cards Grid */}
              <div className={getServiceGridClass(group.services.length)}>
                {group.services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-3xl bg-[#FBF3EA] dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] p-5 sm:p-7 flex flex-col justify-between hover:border-[#f15e1c] dark:hover:border-[#f15e1c] hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full min-h-[340px]"
                  >
                    <div className="flex-1 flex flex-col">
                      {/* Top Bar: Icon + Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#222222] flex items-center justify-center text-[#f15e1c] shadow-xs group-hover:scale-105 transition-transform shrink-0">
                          {renderServiceIcon(service.iconName)}
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#222222] text-[#3A2E27] dark:text-[#FAF5EE]">
                          {service.category}
                        </span>
                      </div>

                      {/* Service Title */}
                      <h4 className="text-lg font-bold font-display text-[#221811] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors mb-2.5 leading-snug">
                        {service.name}
                      </h4>

                      {/* Value Proposition */}
                      <p className="text-xs sm:text-sm text-[#3A2E27]/90 dark:text-[#FAF5EE]/90 leading-relaxed mb-4 font-medium">
                        {service.description}
                      </p>

                      {/* 2-4 Capability Points */}
                      <ul className="space-y-2 mb-6 text-xs text-[#3A2E27] dark:text-[#FAF5EE] mt-auto">
                        {service.outcomes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom CTA Link (Aligned consistently at bottom) */}
                    <div className="pt-4 mt-auto border-t border-[#EFE2D6]/60 dark:border-[#1f1f1f] flex items-center justify-between">
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f15e1c] hover:underline py-1 min-h-[36px]"
                      >
                        <span>Explore Service</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <span className="font-mono text-[11px] font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">
                        {service.number}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
