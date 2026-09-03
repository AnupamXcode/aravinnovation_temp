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
  Users,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Code,
  ShieldCheck,
  Cpu,
  RefreshCw,
  UserPlus,
  Target,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Search,
  Share2,
  Workflow,
  Zap,
  Building2,
  Cloud,
  Database,
  Layout,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

interface TrainingStaffPageProps {
  service: Service;
  relatedPosts?: BlogPost[];
}

// -----------------------------------------------------------------------------
// System Scan Transition (Brand scan line)
// -----------------------------------------------------------------------------
function CapabilityScanTransition() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative w-full h-px my-6 overflow-hidden pointer-events-none select-none">
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
// Interactive Capability Map Data (Signature Visual)
// -----------------------------------------------------------------------------
const capabilityMapNodes = [
  {
    id: "goal",
    step: "01",
    label: "BUSINESS GOAL",
    short: "Target Outcomes",
    title: "Define Business & Project Objectives",
    desc: "Every capability requirement begins with a clear business priority—whether scaling digital products, modernizing infrastructure, or launching new capabilities.",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: "need",
    step: "02",
    label: "CAPABILITY NEED",
    short: "Identify Skill Gaps",
    title: "Isolate Skill & Capacity Gaps",
    desc: "Assess whether the challenge requires strengthening existing team competencies, adding specialized role expertise, or expanding delivery throughput.",
    icon: <Search className="w-5 h-5" />,
  },
  {
    id: "skill",
    step: "03",
    label: "SKILL / ROLE",
    short: "Required Expertise",
    title: "Specify Technical & Domain Roles",
    desc: "Identify the exact technical disciplines, engineering levels, frameworks, and operating experience needed to fulfill the delivery requirements.",
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: "model",
    step: "04",
    label: "TEAM MODEL",
    short: "Select Model",
    title: "Choose the Engagement Model",
    desc: "Select structured training & upskilling for internal teams, specialist role placement, or extended delivery squad integration based on project scope.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "delivery",
    step: "05",
    label: "DELIVERY",
    short: "Collaborative Work",
    title: "Execute Within Shared Workflows",
    desc: "Integrate capability seamlessly into active sprints, engineering practices, tools, and communication structures alongside your core team.",
    icon: <Workflow className="w-5 h-5" />,
  },
  {
    id: "transfer",
    step: "06",
    label: "KNOWLEDGE TRANSFER",
    short: "Retain Capability",
    title: "Anchor Skills Within Your Organization",
    desc: "Ensure long-term value through documentation, pair working, mentorship, and operational handover so team capability grows permanently.",
    icon: <Share2 className="w-5 h-5" />,
  },
];

// -----------------------------------------------------------------------------
// Training Offering Data (Build Capability)
// -----------------------------------------------------------------------------
const trainingCapabilities = [
  {
    num: "01",
    title: "Technical Upskilling",
    desc: "Modern development practices, cloud architecture, data pipelines, AI integration, and relevant engineering disciplines aligned with your technology stack.",
    icon: <Code className="w-6 h-6 text-[#F15E1C]" />,
    focus: "Development • Cloud • Data • AI Capabilities",
  },
  {
    num: "02",
    title: "Role-Based Training",
    desc: "Targeted learning paths designed around specific responsibilities, engineering experience levels, and architectural standards within your team.",
    icon: <GraduationCap className="w-6 h-6 text-[#2E936F]" />,
    focus: "Role Alignment • Responsibilities • Skill Levels",
  },
  {
    num: "03",
    title: "Workshops & Hands-On Learning",
    desc: "Practical sessions, guided technical labs, and interactive problem-solving exercises focused on real production scenarios rather than theory alone.",
    icon: <BookOpen className="w-6 h-6 text-[#FAB60A]" />,
    focus: "Practical Labs • Real Scenarios • Guided Exercises",
  },
  {
    num: "04",
    title: "Team Enablement",
    desc: "Shared practices, code standards, CI/CD routines, and collaborative patterns that help engineering groups adopt new technologies smoothly.",
    icon: <Users className="w-6 h-6 text-[#F15E1C]" />,
    focus: "Shared Practices • Operating Standards • Tool Adoption",
  },
  {
    num: "05",
    title: "Knowledge Transfer",
    desc: "Structured handover protocols, architectural documentation, and pair-programming sessions ensuring internal teams retain capability permanently.",
    icon: <Share2 className="w-6 h-6 text-[#2E936F]" />,
    focus: "Documentation • Handover • Long-Term Retention",
  },
];

