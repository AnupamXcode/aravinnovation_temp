"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
} from "lucide-react";
import { Service } from "@/data/services";
import { caseStudiesData } from "@/data/case-studies";
import { testimonialsData } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AIPortfolioPageProps {
  service: Service;
}

// 4 Core AI Solutions Items
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

// Interactive 8-Step System Layers
const systemLayers = [
  { step: "01", label: "DATA INGESTION", title: "Enterprise Data Ingestion & Indexing", desc: "Connecting structured databases, unstructured PDFs, CRMs, and APIs into secure vector storage." },
  { step: "02", label: "KNOWLEDGE RETRIEVAL", title: "Vector Search & Citation Engine", desc: "Chunking, embedding, and retrieving relevant contextual knowledge with exact citations." },
  { step: "03", label: "AI REASONING", title: "Model Reasoning & Safety Guardrails", desc: "Executing enterprise LLM reasoning with role-based access controls and zero-data-retention APIs." },
  { step: "04", label: "WORKFLOW AUTOMATION", title: "Agent Actions & Human-in-the-Loop", desc: "Translating AI decisions into automated CRM updates, ERP actions, and human approval checkpoints." },
  { step: "05", label: "TELEMETRY & OPTIMIZATION", title: "Operational Efficiency & Cost Tuning", desc: "Measuring process speedup, tracking token telemetry, and continuously lowering operating cost." },
];

const ctaWords = ["RELIABLE", "SECURE", "ENTERPRISE-READY", "MEASURABLE", "SCALABLE"];

