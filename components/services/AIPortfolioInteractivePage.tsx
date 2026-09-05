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
import {
  Cpu,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Database,
  Workflow,
  ShieldCheck,
  Zap,
  Layers,
  Activity,
  Code2,
  Bot,
  FileText,
  HelpCircle,
  Users,
  Eye,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { BlogCardImage } from "@/components/insights/BlogCardImage";
import {
  Sparkles,
  Search,
  MessageSquare,
  Shield,
  Compass,
  GitBranch,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

interface AIPortfolioPageProps {
  service: Service;
  relatedPosts?: BlogPost[];
}

// -----------------------------------------------------------------------------
// IMAGE PATH CONFIGURATION
// -----------------------------------------------------------------------------
export const AI_PORTFOLIO_HERO_IMAGE = "/images/ai-portfolio-main.png";
export const AI_PORTFOLIO_SECONDARY_IMAGE = "/images/ai-portfolio-secondary.png";

// -----------------------------------------------------------------------------
// System Scan Transition Line
// -----------------------------------------------------------------------------
function SystemScanTransition() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative w-full h-px my-4 overflow-hidden pointer-events-none select-none">
      <div className="w-full h-full bg-[#F7D7B0]" />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#F15E1C] to-transparent shadow-[0_0_8px_#F15E1C]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 1. SECTION — AI THAT SOLVES REAL WORK (Section 6 in prompt)
// -----------------------------------------------------------------------------
const realWorkCapabilities = [
  {
    num: "01",
    title: "AI Applications",
    desc: "Intelligent experiences built around real business needs.",
    icon: <Bot className="w-5 h-5 text-[#F15E1C]" />,
  },
  {
    num: "02",
    title: "RAG & Knowledge",
    desc: "Connect AI to trusted internal information and context.",
    icon: <Database className="w-5 h-5 text-[#2E936F]" />,
  },
  {
    num: "03",
    title: "AI Agents",
    desc: "Task-oriented systems that can reason, act and escalate when needed.",
    icon: <Cpu className="w-5 h-5 text-[#FAB60A]" />,
  },
  {
    num: "04",
    title: "Intelligent Automation",
    desc: "AI-assisted workflows that reduce repetitive operational effort.",
    icon: <Workflow className="w-5 h-5 text-[#F15E1C]" />,
  },
];

// -----------------------------------------------------------------------------
// 2. UNIQUE AI VISUAL — INTELLIGENCE FLOW (Section 7 in prompt)
// -----------------------------------------------------------------------------
const intelligenceFlowNodes = [
  {
    num: "01",
    title: "DATA",
    desc: "Business information and signals.",
    icon: <Database className="w-4 h-4 text-[#F15E1C]" />,
  },
  {
    num: "02",
    title: "CONTEXT",
    desc: "Knowledge that gives AI meaning.",
    icon: <Layers className="w-4 h-4 text-[#2E936F]" />,
  },
  {
    num: "03",
    title: "INTELLIGENCE",
    desc: "AI interprets and reasons.",
    icon: <Cpu className="w-4 h-4 text-[#FAB60A]" />,
  },
  {
    num: "04",
    title: "ACTION",
    desc: "Systems assist or execute tasks.",
    icon: <Zap className="w-4 h-4 text-[#F15E1C]" />,
  },
  {
    num: "05",
    title: "OVERSIGHT",
    desc: "Humans remain in control.",
    icon: <Users className="w-4 h-4 text-[#2E936F]" />,
  },
  {
    num: "06",
    title: "LEARNING",
    desc: "The system improves through feedback.",
    icon: <RefreshCw className="w-4 h-4 text-[#FAB60A]" />,
  },
];

// -----------------------------------------------------------------------------
// 3. CAPABILITIES FOR SECONDARY SECTION AROUND IMAGE 2 (Section 9 in prompt)
// -----------------------------------------------------------------------------
const secondaryCapabilities = [
  {
    name: "AI Assistants",
    desc: "Role-specific copilots designed for everyday employee tasks.",
    icon: <MessageSquare className="w-4 h-4 text-[#F15E1C]" />,
  },
  {
    name: "Knowledge Systems",
    desc: "Semantic retrieval across internal documents, wikis and databases.",
    icon: <Database className="w-4 h-4 text-[#2E936F]" />,
  },
  {
    name: "Document Intelligence",
    desc: "Automated extraction from contracts, invoices and unstructured files.",
    icon: <FileText className="w-4 h-4 text-[#FAB60A]" />,
  },
  {
    name: "Workflow Automation",
    desc: "End-to-end task automation connected to CRM, ERP and webhooks.",
    icon: <Workflow className="w-4 h-4 text-[#F15E1C]" />,
  },
  {
    name: "AI Agents",
    desc: "Goal-driven multi-step execution with human approval thresholds.",
    icon: <Cpu className="w-4 h-4 text-[#2E936F]" />,
  },
  {
    name: "Decision Support",
    desc: "Contextual data synthesis helping leadership make informed calls.",
    icon: <Activity className="w-4 h-4 text-[#FAB60A]" />,
  },
];

// -----------------------------------------------------------------------------
// 4. AI SYSTEM ARCHITECTURE (Section 10 in prompt)
// -----------------------------------------------------------------------------
const systemArchitectureLayers = [
  {
    layer: "01",
    name: "USER",
    title: "Enterprise Teams & Customers",
    desc: "The people who interact with the system everyday.",
  },
  {
    layer: "02",
    name: "AI EXPERIENCE",
    title: "Interfaces & Copilots",
    desc: "Where people interact with intelligence without needing complex prompts.",
  },
  {
    layer: "03",
    name: "AI / AGENT LAYER",
    title: "Reasoning & Orchestration",
    desc: "Where models interpret instructions, select tools, and plan actions.",
  },
  {
    layer: "04",
    name: "KNOWLEDGE + CONTEXT",
    title: "RAG & Vector Grounding",
    desc: "Where the AI gets trusted, factual organizational information.",
  },
  {
    layer: "05",
    name: "DATA + BUSINESS SYSTEMS",
    title: "Enterprise Systems",
    desc: "Where business information lives — CRMs, ERPs, APIs and databases.",
  },
  {
    layer: "06",
    name: "GOVERNANCE + MONITORING",
    title: "Controls & Oversight",
    desc: "Where access, oversight, telemetry and safety boundaries are managed.",
  },
];

// -----------------------------------------------------------------------------
// 5. AI AGENTS SECTION (Section 11 in prompt)
// -----------------------------------------------------------------------------
const agentProgressionNodes = [
  {
    step: "01",
    title: "UNDERSTAND",
    desc: "Interprets instructions, documents, and system status.",
    example: "Reads ticket or invoice context",
    connection: "API Data Ingestion",
    oversight: "Input Validation",
  },
  {
    step: "02",
    title: "DECIDE",
    desc: "Formulates a structured execution plan against business rules.",
    example: "Determines required ERP updates",
    connection: "Policy Rules Engine",
    oversight: "Confidence Scoring",
  },
  {
    step: "03",
    title: "ACT",
    desc: "Executes verified multi-step tasks across integrated software.",
    example: "Drafts response & stages records",
    connection: "CRM & Database Webhooks",
    oversight: "Action Staging",
  },
  {
    step: "04",
    title: "ESCALATE",
    desc: "Routes ambiguous scenarios directly to human specialists.",
    example: "Requests human sign-off on anomalies",
    connection: "Team Notification Bridge",
    oversight: "Mandatory Expert Review",
  },
];

// -----------------------------------------------------------------------------
// 6. RESPONSIBLE AI (Section 12 in prompt)
// -----------------------------------------------------------------------------
const responsibleAiLoop = [
  {
    point: "DATA",
    title: "Clean Context",
    desc: "Only approved, verified company information grounds the system.",
  },
  {
    point: "ACCESS",
    title: "Role Controls",
    desc: "Strict permission boundaries protect internal organizational data.",
  },
  {
    point: "GUARDRAILS",
    title: "Defined Boundaries",
    desc: "Automated filters block hallucinations and enforce business policies.",
  },
  {
    point: "OVERSIGHT",
    title: "Human in Control",
    desc: "High-impact actions require clear approval from human experts.",
  },
];

// -----------------------------------------------------------------------------
// 7. AI DELIVERY TIMELINE (Section 13 in prompt)
// -----------------------------------------------------------------------------
const deliveryTimelineStages = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Find the business problem and AI opportunity.",
  },
  {
    num: "02",
    title: "DEFINE",
    desc: "Select the use case, data and success criteria.",
  },
  {
    num: "03",
    title: "PROTOTYPE",
    desc: "Validate the experience and AI behavior.",
  },
  {
    num: "04",
    title: "INTEGRATE",
    desc: "Connect AI with knowledge, applications and workflows.",
  },
  {
    num: "05",
    title: "GOVERN",
    desc: "Add controls, evaluation and human oversight.",
  },
  {
    num: "06",
    title: "EVOLVE",
    desc: "Measure usage and continuously improve.",
  },
];

