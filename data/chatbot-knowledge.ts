import Fuse from "fuse.js";
import { servicesData, getServiceBySlug } from "@/data/services";

export interface ChatbotIntentOption {
  label: string;
  action: "service_lookup" | "intent_trigger" | "all_services" | "locations" | "start_project" | "navigate";
  payload?: string;
  route?: string;
  ctaType?: "page" | "action";
}

export type BuyingIntentLevel = "STRONG_BUYING" | "MODERATE_BUYING" | "INFORMATIONAL";

export interface ChatbotIntent {
  id: string;
  intentLevel: BuyingIntentLevel;
  keywords: string[];
  associatedServiceSlug?: string;
  response: {
    en: string;
    hi: string;
    ar: string;
  };
  options?: {
    en: ChatbotIntentOption[];
    hi: ChatbotIntentOption[];
    ar: ChatbotIntentOption[];
  };
  triggerLeadForm?: boolean;
}

export interface ChatSessionContext {
  locale: string;
  mentionedIndustry?: string;
  mentionedService?: string;
  mentionedTopic?: string;
  mentionedBudget?: string;
  lastIntentId?: string;
  history: string[];
}

export function normalizeQuery(q: string): string {
  if (!q) return "";
  return q
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0900-\u097F\u0600-\u06FF]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const WARM_OPENERS = {
  en: [
    "Great question! ",
    "Here is how Arav Innovations can help: ",
    "That's a key requirement. ",
    "Happy to explain: ",
  ],
  hi: [
    "बहुत अच्छा सवाल! ",
    "आरव इनोवेशन इसमें आपकी मदद कर सकता है: ",
    "यह एक महत्वपूर्ण आवश्यकता है। ",
    "विवरण साझा करने में खुशी है: ",
  ],
  ar: [
    "سؤال ممتاز! ",
    "إليك كيف يمكن لآراف إينوفيشينز مساعدتك: ",
    "هذا متطلب أساسي في التكنولوجيا. ",
    "يسعدني تقديم التفاصيل: ",
  ],
};

export const CASUAL_FOLLOWUPS = {
  en: [
    "Would you like to explore the service or discuss your requirement?",
    "Feel free to ask any follow-up questions!",
    "Would you like to speak with our technical team?",
  ],
  hi: [
    "क्या आप सेवा देखना चाहेंगे या अपनी आवश्यकता पर चर्चा करना चाहेंगे?",
    "बेझिझक कोई भी और सवाल पूछें!",
    "क्या आप हमारी तकनीकी टीम से बात करना चाहेंगे?",
  ],
  ar: [
    "هل ترغب في استكشاف الخدمة أو مناقشة متطلباتك؟",
    "لا تتردد في طرح أي سؤال إضافي!",
    "هل تود التحدث مع فريقنا الفني؟",
  ],
};

export const BUYING_INTENT_CONFIG = {
  strongBuyingAutoLeadForm: true,
  moderateBuyingSuggestLeadForm: true,
  informationalLeadFormThreshold: false,
};