// -----------------------------------------------------------------------------
// Staff Augmentation Roles Data (Extend Capability)
// -----------------------------------------------------------------------------
const augmentationRoles = [
  { title: "Software Engineering", desc: "Full-Stack, Frontend, Backend & Mobile Engineers", icon: <Code className="w-5 h-5 text-[#F15E1C]" /> },
  { title: "Cloud & DevOps", desc: "Cloud Architects, CI/CD & Infrastructure Engineers", icon: <Cloud className="w-5 h-5 text-[#2E936F]" /> },
  { title: "Data & Analytics", desc: "Data Engineers, Analytics Specialists & Pipeline Architects", icon: <Database className="w-5 h-5 text-[#FAB60A]" /> },
  { title: "AI / ML", desc: "AI Integration Engineers & Applied Machine Learning Developers", icon: <Cpu className="w-5 h-5 text-[#F15E1C]" /> },
  { title: "QA & Testing", desc: "Automation Engineers & Quality Assurance Specialists", icon: <ShieldCheck className="w-5 h-5 text-[#2E936F]" /> },
  { title: "UI / UX Design", desc: "Product Designers, UX Researchers & System Designers", icon: <Layout className="w-5 h-5 text-[#FAB60A]" /> },
  { title: "Project & Delivery Support", desc: "Technical Delivery Leads, Scrum Masters & Project Coordinators", icon: <Workflow className="w-5 h-5 text-[#F15E1C]" /> },
  { title: "Technology Consulting", desc: "Solution Architects & Technical Strategy Advisors", icon: <Building2 className="w-5 h-5 text-[#2E936F]" /> },
];

// -----------------------------------------------------------------------------
// Interactive Team Models Data
// -----------------------------------------------------------------------------
const teamModels = [
  {
    id: "specialist",
    name: "SPECIALIST MODEL",
    title: "Focused Expertise for Defined Initiatives",
    tagline: "Bring in focused technical expertise to solve specific capability gaps or complex delivery hurdles.",
    bestFor: "Initiatives requiring niche technical skills, architectural guidance, or short-term expert consulting.",
    engagement: "Role-based or project-aligned engagement alongside internal teams.",
    primaryValue: "Immediate access to specialized technical depth without long-term overhead.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: "extended",
    name: "EXTENDED TEAM MODEL",
    title: "Complementary Capacity for Active Squads",
    tagline: "Add experienced professionals directly into your existing engineering squads to boost delivery throughput.",
    bestFor: "Teams facing capacity constraints, tight product deadlines, or scaling roadmaps.",
    engagement: "Integrated sprint-based participation using your tools, workflows, and standups.",
    primaryValue: "Flexible capacity expansion that seamlessly aligns with your internal team rhythm.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "capability",
    name: "CAPABILITY PROGRAM MODEL",
    title: "Structured Upskilling & Team Enablement",
    tagline: "Develop internal skills through tailored curriculum, workshops, and structured knowledge transfer.",
    bestFor: "Organizations adopting new tech stacks, modernizing legacy systems, or upskilling internal staff.",
    engagement: "Structured training modules, hands-on labs, and post-training mentorship.",
    primaryValue: "Permanent capability growth that stays within your organization.",
    icon: <GraduationCap className="w-6 h-6" />,
  },
];

// -----------------------------------------------------------------------------
// How We Work (6 Stages)
// -----------------------------------------------------------------------------
const workStages = [
  { step: "01", name: "DISCOVER", desc: "Understand business objectives, current team roles, capability gaps, and delivery context." },
  { step: "02", name: "DEFINE", desc: "Identify the precise skills, roles, or team engagement model required for the work ahead." },
  { step: "03", name: "BUILD / EXTEND", desc: "Deliver structured training programs or introduce aligned specialist professionals." },
  { step: "04", name: "INTEGRATE", desc: "Align people with existing workflows, tools, communication channels, and quality standards." },
  { step: "05", name: "ENABLE", desc: "Support ongoing knowledge sharing, technical documentation, and capability adoption." },
  { step: "06", name: "EVOLVE", desc: "Review changing team needs and identify the next capability priority as projects progress." },
];

// -----------------------------------------------------------------------------
// Skill -> Role -> Team Matrix Illustrative Examples
// -----------------------------------------------------------------------------
const skillToTeamExamples = [
  {
    scenario: "Cloud Migration & Modernization",
    gap: "Legacy Infrastructure Dependencies",
    expertise: "Cloud Architecture & Infrastructure as Code",
    role: "Senior Cloud / DevOps Engineer",
    structure: "Extended Delivery Team",
    model: "Delivery Support & Mentorship",
  },
  {
    scenario: "Applied AI Integration",
    gap: "Limited AI/ML Implementation Experience",
    expertise: "LLM API Integration & Prompt Engineering",
    role: "AI Solution Specialist",
    structure: "Specialist Placement + Team Training",
    model: "Knowledge Transfer & Pair Working",
  },
  {
    scenario: "Frontend System Standardization",
    gap: "Inconsistent Component & UI Practices",
    expertise: "Design Systems & Modern React Frameworks",
    role: "Senior Frontend Lead",
    structure: "Capability Upskilling Program",
    model: "Workshop & Architecture Coaching",
  },
];

