"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Compass,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Zap,
  Workflow,
  Activity,
  Layers,
  Lock,
  Server,
  ChevronRight,
  Globe2,
  FileText,
  AlertTriangle,
  Building2,
  Clock,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { Service } from "@/data/services";
import { caseStudiesData } from "@/data/case-studies";
import { Button } from "@/components/ui/button";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ITStrategyPageProps {
  service: Service;
}

// 4 Interactive Service Ecosystem Items
interface InteractiveServiceItem {
  id: string;
  numStr: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  deliverables: string[];
  metric: string;
  metricLabel: string;
}

const interactiveServices: InteractiveServiceItem[] = [
  {
    id: "assessment-roadmap",
    numStr: "01",
    title: "IT Assessment & Roadmap",
    shortTitle: "Assessment & Roadmap",
    tagline: "Diagnostic infrastructure analysis & 3-year digital blueprints",
    description:
      "We perform deep-dive technological audits across legacy systems, cloud environments, and security policies to engineer defensible roadmaps aligned with CFO financial targets.",
    icon: <Compass className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Legacy Code & Technical Debt Audit",
      "Cloud Infrastructure FinOps Breakdown",
      "3-Year Digital Modernization Blueprint",
      "Vendor Dependency & Risk Analysis",
    ],
    metric: "45%",
    metricLabel: "Average Technical Debt Reduction",
  },
  {
    id: "cybersecurity-cloud",
    numStr: "02",
    title: "Cybersecurity & Cloud Solutions",
    shortTitle: "Cybersecurity & Cloud",
    tagline: "Zero-trust security posture & resilient cloud architecture",
    description:
      "Migrate legacy workloads to high-availability multi-cloud environments with built-in SOC 2, DPDP Act (India), and GDPR compliance frameworks.",
    icon: <Lock className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Zero-Trust Architecture Implementation",
      "Multi-Cloud Migration (AWS / Azure / GCP)",
      "DPDP & SOC-2 Compliance Certification",
      "Automated Continuous Threat Detection",
    ],
    metric: "99.99%",
    metricLabel: "Uptime & Compliance Assurance",
  },
  {
    id: "infrastructure-support",
    numStr: "03",
    title: "Infrastructure Support & Telemetry",
    shortTitle: "Infrastructure Support",
    tagline: "24/7 proactive monitoring & self-healing system pipelines",
    description:
      "Eliminate expensive downtime through continuous telemetry monitoring, automated incident remediation, and SLA-backed engineering support pods.",
    icon: <Server className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "24/7 Real-Time Telemetry Monitoring",
      "Self-Healing Infrastructure Automation",
      "15-Minute Guaranteed Critical SLA",
      "Disaster Recovery & Redundant Backups",
    ],
    metric: "15 min",
    metricLabel: "Critical Response SLA",
  },
  {
    id: "key-benefits",
    numStr: "04",
    title: "Strategic Business Benefits",
    shortTitle: "Strategic Benefits",
    tagline: "Quantifiable ROI, agility, and competitive market advantage",
    description:
      "Transform IT from a cost center into a core revenue driver by consolidating platforms, accelerating feature deployment, and empowering engineering teams.",
    icon: <TrendingUp className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "3.2x Faster Time-to-Market",
      "30%+ Cloud Infrastructure Cost Savings",
      "Full IP Ownership & Unlocked Vendor Lock-in",
      "Enterprise Scalability Across Regional Markets",
    ],
    metric: "3.2x",
    metricLabel: "Faster Deployment Cycles",
  },
];