// -----------------------------------------------------------------------------
// 8. AI LEARNING LOOP (Section 14 in prompt)
// -----------------------------------------------------------------------------
const learningLoopSteps = [
  { stage: "OBSERVE", desc: "Monitor real system telemetry and queries." },
  { stage: "EVALUATE", desc: "Audit answers against factual standards." },
  { stage: "IMPROVE", desc: "Refine context grounding and prompt instructions." },
  { stage: "DEPLOY", desc: "Safely update models and workflow logic." },
  { stage: "MEASURE", desc: "Track latency, cost and completion metrics." },
  { stage: "LEARN", desc: "Extract insights from new edge cases." },
];

// -----------------------------------------------------------------------------
// 9. ENGAGEMENT MODELS (Section 15 in prompt)
// -----------------------------------------------------------------------------
const engagementOptions = [
  {
    title: "AI DISCOVERY",
    tag: "SCOPING & ROADMAP",
    desc: "Identify valuable AI opportunities and define where AI can create leverage.",
    deliverables: [
      "Use-case feasibility assessment",
      "Data readiness and context review",
      "Governance and security boundaries",
      "Technology implementation plan",
    ],
  },
  {
    title: "AI BUILD",
    tag: "DESIGN & IMPLEMENTATION",
    desc: "Design and implement a focused AI capability around a real business workflow.",
    deliverables: [
      "Production RAG or agent pipeline",
      "API integrations to core systems",
      "Human oversight review gates",
      "Deployment and operations handoff",
    ],
  },
  {
    title: "AI EVOLUTION",
    tag: "OPTIMIZATION & REFINEMENT",
    desc: "Improve an existing AI system through integration, monitoring and refinement.",
    deliverables: [
      "Token telemetry and cost reduction",
      "Continuous accuracy benchmarking",
      "Expanding to additional workflows",
      "Ongoing model performance tuning",
    ],
  },
];