// -----------------------------------------------------------------------------
// Outcomes Data (6 Qualitative Outcomes)
// -----------------------------------------------------------------------------
const capabilityOutcomes = [
  { title: "Faster Access to Expertise", desc: "Bring relevant technical skills into active work when specific capability gaps arise.", icon: <Zap className="w-5 h-5 text-[#F15E1C]" /> },
  { title: "Stronger Internal Capability", desc: "Develop knowledge, modern practices, and engineering confidence that remain within the organization.", icon: <GraduationCap className="w-5 h-5 text-[#2E936F]" /> },
  { title: "Flexible Delivery Capacity", desc: "Extend team throughput smoothly around changing project demands and product roadmaps.", icon: <Users className="w-5 h-5 text-[#FAB60A]" /> },
  { title: "Better Knowledge Sharing", desc: "Connect specialists with internal team members through structured collaboration and documentation.", icon: <Share2 className="w-5 h-5 text-[#F15E1C]" /> },
  { title: "Clearer Role Alignment", desc: "Match capability and technical responsibilities accurately to the actual work required.", icon: <Target className="w-5 h-5 text-[#2E936F]" /> },
  { title: "Continuous Development", desc: "Keep team skills continuously aligned with evolving technologies and business priorities.", icon: <RefreshCw className="w-5 h-5 text-[#FAB60A]" /> },
];

// -----------------------------------------------------------------------------
// Industries / Use Cases Data
// -----------------------------------------------------------------------------
const targetIndustries = [
  { title: "Technology & SaaS", desc: "Scaling engineering throughput for active product roadmaps and platform features." },
  { title: "Enterprise IT", desc: "Upskilling internal IT teams and extending capacity during major technology shifts." },
  { title: "Professional Services", desc: "Adding specialized technical expertise for client-facing delivery initiatives." },
  { title: "Financial & Business Services", desc: "Strengthening technical capabilities, data engineering, and modern standards." },
  { title: "Healthcare & Life Sciences", desc: "Extending technical capacity while maintaining strict quality and process discipline." },
  { title: "Education & Digital Platforms", desc: "Modernizing core systems and enabling internal teams on cloud and data technologies." },
  { title: "Digital Businesses", desc: "Accelerating web, mobile, and digital product delivery with flexible team models." },
];

// -----------------------------------------------------------------------------
// What We Help Address Data
// -----------------------------------------------------------------------------
const whatWeAddress = [
  { title: "Skill Gaps", desc: "Addressing missing technical competencies within existing team structures." },
  { title: "Capacity Constraints", desc: "Relieving delivery pressure when project roadmaps outpace internal bandwidth." },
  { title: "Specialist Expertise Needs", desc: "Accessing niche technical knowledge for complex architectural challenges." },
  { title: "Technology Adoption", desc: "Helping teams adopt modern cloud, AI, data, and engineering frameworks." },
  { title: "Team Expansion", desc: "Scaling delivery teams systematically without disrupting existing workflows." },
  { title: "Knowledge Transfer", desc: "Ensuring external expertise translates into permanent internal capability." },
  { title: "Capability Development", desc: "Establishing long-term learning and skill progression paths for technical staff." },
];

// -----------------------------------------------------------------------------
// FAQ Data
// -----------------------------------------------------------------------------
const faqData = [
  {
    question: "What is staff augmentation and when should a company use it?",
    answer:
      "Staff augmentation is an engagement model where skilled professionals join your existing team to extend delivery capacity or provide specific role expertise. It is ideal when you face tight project deadlines, capacity bottlenecks, or temporary skill gaps, while retaining full management and direction of your delivery process.",
  },
  {
    question: "How is staff augmentation different from outsourcing?",
    answer:
      "Unlike traditional project outsourcing—where an external vendor takes full ownership of project management and delivery deliverables—staff augmentation integrates individual specialists or pods directly into your existing team, workflows, and management structure.",
  },
  {
    question: "Can you train our existing technology teams?",
    answer:
      "Yes. Our training and upskilling programs are structured around your organization's specific technical stack, engineering roles, and business goals, combining practical workshops, guided labs, and structured knowledge transfer.",
  },
  {
    question: "Can training and staff augmentation be combined?",
    answer:
      "Yes. Many organizations combine both approaches: introducing specialist capability to help deliver immediate project goals while simultaneously running upskilling programs so internal teams can take over long-term maintenance and evolution.",
  },
  {
    question: "How do you integrate augmented professionals with an existing team?",
    answer:
      "Augmented professionals align directly with your existing communication channels, daily standups, version control repositories, CI/CD pipelines, and engineering standards, ensuring smooth collaboration from day one.",
  },
];