export function AIPortfolioInteractivePage({ service }: AIPortfolioPageProps) {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [activeLayerIndex, setActiveLayerIndex] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % ctaWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#121c18] text-[#1b2823] dark:text-[#ffffff] transition-colors duration-300">
      {/* Breadcrumb Header */}
      <div className="bg-[#f7d7b0]/20 dark:bg-[#1a2823] border-b border-[#f7d7b0] dark:border-[#253630] py-3 pt-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1760px] mx-auto flex items-center justify-between">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "AI Portfolio", href: "/services/ai-portfolio" },
            ]}
          />
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#f15e1c] font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />
            <span>ENTERPRISE AI ENGINEERING SYSTEM</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1760px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-left">
            <Badge variant="secondary" size="md" className="bg-[#fce3d3] text-[#f15e1c] dark:bg-[#261f1a]">
              AI ENGINEERING &bull; AUTOMATION &bull; RAG SYSTEMS
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-[1.08]">
              Turn AI Potential Into <br />
              <span className="text-[#f15e1c]">Working Business Systems.</span>
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-[#2e936f] max-w-3xl leading-relaxed">
              Design, integrate and deploy practical AI solutions that automate workflows, connect enterprise data and help teams make better decisions.
            </p>

            <p className="text-base text-[#4a5c55] dark:text-[#d3eee4] max-w-2xl leading-relaxed">
              Arav Innovations helps forward-thinking enterprises move beyond AI experimentation by building production-ready RAG pipelines, intelligent agents, and zero-trust governance systems.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/contact">
                <Button3D variant="primary" size="lg" className="w-full sm:w-auto justify-center bg-[#f15e1c] hover:bg-[#fab60a] text-white">
                  Discuss an AI Use Case &rarr;
                </Button3D>
              </Link>
              <a href="#system">
                <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-[#f15e1c] border-[#f15e1c] hover:bg-[#f7d7b0]">
                  Explore AI System Architecture
                </Button3D>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#f15e1c] text-white flex items-center justify-center mx-auto shadow-md">
              <Cpu className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Enterprise AI Core
              </h3>
              <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                Grounding enterprise LLMs in proprietary data with zero retention, role-based access, and sub-second retrieval latency.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-[#fce3d3] dark:bg-[#261f1a] text-xs font-mono font-bold text-[#f15e1c]">
              PRACTICE CODE: AI-PORTFOLIO-V2
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Tabs */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1760px] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="secondary" size="md">
              AI CAPABILITY MODULES
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Enterprise AI Engineering Capabilities
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {aiSolutionsData.map((sol, idx) => (
              <button
                type="button"
                key={sol.numStr}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "px-5 py-3 rounded-full text-xs font-bold transition-all cursor-pointer border flex items-center gap-2",
                  activeTab === idx
                    ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-lg scale-105"
                    : "bg-white dark:bg-[#1a2823] text-[#1b2823] dark:text-[#ffffff] border-[#f7d7b0] dark:border-[#253630] hover:bg-[#f7d7b0]/30"
                )}
              >
                <span>{sol.numStr}.</span>
                <span>{sol.title}</span>
              </button>
            ))}
          </div>

          {/* Active Solution Detail Card */}
          <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-white dark:bg-[#1a2823] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-extrabold text-[#f15e1c] px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a]">
                  {aiSolutionsData[activeTab].stageName}
                </span>
                <span className="text-xs font-mono font-bold text-[#2e936f]">MODULE {aiSolutionsData[activeTab].numStr}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {aiSolutionsData[activeTab].title}
              </h3>
              <p className="text-xs font-mono font-bold text-[#f15e1c]">
                {aiSolutionsData[activeTab].subtitle}
              </p>
              <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                {aiSolutionsData[activeTab].description}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff] uppercase block">
                  KEY DELIVERABLES & ARCHITECTURE:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {aiSolutionsData[activeTab].deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                      <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] text-center space-y-4">
              <div className="text-4xl font-extrabold font-display text-[#f15e1c]">
                {aiSolutionsData[activeTab].metric}
              </div>
              <div className="text-xs font-mono font-bold text-[#2e936f] uppercase">
                {aiSolutionsData[activeTab].metricLabel}
              </div>
              <Link href="/contact" className="block pt-2">
                <Button3D variant="primary" size="sm" className="w-full justify-center bg-[#f15e1c] text-white">
                  Implement This Module &rarr;
                </Button3D>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3D System Visual Architecture */}
      <section id="system" className="relative py-20 px-4 sm:px-6 lg:px-12 bg-[#fefaf5] dark:bg-[#172420] border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1760px] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="secondary" size="md">
              SYSTEM ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Data &bull; Knowledge &bull; AI &bull; Workflow &bull; Outcome
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-5 space-y-3">
              {systemLayers.map((layer, idx) => {
                const isSelected = activeLayerIndex === idx;
                return (
                  <button
                    type="button"
                    key={layer.step}
                    onClick={() => setActiveLayerIndex(idx)}
                    className={cn(
                      "w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4",
                      isSelected
                        ? "bg-[#f15e1c] border-[#f15e1c] text-white shadow-lg scale-[1.02]"
                        : "bg-white dark:bg-[#1a2823] border-[#f7d7b0] dark:border-[#253630] text-[#1b2823] dark:text-[#ffffff] hover:bg-[#f7d7b0]/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-md bg-white/20">
                        {layer.step}
                      </span>
                      <span className="text-xs font-mono font-extrabold tracking-wider">{layer.label}</span>
                    </div>
                    <ChevronRight className={cn("w-4 h-4 transition-transform", isSelected && "rotate-90")} />
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 p-8 rounded-[2.5rem] bg-white dark:bg-[#1a2823] border-2 border-[#1b2823] dark:border-[#253630] shadow-xl space-y-6">
              {(() => {
                const current = systemLayers[activeLayerIndex];
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-[#f7d7b0] dark:border-[#253630]">
                      <span className="text-xs font-mono font-extrabold text-[#f15e1c]">
                        LAYER 0{activeLayerIndex + 1}: {current.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#2e936f] bg-[#2e936f]/10 px-3 py-1 rounded-full">
                        ACTIVE STATE
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">{current.title}</h3>
                    <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">{current.desc}</p>

                    <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-[#f15e1c]">
                      <span>DATA</span> &rarr;
                      <span>KNOWLEDGE</span> &rarr;
                      <span>AI</span> &rarr;
                      <span>WORKFLOW</span> &rarr;
                      <span>OUTCOME</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* CEO Leadership Section */}
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
              Leadership Directives
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Aryan Sayal
            </h2>
            <p className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
              CEO, Arav Innovations
            </p>
            <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
              &quot;AI should solve actual business bottlenecks, not create hype. We engineer systems grounded in company data, with human oversight and zero retention guarantees.&quot;
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

      {/* Final CTA with Word Flip */}
      <section id="inquire" className="relative py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
              <span>PUT PRACTICAL AI TO WORK</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Ready to build an AI system that is
            </h2>

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
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button3D variant="primary" size="lg" className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0]">
                Discuss an AI Use Case &rarr;
              </Button3D>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
