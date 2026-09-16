"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { CEOLeadershipSection } from "@/components/services/CEOLeadershipSection";
import { BlogCardImage } from "@/components/insights/BlogCardImage";
import {
  TrendingUp,
  Code2,
  Layout,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe2,
  Zap,
  Check,
  Activity,
  Database,
  Lock,
  Cloud,
  RefreshCw,
  Eye,
  LineChart,
  FileCode,
  ShieldCheck,
  Search,
  Compass,
  BarChart3,
  Users2,
  ChevronDown,
  ArrowUpRight,
  Terminal,
  Wrench,
  GitBranch,
  Smartphone,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface WebDevPageProps {
  service: Service;
  relatedPosts?: BlogPost[];
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SystemScanTransition() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative w-full h-px my-1 overflow-hidden pointer-events-none select-none">
      <div className="w-full h-full bg-[#f7d7b0]/30 dark:bg-[#1a1a1a]" />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent shadow-[0_0_10px_#f15e1c]"
        />
      )}
    </div>
  );
}

function AnimatedDotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10 dark:opacity-15 select-none">
      <svg className="w-full h-full" width="100%" height="100%">
        <pattern
          id="webdev-dot-matrix-pattern"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#f15e1c" opacity="0.6" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#webdev-dot-matrix-pattern)" />
      </svg>
    </div>
  );
}

const keywordTags = [
  "Product Strategy",
  "UX/UI Design",
  "Full-Stack Engineering",
  "REST & GraphQL APIs",
  "Multi-Cloud",
  "Performance & Scale",
];

const experienceAreas = [
  {
    num: "01",
    title: "User Experience",
    subtitle: "Intuitive Interfaces",
    description:
      "Interfaces designed around accessibility, responsive navigation, and frictionless user flows.",
    icon: <Layout className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "Engineering",
    subtitle: "Full-Stack Architecture",
    description:
      "Reliable frontend components, backend services, API integrations, and database schemas.",
    icon: <Code2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "03",
    title: "Evolution",
    subtitle: "Scalable Infrastructure",
    description:
      "Clean codebase engineered for continuous monitoring, automated updates, and feature expansion.",
    icon: <RefreshCw className="w-5 h-5 text-[#fab60a]" />,
  },
];

const architectureFlowStages = [
  {
    id: "DISCOVER",
    num: "01",
    title: "DISCOVER",
    subtitle: "Product Strategy & Scoping",
    desc: "Business goals, target user profiles, operational workflows, and functional requirements.",
    deliverables: ["Product Vision Specification", "Workflow Requirements Map", "Architecture Blueprint"],
  },
  {
    id: "DESIGN",
    num: "02",
    title: "DESIGN",
    subtitle: "Information Architecture & UX",
    desc: "User journey maps, wireframes, interactive prototypes, and reusable component systems.",
    deliverables: ["Component Design System", "High-Fidelity Wireframes", "Accessibility Guidelines"],
  },
  {
    id: "EXPERIENCE",
    num: "03",
    title: "EXPERIENCE",
    subtitle: "Frontend Interface Engineering",
    desc: "Responsive web interfaces, micro-interactions, state management, and page speed.",
    deliverables: ["React / Next.js Component Library", "Responsive Layout Engine", "Client State Setup"],
  },
  {
    id: "APPLICATION",
    num: "04",
    title: "APPLICATION",
    subtitle: "Business Logic & Services",
    desc: "Backend services, API routes, authentication/authorization controllers, and error handling.",
    deliverables: ["API Routes", "OAuth & RBAC Controllers", "Core Domain Services"],
  },
  {
    id: "DATA",
    num: "05",
    title: "DATA",
    subtitle: "Databases & Storage",
    desc: "Relational data modeling, in-memory caching, indexing, and secure record storage.",
    deliverables: ["PostgreSQL Schema", "Redis Caching Layer", "Data Access Pipeline"],
  },
  {
    id: "INTEGRATE",
    num: "06",
    title: "INTEGRATE",
    subtitle: "Third-Party Connectors",
    desc: "Payment processing, CRM integrations, ERP connectors, and asynchronous webhooks.",
    deliverables: ["Payment Connectors", "CRM & ERP Sync", "Webhook Event Handler"],
  },
  {
    id: "DEPLOY",
    num: "07",
    title: "DEPLOY",
    subtitle: "Cloud Deployment & CI/CD",
    desc: "Containerization, automated CI/CD build pipelines, and production cloud infrastructure.",
    deliverables: ["Cloud Production Setup", "Automated CI/CD Pipeline", "Environment Config"],
  },
  {
    id: "IMPROVE",
    num: "08",
    title: "IMPROVE",
    subtitle: "Performance Telemetry",
    desc: "Telemetry monitoring, error logging, performance tuning, and feature iterations.",
    deliverables: ["Real-User Analytics", "Security & Health Logs", "Feature Roadmap"],
  },
];