export function TrainingStaffInteractivePage({ service, relatedPosts }: TrainingStaffPageProps) {
  const [activeNodeIdx, setActiveNodeIdx] = React.useState<number>(0);
  const [activeModelId, setActiveModelId] = React.useState<string>("specialist");
  const [activeExampleIdx, setActiveExampleIdx] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  // Hover state for interactive node preview on desktop
  const [hoverNodeIdx, setHoverNodeIdx] = React.useState<number | null>(null);
  const [hoverModelId, setHoverModelId] = React.useState<string | null>(null);

  // Dynamic Blog Posts (Real CMS data)
  const articles = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  // Displayed Node: Hovered node takes visual precedence, fallback to active selected node
  const displayedNodeIdx = hoverNodeIdx !== null ? hoverNodeIdx : activeNodeIdx;
  const activeNode = capabilityMapNodes[displayedNodeIdx];

  // Displayed Model: Hovered model takes visual precedence, fallback to active selected model
  const displayedModelId = hoverModelId !== null ? hoverModelId : activeModelId;
  const activeModel = teamModels.find((m) => m.id === displayedModelId) || teamModels[0];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1b2823] text-[#1b2823] dark:text-[#ffffff] transition-colors duration-300 overflow-x-hidden selection:bg-[#F15E1C]/20 selection:text-[#F15E1C]">
      
      {/* Breadcrumb Navigation */}
      <div className="relative z-10 w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-3 sm:pt-4 pb-1 sm:pb-2">
        <Breadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: "Training & Staff Augmentation", href: "/services/training-staff-augmentation" },
          ]}
        />
      </div>

      {/* =====================================================================
          2. HERO SECTION — DUAL PATHWAY WITH IMAGE 1 MAIN VISUAL
          ===================================================================== */}
      <section className="relative z-10 w-full border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-2 sm:pt-4 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2">
                <Badge variant="outline" className="border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3.5 py-1.5 font-semibold tracking-wider text-xs rounded-full shadow-xs">
                  TEAM CAPABILITY • TALENT • ENABLEMENT
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-[1.12]">
                Build Stronger Teams. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F15E1C] via-[#FAB60A] to-[#2E936F]">
                  Add the Right Expertise When You Need It.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                Develop the capabilities your teams need and extend delivery capacity with skilled professionals who can integrate into your existing ways of working.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/contact">
                  <Button3D variant="primary" size="lg" className="flex items-center gap-2 font-semibold bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] hover:opacity-95 transition-all">
                    Build My Team Capability
                    <ArrowRight className="w-4 h-4" />
                  </Button3D>
                </Link>
                <a href="#capability-map">
                  <Button3D variant="secondary" size="lg" className="flex items-center gap-2 font-semibold bg-[#2E936F] text-[#FFFFFF] border-[#2E936F] hover:opacity-95 transition-all">
                    Explore Our Approach
                  </Button3D>
                </a>
              </div>

              {/* Dual Pathway Distinction Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-4 rounded-xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20 transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-[#F15E1C]" />
                    <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff] uppercase tracking-wider">TRAIN YOUR TEAM</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Upskill &amp; reskill internal staff on modern stacks, tools, and practices.</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-4 rounded-xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] hover:border-[#2E936F] hover:bg-[#F7D7B0]/20 transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <UserPlus className="w-4 h-4 text-[#2E936F]" />
                    <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff] uppercase tracking-wider">EXTEND YOUR TEAM</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Add aligned technical specialists and complementary project capacity.</p>
                </motion.div>
              </div>

              {/* Supporting Keywords Bar */}
              <div className="pt-4 border-t border-[#F7D7B0]">
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2.5">
                  Capability Disciplines
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Technology Training",
                    "Team Upskilling",
                    "Staff Augmentation",
                    "Technical Specialists",
                    "Team Enablement",
                    "Knowledge Transfer",
                  ].map((tag, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-xs px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-[#1b2823] text-gray-700 dark:text-gray-300 border border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F15E1C] hover:text-[#FFFFFF] transition-all duration-200 cursor-pointer shadow-xs font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* IMAGE 1 — HERO VISUAL */}
            <div className="lg:col-span-6 w-full">
              <TiltCard className="w-full">
                <div className="relative rounded-2xl p-3 sm:p-4 bg-white dark:bg-[#1b2823] border border-[#F7D7B0] shadow-xl overflow-hidden group hover:border-[#F15E1C] transition-all duration-300">
                  <div className="relative w-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/training-staff-main.png"
                      alt="Training and staff augmentation team collaboration"
                      width={800}
                      height={600}
                      priority
                      className="w-full h-auto max-h-[500px] object-contain rounded-xl group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                  <div className="pt-3 border-t border-[#F7D7B0] text-center">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 italic">
                      “Integrating skills, people, and practices into your existing ways of working.”
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          4. CORE POSITIONING — WITH IMAGE 2 SUPPORTING VISUAL
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              THE CAPABILITY GAP
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Sometimes You Need New Skills. <br className="hidden sm:inline" /> Sometimes You Need More Hands.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Organizations can face very different capability challenges. You may need to strengthen an existing team's skills, bring in specialist expertise for a defined initiative, or extend delivery capacity while your internal team remains focused on core priorities. Arav Innovations supports both paths without treating them as the same problem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* IMAGE 2 — SUPPORTING SECTION VISUAL */}
            <div className="lg:col-span-5 w-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="p-4 rounded-2xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] hover:border-[#F15E1C] shadow-lg transition-all duration-300 group"
              >
                <Image
                  src="/images/training-staff-secondary.png"
                  alt="Team capability building and knowledge transfer"
                  width={700}
                  height={500}
                  loading="lazy"
                  className="w-full h-auto max-h-[440px] object-contain rounded-xl group-hover:scale-102 transition-transform duration-500"
                />
                <div className="mt-3 text-center">
                  <span className="text-xs font-mono font-bold text-[#F15E1C]">CAPABILITY GROWTH MODEL</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Connecting skills, roles, delivery, and permanent knowledge transfer.</p>
                </div>
              </motion.div>
            </div>

            {/* Two Distinct Paths Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* PATH 1: BUILD CAPABILITY */}
              <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-[#F7D7B0]/20 border border-[#F15E1C]/40 shadow-sm hover:shadow-md hover:border-[#F15E1C] transition-all duration-300 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F15E1C]/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F15E1C] text-[#FFFFFF]">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#F15E1C]">PATHWAY 01</span>
                      <h3 className="text-xl font-bold text-[#1b2823] dark:text-[#ffffff]">BUILD CAPABILITY</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  Empower your existing staff with modern technical skills, framework proficiency, and operational best practices tailored to your architecture.
                </p>

                <div className="space-y-2.5 pt-1">
                  {[
                    { title: "Upskilling", desc: "Modernize technical skills in cloud, AI & data." },
                    { title: "Reskilling", desc: "Transition engineers into new modern roles." },
                    { title: "Technical Training", desc: "Hands-on labs aligned with your stack." },
                    { title: "Knowledge Transfer", desc: "Ensure documentation stays permanently." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs p-2.5 rounded-xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F15E1C] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#1b2823] dark:text-[#ffffff] block">{item.title}</span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* PATH 2: EXTEND CAPABILITY */}
              <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-[#F7D7B0]/20 border border-[#2E936F]/40 shadow-sm hover:shadow-md hover:border-[#2E936F] transition-all duration-300 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2E936F]/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#2E936F] text-[#FFFFFF]">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#2E936F]">PATHWAY 02</span>
                      <h3 className="text-xl font-bold text-[#1b2823] dark:text-[#ffffff]">EXTEND CAPABILITY</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  Add experienced technical professionals directly into your engineering squads to expand project capacity and provide niche role expertise.
                </p>

                <div className="space-y-2.5 pt-1">
                  {[
                    { title: "Specialist Expertise", desc: "Access targeted depth for niche challenges." },
                    { title: "Project Capacity", desc: "Expand delivery throughput on demand." },
                    { title: "Technical Roles", desc: "Fill critical disciplines without friction." },
                    { title: "Team Extension", desc: "Integrate seamlessly into your standups." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs p-2.5 rounded-xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E936F] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#1b2823] dark:text-[#ffffff] block">{item.title}</span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          5. NEW SIGNATURE VISUAL — INTERACTIVE CAPABILITY MAP
          ===================================================================== */}
      <section id="capability-map" className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-[#1b2823] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              SIGNATURE CAPABILITY ENGINE
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              The Right Capability at the Right Moment.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Hover over or select any node in the team capability map below to see how business goals translate systematically into skills, team models, and permanent internal knowledge.
            </p>
          </div>

          {/* Interactive Flow Nodes */}
          <div className="bg-white dark:bg-[#1b2823] border border-[#F7D7B0] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg space-y-8">
            
            <div className="flex overflow-x-auto gap-3 pb-4 md:grid md:grid-cols-6 md:gap-4 border-b border-[#F7D7B0] scrollbar-none">
              {capabilityMapNodes.map((node, idx) => {
                const isActive = displayedNodeIdx === idx;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNodeIdx(idx)}
                    onMouseEnter={() => setHoverNodeIdx(idx)}
                    onMouseLeave={() => setHoverNodeIdx(null)}
                    className={cn(
                      "shrink-0 min-w-[150px] md:min-w-0 md:shrink p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between h-32 transform",
                      isActive
                        ? "bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] shadow-md -translate-y-1 scale-102"
                        : "bg-white dark:bg-[#1b2823] text-[#1b2823] dark:text-[#ffffff] border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20 hover:-translate-y-0.5"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={cn("text-[10px] font-mono font-bold", isActive ? "text-[#FFEC69]" : "text-[#F15E1C]")}>
                        {node.step}
                      </span>
                      <div className={cn("p-1.5 rounded-lg transition-colors", isActive ? "bg-[#FFFFFF] text-[#F15E1C]" : "bg-[#F7D7B0]/30 text-[#F15E1C]")}>
                        {node.icon}
                      </div>
                    </div>
                    <div>
                      <span className={cn("text-xs font-bold block transition-colors", isActive ? "text-[#FFFFFF]" : "text-[#1b2823] dark:text-[#ffffff]")}>
                        {node.label}
                      </span>
                      <span className={cn("text-[10px] block mt-0.5", isActive ? "text-[#FFFFFF]/90" : "text-gray-500 dark:text-gray-400")}>
                        {node.short}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Node Detail Explanation Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-xl border-2 border-[#F15E1C] bg-[#F7D7B0]/20 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#F15E1C] text-[#FFFFFF] shadow-xs">
                    {activeNode.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#F15E1C]">
                      STAGE {activeNode.step} OF 06 &bull; {activeNode.label}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1b2823] dark:text-[#ffffff]">
                      {activeNode.title}
                    </h3>
                  </div>
                </div>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl font-medium">
                  {activeNode.desc}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          6. TRAINING OFFERING — BUILD CAPABILITY
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              BUILD CAPABILITY
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Turn Skill Gaps Into Practical Capability.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Our training programs can be structured around your team's roles, technology environment and business objectives, with emphasis on practical application rather than theory alone.
            </p>
          </div>

          {/* Editorial Capability Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {trainingCapabilities.map((cap) => (
              <motion.div
                key={cap.num}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20 hover:shadow-lg transition-all duration-300 shadow-xs flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F15E1C] px-2.5 py-1 rounded bg-[#F7D7B0]/40 group-hover:bg-[#F15E1C] group-hover:text-[#FFFFFF] transition-colors">
                      CAPABILITY {cap.num}
                    </span>
                    <div className="p-2 rounded-lg bg-[#F7D7B0]/30 group-hover:bg-[#F15E1C]/10 transition-colors">
                      {cap.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#F7D7B0] flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono font-bold">Focus:</span>
                  <span className="font-semibold text-[#2E936F] group-hover:text-[#F15E1C] group-hover:translate-x-0.5 transition-all">{cap.focus}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          7. STAFF AUGMENTATION — EXTEND CAPABILITY
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-[#1b2823] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              EXTEND CAPABILITY
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Add Expertise Without Rebuilding Your Team.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              When additional capability is needed, we can help extend existing teams with professionals aligned to the technical requirements, delivery environment and engagement model.
            </p>
          </div>

          {/* 8 Technical Role Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {augmentationRoles.map((role) => (
              <motion.div
                key={role.title}
                whileHover={{ scale: 1.03, y: -4 }}
                className="p-6 rounded-2xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] hover:border-[#2E936F] hover:bg-[#F7D7B0]/20 hover:shadow-lg transition-all duration-300 shadow-xs space-y-3 group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-[#F7D7B0]/30 w-fit group-hover:bg-[#2E936F]/10 transition-colors">
                  {role.icon}
                </div>
                <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">
                  {role.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {role.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          8. TEAM MODELS — INTERACTIVE SELECTOR
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              ENGAGEMENT MODELS
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Choose the Team Model That Fits the Work.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Hover or select a team model below to examine how different engagement structures align with your delivery goals and organizational context.
            </p>
          </div>

          {/* Model Selector Tabs */}
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex overflow-x-auto gap-3 justify-center pb-2 scrollbar-none">
              {teamModels.map((model) => {
                const isActive = displayedModelId === model.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => setActiveModelId(model.id)}
                    onMouseEnter={() => setHoverModelId(model.id)}
                    onMouseLeave={() => setHoverModelId(null)}
                    className={cn(
                      "px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-2 border transform",
                      isActive
                        ? "bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] shadow-md -translate-y-0.5"
                        : "bg-white dark:bg-[#1b2823] text-[#1b2823] dark:text-[#ffffff] border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20"
                    )}
                  >
                    <span className={cn(isActive ? "text-[#FFFFFF]" : "text-[#F15E1C]")}>{model.icon}</span>
                    <span>{model.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Model Card Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] shadow-xl space-y-6"
              >
                <div className="flex items-center gap-4 pb-6 border-b border-[#F7D7B0]">
                  <div className="p-4 rounded-2xl bg-[#F15E1C] text-[#FFFFFF]">
                    {activeModel.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#F15E1C]">{activeModel.name}</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1b2823] dark:text-[#ffffff]">{activeModel.title}</h3>
                  </div>
                </div>

                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
                  {activeModel.tagline}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F15E1C] block">Best For</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{activeModel.bestFor}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F] block">Typical Engagement</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{activeModel.engagement}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FAB60A] block">Primary Value</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{activeModel.primaryValue}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          9. NEW VISUAL — TEAM INTEGRATION
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-[#1b2823] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              TEAM INTEGRATION ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Aligned Integration, Not Isolated Sourcing.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Successful team extension relies on clear communication, shared practices, explicit roles, and active knowledge sharing.
            </p>
          </div>

          {/* Integration Visual Flow */}
          <div className="bg-white dark:bg-[#1b2823] border border-[#F7D7B0] rounded-3xl p-8 sm:p-12 shadow-lg space-y-8 max-w-5xl mx-auto text-center">
            
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0]">
                <Users className="w-5 h-5 text-[#F15E1C] mx-auto mb-1" />
                <span className="text-xs font-bold block text-[#1b2823] dark:text-[#ffffff]">CLIENT TEAM</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">Context &amp; Goals</span>
              </div>

              <div className="text-[#F15E1C] font-bold text-lg hidden sm:block">+</div>

              <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0]">
                <Cpu className="w-5 h-5 text-[#2E936F] mx-auto mb-1" />
                <span className="text-xs font-bold block text-[#1b2823] dark:text-[#ffffff]">ARAV SPECIALISTS</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">Role Capability</span>
              </div>

              <div className="text-[#2E936F] font-bold text-lg hidden sm:block">&rarr;</div>

              <div className="p-4 rounded-xl bg-[#F15E1C]/10 border border-[#F15E1C]/40">
                <Workflow className="w-5 h-5 text-[#F15E1C] mx-auto mb-1" />
                <span className="text-xs font-bold block text-[#F15E1C]">SHARED WORKFLOW</span>
                <span className="text-[10px] text-[#F15E1C]">Aligned Delivery</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F7D7B0]">
              <div className="p-4 rounded-xl bg-[#F7D7B0]/20 text-left space-y-1">
                <span className="text-xs font-bold text-[#F15E1C] uppercase block">Shared Standards</span>
                <p className="text-xs text-gray-600 dark:text-gray-300">Working practices, repos, CI/CD tools &amp; code reviews.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7D7B0]/20 text-left space-y-1">
                <span className="text-xs font-bold text-[#2E936F] uppercase block">Knowledge Transfer</span>
                <p className="text-xs text-gray-600 dark:text-gray-300">Continuous technical exchange, pair working &amp; handover.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7D7B0]/20 text-left space-y-1">
                <span className="text-xs font-bold text-[#FAB60A] uppercase block">Stronger Capability</span>
                <p className="text-xs text-gray-600 dark:text-gray-300">Permanent increase in overall team skill &amp; throughput.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          10. HOW WE WORK — 6 STAGE JOURNEY
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              CAPABILITY ENGAGEMENT JOURNEY
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              How We Work With Your Teams.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              A structured 6-stage path designed to discover requirements, define the model, integrate seamlessly, and support capability growth.
            </p>
          </div>

          {/* 6-Stage Journey Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {workStages.map((st) => (
              <motion.div
                key={st.step}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20 hover:shadow-lg transition-all duration-300 shadow-xs flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#F15E1C] px-2.5 py-1 rounded bg-[#F7D7B0]/40 group-hover:bg-[#F15E1C] group-hover:text-[#FFFFFF] transition-colors block w-fit mb-3">
                    STAGE {st.step}
                  </span>
                  <h3 className="text-xl font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors mb-2">
                    {st.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          11. SKILL -> ROLE -> TEAM INTERACTIVE VISUAL
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-[#1b2823] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              CAPABILITY MATRIX
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Start With the Capability. Then Choose the Model.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Examine sample scenarios showing how technical skill requirements map to specific roles and team structures.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {/* Example Tabs */}
            <div className="flex overflow-x-auto gap-3 justify-center pb-2 scrollbar-none">
              {skillToTeamExamples.map((ex, idx) => {
                const isActive = activeExampleIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveExampleIdx(idx)}
                    className={cn(
                      "px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shrink-0 border transform",
                      isActive
                        ? "bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] shadow-md"
                        : "bg-white dark:bg-[#1b2823] text-[#1b2823] dark:text-[#ffffff] border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20"
                    )}
                  >
                    <span>{ex.scenario}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Example Matrix Breakdown */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExampleIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-8 rounded-2xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] shadow-xl space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#F7D7B0]">
                  <h3 className="text-xl font-bold text-[#1b2823] dark:text-[#ffffff]">
                    Scenario: {skillToTeamExamples[activeExampleIdx].scenario}
                  </h3>
                  <Badge variant="subtle" className="text-xs bg-[#2E936F]/10 text-[#2E936F] font-semibold">
                    Sample Mapping
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                    <span className="text-[10px] font-mono text-[#F15E1C] font-bold block uppercase">1. SKILL GAP</span>
                    <span className="text-xs font-bold text-[#F15E1C] block">{skillToTeamExamples[activeExampleIdx].gap}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                    <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 font-bold block uppercase">2. EXPERTISE</span>
                    <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff] block">{skillToTeamExamples[activeExampleIdx].expertise}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                    <span className="text-[10px] font-mono text-[#2E936F] font-bold block uppercase">3. ROLE</span>
                    <span className="text-xs font-bold text-[#2E936F] block">{skillToTeamExamples[activeExampleIdx].role}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                    <span className="text-[10px] font-mono text-[#FAB60A] font-bold block uppercase">4. STRUCTURE</span>
                    <span className="text-xs font-bold text-[#FAB60A] block">{skillToTeamExamples[activeExampleIdx].structure}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                    <span className="text-[10px] font-mono text-[#2E936F] font-bold block uppercase">5. MODEL</span>
                    <span className="text-xs font-bold text-[#2E936F] block">{skillToTeamExamples[activeExampleIdx].model}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          12. KNOWLEDGE TRANSFER (DEDICATED SECTION)
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              LONG-TERM VALUE ANCHOR
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              The Goal Is Capability That Stays With You.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              External expertise creates greater value when knowledge can move back into the organization permanently.
            </p>
          </div>

          <div className="bg-[#F7D7B0]/20 border border-[#F7D7B0] rounded-3xl p-8 sm:p-12 shadow-lg max-w-5xl mx-auto text-center space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {[
                { title: "EXPERTISE", desc: "Technical Knowledge", color: "text-[#F15E1C]" },
                { title: "COLLABORATION", desc: "Pair Programming", color: "text-[#2E936F]" },
                { title: "DOCUMENTATION", desc: "Code Standards", color: "text-[#FAB60A]" },
                { title: "KNOWLEDGE TRANSFER", desc: "Handover Protocol", color: "text-[#F15E1C]" },
                { title: "INTERNAL CAPABILITY", desc: "Permanent Skill", color: "text-[#2E936F]" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] space-y-1">
                  <span className={cn("text-xs font-mono font-bold block", item.color)}>{item.title}</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 block font-medium">{item.desc}</span>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Unlike traditional staffing agencies where knowledge leaves when an assignment finishes, our models explicitly build technical documentation and handover into the engagement rhythm.
            </p>
          </div>

        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          14. OUTCOMES
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-[#1b2823] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              VALUE DELIVERED
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              What Stronger Capability Enables.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Practical advantages of combining internal upskilling with aligned technical specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {capabilityOutcomes.map((out) => (
              <motion.div
                key={out.title}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] hover:border-[#2E936F] hover:bg-[#F7D7B0]/20 hover:shadow-lg transition-all duration-300 shadow-xs flex items-start gap-4 group cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-[#F7D7B0]/30 group-hover:bg-[#2E936F]/10 transition-colors shrink-0">
                  {out.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">
                    {out.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {out.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          15. INDUSTRIES / USE CASES & WHAT WE HELP ADDRESS
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-16">
          
          {/* Section A: Where Teams Need Support */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <Badge variant="outline" className="mb-3 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
                WHERE TEAMS NEED SUPPORT
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1b2823] dark:text-[#ffffff]">
                Environments Where These Models Apply.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {targetIndustries.map((ind, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] space-y-1">
                  <h4 className="text-sm font-bold text-[#1b2823] dark:text-[#ffffff]">{ind.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: What We Help Address */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <Badge variant="outline" className="mb-3 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
                WHAT WE HELP ORGANIZATIONS ADDRESS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1b2823] dark:text-[#ffffff]">
                Common Operational &amp; Capability Challenges.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {whatWeAddress.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F15E1C]" />
                    <h4 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff]">{item.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          17. BLOGS / INSIGHTS (REAL CMS DATA)
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-[#1b2823] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              KNOWLEDGE BASE
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Team &amp; Capability Insights.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Read published analysis on team development, technical leadership, and engineering capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group block">
                <motion.div whileHover={{ y: -4 }} className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1b2823] border border-[#F7D7B0] hover:border-[#F15E1C] hover:shadow-lg transition-all duration-300 shadow-xs flex flex-col justify-between">
                  <div>
                    <Badge variant="subtle" className="mb-3 text-[10px] bg-[#F7D7B0]/40 text-[#F15E1C] font-semibold">
                      {post.category}
                    </Badge>
                    <h3 className="text-base sm:text-lg font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#F7D7B0] flex items-center justify-between text-xs font-semibold text-[#F15E1C]">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/insights">
              <Button3D variant="secondary" size="md" className="bg-[#2E936F] text-[#FFFFFF] border-[#2E936F]">
                Explore All Insights
              </Button3D>
            </Link>
          </div>

        </div>
      </section>

      <CapabilityScanTransition />

      {/* =====================================================================
          18. FAQ SECTION
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <Badge variant="outline" className="mb-3 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              QUESTIONS &amp; ANSWERS
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Frequently Asked Questions.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Concise answers regarding staff augmentation, team training, integration, and engagement models.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIdx === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#F7D7B0] bg-white dark:bg-[#1b2823] overflow-hidden transition-all hover:border-[#F15E1C] hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between font-bold text-sm sm:text-base text-[#1b2823] dark:text-[#ffffff] hover:text-[#F15E1C] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={cn("w-5 h-5 transition-transform duration-200 text-[#F15E1C]", isOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-sm text-gray-600 dark:text-gray-300 border-t border-[#F7D7B0] leading-relaxed">
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

      <CapabilityScanTransition />

      {/* =====================================================================
          19. FINAL CTA
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#2E936F] text-[#FFFFFF] border border-[#2E936F] shadow-2xl overflow-hidden text-center space-y-6">
            
            {/* Ambient Palette Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F15E1C]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FAB60A]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFEC69]/20 rounded-full blur-3xl pointer-events-none" />

            <Badge variant="outline" className="border-[#FFFFFF] text-[#FFFFFF] bg-[#FFFFFF]/10 px-3 py-1 font-semibold tracking-wider text-xs">
              TAKE THE NEXT STEP
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-[#FFFFFF]">
              Build the Capability Your Next Stage Requires.
            </h2>

            <p className="text-base sm:text-lg text-[#FFEC69] max-w-2xl mx-auto leading-relaxed font-medium">
              Whether you need to strengthen existing skills or extend your team with specialist expertise, we'll help you identify the right capability model for the work ahead.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button3D variant="primary" size="lg" className="flex items-center gap-2 font-semibold bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] hover:opacity-95 transition-all">
                  Discuss Your Capability Needs
                  <ArrowRight className="w-4 h-4" />
                </Button3D>
              </Link>
              <a href="#capability-map">
                <Button3D variant="secondary" size="lg" className="flex items-center gap-2 font-medium bg-[#FFFFFF] text-[#2E936F] border-[#FFFFFF] hover:bg-[#F7D7B0] transition-all">
                  Explore Team Models
                </Button3D>
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default TrainingStaffInteractivePage;
