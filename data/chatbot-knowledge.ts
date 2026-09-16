import Fuse from "fuse.js";

export interface ChatbotIntentOption {
  label: string;
  action:
    | "service_lookup"
    | "intent_trigger"
    | "all_services"
    | "locations"
    | "start_project"
    | "navigate"
    | "show_service_link"
    | "explore_products"
    | "progressive_lead"
    | "branch_question";
  payload?: string;
  route?: string;
  ctaType?: "page" | "action";
}

export type BuyingIntentLevel = "STRONG_BUYING" | "MODERATE_BUYING" | "INFORMATIONAL";

export interface ServiceCardData {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  capabilities: string[];
  route: string;
}

export interface ProductCardData {
  slug: string;
  name: string;
  domain?: string;
  tagline: string;
  description: string;
  route: string;
  externalUrl?: string;
}

export interface ChatbotIntent {
  id: string;
  intentLevel: BuyingIntentLevel;
  keywords: string[];
  associatedServiceSlug?: string;
  associatedProductSlug?: string;
  response: {
    en: string;
    hi: string;
    de: string;
    ar: string;
  };
  options?: {
    en: ChatbotIntentOption[];
    hi: ChatbotIntentOption[];
    de: ChatbotIntentOption[];
    ar: ChatbotIntentOption[];
  };
  triggerLeadForm?: boolean;
}

export interface ChatSessionContext {
  locale: string;
  userName?: string;
  userCompany?: string;
  userIndustry?: string;
  userEmail?: string;
  userPhone?: string;
  userRequirement?: string;
  projectGoal?: "BUILD_NEW" | "IMPROVE_EXISTING" | "GROWTH" | "AI" | "COMPLIANCE" | "AUDIT" | "TALENT" | "IT_STRATEGY" | "DONT_KNOW";
  projectType?: string;
  targetAudience?: string;
  mentionedIndustry?: string;
  mentionedService?: string;
  mentionedProduct?: string;
  mentionedTopic?: string;
  mentionedBudget?: string;
  lastIntentId?: string;
  leadStep?: "NAME" | "REQUIREMENT" | "COMPANY" | "INDUSTRY" | "EMAIL" | "PHONE" | "CONFIRM";
  conversationStage?: "GREETING" | "NAME_SET" | "QUALIFYING" | "RECOMMENDED" | "LEAD_CAPTURE";
  history: string[];
}

export function normalizeQuery(q: string): string {
  if (!q) return "";
  return q
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0900-\u097F\u0600-\u06FFäöüßÄÖÜ]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// 8 CORE SERVICE CARDS FOR COMPACT CHAT DISPLAY
export const serviceCardsData: Record<string, ServiceCardData> = {
  "web-app-development": {
    slug: "web-app-development",
    title: "Web & Application Development",
    eyebrow: "ENGINEERING & SOFTWARE",
    tagline: "Build scalable digital platforms designed around your business workflow.",
    capabilities: [
      "Custom Business Websites & Portals",
      "SaaS Platforms & Web Applications",
      "Enterprise Cloud Systems",
      "Performance & Mobile Optimization",
    ],
    route: "/services/web-app-development",
  },
  "it-strategy-implementation": {
    slug: "it-strategy-implementation",
    title: "IT Strategy & Implementation",
    eyebrow: "STRATEGY & ARCHITECTURE",
    tagline: "Modernize legacy systems and establish clear technology roadmaps.",
    capabilities: [
      "Enterprise Technology Roadmaps",
      "Legacy System Modernization",
      "Cloud Architecture & Migration",
      "FinOps & IT Cost Governance",
    ],
    route: "/services/it-strategy-implementation",
  },
  "digital-marketing-brand-development": {
    slug: "digital-marketing-brand-development",
    title: "Digital Marketing & Brand Development",
    eyebrow: "GROWTH & DEMAND GEN",
    tagline: "High-intent B2B demand generation and conversion-tuned marketing.",
    capabilities: [
      "B2B Lead & Demand Generation",
      "Brand Strategy & Positioning",
      "Paid Search & LinkedIn Campaigns",
      "Conversion Funnel Optimization",
    ],
    route: "/services/digital-marketing-brand-development",
  },
  "seo-services": {
    slug: "seo-services",
    title: "SEO Services & AEO",
    eyebrow: "SEARCH VISIBILITY",
    tagline: "Dominate organic search rankings and AI search engines.",
    capabilities: [
      "Technical SEO & Crawl Audits",
      "High-Intent Organic Keyword Strategy",
      "AI Engine Optimization (AEO)",
      "Authority Building & Content Architecture",
    ],
    route: "/services/seo-services",
  },
  "ai-portfolio": {
    slug: "ai-portfolio",
    title: "AI Portfolio / AI Solutions",
    eyebrow: "AI & AUTOMATION",
    tagline: "Practical AI integration and workflow automation for enterprise processes.",
    capabilities: [
      "Workflow & Process Automation",
      "Custom Conversational AI & RAG",
      "LLM & Data Pipeline Integration",
      "Enterprise AI Security Guardrails",
    ],
    route: "/services/ai-portfolio",
  },
  "risk-compliance-governance": {
    slug: "risk-compliance-governance",
    title: "Risk, Compliance & Governance",
    eyebrow: "GRC & SECURITY",
    tagline: "Frameworks for DPDP, SOC-2, ISO 27001, and corporate security.",
    capabilities: [
      "India DPDP Act Readiness",
      "SOC-2 & ISO 27001 Audit Prep",
      "Enterprise Security Governance",
      "Vendor & Third-Party Risk Assessment",
    ],
    route: "/services/risk-compliance-governance",
  },
  "audit-improvement": {
    slug: "audit-improvement",
    title: "Audit & Improvement",
    eyebrow: "ASSURANCE & OPERATIONAL EFFICIENCY",
    tagline: "Identify bottlenecks, optimize cloud spend, and improve operational efficiency.",
    capabilities: [
      "Cloud FinOps & Bill Reduction",
      "Software Architecture Audit",
      "System Performance & Bottleneck Analysis",
      "Operational Process Optimization",
    ],
    route: "/services/audit-improvement",
  },
  "training-staff-augmentation": {
    slug: "training-staff-augmentation",
    title: "Training & Staff Augmentation",
    eyebrow: "PEOPLE & CAPABILITY",
    tagline: "Empower your organization with senior technical talent and dedicated pods.",
    capabilities: [
      "Dedicated Senior Developer Pods",
      "Specialized Engineering Roles",
      "Technical Team Upskilling",
      "Flexible Project Augmentation",
    ],
    route: "/services/training-staff-augmentation",
  },
};

// PRODUCT CARDS DATA
export const productCardsData: Record<string, ProductCardData> = {
  "astrobeams-ai": {
    slug: "astrobeams-ai",
    name: "AstroBeams AI",
    domain: "astrobeams.in",
    tagline: "Personalized AI Cosmic Guidance & Life Reports",
    description: "24/7 AI-powered astrology, horoscope analysis, and instant PDF life reports.",
    route: "/products/astrobeams-ai",
    externalUrl: "https://astrobeams.in",
  },
  astrobeams: {
    slug: "astrobeams",
    name: "AstroBeams",
    domain: "astrobeams.store",
    tagline: "Live Astrologer Consultation Platform",
    description: "Connect 24/7 with certified expert astrologers for live chat and voice consultation.",
    route: "/products/astrobeams",
    externalUrl: "https://astrobeams.store",
  },
  omnigrc: {
    slug: "omnigrc",
    name: "OMNiGRC",
    domain: "omnigrc.vercel.app",
    tagline: "Enterprise Governance, Risk & Compliance SaaS",
    description: "Automated compliance tracking across DPDP, SOC-2, ISO 27001, and GDPR.",
    route: "/products/omnigrc",
    externalUrl: "https://omnigrc.vercel.app",
  },
};

