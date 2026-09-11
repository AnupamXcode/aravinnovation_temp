import Fuse from "fuse.js";
import { getServiceBySlug } from "@/data/services";

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

// CONVERSATIONAL INTENTS CATALOGUE
export const chatbotIntents: ChatbotIntent[] = [
  // 1. GREETINGS
  {
    id: "greeting_hi",
    intentLevel: "INFORMATIONAL",
    keywords: ["hi", "hii", "hiii", "hi bot", "hi arav"],
    response: {
      en: "Hi! How can I help you today?",
      hi: "नमस्ते! आज मैं आपकी क्या मदद कर सकता हूँ?",
      ar: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
    },
    options: {
      en: [
        { label: "Explore Services", action: "all_services" },
        { label: "Build / Improve a Website", action: "navigate", route: "/services/web-app-development" },
        { label: "Modernize IT", action: "navigate", route: "/services/it-strategy-implementation" },
        { label: "Grow Online", action: "navigate", route: "/services/digital-marketing-brand-development" },
        { label: "Explore AI", action: "navigate", route: "/services/ai-portfolio" },
        { label: "Talk to Our Team", action: "navigate", route: "/contact" },
      ],
      hi: [
        { label: "सेवाएं देखें", action: "all_services" },
        { label: "वेबसाइट बनाएं", action: "navigate", route: "/services/web-app-development" },
        { label: "आईटी आधुनिक बनाएं", action: "navigate", route: "/services/it-strategy-implementation" },
        { label: "टीम से बात करें", action: "navigate", route: "/contact" },
      ],
      ar: [
        { label: "استكشف الخدمات", action: "all_services" },
        { label: "تطوير موقع", action: "navigate", route: "/services/web-app-development" },
        { label: "التواصل معنا", action: "navigate", route: "/contact" },
      ],
    },
  },
  {
    id: "greeting_hello",
    intentLevel: "INFORMATIONAL",
    keywords: ["hello", "hello arav", "hello bot", "namaste", "marhaba", "नमस्ते"],
    response: {
      en: "Hello! What are you looking to improve or build?",
      hi: "नमस्ते! आप क्या बनाना या बेहतर करना चाहते हैं?",
      ar: "أهلاً بك! ما الذي تتطلع لتطويره أو بنائه؟",
    },
    options: {
      en: [
        { label: "Explore Core Services", action: "all_services" },
        { label: "Start a Conversation", action: "start_project" },
      ],
      hi: [
        { label: "मुख्य सेवाएं देखें", action: "all_services" },
        { label: "बातचीत शुरू करें", action: "start_project" },
      ],
      ar: [
        { label: "استكشف الخدمات", action: "all_services" },
        { label: "بدء المحادثة", action: "start_project" },
      ],
    },
  },
  {
    id: "greeting_hey",
    intentLevel: "INFORMATIONAL",
    keywords: ["hey", "hey there", "heyy", "heya"],
    response: {
      en: "Hey! Happy to help. What can I help you with?",
      hi: "हे! मदद करके खुशी होगी। मैं आपकी क्या मदद कर सकता हूँ?",
      ar: "مرحباً! يسعدني مساعدتك. كيف يمكنني إفادتك؟",
    },
  },
  {
    id: "greeting_morning",
    intentLevel: "INFORMATIONAL",
    keywords: ["good morning", "good afternoon", "good evening"],
    response: {
      en: "Good morning! What can I help you explore today?",
      hi: "शुभ प्रभात! आज आप क्या एक्सप्लोर करना चाहते हैं?",
      ar: "صباح الخير! ما الذي ترغب في استكشافه اليوم؟",
    },
  },
  {
    id: "greeting_how_are_you",
    intentLevel: "INFORMATIONAL",
    keywords: ["how are you", "how r u", "kya haal hai", "kaisa hai", "how do you do", "what's up"],
    response: {
      en: "I'm doing well, thanks! How can I help with your business or technology needs?",
      hi: "मैं बढ़िया हूँ, धन्यवाद! आज आपकी व्यावसायिक या तकनीकी आवश्यकताओं में कैसे मदद कर सकता हूँ?",
      ar: "أنا بخير، شكراً لك! كيف يمكنني مساعدتك في متطلبات عملك या تقنيتك؟",
    },
  },

  // 2. GENERAL OVERVIEW & "WHAT DO YOU DO?"
  {
    id: "services_overview",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "what do you do", "what services do you provide", "what can you help with",
      "how can arav help me", "what do you guys actually do", "what does arav do",
      "whats your expertise", "what problems can you solve", "what solutions do you provide",
      "core competencies", "capabilities", "what do you offer", "who is arav", "about arav"
    ],
    response: {
      en: "Arav Innovations is an enterprise technology transformation and digital growth firm with strategic delivery hubs in India and the UAE.\n\nWe integrate IT strategy, custom software engineering, AI workflow automation, performance marketing, and enterprise risk & compliance into a unified operational ecosystem designed to drive measurable business outcomes.\n\nWhich area would you like to explore?",
      hi: "आरव इनोवेशन भारत और संयुक्त अरब अमीरात में सक्रिय एक एंटरप्राइज टेक्नोलॉजी ट्रांसफॉर्मेशन और डिजिटल ग्रोथ फर्म है।\n\nहम आईटी रणनीति, कस्टम सॉफ्टवेयर इंजीनियरिंग, एआई ऑटोमेशन, परफॉर्मेंस मार्केटिंग और एंटरप्राइज रिस्क एवं गवर्नेंस को एकीकृत करते हैं।\n\nआप किस क्षेत्र के बारे में जानना चाहते हैं?",
      ar: "آراف إينوفيشينز هي شركة رائدة في التحول التقني للمؤسسات والنمو الرقمي عبر مراكزنا في الهند والإمارات.\n\nنجمع بين استراتيجية تكنولوجيا المعلومات، هندسة البرمجيات، أتمتة الذكاء الاصطناعي، والتسويق الرقمي.\n\nأي مجال ترغب في استكشافه؟",
    },
    options: {
      en: [
        { label: "IT Strategy", action: "navigate", route: "/services/it-strategy-implementation" },
        { label: "AI & Automation", action: "navigate", route: "/services/ai-portfolio" },
        { label: "Web & App Development", action: "navigate", route: "/services/web-app-development" },
        { label: "Digital Marketing & AEO", action: "navigate", route: "/services/digital-marketing-brand-development" },
        { label: "Risk & Governance", action: "navigate", route: "/services/risk-compliance-governance" },
        { label: "Audit & FinOps", action: "navigate", route: "/services/audit-improvement" },
        { label: "Staff Augmentation", action: "navigate", route: "/services/training-staff-augmentation" },
        { label: "SEO Services", action: "navigate", route: "/services/seo-services" },
      ],
      hi: [
        { label: "आईटी रणनीति", action: "navigate", route: "/services/it-strategy-implementation" },
        { label: "एआई ऑटोमेशन", action: "navigate", route: "/services/ai-portfolio" },
        { label: "वेब एवं ऐप", action: "navigate", route: "/services/web-app-development" },
        { label: "सभी सेवाएं देखें", action: "navigate", route: "/services" },
      ],
      ar: [
        { label: "استراتيجية التقنية", action: "navigate", route: "/services/it-strategy-implementation" },
        { label: "تطوير الويب", action: "navigate", route: "/services/web-app-development" },
        { label: "حلول AI", action: "navigate", route: "/services/ai-portfolio" },
        { label: "جميع الخدمات", action: "navigate", route: "/services" },
      ],
    },
  },

  // 3. ALL CORE SERVICES EXPLICIT LIST
  {
    id: "all_services_list",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "tell me all your services", "what are your core services", "what services do you offer",
      "tell me everything about all your services", "list your services", "all services",
      "show all services", "service catalog", "full service list", "core services list", "explain all services"
    ],
    response: {
      en: "Our core enterprise capabilities include:\n\n• IT Strategy & Implementation\n• AI & Workflow Automation\n• Web & Custom Application Development\n• Digital Marketing, SEO & AEO\n• Risk, Governance & Systems Audits\n• Audit & Performance Improvement\n• Staff Augmentation & Training\n• SEO & Answer Engine Optimization\n\nWhich practice can we assist you with?",
      hi: "हमारी प्रमुख एंटरप्राइज क्षमताएं:\n\n• आईटी रणनीति एवं कार्यान्वयन\n• एआई एवं वर्कफ़्लो ऑटोमेशन\n• वेब एवं कस्टम एप्लिकेशन विकास\n• डिजिटल मार्केटिंग, एसईओ एवं AEO\n• जोखिम, गवर्नेंस एवं सिस्टम ऑडिट\n• ऑडिट एवं परफॉर्मेंस सुधार\n• टीम विस्तार एवं प्रशिक्षण\n\nआप किसके बारे में चर्चा करना चाहते हैं?",
      ar: "تشمل قدراتنا المؤسسية الرئيسية:\n\n• استراتيجية تكنولوجيا المعلومات والتنفيذ\n• الذكاء الاصطناعي وأتمتة العمليات\n• تطوير تطبيقات الويب والمواقع المخصصة\n• التسويق الرقمي والظهور في محركات الذكاء الاصطناعي (AEO)\n• الحوكمة والمخاطر والتدقيق\n• دعم الكفاءات وتوسيع الفرق",
    },
    options: {
      en: [
        { label: "IT Strategy", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "AI & Automation", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "Web & App Dev", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "Digital Marketing & AEO", action: "navigate", route: "/services/digital-marketing-brand-development", ctaType: "page" },
        { label: "Risk & Governance", action: "navigate", route: "/services/risk-compliance-governance", ctaType: "page" },
        { label: "Staff Augmentation", action: "navigate", route: "/services/training-staff-augmentation", ctaType: "page" },
      ],
      hi: [
        { label: "वेब एवं ऐप विकास", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "एआई पोर्टफोलियो", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "सभी सेवाएं देखें", action: "navigate", route: "/services", ctaType: "page" },
      ],
      ar: [
        { label: "تطوير الويب", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "جميع الخدمات", action: "navigate", route: "/services", ctaType: "page" },
      ],
    },
  },

  // 4. "HOW CAN YOU HELP ME?" OUTCOME INTENT
  {
    id: "how_can_you_help_me",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "how can you help me", "how can arav help my business", "what can you do for my company",
      "how can you help our business", "how can you help my company"
    ],
    response: {
      en: "We align technology deliverables with tangible business outcomes—focusing on conversion performance, system efficiency, security compliance, and ROI across India and the UAE.\n\nTell me about your current priority, and I will recommend the right engagement roadmap.",
      hi: "हम तकनीक को स्पष्ट व्यावसायिक परिणामों से जोड़ते हैं—कन्वर्जन परफॉर्मेंस, सिस्टम दक्षता, सुरक्षा अनुपालन और आरओआई पर ध्यान केंद्रित करते हुए।\n\nअपनी वर्तमान प्राथमिकता बताएं, मैं सही रोडमैप सुझाऊंगा।",
      ar: "نربط مخرجات التكنولوجيا بنتائج الأعمال الملموسة—مع التركيز على الأداء، الكفاءة، الامتثال الأمني وعائد الاستثمار.",
    },
  },

  // 4.1. ANSWER ENGINE OPTIMIZATION (AEO) DEDICATED INTENT
  {
    id: "aeo_explanation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "seo-services",
    keywords: [
      "what is aeo", "aeo", "answer engine optimization", "chatgpt seo", "ai search ranking",
      "how to rank on chatgpt", "google sge", "perplexity ranking", "generative ai search"
    ],
    response: {
      en: "Answer Engine Optimization (AEO) optimizes your web presence so that conversational AI engines—such as ChatGPT, Claude, Gemini, and Google SGE—can easily extract and cite your company as the direct answer to user queries.\n\nWhile traditional SEO targets blue link rankings, AEO focuses on positioning your brand as the direct AI answer.",
      hi: "आंसर इंजन ऑप्टिमाइजेशन (AEO) आपकी डिजिटल उपस्थिति को अनुकूलित करता है ताकि संवादात्मक एआई इंजन (ChatGPT, Claude, Gemini, SGE) आपकी कंपनी को सीधे सटीक उत्तर के रूप में उद्धृत कर सकें।",
      ar: "يعمل تحسين محركات الإجابة (AEO) على تهيئة حضورك الرقمي بحيث تستطيع نماذج الذكاء الاصطناعي استخراج شركتك والاستشهاد بها كإجابة مباشرة لاستفسارات المستخدمين.",
    },
    options: {
      en: [
        { label: "Explore SEO & AEO Services →", action: "navigate", route: "/services/seo-services", ctaType: "page" },
        { label: "Discuss Growth Strategy →", action: "start_project", payload: "AEO Strategy Requirement", ctaType: "action" },
      ],
      hi: [
        { label: "एसईओ एवं AEO सेवाएं देखें →", action: "navigate", route: "/services/seo-services", ctaType: "page" },
      ],
      ar: [
        { label: "استكشف خدمات SEO و AEO →", action: "navigate", route: "/services/seo-services", ctaType: "page" },
      ],
    },
  },

  // 4.2. REGIONAL PRESENCE / INDIA & UAE INTENT
  {
    id: "regional_presence",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "which regions do you serve", "locations", "india", "uae", "dubai", "where are you located",
      "where is arav based", "office locations", "middle east operations"
    ],
    response: {
      en: "We maintain active operations in India and the UAE, serving growing mid-market businesses, enterprise organizations, SaaS companies, and digital brands across the Middle East, Asia, and global markets.",
      hi: "हम भारत और संयुक्त अरब अमीरात (UAE) में सक्रिय संचालन बनाए रखते हैं, और मध्य पूर्व, एशिया तथा वैश्विक स्तर पर उद्यमों की सेवा करते हैं।",
      ar: "ندير عمليات نشطة في الهند ودولة الإمارات العربية المتحدة، ونخدم الشركات المتنامية والمؤسسات عبر الشرق الأوسط وآسيا والأسواق العالمية.",
    },
    options: {
      en: [
        { label: "Contact Strategic Hubs →", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "Explore Services →", action: "all_services", ctaType: "page" },
      ],
      hi: [
        { label: "संपर्क करें →", action: "navigate", route: "/contact", ctaType: "page" },
      ],
      ar: [
        { label: "تواصل معنا →", action: "navigate", route: "/contact", ctaType: "page" },
      ],
    },
  },

  // 5. SEO SERVICES INTENT
  {
    id: "seo_services",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "seo-services",
    keywords: [
      "seo", "seo services", "search engine optimization", "google ranking", "search visibility",
      "organic traffic", "rank higher", "technical seo", "my website isn't ranking", "my website isn't getting traffic",
      "website traffic", "seo servic", "gugle", "gogle", "rankin", "seo?", "seo improve karni hai",
      "rank my website", "search traffic", "google ranking", "higher on google", "seo strategy"
    ],
    response: {
      en: "Yes, we can help improve search visibility through technical SEO, content and site optimization.\n\nIs the main issue low rankings or low organic traffic?",
      hi: "हाँ, हम तकनीकी एसईओ, कंटेंट और साइट ऑप्टिमाइजेशन के माध्यम से आपकी सर्च विजिबिलिटी में सुधार कर सकते हैं।\n\nक्या मुख्य समस्या कम रैंकिंग है या कम ऑर्गेनिक ट्रैफिक?",
      ar: "نعم، نساعدك في تحسين الظهور عبر محركات البحث من خلال SEO الفني وتحسين الموقع.",
    },
    options: {
      en: [
        { label: "Explore SEO Services →", action: "navigate", route: "/services/seo-services", ctaType: "page" },
        { label: "Start a Conversation →", action: "start_project", payload: "SEO Requirement", ctaType: "action" },
      ],
      hi: [
        { label: "एसईओ सेवाएं देखें →", action: "navigate", route: "/services/seo-services", ctaType: "page" },
        { label: "चर्चा शुरू करें →", action: "start_project", payload: "SEO Requirement", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف خدمات SEO →", action: "navigate", route: "/services/seo-services", ctaType: "page" },
        { label: "بدء المحادثة →", action: "start_project", payload: "SEO Requirement", ctaType: "action" },
      ],
    },
  },

  // 6. WEB & APPLICATION DEVELOPMENT INTENT
  {
    id: "web_app_dev",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "web-app-development",
    keywords: [
      "website", "web development", "website development", "web app", "application", "software",
      "platform", "portal", "enterprise application", "custom software", "build a website",
      "need a new business website", "new business website", "web devlopment", "website?",
      "mujhe website banwani hai", "mujhe apne business ke liye website banwani hai", "build web app",
      "web application", "saas portal", "mobile app", "ecommerce website", "e-commerce website", "e-commerce"
    ],
    response: {
      en: "Absolutely. We design and develop scalable web and application experiences around your business goals.",
      hi: "बिल्कुल! हम आपकी व्यावसायिक प्राथमिकताओं के अनुसार आधुनिक और स्केलेबल वेब अनुभव डिजाइन और विकसित करते हैं।\n\nक्या आपको नई वेबसाइट चाहिए या पुरानी वेबसाइट बेहतर करनी है?",
      ar: "بالتأكيد! نصمم ونطور تطبيقات وتجارب ويب سريعة وآمنة وقابلة للتوسع.",
    },
    options: {
      en: [
        { label: "Explore Web & Application Development →", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "Discuss Web Project →", action: "start_project", payload: "Web Application Project", ctaType: "action" },
      ],
      hi: [
        { label: "वेब विकास देखें →", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "प्रोजेक्ट शुरू करें →", action: "start_project", payload: "Web Application Project", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف تطوير الويب →", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
        { label: "بدء مشروع →", action: "start_project", payload: "Web Application Project", ctaType: "action" },
      ],
    },
  },

  // 7. IT STRATEGY & IMPLEMENTATION INTENT
  {
    id: "it_strategy",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "it-strategy-implementation",
    keywords: [
      "it strategy", "it strategy & implementation", "technology strategy", "it roadmap", "technology roadmap",
      "modernize it", "legacy modernization", "cloud strategy", "technology transformation",
      "infrastructure modernization", "digital transformation", "our it is outdated",
      "modernizing our old it infrastructure", "it strategy?", "it infrastructure", "cloud migration",
      "cto consulting", "outdated infrastructure", "modernize legacy infrastructure"
    ],
    response: {
      en: "Absolutely. We can help modernize legacy infrastructure through IT strategy, cloud modernization, application transformation and implementation.\n\nAre you looking to modernize infrastructure, applications, or both?",
      hi: "बिल्कुल! हम आईटी रणनीति, क्लाउड आधुनिकीकरण और एप्लिकेशन ट्रांसफॉर्मेशन के माध्यम से लेगेसी इंफ्रास्ट्रक्चर को आधुनिक बनाने में मदद करते हैं।",
      ar: "بالتأكيد! نساعدك في تحديث البنية التحتية القديمة وتصميم الاستراتيجيات السحابية والهندسة المعمارية.",
    },
    options: {
      en: [
        { label: "Explore IT Strategy & Implementation →", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "Schedule Technical Audit →", action: "start_project", payload: "IT Strategy Audit", ctaType: "action" },
      ],
      hi: [
        { label: "आईटी रणनीति देखें →", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "तकनीकी ऑडिट शेड्यूल करें →", action: "start_project", payload: "IT Strategy Audit", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف استراتيجية التقنية →", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "جدولة تدقيق فني →", action: "start_project", payload: "IT Strategy Audit", ctaType: "action" },
      ],
    },
  },

  // 8. AI PORTFOLIO & AUTOMATION INTENT
  {
    id: "ai_automation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "ai-portfolio",
    keywords: [
      "ai", "ai?", "artificial intelligence", "ai automation", "workflow automation", "ai agents",
      "ai implementation", "ai integration", "business ai", "artifical intelligence", "automtion",
      "ai solutions", "ai se automation karna hai", "automate repetitive business processes with ai",
      "llm", "rag", "chatbots", "automate process"
    ],
    response: {
      en: "Yes. We help identify practical AI and workflow-automation opportunities and turn them into working business systems.\n\nWhat process are you looking to automate?",
      hi: "हाँ! हम व्यावहारिक एआई और वर्कफ़्लो ऑटोमेशन के अवसरों की पहचान करते हैं और उन्हें कार्यशील व्यावसायिक प्रणालियों में बदलते हैं।\n\nआप किस प्रक्रिया को ऑटोमेट करना चाहते हैं?",
      ar: "نعم! نحدد فرص الذكاء الاصطناعي وأتمتة مسارات العمل ونحولها إلى أنظمة عمل مؤسسية فعالة.",
    },
    options: {
      en: [
        { label: "Explore AI Solutions →", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "Discuss AI Use Case →", action: "start_project", payload: "AI Automation Project", ctaType: "action" },
      ],
      hi: [
        { label: "एआई समाधान देखें →", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "एआई उपयोग पर चर्चा करें →", action: "start_project", payload: "AI Automation Project", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف حلول الذكاء الاصطناعي →", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        { label: "مناقشة مشروع الذكاء الاصطناعي →", action: "start_project", payload: "AI Automation Project", ctaType: "action" },
      ],
    },
  },

  // 9. RISK, COMPLIANCE & GOVERNANCE INTENT
  {
    id: "risk_compliance",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "risk-compliance-governance",
    keywords: [
      "compliance", "risk", "privacy", "security governance", "regulations", "controls",
      "dpdp", "gdpr", "soc2", "iso 27001", "complaince", "need help with compliance", "governance",
      "regulatory requirements", "compliance support"
    ],
    response: {
      en: "Absolutely. We can help strengthen governance, compliance processes, risk controls and technology practices.",
      hi: "बिल्कुल! हम डेटा अनुपालन (DPDP Act/GDPR), SOC-2 और साइबर सुरक्षा गवर्नेंस नियंत्रणों को लागू करने में मदद करते हैं।",
      ar: "بالتأكيد! نساعدك في تعزيز الحوكمة، والالتزام بقوانين حماية البيانات DPDP و SOC-2.",
    },
    options: {
      en: [
        { label: "Explore Risk, Compliance & Governance →", action: "navigate", route: "/services/risk-compliance-governance", ctaType: "page" },
        { label: "Check Compliance Readiness →", action: "start_project", payload: "Compliance Readiness", ctaType: "action" },
      ],
      hi: [
        { label: "जोखिम अनुपालन देखें →", action: "navigate", route: "/services/risk-compliance-governance", ctaType: "page" },
        { label: "अनुपालन जांचें →", action: "start_project", payload: "Compliance Readiness", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف الامتثال والحوكمة →", action: "navigate", route: "/services/risk-compliance-governance", ctaType: "page" },
        { label: "فحص الامتثال →", action: "start_project", payload: "Compliance Readiness", ctaType: "action" },
      ],
    },
  },

  // 10. AUDIT & IMPROVEMENT INTENT
  {
    id: "audit_improvement",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "audit-improvement",
    keywords: [
      "audit", "system review", "technology assessment", "process improvement", "find bottlenecks",
      "improve efficiency", "technical assessment", "finops", "cloud cost", "reduce cloud bill",
      "system audit", "audt", "performance audit"
    ],
    response: {
      en: "We evaluate operational processes, software architecture and cloud infrastructure to eliminate bottlenecks and optimize operational efficiency.",
      hi: "हम निष्पक्ष ऑडिट के माध्यम से प्रक्रियाओं, तकनीक और क्लाउड इंफ्रास्ट्रक्चर का मूल्यांकन करते हैं ताकि बाधाओं को दूर किया जा सके।",
      ar: "نقوم بتدقيق الأنظمة والبنية التحتية التقنية لإزالة الاختناقات وتحسين الكفاءة التشغيلية.",
    },
    options: {
      en: [
        { label: "Explore Audit & Improvement →", action: "navigate", route: "/services/audit-improvement", ctaType: "page" },
        { label: "Request System Audit →", action: "start_project", payload: "System Audit Request", ctaType: "action" },
      ],
      hi: [
        { label: "ऑडिट एवं सुधार देखें →", action: "navigate", route: "/services/audit-improvement", ctaType: "page" },
        { label: "सिस्टम ऑडिट का अनुरोध करें →", action: "start_project", payload: "System Audit Request", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف التدقيق والتحسين →", action: "navigate", route: "/services/audit-improvement", ctaType: "page" },
        { label: "طلب تدقيق الأنظمة →", action: "start_project", payload: "System Audit Request", ctaType: "action" },
      ],
    },
  },

  // 11. TRAINING & STAFF AUGMENTATION INTENT
  {
    id: "staff_augmentation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "training-staff-augmentation",
    keywords: [
      "need developers", "developers", "technical resource", "technical resources", "hire developers",
      "staff augmentation", "upskill team", "training", "technical talent", "additional engineers",
      "team ke liye developers chahiye", "devoloper", "devs", "technical people for a project",
      "need technical people"
    ],
    response: {
      en: "Sure. We can support teams with technical talent and staff augmentation based on project needs.",
      hi: "ज़रूर! हम आपकी परियोजनाओं की आवश्यकताओं के अनुसार अनुभवी डेवलपर्स और तकनीकी विशेषज्ञों की सहायता प्रदान कर सकते हैं।",
      ar: "بالتأكيد! نوفر مهندسين ومختصين ينضمون لفريقك حسب متطلبات 프로젝트.",
    },
    options: {
      en: [
        { label: "Explore Training & Staff Augmentation →", action: "navigate", route: "/services/training-staff-augmentation", ctaType: "page" },
        { label: "Request Talent Pod →", action: "start_project", payload: "Staff Augmentation Inquiry", ctaType: "action" },
      ],
      hi: [
        { label: "टीम विस्तार देखें →", action: "navigate", route: "/services/training-staff-augmentation", ctaType: "page" },
        { label: "डेवलपर्स का अनुरोध करें →", action: "start_project", payload: "Staff Augmentation Inquiry", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف دعم الكفاءات →", action: "navigate", route: "/services/training-staff-augmentation", ctaType: "page" },
        { label: "طلب فريق فني →", action: "start_project", payload: "Staff Augmentation Inquiry", ctaType: "action" },
      ],
    },
  },

  // 12. DIGITAL MARKETING & BRAND DEVELOPMENT INTENT
  {
    id: "digital_marketing",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "digital-marketing-brand-development",
    keywords: [
      "grow online", "online marketing", "brand growth", "lead generation", "demand generation",
      "digital presence", "marketing strategy", "customer acquisition", "business ko online grow karna hai",
      "digitial marketing", "marketing", "digital marketing", "b2b marketing", "linkedin ads", "google ads"
    ],
    response: {
      en: "We engineer high-intent B2B demand generation campaigns and brand positioning focused on pipeline and business results.",
      hi: "हम लिंक्डइन और गूगल सर्च पर परिणाम-उन्मुख B2B मार्केटिंग अभियान और ब्रांड निर्माण करते हैं।",
      ar: "نصمم حملات التسويق الرقمي واستقطاب العملاء لتوسيع الأعمال وتحقيق النتائج.",
    },
    options: {
      en: [
        { label: "Explore Digital Marketing & Brand Development →", action: "navigate", route: "/services/digital-marketing-brand-development", ctaType: "page" },
        { label: "Discuss Growth Strategy →", action: "start_project", payload: "Digital Growth Campaign", ctaType: "action" },
      ],
      hi: [
        { label: "डिजिटल मार्केटिंग देखें →", action: "navigate", route: "/services/digital-marketing-brand-development", ctaType: "page" },
        { label: "ग्रोथ रणनीति पर चर्चा करें →", action: "start_project", payload: "Digital Growth Campaign", ctaType: "action" },
      ],
      ar: [
        { label: "استكشف التسويق الرقمي →", action: "navigate", route: "/services/digital-marketing-brand-development", ctaType: "page" },
        { label: "مناقشة استراتيجية النمو →", action: "start_project", payload: "Digital Growth Campaign", ctaType: "action" },
      ],
    },
  },

  // 13. CONTACT & SALES INTENT
  {
    id: "contact_sales",
    intentLevel: "STRONG_BUYING",
    keywords: [
      "talk to someone", "speak with your team", "speak with team", "consultation", "quote",
      "contact", "talk to sales", "book a call", "schedule consultation", "how do i contact you",
      "call", "phone", "email", "reach out", "start a project", "office locations", "gurgaon", "dubai", "talk to our team"
    ],
    response: {
      en: "Absolutely. You can connect with the Arav Innovations team here:\n\nIf you'd like, tell me briefly what you're looking for and I can point you to the right service first.",
      hi: "बिल्कुल! आप यहाँ आरव इनोवेशन टीम से सीधे संपर्क कर सकते हैं:\n\nयदि आप चाहें, तो मुझे बताएं कि आप क्या ढूंढ रहे हैं और मैं आपको सही सेवा बता सकता हूँ।",
      ar: "بالتأكيد! يمكنك التواصل مع فريق آراف إينوفيشينز المباشر من هنا:",
    },
    options: {
      en: [
        { label: "Start a Conversation →", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "Explore Core Services →", action: "navigate", route: "/services", ctaType: "page" },
      ],
      hi: [
        { label: "बातचीत शुरू करें →", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "मुख्य सेवाएं देखें →", action: "navigate", route: "/services", ctaType: "page" },
      ],
      ar: [
        { label: "بدء المحادثة →", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "استكشف الخدمات →", action: "navigate", route: "/services", ctaType: "page" },
      ],
    },
    triggerLeadForm: true,
  },

  // 14. PRICING & COST INTENT
  {
    id: "pricing_cost",
    intentLevel: "MODERATE_BUYING",
    keywords: [
      "cost", "price", "pricing", "rates", "how much", "how much does it cost", "what's your pricing",
      "how much do you charge", "budget", "quote"
    ],
    response: {
      en: "Pricing depends on the scope and requirements. The best next step is to discuss your specific need with the team.",
      hi: "मूल्य निर्धारण आपकी परियोजना की आवश्यकताओं पर निर्भर करता है। सही अगला कदम हमारी टीम के साथ अपनी आवश्यकता पर चर्चा करना है।",
      ar: "تعتمد التكلفة على نطاق المشروع والمتطلبات التقنية. الخطوة التالية هي مناقشة متطلباتك مع الفريق.",
    },
    options: {
      en: [
        { label: "Start a Conversation →", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "Explore Core Services →", action: "navigate", route: "/services", ctaType: "page" },
      ],
      hi: [
        { label: "बातचीत शुरू करें →", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "मुख्य सेवाएं देखें →", action: "navigate", route: "/services", ctaType: "page" },
      ],
      ar: [
        { label: "بدء المحادثة →", action: "navigate", route: "/contact", ctaType: "page" },
        { label: "عرض الخدمات →", action: "navigate", route: "/services", ctaType: "page" },
      ],
    },
  },

  // 15. MULTI-SERVICE OR COMPLEX COMBINATION INTENTS
  {
    id: "multi_service_legacy_web",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "modernize our technology and improve our website", "modernize technology and website",
      "legacy and web", "infrastructure and website"
    ],
    response: {
      en: "Your main requirement sounds like technology modernization, with web experience as a supporting need.\n\nI'd start with IT Strategy & Implementation, and we can connect the web/application work from there.",
      hi: "आपकी मुख्य आवश्यकता तकनीक का आधुनिकीकरण प्रतीत होती है, जिसके साथ वेब अनुभव एक सहायक आवश्यकता है।\n\nमैं आईटी रणनीति से शुरुआत करने की सलाह दूंगा।",
      ar: "يبدو أن متطلبك الرئيسي هو تحديث التكنولوجيا مع تحسين الموقع كمتطلب داعم. نوصي بالبدء باستراتيجية التقنية.",
    },
    options: {
      en: [
        { label: "Explore IT Strategy & Implementation →", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "Explore Web & Application Development →", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
      ],
      hi: [
        { label: "आईटी रणनीति देखें →", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "वेब विकास देखें →", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
      ],
      ar: [
        { label: "استكشف استراتيجية التقنية →", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "استكشف تطوير الويب →", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
      ],
    },
  },

  // 16. LONG INPUT MODERNIZATION EXTRACTION
  {
    id: "long_input_modernization",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "outdated infrastructure", "disconnected applications", "slow internal processes",
      "difficulty integrating data", "growing company with an outdated infrastructure"
    ],
    response: {
      en: "It sounds like your main challenge is technology modernization and system integration.\n\nI'd recommend starting with IT Strategy & Implementation.\n\nIf you want, tell me whether infrastructure, applications, or data integration is the biggest pain point.",
      hi: "ऐसा लगता है कि आपकी मुख्य चुनौती तकनीक का आधुनिकीकरण और सिस्टम इंटीग्रेशन है। मैं आईटी रणनीति से शुरुआत करने की सलाह दूंगा।",
      ar: "يبدو أن تحديك الرئيسي هو تحديث التكنولوجيا وتكامل الأنظمة. نوصي بالبدء باستراتيجية التقنية والتنفيذ.",
    },
    options: {
      en: [
        { label: "Explore IT Strategy & Implementation →", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "Start a Conversation →", action: "navigate", route: "/contact", ctaType: "page" },
      ],
      hi: [
        { label: "आईटी रणनीति देखें →", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "बातचीत शुरू करें →", action: "navigate", route: "/contact", ctaType: "page" },
      ],
      ar: [
        { label: "استكشف استراتيجية التقنية →", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
        { label: "بدء المحادثة →", action: "navigate", route: "/contact", ctaType: "page" },
      ],
    },
  },
];

// Initialize Fuse.js instance for fuzzy pattern matching & typo resilience
const fuseKeys = chatbotIntents.map((intent) => ({
  id: intent.id,
  keywords: intent.keywords.join(" "),
}));

const fuse = new Fuse(fuseKeys, {
  keys: ["keywords"],
  threshold: 0.48,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

// MAIN INTENT LOOKUP ENGINE
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

  // 1. CONTEXT AWARENESS CHECK: If user extends previous topic (e.g., "for an e-commerce website" after SEO query)
  if (sessionContext?.lastIntentId === "seo_services" && (normQ.includes("ecommerce") || normQ.includes("e-commerce") || normQ.includes("online store"))) {
    const seoIntent = chatbotIntents.find((i) => i.id === "seo_services")!;
    return {
      intent: seoIntent,
      responseText: langKey === "hi"
        ? "समझ गया। एक ई-कॉमर्स वेबसाइट के लिए, हम तकनीकी स्वास्थ्य, सर्च विजिबिलिटी और उत्पाद खोजयोग्यता के आसपास एसईओ दृष्टिकोण पर ध्यान केंद्रित कर सकते हैं।\n\nक्या आपकी मुख्य समस्या रैंकिंग है या ऑर्गेनिक ट्रैफिक?"
        : langKey === "ar"
        ? "فهمت ذلك. بالنسبة لموقع التجارة الإلكترونية، يمكننا التركيز على الصحة الفنية وظهور المنتجات في نتائج البحث."
        : "Got it. For an e-commerce site, we can focus the SEO approach around technical health, search visibility and product/category discoverability.\n\nIs your main issue rankings or organic traffic?",
      isLeadForm: false,
      detectedService: "seo-services",
    };
  }

  // 2. Direct Keyword Match: Find intent with longest keyword overlap
  let bestMatch: { intent: ChatbotIntent; kwLength: number } | null = null;

  for (const intent of chatbotIntents) {
    for (const kw of intent.keywords) {
      const cleanKw = normalizeQuery(kw);
      if (!cleanKw) continue;

      let matched = false;

      // Word boundary enforcement for short keywords (<= 4 chars like "seo", "ai", "hi")
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
    const text = intent.response[langKey] || intent.response.en;

    return {
      intent,
      responseText: text,
      isLeadForm: intent.triggerLeadForm || intent.intentLevel === "STRONG_BUYING",
      detectedService: intent.associatedServiceSlug,
    };
  }

  // 3. Fuzzy Matching Fallback via Fuse.js for misspelled queries
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
      };
    }
  }

  // 4. Default Fallback
  return null;
}