// -----------------------------------------------------------------------------
// 10. PROOF / WHERE AI CREATES LEVERAGE (Section 16 in prompt)
// -----------------------------------------------------------------------------
const leverageAreas = [
  {
    title: "AUTOMATION",
    tag: "OPERATIONAL SPEED",
    desc: "Turn repetitive work into intelligent workflows.",
    icon: <Workflow className="w-5 h-5 text-[#F15E1C]" />,
  },
  {
    title: "KNOWLEDGE",
    tag: "FACTUAL GROUNDING",
    desc: "Make organizational information easier to use.",
    icon: <Database className="w-5 h-5 text-[#2E936F]" />,
  },
  {
    title: "DECISIONS",
    tag: "ACTIONABLE CONTEXT",
    desc: "Give teams better information at the right moment.",
    icon: <Zap className="w-5 h-5 text-[#FAB60A]" />,
  },
];

// -----------------------------------------------------------------------------
// 11. FAQ (Section 18 in prompt)
// -----------------------------------------------------------------------------
const aiFaqs = [
  {
    question: "What types of AI solutions can Arav Innovations build?",
    answer:
      "We design practical AI systems including enterprise knowledge bases (RAG), role-specific AI copilots, intelligent document processing pipelines, task-oriented AI agents, and custom applications with embedded intelligence.",
  },
  {
    question: "Can AI connect with our existing business systems?",
    answer:
      "Yes. We build secure API integrations connecting AI models directly to your existing databases, CRM platforms, ERP systems, internal portals, and communication tools.",
  },
  {
    question: "Can AI work with our internal documents and knowledge?",
    answer:
      "Yes. Using private retrieval-augmented generation (RAG), we index your proprietary PDFs, policies, SOPs, and spreadsheets so models answer strictly based on approved internal context.",
  },
  {
    question: "How do you evaluate AI reliability?",
    answer:
      "We build automated evaluation benchmarks to test factual grounding, response accuracy, and latency. Telemetry tracks performance continuously to spot edge cases and improve quality.",
  },
  {
    question: "How do you approach AI governance and human oversight?",
    answer:
      "We enforce role-based access control, automated safety boundaries, and clear human-in-the-loop review thresholds for sensitive actions, ensuring operations remain compliant and fully auditable.",
  },
];

