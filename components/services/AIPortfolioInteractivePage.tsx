"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Check,
  Send,
  X,
  BrainCircuit,
  Database,
  Workflow,
  ShieldCheck,
  Globe2,
  Star,
  Quote,
  Zap,
  Layers,
  Lock,
  Shield,
  Server,
  Activity,
  Terminal,
  RefreshCw,
  Eye,
  ArrowUpRight,
  Gauge,
  Sliders,
  Play,
  Code2,
  Bot,
} from "lucide-react";
import { Service } from "@/data/services";
import { caseStudiesData } from "@/data/case-studies";
import { testimonialsData } from "@/data/testimonials";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { cn } from "@/lib/utils";

interface AIPortfolioPageProps {
  service: Service;
}

// -----------------------------------------------------------------------------
// 1. System Scan Transition Line (Subtle sweeping scan line between sections)
// -----------------------------------------------------------------------------
function SystemScanTransition() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative w-full h-px my-4 overflow-hidden pointer-events-none select-none">
      <div className="w-full h-full bg-[#f7d7b0]/30 dark:bg-[#1a1a1a]" />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent shadow-[0_0_8px_#f15e1c]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 2. Hero — Arav Intelligence Core Awakening Visual
// -----------------------------------------------------------------------------
function HeroAICoreVisual() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-25 select-none flex items-center justify-center">
      <svg className="w-full h-full max-w-5xl" viewBox="0 0 1000 600" fill="none">
        <defs>
          <linearGradient id="ai-core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f15e1c" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#2e936f" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fab60a" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Outer Orbit Rings */}
        <circle cx="500" cy="300" r="220" stroke="url(#ai-core-grad)" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="500" cy="300" r="140" stroke="#2e936f" strokeWidth="1.5" />
        <circle cx="500" cy="300" r="70" stroke="#f15e1c" strokeWidth="2.5" className="animate-pulse" />
        <circle cx="500" cy="300" r="25" fill="#fab60a" />

        {/* Data Input & Output Signal Rays */}
        <line x1="160" y1="180" x2="500" y2="300" stroke="#f15e1c" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="160" y1="420" x2="500" y2="300" stroke="#2e936f" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="840" y1="180" x2="500" y2="300" stroke="#fab60a" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="840" y1="420" x2="500" y2="300" stroke="#2e936f" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Surrounding Nodes */}
        <g transform="translate(130, 160)">
          <rect width="120" height="40" rx="8" stroke="#f15e1c" strokeWidth="1" fill="#FFFDF9" fillOpacity="0.8" />
          <text x="60" y="24" fill="#f15e1c" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">DATA INGESTION</text>
        </g>
        <g transform="translate(130, 400)">
          <rect width="120" height="40" rx="8" stroke="#2e936f" strokeWidth="1" fill="#FFFDF9" fillOpacity="0.8" />
          <text x="60" y="24" fill="#2e936f" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">VECTOR SEARCH</text>
        </g>
        <g transform="translate(750, 160)">
          <rect width="120" height="40" rx="8" stroke="#fab60a" strokeWidth="1" fill="#FFFDF9" fillOpacity="0.8" />
          <text x="60" y="24" fill="#fab60a" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">AI REASONING</text>
        </g>
        <g transform="translate(750, 400)">
          <rect width="120" height="40" rx="8" stroke="#2e936f" strokeWidth="1" fill="#FFFDF9" fillOpacity="0.8" />
          <text x="60" y="24" fill="#2e936f" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">ACTION &amp; OUTPUT</text>
        </g>
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. Metric Counter Number Component (Viewport Ease-Out Count-Up)
// -----------------------------------------------------------------------------
function CounterNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = React.useState<string>(
    shouldReduceMotion ? value.toFixed(decimals) : (0).toFixed(decimals)
  );

  React.useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setDisplayValue(value.toFixed(decimals));
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * value;

      setDisplayValue(current.toFixed(decimals));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [isInView, value, decimals, shouldReduceMotion]);

  return (
    <span ref={ref} className="tabular-nums font-mono font-black">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Data Collections
// -----------------------------------------------------------------------------
const aiSolutionsData = [
  {
    numStr: "01",
    title: "Enterprise RAG & Knowledge Systems",
    subtitle: "Grounding LLMs in Proprietary Data with Exact Citations",
    description:
      "We connect your internal documents, PDFs, databases, and CRMs to secure vector search pipelines, enabling AI models to answer questions accurately without hallucinations.",
    icon: <Database className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Vector Database Architecture (Pgvector / Pinecone)",
      "Hybrid Semantic & Keyword Search Indexing",
      "Exact Page & Document Citation Engine",
      "Zero-Data-Retention Privacy Guardrails",
    ],
    metric: "99.4%",
    metricLabel: "Factual Retrieval Accuracy",
    stageName: "KNOWLEDGE PIPELINE",
  },
  {
    numStr: "02",
    title: "Task-Oriented AI Agents",
    subtitle: "Autonomous Workflows with Human-in-the-Loop Safeguards",
    description:
      "We build specialized AI agents that execute complex multi-step tasks across enterprise software—extracting document data, writing CRM records, and triggering ERP workflows.",
    icon: <BrainCircuit className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Multi-Agent Orchestration (LangChain / LlamaIndex)",
      "CRM & ERP API Integration Connectors",
      "Human Oversight & Approval Thresholds",
      "Role-Based Access Control (RBAC) Enforcement",
    ],
    metric: "68%",
    metricLabel: "Manual Task Reduction",
    stageName: "WORKFLOW AUTOMATION",
  },
  {
    numStr: "03",
    title: "Intelligent Document Processing (IDP)",
    subtitle: "Automating Unstructured Invoices, Contracts & Records",
    description:
      "Extract structured JSON data from complex unstructured documents, legal contracts, and financial receipts with sub-second latency and zero human error.",
    icon: <Workflow className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "OCR & Layout-Aware Document Parsing",
      "Custom Schema JSON Extraction Rules",
      "Automated Audit Trail & Data Validation",
      "High-Throughput Batch Processing Pipelines",
    ],
    metric: "10x",
    metricLabel: "Document Processing Speed",
    stageName: "DOCUMENT INTELLIGENCE",
  },
  {
    numStr: "04",
    title: "AI Privacy, Governance & Cost Tuning",
    subtitle: "Enterprise Safety & LLM Token Telemetry",
    description:
      "Deploy custom LLM microservices with strict DPDP Act / GDPR data privacy compliance, semantic caching, and token usage optimization to lower API costs.",
    icon: <ShieldCheck className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Semantic Response Caching for 40%+ Cost Reduction",
      "Zero-Retention API Model Deployment",
      "Real-Time Token & Latency Telemetry Dashboard",
      "Safety Guardrails & Prompt Injection Defense",
    ],
    metric: "40%",
    metricLabel: "LLM API Cost Savings",
    stageName: "GOVERNANCE & COST",
  },
];