export const chatbotIntents: ChatbotIntent[] = [
  // 1. GREETING
  {
    id: "greeting",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "hi", "hello", "hey", "hii", "namaste", "marhaba", "سلام", "नमस्ते",
      "who are you", "what's up", "how are you", "good morning", "good afternoon",
      "hey there", "greetings", "hello arav", "hi bot", "kya haal hai", "kaisa hai"
    ],
    response: {
      en: "Hello! Welcome to Arav Innovations. I am your business strategy assistant. How can I help with your technology, marketing, governance, or project requirements today?",
      hi: "नमस्ते! आरव इनोवेशन में आपका स्वागत है। मैं आपका व्यावसायिक सहायक हूँ। आज मैं आपकी प्रौद्योगिकी, विपणन या परियोजना आवश्यकताओं में कैसे मदद कर सकता हूँ?",
      ar: "مرحباً بك في آراف إينوفيشينز. أنا مساعدك الاستراتيجي. كيف يمكنني مساعدتك في استفسارات التقنية والتسويق وإدارة المشاريع اليوم؟",
    },
    options: {
      en: [
        { label: "Explore Services", action: "all_services" },
        { label: "Start a Conversation", action: "start_project" },
        { label: "Office Locations", action: "locations" },
      ],
      hi: [
        { label: "सेवाएं देखें", action: "all_services" },
        { label: "चर्चा शुरू करें", action: "start_project" },
        { label: "कार्यालय स्थान", action: "locations" },
      ],
      ar: [
        { label: "استكشف الخدمات", action: "all_services" },
        { label: "بدء مشروع", action: "start_project" },
        { label: "الفروع والمكاتب", action: "locations" },
      ],
    },
  },

  // 2. SERVICES OVERVIEW
  {
    id: "services_overview",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "services", "practices", "what do you offer", "capabilities", "خدمات", "सेवाएं", "क्या करते हो",
      "what does arav do", "what are your services", "what can you help with", "whats your expertise",
      "tell me about your offerings", "what's your specialty", "what problems can you solve",
      "are you a development agency", "list your services", "what do you guys do", "what do you build",
      "what solutions do you provide", "core competencies", "service catalog",
      "servises", "wht servises", "wht services", "what servises", "wht offer", "servises offer",
      "what servises do yu offer", "wht servises do yu offer", "services do you offer", "services offered",
      "our services", "core services"
    ],
    response: {
      en: "Arav Innovations provides enterprise technology & digital services across IT Strategy, Web & App Development, Digital Marketing, SEO, Risk & Compliance, System Audits, Staff Augmentation, and AI Solutions.",
      hi: "आरव इनोवेशन आईटी रणनीति, वेब एवं ऐप विकास, डिजिटल मार्केटिंग, एसईओ, जोखिम अनुपालन, ऑडिट, टीम विस्तार और एआई समाधानों में मुख्य सेवाएं प्रदान करता है।",
      ar: "تقدم آراف إينوفيشينز خدمات استراتيجية التقنية، تطوير الويب، التسويق الرقمي، SEO، الامتثال والتدقيق، ودعم الكفاءات وحلول الذكاء الاصطناعي.",
    },
    options: {
      en: [
        { label: "Web & App Dev", action: "navigate", route: "/services/web-app-development" },
        { label: "SEO Services", action: "navigate", route: "/services/seo-services" },
        { label: "IT Strategy", action: "navigate", route: "/services/it-strategy-implementation" },
        { label: "AI Portfolio", action: "navigate", route: "/services/ai-portfolio" },
      ],
      hi: [
        { label: "वेब एवं ऐप विकास", action: "navigate", route: "/services/web-app-development" },
        { label: "एसईओ सेवाएं", action: "navigate", route: "/services/seo-services" },
        { label: "आईटी रणनीति", action: "navigate", route: "/services/it-strategy-implementation" },
        { label: "एआई समाधान", action: "navigate", route: "/services/ai-portfolio" },
      ],
      ar: [
        { label: "تطوير الويب", action: "navigate", route: "/services/web-app-development" },
        { label: "خدمات SEO", action: "navigate", route: "/services/seo-services" },
        { label: "استراتيجية التقنية", action: "navigate", route: "/services/it-strategy-implementation" },
        { label: "حلول AI", action: "navigate", route: "/services/ai-portfolio" },
      ],
    },
  },

  // 3. SEO INTENT
  {
    id: "seo_services",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "seo-services",
    keywords: [
      "seo", "seo services", "search engine optimization", "google ranking", "organic traffic",
      "search visibility", "help me rank on google", "rank my website", "rank website", "higher on google",
      "b2b seo", "technical seo", "gugle", "gogle", "rankin", "reank", "search strategy", "seo services pls",
      "can u help me rank my website", "need seo for b2b company", "get website higher on google"
    ],
    response: {
      en: "We help businesses improve organic search visibility through technical SEO, Core Web Vitals remediation, search intent alignment, structured data schema, and topical authority hubs.\n\nOur SEO Services are engineered around how customers discover and evaluate businesses today.",
      hi: "हम तकनीकी एसईओ, सर्च इंटेंट अनुकूलन, कोर वेब वाइटल्स और विषयगत अथॉरिटी द्वारा व्यवसायों की ऑर्गेनिक विजिबिलिटी बढ़ाने में मदद करते हैं।",
      ar: "نساعد الشركات على تحسين ظهورها في نتائج البحث من خلال SEO الفني، وتحسين سرعة الموقع، وهيكلة البيانات، وبناء السمعة الرقمية.",
    },
    options: {
      en: [
        { label: "Explore SEO Services", action: "navigate", route: "/services/seo-services", ctaType: "page" },
        { label: "Build My Search Strategy", action: "start_project", payload: "SEO Strategy Discussion", ctaType: "action" },
      ],
      hi: [
        { label: "एसईओ सेवाएं देखें", action: "navigate", route: "/services/seo-services", ctaType: "page" },
        { label: "सर्च रणनीति बनाएं", action: "start_project", payload: "SEO Strategy Discussion", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف خدمات SEO", action: "navigate", route: "/services/seo-services", ctaType: "page" },
        { label: "بناء استراتيجية البحث", action: "start_project", payload: "SEO Strategy Discussion", ctaType: "action" },
      ],
    },
  },

  // 4. DIGITAL MARKETING INTENT
  {
    id: "digital_marketing",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "digital-marketing-brand-development",
    keywords: [
      "marketing", "digital marketing", "online marketing", "lead generation", "digital growth",
      "online growth", "b2b marketing", "linkedin ads", "google ads", "brand development", "growth strategy",
      "lead gen", "online visibility", "digital visibility and leads", "better digital visibility",
      "brand strategy", "performance marketing"
    ],
    response: {
      en: "We engineer high-intent B2B demand generation campaigns across LinkedIn & Search, supported by brand positioning, landing page conversion optimization, and closed-loop revenue attribution.\n\nOur Digital Marketing and Brand Development service replaces generic ad spend with verified pipeline.",
      hi: "हम लिंक्डइन और सर्च पर उच्च-इरादे वाले B2B डिमांड जनरेशन अभियान चलाते हैं, जो ब्रांड पोजिशनिंग और रूपांतरण अनुकूलन द्वारा समर्थित हैं।",
      ar: "نصمم حملات التسويق الرقمي واستقطاب العملاء B2B عبر LinkedIn و Google Search مع تحسين نسب التحويل وهيكلة العلامة التجارية.",
    },
    options: {
      en: [
        { label: "Explore Digital Marketing", action: "navigate", route: "/services/digital-marketing-brand-development", ctaType: "page" },
        { label: "Build My Growth Strategy", action: "start_project", payload: "Digital Growth Discussion", ctaType: "action" },
      ],
      hi: [
        { label: "डिजिटल मार्केटिंग देखें", action: "navigate", route: "/services/digital-marketing-brand-development", ctaType: "page" },
        { label: "ग्रोथ रणनीति बनाएं", action: "start_project", payload: "Digital Growth Discussion", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف التسويق الرقمي", action: "navigate", route: "/services/digital-marketing-brand-development", ctaType: "page" },
        { label: "بناء استراتيجية النمو", action: "start_project", payload: "Digital Growth Discussion", ctaType: "action" },
      ],
    },
  },

  // 5. WEB & APPLICATION DEVELOPMENT INTENT
  {
    id: "web_app_dev",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "web-app-development",
    keywords: [
      "website", "web development", "website development", "web app", "application development",
      "software development", "custom application", "enterprise application", "build an enterprise application",
      "modernize our old software", "modernize old software", "erp", "old erp", "build app", "saas portal",
      "frontend", "backend", "full stack", "mondernize", "devoloper", "web app dev", "custom software",
      "need a new enterprise application", "i need a new enterprise application", "build web app", "web application"
    ],
    response: {
      en: "We build subsecond Next.js web portals, multi-tenant SaaS platforms, microservices, and native mobile applications engineered for security and high scale.\n\nOur Web and Application Development practice transforms legacy systems into resilient digital experiences.",
      hi: "हम Next.js वेब पोर्टल, मल्टी-टैनेंट SaaS प्लेटफॉर्म, माइक्रोसर्विसेज और मोबाइल ऐप बनाते हैं जो उच्च सुरक्षा और स्केलेबिलिटी के लिए इंजीनियर किए गए हैं।",
      ar: "نبني منصات Next.js السريعة، وبوابات SaaS، وتطبيقات الجوال ذات الأداء العالي والأمان المؤسسي.",
    },
    options: {
      en: [
        { label: "Explore Web & App Dev", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "Build My Application", action: "start_project", payload: "Web Application Requirement", ctaType: "action" },
      ],
      hi: [
        { label: "वेब विकास देखें", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "एप्लिकेशन बनाएं", action: "start_project", payload: "Web Application Requirement", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف تطوير الويب", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "بناء التطبيق", action: "start_project", payload: "Web Application Requirement", ctaType: "action" },
      ],
    },
  },

  // 6. IT STRATEGY & CONSULTING INTENT
  {
    id: "it_strategy",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "it-strategy-implementation",
    keywords: [
      "it strategy", "technology strategy", "it roadmap", "legacy modernization", "cloud strategy",
      "technology planning", "cloud migration", "cto consulting", "architecture", "modernization",
      "tech roadmap", "it infrastructure", "technology help", "need technology help", "cloud infrastructure"
    ],
    response: {
      en: "We partner with CTOs and leadership teams to modernize legacy codebases, design zero-trust multi-cloud roadmaps (AWS/Azure/GCP), and optimize technical architecture for long-term growth.\n\nOur IT Strategy & Implementation practice ensures technology investments drive verified ROI.",
      hi: "हम सीटीओ और वरिष्ठ निदेशकों के साथ मिलकर लेगेसी प्रणालियों का आधुनिकीकरण करते हैं और क्लाउड रोडमैप तैयार करते हैं।",
      ar: "نشترك مع مدراء التكنولوجيا لتحديث الأنظمة القديمة وتصميم الخطط السحابية وتطوير الهندسة المعمارية البرمجية.",
    },
    options: {
      en: [
        { label: "Explore IT Strategy", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "Build My Technology Roadmap", action: "start_project", payload: "IT Strategy Roadmap", ctaType: "action" },
      ],
      hi: [
        { label: "आईटी रणनीति देखें", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "टेक्नोलॉजी रोडमैप बनाएं", action: "start_project", payload: "IT Strategy Roadmap", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف استراتيجية التقنية", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "بناء خريطة الطريق", action: "start_project", payload: "IT Strategy Roadmap", ctaType: "action" },
      ],
    },
  },

  // 7. RISK, COMPLIANCE & GOVERNANCE INTENT
  {
    id: "risk_compliance",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "risk-compliance-governance",
    keywords: [
      "compliance", "governance", "risk", "security governance", "regulatory requirements",
      "dpdp", "gdpr", "soc2", "iso 27001", "data privacy", "cybersecurity governance", "compilance",
      "regulatory", "compliance and governance support", "compliance support", "governance support"
    ],
    response: {
      en: "We assist enterprise organizations with India DPDP Act 2023 readiness, SOC-2 framework preparedness, ISO 27001 evidence tracking, and end-to-end data governance controls.\n\nOur Risk, Compliance & Governance practice protects enterprise resilience without slowing speed.",
      hi: "हम भारत DPDP एक्ट 2023, SOC-2 ढाँचे और ISO 27001 अनुपालन के साथ डेटा सुरक्षा और गवर्नेंस लागू करते हैं।",
      ar: "نساعد المؤسسات في الالتزام بقوانين حماية البيانات DPDP والمعايير الدولية SOC 2 و ISO 27001 لضمان الأمان السيبراني.",
    },
    options: {
      en: [
        { label: "Explore Risk & Compliance", action: "navigate", route: "/services/risk-compliance-governance", ctaType: "page" },
        { label: "Check Compliance Readiness", action: "start_project", payload: "Compliance Check Inquiry", ctaType: "action" },
      ],
      hi: [
        { label: "जोखिम अनुपालन देखें", action: "navigate", route: "/services/risk-compliance-governance", ctaType: "page" },
        { label: "अनुपालन जांच करें", action: "start_project", payload: "Compliance Check Inquiry", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف الامتثال والحوكمة", action: "navigate", route: "/services/risk-compliance-governance", ctaType: "page" },
        { label: "فحص الامتثال", action: "start_project", payload: "Compliance Check Inquiry", ctaType: "action" },
      ],
    },
  },

  // 8. AUDIT & IMPROVEMENT INTENT
  {
    id: "system_audit_finops",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "audit-improvement",
    keywords: [
      "audit", "assessment", "review", "technology assessment", "technology audit", "system audit",
      "finops", "cloud cost", "reduce cloud bill", "improve our systems", "audt", "system assessment",
      "audit our technology environment", "audit technology", "system review", "performance audit"
    ],
    response: {
      en: "We assess operational processes, technology architectures, and cloud environments to uncover friction, optimize query latencies, and reduce cloud infrastructure bills by up to 40%.\n\nOur Audit & Improvement practice turns objective evidence into practical priorities.",
      hi: "हम प्रक्रियाओं और क्लाउड इंफ्रास्ट्रक्चर का निष्पक्ष ऑडिट करते हैं और क्लाउड बिल को 40% तक कम करने में मदद करते हैं।",
      ar: "نقوم بتدقيق الأنظمة والبنية التحتية السحابية لتقليل التكاليف بنسبة تصل إلى 40% وتحسين الأداء التشغيلي.",
    },
    options: {
      en: [
        { label: "Explore Audit & Improvement", action: "navigate", route: "/services/audit-improvement", ctaType: "page" },
        { label: "Start System Audit", action: "start_project", payload: "Audit & Assessment Requirement", ctaType: "action" },
      ],
      hi: [
        { label: "ऑडिट एवं सुधार देखें", action: "navigate", route: "/services/audit-improvement", ctaType: "page" },
        { label: "सिस्टम ऑडिट शुरू करें", action: "start_project", payload: "Audit & Assessment Requirement", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف التدقيق والتحسين", action: "navigate", route: "/services/audit-improvement", ctaType: "page" },
        { label: "بدء تدقيق الأنظمة", action: "start_project", payload: "Audit & Assessment Requirement", ctaType: "action" },
      ],
    },
  },

  // 9. TRAINING & STAFF AUGMENTATION INTENT
  {
    id: "staff_augmentation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "training-staff-augmentation",
    keywords: [
      "training", "upskilling", "reskilling", "capability building", "developers", "technical staff",
      "specialists", "additional team members", "extended team", "hire developers", "pod", "staff augmentation",
      "need developers", "devoloper", "devs", "team capability", "developers or technical specialists",
      "technical specialists for a project", "need developers or technical specialists"
    ],
    response: {
      en: "We deploy pre-vetted senior software engineers, cloud architects, DevOps leads, and QA specialists who integrate into your sprint cycles within 48 to 72 hours, alongside corporate upskilling cohorts.\n\nOur Training & Staff Augmentation practice accelerates delivery velocity.",
      hi: "हम सीनियर सॉफ्टवेयर इंजीनियर्स और क्लाउड विशेषज्ञों को 48-72 घंटों में आपकी टीम के साथ एकीकृत करते हैं।",
      ar: "نوفر فرق عمل هندسية مخصصة ومستقلة تندمج مع فريقك خلال 48-72 ساعة لزيادة سرعة التنفيذ.",
    },
    options: {
      en: [
        { label: "Explore Staff Augmentation", action: "navigate", route: "/services/training-staff-augmentation", ctaType: "page" },
        { label: "Build My Team Capability", action: "start_project", payload: "Staff Augmentation Requirement", ctaType: "action" },
      ],
      hi: [
        { label: "टीम विस्तार देखें", action: "navigate", route: "/services/training-staff-augmentation", ctaType: "page" },
        { label: "टीम क्षमता बढ़ाएं", action: "start_project", payload: "Staff Augmentation Requirement", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف دعم الكفاءات", action: "navigate", route: "/services/training-staff-augmentation", ctaType: "page" },
        { label: "بناء قدرات الفريق", action: "start_project", payload: "Staff Augmentation Requirement", ctaType: "action" },
      ],
    },
  },

  // 10. AI PORTFOLIO & AUTOMATION INTENT
  {
    id: "ai_automation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "ai-portfolio",
    keywords: [
      "ai", "artificial intelligence", "ai solutions", "automation", "ai systems", "intelligent workflows",
      "llm", "rag", "chatbots", "machine learning", "ai portfolio", "intelligent automation",
      "how can ai help our business", "how can ai help my business", "ai for business", "i want ai",
      "ai solutions for my company"
    ],
    response: {
      en: "We design, build, and deploy production-ready AI solutions, including Retrieval-Augmented Generation (RAG) knowledge search engines, LLM pipelines, automated bots, and intelligent workflow automation.\n\nOur AI Portfolio delivers secure, measurable AI implementation.",
      hi: "हम कस्टम RAG नॉलेज सर्च इंजन, LLM पाइपलाइनों और बुद्धिमान स्वचालन के साथ एंटरप्राइज एआई समाधान बनाते हैं।",
      ar: "نبني تطبيقات ذكاء اصطناعي مخصصة للمؤسسات تشمل محركات بحث RAG، وأتمتة مسارات العمل الذكية.",
    },
    options: {
      en: [
        { label: "Explore AI Solutions", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "Discuss an AI Use Case", action: "start_project", payload: "AI Use Case Discussion", ctaType: "action" },
      ],
      hi: [
        { label: "एआई समाधान देखें", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "एआई उपयोग पर चर्चा करें", action: "start_project", payload: "AI Use Case Discussion", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف حلول الذكاء الاصطناعي", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "مناقشة مشروع AI", action: "start_project", payload: "AI Use Case Discussion", ctaType: "action" },
      ],
    },
  },

  // 11. PRICING & COST INTENT
  {
    id: "pricing_cost",
    intentLevel: "MODERATE_BUYING",
    keywords: [
      "cost", "price", "pricing", "quote", "budget", "how much", "تكلفة", "أسعار", "लागत", "कीमत", "बजट",
      "how much does it cost", "what's your pricing", "how much do you charge", "what are your rates",
      "do you offer fixed pricing", "what's the engagement model", "how do you bill", "what's your price range",
      "are you affordable", "how much for a project", "pricing model", "retainer cost", "hourly rate", "project cost"
    ],
    response: {
      en: "Our enterprise engagements are custom-built around your specific project scope and technical requirements. Share your objectives with our team for a tailored proposal under NDA.",
      hi: "हमारी सेवाएं आपकी विशिष्ट व्यावसायिक प्राथमिकताओं के अनुसार तैयार की जाती हैं। हमें अपनी आवश्यकताएं बताएं और हम कस्टम प्रस्ताव साझा करेंगे।",
      ar: "تخصص مشاريعنا وفقاً لأهدافك الاستراتيجية والمؤسسية. شاركنا متطلباتك لنقدم لك عرضاً مخصصاً.",
    },
    options: {
      en: [
        { label: "Start a Conversation", action: "start_project", ctaType: "action" },
        { label: "Explore Core Services", action: "navigate", route: "/services", ctaType: "page" },
      ],
      hi: [
        { label: "चर्चा शुरू करें", action: "start_project", ctaType: "action" },
        { label: "मुख्य सेवाएं देखें", action: "navigate", route: "/services", ctaType: "page" },
      ],
      ar: [
        { label: "بدء المحادثة", action: "start_project", ctaType: "action" },
        { label: "عرض الخدمات الرئيسية", action: "navigate", route: "/services", ctaType: "page" },
      ],
    },
  },

  // 12. TIMELINE & PROCESS INTENT
  {
    id: "timeline_process",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "timeline", "how long", "process", "how do you work", "timeline process", "fast delivery",
      "how long does a project take", "what's your timeline", "how fast can you deliver",
      "when can you start", "what's your process", "walk me through your approach", "methodology"
    ],
    response: {
      en: "We follow a 5-step delivery methodology: Understand → Strategize → Implement → Optimize → Deliver. Timelines depend on complexity (e.g., MVPs in 4-6 weeks, Enterprise portals in 8-12 weeks).",
      hi: "हम 5-चरणीय डिलीवरी पद्धति का पालन करते हैं: समझें → रणनीति बनाएं → लागू करें → अनुकूलित करें → डिलीवर करें। समय सीमा 4-12 सप्ताह होती है।",
      ar: "نتبع منهجية محددة من 5 خطوات: الفهم ← الاستراتيجية ← التنفيذ ← التحسين ← التسليم.",
    },
    options: {
      en: [
        { label: "Start a Conversation", action: "start_project", ctaType: "action" },
        { label: "View Case Studies", action: "navigate", route: "/case-studies", ctaType: "page" },
      ],
      hi: [
        { label: "चर्चा शुरू करें", action: "start_project", ctaType: "action" },
        { label: "केस स्टडी देखें", action: "navigate", route: "/case-studies", ctaType: "page" },
      ],
      ar: [
        { label: "بدء المحادثة", action: "start_project", ctaType: "action" },
        { label: "عرض دراسات الحالة", action: "navigate", route: "/case-studies", ctaType: "page" },
      ],
    },
  },

  // 13. LOCATIONS & CONTACT
  {
    id: "locations_contact",
    intentLevel: "STRONG_BUYING",
    keywords: [
      "contact", "reach you", "get started", "call", "phone", "email", "office", "location", "gurgaon", "dubai",
      "phone number", "email address", "book a call", "schedule consultation", "where are you located"
    ],
    response: {
      en: "Arav Innovations operates dual regional hubs:\n\n• India HQ: Sector 44, Gurgaon (Tel: +91 96506 25777)\n• UAE Office: Dubai Silicon Oasis / Boulevard Plaza, Dubai (Tel: +971 52155 5792)\n• Email: support@aravinnovations.com",
      hi: "हमारे दो मुख्य कार्यालय हैं: गुरुग्राम (भारत HQ) और दुबई (यूएई कार्यालय)। ईमेल: support@aravinnovations.com",
      ar: "تمتلك آراف إينوفيشينز مركزين: المقر الرئيسي في جورجاون (الهند) والمكتب الإقليمي في دبي (الإمارات).",
    },
    options: {
      en: [
        { label: "Contact Page", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "Start a Conversation", action: "start_project", ctaType: "action" },
      ],
      hi: [
        { label: "संपर्क पेज देखें", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "चर्चा शुरू करें", action: "start_project", ctaType: "action" },
      ],
      ar: [
        { label: "صفحة التواصل", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "بدء المحادثة", action: "start_project", ctaType: "action" },
      ],
    },
    triggerLeadForm: true,
  },

  // 14. OUT-OF-SCOPE GENERAL TECH QUERY
  {
    id: "general_tech",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "what is python", "what is react", "what is nextjs", "what is node", "what is cloud",
      "what is aws", "what is llm", "what is typescript", "what is javascript"
    ],
    response: {
      en: "Python, React, and modern cloud technologies are foundational tools used for web backends, automation, and AI platforms.\n\nIf you're asking because you have an enterprise project requirement, Arav Innovations provides full-stack software development, cloud strategy, and AI engineering.",
      hi: "पायथन, रिएक्ट और आधुनिक क्लाउड तकनीकें वेब और एआई अनुप्रयोगों के लिए उपयोग की जाती हैं। यदि आपकी कोई परियोजना आवश्यकता है, तो आरव इनोवेशन आपकी मदद कर सकता है।",
      ar: "بايثون ورياكت والتقنيات السحابية هي أدوات أساسية لبناء البرمجيات والذكاء الاصطناعي. يمكن لآراف إينوفيشينز تقديم الدعم الفني لمشروعك.",
    },
    options: {
      en: [
        { label: "Explore Web & App Dev", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "Explore AI Solutions", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "Start a Conversation", action: "start_project", ctaType: "action" },
      ],
      hi: [
        { label: "वेब विकास देखें", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "एआई समाधान देखें", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "चर्चा शुरू करें", action: "start_project", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف تطوير الويب", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "استكشف حلول AI", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "بدء المحادثة", action: "start_project", ctaType: "action" },
      ],
    },
  },
];

// Initialize Fuse.js instance for fuzzy pattern matching
const fuseKeys = chatbotIntents.map((intent) => ({
  id: intent.id,
  keywords: intent.keywords.join(" "),
}));

const fuse = new Fuse(fuseKeys, {
  keys: ["keywords"],
  threshold: 0.45,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export function findIntent(
  query: string,
  locale = "en",
  sessionContext?: Partial<ChatSessionContext>
): {
  intent: ChatbotIntent;
  responseText: string;
  isLeadForm: boolean;
  detectedService?: string;
  detectedIndustry?: string;
} | null {
  const normQ = normalizeQuery(query);
  if (!normQ) return null;

  const langKey = (locale === "hi" ? "hi" : locale === "ar" ? "ar" : "en") as "en" | "hi" | "ar";

  // 1. Check for vague query needing clarification
  if (["help", "need help", "technology help", "support", "capabilities"].includes(normQ)) {
    const defaultClarify = chatbotIntents.find((i) => i.id === "services_overview")!;
    const text = locale === "hi"
      ? "ज़रूर! क्या आप आईटी रणनीति, सॉफ्टवेयर डेवलपमेंट, डिजिटल मार्केटिंग, अनुपालन या एआई समाधानों की तलाश कर रहे हैं?"
      : locale === "ar"
      ? "بالتأكيد! هل تبحث عن استراتيجية التقنية، تطوير البرمجيات، التسويق الرقمي، الامتثال، أو حلول الذكاء الاصطناعي؟"
      : "Sure! Are you looking for technology strategy, software development, digital marketing, compliance, or AI solutions?";
    return {
      intent: defaultClarify,
      responseText: text,
      isLeadForm: false,
    };
  }

  // 2. Direct Keyword Check: collect all matching intents and pick the one with the longest keyword match
  let bestMatch: { intent: ChatbotIntent; kwLength: number } | null = null;

  for (const intent of chatbotIntents) {
    for (const kw of intent.keywords) {
      const cleanKw = normalizeQuery(kw);
      if (!cleanKw) continue;

      let matched = false;

      // Require word boundary for short keywords (<= 4 chars like "seo", "ai", "hi")
      if (/^[a-z0-9]+$/i.test(cleanKw) && cleanKw.length <= 4) {
        const regex = new RegExp(`\\b${cleanKw}\\b`, "i");
        matched = regex.test(normQ);
      } else {
        matched = normQ.includes(cleanKw);
      }

      if (matched) {
        if (!bestMatch || cleanKw.length > bestMatch.kwLength) {
          bestMatch = { intent, kwLength: cleanKw.length };
        }
      }
    }
  }

  if (bestMatch) {
    const intent = bestMatch.intent;
    let text = intent.response[langKey] || intent.response.en;

    // Check if live service data from CMS/data/services can enrich the response
    if (intent.associatedServiceSlug) {
      const liveService = getServiceBySlug(intent.associatedServiceSlug);
      if (liveService && langKey === "en") {
        text = `${liveService.description}\n\nOur ${liveService.title} is designed around how modern enterprises scale.`;
      }
    }

    return {
      intent,
      responseText: text,
      isLeadForm: intent.triggerLeadForm || intent.intentLevel === "STRONG_BUYING",
      detectedService: intent.associatedServiceSlug,
    };
  }

  // 3. Fuzzy Matching fallback via Fuse.js for misspelled queries
  const fuseResults = fuse.search(normQ);
  if (fuseResults.length > 0) {
    const matchedId = fuseResults[0].item.id;
    const intent = chatbotIntents.find((i) => i.id === matchedId);
    if (intent) {
      let text = intent.response[langKey] || intent.response.en;
      if (intent.associatedServiceSlug && langKey === "en") {
        const liveService = getServiceBySlug(intent.associatedServiceSlug);
        if (liveService) {
          text = `${liveService.description}\n\nOur ${liveService.title} is designed around how modern enterprises scale.`;
        }
      }
      return {
        intent,
        responseText: text,
        isLeadForm: intent.triggerLeadForm || intent.intentLevel === "STRONG_BUYING",
        detectedService: intent.associatedServiceSlug,
      };
    }
  }

  // 4. Industry detection fallback
  let detectedIndustry: string | undefined;
  if (normQ.includes("fintech") || normQ.includes("finance")) detectedIndustry = "FinTech & Banking";
  else if (normQ.includes("health") || normQ.includes("hospital")) detectedIndustry = "Healthcare";
  else if (normQ.includes("ecommerce") || normQ.includes("retail")) detectedIndustry = "E-Commerce";
  else if (normQ.includes("startup")) detectedIndustry = "Startups";
  else if (normQ.includes("enterprise")) detectedIndustry = "Enterprise";

  if (detectedIndustry) {
    const defaultIntent = chatbotIntents.find((i) => i.id === "services_overview")!;
    return {
      intent: defaultIntent,
      responseText: defaultIntent.response[langKey] || defaultIntent.response.en,
      isLeadForm: false,
      detectedIndustry,
    };
  }

  return null;
}
