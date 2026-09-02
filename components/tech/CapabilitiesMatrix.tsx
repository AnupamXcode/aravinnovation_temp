"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Cloud,
  Search,
  ShieldCheck,
  BarChart3,
  Users2,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TechCapability {
  id: string;
  title: string;
  category: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  accentColor: string;
  diagramType: "browser" | "cloud" | "search" | "shield" | "audit" | "squad";
  description: string;
  techStack: string[];
}

const capabilities: TechCapability[] = [
  {
    id: "web-dev",
    title: "Modern Web & Mobile Engineering",
    category: "Full-Stack Software",
    badge: "Next.js 16 + Microservices",
    icon: <Code2 className="w-5 h-5 text-[#f15e1c]" />,
    color: "#f15e1c",
    accentColor: "#f7d7b0",
    diagramType: "browser",
    description: "Sub-second Next.js App Router applications, TypeScript strict schemas, and scalable cloud-native web systems.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4"],
  },
  {
    id: "cloud-infra",
    title: "Cloud & Microservices Infrastructure",
    category: "Cloud FinOps & DevOps",
    badge: "99.99% Uptime SLA",
    icon: <Cloud className="w-5 h-5 text-[#2e936f]" />,
    color: "#2e936f",
    accentColor: "#aaddca",
    diagramType: "cloud",
    description: "Multi-region cloud deployment across AWS and Vercel with automated CI/CD pipelines and latency reduction.",
    techStack: ["AWS", "Docker", "Vercel", "Kubernetes"],
  },
  {
    id: "seo-network",
    title: "Programmatic SEO & Index Architecture",
    category: "Search Engine Optimization",
    badge: "Programmatic Authority",
    icon: <Search className="w-5 h-5 text-[#fab60a]" />,
    color: "#fab60a",
    accentColor: "#ffe580",
    diagramType: "search",
    description: "Structured JSON-LD schema graphs, dynamic sitemaps, and search index optimization for organic revenue growth.",
    techStack: ["JSON-LD", "Core Web Vitals", "Programmatic SEO"],
  },
  {
    id: "governance",
    title: "DPDP & SOC-2 Compliance Security",
    category: "Risk & Governance",
    badge: "Audit Ready",
    icon: <ShieldCheck className="w-5 h-5 text-[#f15e1c]" />,
    color: "#f15e1c",
    accentColor: "#f7d7b0",
    diagramType: "shield",
    description: "Data Protection Officer (DPO) governance frameworks, SOC-2 readiness, and India DPDP Act compliance.",
    techStack: ["DPDP Act 2023", "SOC-2", "GDPR", "ISO 27001"],
  },
  {
    id: "audit",
    title: "System Efficiency & Code Audits",
    category: "Performance Remediation",
    badge: "45% Latency Cut",
    icon: <BarChart3 className="w-5 h-5 text-[#2e936f]" />,
    color: "#2e936f",
    accentColor: "#aaddca",
    diagramType: "audit",
    description: "Meticulous memory leak detection, bundle size optimization, and database query tuning.",
    techStack: ["Turbopack", "Bundle Analysis", "Query Profiling"],
  },
  {
    id: "staff-aug",
    title: "Senior Technical Squad Augmentation",
    category: "Vetted Tech Talent",
    badge: "On-Demand Squads",
    icon: <Users2 className="w-5 h-5 text-[#fab60a]" />,
    color: "#fab60a",
    accentColor: "#ffe580",
    diagramType: "squad",
    description: "Vetted principal engineers, UI/UX strategists, and compliance consultants operating from India & Dubai.",
    techStack: ["Principal Engineers", "UI/UX Strategists", "DevOps Pods"],
  },
];

export function CapabilitiesMatrix() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 px-4 select-none">
      <div className="rounded-[3rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl p-8 sm:p-12 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#000000] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE CAPABILITIES MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
            3D Abstract Technology Architecture
          </h2>
          <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
            Every technology layer engineered by Arav Innovations is represented as an interconnected, high-performance data node.
          </p>
        </div>

        {/* 6 Capabilities Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <motion.div
              key={cap.id}
              whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md hover:shadow-2xl hover:border-[#f15e1c]/50 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0]/60">
                  {cap.icon}
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#fce3d3] dark:bg-[#161616] text-[#f15e1c] border border-[#f7d7b0]/50">
                  {cap.badge}
                </span>
              </div>

              {/* 3D Abstract Representation Box */}
              <div className="w-full h-28 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0]/50 relative overflow-hidden flex items-center justify-center p-4">
                {cap.diagramType === "browser" && (
                  <div className="w-full space-y-2">
                    <div className="h-3 rounded-md bg-[#f15e1c]/20 flex items-center px-2 gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f15e1c]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2e936f]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#fab60a]" />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="h-8 rounded-md bg-[#f15e1c]/15" />
                      <div className="h-8 rounded-md bg-[#2e936f]/15" />
                      <div className="h-8 rounded-md bg-[#fab60a]/15" />
                    </div>
                  </div>
                )}

                {cap.diagramType === "cloud" && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#2e936f]/20 border border-[#2e936f] flex items-center justify-center font-mono text-xs font-bold text-[#2e936f]">
                      S1
                    </div>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#2e936f] to-[#f15e1c]" />
                    <div className="w-8 h-8 rounded-xl bg-[#f15e1c]/20 border border-[#f15e1c] flex items-center justify-center font-mono text-xs font-bold text-[#f15e1c]">
                      S2
                    </div>
                  </div>
                )}

                {cap.diagramType === "search" && (
                  <div className="space-y-1.5 w-full">
                    <div className="h-2 rounded bg-[#fab60a]/30 w-3/4" />
                    <div className="h-2 rounded bg-[#f15e1c]/30 w-full" />
                    <div className="h-2 rounded bg-[#2e936f]/30 w-1/2" />
                  </div>
                )}

                {cap.diagramType === "shield" && (
                  <div className="relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#f15e1c]/20 border-2 border-[#f15e1c] flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-[#f15e1c]" />
                    </div>
                  </div>
                )}

                {cap.diagramType === "audit" && (
                  <div className="w-full flex justify-between items-end gap-1.5 h-16">
                    <div className="w-1/4 bg-[#f15e1c]/40 h-8 rounded-t-md" />
                    <div className="w-1/4 bg-[#2e936f]/60 h-12 rounded-t-md" />
                    <div className="w-1/4 bg-[#fab60a]/80 h-16 rounded-t-md" />
                    <div className="w-1/4 bg-[#f15e1c] h-10 rounded-t-md" />
                  </div>
                )}

                {cap.diagramType === "squad" && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#f15e1c] text-white flex items-center justify-center text-xs font-bold">
                      P1
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#2e936f] text-white flex items-center justify-center text-xs font-bold">
                      P2
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#fab60a] text-white flex items-center justify-center text-xs font-bold">
                      P3
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {cap.description}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {cap.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#fefaf5] dark:bg-[#0a0a0a] text-[#1b2823] dark:text-[#ffffff] border border-[#f7d7b0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