const aiPipelinePhases = [
  { phase: "01", name: "DATA", desc: "Enterprise Data Ingestion & Indexing" },
  { phase: "02", name: "CONTEXT", desc: "Vector Search & Semantic Chunking" },
  { phase: "03", name: "REASONING", desc: "LLM Model Reasoning & Guardrails" },
  { phase: "04", name: "ACTION", desc: "Autonomous API Execution & Workflows" },
  { phase: "05", name: "FEEDBACK", desc: "Operational Feedback & Cost Telemetry" },
];

const problemSolutionPairs = [
  {
    prob: "01 LEGACY INTEGRATION",
    probDesc: "AI models disconnected from core ERP & CRM systems.",
    sol: "AI CORE CONNECTORS",
    solDesc: "Seamless REST/GraphQL API bridge connecting LLMs to enterprise databases.",
  },
  {
    prob: "02 DATA PRIVACY",
    probDesc: "Risk of training public models on internal company IP.",
    sol: "ZERO-RETENTION BOUNDARY",
    solDesc: "Private model deployment with zero data retention and DPDP compliance.",
  },
  {
    prob: "03 MANUAL WORKFLOWS",
    probDesc: "Repetitive manual document reviews slowing down teams.",
    sol: "AUTONOMOUS AI AGENTS",
    solDesc: "Task-oriented agents processing documents with human-in-the-loop oversight.",
  },
];

const techConstellation = [
  { category: "MODELS", name: "OpenAI GPT-4o", desc: "Multimodal Reasoner" },
  { category: "MODELS", name: "Claude 3.5 Sonnet", desc: "Complex Code & Logic" },
  { category: "FRAMEWORKS", name: "LangChain", desc: "Agent Orchestration" },
  { category: "FRAMEWORKS", name: "LlamaIndex", desc: "Data Indexing" },
  { category: "VECTOR DB", name: "Pgvector", desc: "Postgres Vector Extension" },
  { category: "VECTOR DB", name: "Pinecone / Qdrant", desc: "High-Scale Vector Search" },
  { category: "INFRASTRUCTURE", name: "Python / FastAPI", desc: "High-Performance Backend" },
  { category: "INFRASTRUCTURE", name: "Docker", desc: "Containerized Deployment" },
];