const productCapabilities = [
  {
    num: "01",
    title: "Corporate Web Platforms & Portals",
    description:
      "Enterprise web platforms and corporate portals engineered for fast loading, technical SEO, and conversion retention.",
    icon: <Globe2 className="w-5 h-5 text-[#f15e1c]" />,
    techLayer: "Frontend & Content Platforms",
  },
  {
    num: "02",
    title: "Custom Software & SaaS Applications",
    description:
      "Bespoke web applications, SaaS multi-tenant platforms, internal portals, and automated workflow engines.",
    icon: <Code2 className="w-5 h-5 text-[#2e936f]" />,
    techLayer: "Full-Stack Application & SaaS",
  },
  {
    num: "03",
    title: "Mobile Application Development",
    description:
      "iOS and Android mobile platforms designed with clear user flows, offline capability, and reliable backend sync.",
    icon: <Smartphone className="w-5 h-5 text-[#fab60a]" />,
    techLayer: "iOS & Android Ecosystem",
  },
  {
    num: "04",
    title: "API & System Integration",
    description:
      "Connect applications, microservices, databases, CRM/ERP platforms, and payment services through secure API architecture.",
    icon: <Terminal className="w-5 h-5 text-[#f15e1c]" />,
    techLayer: "REST & GraphQL Gateways",
  },
];

const layeredArchitecture = [
  {
    layer: "01",
    name: "Frontend Layer",
    tech: "React / Next.js / TypeScript / Tailwind CSS",
    desc: "Component-driven interfaces engineered for accessibility, speed, and responsive cross-device consistency.",
    icon: <Layout className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    layer: "02",
    name: "Application Layer",
    tech: "Node.js / Next.js Server Components / REST & GraphQL APIs",
    desc: "Secure server-side business logic, authentication controllers, and scalable API endpoints.",
    icon: <Code2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    layer: "03",
    name: "Data Layer",
    tech: "PostgreSQL / Redis / Prisma ORM",
    desc: "Optimized relational database schemas, caching layers, and structured data queries.",
    icon: <Database className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    layer: "04",
    name: "Integration Layer",
    tech: "REST Webhooks / GraphQL / Payment Connectors / CRM Sync",
    desc: "Third-party service connections, asynchronous message queues, and bidirectional API synchronization.",
    icon: <GitBranch className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    layer: "05",
    name: "Cloud & Delivery",
    tech: "AWS / Azure / Vercel / Docker / GitHub Actions",
    desc: "Cloud infrastructure, automated build pipelines, production deployment, and monitoring.",
    icon: <Cloud className="w-5 h-5 text-[#f15e1c]" />,
  },
];

const engineeringPillars = [
  {
    title: "Performance",
    desc: "Fast client/server rendering, asset optimization, code-splitting, and Core Web Vitals speed.",
    icon: <Zap className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Accessibility",
    desc: "Interfaces designed to remain usable across screen sizes, touch inputs, and assistive technology.",
    icon: <Eye className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "Reliability",
    desc: "Clean architecture, automated validation, error monitoring, and controlled release pipelines.",
    icon: <ShieldCheck className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    title: "Security",
    desc: "Authentication setup, role-based authorization, encrypted data handling, and input validation.",
    icon: <Lock className="w-5 h-5 text-[#f15e1c]" />,
  },
];