// GREETING QUICK REPLIES: ALWAYS 2-4 CONTEXTUAL CHIPS
export function getGreetingQuickReplies(locale = "en", userName?: string): ChatbotIntentOption[] {
  if (locale === "hi") {
    return [
      { label: "नया प्रोजेक्ट बनाना है", action: "intent_trigger", payload: "branch_build_new" },
      { label: "मौजूदा वेबसाइट/ऐप सुधारें", action: "intent_trigger", payload: "branch_improve_existing" },
      { label: "बिज़नेस ग्रोथ / एसईओ", action: "intent_trigger", payload: "branch_growth_seo" },
      { label: "एआई या अनुपालन (DPDP)", action: "intent_trigger", payload: "branch_ai_compliance" },
    ];
  }
  if (locale === "de") {
    return [
      { label: "Neues Projekt bauen", action: "intent_trigger", payload: "branch_build_new" },
      { label: "Bestehendes System verbessern", action: "intent_trigger", payload: "branch_improve_existing" },
      { label: "Wachstum & SEO", action: "intent_trigger", payload: "branch_growth_seo" },
      { label: "KI oder Compliance", action: "intent_trigger", payload: "branch_ai_compliance" },
    ];
  }
  return [
    { label: "Build something new", action: "intent_trigger", payload: "branch_build_new" },
    { label: "Improve something existing", action: "intent_trigger", payload: "branch_improve_existing" },
    { label: "Grow my business", action: "intent_trigger", payload: "branch_growth_seo" },
    { label: "Explore AI / Compliance", action: "intent_trigger", payload: "branch_ai_compliance" },
  ];
}

