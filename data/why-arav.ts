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
    id: "outcome-first",
    number: "01",
    title: "Outcome-First Engineering",
    subtitle: "Tangible Business Metrics",
    description: "We align technology deliverables with tangible business metrics—focusing on conversion performance, system efficiency, security compliance, and ROI.",
    businessOutcome: "Measurable commercial ROI & high-efficiency system delivery",
    icon: "TrendingUp",
    accentColor: "#f15e1c",
    order: 1,
  },
  {
    id: "unified-ecosystem",
    number: "02",
    title: "Unified Digital Ecosystem",
    subtitle: "Single Accountable Partnership",
    description: "Eliminate vendor fragmentation by managing strategy, engineering, AI automation, and performance growth under a single accountable partnership.",
    businessOutcome: "Seamless execution across IT strategy, software & digital growth",
    icon: "Compass",
    accentColor: "#2e936f",
    order: 2,
  },
  {
    id: "cross-border",
    number: "03",
    title: "Cross-Border Delivery Capabilities",
    subtitle: "India & UAE Hubs",
    description: "On-ground presence and deep market expertise across India and the UAE, coupled with global delivery capabilities.",
    businessOutcome: "Dual-hub delivery velocity with regional market awareness",
    icon: "Users2",
    accentColor: "#fab60a",
    order: 3,
  },
  {
    id: "scalable-infrastructure",
    number: "04",
    title: "Scalable & Future-Proof Infrastructure",
    subtitle: "Modular Cloud Foundations",
    description: "Architecting modular, cloud-native digital foundations engineered to adapt as your business expands.",
    businessOutcome: "Zero architectural bottlenecks during rapid enterprise expansion",
    icon: "Cpu",
    accentColor: "#f15e1c",
    order: 4,
  },
];