export function AIPortfolioInteractivePage({ service, relatedPosts }: AIPortfolioPageProps) {
  const [activeFlowNode, setActiveFlowNode] = React.useState<number>(0);
  const [activeSecondaryCap, setActiveSecondaryCap] = React.useState<number>(0);
  const [activeArchLayer, setActiveArchLayer] = React.useState<number>(0);
  const [activeAgentNode, setActiveAgentNode] = React.useState<number>(0);
  const [activeLoopStep, setActiveLoopStep] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  // Form State
  const [formData, setFormData] = React.useState({
    name: "",
    company: "",
    email: "",
    useCase: "AI Automation",
    challenge: "",
    timeline: "1-3 months",
  });
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  // CMS Blog Data
  const articles = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] transition-colors duration-300 overflow-x-hidden selection:bg-[#F15E1C]/20 selection:text-[#F15E1C]">
      
      {/* =====================================================================
          1. HERO SECTION (FULL-BLEED CINEMATIC DESKTOP + MOBILE CARD)
          ===================================================================== */}
      <section className="relative pt-3 sm:pt-4 lg:pt-5 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white dark:bg-[#000000] border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none min-h-[calc(100vh-80px)] flex flex-col justify-start">
        {/* Full-Bleed Desktop Background Visual — PC / DESKTOP VIEW ONLY */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block select-none overflow-hidden">
          <Image
            src="/images/ai-portfolio-hero-bg.png"
            alt="AI Engineering, Automation & Intelligent Systems Strategy"
            fill
            priority
            className="object-cover object-right opacity-100 dark:opacity-95 transition-opacity duration-500"
            sizes="100vw"
          />
          {/* Light backdrop gradient for text readability while preserving full image opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 via-35% to-transparent dark:from-[#000000] dark:via-[#000000]/60 dark:via-35% dark:to-transparent pointer-events-none" />
        </div>

        <div className="max-w-[1536px] mx-auto w-full space-y-6 sm:space-y-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Hero Text (Desktop 50% / lg:col-span-6 xl:col-span-5) */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-5 text-left max-w-xl">
              
              {/* Breadcrumb & Eyebrow Badge */}
              <div className="space-y-2">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "AI Portfolio", href: "/services/ai-portfolio" },
                  ]}
                />
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#0a0a0a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
                  <Sparkles className="w-3.5 h-3.5 text-[#f15e1c]" />
                  <span>AI ENGINEERING • AUTOMATION • INTELLIGENT SYSTEMS</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-[1.12]">
                Turn AI Potential Into Business Intelligence.
              </h1>

              {/* Dedicated Mobile Hero Visual Card — Mobile View Only */}
              <div className="lg:hidden w-full my-3">
                <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#f7d7b0] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] shadow-xl select-none aspect-[1024/1536]">
                  <Image
                    priority
                    src="/images/ai-portfolio-mobile-cropped.png"
                    alt="AI Portfolio & Mobile Intelligence Visual"
                    width={1024}
                    height={1536}
                    className="w-full h-auto object-contain object-center rounded-2xl"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 40vw"
                  />
                </div>
              </div>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                We design practical AI systems that connect data, knowledge and automation to real business workflows — helping organizations make better decisions and get more from their technology.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a href="#inquire">
                  <Button3D variant="primary" size="lg" className="flex items-center gap-2 font-semibold bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] hover:opacity-95 transition-all">
                    Discuss an AI Use Case
                    <ArrowRight className="w-4 h-4" />
                  </Button3D>
                </a>
                <a href="#capabilities">
                  <Button3D variant="secondary" size="lg" className="flex items-center gap-2 font-semibold bg-[#2E936F] text-[#FFFFFF] border-[#2E936F] hover:opacity-95 transition-all">
                    Explore AI Capabilities
                  </Button3D>
                </a>
              </div>

              {/* Compact Capability Line */}
              <div className="pt-3 border-t border-[#F7D7B0]">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-gray-600 dark:text-gray-300">
                  <span className="px-2 py-0.5 rounded bg-[#F7D7B0]/40 text-[#F15E1C]">AI APPLICATIONS</span>
                  <span className="text-[#F7D7B0]">•</span>
                  <span className="px-2 py-0.5 rounded bg-[#F7D7B0]/40 text-[#2E936F]">RAG &amp; KNOWLEDGE</span>
                  <span className="text-[#F7D7B0]">•</span>
                  <span className="px-2 py-0.5 rounded bg-[#F7D7B0]/40 text-[#FAB60A]">AI AGENTS</span>
                  <span className="text-[#F7D7B0]">•</span>
                  <span className="px-2 py-0.5 rounded bg-[#F7D7B0]/40 text-[#F15E1C]">AUTOMATION</span>
                  <span className="text-[#F7D7B0]">•</span>
                  <span className="px-2 py-0.5 rounded bg-[#F7D7B0]/40 text-[#2E936F]">AI INTEGRATION</span>
                </div>
              </div>
            </div>

            {/* HERO VISUAL SPACER — DESKTOP VIEW ONLY (Fills right column to reveal Desktop BG Artwork) */}
            <div className="lg:col-span-6 xl:col-span-7 w-full hidden lg:flex items-center justify-center pointer-events-none min-h-[300px]" />

          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          2. AI CAPABILITIES — AI THAT SOLVES REAL WORK
          ===================================================================== */}
      <section id="capabilities" className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              PRACTICAL CAPABILITIES
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              AI That Solves Real Work.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              We focus on practical AI — systems that understand information, assist decisions and automate meaningful parts of everyday work.
            </p>
          </div>

          {/* 4 Concise Capability Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {realWorkCapabilities.map((cap) => (
              <motion.div
                key={cap.num}
                whileHover={{ y: -3 }}
                className="p-6 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20 hover:shadow-lg transition-all duration-200 shadow-xs space-y-3 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F15E1C] px-2 py-0.5 rounded bg-[#F7D7B0]/40 group-hover:bg-[#F15E1C] group-hover:text-[#FFFFFF] transition-colors">
                      {cap.num}
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#F7D7B0]/30">{cap.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#F7D7B0]">
                  <div className="w-full h-0.5 bg-[#F7D7B0] group-hover:bg-[#F15E1C] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          3. UNIQUE AI VISUAL — INTELLIGENCE FLOW (From Data to Action)
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              INTELLIGENCE FLOW
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              From Data to Action.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Every production AI system follows a connected pipeline from raw organizational signals to measured business outcomes.
            </p>
          </div>

          {/* Connected AI-System Visualization */}
          <div className="bg-white dark:bg-[#000000] border border-[#F7D7B0] rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {intelligenceFlowNodes.map((node, idx) => {
                const isActive = activeFlowNode === idx;
                return (
                  <button
                    key={node.num}
                    onClick={() => setActiveFlowNode(idx)}
                    onMouseEnter={() => setActiveFlowNode(idx)}
                    className={cn(
                      "p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between h-28 transform",
                      isActive
                        ? "bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] shadow-md -translate-y-0.5"
                        : "bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={cn("text-[10px] font-mono font-bold", isActive ? "text-[#FFEC69]" : "text-[#F15E1C]")}>
                        {node.num}
                      </span>
                      <div className={cn("p-1 rounded-lg transition-colors", isActive ? "bg-[#FFFFFF] text-[#F15E1C]" : "bg-[#F7D7B0]/30 text-[#F15E1C]")}>
                        {node.icon}
                      </div>
                    </div>
                    <span className={cn("text-xs font-bold block leading-tight", isActive ? "text-[#FFFFFF]" : "text-[#1b2823] dark:text-[#ffffff]")}>
                      {node.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Node Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={intelligenceFlowNodes[activeFlowNode].num}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 rounded-2xl border-2 border-[#F15E1C] bg-[#F7D7B0]/20 text-center space-y-1.5"
              >
                <span className="text-xs font-mono font-bold text-[#F15E1C] uppercase">
                  NODE {intelligenceFlowNodes[activeFlowNode].num} &bull; {intelligenceFlowNodes[activeFlowNode].title}
                </span>
                <p className="text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto">
                  {intelligenceFlowNodes[activeFlowNode].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          4. AI SYSTEM VISUAL (IMAGE 2) — ONE AI SYSTEM. MULTIPLE POSSIBILITIES.
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Text & Capability List (Desktop 40% / lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-5">
              <Badge variant="outline" className="border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
                INTELLIGENT INTEGRATION
              </Badge>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                One AI System. Multiple Possibilities.
              </h2>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                AI becomes valuable when it connects intelligence with the systems and workflows your organization already uses.
              </p>

              {/* Capability List */}
              <div className="space-y-2.5 pt-2">
                {secondaryCapabilities.map((cap, idx) => {
                  const isActive = activeSecondaryCap === idx;
                  return (
                    <div
                      key={cap.name}
                      onMouseEnter={() => setActiveSecondaryCap(idx)}
                      onClick={() => setActiveSecondaryCap(idx)}
                      className={cn(
                        "p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3",
                        isActive
                          ? "bg-[#F7D7B0]/30 border-[#F15E1C] shadow-xs translate-x-1"
                          : "bg-white dark:bg-[#000000] border-[#F7D7B0] hover:border-[#F15E1C]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("p-1.5 rounded-lg", isActive ? "bg-[#F15E1C] text-[#FFFFFF]" : "bg-[#F7D7B0]/30")}>
                          {cap.icon}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#1b2823] dark:text-[#ffffff]">{cap.name}</h4>
                          <p className="text-[11px] text-gray-600 dark:text-gray-300">{cap.desc}</p>
                        </div>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-[#F15E1C] -rotate-90 transition-transform", isActive ? "opacity-100" : "opacity-30")} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Secondary Visual (Desktop 60% / lg:col-span-7) */}
            <div className="lg:col-span-7 w-full flex items-center justify-center">
              <TiltCard className="w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full flex items-center justify-center group"
                >
                  <Image
                    loading="lazy"
                    src={AI_PORTFOLIO_SECONDARY_IMAGE}
                    alt="AI portfolio visualization showing intelligent applications, AI agents, data and automation."
                    width={900}
                    height={650}
                    className="w-full h-auto object-contain max-h-[480px] rounded-2xl group-hover:scale-[1.01] transition-transform duration-300 drop-shadow-md"
                  />
                </motion.div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          5. AI SYSTEM ARCHITECTURE
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              SYSTEM ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Intelligence Needs a System Behind It.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Every layer of the AI system connects naturally to ensure stability, relevance, and operational governance.
            </p>
          </div>

          {/* Architecture Layers */}
          <div className="max-w-4xl mx-auto space-y-3">
            {systemArchitectureLayers.map((layer, idx) => {
              const isActive = activeArchLayer === idx;
              return (
                <div
                  key={layer.layer}
                  onMouseEnter={() => setActiveArchLayer(idx)}
                  className={cn(
                    "p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                    isActive
                      ? "bg-[#F7D7B0]/30 border-[#F15E1C] shadow-xs -translate-y-0.5"
                      : "bg-white dark:bg-[#000000] border-[#F7D7B0] hover:border-[#F15E1C]"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="p-2 rounded-xl bg-[#F15E1C] text-[#FFFFFF] font-mono font-bold text-xs shrink-0">
                      LAYER {layer.layer}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#F15E1C] uppercase block">{layer.name}</span>
                      <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff]">{layer.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 max-w-md sm:text-right">
                    {layer.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          6. AI AGENTS SECTION
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              TASK-ORIENTED AGENTS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              When AI Can Do More Than Answer.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              AI agents can move beyond responses to perform defined tasks, work across systems and involve people when decisions require human judgment.
            </p>
          </div>

          {/* Visual Progression: UNDERSTAND → DECIDE → ACT → ESCALATE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {agentProgressionNodes.map((agent, idx) => {
              const isActive = activeAgentNode === idx;
              return (
                <div
                  key={agent.step}
                  onMouseEnter={() => setActiveAgentNode(idx)}
                  className={cn(
                    "p-5 rounded-2xl border transition-all duration-200 cursor-pointer space-y-3 flex flex-col justify-between shadow-xs",
                    isActive
                      ? "bg-[#F7D7B0]/20 border-[#F15E1C] shadow-md -translate-y-0.5"
                      : "bg-white dark:bg-[#000000] border-[#F7D7B0] hover:border-[#F15E1C]"
                  )}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#F15E1C] px-2 py-0.5 rounded bg-[#F7D7B0]/40 inline-block">
                      PHASE {agent.step}
                    </span>
                    <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff]">{agent.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{agent.desc}</p>
                  </div>

                  <div className="pt-2.5 border-t border-[#F7D7B0] text-[11px] text-gray-600 dark:text-gray-300 space-y-1">
                    <p><span className="font-semibold text-[#1b2823] dark:text-[#ffffff]">Task:</span> {agent.example}</p>
                    <p><span className="font-semibold text-[#2E936F]">Control:</span> {agent.oversight}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          7. RESPONSIBLE AI
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              RESPONSIBLE GOVERNANCE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Intelligence Needs Control.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Reliable AI requires the right data, clear access, defined boundaries and human oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {responsibleAiLoop.map((pt, idx) => (
              <motion.div
                key={pt.point}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#2E936F] hover:bg-[#F7D7B0]/20 transition-all duration-300 shadow-xs space-y-2 group cursor-pointer text-center"
              >
                <span className="text-xs font-mono font-bold text-[#2E936F] px-2.5 py-0.5 rounded-full bg-[#2E936F]/10 inline-block">
                  CONTROL 0{idx + 1} &bull; {pt.point}
                </span>
                <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2E936F] transition-colors">
                  {pt.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {pt.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Connected Loop Badge */}
          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-full border border-[#F7D7B0] bg-[#F7D7B0]/20">
              DATA &rarr; ACCESS &rarr; GUARDRAILS &rarr; OVERSIGHT &rarr; IMPROVEMENT
            </span>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          8. AI DELIVERY TIMELINE (VERTICAL SCROLL-CONTROLLED)
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <Badge variant="outline" className="mb-2.5 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              DELIVERY LIFECYCLE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              From AI Idea to Working System.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Our engineering lifecycle moves deliberately from problem discovery to continuous system evolution.
            </p>
          </div>

          {/* Central Vertical Timeline */}
          <div className="relative max-w-4xl mx-auto py-2">
            <div className="absolute left-4 md:left-1/2 top-4 bottom-10 w-0.5 -translate-x-1/2 bg-[#F7D7B0]" />

            <div className="space-y-8 md:space-y-10">
              {deliveryTimelineStages.map((stage, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={stage.num}
                    initial={{ opacity: 0.4, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                      "relative flex flex-col md:flex-row items-start md:items-center group cursor-pointer",
                      isEven ? "md:flex-row-reverse" : ""
                    )}
                  >
                    <div className={cn("w-full md:w-1/2 pl-12 md:pl-0", isEven ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left")}>
                      <div className="p-5 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] group-hover:border-[#F15E1C] group-hover:bg-[#F7D7B0]/20 group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300 shadow-xs space-y-1.5">
                        <span className="text-xs font-mono font-bold text-[#F15E1C] px-2 py-0.5 rounded bg-[#F7D7B0]/40 group-hover:bg-[#F15E1C] group-hover:text-[#FFFFFF] transition-colors inline-block">
                          STAGE {stage.num}
                        </span>
                        <h3 className="text-lg font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">
                          {stage.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {stage.desc}
                        </p>
                      </div>
                    </div>

                    <div className="absolute left-4 md:left-1/2 top-5 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#000000] border-2 border-[#F7D7B0] group-hover:border-[#F15E1C] group-hover:bg-[#F15E1C] flex items-center justify-center transition-all duration-300 shadow-xs z-10">
                      <span className="text-[11px] font-mono font-bold text-[#F15E1C] group-hover:text-[#FFFFFF]">
                        {stage.num}
                      </span>
                    </div>

                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          9. AI LEARNING LOOP
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              AI LEARNING LOOP
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              AI Gets Better When the System Learns.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Hover over each phase of the continuous learning loop that transforms telemetry into ongoing system improvements.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
            {learningLoopSteps.map((item, idx) => {
              const isActive = activeLoopStep === idx;
              return (
                <button
                  key={item.stage}
                  onClick={() => setActiveLoopStep(idx)}
                  onMouseEnter={() => setActiveLoopStep(idx)}
                  className={cn(
                    "p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between h-32 transform",
                    isActive
                      ? "bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] shadow-md -translate-y-0.5"
                      : "bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20"
                  )}
                >
                  <span className={cn("text-[10px] font-mono font-bold", isActive ? "text-[#FFEC69]" : "text-[#F15E1C]")}>
                    0{idx + 1}
                  </span>
                  <span className={cn("text-xs font-bold block", isActive ? "text-[#FFFFFF]" : "text-[#1b2823] dark:text-[#ffffff]")}>
                    {item.stage}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 max-w-md mx-auto text-center">
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              Phase: <span className="font-bold text-[#1b2823] dark:text-[#ffffff]">{learningLoopSteps[activeLoopStep].stage}</span> &mdash; {learningLoopSteps[activeLoopStep].desc}
            </p>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          10. ENGAGEMENT MODELS
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              STARTING FORMATS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Start Where Your Business Needs It.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Choose an engagement format tailored to your current stage of AI exploration and adoption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {engagementOptions.map((model) => (
              <motion.div
                key={model.title}
                whileHover={{ y: -3 }}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#F15E1C] hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-[#F15E1C] uppercase block">{model.tag}</span>
                  <h3 className="text-xl font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">{model.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{model.desc}</p>

                  <div className="pt-3 border-t border-[#F7D7B0] space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#2E936F] uppercase block">Deliverables</span>
                    {model.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F15E1C] shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a href="#inquire">
                    <Button3D variant="secondary" size="md" className="w-full bg-[#2E936F] text-[#FFFFFF] border-[#2E936F]">
                      Inquire About {model.title}
                    </Button3D>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          11. PROOF — WHERE AI CAN CREATE LEVERAGE
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              PROVEN OPPORTUNITIES
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Where AI Can Create Leverage.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              We focus on areas where AI can generate real operational leverage rather than speculative experiments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {leverageAreas.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#F7D7B0]/30">{item.icon}</div>
                  <span className="text-[10px] font-mono font-bold text-[#2E936F]">{item.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1b2823] dark:text-[#ffffff]">{item.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          12. AI INSIGHTS
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              KNOWLEDGE BASE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              AI Insights.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Explore our engineering perspectives on practical AI implementation, enterprise RAG, and governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group block">
                <motion.div whileHover={{ y: -3 }} className="h-full p-6 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#F15E1C] hover:shadow-md transition-all duration-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-full mb-3 rounded-xl overflow-hidden border border-[#F7D7B0]/60">
                      <BlogCardImage post={post} aspectRatio="aspect-video" />
                    </div>
                    <Badge variant="subtle" className="mb-2.5 text-[10px] bg-[#F7D7B0]/40 text-[#F15E1C] font-semibold">
                      {post.category}
                    </Badge>
                    <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#F7D7B0] flex items-center justify-between text-xs font-semibold text-[#F15E1C]">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/insights">
              <Button3D variant="secondary" size="md" className="bg-[#2E936F] text-[#FFFFFF] border-[#2E936F]">
                Explore All Insights
              </Button3D>
            </Link>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          13. FAQ SECTION (EXACTLY 5 CONCISE FAQS)
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              QUESTIONS &amp; ANSWERS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Frequently Asked Questions.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Clear answers regarding AI architecture, system integration, internal documents, and governance.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {aiFaqs.map((faq, index) => {
              const isOpen = openFaqIdx === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#F7D7B0] bg-white dark:bg-[#000000] overflow-hidden transition-all hover:border-[#F15E1C] hover:shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : index)}
                    className="w-full text-left p-4 flex items-center justify-between font-bold text-sm sm:text-base text-[#1b2823] dark:text-[#ffffff] hover:text-[#F15E1C] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 text-[#F15E1C]", isOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 pt-0 text-xs sm:text-sm text-gray-600 dark:text-gray-300 border-t border-[#F7D7B0] leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          14. CONTACT / LEAD FORM
          ===================================================================== */}
      <section id="inquire" className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto rounded-3xl bg-white dark:bg-[#000000] border border-[#F7D7B0] p-6 sm:p-10 shadow-xl space-y-6">
            
            <div className="text-center space-y-2">
              <Badge variant="outline" className="border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
                START AN AI INITIATIVE
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1b2823] dark:text-[#ffffff]">
                Discuss an AI Use Case.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Share your current challenge or AI goal. Our engineering team will review feasibility and data architecture.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#F7D7B0]/30 border border-[#2E936F] text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#2E936F] mx-auto" />
                <h3 className="text-lg font-bold text-[#1b2823] dark:text-[#ffffff]">Thank You for Reaching Out.</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Your AI use case details have been received. An AI solutions engineer will follow up shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D7B0] bg-white dark:bg-[#000000] text-sm text-[#1b2823] dark:text-[#ffffff] focus:outline-hidden focus:border-[#F15E1C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Company Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D7B0] bg-white dark:bg-[#000000] text-sm text-[#1b2823] dark:text-[#ffffff] focus:outline-hidden focus:border-[#F15E1C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Work Email *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D7B0] bg-white dark:bg-[#000000] text-sm text-[#1b2823] dark:text-[#ffffff] focus:outline-hidden focus:border-[#F15E1C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">AI Use Case *</label>
                    <select
                      value={formData.useCase}
                      onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D7B0] bg-white dark:bg-[#000000] text-sm text-[#1b2823] dark:text-[#ffffff] focus:outline-hidden focus:border-[#F15E1C]"
                    >
                      <option value="AI Automation">AI Automation</option>
                      <option value="AI Assistant">AI Assistant</option>
                      <option value="RAG / Knowledge System">RAG / Knowledge System</option>
                      <option value="AI Agent">AI Agent</option>
                      <option value="AI Application">AI Application</option>
                      <option value="AI Strategy / Discovery">AI Strategy / Discovery</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Current Challenge / Goal *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="Describe the workflow friction or AI objective..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D7B0] bg-white dark:bg-[#000000] text-sm text-[#1b2823] dark:text-[#ffffff] focus:outline-hidden focus:border-[#F15E1C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Expected Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D7B0] bg-white dark:bg-[#000000] text-sm text-[#1b2823] dark:text-[#ffffff] focus:outline-hidden focus:border-[#F15E1C]"
                  >
                    <option value="Immediately">Immediately</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="Exploratory">Exploratory / Roadmap</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Button3D variant="primary" size="lg" className="w-full bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C]">
                    Submit AI Use Case Inquiry
                  </Button3D>
                </div>
              </form>
            )}

          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          15. FINAL CTA
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-[#2E936F] text-[#FFFFFF] border border-[#2E936F] shadow-2xl overflow-hidden text-center space-y-5">
            
            {/* Ambient Accents */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#F15E1C]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#FAB60A]/25 rounded-full blur-3xl pointer-events-none" />

            <Badge variant="outline" className="border-[#FFFFFF] text-[#FFFFFF] bg-[#FFFFFF]/10 px-3 py-1 font-semibold tracking-wider text-xs">
              TAKE THE NEXT STEP
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-[#FFFFFF]">
              Have an AI Use Case in Mind?
            </h2>

            <p className="text-base sm:text-lg text-[#FFEC69] max-w-2xl mx-auto leading-relaxed font-medium">
              Let&apos;s turn the idea into a practical AI system built around the right data, workflow, integration and controls.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <a href="#inquire">
                <Button3D variant="primary" size="lg" className="flex items-center gap-2 font-semibold bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] hover:opacity-95 transition-all">
                  Discuss Your AI Use Case
                  <ArrowRight className="w-4 h-4" />
                </Button3D>
              </a>
              <Link href="/services">
                <Button3D variant="secondary" size="lg" className="flex items-center gap-2 font-medium bg-[#FFFFFF] text-[#2E936F] border-[#FFFFFF] hover:bg-[#F7D7B0] transition-all">
                  Explore All Services
                </Button3D>
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default AIPortfolioInteractivePage;