// CONVERSATIONAL INTENTS CATALOGUE
export const chatbotIntents: ChatbotIntent[] = [
  // 1. GREETINGS & INTROS
  {
    id: "greeting_hi",
    intentLevel: "INFORMATIONAL",
    keywords: ["hi", "hii", "hiii", "hi bot", "hi arav", "hello", "hey", "namaste", "hallo", "marhaba", "नमस्ते", "greetings"],
    response: {
      en: "Hi! 👋 I'm the Arav Innovations assistant.\n\nI can help you figure out the right technology, digital growth, AI, or governance solution.\n\nWhat are you working on right now?",
      hi: "नमस्ते! 👋 मैं आरव इनोवेशन असिस्टेंट हूँ।\n\nमैं आपको सही तकनीक, डिजिटल ग्रोथ, एआई या अनुपालन समाधान खोजने में मदद कर सकता हूँ।\n\nआप अभी किस पर काम कर रहे हैं?",
      de: "Hallo! 👋 Ich bin der Arav Innovations Assistent.\n\nIch helfe Ihnen, die richtige Technologie-, Wachstums-, KI- oder Compliance-Lösung zu finden.\n\nWoran arbeiten Sie derzeit?",
      ar: "مرحباً! 👋 أنا مساعد آراف إينوفيشينز.\n\nيمكنني مساعدتك في تحديد الحل التقني، النمو الرقمي، أو الذكاء الاصطناعي المناسب.\n\nما الذي تعمل عليه الآن؟",
    },
    options: {
      en: getGreetingQuickReplies("en"),
      hi: getGreetingQuickReplies("hi"),
      de: getGreetingQuickReplies("de"),
      ar: getGreetingQuickReplies("en"),
    },
  },
  {
    id: "greeting_how_are_you",
    intentLevel: "INFORMATIONAL",
    keywords: ["how are you", "how r u", "kya haal hai", "kaisa hai", "wie geht es dir", "wie gehts", "how do you do", "what's up"],
    response: {
      en: "Doing great, thanks for asking! 👋 I'm ready to help with your project goals.\n\nWhat are you looking to achieve today?",
      hi: "बहुत बढ़िया, पूछने के लिए धन्यवाद! 👋 मैं आपकी परियोजना में मदद के लिए तैयार हूँ।\n\nआज आप क्या हासिल करना चाहते हैं?",
      de: "Sehr gut, danke! 👋 Ich bin bereit, Sie bei Ihrem Projekt zu unterstützen.\n\nWas möchten Sie heute erreichen?",
      ar: "بخير والحمد لله! 👋 أنا جاهز لمساعدتك في أهداف مشروعك.\n\nما الذي تتطلع لتحقيقه اليوم؟",
    },
    options: {
      en: getGreetingQuickReplies("en"),
      hi: getGreetingQuickReplies("hi"),
      de: getGreetingQuickReplies("de"),
      ar: getGreetingQuickReplies("en"),
    },
  },

  // 2. CONVERSATIONAL BRANCH TRIGGERS & FOLLOW-UP STEPS
  // BRANCH: BUILD NEW
  {
    id: "branch_build_new",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "build something new", "new project", "build a website", "create a website", "make a website",
      "need a website", "want a website", "build an app", "need an app", "saas platform", "new application",
      "start new project", "naya project", "website banwani hai", "website banana hai"
    ],
    response: {
      en: "Awesome! Building something new is exciting. 🚀\n\nTo help narrow down the right approach, what type of digital product are you looking to create?",
      hi: "शानदार! कुछ नया बनाना बहुत रोमांचक है। 🚀\n\nसही दृष्टिकोण चुनने के लिए, आप किस प्रकार का डिजिटल उत्पाद बनाना चाहते हैं?",
      de: "Großartig! Ein neues Projekt zu bauen ist aufregend. 🚀\n\nWelche Art von digitalem Produkt möchten Sie erstellen?",
      ar: "رائع! بناء شيء جديد أمر ممتع. 🚀\n\nما نوع المنتج الرقمي الذي تتطلع لإنشائه؟",
    },
    options: {
      en: [
        { label: "Business Website", action: "intent_trigger", payload: "flow_build_website" },
        { label: "SaaS / Web Platform", action: "intent_trigger", payload: "flow_build_saas" },
        { label: "Mobile / Custom App", action: "intent_trigger", payload: "flow_build_app" },
        { label: "Not decided yet", action: "intent_trigger", payload: "dont_know_help" },
      ],
      hi: [
        { label: "व्यावसायिक वेबसाइट", action: "intent_trigger", payload: "flow_build_website" },
        { label: "SaaS / वेब प्लेटफ़ॉर्म", action: "intent_trigger", payload: "flow_build_saas" },
        { label: "मोबाइल / कस्टम ऐप", action: "intent_trigger", payload: "flow_build_app" },
        { label: "अभी तय नहीं है", action: "intent_trigger", payload: "dont_know_help" },
      ],
      de: [
        { label: "Unternehmens-Website", action: "intent_trigger", payload: "flow_build_website" },
        { label: "SaaS / Web-Plattform", action: "intent_trigger", payload: "flow_build_saas" },
        { label: "Mobile / Custom App", action: "intent_trigger", payload: "flow_build_app" },
        { label: "Noch nicht sicher", action: "intent_trigger", payload: "dont_know_help" },
      ],
      ar: [
        { label: "موقع شركة", action: "intent_trigger", payload: "flow_build_website" },
        { label: "منصة SaaS", action: "intent_trigger", payload: "flow_build_saas" },
        { label: "تطبيق جوال", action: "intent_trigger", payload: "flow_build_app" },
      ],
    },
  },

  {
    id: "flow_build_website",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "web-app-development",
    keywords: ["business website", "company website", "flow_build_website"],
    response: {
      en: "Got it. A business website should convey authority, load lightning fast, and convert visitors into active leads. 👍\n\nIs this for a brand-new company, or are you replacing an outdated existing website?",
      hi: "समझ गया। एक व्यावसायिक वेबसाइट को भरोसा बनाना चाहिए और तेज़ गति से काम करना चाहिए। 👍\n\nक्या यह एक नई कंपनी के लिए है, या आप किसी पुरानी वेबसाइट को बदल रहे हैं?",
      de: "Verstanden. Eine Unternehmens-Website muss Vertrauen aufbauen und schnell laden. 👍\n\nHandelt es sich um ein neues Unternehmen oder ersetzen Sie eine bestehende Seite?",
      ar: "فهمت ذلك. يجب أن تبني موقع الشركة الثقة وتعمل بسرعة فائقة. 👍\n\nهل هذا لشركة جديدة أم استبدال لموقع قديم؟",
    },
    options: {
      en: [
        { label: "Brand-new company", action: "intent_trigger", payload: "recommend_web_dev_new" },
        { label: "Replacing old website", action: "intent_trigger", payload: "recommend_web_dev_redesign" },
        { label: "Need SEO included", action: "intent_trigger", payload: "flow_growth_seo" },
      ],
      hi: [
        { label: "बिल्कुल नई कंपनी", action: "intent_trigger", payload: "recommend_web_dev_new" },
        { label: "पुरानी वेबसाइट बदलना", action: "intent_trigger", payload: "recommend_web_dev_redesign" },
      ],
      de: [
        { label: "Ganz neues Unternehmen", action: "intent_trigger", payload: "recommend_web_dev_new" },
        { label: "Alte Website ersetzen", action: "intent_trigger", payload: "recommend_web_dev_redesign" },
      ],
      ar: [
        { label: "شركة جديدة تماماً", action: "intent_trigger", payload: "recommend_web_dev_new" },
      ],
    },
  },

  {
    id: "flow_build_saas",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "web-app-development",
    keywords: ["saas platform", "saas web platform", "flow_build_saas"],
    response: {
      en: "Nice choice! Building a SaaS platform requires clean multi-tenant architecture, intuitive UX, and secure auth pipelines. 💻\n\nWho will primarily use this platform?",
      hi: "बढ़िया चुनाव! SaaS प्लेटफ़ॉर्म बनाने के लिए स्वच्छ आर्किटेक्चर और सुरक्षित प्रमाणीकरण की आवश्यकता होती है। 💻\n\nमुख्य रूप से इस प्लेटफ़ॉर्म का उपयोग कौन करेगा?",
      de: "Gute Wahl! Ein SaaS-System erfordert saubere Architektur und sichere Authentifizierung. 💻\n\nWer wird die Plattform hauptsächlich nutzen?",
      ar: "اختيار ممتاز! يتطلب بناء منصة SaaS بنية معمارية قوية وأماناً عالياً. 💻\n\nمن يستهدف هذا التطبيق بشكل رئيسي؟",
    },
    options: {
      en: [
        { label: "Businesses (B2B)", action: "intent_trigger", payload: "recommend_web_dev_saas" },
        { label: "Consumers (B2C)", action: "intent_trigger", payload: "recommend_web_dev_saas" },
        { label: "Internal teams", action: "intent_trigger", payload: "recommend_web_dev_saas" },
      ],
      hi: [
        { label: "व्यवसाय (B2B)", action: "intent_trigger", payload: "recommend_web_dev_saas" },
        { label: "उपभोक्ता (B2C)", action: "intent_trigger", payload: "recommend_web_dev_saas" },
      ],
      de: [
        { label: "Unternehmen (B2B)", action: "intent_trigger", payload: "recommend_web_dev_saas" },
        { label: "Konsumenten (B2C)", action: "intent_trigger", payload: "recommend_web_dev_saas" },
      ],
      ar: [
        { label: "الشركات (B2B)", action: "intent_trigger", payload: "recommend_web_dev_saas" },
      ],
    },
  },

  // SERVICE MATCH RECOMMENDATIONS
  {
    id: "recommend_web_dev_new",
    intentLevel: "STRONG_BUYING",
    associatedServiceSlug: "web-app-development",
    keywords: ["recommend_web_dev_new", "recommend_web_dev_redesign", "recommend_web_dev_saas"],
    response: {
      en: "Based on what you've shared, your project fits our **Web & Application Development** practice.\n\nWe build scalable, subsecond-loading web platforms tailored specifically to your business workflows.",
      hi: "आपकी जानकारी के आधार पर, आपका प्रोजेक्ट हमारी **Web & Application Development** सेवा से मेल खाता है।\n\nहम आपकी व्यावसायिक आवश्यकताओं के अनुसार कस्टम, उच्च-प्रदर्शन प्लेटफ़ॉर्म तैयार करते हैं।",
      de: "Basierend auf Ihren Angaben passt Ihr Projekt perfekt zu **Web & Application Development**.\n\nWir entwickeln maßgeschneiderte, hochleistungsfähige Webanwendungen.",
      ar: "بناءً على ما شاركته، يناسب مشروعك خدمة **تطوير المواقع والتطبيقات** لدينا.",
    },
    options: {
      en: [
        { label: "Explore Web & App Dev", action: "show_service_link", route: "/services/web-app-development" },
        { label: "Talk to an Expert", action: "progressive_lead", payload: "Web & App Development Inquiry" },
        { label: "Explore other options", action: "intent_trigger", payload: "greeting_hi" },
      ],
      hi: [
        { label: "वेब एवं ऐप विकास देखें", action: "show_service_link", route: "/services/web-app-development" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "Web & App Development Inquiry" },
      ],
      de: [
        { label: "Web & App Dev ansehen", action: "show_service_link", route: "/services/web-app-development" },
        { label: "Mit Experten sprechen", action: "progressive_lead", payload: "Web & App Development Inquiry" },
      ],
      ar: [
        { label: "عرض تفاصيل الخدمة", action: "show_service_link", route: "/services/web-app-development" },
        { label: "التحدث مع مختص", action: "progressive_lead", payload: "Web & App Development Inquiry" },
      ],
    },
  },

  // BRANCH: IMPROVE EXISTING
  {
    id: "branch_improve_existing",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "improve something existing", "redesign website", "website is slow", "my website is slow",
      "redesign my website", "outdated website", "fix website", "improve performance", "legacy code",
      "old system", "purani website", "website slow hai"
    ],
    response: {
      en: "Got it. Improving existing systems is often about removing technical debt or fixing speed & UI friction. ⚙️\n\nWhat is the main area you want to improve?",
      hi: "समझ गया। मौजूदा प्रणालियों को सुधारने में आमतौर पर तकनीकी ऋण हटाना और गति/यूआई में सुधार करना शामिल होता है। ⚙️\n\nआप मुख्य रूप से किस क्षेत्र में सुधार करना चाहते हैं?",
      de: "Verstanden. Die Verbesserung bestehender Systeme dreht sich meist um Ladezeiten, UX oder Code-Modernisierung. ⚙️\n\nWas möchten Sie hauptsächlich verbessern?",
      ar: "فهمت ذلك. تحسين الأنظمة الحالية يتعلق عادةً بالسرعة وواجهة المستخدم أو تحديث الكود. ⚙️\n\nما الذي ترغب في تحسينه بشكل رئيسي؟",
    },
    options: {
      en: [
        { label: "UI/UX & Modern Redesign", action: "intent_trigger", payload: "recommend_web_dev_new" },
        { label: "Website Speed & Audit", action: "intent_trigger", payload: "flow_audit_speed" },
        { label: "Legacy Code / IT Infra", action: "intent_trigger", payload: "it_strategy" },
        { label: "SEO & Rankings", action: "intent_trigger", payload: "flow_growth_seo" },
      ],
      hi: [
        { label: "UI/UX और आधुनिक रीडिजाइन", action: "intent_trigger", payload: "recommend_web_dev_new" },
        { label: "वेबसाइट गति एवं ऑडिट", action: "intent_trigger", payload: "flow_audit_speed" },
        { label: "पुरानी प्रणाली / आईटी ढांचा", action: "intent_trigger", payload: "it_strategy" },
      ],
      de: [
        { label: "UI/UX & Redesign", action: "intent_trigger", payload: "recommend_web_dev_new" },
        { label: "Website-Geschwindigkeit", action: "intent_trigger", payload: "flow_audit_speed" },
        { label: "Altsysteme / IT-Struktur", action: "intent_trigger", payload: "it_strategy" },
      ],
      ar: [
        { label: "إعادة تصميم UI/UX", action: "intent_trigger", payload: "recommend_web_dev_new" },
        { label: "سرعة الموقع والتدقيق", action: "intent_trigger", payload: "flow_audit_speed" },
      ],
    },
  },

  {
    id: "flow_audit_speed",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "audit-improvement",
    keywords: ["website speed & audit", "slow site", "flow_audit_speed"],
    response: {
      en: "Slow performance impacts both user conversions and search engine rankings.\n\nOur **Audit & Improvement** practice conducts architectural health checks and cloud FinOps reviews to resolve bottleneck issues.",
      hi: "धीमी गति उपयोगकर्ता रूपांतरण और खोज रैंकिंग दोनों को प्रभावित करती है।\n\nहमारी **Audit & Improvement** सेवा समस्याओं के समाधान के लिए वास्तुकला स्वास्थ्य जांच प्रदान करती है।",
      de: "Langsame Ladezeiten beeinträchtigen Konvertierungen und SEO-Rankings.\n\nUnser **Audit & Improvement** Bereich führt Architekturprüfungen durch.",
      ar: "تؤثر السرعة البطيئة على تحويلات الزوار وترتيب البحث.\n\nيقدم قسم **التدقيق والتحسين** لدينا فحصاً معمارياً شاملاً.",
    },
    options: {
      en: [
        { label: "Explore Audit & Improvement", action: "show_service_link", route: "/services/audit-improvement" },
        { label: "Request a System Audit", action: "progressive_lead", payload: "System Audit Request" },
      ],
      hi: [
        { label: "ऑडिट एवं सुधार विवरण देखें", action: "show_service_link", route: "/services/audit-improvement" },
        { label: "ऑडिट का अनुरोध करें", action: "progressive_lead", payload: "System Audit Request" },
      ],
      de: [
        { label: "Audit & Improvement anzeigen", action: "show_service_link", route: "/services/audit-improvement" },
        { label: "Audit anfordern", action: "progressive_lead", payload: "System Audit Request" },
      ],
      ar: [
        { label: "عرض تفاصيل التدقيق", action: "show_service_link", route: "/services/audit-improvement" },
        { label: "طلب تدقيق النظام", action: "progressive_lead", payload: "System Audit Request" },
      ],
    },
  },

  // BRANCH: DIGITAL GROWTH & SEO
  {
    id: "branch_growth_seo",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "grow my business", "digital growth", "need more leads", "need seo", "marketing", "branding",
      "more traffic", "google ranking", "get leads", "leads chahiye", "traffic badhana hai"
    ],
    response: {
      en: "Understood. Driving consistent business growth requires a mix of organic search authority and targeted demand generation. 📈\n\nWhat is your top growth priority right now?",
      hi: "समझ गया। निरंतर व्यावसायिक वृद्धि के लिए खोज रैंकिंग और लक्षित विज्ञापनों का मिश्रण चाहिए। 📈\n\nआपकी मुख्य वृद्धि प्राथमिकता क्या है?",
      de: "Verstanden. Kontinuierliches Wachstum erfordert organische SEO-Sichtbarkeit und zielgerichtetes Marketing. 📈\n\nWas ist Ihre wichtigste Priorität?",
      ar: "فهمت ذلك. يتطلب تحقيق النمو الرقمي المزيج بين تحسين محركات البحث والتسويق الموجه. 📈\n\nما هي اولويتك الأولى في النمو؟",
    },
    options: {
      en: [
        { label: "Organic Search & SEO", action: "intent_trigger", payload: "flow_growth_seo" },
        { label: "B2B Leads & Marketing", action: "intent_trigger", payload: "flow_growth_mktg" },
        { label: "Both SEO & Marketing", action: "intent_trigger", payload: "flow_growth_both" },
      ],
      hi: [
        { label: "ऑर्गेनिक सर्च एवं एसईओ", action: "intent_trigger", payload: "flow_growth_seo" },
        { label: "B2B लीड्स एवं मार्केटिंग", action: "intent_trigger", payload: "flow_growth_mktg" },
        { label: "दोनों (एसईओ एवं मार्केटिंग)", action: "intent_trigger", payload: "flow_growth_both" },
      ],
      de: [
        { label: "Organische Suche & SEO", action: "intent_trigger", payload: "flow_growth_seo" },
        { label: "B2B-Leads & Marketing", action: "intent_trigger", payload: "flow_growth_mktg" },
        { label: "Beides (SEO & Marketing)", action: "intent_trigger", payload: "flow_growth_both" },
      ],
      ar: [
        { label: "النمو عبر SEO", action: "intent_trigger", payload: "flow_growth_seo" },
        { label: "التسويق واستقطاب العملاء", action: "intent_trigger", payload: "flow_growth_mktg" },
      ],
    },
  },

  {
    id: "flow_growth_seo",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "seo-services",
    keywords: ["organic search & seo", "flow_growth_seo"],
    response: {
      en: "Our **SEO Services & AEO** practice focuses on technical crawl health, high-intent keywords, and optimizing for modern AI search engines (like ChatGPT & Perplexity).",
      hi: "हमारी **SEO Services** सेवा तकनीकी ऑडिट, उच्च-आशय वाले कीवर्ड और एआई खोज इंजनों के अनुकूलन पर केंद्रित है।",
      de: "Unsere **SEO Services** konzentrieren sich auf technische Optimierung und KI-Suchmaschinen (AEO).",
      ar: "تركز خدمة **SEO والذكاء الاصطناعي AEO** على الكلمات المفتاحية العالية القيمة والجودة الفنية.",
    },
    options: {
      en: [
        { label: "Explore SEO Services", action: "show_service_link", route: "/services/seo-services" },
        { label: "Request an SEO Audit", action: "progressive_lead", payload: "SEO Audit Request" },
      ],
      hi: [
        { label: "एसईओ सेवाएं देखें", action: "show_service_link", route: "/services/seo-services" },
        { label: "ऑडिट का अनुरोध करें", action: "progressive_lead", payload: "SEO Audit Request" },
      ],
      de: [
        { label: "SEO Services anzeigen", action: "show_service_link", route: "/services/seo-services" },
        { label: "SEO-Audit anfordern", action: "progressive_lead", payload: "SEO Audit Request" },
      ],
      ar: [
        { label: "عرض تفاصيل SEO", action: "show_service_link", route: "/services/seo-services" },
        { label: "طلب تدقيق SEO", action: "progressive_lead", payload: "SEO Audit Request" },
      ],
    },
  },

  {
    id: "flow_growth_mktg",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "digital-marketing-brand-development",
    keywords: ["b2b leads & marketing", "flow_growth_mktg", "flow_growth_both"],
    response: {
      en: "Our **Digital Marketing & Brand Development** team engineers multi-channel B2B demand funnels, paid acquisition, and distinctive brand positioning.",
      hi: "हमारी **Digital Marketing** टीम B2B डिमांड फ़नल, विज्ञापनों और ब्रांड पोजिशनिंग का निर्माण करती है।",
      de: "Unser **Digital Marketing** Team entwickelt B2B-Nachfrage-Funnels und Marken-Positionierung.",
      ar: "صمم فريق **التسويق الرقمي** لدينا حملات B2B عالية الفعالية لاستقطاب العملاء.",
    },
    options: {
      en: [
        { label: "Explore Digital Marketing", action: "show_service_link", route: "/services/digital-marketing-brand-development" },
        { label: "Talk to a Growth Specialist", action: "progressive_lead", payload: "Digital Growth Strategy" },
      ],
      hi: [
        { label: "डिजिटल मार्केटिंग देखें", action: "show_service_link", route: "/services/digital-marketing-brand-development" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "Digital Growth Strategy" },
      ],
      de: [
        { label: "Digitales Marketing anzeigen", action: "show_service_link", route: "/services/digital-marketing-brand-development" },
        { label: "Mit Experten sprechen", action: "progressive_lead", payload: "Digital Growth Strategy" },
      ],
      ar: [
        { label: "عرض تفاصيل التسويق", action: "show_service_link", route: "/services/digital-marketing-brand-development" },
        { label: "التحدث مع مختص", action: "progressive_lead", payload: "Digital Growth Strategy" },
      ],
    },
  },

  // BRANCH: AI & COMPLIANCE
  {
    id: "branch_ai_compliance",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "explore ai / compliance", "ai compliance", "ai integration", "want ai solution", "need dpdp",
      "dpdp compliance", "security governance", "risk compliance", "soc2", "ai portfolio"
    ],
    response: {
      en: "Both AI automation and regulatory governance (like India's DPDP Act and SOC-2) are core priorities for modern enterprises. 🔒\n\nWhich area would you like to explore?",
      hi: "एआई ऑटोमेशन और अनुपालन (जैसे DPDP अधिनियम और SOC-2) दोनों आधुनिक व्यवसायों के लिए महत्वपूर्ण हैं। 🔒\n\nआप किस क्षेत्र का पता लगाना चाहते हैं?",
      de: "Sowohl KI-Automatisierung als auch Governance (wie DPDP und SOC-2) sind zentrale Themen. 🔒\n\nWelchen Bereich möchten Sie erkunden?",
      ar: "يعد الذكاء الاصطناعي والامتثال التنظيمي (مثل DPDP و SOC-2) من الأولويات الرئيسية. 🔒\n\nما المجال الذي ترغب في استكشافه؟",
    },
    options: {
      en: [
        { label: "AI Integration & Automation", action: "intent_trigger", payload: "ai_automation" },
        { label: "DPDP / Security Compliance", action: "intent_trigger", payload: "risk_compliance" },
        { label: "OMNiGRC SaaS Platform", action: "intent_trigger", payload: "omnigrc_info" },
      ],
      hi: [
        { label: "एआई एकीकरण एवं ऑटोमेशन", action: "intent_trigger", payload: "ai_automation" },
        { label: "DPDP / सुरक्षा अनुपालन", action: "intent_trigger", payload: "risk_compliance" },
        { label: "OMNiGRC प्लेटफ़ॉर्म", action: "intent_trigger", payload: "omnigrc_info" },
      ],
      de: [
        { label: "KI-Integration & Automatisierung", action: "intent_trigger", payload: "ai_automation" },
        { label: "DPDP / Sicherheits-Compliance", action: "intent_trigger", payload: "risk_compliance" },
        { label: "OMNiGRC Plattform", action: "intent_trigger", payload: "omnigrc_info" },
      ],
      ar: [
        { label: "دمج الذكاء الاصطناعي", action: "intent_trigger", payload: "ai_automation" },
        { label: "الامتثال والأمان (DPDP)", action: "intent_trigger", payload: "risk_compliance" },
      ],
    },
  },

  // BRANCH: "I DON'T KNOW" / HELP ME FIGURE IT OUT
  {
    id: "dont_know_help",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "i don't know", "dont know", "not sure", "can you help", "which service do i need",
      "help me figure it out", "pata nahi", "mujhe samajh nahi aa raha", "unsicher", "nicht sicher"
    ],
    response: {
      en: "No problem at all! Let's figure it out together. 👋\n\nWhat is the main outcome or challenge you are trying to address?",
      hi: "कोई समस्या नहीं! आइए मिलकर इसे समझते हैं। 👋\n\nआप मुख्य रूप से किस चुनौती का समाधान करना चाहते हैं?",
      de: "Kein Problem! Lassen Sie es uns gemeinsam herausfinden. 👋\n\nWas ist die Hauptherausforderung, die Sie lösen möchten?",
      ar: "لا مشكلة على الإطلاق! لنحدد ذلك معاً. 👋\n\nما هو التحدي الرئيسي الذي تحاول حله؟",
    },
    options: {
      en: [
        { label: "Build a new website or app", action: "intent_trigger", payload: "branch_build_new" },
        { label: "Get more customers & traffic", action: "intent_trigger", payload: "branch_growth_seo" },
        { label: "Use AI / Automate processes", action: "intent_trigger", payload: "ai_automation" },
        { label: "Improve compliance or security", action: "intent_trigger", payload: "risk_compliance" },
      ],
      hi: [
        { label: "नया ऐप या वेबसाइट बनाना", action: "intent_trigger", payload: "branch_build_new" },
        { label: "अधिक ग्राहक और ट्रैफ़िक प्राप्त करना", action: "intent_trigger", payload: "branch_growth_seo" },
        { label: "एआई का उपयोग करना", action: "intent_trigger", payload: "ai_automation" },
        { label: "सुरक्षा एवं अनुपालन में सुधार", action: "intent_trigger", payload: "risk_compliance" },
      ],
      de: [
        { label: "Neue Website oder App bauen", action: "intent_trigger", payload: "branch_build_new" },
        { label: "Mehr Kunden & Traffic gewinnen", action: "intent_trigger", payload: "branch_growth_seo" },
        { label: "KI & Prozesse automatisieren", action: "intent_trigger", payload: "ai_automation" },
        { label: "Compliance & Sicherheit", action: "intent_trigger", payload: "risk_compliance" },
      ],
      ar: [
        { label: "بناء موقع أو تطبيق جديد", action: "intent_trigger", payload: "branch_build_new" },
        { label: "زيادة العملاء والزيارات", action: "intent_trigger", payload: "branch_growth_seo" },
      ],
    },
  },

  // 3. GENERAL SERVICES OVERVIEW (GROUPED RESPONSE, NO PUBLIC SERVICE COUNT)
  {
    id: "services_overview",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "what do you do", "what services do you provide", "what can you help with",
      "how can arav help me", "what do you guys actually do", "what does arav do",
      "whats your expertise", "what problems can you solve", "what solutions do you provide",
      "core competencies", "capabilities", "what do you offer", "who is arav", "about arav",
      "tell me about arav", "services list", "show all services", "list services"
    ],
    response: {
      en: "Arav Innovations turns technology and digital challenges into clear business outcomes across four primary capability pillars:\n\n• **Technology & Engineering**: IT Strategy, Legacy Modernization, Web & SaaS Apps\n• **Digital Growth**: B2B Marketing, Brand Positioning, SEO & AEO\n• **Governance & Assurance**: Risk & DPDP Compliance, System Audits & FinOps\n• **People & Capability**: Technical Staff Augmentation & Team Upskilling\n\nWhich area aligns closest with your immediate focus?",
      hi: "आरव इनोवेशन तकनीक और डिजिटल चुनौतियों को चार मुख्य स्तंभों में हल करता है:\n\n• **तकनीक एवं इंजीनियरिंग**: आईटी रणनीति, वेब और सॉफ्टवेयर विकास\n• **डिजिटल ग्रोथ**: B2B मार्केटिंग, एसईओ एवं एईओ\n• **गवर्नेंस एवं सुरक्षा**: जोखिम, DPDP अनुपालन और सिस्टम ऑडिट\n• **कपेबिलिटी एवं टैलेंट**: डेवलपर टीम विस्तार और प्रशिक्षण\n\nआप अभी किस क्षेत्र के बारे में जानना चाहते हैं?",
      de: "Arav Innovations unterstützt Unternehmen in vier primären Leistungsbereichen:\n\n• **Technologie & Engineering**: IT-Strategie, Web- & SaaS-Entwicklung\n• **Digitales Wachstum**: B2B Marketing, SEO & AEO\n• **Governance & Assurance**: Risiko- & Compliance-Audit, FinOps\n• **Talente & Kompetenz**: Staff Augmentation & Training\n\nWelcher Bereich interessiert Sie besonders?",
      ar: "تقدم آراف إينوفيشينز حلولاً عبر 4 مجالات رئيسية:\n\n• **التقنية والهندسة**: استراتيجية IT وتطوير التطبيقات\n• **النمو الرقمي**: التسويق الرقمي و SEO\n• **الحوكمة والأمان**: الامتثال وتدقيق الأنظمة\n• **الكفاءات والتطوير**: دعم الفرق وتطوير المهندسين\n\nما المجال الذي تود استكشافه؟",
    },
    options: {
      en: [
        { label: "Technology & Engineering", action: "intent_trigger", payload: "branch_build_new" },
        { label: "Digital Growth & SEO", action: "intent_trigger", payload: "branch_growth_seo" },
        { label: "Governance & Compliance", action: "intent_trigger", payload: "branch_ai_compliance" },
        { label: "Staff & Developers", action: "intent_trigger", payload: "staff_augmentation" },
      ],
      hi: [
        { label: "तकनीक एवं इंजीनियरिंग", action: "intent_trigger", payload: "branch_build_new" },
        { label: "डिजिटल ग्रोथ एवं एसईओ", action: "intent_trigger", payload: "branch_growth_seo" },
        { label: "गवर्नेंस एवं अनुपालन", action: "intent_trigger", payload: "branch_ai_compliance" },
        { label: "डेवलपर्स टीम विस्तार", action: "intent_trigger", payload: "staff_augmentation" },
      ],
      de: [
        { label: "Technologie & Engineering", action: "intent_trigger", payload: "branch_build_new" },
        { label: "Digitales Wachstum & SEO", action: "intent_trigger", payload: "branch_growth_seo" },
        { label: "Governance & Compliance", action: "intent_trigger", payload: "branch_ai_compliance" },
        { label: "Entwickler-Teams", action: "intent_trigger", payload: "staff_augmentation" },
      ],
      ar: [
        { label: "التقنية والهندسة", action: "intent_trigger", payload: "branch_build_new" },
        { label: "النمو الرقمي و SEO", action: "intent_trigger", payload: "branch_growth_seo" },
      ],
    },
  },

  // 4. INDIVIDUAL SERVICE EXPLANATIONS ("TELL ME ABOUT X")
  // IT STRATEGY
  {
    id: "it_strategy",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "it-strategy-implementation",
    keywords: [
      "it strategy", "it strategy & implementation", "technology strategy", "it roadmap", "technology roadmap",
      "modernize it", "legacy modernization", "cloud strategy", "technology transformation",
      "infrastructure modernization", "digital transformation", "our it is outdated",
      "cto consulting", "outdated infrastructure", "tell me about it strategy"
    ],
    response: {
      en: "Our **IT Strategy & Implementation** practice helps organizations modernize legacy systems, optimize cloud spend (FinOps), and establish executable digital roadmaps.\n\nAre you currently looking to modernize existing infrastructure or migrate to the cloud?",
      hi: "हमारी **IT Strategy & Implementation** सेवा पुरानी प्रणालियों को आधुनिक बनाने, क्लाउड खर्च को अनुकूलित करने और आईटी रोडमैप तैयार करने में मदद करती है।\n\nक्या आप अभी इंफ्रास्ट्रक्चर को आधुनिक बनाना चाहते हैं?",
      de: "Unser **IT-Strategie** Bereich hilft Unternehmen, Altsysteme zu modernisieren und Cloud-Kosten zu optimieren.\n\nMöchten Sie Ihre bestehende Infrastruktur modernisieren?",
      ar: "تساعد خدمة **استراتيجية IT وتطبيقها** الشركات على تحديث الأنظمة القديمة وتحسين تكاليف السحابة.",
    },
    options: {
      en: [
        { label: "Modernize legacy systems", action: "show_service_link", route: "/services/it-strategy-implementation" },
        { label: "Talk to IT Specialist", action: "progressive_lead", payload: "IT Strategy Consultation" },
      ],
      hi: [
        { label: "पुरानी प्रणाली आधुनिक बनाएं", action: "show_service_link", route: "/services/it-strategy-implementation" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "IT Strategy Consultation" },
      ],
      de: [
        { label: "Altsysteme modernisieren", action: "show_service_link", route: "/services/it-strategy-implementation" },
        { label: "Mit IT-Spezialisten sprechen", action: "progressive_lead", payload: "IT Strategy Consultation" },
      ],
      ar: [
        { label: "عرض تفاصيل الخدمة", action: "show_service_link", route: "/services/it-strategy-implementation" },
      ],
    },
  },

  // AI SOLUTIONS
  {
    id: "ai_automation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "ai-portfolio",
    keywords: [
      "ai", "artificial intelligence", "ai automation", "workflow automation", "ai agents",
      "ai implementation", "ai integration", "business ai", "ai solutions", "tell me about ai",
      "llm", "rag", "chatbots", "automate process"
    ],
    response: {
      en: "Our **AI Portfolio** practice turns practical AI opportunities into working enterprise tools — from internal workflow automation to RAG knowledge search and custom AI assistants.\n\nWhat process or problem are you looking to automate with AI?",
      hi: "हमारी **AI Portfolio** सेवा व्यावहारिक एआई को कार्यशील व्यावसायिक टूल्स में बदलती है — जैसे वर्कफ़्लो ऑटोमेशन और कस्टम एआई असिस्टेंट।\n\nआप एआई के साथ किस प्रक्रिया को ऑटोमेट करना चाहते हैं?",
      de: "Unser **KI-Portfolio** Bereich verwandelt KI-Chancen in funktionierende Unternehmens-Tools.\n\nWelchen Prozess möchten Sie mit KI automatisieren?",
      ar: "يحول قسم **حلول الذكاء الاصطناعي** لدينا الفرص الرقمية إلى أدوات عمل مؤسسية فعالة.",
    },
    options: {
      en: [
        { label: "Explore AI Solutions", action: "show_service_link", route: "/services/ai-portfolio" },
        { label: "Schedule AI Feasibility Call", action: "progressive_lead", payload: "AI Automation Project" },
      ],
      hi: [
        { label: "एआई समाधान देखें", action: "show_service_link", route: "/services/ai-portfolio" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "AI Automation Project" },
      ],
      de: [
        { label: "KI-Lösungen anzeigen", action: "show_service_link", route: "/services/ai-portfolio" },
        { label: "KI-Gespräch buchen", action: "progressive_lead", payload: "AI Automation Project" },
      ],
      ar: [
        { label: "عرض تفاصيل الذكاء الاصطناعي", action: "show_service_link", route: "/services/ai-portfolio" },
      ],
    },
  },

  // COMPLIANCE & GOVERNANCE
  {
    id: "risk_compliance",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "risk-compliance-governance",
    keywords: [
      "compliance", "risk", "privacy", "security governance", "regulations", "controls",
      "dpdp", "gdpr", "soc2", "iso 27001", "complaince", "need help with compliance", "governance",
      "tell me about compliance"
    ],
    response: {
      en: "Our **Risk, Compliance & Governance** practice establishes defensible frameworks for India's DPDP Act, SOC-2 readiness, ISO 27001, and corporate security policies.\n\nAre you looking to prepare for an upcoming audit or set up a baseline DPDP framework?",
      hi: "हमारी **Risk & Compliance** सेवा DPDP अधिनियम, SOC-2, ISO 27001 और कॉर्पोरेट सुरक्षा नीतियों के लिए अनुपालन ढांचे तैयार करती है।\n\nक्या आप ऑडिट की तैयारी कर रहे हैं या DPDP ढांचा स्थापित करना चाहते हैं?",
      de: "Unser **Risk & Compliance** Bereich unterstützt bei DPDP Act, SOC-2, ISO 27001 und Sicherheitsrichtlinien.\n\nBereiten Sie sich auf ein Audit vor?",
      ar: "تقدم خدمة **الحوكمة والمخاطر والامتثال** أطراً متكاملة لقوانين DPDP و SOC-2 و ISO 27001.",
    },
    options: {
      en: [
        { label: "Explore Risk & Compliance", action: "show_service_link", route: "/services/risk-compliance-governance" },
        { label: "Talk to Compliance Expert", action: "progressive_lead", payload: "Compliance Advisory" },
      ],
      hi: [
        { label: "अनुपालन सेवाएं देखें", action: "show_service_link", route: "/services/risk-compliance-governance" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "Compliance Advisory" },
      ],
      de: [
        { label: "Compliance anzeigen", action: "show_service_link", route: "/services/risk-compliance-governance" },
        { label: "Mit Experten sprechen", action: "progressive_lead", payload: "Compliance Advisory" },
      ],
      ar: [
        { label: "عرض تفاصيل الخدمة", action: "show_service_link", route: "/services/risk-compliance-governance" },
      ],
    },
  },

  // STAFF AUGMENTATION / DEVELOPERS
  {
    id: "staff_augmentation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "training-staff-augmentation",
    keywords: [
      "need developers", "developers", "technical resource", "hire developers",
      "staff augmentation", "upskill team", "training", "technical talent", "additional engineers",
      "need technical people", "tell me about staff augmentation"
    ],
    response: {
      en: "Our **Training & Staff Augmentation** practice embeds senior engineers and dedicated developer pods directly into your sprint cycles.\n\nWhat technology stack or engineering roles are you looking to add?",
      hi: "हमारी **Training & Staff Augmentation** सेवा आपके प्रोजेक्ट के लिए अनुभवी डेवलपर्स प्रदान करती है।\n\nआप अपनी टीम में किस प्रकार के डेवलपर्स जोड़ना चाहते हैं?",
      de: "Unser **Staff Augmentation** Bereich stellt Ihnen erfahrene Entwickler-Teams für Ihre Projekte zur Verfügung.\n\nWelche Entwicklerrollen suchen Sie?",
      ar: "تزود خدمة **دعم الكفاءات والتدريب** فريقك بمهندسين متخصصين حسب الطلب.",
    },
    options: {
      en: [
        { label: "Explore Staff Augmentation", action: "show_service_link", route: "/services/training-staff-augmentation" },
        { label: "Request Developer Pods", action: "progressive_lead", payload: "Staff Augmentation Request" },
      ],
      hi: [
        { label: "टीम विस्तार विवरण देखें", action: "show_service_link", route: "/services/training-staff-augmentation" },
        { label: "डेवलपर्स का अनुरोध करें", action: "progressive_lead", payload: "Staff Augmentation Request" },
      ],
      de: [
        { label: "Staff Augmentation anzeigen", action: "show_service_link", route: "/services/training-staff-augmentation" },
        { label: "Entwickler anfordern", action: "progressive_lead", payload: "Staff Augmentation Request" },
      ],
      ar: [
        { label: "عرض تفاصيل الخدمة", action: "show_service_link", route: "/services/training-staff-augmentation" },
      ],
    },
  },

  // 5. PRODUCT DISCOVERY (AstroBeams AI, AstroBeams, OMNiGRC)
  {
    id: "products_overview",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "products", "platforms", "software products", "what products do you have",
      "astrobeams", "astrobeams ai", "omnigrc", "product catalog"
    ],
    response: {
      en: "Arav Innovations powers specialized proprietary platforms including AstroBeams AI (24/7 AI spiritual & astrology guidance), AstroBeams (live astrologer consultations), and OMNiGRC (enterprise risk & compliance SaaS).\n\nWhich product would you like to explore?",
      hi: "आरव इनोवेशन विशेष प्लेटफॉर्म विकसित करता है जैसे एस्ट्रोबीम्स एआई, एस्ट्रोबीम्स (लाइव ज्योतिष परामर्श), और ओएमएनआईजीआरसी।\n\nआप किस उत्पाद के बारे में जानना चाहते हैं?",
      de: "Arav Innovations betreibt eigene spezialisierte Plattformen wie AstroBeams AI, AstroBeams und OMNiGRC.\n\nWelches Produkt möchten Sie erkunden?",
      ar: "تطور آراف إينوفيشينز منصات مثل AstroBeams AI و AstroBeams و OMNiGRC.\n\nما المنتج الذي تود معرفته؟",
    },
    options: {
      en: [
        { label: "AstroBeams AI (astrobeams.in)", action: "intent_trigger", payload: "astrobeams_ai_info" },
        { label: "AstroBeams (astrobeams.store)", action: "intent_trigger", payload: "astrobeams_store_info" },
        { label: "OMNiGRC Compliance SaaS", action: "intent_trigger", payload: "omnigrc_info" },
      ],
      hi: [
        { label: "एस्ट्रोबीम्स एआई", action: "intent_trigger", payload: "astrobeams_ai_info" },
        { label: "एस्ट्रोबीम्स स्टोर", action: "intent_trigger", payload: "astrobeams_store_info" },
        { label: "OMNiGRC प्लेटफॉर्म", action: "intent_trigger", payload: "omnigrc_info" },
      ],
      de: [
        { label: "AstroBeams AI", action: "intent_trigger", payload: "astrobeams_ai_info" },
        { label: "AstroBeams Store", action: "intent_trigger", payload: "astrobeams_store_info" },
        { label: "OMNiGRC Plattform", action: "intent_trigger", payload: "omnigrc_info" },
      ],
      ar: [
        { label: "AstroBeams AI", action: "intent_trigger", payload: "astrobeams_ai_info" },
        { label: "منصة OMNiGRC", action: "intent_trigger", payload: "omnigrc_info" },
      ],
    },
  },

  {
    id: "astrobeams_ai_info",
    intentLevel: "INFORMATIONAL",
    associatedProductSlug: "astrobeams-ai",
    keywords: ["astrobeams ai", "astrobeams.in", "astrobeams_ai_info"],
    response: {
      en: "AstroBeams AI (astrobeams.in) is an AI-powered astrology and spiritual guidance platform offering 24/7 personalized cosmic guidance, horoscope analysis, and instant PDF life reports.",
      hi: "एस्ट्रोबीम्स एआई (astrobeams.in) एक एआई-संचालित प्लेटफ़ॉर्म है जो 24/7 वैयक्तिकृत ज्योतिषीय मार्गदर्शन और जीवन रिपोर्ट प्रदान करता है।",
      de: "AstroBeams AI (astrobeams.in) ist eine KI-gestützte Astrologie-Plattform für 24/7 Analysen und Berichte.",
      ar: "منصة AstroBeams AI توفر استشارات فلكية فورية 24/7 بواسطة الذكاء الاصطناعي.",
    },
    options: {
      en: [
        { label: "Explore AstroBeams AI Page", action: "show_service_link", route: "/products/astrobeams-ai" },
        { label: "Visit astrobeams.in ↗", action: "navigate", route: "https://astrobeams.in" },
      ],
      hi: [
        { label: "उत्पाद विवरण देखें", action: "show_service_link", route: "/products/astrobeams-ai" },
      ],
      de: [
        { label: "Produktseite anzeigen", action: "show_service_link", route: "/products/astrobeams-ai" },
      ],
      ar: [
        { label: "عرض تفاصيل المنتج", action: "show_service_link", route: "/products/astrobeams-ai" },
      ],
    },
  },

  {
    id: "astrobeams_store_info",
    intentLevel: "INFORMATIONAL",
    associatedProductSlug: "astrobeams",
    keywords: ["astrobeams", "astrobeams.store", "astrobeams_store_info"],
    response: {
      en: "AstroBeams (astrobeams.store) connects users with verified, expert astrologers for live 24/7 chat and voice consultations for career, relationships, and birth chart remedies.",
      hi: "एस्ट्रोबीम्स (astrobeams.store) उपयोगकर्ताओं को 24/7 लाइव चैट और कॉल पर प्रमाणित ज्योतिषियों से जोड़ता है।",
      de: "AstroBeams (astrobeams.store) verbindet Nutzer 24/7 per Live-Chat und Anruf mit zertifizierten Experten.",
      ar: "منصة AstroBeams تربط المستخدمين بمتخصصين معتمدين للاستشارات المباشرة.",
    },
    options: {
      en: [
        { label: "Explore AstroBeams Store Page", action: "show_service_link", route: "/products/astrobeams" },
        { label: "Visit astrobeams.store ↗", action: "navigate", route: "https://astrobeams.store" },
      ],
      hi: [
        { label: "उत्पाद विवरण देखें", action: "show_service_link", route: "/products/astrobeams" },
      ],
      de: [
        { label: "Produktseite anzeigen", action: "show_service_link", route: "/products/astrobeams" },
      ],
      ar: [
        { label: "عرض تفاصيل المنتج", action: "show_service_link", route: "/products/astrobeams" },
      ],
    },
  },

  {
    id: "omnigrc_info",
    intentLevel: "INFORMATIONAL",
    associatedProductSlug: "omnigrc",
    keywords: ["omnigrc", "omnigrc.vercel.app", "omnigrc_info"],
    response: {
      en: "OMNiGRC is an enterprise SaaS platform designed to automate governance, risk, and compliance tracking across DPDP, SOC-2, ISO 27001, and GDPR.",
      hi: "OMNiGRC एक एंटरप्राइज SaaS समाधान है जो DPDP, SOC-2 और ISO 27001 के तहत अनुपालन ट्रैकिंग को ऑटोमेट करता है।",
      de: "OMNiGRC ist eine SaaS-Lösung zur Automatisierung von Compliance für DPDP, SOC-2 und ISO 27001.",
      ar: "OMNiGRC هي منصة SaaS لإدارة الحوكمة والامتثال لقوانين DPDP و SOC-2.",
    },
    options: {
      en: [
        { label: "Explore OMNiGRC Details", action: "show_service_link", route: "/products/omnigrc" },
        { label: "Join Beta Waitlist", action: "progressive_lead", payload: "OMNiGRC Beta Access" },
      ],
      hi: [
        { label: "OMNiGRC विवरण देखें", action: "show_service_link", route: "/products/omnigrc" },
        { label: "बीटा सूची में शामिल हों", action: "progressive_lead", payload: "OMNiGRC Beta Access" },
      ],
      de: [
        { label: "OMNiGRC-Details anzeigen", action: "show_service_link", route: "/products/omnigrc" },
        { label: "Zur Beta-Warteliste anmelden", action: "progressive_lead", payload: "OMNiGRC Beta Access" },
      ],
      ar: [
        { label: "تفاصيل OMNiGRC", action: "show_service_link", route: "/products/omnigrc" },
      ],
    },
  },

  // 6. CONTACT & CONSULTATION INTENT
  {
    id: "contact_sales",
    intentLevel: "STRONG_BUYING",
    keywords: [
      "talk to someone", "speak with your team", "speak with team", "consultation", "quote",
      "contact", "talk to sales", "book a call", "schedule consultation", "how do i contact you",
      "call", "phone", "email", "reach out", "start a project", "talk to consultant", "connect with specialist"
    ],
    response: {
      en: "I'd be happy to connect you with an Arav technical specialist. 🤝\n\nTo help us pair you with the right consultant, what should I call you?",
      hi: "मुझे आपको आरव तकनीकी विशेषज्ञ से जोड़कर खुशी होगी। 🤝\n\nशुरू करने से पहले, आपका नाम क्या है?",
      de: "Ich verbinde Sie gerne mit einem Arav-Spezialisten. 🤝\n\nWie darf ich Sie nennen?",
      ar: "يسعدني توصيلك بمختص فني من آراف. 🤝\n\nما اسمك؟",
    },
    triggerLeadForm: true,
  },

  // 7. PRICING & COST INTENT
  {
    id: "pricing_cost",
    intentLevel: "MODERATE_BUYING",
    keywords: [
      "cost", "price", "pricing", "rates", "how much", "how much does it cost", "what's your pricing",
      "how much do you charge", "budget", "quote", "preise", "kosten", "kitna kharcha hoga"
    ],
    response: {
      en: "Project pricing depends on scope, technical complexity, and delivery timeline requirements. 💡\n\nWe provide tailored proposals with clear deliverables after an initial scoping call.\n\nWould you like to speak with a specialist to get an accurate estimate?",
      hi: "परियोजना का निवेश कार्यक्षेत्र, तकनीकी जटिलता और समय सीमा पर निर्भर करता है। 💡\n\nहम स्पष्ट प्रस्ताव प्रदान करते हैं। क्या आप अनुमान के लिए विशेषज्ञ से बात करना चाहेंगे?",
      de: "Die Projektkosten hängen vom Umfang und der Komplexität ab. 💡\n\nMöchten Sie mit einem Spezialisten sprechen, um ein genaues Angebot zu erhalten?",
      ar: "تعتمد التكلفة على نطاق المشروع والتفاصيل الفنية. 💡\n\nهل ترغب في التحدث مع خبير للحصول على تقدير دقيق؟",
    },
    options: {
      en: [
        { label: "Talk to an Arav Specialist", action: "progressive_lead", payload: "Pricing & Scope Estimate" },
        { label: "Explore Practices first", action: "intent_trigger", payload: "services_overview" },
      ],
      hi: [
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "Pricing & Scope Estimate" },
      ],
      de: [
        { label: "Mit Spezialisten sprechen", action: "progressive_lead", payload: "Pricing & Scope Estimate" },
      ],
      ar: [
        { label: "التحدث مع مختص", action: "progressive_lead", payload: "Pricing & Scope Estimate" },
      ],
    },
  },
];

