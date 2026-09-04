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
import { BlogCardImage } from "@/components/insights/BlogCardImage";
import {
  TrendingUp,
  Code2,
  Layout,
  ShoppingBag,
  Cpu,
  Server,
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
  Layers,
  Search,
  Compass,
  BarChart3,
  Users2,
  ChevronDown,
  ArrowUpRight,
  Terminal,
  Workflow,
  Wrench,
  GitBranch,
  Smartphone,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface WebDevPageProps {
  service: Service;
  relatedPosts?: BlogPost[];
}

// -----------------------------------------------------------------------------
// 1. Scroll-Triggered Section Wrapper Component (Optimized Mobile Viewport Entry)
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// 2. System Scan Transition Line (Laser Beam Sweep Effect)
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// 3. Dot Grid Pattern Background
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Data Collections for Digital Product Engineering Page
// -----------------------------------------------------------------------------

// Hero Keyword Tags
const keywordTags = [
  "Product Strategy",
  "UX/UI Design",
  "Full-Stack Engineering",
  "REST & GraphQL APIs",
  "Multi-Cloud",
  "Performance & Scale",
];

// Hero Visual Architecture Flow Nodes (USER -> UI -> APPLICATION -> API -> DATA -> CLOUD)
const heroProductNodes = [
  { id: "USER", label: "USER", desc: "End Users & Journeys", icon: <Users2 className="w-4 h-4 text-[#f15e1c]" /> },
  { id: "UI", label: "UI LAYER", desc: "Next.js & Responsive Interfaces", icon: <Layout className="w-4 h-4 text-[#2e936f]" /> },
  { id: "APP", label: "APPLICATION", desc: "Business Logic & Workflows", icon: <Code2 className="w-4 h-4 text-[#fab60a]" /> },
  { id: "API", label: "API GATEWAY", desc: "REST & GraphQL Integrations", icon: <Terminal className="w-4 h-4 text-[#f15e1c]" /> },
  { id: "DATA", label: "DATA LAYER", desc: "PostgreSQL, Kafka & Redis", icon: <Database className="w-4 h-4 text-[#2e936f]" /> },
  { id: "CLOUD", label: "CLOUD & DEPLOY", desc: "AWS/Azure & CI/CD Pipelines", icon: <Cloud className="w-4 h-4 text-[#fab60a]" /> },
];

// Section 1: 3 Concise Supporting Areas (Experience, Engineering, Evolution)
const experienceAreas = [
  {
    num: "01",
    title: "Experience",
    subtitle: "User-Centered Interfaces",
    description:
      "Interfaces designed around real users, intuitive journeys, accessibility standards, and high-conversion interaction flows.",
    icon: <Layout className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "Engineering",
    subtitle: "Robust Full-Stack Foundations",
    description:
      "Reliable frontend, backend, APIs, databases, third-party integrations, and scalable application architecture.",
    icon: <Code2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "03",
    title: "Evolution",
    subtitle: "Built to Scale & Adapt",
    description:
      "A resilient product foundation engineered to be monitored, optimized, security-hardened, and extended as business requirements expand.",
    icon: <RefreshCw className="w-5 h-5 text-[#fab60a]" />,
  },
];

// Section 2: Primary Interactive Visual (8 Connected Architecture Stages)
const architectureFlowStages = [
  {
    id: "DISCOVER",
    num: "01",
    title: "DISCOVER",
    subtitle: "Strategy & Requirements Scoping",
    desc: "Business goals, target user profiles, operational workflows, functional requirements, and technical constraints.",
    deliverables: ["Product Vision Matrix", "Workflow Requirements Map", "Tech Stack Feasibility Blueprint"],
  },
  {
    id: "DESIGN",
    num: "02",
    title: "DESIGN",
    subtitle: "Information Architecture & UX",
    desc: "Information architecture, user journey maps, wireframes, interactive prototypes, and reusable design systems.",
    deliverables: ["Figma Design System", "High-Fidelity Prototypes", "Accessibility (WCAG) Guidelines"],
  },
  {
    id: "EXPERIENCE",
    num: "03",
    title: "EXPERIENCE",
    subtitle: "Frontend Interface Engineering",
    desc: "Responsive web interfaces, design system components, micro-interactions, client state management, and page performance.",
    deliverables: ["React / Next.js Component Library", "Responsive Layout Engine", "Client State Architecture"],
  },
  {
    id: "APPLICATION",
    num: "04",
    title: "APPLICATION",
    subtitle: "Core Business Logic & Services",
    desc: "Application backend, API routes, authentication/authorization (RBAC/SSO), core business logic, and error handling.",
    deliverables: ["Serverless API Routes", "RBAC & OAuth Authentication", "Domain Logic Services"],
  },
  {
    id: "DATA",
    num: "05",
    title: "DATA",
    subtitle: "Database & Information Pipelines",
    desc: "Relational and document databases, data modeling, caching strategies, analytics dashboards, and secure storage.",
    deliverables: ["PostgreSQL / Redis Schema", "Data Access Layer (ORM)", "Analytical Query Engines"],
  },
  {
    id: "INTEGRATE",
    num: "06",
    title: "INTEGRATE",
    subtitle: "Third-Party & Ecosystem Connectors",
    desc: "Third-party APIs, payment gateways, CRM/ERP connectors, webhooks, event-driven architectures, and external services.",
    deliverables: ["Stripe / Payment Connectors", "Salesforce / Hubspot CRM Sync", "Webhook Event Bus"],
  },
  {
    id: "DEPLOY",
    num: "07",
    title: "DEPLOY",
    subtitle: "Cloud Infrastructure & Releases",
    desc: "Cloud hosting environments, containerization, Infrastructure-as-Code (Terraform), CI/CD pipelines, and zero-downtime releases.",
    deliverables: ["AWS / Vercel Production Infrastructure", "Automated CI/CD Workflows", "Environment Configuration"],
  },
  {
    id: "IMPROVE",
    num: "08",
    title: "IMPROVE",
    subtitle: "Continuous Performance & Telemetry",
    desc: "Application telemetry monitoring, error logging, performance tuning, security patches, and continuous feature iterations.",
    deliverables: ["Real-User Telemetry Dashboards", "Security Audit Reports", "Continuous Feature Backlog"],
  },
];

// Section 3: 6 Capability Areas
const productCapabilities = [
  {
    num: "01",
    title: "High-Performance Websites",
    description:
      "Corporate websites, marketing platforms, content-driven experiences and conversion-focused digital experiences built for speed and clarity.",
    icon: <Globe2 className="w-7 h-7 text-[#f15e1c] stroke-[2]" />,
    techLayer: "Frontend & Content System",
  },
  {
    num: "02",
    title: "Web Applications",
    description:
      "Customer portals, internal platforms, interactive dashboards, workflow applications and enterprise business systems.",
    icon: <Code2 className="w-7 h-7 text-[#2e936f] stroke-[2]" />,
    techLayer: "Full-Stack Application Layer",
  },
  {
    num: "03",
    title: "E-Commerce Experiences",
    description:
      "Product discovery, catalogues, checkout journeys, payment gateway integrations and scalable custom commerce experiences.",
    icon: <ShoppingBag className="w-7 h-7 text-[#fab60a] stroke-[2]" />,
    techLayer: "Commerce & Payment Gateway",
  },
  {
    num: "04",
    title: "Custom Business Applications",
    description:
      "Software engineered around specific operational workflows instead of forcing your business into rigid off-the-shelf platforms.",
    icon: <Wrench className="w-7 h-7 text-[#f15e1c] stroke-[2]" />,
    techLayer: "Domain Logic & Workflows",
  },
  {
    num: "05",
    title: "API & System Integration",
    description:
      "Connect applications, services, data sources and third-party platforms through reliable, well-documented integration architecture.",
    icon: <Terminal className="w-7 h-7 text-[#2e936f] stroke-[2]" />,
    techLayer: "REST & GraphQL Gateways",
  },
  {
    num: "06",
    title: "Progressive Web Experiences",
    description:
      "Where appropriate, create installable, app-like web experiences with capabilities such as offline support and background operation.",
    icon: <Cpu className="w-7 h-7 text-[#fab60a] stroke-[2]" />,
    techLayer: "PWA & Service Worker Layer",
  },
  {
    num: "07",
    title: "Android Applications",
    description:
      "Native or cross-platform Android application development for business, customer and operational use cases.",
    icon: <Smartphone className="w-7 h-7 text-[#2e936f] stroke-[2]" />,
    techLayer: "Android & Mobile Ecosystem",
  },
  {
    num: "08",
    title: "iPhone / iOS Applications",
    description:
      "Professional iPhone and iOS application development with responsive, user-focused experiences.",
    icon: <Smartphone className="w-7 h-7 text-[#f15e1c] stroke-[2]" />,
    techLayer: "iOS & Apple Ecosystem",
  },
];

// Section 4: Layered Engineering Architecture
const layeredArchitecture = [
  {
    layer: "01",
    name: "Frontend Layer",
    tech: "React / Next.js / TypeScript / Tailwind CSS / Responsive UI / Design Systems",
    desc: "Component-driven user interfaces designed for accessibility, high performance, and responsive cross-device consistency.",
    icon: <Layout className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    layer: "02",
    name: "Application Layer",
    tech: "Node.js / Next.js Server Components / REST & GraphQL APIs / OAuth & RBAC / Business Logic",
    desc: "Secure server-side business logic, authentication controllers, role-based authorization, and scalable API endpoints.",
    icon: <Code2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    layer: "03",
    name: "Data Layer",
    tech: "PostgreSQL / Redis / Prisma ORM / Data Modeling / Structured Search & Storage",
    desc: "Optimized relational database schemas, in-memory caching layers, structured indexing, and analytical data queries.",
    icon: <Database className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    layer: "04",
    name: "Integration Layer",
    tech: "REST Webhooks / GraphQL / Payment APIs (Stripe) / CRM & ERP Connectors / Webhooks Bus",
    desc: "Robust third-party service connections, asynchronous message queues, and bidirectional API synchronization.",
    icon: <GitBranch className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    layer: "05",
    name: "Cloud & Delivery",
    tech: "AWS / Azure / Vercel / Docker / Terraform (IaC) / GitHub Actions CI/CD / Monitoring",
    desc: "Reliable cloud infrastructure, automated build pipelines, production deployment, and 24/7 telemetry monitoring.",
    icon: <Cloud className="w-5 h-5 text-[#f15e1c]" />,
  },
];

// Section 5: Fast, Accessible, Resilient (4 Focus Areas)
const engineeringPillars = [
  {
    title: "Performance",
    desc: "Efficient client/server rendering, asset optimization, code-splitting, and responsive user experiences.",
    icon: <Zap className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Accessibility",
    desc: "Interfaces designed to remain usable and navigable across devices, screen sizes, and input methods (WCAG principles).",
    icon: <Eye className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "Reliability",
    desc: "Clear system architecture, automated test validation, error monitoring, and controlled deployment releases.",
    icon: <ShieldCheck className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    title: "Security",
    desc: "Security-conscious authentication, role-based authorization, encrypted data handling, and input validation.",
    icon: <Lock className="w-5 h-5 text-[#f15e1c]" />,
  },
];

// Section 6: Animated Product Loop (BUILD -> LAUNCH -> OBSERVE -> LEARN -> IMPROVE -> BUILD)
const productImprovementLoop = [
  { step: "01", name: "BUILD", desc: "Develop features according to architecture blueprint & validated user journeys." },
  { step: "02", name: "LAUNCH", desc: "Deploy controlled releases into production cloud environment with automated validation." },
  { step: "03", name: "OBSERVE", desc: "Monitor real-user telemetry, system performance, error logs, and user behavior." },
  { step: "04", name: "LEARN", desc: "Gather user feedback, identify operational friction, and evaluate conversion analytics." },
  { step: "05", name: "IMPROVE", desc: "Prioritize product enhancements, security updates, and performance optimizations for the next release." },
];

// Section 7: 6-Stage Process (From First Conversation to Production)
const productDeliveryProcess = [
  {
    step: "01",
    title: "Understand",
    detail: "Define the business problem, target users, operational workflows, and commercial success criteria.",
    outcome: "Product direction & clear requirements specification.",
  },
  {
    step: "02",
    title: "Architect",
    detail: "Define the user experience flows, technical system architecture, data models, and integration approach.",
    outcome: "Detailed technical blueprint & engineering roadmap.",
  },
  {
    step: "03",
    title: "Design",
    detail: "Translate requirements into user journeys, wireframes, interactive prototypes, and reusable design patterns.",
    outcome: "Validated product experience & component design system.",
  },
  {
    step: "04",
    title: "Engineer",
    detail: "Build the frontend, backend APIs, data pipelines, third-party integrations, and cloud infrastructure.",
    outcome: "Working, fully integrated digital product codebase.",
  },
  {
    step: "05",
    title: "Validate",
    detail: "Test end-to-end functionality, responsiveness, accessibility, performance, and security controls.",
    outcome: "Release-ready digital product candidate.",
  },
  {
    step: "06",
    title: "Launch & Evolve",
    detail: "Deploy into production, observe real-user telemetry, maintain systems, and continuously improve.",
    outcome: "Live product & continuous improvement roadmap.",
  },
];

// Section 8: 3 Engagement Models
const engagementModels = [
  {
    title: "PRODUCT BUILD",
    subtitle: "New Product Engineering",
    description: "For businesses building a new digital product from the ground up.",
    bestFor: ["New Web Platforms", "MVPs & Custom SaaS", "Customer Portals", "Custom Digital Products"],
    icon: <Sparkles className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "PRODUCT TRANSFORMATION",
    subtitle: "Application Modernization",
    description: "For improving, refactoring, or modernizing an existing application or legacy web experience.",
    bestFor: ["Legacy System Refactoring", "UX & UI Modernization", "Performance Optimization", "Architecture Upgrades"],
    icon: <RefreshCw className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "EXTENDED ENGINEERING TEAM",
    subtitle: "Dedicated Developer Squads",
    description: "For organizations that need additional technical capability to accelerate product delivery.",
    bestFor: ["Dedicated Developers", "Product Engineering Squads", "Ongoing Feature Delivery", "Specialized Tech Support"],
    icon: <Users2 className="w-5 h-5 text-[#fab60a]" />,
  },
];

// Section 9: What We Measure (Verified Engineering Indicators)
const whatWeMeasureList = [
  { title: "User Experience", desc: "Intuitive user journeys, Task completion efficiency, and interface usability.", icon: <Eye className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Performance", desc: "Client-side rendering speed, asset optimization, and Core Web Vitals.", icon: <Zap className="w-5 h-5 text-[#2e936f]" /> },
  { title: "Conversion Journeys", desc: "Form completion rates, checkout velocity, and lead capture efficiency.", icon: <LineChart className="w-5 h-5 text-[#fab60a]" /> },
  { title: "Application Reliability", desc: "Error-free session execution, uptime monitoring, and system stability.", icon: <ShieldCheck className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Feature Adoption", desc: "User engagement with key features, portal activity, and workflow usage.", icon: <Activity className="w-5 h-5 text-[#2e936f]" /> },
  { title: "Technical Quality", desc: "Clean modular codebase, test coverage, and documentation integrity.", icon: <FileCode className="w-5 h-5 text-[#fab60a]" /> },
  { title: "Operational Efficiency", desc: "Automated business workflows, reduced manual processes, and staff time savings.", icon: <Wrench className="w-5 h-5 text-[#f15e1c]" /> },
];

// Section 11: 5 FAQ Items
const faqList = [
  {
    q: "What types of web applications does Arav Innovations build?",
    a: "We engineer a wide range of digital products—including custom SaaS platforms, enterprise customer portals, internal workflow dashboards, content platforms, high-converting corporate websites, and custom API-driven business software.",
  },
  {
    q: "Can you improve an existing website or application?",
    a: "Yes. We frequently audit and modernize existing applications. Our product transformation work ranges from UI/UX refactoring and frontend modernization to backend performance tuning, API integration, and cloud migration.",
  },
  {
    q: "Do you build both frontend and backend?",
    a: "Yes. We operate as a full-stack digital product engineering team. We handle the entire engineering lifecycle—frontend user interfaces (React/Next.js), server backend logic, databases, API gateways, and cloud deployment infrastructure.",
  },
  {
    q: "Can you integrate third-party systems?",
    a: "Yes. We design custom integration architectures to connect your application with CRM platforms (Salesforce, HubSpot), payment gateways (Stripe), ERP systems, authentication providers (OAuth/SSO), and custom REST/GraphQL APIs.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. Launch is only a milestone in the product lifecycle. We offer post-launch optimization, continuous feature development, performance monitoring, dependency updates, and dedicated engineering squad support.",
  },
];

// Service Ecosystem Links
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
  const shouldReduceMotion = useReducedMotion();
  const [activeHeroNodeIdx, setActiveHeroNodeIdx] = React.useState<number>(1);
  const [activeFlowIdx, setActiveFlowIdx] = React.useState<number>(0);
  const [activeCapIdx, setActiveCapIdx] = React.useState<number | null>(0);
  const [activeLoopIdx, setActiveLoopIdx] = React.useState<number>(0);
  const [activeProcessIdx, setActiveProcessIdx] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  // Dynamic Blog Selection
  const displayPosts = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const activeFlowStage = architectureFlowStages[activeFlowIdx];
  const activeProcessStage = productDeliveryProcess[activeProcessIdx];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c] relative">
      
      {/* Background Dot Grid Matrix Pattern */}
      <AnimatedDotGrid />

      {/* =========================================================================
          HERO SECTION — DIGITAL PRODUCT ENGINEERING
          ========================================================================= */}
      <section className="relative pt-3 sm:pt-5 lg:pt-6 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none">
        {/* Ambient Pulsing Background Glows */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -12, 0], opacity: [0.25, 0.35, 0.25] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-radial from-[#f15e1c]/15 via-transparent to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-radial from-[#2e936f]/12 via-transparent to-transparent blur-3xl rounded-full" />
        </motion.div>

        <div className="max-w-[1536px] mx-auto w-full space-y-6 sm:space-y-8 relative z-10">
          
          {/* 2-Column Hero Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: HERO COPY */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-5 text-left">
              
              {/* Breadcrumb & Eyebrow Badge */}
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
                  <span>DIGITAL PRODUCT ENGINEERING</span>
                </motion.div>
              </AnimatedSection>

              {/* Main H1 Headline & Supporting Text */}
              <AnimatedSection delay={0.1} className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display tracking-tight leading-[1.12] text-[#1b2823] dark:text-[#ffffff]">
                  Build Digital Products That{" "}
                  <span className="text-[#f15e1c]">Work as Hard as Your Business</span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  We design and engineer high-performance websites, web applications, and digital products around real user journeys, business workflows, and long-term scalability.
                </p>
              </AnimatedSection>

              {/* CTA Buttons */}
              <AnimatedSection delay={0.15} className="pt-1 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <MagneticButton>
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                      className="shadow-md shadow-[#f15e1c]/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Build My Digital Product
                    </Button3D>
                  </MagneticButton>
                </Link>

                <Link href="#experience-engineering">
                  <MagneticButton>
                    <Button3D variant="outline" size="md" className="hover:-translate-y-0.5 transition-all duration-300">
                      Explore Our Approach
                    </Button3D>
                  </MagneticButton>
                </Link>
              </AnimatedSection>

              {/* Keywords Bar */}
              <AnimatedSection delay={0.2} className="pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {keywordTags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="px-2.5 py-1 rounded-lg bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] text-[11px] font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] hover:border-[#f15e1c]/40 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE HERO PRODUCT ARCHITECTURE VISUAL (USER -> UI -> APP -> API -> DATA -> CLOUD) */}
            <div className="lg:col-span-6 xl:col-span-7 w-full flex items-center justify-center">
              <AnimatedSection delay={0.15} className="w-full">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl space-y-6 relative overflow-hidden">
                  
                  <div className="flex items-center justify-between border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#f15e1c]" />
                      <span className="text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff] uppercase tracking-wider">
                        PRODUCT ARCHITECTURE FLOW
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#2e936f] font-bold">LIVE SYSTEM MAP</span>
                  </div>

                  {/* Connected 6-Node Architecture Map */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative">
                    {heroProductNodes.map((node, idx) => {
                      const isHovered = activeHeroNodeIdx === idx;
                      return (
                        <motion.div
                          key={node.id}
                          onMouseEnter={() => setActiveHeroNodeIdx(idx)}
                          whileHover={{ scale: 1.04, y: -2 }}
                          className={cn(
                            "p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-1.5 text-left relative overflow-hidden",
                            isHovered
                              ? "bg-white dark:bg-[#121212] border-[#f15e1c] shadow-md ring-1 ring-[#f15e1c]/30"
                              : "bg-white/60 dark:bg-[#050505] border-[#f7d7b0]/60 dark:border-[#1a1a1a]"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="p-1.5 rounded-lg bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                              {node.icon}
                            </div>
                            <span className="text-[10px] font-mono font-bold text-[#f15e1c]">
                              0{idx + 1}
                            </span>
                          </div>
                          <div className="font-mono text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">
                            {node.label}
                          </div>
                          <div className="text-[10px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-tight line-clamp-1">
                            {node.desc}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Active Node Detail Card */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] flex items-center justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono font-bold text-[#2e936f] uppercase block">
                        HIGHLIGHTED NODE: {heroProductNodes[activeHeroNodeIdx].label}
                      </span>
                      <p className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">
                        {heroProductNodes[activeHeroNodeIdx].desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#f15e1c] font-bold shrink-0">
                      <span>CONNECTED</span>
                      <CheckCircle2 className="w-4 h-4 text-[#2e936f]" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 1 — EDITORIAL SPLIT: MAIN IMAGE 1 + INTRODUCTORY CONTENT
          ========================================================================= */}
      <section id="experience-engineering" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto w-full space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: INTRODUCTORY TEXT (~45% width) */}
            <div className="lg:col-span-5 space-y-6 text-left order-2 lg:order-1">
              <AnimatedSection delay={0.08} className="space-y-4">
                <Badge variant="secondary" size="md">
                  DIGITAL PRODUCT ENGINEERING
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  From Digital Experience to Business-Critical Product
                </h2>
                <p className="text-base sm:text-lg text-[#1b2823] dark:text-[#ffffff] font-bold leading-snug">
                  Your digital product is the operational backbone your customers use and your teams rely on.
                </p>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  Arav Innovations unifies UX strategy, Next.js frontend, microservices APIs, database architecture, and automated CI/CD deployment into a single engineering lifecycle designed to perform at scale.
                </p>
              </AnimatedSection>

              {/* 3 Crisp Supporting Capability Cards */}
              <AnimatedSection delay={0.14} className="space-y-3.5 pt-1">
                {experienceAreas.map((area) => (
                  <motion.div
                    key={area.num}
                    whileHover={{ x: 4 }}
                    className="p-4 sm:p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] transition-all duration-200 flex items-start gap-4 text-left group shadow-xs"
                  >
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                      {area.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm sm:text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                          {area.title}
                        </span>
                        <span className="text-xs font-mono text-[#2e936f] font-bold">
                          ({area.subtitle})
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: MAIN IMAGE 1 (~55% width) */}
            <div className="lg:col-span-7 w-full flex items-center justify-center order-1 lg:order-2">
              <AnimatedSection delay={0.12} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full rounded-2xl sm:rounded-3xl border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden bg-[#fefaf5] dark:bg-[#0a0a0a] shadow-lg hover:shadow-2xl hover:border-[#f15e1c]/50 transition-all duration-300 group"
                >
                  <Image
                    src="/images/web-app-main-1.png"
                    alt="Arav Innovations Digital Product Engineering & Web Application Architecture"
                    width={1200}
                    height={800}
                    priority
                    className="w-full h-auto max-w-full object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 2 — PRIMARY INTERACTIVE VISUAL: ANIMATED ARCHITECTURE FLOW (8 STAGES)
          ========================================================================= */}
      <section id="architecture-flow" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                CONNECTED ARCHITECTURE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                One Product. Every Layer Connected.
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Hover or click any stage below to explore how discovery, design, experience, application logic, data, integrations, and deployment link together.
              </p>
            </div>
          </AnimatedSection>

          {/* 8-Stage Architecture Selector Container */}
          <AnimatedSection delay={0.1}>
            <div className="rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl p-6 sm:p-10 space-y-8">
              
              {/* 8-Stage Selector Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 relative">
                {architectureFlowStages.map((stg, idx) => {
                  const isSelected = activeFlowIdx === idx;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setActiveFlowIdx(idx)}
                      onMouseEnter={() => setActiveFlowIdx(idx)}
                      className={cn(
                        "relative py-3 px-2 rounded-2xl text-[11px] font-extrabold font-display transition-all duration-250 cursor-pointer flex flex-col items-center justify-center gap-1 select-none z-10",
                        isSelected
                          ? "text-white shadow-md"
                          : "bg-white dark:bg-[#000000] text-[#4a5c55] dark:text-[#d3eee4] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:bg-[#f15e1c]/5"
                      )}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeArchitectureStage"
                          className="absolute inset-0 bg-[#f15e1c] rounded-2xl shadow-md shadow-[#f15e1c]/20 z-[-1]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="font-mono text-[9px] opacity-80">{stg.num}.</span>
                      <span className="truncate max-w-full">{stg.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Flow Stage Detail Display Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFlowStage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-7 space-y-3 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                        STAGE {activeFlowStage.num} &bull; {activeFlowStage.title}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {activeFlowStage.subtitle}
                    </h3>
                    <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {activeFlowStage.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-3 text-left">
                    <span className="text-xs font-mono font-bold uppercase text-[#2e936f] block">
                      Core Stage Output Deliverables:
                    </span>
                    <div className="space-y-2">
                      {activeFlowStage.deliverables.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff] p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 3 — 6 CLEAN INTERACTIVE CAPABILITY AREAS
          ========================================================================= */}
      <section id="capabilities" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                CAPABILITIES
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Digital Products Built Around Real Business Needs
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Structured engineering capabilities designed for corporate platforms, workflow web applications, custom business tools, and commerce ecosystems.
              </p>
            </div>
          </AnimatedSection>

          {/* 6 Capabilities Grid (with 3D TiltCard Effect) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCapabilities.map((cap, idx) => (
              <AnimatedSection key={cap.num} delay={idx * 0.06}>
                <TiltCard maxTilt={5} scale={1.01} glare={true} className="h-full">
                  <div
                    onMouseEnter={() => setActiveCapIdx(idx)}
                    className={cn(
                      "h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0a0a0a] border transition-all duration-300 space-y-5 flex flex-col justify-between group relative overflow-hidden text-left shadow-md hover:shadow-2xl",
                      activeCapIdx === idx
                        ? "border-[#f15e1c] ring-2 ring-[#f15e1c]/30"
                        : "border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]"
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#f15e1c] px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#161616] border border-[#f15e1c]/30">
                          {cap.num}
                        </span>
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:border-[#f15e1c] transition-all duration-300">
                          {React.cloneElement(cap.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" })}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug break-words">
                          {cap.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono font-extrabold text-[#2e936f] uppercase tracking-wider">
                          {cap.techLayer}
                        </p>
                      </div>
                      <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                        {cap.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] flex items-center justify-between text-xs font-mono font-extrabold uppercase tracking-wider text-[#f15e1c]">
                      <span>Explore Capability</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          EDITORIAL VISUAL BREAK 2: SECOND IMAGE + INTEGRATION ARCHITECTURE
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#FFFDF9] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: SECOND IMAGE (~55% width) */}
            <div className="lg:col-span-7 w-full flex items-center justify-center order-1">
              <AnimatedSection delay={0.12} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full rounded-2xl sm:rounded-3xl border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden bg-[#fefaf5] dark:bg-[#0a0a0a] shadow-lg hover:shadow-2xl hover:border-[#f15e1c]/50 transition-all duration-300 group"
                >
                  <Image
                    src="/images/web-app-main-2.png"
                    alt="Arav Innovations Full-Stack Web Application Architecture & System Integration"
                    width={1200}
                    height={800}
                    className="w-full h-auto max-w-full object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: SUPPORTING CONTENT (~45% width) */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left order-2">
              <AnimatedSection delay={0.08} className="space-y-3">
                <Badge variant="secondary" size="md">
                  SYSTEM INTEGRATION
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  Connecting Workflows, Systems and User Journeys
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  Modern digital products require clear alignment between user interfaces and complex backend ecosystems. We engineer unified application architectures where data flows seamlessly between APIs, databases, CRM systems, and cloud environments.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.12} className="space-y-2.5">
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    Frictionless User Experiences &amp; Enterprise Portals
                  </span>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    Scalable API Connectors &amp; Microservice Gateways
                  </span>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    Resilient Data Storage &amp; Real-Time Telemetry
                  </span>
                </motion.div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — DESIGNED FOR THE WORK BEHIND THE SCREEN (LAYERED ARCHITECTURE)
          ========================================================================= */}
      <section id="layered-architecture" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                ENGINEERING ARCHITECTURE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Designed for the Work Behind the Screen
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A connected 5-layer engineering stack spanning responsive frontend, server application logic, data modeling, third-party integrations, and cloud deployment.
              </p>
            </div>
          </AnimatedSection>

          {/* Layered Pipeline Cards */}
          <div className="space-y-4 max-w-5xl mx-auto">
            {layeredArchitecture.map((layer, idx) => (
              <AnimatedSection key={layer.layer} delay={idx * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] shadow-xs transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-left group"
                >
                  <div className="md:col-span-1 flex items-center justify-center">
                    <span className="text-base font-mono font-black text-[#f15e1c]">
                      {layer.layer}
                    </span>
                  </div>
                  <div className="md:col-span-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-110 transition-transform">
                        {layer.icon}
                      </div>
                      <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {layer.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                  <div className="md:col-span-7 p-3 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                    <span className="text-[10px] font-mono font-bold text-[#2e936f] block uppercase mb-0.5">
                      Verified Tech Stack:
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#1b2823] dark:text-[#ffffff]">
                      {layer.tech}
                    </span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 5 — FAST, ACCESSIBLE, RESILIENT
          ========================================================================= */}
      <section id="quality-pillars" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                ENGINEERING QUALITY
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Fast, Accessible, Resilient
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Core engineering standards embedded directly into our product development cycle.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringPillars.map((plr, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.06}>
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full p-6 sm:p-7 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-lg transition-all duration-300 space-y-3 text-left group">
                    <div className="p-2.5 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit group-hover:scale-110 group-hover:-rotate-3 group-hover:border-[#2e936f]/40 transition-all duration-300">
                      {plr.icon}
                    </div>
                    <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] group-hover:translate-x-1 transition-all duration-300">
                      {plr.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {plr.desc}
                    </p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 6 — PRODUCT IMPROVEMENT LOOP
          ========================================================================= */}
      <section id="improvement-loop" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                CONTINUOUS EVOLUTION
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Launch Is a Milestone. Not the Finish Line.
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We use post-launch feedback, performance signals, analytics, operational observations and changing business requirements to identify what should be improved next.
              </p>
            </div>
          </AnimatedSection>

          {/* Loop Stage Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {productImprovementLoop.map((item, idx) => {
              const isActive = activeLoopIdx === idx;
              return (
                <AnimatedSection key={item.step} delay={idx * 0.08}>
                  <motion.div
                    onClick={() => setActiveLoopIdx(idx)}
                    onMouseEnter={() => setActiveLoopIdx(idx)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={cn(
                      "p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer space-y-2 text-left flex flex-col justify-between min-h-[160px] select-none",
                      isActive
                        ? "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/20"
                        : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a] opacity-80 hover:opacity-100 hover:border-[#f15e1c]"
                    )}
                  >
                    <div className="space-y-1">
                      <span
                        className={cn(
                          "text-xs font-mono font-black block transition-colors",
                          isActive ? "text-[#f15e1c]" : "text-[#7A6A5F]"
                        )}
                      >
                        LOOP STEP {item.step}
                      </span>
                      <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium pt-1">
                        {item.desc}
                      </p>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeLoopDot"
                        className="h-1 w-full bg-[#f15e1c] rounded-full mt-2"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 7 — FROM FIRST CONVERSATION TO PRODUCTION (6-STAGE PROCESS)
          ========================================================================= */}
      <section id="delivery-process" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                DELIVERY PROCESS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                From First Conversation to Production
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A disciplined 6-stage engineering process designed for transparency, milestone predictability, and software quality.
              </p>
            </div>
          </AnimatedSection>

          {/* 6 Stage Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productDeliveryProcess.map((proc, idx) => {
              const isSelected = activeProcessIdx === idx;
              return (
                <AnimatedSection key={proc.step} delay={idx * 0.06}>
                  <motion.div
                    onClick={() => setActiveProcessIdx(idx)}
                    onMouseEnter={() => setActiveProcessIdx(idx)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={cn(
                      "p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer space-y-3 text-left flex flex-col justify-between min-h-[220px] select-none",
                      isSelected
                        ? "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/20"
                        : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]"
                    )}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#f15e1c]">
                          STAGE {proc.step}
                        </span>
                        <div className="p-1.5 rounded-lg bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                          <Workflow className="w-4 h-4 text-[#2e936f]" />
                        </div>
                      </div>
                      <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {proc.title}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                        {proc.detail}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a]">
                      <span className="text-[10px] font-mono font-bold text-[#2e936f] uppercase block mb-0.5">
                        Key Milestone Outcome:
                      </span>
                      <span className="text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                        {proc.outcome}
                      </span>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 8 — THREE ENGAGEMENT MODELS
          ========================================================================= */}
      <section id="engagement-models" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                ENGAGEMENT STRUCTURES
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                The Right Team for the Job
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Flexible, commercially aligned collaboration models tailored to your product stage and technical requirements.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementModels.map((model, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.08}>
                <TiltCard maxTilt={5} scale={1.01} glare={true} className="h-full">
                  <div className="h-full p-7 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-xl transition-all duration-300 space-y-4 text-left flex flex-col justify-between group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                          {model.icon}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#f15e1c] uppercase">
                          MODEL 0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {model.title}
                      </h3>
                      <p className="text-xs font-mono font-bold text-[#2e936f]">
                        {model.subtitle}
                      </p>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                        {model.description}
                      </p>

                      <div className="pt-2 space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#f15e1c] block">
                          Best For:
                        </span>
                        <div className="space-y-1.5">
                          {model.bestFor.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#1b2823] dark:text-[#ffffff]">
                              <Check className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a]">
                      <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#f15e1c] group-hover:underline">
                        <span>Discuss This Model</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 9 — WHAT WE MEASURE (TRANSPARENT METRICS)
          ========================================================================= */}
      <section id="what-we-measure" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                TRANSPARENT METRICS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Show the Product. Explain the Engineering.
              </h2>
              <p className="text-base font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                What We Measure
              </p>
              <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4]">
                We evaluate product engineering success against verified technical, operational, and user experience indicators.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeMeasureList.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-lg transition-all duration-300 space-y-3 text-left group">
                    <div className="p-2.5 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit group-hover:scale-110 group-hover:border-[#2e936f]/40 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] group-hover:translate-x-1 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 10 — DYNAMIC CMS PRODUCT ENGINEERING INSIGHTS
          ========================================================================= */}
      <section id="insights" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
              <div className="space-y-2 text-left">
                <Badge variant="secondary" size="md">
                  KNOWLEDGE &amp; STRATEGY
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                  Product Engineering Insights
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPosts.map((post, idx) => (
              <AnimatedSection key={post.slug} delay={idx * 0.08}>
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left space-y-4 group">
                    <div className="space-y-3">
                      <div className="w-full mb-3 rounded-2xl overflow-hidden border border-[#f7d7b0]/60">
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
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 11 — FREQUENTLY ASKED QUESTIONS (5 FAQS)
          ========================================================================= */}
      <section id="faq" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="text-center space-y-3">
              <Badge variant="secondary" size="md">
                QUESTIONS &amp; ANSWERS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <AnimatedSection key={idx} delay={idx * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    className="rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/60 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group select-none"
                    >
                      <span className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
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
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="px-6 pb-6 text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a] pt-4"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 12 — CONNECTED SERVICES ECOSYSTEM
          ========================================================================= */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 text-left">
          
          <AnimatedSection>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider block">
                ARAV SERVICE ECOSYSTEM
              </span>
              <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Connected Enterprise Capabilities
              </h3>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {internalServices.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04}>
                <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-110 group-hover:border-[#f15e1c]/40 transition-all">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#f15e1c] group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          FINAL CTA — HAVE A PRODUCT IN MIND? LET'S BUILD IT PROPERLY
          ========================================================================= */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ffec69] animate-spin" style={{ animationDuration: "6s" }} />
                <span>READY TO BUILD OR MODERNIZE YOUR DIGITAL PRODUCT?</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Have a Product in Mind? Let's Build It Properly.
              </h2>

              <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed">
                Tell us what you're trying to build, improve, or scale. We'll help define the right product, architecture and execution path.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <MagneticButton>
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                    className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Discuss Your Product
                  </Button3D>
                </MagneticButton>
              </Link>

              <Link href="/services">
                <MagneticButton>
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
                    Explore All Services
                  </Button3D>
                </MagneticButton>
              </Link>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Client Ownership of Codebase &amp; Assets
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Transparent Milestones &amp; Architecture Blueprints
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Dedicated Product Engineering Squads
              </span>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}

export default WebDevInteractivePage;
