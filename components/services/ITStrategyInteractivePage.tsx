"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import {
  Compass,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Server,
  TrendingUp,
  Quote,
  Star,
  Check,
  ChevronRight,
  Globe2,
  Zap,
  Cpu,
} from "lucide-react";
import { Service } from "@/data/services";
import { caseStudiesData } from "@/data/case-studies";
import { testimonialsData } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ITStrategyPageProps {
  service: Service;
}

// 4 Core Solutions Items
const solutionsData = [
  {
    numStr: "01",
    title: "IT Assessment & Roadmap",
    subtitle: "Customized IT Roadmaps & Architecture Audits",
    description:
      "We develop a customized roadmap aligning IT strategies with your business goals, auditing legacy friction and defining 1–3 year modern software blueprints.",
    icon: <Compass className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Legacy Infrastructure & Technical Debt Audit",
      "Cloud FinOps Breakdown & Cost Tuning",
      "3-Year Digital Modernization Blueprint",
      "Vendor Dependency & Risk Mitigation",
    ],
    metric: "45%",
    metricLabel: "Technical Debt Reduction",
    stageName: "ASSESSMENT",
  },
  {
    numStr: "02",
    title: "Cybersecurity and Cloud Solutions",
    subtitle: "Zero-Trust Defenses & Policy Frameworks",
    description:
      "We strengthen your digital defenses by conducting security audits, vulnerability assessments, and creating a tailored cybersecurity policy framework.",
    icon: <Lock className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Zero-Trust Architecture & Identity Control",
      "Multi-Cloud Containerization (AWS / Azure)",
      "DPDP Act (India) & SOC-2 Audit Policy",
      "Continuous Automated Threat Detection",
    ],
    metric: "99.99%",
    metricLabel: "Uptime & Compliance Assurance",
    stageName: "SECURITY & CLOUD",
  },
  {
    numStr: "03",
    title: "Infrastructure Support",
    subtitle: "Proactive Telemetry & Self-Healing Pipelines",
    description:
      "Our proactive support services ensure your IT infrastructure remains robust, updated, and optimized for high-concurrency enterprise workloads.",
    icon: <Server className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "24/7 Real-Time Telemetry & Log Monitoring",
      "Self-Healing Infrastructure Automation",
      "15-Minute Guaranteed Critical SLA",
      "Disaster Recovery & Redundant Storage",
    ],
    metric: "15 min",
    metricLabel: "Critical Response SLA",
    stageName: "INFRASTRUCTURE",
  },
  {
    numStr: "04",
    title: "Key Benefits",
    subtitle: "Quantifiable ROI & Scalable Growth",
    description:
      "Maximizes uptime, enhances reliability, and offers peace of mind for your team while accelerating product delivery velocity.",
    icon: <TrendingUp className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "3.2x Accelerated Feature Release Velocity",
      "30%+ Cloud Infrastructure Cost Savings",
      "100% Client Source Code & IP Ownership",
      "Elastic Pod Scalability Across Global Corridors",
    ],
    metric: "3.2x",
    metricLabel: "Faster Deployment Cycles",
    stageName: "RELIABILITY & GROWTH",
  },
];

// 4-Step Methodology Workflow Data
const howWeWorkSteps = [
  {
    step: "01",
    title: "Assess and Analyze",
    description:
      "We start by analyzing your current IT environment to identify gaps, strengths, and areas for improvement, ensuring a clear understanding of your needs and goals.",
    output: "Technology Health Index & Gap Audit",
  },
  {
    step: "02",
    title: "Strategize and Plan",
    description:
      "Based on our analysis, we create a tailored IT roadmap that aligns with your business objectives, covering areas like cybersecurity, infrastructure updates, and cloud adoption.",
    output: "Executive Roadmap & FinOps Model",
  },
  {
    step: "03",
    title: "Implement and Secure",
    description:
      "From hardware and software upgrades to cybersecurity policy development, we implement solutions that enhance security, reliability, and scalability for your business.",
    output: "Production Migration & SOC-2 Readiness",
  },
  {
    step: "04",
    title: "Support and Maintain",
    description:
      "With ongoing support, updates, and performance monitoring, we ensure your IT infrastructure remains resilient, up-to-date, and optimized for future growth.",
    output: "Continuous Uptime & 15-min SLA",
  },
];



// Alternating CTA Words
const ctaWords = ["engaging", "innovative", "strategic", "outstanding", "exceptional"];

