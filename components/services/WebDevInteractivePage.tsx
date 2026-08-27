"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import {
  Code2,
  Layout,
  ShoppingBag,
  Cpu,
  Server,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Star,
  Globe2,
  Zap,
  Layers,
  Terminal,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { Service } from "@/data/services";
import { caseStudiesData } from "@/data/case-studies";
import { testimonialsData } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WebDevPageProps {
  service: Service;
}

// 4 Core Solutions Items for Web Development
const webDevSolutionsData = [
  {
    numStr: "01",
    title: "Design & Development",
    subtitle: "Responsive, User-Centric Websites & Web Apps",
    description:
      "We specialize in creating responsive, user-centric websites and applications engineered for high performance, intuitive UX, and seamless accessibility across all viewports.",
    icon: <Code2 className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Figma Wireframes & Interactive UI Prototypes",
      "Next.js / React High-Performance Architecture",
      "Sub-Second Page Load Optimization",
      "Accessible & Responsive Design System",
    ],
    metric: "99/100",
    metricLabel: "Core Web Vitals Performance",
    stageName: "UI & FRONTEND ARCHITECTURE",
    route: "/services/web-app-development",
  },
  {
    numStr: "02",
    title: "E-Commerce Solutions",
    subtitle: "Scalable Platforms & High-Converting Checkout",
    description:
      "From small businesses to large enterprises, we build scalable e-commerce platforms that offer seamless shopping experiences, multi-currency checkout, and instant inventory sync.",
    icon: <ShoppingBag className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Custom Shopify / Headless Commerce Engines",
      "Stripe, Razorpay & International Payment Gateways",
      "Real-Time Inventory & ERP Integration",
      "Frictionless One-Page Checkout Experience",
    ],
    metric: "3.8x",
    metricLabel: "Checkout Conversion Increase",
    stageName: "COMMERCE PIPELINE",
    route: "/services/web-app-development",
  },
  {
    numStr: "03",
    title: "Custom Application Development",
    subtitle: "Bespoke Web, Mobile & Desktop Platforms",
    description:
      "We develop tailored applications that align with your business objectives, whether for web, mobile (iOS/Android), or desktop, with decoupled REST & GraphQL APIs.",
    icon: <Cpu className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Cross-Platform React Native / Web Applications",
      "Decoupled Microservices & GraphQL APIs",
      "PostgreSQL / MongoDB Cloud Data Schemas",
      "Zero-Trust Auth & RBAC Security Control",
    ],
    metric: "100%",
    metricLabel: "Custom Code & IP Ownership",
    stageName: "APPLICATION CORE",
    route: "/services/web-app-development",
  },
  {
    numStr: "04",
    title: "Maintenance & Support",
    subtitle: "Post-Launch Care & Continuous Telemetry",
    description:
      "Our commitment doesn’t end at launch. We offer ongoing maintenance and support to ensure your website or application remains secure, updated, and performing at its best.",
    icon: <Server className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "24/7 Automated Vulnerability & Uptime Scans",
      "Continuous Dependency & Security Patching",
      "15-Minute Critical Incident SLA Guarantee",
      "Regular Feature Updates & Version Sprints",
    ],
    metric: "99.99%",
    metricLabel: "Guaranteed Production Uptime",
    stageName: "LIFECYCLE SUPPORT",
    route: "/services/web-app-development",
  },
];