const deploymentRoadmap = [
  { step: "01", title: "AI Feasibility & Scoping", desc: "Audit workflow bottlenecks and identify high-ROI enterprise AI use cases.", deliverable: "Scoping Architecture Document" },
  { step: "02", title: "Proof of Concept (PoC)", desc: "Build working RAG pipeline or agent prototype using proprietary sample data.", deliverable: "2-Week Functional Prototype" },
  { step: "03", title: "Enterprise Systems Integration", desc: "Connect AI Core to CRM, ERP, databases, and authentication systems.", deliverable: "Production API Connectors" },
  { step: "04", title: "Safety & Privacy Tuning", desc: "Enforce zero data retention, role-based access, and token cost caching.", deliverable: "Governance & Safety Audit" },
  { step: "05", title: "Deployment & Monitoring", desc: "Go live with continuous latency, token cost, and drift telemetry dashboards.", status: "LIVE ● ACTIVE" },
];

const ctaWords = ["RELIABLE", "SECURE", "ENTERPRISE-READY", "MEASURABLE", "SCALABLE"];

export function AIPortfolioInteractivePage({ service }: AIPortfolioPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSolutionIdx, setActiveSolutionIdx] = React.useState<number>(0);
  const [activePipelinePhase, setActivePipelinePhase] = React.useState<number>(0);
  const [activeRoadmapStep, setActiveRoadmapStep] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);

  // ---------------------------------------------------------------------------
  // 1. AI Pipeline Scroll Progression
  // ---------------------------------------------------------------------------
  const pipelineContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: pipelineProgress } = useScroll({
    target: pipelineContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothPipelineProgress = useSpring(pipelineProgress, { stiffness: 45, damping: 25 });

  React.useEffect(() => {
    const unsub = smoothPipelineProgress.on("change", (v) => {
      const count = aiPipelinePhases.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedPhase = Math.floor(normalized * count);
      setActivePipelinePhase(calculatedPhase);
    });
    return () => unsub();
  }, [smoothPipelineProgress]);

  // ---------------------------------------------------------------------------
  // 2. Roadmap Scroll Timeline
  // ---------------------------------------------------------------------------
  const roadmapContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: roadmapProgress } = useScroll({
    target: roadmapContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothRoadmapProgress = useSpring(roadmapProgress, { stiffness: 45, damping: 25 });
  const roadmapLineWidth = useTransform(smoothRoadmapProgress, [0, 1], ["0%", "100%"]);

  React.useEffect(() => {
    const unsub = smoothRoadmapProgress.on("change", (v) => {
      const count = deploymentRoadmap.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedStep = Math.floor(normalized * count);
      setActiveRoadmapStep(calculatedStep);
    });
    return () => unsub();
  }, [smoothRoadmapProgress]);

  // InView references
  const statementRef = React.useRef<HTMLDivElement>(null);
  const isStatementInView = useInView(statementRef, { once: true, margin: "-80px" });

  const testimonialRef = React.useRef<HTMLDivElement>(null);
  const isTestimonialInView = useInView(testimonialRef, { once: true, margin: "-60px" });

  // Rotating CTA Word Timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % ctaWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const activeSolution = aiSolutionsData[activeSolutionIdx];
  const activeRoadmap = deploymentRoadmap[activeRoadmapStep];
  const testimonial = testimonialsData.find((t) => t.id === "test-1") || testimonialsData[0];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c]">
      
      {/* =========================================================================
          1. HERO — ARAV INTELLIGENCE CORE AWAKENING & DEPTH SYSTEM
          ========================================================================= */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none">
        <HeroAICoreVisual />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-radial from-[#2e936f]/8 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1536px] mx-auto w-full space-y-6 relative z-10">
          {/* Top Breadcrumb & Badge */}
          <div className="space-y-3">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: "AI Portfolio" },
              ]}
            />
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#161616] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]"
            >
              <Sparkles className="w-4 h-4" />
              <span>THE INTELLIGENCE LAYER OF AN ENTERPRISE</span>
            </motion.div>
          </div>

          {/* Headline & Hero Copy */}
          <div className="max-w-5xl mx-auto w-full text-center space-y-5 pt-4 pb-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold font-display tracking-tight leading-[1.08] text-[#1b2823] dark:text-[#ffffff]"
            >
              Turn AI Potential Into <span className="text-[#f15e1c]">Working Business Systems.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-xl lg:text-2xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
            >
              Design, integrate and deploy practical AI solutions that automate workflows, connect enterprise data and help teams make better decisions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                    className="w-full sm:w-auto justify-center shadow-lg shadow-[#f15e1c]/25"
                  >
                    Discuss an AI Use Case
                  </Button3D>
                </MagneticButton>
              </Link>
              <a href="#system" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                    Explore AI Architecture
                  </Button3D>
                </MagneticButton>
              </a>
            </motion.div>
          </div>

          {/* AI Core System Status Bar */}
          <div className="pt-4 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-2xl bg-white/80 dark:bg-[#000000]/80 border border-[#f7d7b0] dark:border-[#1a1a1a] backdrop-blur-md shadow-lg text-xs font-mono font-bold text-[#f15e1c]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                STATUS: AI CORE ONLINE
              </span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>PRIVACY: 100% ZERO-RETENTION</span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>LATENCY: SUB-SECOND</span>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          2. SCROLL EXPERIENCE — "ENTER THE AI" (SIGNATURE INTELLIGENCE PIPELINE)
          ========================================================================= */}
      <section
        id="system"
        ref={pipelineContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              ARAV INTELLIGENCE CORE
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Data &bull; Context &bull; Reasoning &bull; Action
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Scroll down to examine how enterprise data transforms into contextual reasoning, autonomous action, and operational feedback.
            </p>
          </div>

          {/* 5-Phase Pipeline Progress Strip */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-sm max-w-5xl mx-auto flex items-center justify-between overflow-x-auto gap-2">
            {aiPipelinePhases.map((ph, i) => (
              <div
                key={ph.phase}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all",
                  i <= activePipelinePhase
                    ? "bg-[#f15e1c] text-white shadow-xs"
                    : "bg-[#fefaf5] dark:bg-[#0a0a0a] text-[#7A6A5F] border border-[#f7d7b0]"
                )}
              >
                <span>{ph.phase}</span>
                <span>{ph.name}</span>
                {i < 4 && <span className="opacity-60 ml-1">&rarr;</span>}
              </div>
            ))}
          </div>

          {/* Active Phase Detail Card */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={aiPipelinePhases[activePipelinePhase].phase}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f15e1c]/40 shadow-2xl space-y-6 text-left relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      PHASE {aiPipelinePhases[activePipelinePhase].phase} / 05 &bull; {aiPipelinePhases[activePipelinePhase].name}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {aiPipelinePhases[activePipelinePhase].desc}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#2e936f] shadow-xs">
                    ACTIVE INTELLIGENCE PHASE
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">FACTUAL RETRIEVAL</span>
                    <span className="text-sm font-mono font-extrabold text-[#f15e1c]">99.4% ACCURACY</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">MANUAL TASK REDUCTION</span>
                    <span className="text-sm font-mono font-extrabold text-[#2e936f]">68% REDUCTION</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">PROCESSING SPEED</span>
                    <span className="text-sm font-mono font-extrabold text-[#fab60a]">10x FASTER</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4 Solution Workstream Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiSolutionsData.map((sol, idx) => {
              const isActive = activeSolutionIdx === idx;

              return (
                <TiltCard key={sol.numStr} maxTilt={4} scale={1.01}>
                  <div
                    onClick={() => setActiveSolutionIdx(idx)}
                    onMouseEnter={() => setActiveSolutionIdx(idx)}
                    className={cn(
                      "p-8 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer space-y-6 text-left flex flex-col justify-between min-h-[340px] relative overflow-hidden group",
                      isActive
                        ? "bg-white dark:bg-[#000000] border-[#f15e1c] shadow-2xl ring-2 ring-[#f15e1c]/20"
                        : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a] opacity-80 hover:opacity-100"
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] group-hover:scale-110 transition-transform">
                            {sol.icon}
                          </div>
                          <span className="text-xs font-mono font-black text-[#f15e1c]">
                            MODULE {sol.numStr}
                          </span>
                        </div>

                        <div className="px-3 py-1 rounded-xl bg-[#fce3d3] dark:bg-[#161616] text-xs font-mono font-bold text-[#f15e1c]">
                          {sol.metric}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                          {sol.title}
                        </h3>
                        <p className="text-xs font-mono font-semibold text-[#2e936f] mt-1">
                          {sol.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                        {sol.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A6A5F]">
                        Key Scope Deliverables
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                        {sol.deliverables.map((del, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                            <span className="truncate">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          3. PROBLEM TO SOLUTION TRANSFORMATION (SIGNATURE CARDS)
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              AI FRICTION POINTS &bull; RESOLVED
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Bridging the Gap Between Hype &amp; Enterprise Execution
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Transforming legacy integration barriers and data privacy concerns into production-ready engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemSolutionPairs.map((pair, i) => (
              <div
                key={i}
                className="p-8 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl space-y-6 text-left flex flex-col justify-between"
              >
                {/* Problem Side */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] space-y-2 opacity-80">
                  <span className="text-[10px] font-mono font-black text-[#f15e1c] block uppercase">
                    FRICTION {pair.prob}
                  </span>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-tight">
                    {pair.probDesc}
                  </p>
                </div>

                <div className="text-center text-xs font-mono font-bold text-[#f15e1c]">
                  &darr; RESOLVED THROUGH ENGINEERING &darr;
                </div>

                {/* Solution Side */}
                <div className="p-4 rounded-2xl bg-[#e8f5f1] dark:bg-[#192a24] border-2 border-[#2e936f] space-y-2 shadow-md">
                  <span className="text-[10px] font-mono font-black text-[#2e936f] block uppercase">
                    {pair.sol}
                  </span>
                  <p className="text-xs font-semibold text-[#1b2823] dark:text-[#ffffff] leading-tight">
                    {pair.solDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          4. WOW MOMENT 03 — RAG KNOWLEDGE RETRIEVAL EXPERIENCE
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              PRIVATE DATA &amp; RETRIEVAL ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              RAG Knowledge Retrieval Pipeline
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Physically chunking, embedding, retrieving, and grounding LLM answers in company data.
            </p>
          </div>

          <div className="p-8 sm:p-14 rounded-[3rem] bg-white dark:bg-[#000000] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
              {[
                { step: "01", name: "DOCUMENTS", desc: "PDFs, CRMs & Databases" },
                { step: "02", name: "VECTOR SEARCH", desc: "Pgvector Semantic Search" },
                { step: "03", name: "RELEVANT CHUNKS", desc: "Context Window Assembly" },
                { step: "04", name: "LLM REASONER", desc: "Prompt + Context Model" },
                { step: "05", name: "GROUNDED RESPONSE", desc: "Exact Citation Answer" },
              ].map((rg, idx) => (
                <div
                  key={rg.step}
                  className="p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] space-y-2 text-center"
                >
                  <span className="text-[10px] font-mono font-black text-[#f15e1c] block">
                    STEP {rg.step}
                  </span>
                  <h4 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {rg.name}
                  </h4>
                  <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] leading-tight">
                    {rg.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-center gap-3 text-xs font-mono font-bold text-[#2e936f]">
              <ShieldCheck className="w-4 h-4" />
              <span>ZERO DATA RETENTION &bull; 100% PROPRIETARY IP PROTECTION &bull; DPDP ACT COMPLIANT</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. AI TECHNOLOGY CONSTELLATION
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              AI TECHNOLOGY CONSTELLATION
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Production AI Stack &amp; Frameworks
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Built with industry-leading LLMs, vector storage, agent orchestration tools, and containerized backends.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techConstellation.map((tech, i) => (
              <TiltCard key={i} maxTilt={4} scale={1.01}>
                <div className="p-6 rounded-[2rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md hover:border-[#f15e1c] transition-all space-y-3 text-left">
                  <span className="text-[10px] font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                    {tech.category}
                  </span>
                  <h3 className="text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">
                    {tech.desc}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          6. AI DEPLOYMENT ROADMAP (5-STAGE TIMELINE WITH LIVE STATUS)
          ========================================================================= */}
      <section
        ref={roadmapContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              AI DEPLOYMENT JOURNEY
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              5-Stage AI Implementation Roadmap
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              From initial feasibility audit to live deployment with continuous token telemetry.
            </p>
          </div>

          {/* Roadmap Progress Bar */}
          <div className="relative py-4 max-w-5xl mx-auto">
            <div className="relative w-full bg-[#f7d7b0] dark:bg-[#1a1a1a] h-2.5 rounded-full overflow-hidden">
              <motion.div
                style={{ width: roadmapLineWidth }}
                className="h-full bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a]"
              />
            </div>

            <div className="flex justify-between items-center absolute inset-x-0 -top-2.5">
              {deploymentRoadmap.map((rm, idx) => {
                const isActive = activeRoadmapStep === idx;
                const isPassed = idx <= activeRoadmapStep;

                return (
                  <button
                    key={rm.step}
                    type="button"
                    onClick={() => setActiveRoadmapStep(idx)}
                    className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm font-mono font-black cursor-pointer shrink-0",
                      isActive
                        ? "bg-[#f15e1c] border-white text-white scale-125 shadow-lg shadow-[#f15e1c]/40 ring-4 ring-[#f15e1c]/20 z-10"
                        : isPassed
                        ? "bg-[#2e936f] border-white text-white"
                        : "bg-white dark:bg-[#000000] border-[#f7d7b0] dark:border-[#1a1a1a] text-[#7A6A5F]"
                    )}
                  >
                    {isPassed && !isActive ? <Check className="w-4 h-4 text-white" /> : rm.step}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Roadmap Step Card */}
          <div className="max-w-5xl mx-auto">
            {(() => {
              const activeRoadmap = deploymentRoadmap[activeRoadmapStep] || deploymentRoadmap[0];
              return (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRoadmap.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f15e1c]/40 shadow-2xl space-y-6 text-left relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {activeRoadmap.step} / 05 &bull; ENTERPRISE DEPLOYMENT
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {activeRoadmap.title}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#2e936f] shadow-xs">
                    {activeRoadmap.deliverable || activeRoadmap.status}
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {activeRoadmap.desc}
                </p>

                <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#1a1a1a] flex items-center justify-between text-xs font-mono font-bold text-[#f15e1c]">
                  <span>CONTINUOUS TOKEN &amp; LATENCY TELEMETRY</span>
                  <span>STAGE 05 GOES LIVE WITH REAL-TIME MONITORING &rarr;</span>
                </div>
              </motion.div>
            </AnimatePresence>
              );
            })()}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. ABOUT OUR CEO — EDITORIAL LEADERSHIP PROFILE
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-[#f15e1c] shadow-xl bg-[#fce3d3] dark:bg-[#161616] flex items-center justify-center text-center p-6 space-y-2 flex-col">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f15e1c] text-white flex items-center justify-center text-2xl sm:text-3xl font-black font-display shadow-md">
                AS
              </div>
              <div className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Aryan Sayal
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#f15e1c]">
                CEO &amp; Managing Director
              </div>
              <span className="text-xs text-[#2e936f] font-mono">Arav Innovations</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <Badge variant="secondary" size="md">
              About Our CEO
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Aryan Sayal
            </h2>
            <p className="text-xs sm:text-sm font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
              CEO, Arav Innovations
            </p>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
              &quot;AI should solve actual business bottlenecks, not create hype. We engineer systems grounded in company data, with human oversight and zero retention guarantees.&quot;
            </p>
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/aravinnovations/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f15e1c] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#d44e14] transition-colors"
              >
                <Globe2 className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7.5 FREQUENTLY ASKED QUESTIONS (AI PORTFOLIO)
          ========================================================================= */}
      <FAQAccordion />

      {/* =========================================================================
          8. FINAL CTA — FLAGSHIP INTELLIGENCE CORE CULMINATION
          ========================================================================= */}
      <section id="inquire" className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 select-none">
        <div className="max-w-[1536px] mx-auto space-y-8">
          {/* Connector Flow Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-widest block">
              ENTERPRISE AI CULMINATION
            </span>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] flex-wrap">
              <span>DATA</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>CONTEXT</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>REASONING</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>ACTION</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>FEEDBACK</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span className="text-[#2e936f]">CONTINUOUS INTELLIGENCE</span>
            </div>
          </div>

          <div className="rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#ffec69]" />
                <span>PUT PRACTICAL AI TO WORK</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
                Ready to build an AI system that is
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

              <p className="text-base sm:text-xl font-bold text-white/90">
                Kick start an AI engineering initiative with us today
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                    className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0]"
                  >
                    Discuss an AI Use Case
                  </Button3D>
                </MagneticButton>
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20an%20AI%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10">
                    Instant WhatsApp Inquiry
                  </Button3D>
                </MagneticButton>
              </a>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-white/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Zero Data Retention Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Proprietary IP Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Regional Teams in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FOOTER BRAND MOMENT
          ========================================================================= */}
      <footer className="py-6 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] overflow-hidden select-none">
        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] tracking-widest flex-wrap px-4">
          <span>DATA</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>CONTEXT</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>REASONING</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>ACTION</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>FEEDBACK</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>CONTINUOUS INTELLIGENCE</span>
        </div>
      </footer>
    </div>
  );
}

export default AIPortfolioInteractivePage;