export function ITStrategyInteractivePage({ service }: ITStrategyPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSolutionIdx, setActiveSolutionIdx] = React.useState<number>(0);
  const [activeWorkIdx, setActiveWorkIdx] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  // Editorial Statement InView
  const statementRef = React.useRef<HTMLDivElement>(null);
  const isStatementInView = useInView(statementRef, { once: true, margin: "-100px" });

  // Rotating CTA Word Timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % ctaWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const activeSolution = solutionsData[activeSolutionIdx];
  const totalSolutions = solutionsData.length;

  // Touch & Drag Handlers for Solutions
  const handleDragStart = (clientX: number) => {
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartX === null || !isDragging) return;
    const deltaX = clientX - dragStartX;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        setActiveSolutionIdx((prev) => (prev + 1) % totalSolutions);
      } else {
        setActiveSolutionIdx((prev) => (prev - 1 + totalSolutions) % totalSolutions);
      }
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  // Related Case Study
  const relatedCaseStudy = caseStudiesData.find(
    (c) =>
      service.relatedCaseStudySlugs.includes(c.slug) ||
      c.serviceSlug === service.slug ||
      c.slug === "enterprise-cloud-transformation"
  );

  // Relevant Testimonial
  const testimonial = testimonialsData.find((t) => t.id === "test-3") || testimonialsData[0];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden">
      {/* =========================================================================
          1. HERO — IMMERSIVE SCROLL INTRODUCTION
          ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        {/* Subtle Background Technology/Infrastructure Animation */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-25 dark:opacity-20">
          <svg className="w-full h-full animate-pulse-slow" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="hero-net-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f15e1c" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#2e936f" strokeOpacity="0.4" />
                <stop offset="100%" stopColor="#fab60a" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <line x1="100" y1="150" x2="600" y2="300" stroke="url(#hero-net-line)" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="600" y1="300" x2="1100" y2="200" stroke="url(#hero-net-line)" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="600" y1="300" x2="600" y2="650" stroke="url(#hero-net-line)" strokeWidth="2" />
            <line x1="200" y1="500" x2="600" y2="650" stroke="url(#hero-net-line)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="1000" y1="550" x2="600" y2="650" stroke="url(#hero-net-line)" strokeWidth="1.5" strokeDasharray="4 4" />

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
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE IT STRATEGY &amp; MODERNIZATION</span>
          </motion.div>
        </div>

        {/* Dominant Headline & Hero Copy */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center space-y-6 pt-6 pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08] text-[#1b2823] dark:text-[#ffffff]"
          >
            Strategic IT solutions for modern <span className="text-[#f15e1c]">Business Transformation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg sm:text-xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Modernizing legacy architecture, eliminating technical debt, and aligning cloud systems with CFO-backed financial predictability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
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
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 text-center pb-2">
          <a href="#our-solutions" className="inline-flex flex-col items-center gap-2 group cursor-pointer">
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
          2. OUR SOLUTIONS — INTERACTIVE SERVICE SYSTEM
          ========================================================================= */}
      <section id="our-solutions" className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto space-y-12 select-none">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              OUR SOLUTIONS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Empowering business with innovative Technology
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Drag or click below to explore each solution framework and its active execution architecture.
            </p>
          </div>

          {/* Interactive Active Display Card */}
          <div
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseUp={(e) => handleDragEnd(e.clientX)}
            onTouchStart={(e) => e.touches.length === 1 && handleDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => e.changedTouches.length > 0 && handleDragEnd(e.changedTouches[0].clientX)}
            className="rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-radial from-[#f15e1c]/8 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#f7d7b0] dark:border-[#253630]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#f15e1c] text-white shadow-lg shadow-[#f15e1c]/25 shrink-0">
                  {activeSolution.icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider block">
                    SOLUTION {activeSolution.numStr} / 0{totalSolutions} &bull; {activeSolution.stageName}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {activeSolution.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white dark:bg-[#101b17] px-4 py-2 rounded-2xl border border-[#f7d7b0] dark:border-[#253630] shadow-xs">
                <span className="text-2xl font-black font-mono text-[#f15e1c]">{activeSolution.metric}</span>
                <span className="text-xs font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4] max-w-[130px] leading-tight">
                  {activeSolution.metricLabel}
                </span>
              </div>
            </div>

            {/* Dynamic Architecture Flow Visual for Active Solution */}
            <div className="relative py-6 px-4 bg-white dark:bg-[#101b17] rounded-3xl border border-[#f7d7b0] dark:border-[#253630] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSolution.numStr}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full flex items-center justify-center"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center w-full max-w-4xl">
                    {[
                      { label: "BUSINESS", sub: "Core Drivers" },
                      { label: "IT ASSESSMENT", sub: "Gap Diagnostic" },
                      { label: "ROADMAP", sub: "3-Yr Blueprint" },
                      { label: "SECURITY + CLOUD", sub: "Zero-Trust" },
                      { label: "RELIABILITY", sub: "99.99% Uptime" },
                    ].map((node, i) => {
                      const isNodeActive = i <= activeSolutionIdx + 1;
                      return (
                        <div
                          key={i}
                          className={cn(
                            "p-3.5 rounded-2xl border transition-all duration-300 text-center space-y-1",
                            isNodeActive
                              ? "bg-[#fefaf5] dark:bg-[#172420] border-[#f15e1c] shadow-md scale-102"
                              : "bg-white dark:bg-[#101b17] border-[#f7d7b0] dark:border-[#253630] opacity-60"
                          )}
                        >
                          <span className="text-[10px] font-mono font-extrabold text-[#f15e1c] block">0{i + 1}</span>
                          <div className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight">
                            {node.label}
                          </div>
                          <span className="text-[10px] text-[#2e936f] font-semibold block">{node.sub}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
              <div className="md:col-span-6 space-y-3 text-left">
                <h4 className="text-lg font-bold font-display text-[#f15e1c]">
                  {activeSolution.subtitle}
                </h4>
                <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {activeSolution.description}
                </p>
              </div>

              <div className="md:col-span-6 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c] block">
                  Key Scope Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                  {activeSolution.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630]">
                      <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Selection Buttons */}
            <div className="pt-6 border-t border-[#f7d7b0] dark:border-[#253630] space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {solutionsData.map((sol, idx) => (
                  <button
                    key={sol.numStr}
                    type="button"
                    onClick={() => setActiveSolutionIdx(idx)}
                    className={cn(
                      "py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer truncate",
                      activeSolutionIdx === idx
                        ? "bg-[#f15e1c] text-white shadow-md"
                        : "bg-white dark:bg-[#101b17] text-[#4a5c55] dark:text-[#d3eee4] border border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c]"
                    )}
                  >
                    0{idx + 1} {sol.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CLIENT SECTION — KIND WORDS FROM OUR CLIENTS
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Badge variant="secondary" size="md">
            KIND WORDS FROM OUR CLIENTS
          </Badge>
          <div className="p-8 sm:p-14 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-6 relative overflow-hidden">
            <div className="p-3 rounded-2xl bg-[#f15e1c] text-white w-fit mx-auto shadow-md">
              <Quote className="w-6 h-6" />
            </div>

            <p className="text-xl sm:text-3xl font-display font-medium text-[#1b2823] dark:text-[#ffffff] max-w-3xl mx-auto leading-relaxed italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] space-y-1">
              <div className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {testimonial.author}
              </div>
              <div className="text-xs text-[#f15e1c] font-bold">
                {testimonial.designation} &bull; {testimonial.company}
              </div>
              <div className="text-xs font-mono font-bold text-[#2e936f] pt-1">
                IT Strategy &amp; Modernization Partner
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. LARGE EDITORIAL STATEMENT & SUPPORTING ABSTRACT ARCHITECTURE VISUAL
          ========================================================================= */}
      <section ref={statementRef} className="relative py-24 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#ffffff] dark:bg-[#101b17] overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Large Staggered Editorial Typography Statement */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" size="md">
              STRATEGIC MISSION
            </Badge>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-[1.12] tracking-tight"
            >
              Helping businesses grow through <span className="text-[#f15e1c]">tailored IT strategies</span>, secure cloud adoption, and ongoing support.
            </motion.h2>

            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              We bridge the gap between CFO financial targets and engineering execution, delivering zero-downtime migrations, SOC-2 readiness, and measurable digital growth.
            </p>
          </div>

          {/* Right Column: Original Abstract Digital Architecture Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#f15e1c]/15 via-[#2e936f]/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                  SYSTEM ARCHITECTURE
                </span>
              </div>

              {/* Connected Abstract SVG Nodes */}
              <svg className="w-48 h-48 relative z-10 my-auto" viewBox="0 0 100 100" fill="none">
                <line x1="50" y1="20" x2="20" y2="70" stroke="#f15e1c" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="50" y1="20" x2="80" y2="70" stroke="#2e936f" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="20" y1="70" x2="80" y2="70" stroke="#fab60a" strokeWidth="2" />
                <circle cx="50" cy="20" r="8" fill="#f15e1c" />
                <circle cx="20" cy="70" r="7" fill="#2e936f" />
                <circle cx="80" cy="70" r="7" fill="#fab60a" />
                <circle cx="50" cy="53" r="5" fill="#f15e1c" className="animate-pulse" />
              </svg>

              <span className="relative z-10 text-[11px] font-mono font-bold text-[#2e936f] pb-1">
                CONNECTED DIGITAL CORE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. HOW WE WORK — STICKY CONNECTED 4-STEP PROCESS SYSTEM
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              HOW WE WORK?
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              4-Step Execution Framework
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              A disciplined methodology moving seamlessly from initial diagnosis to 24/7 continuous optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {howWeWorkSteps.map((wf, idx) => {
              const isActive = activeWorkIdx === idx;
              return (
                <div
                  key={wf.step}
                  onClick={() => setActiveWorkIdx(idx)}
                  onMouseEnter={() => setActiveWorkIdx(idx)}
                  className={cn(
                    "rounded-3xl p-7 border-2 transition-all duration-300 cursor-pointer space-y-4 relative flex flex-col justify-between min-h-[300px]",
                    isActive
                      ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-2xl ring-4 ring-[#f15e1c]/30 scale-102 z-20"
                      : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630] opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="space-y-3 text-left">
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

                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {wf.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] text-left">
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
          6. ENTERPRISE PROJECT CTA — DISCUSS YOUR PROJECT & EXECUTION PATH
          ========================================================================= */}
      <section id="pricing" className="relative py-20 px-4 sm:px-6 lg:px-12 bg-[#fefaf5] dark:bg-[#172420] border-y border-[#f7d7b0] dark:border-[#253630]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f15e1c]/10 border border-[#f15e1c]/30 text-xs font-mono font-bold text-[#f15e1c]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CUSTOM ENTERPRISE ENGAGEMENT</span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Let&apos;s Build What Comes Next
            </h2>
            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
              Tell us what you&apos;re trying to achieve and we&apos;ll help you identify the right technology, strategy, and execution path.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button3D
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                className="w-full sm:w-auto justify-center bg-[#f15e1c] hover:bg-[#fab60a] text-white"
              >
                Discuss a Project &rarr;
              </Button3D>
            </Link>
            <a href="https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">
              <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-[#f15e1c] border-[#f15e1c] hover:bg-[#f7d7b0]">
                Instant WhatsApp Inquiry
              </Button3D>
            </a>
          </div>

          <div className="pt-6 border-t border-[#f7d7b0] dark:border-[#253630] flex flex-wrap items-center justify-center gap-6 text-xs text-[#2e936f] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e936f]" /> 100% Client Code &amp; IP Ownership
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e936f]" /> Strict SLA Protection
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e936f]" /> Regional Teams in Gurgaon &amp; Dubai
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. ABOUT OUR CEO — EDITORIAL LEADERSHIP PROFILE
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-[#f15e1c] shadow-xl bg-[#fce3d3] dark:bg-[#261f1a] flex items-center justify-center text-center p-6 space-y-2 flex-col">
              <div className="w-20 h-20 rounded-full bg-[#f15e1c] text-white flex items-center justify-center text-2xl font-black font-display shadow-md">
                AS
              </div>
              <div className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Aryan Sayal
              </div>
              <div className="text-xs font-mono font-bold text-[#f15e1c]">
                CEO &amp; Managing Director
              </div>
              <span className="text-[10px] text-[#2e936f] font-mono">Arav Innovations</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <Badge variant="secondary" size="md">
              About Our CEO
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Aryan Sayal
            </h2>
            <p className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
              CEO, Arav Innovations
            </p>
            <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
              Leading Arav Innovations with a vision for strategic excellence, Aryan Sayal orchestrates multidisciplinary technology squads across India and the UAE to help enterprises achieve measurable digital transformation and zero-trust cloud resilience.
            </p>
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/aravinnovations/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f15e1c] text-white text-xs font-bold shadow-md hover:bg-[#d44e14] transition-colors"
              >
                <Globe2 className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FINAL CTA — ALTERNATING WORD TRANSFORMATIONAL SECTION
          ========================================================================= */}
      <section id="inquire" className="relative py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
              <span>START YOUR PROJECT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Can&apos;t wait to start your project?
            </h2>

            {/* Alternating Animated Word Display */}
            <div className="h-12 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={ctaWords[currentWordIdx]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="text-2xl sm:text-4xl font-extrabold font-display text-[#ffec69] uppercase tracking-wider"
                >
                  {ctaWords[currentWordIdx]}
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-base sm:text-lg font-bold text-white/90">
              Kick start a project with us today
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button3D
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0]"
              >
                Discuss a Project &rarr;
              </Button3D>
            </Link>
            <a href="https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">
              <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10">
                Instant WhatsApp Inquiry
              </Button3D>
            </a>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Strict SLA Protection
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Client Code &amp; IP Ownership
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Regional Teams in Gurgaon &amp; Dubai
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