// 4-Stage Product Building Framework
const howWeWorkSteps = [
  {
    step: "01",
    title: "Discovery and Planning",
    description:
      "We start by understanding your vision, requirements, and objectives. Our team collaborates closely with you to define the project scope, goals, and technology stack for optimal results.",
    output: "Project Scope & Tech Stack Blueprint",
  },
  {
    step: "02",
    title: "Design and Development",
    description:
      "Our designers create an intuitive and visually appealing user interface, while our developers build a secure, high-performance backend that brings your vision to life across devices.",
    output: "UI Prototypes & Full-Stack Codebase",
  },
  {
    step: "03",
    title: "Quality Assurance and Testing",
    description:
      "Every feature and functionality is rigorously tested to ensure a flawless user experience. From security to usability, we leave no stone unturned.",
    output: "QA Validation & Penetration Audit",
  },
  {
    step: "04",
    title: "Launch and Ongoing Support",
    description:
      "After a smooth launch, we provide continuous support and maintenance to keep your web or app solution updated, secure, and optimized for evolving needs.",
    output: "Zero-Downtime Deployment & 24/7 SLA",
  },
];

// Pricing Packages Data
const pricingPlans = [
  {
    name: "Starter Pack",
    price: "₹10,000",
    period: "one-time diagnostic sprint",
    description: "Ideal for early concepts requiring architecture scoping, UI wireframes, and tech stack selection.",
    isPopular: false,
    features: [
      "UI/UX Wireframes & Component Architecture",
      "Technical Stack Scoping (React / Next.js)",
      "Database Schema & API Contract Mapping",
      "30-Minute Engineering Advisory Session",
      "Prioritized Build Estimate & Specification",
    ],
    ctaText: "Choose Starter Pack",
  },
  {
    name: "Optimal Pack",
    price: "₹50,000",
    period: "sprint delivery pack",
    description: "Full-stack web or mobile app build with custom UI design, API integration, and production deployment.",
    isPopular: true,
    features: [
      "Custom Full-Stack Web / Mobile Application",
      "Responsive Figma UI/UX Design System",
      "REST / GraphQL API Backend Integration",
      "Rigorous Functional & Security Testing",
      "Bi-weekly Sprint Demos & Reviews",
      "Dedicated Full-Stack Developer Pod",
    ],
    ctaText: "Select Optimal Pack",
  },
  {
    name: "Full Pack",
    price: "₹1 Lakh",
    period: "enterprise monthly retainer",
    description: "Enterprise application engineering, continuous CI/CD pipeline, dedicated CTO pod, and 24/7 maintenance.",
    isPopular: false,
    features: [
      "Enterprise Multi-Platform App Architecture",
      "Continuous CI/CD Automated Deployment",
      "Dedicated Lead Engineer & UI Designer",
      "24/7 Telemetry Monitoring & 15-min SLA",
      "100% Client Source Code & IP Transfer",
      "Unlimited Architectural Consultation",
    ],
    ctaText: "Select Full Pack",
  },
];

// Alternating CTA Words
const ctaWords = ["engaging", "innovative", "strategic", "outstanding", "exceptional"];

