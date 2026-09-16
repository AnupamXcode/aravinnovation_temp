export interface WhyAravPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  businessOutcome: string;
  icon: string;
  accentColor: string;
  order: number;
}

export const whyAravPillarsData: WhyAravPillar[] = [
  {
    id: "business-first",
    number: "01",
    title: "Business-First Approach",
    subtitle: "Commercial & Strategic Alignment",
    description: "We align every technology project, software platform, and growth campaign with executive business goals and bottom-line commercial impact.",
    businessOutcome: "Tangible business growth and executive-level accountability",
    icon: "Compass",
    accentColor: "#f15e1c",
    order: 1,
  },
  {
    id: "data-informed",
    number: "02",
    title: "Data-Informed Decision Making",
    subtitle: "Telemetry & Performance Telemetry",
    description: "Using performance telemetry, system health audits, and conversion analytics to guide engineering, SEO, and paid acquisition decisions.",
    businessOutcome: "Data-backed decisions eliminating guesswork and budget waste",
    icon: "TrendingUp",
    accentColor: "#2e936f",
    order: 2,
  },
  {
    id: "scalable",
    number: "03",
    title: "Scalable Architecture",
    subtitle: "Modular Cloud Foundations",
    description: "Architecting modular, cloud-native digital foundations engineered to scale predictably as your user base and transaction volume expand.",
    businessOutcome: "Zero architectural bottlenecks during rapid enterprise expansion",
    icon: "Cpu",
    accentColor: "#fab60a",
    order: 3,
  },
  {
    id: "ai-ready",
    number: "04",
    title: "AI-Ready Integration",
    subtitle: "Automated Workflows & RAG Systems",
    description: "Integrating secure AI endpoints, automated workflows, and RAG knowledge search into existing core business operations.",
    businessOutcome: "Drastic reduction in manual overhead and faster operational cycles",
    icon: "Sparkles",
    accentColor: "#f15e1c",
    order: 4,
  },
  {
    id: "outcome-focused",
    number: "05",
    title: "Outcome-Focused Delivery",
    subtitle: "Measurable Commercial Benchmarks",
    description: "Measuring project success through concrete benchmarks — subsecond speed, compliance readiness, conversion lifts, and qualified lead volume.",
    businessOutcome: "Measurable commercial ROI & high-efficiency system delivery",
    icon: "ShieldCheck",
    accentColor: "#2e936f",
    order: 5,
  },
  {
    id: "end-to-end",
    number: "06",
    title: "End-to-End Execution",
    subtitle: "Single Accountable Partnership",
    description: "Eliminating vendor fragmentation by managing strategy, engineering, digital marketing, compliance, and talent support under one roof.",
    businessOutcome: "Seamless alignment across technology, marketing & operations",
    icon: "Users2",
    accentColor: "#fab60a",
    order: 6,
  },
];
