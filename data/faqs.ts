export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const aiPortfolioFAQs: FAQItem[] = [
  {
    question: "How do you ensure our corporate data remains secure when using AI?",
    answer:
      "We implement enterprise zero-data-retention APIs, private vector storage, and role-based access controls. Your proprietary business data is never used to train public models. All data is encrypted in transit and at rest using AES-256-GCM.",
    category: "Security & Privacy",
  },
  {
    question: "Can AI solutions be integrated into our existing CRM and ERP tools?",
    answer:
      "Yes. We specialize in seamless integration with Salesforce, SAP, Oracle, and other enterprise systems through secure APIs, middleware, and custom connectors. No data migration required—we build bridges between your existing infrastructure.",
    category: "Integration",
  },
  {
    question: "What's the typical timeline for implementing an AI solution?",
    answer:
      "Most engagements follow a 5-step process: (1) Proof of Concept (2 weeks), (2) AI Solutions & Integration (3-4 weeks), (3) Enterprise Systems Integration (2-3 weeks), (4) Safety & Privacy Tuning (1-2 weeks), (5) Deployment & Monitoring (ongoing). Total: 8-12 weeks to production.",
    category: "Timeline & Process",
  },
  {
    question: "How do you handle hallucination and accuracy in AI models?",
    answer:
      "We implement guardrails, fallback mechanisms, role-based permissions, and response benchmarking to ensure accuracy. Our Retrieval-Augmented Generation (RAG) approach grounds AI responses in your internal knowledge base, reducing hallucination by 85%+.",
    category: "AI Quality",
  },
  {
    question: "What's included in your AI Compliance & Security Assessment?",
    answer:
      "We audit your AI implementation for GDPR, DPDP, SOX, and industry-specific compliance. Deliverables include a detailed security assessment, risk matrix, guardrails implementation plan, and ongoing monitoring setup.",
    category: "Compliance",
  },
];

export const buyerFAQs: FAQItem[] = [
  {
    question: "How does Arav Innovations help businesses combine technology and digital growth?",
    answer:
      "We unify executive IT consulting, custom software engineering, AI workflow automation, performance marketing, and technical SEO into a single connected ecosystem. Rather than managing disconnected vendors, your business gains a single accountable partner focused on revenue outcomes and system efficiency.",
    category: "Strategy & Integration",
  },
  {
    question: "Which industries does Arav Innovations work with?",
    answer:
      "We work across 10 high-concurrency and highly regulated sectors including FinTech & Financial Services, B2B SaaS, Healthcare & HealthTech, Professional Services, E-Commerce & Retail, Education & EdTech, Industrial Manufacturing, Real Estate, Logistics & Supply Chain, and High-Growth Scale-Ups across India and the UAE.",
    category: "Industries",
  },
  {
    question: "How does Arav Innovations approach a new technology or digital transformation project?",
    answer:
      "Every engagement follows a structured 5-step lifecycle: Discovery & Audit → Architectural Scope → Agile Sprint Engineering → Compliance & Governance Hardening → Production Launch & Continuous Optimization. All intellectual property remains 100% owned by the client.",
    category: "Methodology",
  },
  {
    question: "Can Arav Innovations work with an existing internal technology or marketing team?",
    answer:
      "Yes. We frequently embed as specialized staff augmentation pods or fractional practice directors alongside internal CIOs, CTOs, and marketing leads to accelerate release sprints, solve legacy bottlenecks, or scale engineering bandwidth without hiring delays.",
    category: "Staff Augmentation",
  },
  {
    question: "How can I discuss my requirements with Arav Innovations?",
    answer:
      "You can initiate a discussion by scheduling a consultation or submitting an inquiry via our contact form. A senior practice director will review your project brief under strict confidentiality (NDA) and respond within 1 business day.",
    category: "Consultation & Scoping",
  },
];
