export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

export const servicesNavigation: NavItem[] = [
  {
    label: "IT Strategy and Implementation",
    href: "/services/it-strategy-implementation",
    description: "Enterprise tech roadmaps, digital transformation blueprints, cloud architecture & IT governance.",
  },
  {
    label: "Digital Marketing and Brand Development",
    href: "/services/digital-marketing-brand-development",
    description: "B2B demand generation, brand positioning, multi-channel performance marketing & closed-loop attribution.",
  },
  {
    label: "Web and Application Development",
    href: "/services/web-application-development",
    description: "Scalable modern web applications, cloud native systems, enterprise SaaS portals & mobile apps.",
  },
  {
    label: "Risk, Compliance, and Governance",
    href: "/services/risk-compliance-governance",
    description: "Regulatory compliance frameworks, data privacy (GDPR/DPDP), cybersecurity posture & risk mitigation.",
  },
  {
    label: "Audit and Improvement",
    href: "/services/audit-improvement",
    description: "System efficiency reviews, process bottleneck remediation, codebase audits & cloud cost optimization.",
  },
  {
    label: "Training and Staff Augmentation",
    href: "/services/training-staff-augmentation",
    description: "Vetted on-demand technical talent, enterprise upskilling programs & dedicated engineering squads.",
  },
  {
    label: "SEO Services",
    href: "/services/seo-services",
    description: "Technical SEO audits, programmatic indexing, enterprise topical authority & organic revenue growth.",
  },
  {
    label: "AI Portfolio",
    href: "/services/ai-portfolio",
    description: "Enterprise AI solutions, Intelligent Automation pipelines, RAG systems & seamless LLM integrations.",
  },
];

export const workingWithUsNavigation: NavItem[] = [
  {
    label: "Contact & Inquiries",
    href: "/contact",
    description: "Connect with our practice leads for NDAs, scoping, and enterprise proposals.",
    badge: "Direct",
  },
  {
    label: "Our 5-Step Process",
    href: "/#process",
    description: "How we move from discovery to execution and measurable business outcomes.",
  },
  {
    label: "Clients & Testimonials",
    href: "/testimonials",
    description: "Feedback and proof of execution from cross-industry partners.",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    description: "Documented enterprise outcomes across cloud, SaaS, and engineering.",
  },
  {
    label: "Industry Solutions",
    href: "/solutions",
    description: "Tailored technology and growth frameworks for your vertical.",
  },
  {
    label: "Careers at Arav",
    href: "/careers",
    description: "Join our multidisciplinary engineering and strategy practice.",
  },
  {
    label: "About Arav Innovations",
    href: "/about",
    description: "Our leadership, global footprint, code ownership, and culture.",
  },
];

export const mainNavigation: NavItem[] = [
  {
    label: "What We Do",
    href: "/services",
    children: servicesNavigation,
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Working With Us",
    href: "/#process",
    children: workingWithUsNavigation,
  },
  {
    label: "Insights",
    href: "/insights",
  },
];

export const companyContactInfo = {
  name: "Arav Innovations",
  tagline: "Technology • Strategy • Digital Growth",
  email: "support@aravinnovations.com",
  connectEmail: "connect@aravinnovations.com",
  salesEmail: "sales@aravinnovations.com",
  careersEmail: "careers@aravinnovations.com",
  phoneIndia: "+91 9650625777",
  phoneIndiaRaw: "+919650625777",
  phoneUAE: "+971 521555792",
  phoneUAERaw: "+971521555792",
  offices: [
    {
      country: "India",
      city: "Gurgaon",
      address: "Platinum Floor D 14/23, Ardee City Sec 52, Gurgaon 122002",
      status: "Regional Headquarters & Delivery Center",
    },
    {
      country: "UAE",
      city: "Dubai",
      address: "AravInnovations Consultancy - FZCO, 55764-001 IFZA Business Park FZCO, Building A1 Dubai Silicon Oasis, Dubai, U.A.E",
      status: "Middle East Operations & Strategy",
    },
  ],
  socials: {
    instagram: "https://www.instagram.com/aravinnovations",
    facebook: "https://www.facebook.com/people/Arav-Innovations/61566419637071/",
    linkedin: "https://www.linkedin.com/company/aravinnovations/",
    whatsapp: "https://api.whatsapp.com/send?phone=919650625777",
    twitter: "https://x.com/AravInnovations",
    youtube: "https://www.youtube.com/@AravInnovations",
  },
};