const engagementModels = [
  {
    title: "PRODUCT BUILD",
    subtitle: "New Product Engineering",
    description: "For organizations building a new digital product from initial scoping to release.",
    bestFor: ["New Web Platforms", "Custom SaaS Applications", "Customer Portals"],
    icon: <Sparkles className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "PRODUCT TRANSFORMATION",
    subtitle: "Application Modernization",
    description: "For refactoring, updating, or modernizing existing applications and legacy platforms.",
    bestFor: ["Legacy System Refactoring", "UX/UI Modernization", "Performance Tuning"],
    icon: <RefreshCw className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "EXTENDED TEAM",
    subtitle: "Dedicated Developer Squads",
    description: "For teams needing dedicated technical capability to accelerate product delivery.",
    bestFor: ["Dedicated Full-Stack Squads", "Feature Backlog Execution", "Technical Support"],
    icon: <Users2 className="w-5 h-5 text-[#fab60a]" />,
  },
];

const whatWeMeasureList = [
  { title: "User Experience Quality", desc: "Intuitive user journeys, task completion efficiency, and interface usability.", icon: <Eye className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Performance Speed", desc: "Fast client-side rendering, asset delivery, and low page load times.", icon: <Zap className="w-5 h-5 text-[#2e936f]" /> },
  { title: "Conversion Journeys", desc: "Form completion rates, workflow velocity, and user retention.", icon: <LineChart className="w-5 h-5 text-[#fab60a]" /> },
  { title: "Application Reliability", desc: "Uptime monitoring, error-free session completion, and platform stability.", icon: <ShieldCheck className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Feature Utilization", desc: "User interaction with core tools, portal activity, and feature adoption.", icon: <Activity className="w-5 h-5 text-[#2e936f]" /> },
  { title: "Codebase Maintainability", desc: "Clean component structure, automated test coverage, and documentation.", icon: <FileCode className="w-5 h-5 text-[#fab60a]" /> },
  { title: "Operational Efficiency", desc: "Automated business workflows and reduced manual processing steps.", icon: <Wrench className="w-5 h-5 text-[#f15e1c]" /> },
];

const faqList = [
  {
    q: "What types of web applications does Arav Innovations build?",
    a: "We engineer digital products—including custom SaaS platforms, corporate web platforms, customer portals, internal workflow dashboards, content systems, and custom API-driven software.",
  },
  {
    q: "Can you improve an existing application?",
    a: "Yes. We audit and modernize existing applications through UI/UX refactoring, frontend upgrades, API integration, database optimization, and cloud migration.",
  },
  {
    q: "Do you engineer both frontend and backend?",
    a: "Yes. We operate as a full-stack digital product engineering team covering frontend user interfaces (React/Next.js), server backend logic, databases, API gateways, and cloud deployment infrastructure.",
  },
  {
    q: "Can you integrate third-party systems?",
    a: "Yes. We design custom integration pipelines connecting applications with CRM platforms (Salesforce, HubSpot), payment gateways (Stripe), ERP systems, authentication providers (OAuth/SSO), and REST/GraphQL APIs.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes. We offer post-launch optimization, feature enhancement, performance monitoring, dependency updates, and dedicated engineering squad support.",
  },
];

const internalServices = [
  { name: "IT Strategy & Implementation", href: "/services/it-strategy-implementation", icon: <Compass className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "Digital Marketing & Brand", href: "/services/digital-marketing-brand-development", icon: <TrendingUp className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Risk, Compliance & Governance", href: "/services/risk-compliance-governance", icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Audit & Improvement", href: "/services/audit-improvement", icon: <BarChart3 className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "Training & Staff Augmentation", href: "/services/training-staff-augmentation", icon: <Users2 className="w-4 h-4 text-[#fab60a]" /> },
  { name: "SEO Services", href: "/services/seo-services", icon: <Search className="w-4 h-4 text-[#2e936f]" /> },
  { name: "AI Portfolio", href: "/services/ai-portfolio", icon: <Cpu className="w-4 h-4 text-[#f15e1c]" /> },
];

export function WebDevInteractivePage({ service, relatedPosts }: WebDevPageProps) {
  const [activeFlowIdx, setActiveFlowIdx] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  const displayPosts = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const activeFlowStage = architectureFlowStages[activeFlowIdx];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c] relative">
      
      <AnimatedDotGrid />

      {/* 1. HERO */}
      <section className="relative pt-6 sm:pt-8 lg:pt-8 pb-8 sm:pb-12 lg:pb-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#000000] border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none flex flex-col justify-start">
        
        <div className="absolute inset-0 pointer-events-none hidden lg:block select-none overflow-hidden">
          <Image
            src="/images/web-dev-bg.png"
            alt="Web & Application Development Strategy"
            fill
            priority
            className="object-cover object-right opacity-95 dark:opacity-90 transition-opacity duration-500"
            sizes="(min-width: 1024px) 100vw, 1px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/80 via-45% to-transparent dark:from-[#000000] dark:via-[#000000]/80 dark:via-45% dark:to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/20 via-transparent to-[#FFFDF9]/60 dark:from-[#000000]/20 dark:via-transparent dark:to-[#000000]/60 pointer-events-none" />
        </div>

        <AnimatedDotGrid />

        <div className="max-w-[1536px] mx-auto w-full space-y-4 sm:space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            
            <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5 text-left max-w-2xl">
              
              <AnimatedSection delay={0.05} className="space-y-2">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "Web & Application Development" },
                  ]}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#0a0a0a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c] shadow-2xs cursor-default transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#f15e1c] animate-pulse" />
                  <span>CUSTOM WEB &amp; MOBILE APPLICATION DEVELOPMENT</span>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-[1.15] text-[#1b2823] dark:text-[#ffffff]">
                  Web &amp; Custom <span className="text-[#f15e1c]">Application Development</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.12} className="w-full lg:hidden my-2">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-lg">
                  <Image
                    src="/images/web-dev-mobile-hero.png"
                    alt="Web & Application Development Strategy"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.14} className="space-y-2">
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  We engineer high-performance web platforms, custom applications, and mobile products designed around business workflows. Fast, secure, accessible, and built to scale with your organization.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.16} className="pt-1 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <MagneticButton>
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                      className="shadow-md shadow-[#f15e1c]/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Build Digital Product
                    </Button3D>
                  </MagneticButton>
                </Link>

                <Link href="#capabilities">
                  <MagneticButton>
                    <Button3D variant="outline" size="md" className="hover:-translate-y-0.5 transition-all duration-300">
                      Explore Capabilities
                    </Button3D>
                  </MagneticButton>
                </Link>
              </AnimatedSection>

              <AnimatedSection delay={0.18} className="pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {keywordTags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.04, y: -1 }}
                      transition={{ duration: 0.2 }}
                      className="px-3 py-1 rounded-lg bg-[#fefaf5]/90 dark:bg-[#0a0a0a]/90 border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] hover:border-[#f15e1c]/40 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 h-full min-h-[260px]" />
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 2. VISUAL BREAK 1 */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <AnimatedSection delay={0.08} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden bg-white dark:bg-[#080808] shadow-md hover:shadow-xl hover:border-[#f15e1c]/50 transition-all duration-300 group"
                >
                  <Image
                    src="/images/web-app-main-1.png"
                    alt="Arav Innovations Web Application Architecture"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-7 space-y-4 text-left">
              <AnimatedSection delay={0.12} className="space-y-2">
                <Badge variant="secondary" size="md">
                  DIGITAL PRODUCT ENGINEERING
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  From User Journey to Business-Critical Application
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  Your digital product is the operational backbone your customers use and your team relies on. We unify frontend experience, backend microservices, database architecture, and deployment pipelines into a single development lifecycle.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.16}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {experienceAreas.map((area) => (
                    <motion.div
                      key={area.num}
                      whileHover={{ y: -2 }}
                      className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/40 space-y-1 transition-all duration-200 cursor-default group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#f15e1c]">
                        {area.icon}
                        <span>{area.title}</span>
                      </div>
                      <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                        {area.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 3. CAPABILITIES */}
      <section id="capabilities" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3 text-left">
              <Badge variant="secondary" size="md">
                ENGINEERING SCOPE
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Product Engineering Capabilities
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
                End-to-end development services for web platforms, multi-tenant SaaS products, native/cross-platform mobile apps, and integration infrastructure.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {productCapabilities.map((cap, idx) => (
              <AnimatedSection key={cap.num} delay={idx * 0.06} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-6 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:shadow-lg hover:border-[#f15e1c] transition-all duration-300 flex flex-col justify-between text-left group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-[#f15e1c] px-2.5 py-0.5 rounded-md bg-[#fce3d3] dark:bg-[#161616] border border-[#f15e1c]/30">
                        {cap.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {cap.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {cap.description}
                    </p>
                  </div>

                  <div className="h-1 w-0 group-hover:w-full bg-[#f15e1c] transition-all duration-300 rounded-full mt-4" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 4. ARCHITECTURE FLOW PIPELINE */}
      <section id="architecture-flow" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                CONNECTED ARCHITECTURE
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                8-Stage Product Architecture Lifecycle
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Select any stage below to explore how discovery, design, frontend, application logic, data, integrations, and deployment link together.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="rounded-2xl sm:rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg p-4 sm:p-6 lg:p-8 space-y-6">
              
              <div className="grid grid-cols-2 xs:grid-cols-4 lg:grid-cols-8 gap-2 relative">
                {architectureFlowStages.map((stg, idx) => {
                  const isSelected = activeFlowIdx === idx;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setActiveFlowIdx(idx)}
                      className={cn(
                        "py-2.5 px-2 rounded-xl text-xs font-extrabold font-display transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 select-none relative z-10 border text-center",
                        isSelected
                          ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-sm"
                          : "bg-white dark:bg-[#000000] text-[#4a5c55] dark:text-[#d3eee4] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:bg-[#f15e1c]/5"
                      )}
                    >
                      <span className={cn("font-mono text-[10px]", isSelected ? "text-white/80" : "text-[#f15e1c]")}>
                        {stg.num}.
                      </span>
                      <span className="truncate w-full">{stg.title}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFlowStage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div className="lg:col-span-7 space-y-3 text-left">
                    <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {activeFlowStage.num} &bull; {activeFlowStage.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {activeFlowStage.subtitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {activeFlowStage.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-2.5 text-left border-t lg:border-t-0 lg:border-l border-[#f7d7b0]/60 dark:border-[#1a1a1a] pt-4 lg:pt-0 lg:pl-6">
                    <span className="text-xs font-mono font-bold uppercase text-[#2e936f] block">
                      Key Deliverables:
                    </span>
                    <div className="space-y-2">
                      {activeFlowStage.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff] p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* 5. LAYERED ARCHITECTURE & PILLARS */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                TECHNICAL STACK
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Modern Technology Architecture
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Clean separation of concerns across frontend, application logic, database, integrations, and cloud infrastructure.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {layeredArchitecture.map((lyr, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 sm:p-6 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-md transition-all duration-300 space-y-2.5 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2e936f] uppercase">
                      LAYER {lyr.layer}
                    </span>
                    <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-105 transition-transform">
                      {lyr.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                    {lyr.name}
                  </h3>
                  <p className="text-xs font-mono text-[#f15e1c] font-bold">
                    {lyr.tech}
                  </p>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                    {lyr.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <div className="pt-4 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {engineeringPillars.map((plr, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#fefaf5] dark:bg-[#121212] border border-[#f7d7b0] shrink-0">
                    {plr.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">{plr.title}</h4>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-normal">{plr.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* 6. ENGAGEMENT MODELS */}
      <section id="engagement-models" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                ENGAGEMENT MODELS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Flexible Product Delivery Models
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Choose how we collaborate—from end-to-end product builds to legacy application modernization or dedicated developer squads.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {engagementModels.map((model, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.06} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-6 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                        {model.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-[#f15e1c]">{model.subtitle}</span>
                    </div>
                    <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                      {model.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {model.description}
                    </p>

                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-mono font-bold uppercase text-[#2e936f] block">Best For:</span>
                      {model.bestFor.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                          <Check className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a]">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#f15e1c] group-hover:underline"
                    >
                      <span>Discuss Engagement</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 7. WHAT WE MEASURE */}
      <section id="what-we-measure" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                ENGINEERING METRICS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Product Quality &amp; Performance Indicators
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We measure engineering success through user experience quality, application speed, uptime, and workflow efficiency.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {whatWeMeasureList.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-md transition-all duration-300 space-y-2.5 text-left group"
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 8. BLOGS & INSIGHTS */}
      <section id="insights" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8">
          
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
              <div className="space-y-2 text-left">
                <Badge variant="secondary" size="md">
                  PRODUCT INSIGHTS
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                  Web Engineering &amp; SaaS Insights
                </h2>
              </div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#f15e1c] hover:underline shrink-0 group"
              >
                <span>Explore All Insights</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {displayPosts.map((post, idx) => (
              <AnimatedSection key={post.slug} delay={idx * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="w-full mb-2 rounded-xl overflow-hidden border border-[#f7d7b0]/60">
                      <BlogCardImage post={post} aspectRatio="aspect-video" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#2e936f]">
                      <span className="uppercase tracking-wider">{post.category}</span>
                      <span>{post.publishedAt || post.dateFormatted}</span>
                    </div>
                    <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed line-clamp-3 font-medium">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#1a1a1a]">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#f15e1c] group-hover:underline"
                    >
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* CEO LEADERSHIP */}
      <CEOLeadershipSection serviceContext="His perspective shapes software architecture that supports long-term growth." />

      <SystemScanTransition />

      {/* 9. FAQ */}
      <section id="faq" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          
          <AnimatedSection>
            <div className="text-center space-y-3">
              <Badge variant="secondary" size="md">
                QUESTIONS &amp; ANSWERS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <AnimatedSection key={idx} delay={idx * 0.04}>
                  <div className="rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/60 overflow-hidden transition-all shadow-xs">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group select-none"
                    >
                      <span className="text-sm sm:text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-[#f15e1c] transition-transform duration-300 shrink-0",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="px-5 pb-5 text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a] pt-3"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 10. CONNECTED ECOSYSTEM */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-4 sm:space-y-6 text-left">
          
          <AnimatedSection>
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider block">
                ARAV SERVICE ECOSYSTEM
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                Connected Enterprise Services
              </h3>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {internalServices.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04}>
                <Link
                  href={item.href}
                  className="p-3.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer min-h-[56px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-105 transition-all shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#f15e1c] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* FINAL CTA */}
      <section id="contact" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-8 sm:p-14 border-2 border-[#fab60a] shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>BUILD YOUR DIGITAL PRODUCT WITH ARAV</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Turn Your Product Architecture Into Reality
              </h2>

              <p className="text-xs sm:text-sm font-medium text-white/90 leading-relaxed max-w-2xl mx-auto">
                Discuss your application requirements, technical stack options, and product roadmap with our engineering leads.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/contact">
                <MagneticButton>
                  <Button3D
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                    className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Build My Product
                  </Button3D>
                </MagneticButton>
              </Link>

              <Link href="/services">
                <MagneticButton>
                  <Button3D variant="outline" size="md" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
                    Explore Services
                  </Button3D>
                </MagneticButton>
              </Link>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/20 flex flex-wrap items-center justify-center gap-4 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Source Code &amp; IP Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Full-Stack Engineering &amp; CI/CD Pipelines
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Strategy &amp; Engineering Teams in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}

export default WebDevInteractivePage;