// Fuse.js Index for Fuzzy Keyword Match
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

// MAIN INTENT ENGINE
export function findIntent(
  query: string,
  locale = "en",
  sessionContext?: Partial<ChatSessionContext>
): {
  intent: ChatbotIntent;
  responseText: string;
  isLeadForm: boolean;
  detectedService?: string;
  detectedProduct?: string;
} | null {
  const normQ = normalizeQuery(query);
  if (!normQ) return null;

  const langKey = (locale === "hi" ? "hi" : locale === "de" ? "de" : locale === "ar" ? "ar" : "en") as "en" | "hi" | "de" | "ar";

  // 1. Direct Overlap Search: Pick intent matching longest keyword
  let bestMatch: { intent: ChatbotIntent; kwLength: number } | null = null;

  for (const intent of chatbotIntents) {
    for (const kw of intent.keywords) {
      const cleanKw = normalizeQuery(kw);
      if (!cleanKw) continue;

      let matched = false;
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

    if (sessionContext?.userName && !text.includes("👋") && Math.random() < 0.3) {
      const prefix = locale === "hi"
        ? `${sessionContext.userName}, `
        : locale === "de"
        ? `Gut, ${sessionContext.userName}. `
        : `Got it, ${sessionContext.userName}. `;
      text = `${prefix}${text}`;
    }

    return {
      intent,
      responseText: text,
      isLeadForm: intent.triggerLeadForm || intent.intentLevel === "STRONG_BUYING",
      detectedService: intent.associatedServiceSlug,
      detectedProduct: intent.associatedProductSlug,
    };
  }

  // 2. Fuzzy Match Fallback via Fuse.js
  const fuseResults = fuse.search(normQ);
  if (fuseResults.length > 0) {
    const matchedId = fuseResults[0].item.id;
    const intent = chatbotIntents.find((i) => i.id === matchedId);
    if (intent) {
      const text = intent.response[langKey] || intent.response.en;
      return {
        intent,
        responseText: text,
        isLeadForm: intent.triggerLeadForm || intent.intentLevel === "STRONG_BUYING",
        detectedService: intent.associatedServiceSlug,
        detectedProduct: intent.associatedProductSlug,
      };
    }
  }

  return null;
}