export function WebDevInteractivePage({ service }: WebDevPageProps) {
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

  const activeSolution = webDevSolutionsData[activeSolutionIdx];
  const totalSolutions = webDevSolutionsData.length;

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
  ) || caseStudiesData[1];

  // Relevant Testimonial
  const testimonial = testimonialsData.find((t) => t.id === "test-2") || testimonialsData[1];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden">
      {/* =========================================================================
          1. HERO — IMMERSIVE PRODUCT CONSTRUCTION EXPERIENCE
          ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        {/* Subtle Background Architectural Grid Lines */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-25 dark:opacity-20">
          <svg className="w-full h-full animate-pulse-slow" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="webdev-grid-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f15e1c" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#2e936f" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fab60a" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <line x1="150" y1="100" x2="1050" y2="100" stroke="url(#webdev-grid-line)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="150" y1="400" x2="1050" y2="400" stroke="url(#webdev-grid-line)" strokeWidth="1.5" />
            <line x1="150" y1="700" x2="1050" y2="700" stroke="url(#webdev-grid-line)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="300" y1="50" x2="300" y2="750" stroke="url(#webdev-grid-line)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="600" y1="50" x2="600" y2="750" stroke="url(#webdev-grid-line)" strokeWidth="1.5" />
            <line x1="900" y1="50" x2="900" y2="750" stroke="url(#webdev-grid-line)" strokeWidth="1" strokeDasharray="4 4" />

            <circle cx="300" cy="400" r="6" fill="#f15e1c" className="animate-ping-slow" />
            <circle cx="600" cy="400" r="8" fill="#f15e1c" />
            <circle cx="900" cy="400" r="6" fill="#2e936f" />
          </svg>
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-radial from-[#f15e1c]/12 via-transparent to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-radial from-[#2e936f]/10 via-transparent to-transparent blur-3xl rounded-full" />
        </div>

        {/* Top Breadcrumb & Tag */}
        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              { label: "Web & Application Development" },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL-STACK WEB &amp; APP ENGINEERING</span>
          </motion.div>
        </div>

        {/* Dominant Headline: Innovative Web and App Solutions Tailored for Success */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center space-y-6 pt-6 pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08] text-[#1b2823] dark:text-[#ffffff]"
          >
            WEB &amp; APPLICATION DEVELOPMENT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg sm:text-xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
          >
            From high-conversion web experiences to complex enterprise applications, we build scalable digital products engineered around real business workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button3D
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                className="w-full sm:w-auto justify-center shadow-xl shadow-[#f15e1c]/25"
              >
                Discuss a Project
              </Button3D>
            </Link>
            <Link href="/services" className="w-full sm:w-auto">
              <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                Explore Services
              </Button3D>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 text-center pb-2">
          <a href="#our-solutions" className="inline-flex flex-col items-center gap-2 group cursor-pointer">
            <span className="text-xs font-mono font-bold tracking-widest text-[#7A6A5F] dark:text-[#B8ACA0] group-hover:text-[#f15e1c] transition-colors">
              SCROLL TO EXPLORE PRODUCT CORE
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-[#f7d7b0] dark:border-[#253630] flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 rounded-full bg-[#f15e1c] animate-bounce" />
            </div>
          </a>
        </div>
      </section>

      {/* =========================================================================
          2. OUR SOLUTIONS — CONNECTED DIGITAL PRODUCT ECOSYSTEM
          ========================================================================= */}
      <section id="our-solutions" className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto space-y-12 select-none">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              OUR SOLUTIONS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Transform your ideas into powerful digital Solutions
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Drag or click below to explore each development discipline and its live system architecture.
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

            {/* Dynamic Product Assembly Diagram for Active Solution */}
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
                      { label: "DISCOVERY", sub: "User Needs" },
                      { label: "WIREFRAME", sub: "UI Architecture" },
                      { label: "FRONTEND", sub: "React / Next.js" },
                      { label: "BACKEND API", sub: "REST / GraphQL" },
                      { label: "PRODUCTION", sub: "Live Deployment" },
                    ].map((node, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-3.5 rounded-2xl border transition-all duration-300 text-center space-y-1",
                          i <= activeSolutionIdx + 1
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
                    ))}
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
                {webDevSolutionsData.map((sol, idx) => (
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
                Web &amp; Application Engineering Partner
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. LARGE EDITORIAL PRODUCT STATEMENT & ABSTRACT ARCHITECTURE VISUAL
          ========================================================================= */}
      <section ref={statementRef} className="relative py-24 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#ffffff] dark:bg-[#101b17] overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Large Editorial Typography Statement */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" size="md">
              PRODUCT ENGINEERING
            </Badge>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-[1.12] tracking-tight"
            >
              At Arav Innovations we design and develop <span className="text-[#f15e1c]">custom web and app solutions</span> that fuel your growth.
            </motion.h2>

            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              From intuitive UI/UX design to robust cloud backends, we build scalable software products designed for zero-downtime reliability and enterprise growth.
            </p>
          </div>

          {/* Right Column: Original Abstract Digital Product Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#f15e1c]/15 via-[#2e936f]/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                  PRODUCT CORE ENGINE
                </span>
              </div>

              {/* Connected Abstract Product Assembly SVG */}
              <svg className="w-48 h-48 relative z-10 my-auto" viewBox="0 0 100 100" fill="none">
                <rect x="20" y="20" width="60" height="40" rx="6" stroke="#f15e1c" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="20" y1="35" x2="80" y2="35" stroke="#2e936f" strokeWidth="1.5" />
                <line x1="50" y1="60" x2="50" y2="80" stroke="#fab60a" strokeWidth="2" />
                <circle cx="50" cy="80" r="5" fill="#f15e1c" className="animate-pulse" />
                <circle cx="30" cy="27.5" r="2" fill="#f15e1c" />
                <circle cx="37" cy="27.5" r="2" fill="#2e936f" />
                <circle cx="44" cy="27.5" r="2" fill="#fab60a" />
              </svg>

              <span className="relative z-10 text-[11px] font-mono font-bold text-[#2e936f] pb-1">
                CONTINUOUS PRODUCT LOOP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. HOW WE WORK — CONNECTED 4-STAGE PRODUCT PIPELINE
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              HOW WE WORK?
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              4-Stage Product Building Framework
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              A milestone-driven engineering methodology taking your project from discovery to continuous post-launch optimization.
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

          {/* Continuous Product Loop Banner */}
          <div className="p-4 rounded-2xl bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-center max-w-2xl mx-auto flex items-center justify-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#f15e1c]">
              CONTINUOUS PRODUCT LOOP: LAUNCH &rarr; MONITOR &rarr; LEARN &rarr; IMPROVE &rarr; NEW VERSION
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PLANS / PACKAGES — EQUAL SIZED COMPARISON CARDS
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              We&apos;ve got a plan — One that&apos;s perfect for you
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Transparent Development Packages
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Select from fixed-scope scoping sprints, full-stack application builds, or dedicated engineering retainers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-3xl p-8 border-2 transition-all duration-300 flex flex-col justify-between space-y-6 hover:shadow-2xl h-full",
                  plan.isPopular
                    ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-2xl ring-2 ring-[#f15e1c]/40"
                    : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630]"
                )}
              >
                <div className="space-y-4 text-left">
                  {plan.isPopular && (
                    <span className="px-3 py-1 rounded-full bg-[#fce3d3] text-[#f15e1c] text-[10px] font-mono font-bold uppercase tracking-wider inline-block">
                      Recommended For Product Scaling
                    </span>
                  )}
                  <div>
                    <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {plan.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black font-mono text-[#f15e1c]">{plan.price}</span>
                      <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] font-mono">/ {plan.period}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#f7d7b0] dark:border-[#253630]">
                    <span className="text-[10px] font-mono font-bold text-[#f15e1c] uppercase block">
                      Package Features Included:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                        <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630]">
                  <Link href="/contact" className="block w-full">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center bg-[#f15e1c] hover:bg-[#d44e14]"
                    >
                      {plan.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
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
              Leading Arav Innovations with a commitment to engineering excellence, Aryan Sayal guides full-stack software development squads across India and the UAE to build intuitive, resilient digital products.
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
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#172420] via-[#101b17] to-[#1b2823] text-white p-10 sm:p-16 border-2 border-[#f15e1c] shadow-2xl space-y-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-[#f15e1c]/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f15e1c]/20 border border-[#f15e1c] text-xs font-mono font-bold text-[#f15e1c]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BUILD YOUR DIGITAL PRODUCT</span>
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
                  className="text-2xl sm:text-4xl font-extrabold font-display text-[#f15e1c] uppercase tracking-wider"
                >
                  {ctaWords[currentWordIdx]}
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-base sm:text-lg font-bold text-[#d3eee4]">
              Kick start a project with us today
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button3D
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                className="w-full sm:w-auto justify-center bg-[#f15e1c]"
              >
                Discuss a project
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
    </div>
  );
}