// Workflow 4 Steps
const workflowSteps = [
  {
    step: "01",
    title: "Assess & Analyze",
    description:
      "Conduct thorough diagnostic audits of existing software architecture, server telemetry, security posture, and cloud cost allocation.",
    output: "Technology Health Index & Gap Audit",
  },
  {
    step: "02",
    title: "Strategize & Plan",
    description:
      "Formulate a milestone-driven 1–3 year modernization blueprint, defining clear milestones, budget caps, and team resource allocation.",
    output: "Executive Roadmap & FinOps Model",
  },
  {
    step: "03",
    title: "Implement & Secure",
    description:
      "Execute cloud migrations, refactor monoliths into microservices, enforce zero-trust security policies, and automate CI/CD pipelines.",
    output: "Production Migration & SOC-2 Readiness",
  },
  {
    step: "04",
    title: "Support & Maintain",
    description:
      "Provide 24/7 telemetry monitoring, automated vulnerability scanning, quarterly architectural reviews, and continuous cost tuning.",
    output: "Continuous Uptime & 15-min SLA",
  },
];

export function ITStrategyInteractivePage({ service }: ITStrategyPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeServiceIdx, setActiveServiceIdx] = React.useState<number>(0);
  const [activeWorkflowIdx, setActiveWorkflowIdx] = React.useState<number>(0);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const activeService = interactiveServices[activeServiceIdx];
  const totalServices = interactiveServices.length;

  // Swipe / Drag controls for Service System
  const handleDragStart = (clientX: number) => {
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartX === null || !isDragging) return;
    const deltaX = clientX - dragStartX;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        // Swipe left -> Next service
        setActiveServiceIdx((prev) => (prev + 1) % totalServices);
      } else {
        // Swipe right -> Prev service
        setActiveServiceIdx((prev) => (prev - 1 + totalServices) % totalServices);
      }
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  // Find related case study
  const relatedCaseStudy = caseStudiesData.find(
    (c) =>
      service.relatedCaseStudySlugs.includes(c.slug) ||
      c.serviceSlug === service.slug ||
      c.slug === "fintech-cloud-migration"
  );

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden">
      {/* =========================================================================
          1. HERO SECTION (FULL SCREEN ACCENT BACKGROUND & TYPOGRAPHY)
          ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        {/* Animated Background Technology Grid & Pathways */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-25 dark:opacity-20">
          <svg
            className="w-full h-full animate-pulse-slow"
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="hero-grid-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f15e1c" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#2e936f" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fab60a" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <line x1="100" y1="150" x2="600" y2="300" stroke="url(#hero-grid-line)" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="600" y1="300" x2="1100" y2="200" stroke="url(#hero-grid-line)" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="600" y1="300" x2="600" y2="650" stroke="url(#hero-grid-line)" strokeWidth="2" />
            <line x1="200" y1="500" x2="600" y2="650" stroke="url(#hero-grid-line)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="1000" y1="550" x2="600" y2="650" stroke="url(#hero-grid-line)" strokeWidth="1.5" strokeDasharray="4 4" />

            <circle cx="100" cy="150" r="5" fill="#f15e1c" className="animate-ping-slow" />
            <circle cx="600" cy="300" r="8" fill="#f15e1c" />
            <circle cx="1100" cy="200" r="6" fill="#2e936f" />
            <circle cx="600" cy="650" r="9" fill="#fab60a" />
            <circle cx="200" cy="500" r="5" fill="#2e936f" />
            <circle cx="1000" cy="550" r="5" fill="#f15e1c" />
          </svg>
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-radial from-[#f15e1c]/12 via-transparent to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-radial from-[#2e936f]/10 via-transparent to-transparent blur-3xl rounded-full" />
        </div>

        {/* Top Breadcrumb & Tag */}
        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              { label: "IT Strategy & Implementation" },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE IT STRATEGY &amp; MODERNIZATION</span>
          </div>
        </div>

        {/* Dominant Headline & Supporting Statement */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center space-y-6 pt-6 pb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08] text-[#1b2823] dark:text-[#ffffff]">
            Strategic IT solutions for modern <span className="text-[#f15e1c]">Business Transformation</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed">
            Modernizing legacy architecture, eliminating technical debt, and aligning cloud systems with CFO-backed financial predictability.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#inquire" className="w-full sm:w-auto">
              <Button3D
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                className="w-full sm:w-auto justify-center shadow-xl shadow-[#f15e1c]/25"
              >
                Inquire About IT Strategy
              </Button3D>
            </a>
            <Link href="/case-studies" className="w-full sm:w-auto">
              <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                View Case Studies
              </Button3D>
            </Link>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="relative z-10 text-center pb-2">
          <a href="#service-experience" className="inline-flex flex-col items-center gap-2 group cursor-pointer">
            <span className="text-xs font-mono font-bold tracking-widest text-[#7A6A5F] dark:text-[#B8ACA0] group-hover:text-[#f15e1c] transition-colors">
              SCROLL TO EXPLORE SYSTEM
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-[#f7d7b0] dark:border-[#253630] flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 rounded-full bg-[#f15e1c] animate-bounce" />
            </div>
          </a>
        </div>
      </section>

      {/* =========================================================================
          2. SERVICE EXPLORATION SYSTEM (INTERACTIVE SERVICE SYSTEM)
          ========================================================================= */}
      <section id="service-experience" className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto space-y-12 select-none">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              Interactive Service System
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Our Core IT Strategy Solutions
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Drag or swipe below to interact with each solution framework and explore its execution diagram.
            </p>
          </div>

          {/* Central Diagram & Interactive Active Display Card */}
          <div
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseUp={(e) => handleDragEnd(e.clientX)}
            onTouchStart={(e) => e.touches.length === 1 && handleDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => e.changedTouches.length > 0 && handleDragEnd(e.changedTouches[0].clientX)}
            className="rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden"
          >
            {/* Ambient Background Tint */}
            <div className="absolute inset-0 bg-radial from-[#f15e1c]/8 via-transparent to-transparent pointer-events-none" />

            {/* Active Service Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#f7d7b0] dark:border-[#253630]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#f15e1c] text-white shadow-lg shadow-[#f15e1c]/25 shrink-0">
                  {activeService.icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider block">
                    SOLUTION {activeService.numStr} / 0{totalServices}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white dark:bg-[#101b17] px-4 py-2 rounded-2xl border border-[#f7d7b0] dark:border-[#253630] shadow-xs">
                <span className="text-2xl font-black font-mono text-[#f15e1c]">{activeService.metric}</span>
                <span className="text-xs font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4] max-w-[120px] leading-tight">
                  {activeService.metricLabel}
                </span>
              </div>
            </div>

            {/* Central Service Diagram Canvas */}
            <div className="relative min-h-[300px] sm:min-h-[360px] bg-white dark:bg-[#101b17] rounded-3xl border border-[#f7d7b0] dark:border-[#253630] p-6 sm:p-8 flex flex-col justify-center items-center shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* DIAGRAM 01: IT ASSESSMENT & ROADMAP */}
                  {activeServiceIdx === 0 && (
                    <div className="w-full max-w-4xl space-y-6">
                      <div className="text-xs font-mono font-bold text-[#f15e1c] text-center uppercase tracking-widest">
                        DIAGRAM 01: ASSESSMENT TO ALIGNMENT PATHWAY
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                        {[
                          { label: "CURRENT IT ENVIRONMENT", sub: "Legacy Silos" },
                          { label: "ASSESSMENT", sub: "FinOps Audit" },
                          { label: "GAPS & RISKS", sub: "Technical Debt" },
                          { label: "STRATEGIC ROADMAP", sub: "3-Year Plan" },
                          { label: "BUSINESS ALIGNMENT", sub: "CFO Approved" },
                        ].map((node, i) => (
                          <React.Fragment key={i}>
                            <div className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f15e1c] text-center shadow-md space-y-1 hover:scale-105 transition-transform">
                              <span className="text-[10px] font-mono font-extrabold text-[#f15e1c] block">0{i + 1}</span>
                              <div className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight">
                                {node.label}
                              </div>
                              <span className="text-[10px] text-[#2e936f] font-semibold block">{node.sub}</span>
                            </div>
                            {i < 4 && (
                              <div className="hidden sm:flex items-center justify-center text-[#f15e1c]">
                                <ArrowRight className="w-5 h-5 animate-pulse" />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DIAGRAM 02: CYBERSECURITY & CLOUD */}
                  {activeServiceIdx === 1 && (
                    <div className="w-full max-w-4xl space-y-6">
                      <div className="text-xs font-mono font-bold text-[#f15e1c] text-center uppercase tracking-widest">
                        DIAGRAM 02: ZERO-TRUST CLOUD PIPELINE
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                        {[
                          { label: "INFRASTRUCTURE", sub: "On-Prem / Hybrid" },
                          { label: "SECURITY LAYER", sub: "Zero-Trust Mesh" },
                          { label: "THREAT DETECTION", sub: "24/7 AI Telemetry" },
                          { label: "CLOUD", sub: "Multi-Region AWS" },
                          { label: "MONITORING", sub: "SOC-2 Audited" },
                        ].map((node, i) => (
                          <React.Fragment key={i}>
                            <div className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#2e936f] text-center shadow-md space-y-1 hover:scale-105 transition-transform">
                              <span className="text-[10px] font-mono font-extrabold text-[#2e936f] block">0{i + 1}</span>
                              <div className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight">
                                {node.label}
                              </div>
                              <span className="text-[10px] text-[#f15e1c] font-semibold block">{node.sub}</span>
                            </div>
                            {i < 4 && (
                              <div className="hidden sm:flex items-center justify-center text-[#2e936f]">
                                <ArrowRight className="w-5 h-5 animate-pulse" />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DIAGRAM 03: INFRASTRUCTURE SUPPORT */}
                  {activeServiceIdx === 2 && (
                    <div className="w-full max-w-4xl space-y-6">
                      <div className="text-xs font-mono font-bold text-[#f15e1c] text-center uppercase tracking-widest">
                        DIAGRAM 03: CONTINUOUS TELEMETRY CYCLE
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                        {[
                          { label: "SYSTEMS", sub: "Live Production" },
                          { label: "MONITORING", sub: "Real-Time Telemetry" },
                          { label: "MAINTENANCE", sub: "Auto-Failover" },
                          { label: "OPTIMIZATION", sub: "FinOps Cost Audit" },
                          { label: "RELIABILITY", sub: "99.99% Uptime" },
                        ].map((node, i) => (
                          <React.Fragment key={i}>
                            <div className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#fab60a] text-center shadow-md space-y-1 hover:scale-105 transition-transform">
                              <span className="text-[10px] font-mono font-extrabold text-[#fab60a] block">0{i + 1}</span>
                              <div className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight">
                                {node.label}
                              </div>
                              <span className="text-[10px] text-[#2e936f] font-semibold block">{node.sub}</span>
                            </div>
                            {i < 4 && (
                              <div className="hidden sm:flex items-center justify-center text-[#fab60a]">
                                <ArrowRight className="w-5 h-5 animate-pulse" />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DIAGRAM 04: KEY BENEFITS */}
                  {activeServiceIdx === 3 && (
                    <div className="w-full max-w-4xl space-y-6">
                      <div className="text-xs font-mono font-bold text-[#f15e1c] text-center uppercase tracking-widest">
                        DIAGRAM 04: STRATEGIC OUTCOMES CONVERGENCE
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                        {[
                          { label: "UPTIME", val: "99.99%", color: "#f15e1c" },
                          { label: "SECURITY", val: "Zero-Trust", color: "#2e936f" },
                          { label: "RELIABILITY", val: "SLA Guarded", color: "#fab60a" },
                          { label: "SCALABILITY", val: "Elastic Pods", color: "#f15e1c" },
                          { label: "GROWTH", val: "3.2x Sprint Speed", color: "#2e936f" },
                        ].map((b, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border-2 shadow-lg space-y-1"
                            style={{ borderColor: b.color }}
                          >
                            <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block">{b.label}</span>
                            <div className="text-base font-black font-display text-[#1b2823] dark:text-[#ffffff]">
                              {b.val}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Active Service Description & Core Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
              <div className="md:col-span-6 space-y-3 text-left">
                <h4 className="text-lg font-bold font-display text-[#f15e1c]">
                  {activeService.tagline}
                </h4>
                <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              <div className="md:col-span-6 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c] block">
                  Key Scope Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeService.deliverables.map((del, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Horizontal Swipe/Drag Progress Control Bar (Task Requirement) */}
            <div className="pt-6 border-t border-[#f7d7b0] dark:border-[#253630] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-[#f15e1c]">
                  0{activeServiceIdx + 1} {activeService.title.toUpperCase()}
                </span>
                <span className="text-[#7A6A5F] dark:text-[#B8ACA0]">
                  SWIPE OR DRAG TO EXPLORE SERVICES &rarr;
                </span>
              </div>

              {/* Interactive Track & Drag Indicator */}
              <div className="relative w-full h-3 rounded-full bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] overflow-hidden cursor-pointer">
                <div
                  style={{ width: `${((activeServiceIdx + 1) / totalServices) * 100}%` }}
                  className="h-full bg-gradient-to-r from-[#f15e1c] to-[#2e936f] transition-all duration-300 rounded-full"
                />
              </div>

              {/* Direct Service Selector Nodes */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {interactiveServices.map((svc, idx) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => setActiveServiceIdx(idx)}
                    className={cn(
                      "py-2 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer truncate",
                      activeServiceIdx === idx
                        ? "bg-[#f15e1c] text-white shadow-md"
                        : "bg-white dark:bg-[#101b17] text-[#4a5c55] dark:text-[#d3eee4] border border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c]"
                    )}
                  >
                    0{idx + 1} {svc.shortTitle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WORKFLOW SECTION (INTERACTIVE 4-STEP WORKFLOW)
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              4-Step Execution Framework
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              How We Deliver IT Strategy
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              A disciplined, milestone-backed methodology moving from initial assessment to 24/7 continuous optimization.
            </p>
          </div>

          {/* Interactive 4-Step Connected Pathway */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {workflowSteps.map((wf, idx) => {
              const isActive = activeWorkflowIdx === idx;
              return (
                <div
                  key={wf.step}
                  onClick={() => setActiveWorkflowIdx(idx)}
                  onMouseEnter={() => setActiveWorkflowIdx(idx)}
                  className={cn(
                    "rounded-3xl p-6 border-2 transition-all duration-300 cursor-pointer space-y-4 relative flex flex-col justify-between",
                    isActive
                      ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-2xl ring-4 ring-[#f15e1c]/30 scale-102 z-20"
                      : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630] opacity-85 hover:opacity-100"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-mono font-black",
                          isActive ? "bg-[#f15e1c] text-white" : "bg-[#fce3d3] text-[#f15e1c]"
                        )}
                      >
                        STAGE {wf.step}
                      </span>
                      {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />}
                    </div>

                    <h3 className="text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {wf.title}
                    </h3>

                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {wf.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#7A6A5F] block">
                      Deliverable Outcome:
                    </span>
                    <span className="text-xs font-bold text-[#f15e1c] mt-0.5 block">
                      {wf.output}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CASE STUDY PROOF OF EXECUTION
          ========================================================================= */}
      {relatedCaseStudy && (
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <Badge variant="secondary" size="md">
                  Verified Outcome
                </Badge>
                <h2 className="text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-2">
                  Featured Case Study
                </h2>
              </div>
              <Link href="/case-studies">
                <Button3D variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
                  Explore All Case Studies
                </Button3D>
              </Link>
            </div>

            <div className="rounded-[2.5rem] bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider block">
                  {relatedCaseStudy.client} &bull; {relatedCaseStudy.clientIndustry}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {relatedCaseStudy.title}
                </h3>

                <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {relatedCaseStudy.summary}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  {relatedCaseStudy.results.map((m: { metric: string; label: string }, idx: number) => (
                    <div key={idx} className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0]">
                      <span className="text-xl font-black font-mono text-[#f15e1c] block">{m.metric}</span>
                      <span className="text-[11px] font-semibold text-[#4a5c55] dark:text-[#d3eee4]">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] space-y-4">
                <div className="text-xs font-mono font-bold text-[#2e936f] uppercase">
                  DEPLOYED TECHNOLOGIES
                </div>
                <div className="flex flex-wrap gap-2">
                  {relatedCaseStudy.technologiesUsed.map((t: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#101b17] text-xs font-bold text-[#1b2823] dark:text-[#ffffff] border border-[#f7d7b0]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <Link href={`/case-studies/${relatedCaseStudy.slug}`}>
                    <Button variant="primary" size="md" className="w-full justify-center bg-[#f15e1c]">
                      Read Full Architecture Study <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          5. PRICING & ENGAGEMENT MODELS (UNIFIED DESIGN SYSTEM)
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              Engagement Models
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Transparent Collaboration Models
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Choose from fixed-scope diagnostic sprints, dedicated virtual CTO pods, or full project-based transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.engagementModels.map((model, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-3xl p-8 border-2 transition-all duration-300 flex flex-col justify-between space-y-6 hover:shadow-2xl",
                  idx === 1
                    ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-xl ring-2 ring-[#f15e1c]/40"
                    : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630]"
                )}
              >
                <div className="space-y-4">
                  {idx === 1 && (
                    <span className="px-3 py-1 rounded-full bg-[#fce3d3] text-[#f15e1c] text-[10px] font-mono font-bold uppercase tracking-wider">
                      Most Popular For Scaling Enterprises
                    </span>
                  )}
                  <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {model.title}
                  </h3>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                    {model.description}
                  </p>
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    <span className="text-[#f15e1c] font-bold">Best For: </span>
                    {model.bestFor}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630]">
                  <a href="#inquire" className="block w-full">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center bg-[#f15e1c] hover:bg-[#d44e14]"
                    >
                      {model.ctaText || "Inquire About Model"}
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FINAL TRANSFORMATION CTA (CONNECTED TO HERO NETWORK VISUAL)
          ========================================================================= */}
      <section id="inquire" className="relative py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#172420] via-[#101b17] to-[#1b2823] text-white p-10 sm:p-16 border-2 border-[#f15e1c] shadow-2xl space-y-8 text-center relative overflow-hidden">
          {/* Visual Ambient Connection back to Hero */}
          <div className="absolute inset-0 bg-radial from-[#f15e1c]/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f15e1c]/20 border border-[#f15e1c] text-xs font-mono font-bold text-[#f15e1c]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START YOUR DIGITAL TRANSFORMATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              Ready to Modernize Your Enterprise Architecture?
            </h2>

            <p className="text-sm sm:text-base text-[#d3eee4] leading-relaxed">
              Connect with our practice leads for an NDA-protected technology assessment, cloud cost audit, and strategic roadmap session.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button3D
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                className="w-full sm:w-auto justify-center bg-[#f15e1c]"
              >
                Schedule Executive NDA Consultation
              </Button3D>
            </Link>
            <a href="https://api.whatsapp.com/send?phone=919650625777" target="_blank" rel="noopener noreferrer">
              <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/40">
                Instant WhatsApp Inquiry
              </Button3D>
            </a>
          </div>

          <div className="relative z-10 pt-6 border-t border-[#253630] flex flex-wrap items-center justify-center gap-6 text-xs text-[#d3eee4]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e936f]" /> Strict SLA Protection
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e936f]" /> 100% Client Code &amp; IP Ownership
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e936f]" /> Regional Teams in Gurgaon &amp; Dubai
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
