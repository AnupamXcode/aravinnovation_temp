import Fuse from "fuse.js";

export interface ChatbotIntentOption {
  label: string;
  action: "service_lookup" | "intent_trigger" | "all_services" | "locations" | "start_project" | "navigate" | "show_service_link" | "explore_products" | "progressive_lead";
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
  mentionedIndustry?: string;
  mentionedService?: string;
  mentionedTopic?: string;
  mentionedBudget?: string;
  lastIntentId?: string;
  leadStep?: "NAME" | "REQUIREMENT" | "COMPANY" | "INDUSTRY" | "EMAIL" | "PHONE" | "CONFIRM";
  conversationStage?: "GREETING" | "NAME_SET" | "CONVERSING" | "LEAD_CAPTURE";
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

// CONVERSATIONAL INTENTS CATALOGUE
export const chatbotIntents: ChatbotIntent[] = [
  // 1. GREETINGS & INTROS
  {
    id: "greeting_hi",
    intentLevel: "INFORMATIONAL",
    keywords: ["hi", "hii", "hiii", "hi bot", "hi arav", "hello", "hey", "namaste", "hallo", "marhaba", "नमस्ते", "greetings"],
    response: {
      en: "Hi! 👋 I'm the Arav Innovations assistant.\n\nBefore we begin, what should I call you?",
      hi: "नमस्ते! 👋 मैं आरव इनोवेशन असिस्टेंट हूँ।\n\nशुरू करने से पहले, मुझे आपको किस नाम से बुलाना चाहिए?",
      de: "Hallo! 👋 Ich bin der Arav Innovations Assistent.\n\nBevor wir beginnen, wie darf ich Sie nennen?",
      ar: "مرحباً! 👋 أنا مساعد آراف إينوفيشينز.\n\nقبل أن نبدأ، ما الذي يجب أن أناديك به؟",
    },
  },
  {
    id: "greeting_how_are_you",
    intentLevel: "INFORMATIONAL",
    keywords: ["how are you", "how r u", "kya haal hai", "kaisa hai", "wie geht es dir", "wie gehts", "how do you do", "what's up"],
    response: {
      en: "I'm doing well, thanks! How can I help with your business or technology needs today?",
      hi: "मैं बढ़िया हूँ, धन्यवाद! आज आपकी व्यावसायिक या तकनीकी आवश्यकताओं में कैसे मदद कर सकता हूँ?",
      de: "Mir geht es sehr gut, danke! Wie kann ich Ihnen heute bei Ihren geschäftlichen oder technologischen Anforderungen helfen?",
      ar: "أنا بخير، شكراً لك! كيف يمكنني مساعدتك في متطلبات عملك أو تقنيتك اليوم؟",
    },
  },

  // 2. GENERAL COMPANY OVERVIEW
  {
    id: "services_overview",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "what do you do", "what services do you provide", "what can you help with",
      "how can arav help me", "what do you guys actually do", "what does arav do",
      "whats your expertise", "what problems can you solve", "what solutions do you provide",
      "core competencies", "capabilities", "what do you offer", "who is arav", "about arav",
      "tell me about arav", "was macht arav", "über arav", "arav kya karta hai"
    ],
    response: {
      en: "Arav Innovations helps businesses turn technology and digital challenges into practical business outcomes.\n\nOur work spans technology strategy and implementation, software engineering, digital growth, SEO, governance and compliance, audit, talent support and AI.\n\nWhat area are you exploring right now?",
      hi: "आरव इनोवेशन व्यवसायों को प्रौद्योगिकी और डिजिटल चुनौतियों को व्यावहारिक व्यावसायिक परिणामों में बदलने में मदद करता है।\n\nहमारा काम आईटी रणनीति, सॉफ्टवेयर इंजीनियरिंग, डिजिटल ग्रोथ, एसईओ, गवर्नेंस, ऑडिट, टैलेंट सपोर्ट और एआई तक फैला है।\n\nआप अभी किस क्षेत्र के बारे में जानना चाहते हैं?",
      de: "Arav Innovations hilft Unternehmen, technologische und digitale Herausforderungen in praktische Geschäftsergebnisse zu verwandeln.\n\nUnsere Arbeit umfasst IT-Strategie, Softwareentwicklung, digitales Wachstum, SEO, Governance, Audit, Talent-Support und KI.\n\nWelchen Bereich möchten Sie erkunden?",
      ar: "تساعد آراف إينوفيشينز الشركات على تحويل التحديات التقنية والدعم الرقمي إلى نتائج أعمال ملموسة.\n\nيغطي عملنا استراتيجية التقنية، هندسة البرمجيات، النمو الرقمي، SEO، الحوكمة، والذكاء الاصطناعي.\n\nما المجال الذي تتطلع لاستكشافه الآن؟",
    },
    options: {
      en: [
        { label: "Technology & Software", action: "intent_trigger", payload: "it_strategy" },
        { label: "Digital Growth & SEO", action: "intent_trigger", payload: "digital_marketing" },
        { label: "AI & Automation", action: "intent_trigger", payload: "ai_automation" },
        { label: "Risk & Compliance", action: "intent_trigger", payload: "risk_compliance" },
      ],
      hi: [
        { label: "तकनीक एवं सॉफ्टवेयर", action: "intent_trigger", payload: "it_strategy" },
        { label: "डिजिटल ग्रोथ एवं एसईओ", action: "intent_trigger", payload: "digital_marketing" },
        { label: "एआई एवं ऑटोमेशन", action: "intent_trigger", payload: "ai_automation" },
        { label: "जोखिम एवं अनुपालन", action: "intent_trigger", payload: "risk_compliance" },
      ],
      de: [
        { label: "Technologie & Software", action: "intent_trigger", payload: "it_strategy" },
        { label: "Digitales Wachstum & SEO", action: "intent_trigger", payload: "digital_marketing" },
        { label: "KI & Automatisierung", action: "intent_trigger", payload: "ai_automation" },
        { label: "Risiko & Compliance", action: "intent_trigger", payload: "risk_compliance" },
      ],
      ar: [
        { label: "التقنية والبرمجيات", action: "intent_trigger", payload: "it_strategy" },
        { label: "النمو الرقمي و SEO", action: "intent_trigger", payload: "digital_marketing" },
        { label: "الذكاء الاصطناعي", action: "intent_trigger", payload: "ai_automation" },
      ],
    },
  },

  // 3. VAGUE SERVICES QUERY
  {
    id: "all_services_vague",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "tell me about your services", "list your services", "show all services",
      "service catalog", "full service list", "services list", "what are your services",
      "alle leistungen", "dienste", "sewayen batayein", "sabhi sewayen"
    ],
    response: {
      en: "We work across technology, digital growth, governance, talent and AI.\n\nTo point you to the most relevant solution, what are you most interested in right now?",
      hi: "हम तकनीक, डिजिटल ग्रोथ, गवर्नेंस, टैलेंट और एआई में काम करते हैं।\n\nसही समाधान बताने के लिए, आप अभी सबसे ज्यादा किसमें रुचि रखते हैं?",
      de: "Wir arbeiten in den Bereichen Technologie, digitales Wachstum, Governance, Talente und KI.\n\nWorauf konzentrieren Sie sich derzeit am meisten?",
      ar: "نعمل عبر التكنولوجيا، النمو الرقمي، الحوكمة، الكفاءات والذكاء الاصطناعي.\n\nما الذي يهمك أكثر في الوقت الحالي؟",
    },
    options: {
      en: [
        { label: "Technology Strategy & Apps", action: "intent_trigger", payload: "web_app_dev" },
        { label: "Digital Growth & SEO", action: "intent_trigger", payload: "seo_services" },
        { label: "AI & Automation", action: "intent_trigger", payload: "ai_automation" },
        { label: "Risk & Compliance", action: "intent_trigger", payload: "risk_compliance" },
      ],
      hi: [
        { label: "तकनीक एवं ऐप विकास", action: "intent_trigger", payload: "web_app_dev" },
        { label: "एसईओ एवं डिजिटल ग्रोथ", action: "intent_trigger", payload: "seo_services" },
        { label: "एआई एवं ऑटोमेशन", action: "intent_trigger", payload: "ai_automation" },
      ],
      de: [
        { label: "Technologiestrategie & Apps", action: "intent_trigger", payload: "web_app_dev" },
        { label: "Digitales Wachstum & SEO", action: "intent_trigger", payload: "seo_services" },
        { label: "KI & Automatisierung", action: "intent_trigger", payload: "ai_automation" },
      ],
      ar: [
        { label: "استراتيجية التقنية والتطبيقات", action: "intent_trigger", payload: "web_app_dev" },
        { label: "النمو الرقمي و SEO", action: "intent_trigger", payload: "seo_services" },
      ],
    },
  },

  // 4. IT STRATEGY & LEGACY MODERNIZATION
  {
    id: "it_strategy",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "it-strategy-implementation",
    keywords: [
      "it strategy", "it strategy & implementation", "technology strategy", "it roadmap", "technology roadmap",
      "modernize it", "legacy modernization", "cloud strategy", "technology transformation",
      "infrastructure modernization", "digital transformation", "our it is outdated",
      "modernizing our old it infrastructure", "it strategy?", "it infrastructure", "cloud migration",
      "cto consulting", "outdated infrastructure", "modernize legacy infrastructure", "modernize systems",
      "old systems", "legacy code", "system transformation"
    ],
    response: {
      en: "That sounds like a technology modernization challenge.\n\nArav can help assess existing architecture, identify modernization priorities, plan the transition and support implementation.\n\nAre you mainly dealing with high maintenance costs, scalability issues, outdated technology, or difficulty integrating newer systems?",
      hi: "यह एक टेक्नोलॉजी आधुनिकीकरण चुनौती लगती है।\n\nआरव आपकी मौजूदा वास्तुकला का आकलन करने, आधुनिकीकरण प्राथमिकताओं की पहचान करने और कार्यान्वयन में मदद कर सकता है।\n\nक्या आप मुख्य रूप से उच्च रखरखाव लागत, स्केलेबिलिटी समस्याओं, या पुरानी तकनीक से जूझ रहे हैं?",
      de: "Das klingt nach einer technologischen Modernisierungsherausforderung.\n\nArav unterstützt Sie bei der Bewertung der bestehenden Architektur, der Festlegung von Prioritäten und der Umsetzung.\n\nGeht es vor allem um hohe Wartungskosten, Skalierbarkeitsprobleme, veraltete Technologie oder Integrationsprobleme?",
      ar: "يبدو ذلك تحدياً يتعلق بتحديث التكنولوجيا.\n\nيمكن لـ آراف مساعدتك في تقييم البنية التحتية، وتحديد الأولويات وتخطيط الانتقال وتنفيذه.\n\nهل تتعامل بشكل رئيسي مع تكاليف صيانة عالية، مشاكل في التوسع، أم صعوبة في الدمج؟",
    },
    options: {
      en: [
        { label: "Modernize legacy systems", action: "intent_trigger", payload: "it_modernize_deep" },
        { label: "Cloud transformation", action: "intent_trigger", payload: "it_cloud_deep" },
        { label: "Build custom application", action: "intent_trigger", payload: "web_app_dev" },
        { label: "Talk to a specialist", action: "progressive_lead", payload: "IT Strategy Consultation" },
      ],
      hi: [
        { label: "पुरानी प्रणाली आधुनिक बनाएं", action: "intent_trigger", payload: "it_modernize_deep" },
        { label: "क्लाउड ट्रांसफॉर्मेशन", action: "intent_trigger", payload: "it_cloud_deep" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "IT Strategy Consultation" },
      ],
      de: [
        { label: "Altsysteme modernisieren", action: "intent_trigger", payload: "it_modernize_deep" },
        { label: "Cloud-Transformation", action: "intent_trigger", payload: "it_cloud_deep" },
        { label: "Mit Experte sprechen", action: "progressive_lead", payload: "IT Strategy Consultation" },
      ],
      ar: [
        { label: "تحديث الأنظمة القديمة", action: "intent_trigger", payload: "it_modernize_deep" },
        { label: "التحدث مع مختص", action: "progressive_lead", payload: "IT Strategy Consultation" },
      ],
    },
  },

  {
    id: "it_modernize_deep",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "it-strategy-implementation",
    keywords: ["modernize legacy systems", "high maintenance costs", "scalability issues", "it_modernize_deep"],
    response: {
      en: "Got it. Modernizing core infrastructure typically starts with a targeted architecture assessment to decouple bottleneck dependencies without disrupting current operations.\n\nBased on what you've described, IT Strategy & Implementation is the closest fit.\n\nWould you like to see what that engagement typically covers?",
      hi: "समझ गया। कोर इंफ्रास्ट्रक्चर के आधुनिकीकरण की शुरुआत आमतौर पर वास्तुकला मूल्यांकन से होती है ताकि वर्तमान संचालन को बाधित किए बिना बाधाओं को दूर किया जा सके।\n\nक्या आप देखना चाहेंगे कि इसमें क्या शामिल है?",
      de: "Verstanden. Die Modernisierung der Kerninfrastruktur beginnt typischerweise mit einer Architektur-Bewertung, um Engpässe ohne Unterbrechung zu lösen.\n\nMöchten Sie erfahren, was diese Leistung umfasst?",
      ar: "فهمت ذلك. يبدأ تحديث البنية التحتية عادةً بتقييم هندسي متخصص لتفكيك الاختناقات دون تعطيل العمليات.\n\nهل ترغب في معرفة ما تغطيه هذه الخدمة عادةً؟",
    },
    options: {
      en: [
        { label: "Show detailed service overview →", action: "show_service_link", route: "/services/it-strategy-implementation" },
        { label: "Connect with an Arav specialist →", action: "progressive_lead", payload: "IT Modernization Audit" },
      ],
      hi: [
        { label: "विस्तृत सेवा विवरण देखें →", action: "show_service_link", route: "/services/it-strategy-implementation" },
        { label: "विशेषज्ञ से जुड़ें →", action: "progressive_lead", payload: "IT Modernization Audit" },
      ],
      de: [
        { label: "Detaillierte Leistungsübersicht anzeigen →", action: "show_service_link", route: "/services/it-strategy-implementation" },
        { label: "Mit Spezialisten verbinden →", action: "progressive_lead", payload: "IT Modernization Audit" },
      ],
      ar: [
        { label: "عرض تفاصيل الخدمة →", action: "show_service_link", route: "/services/it-strategy-implementation" },
        { label: "التواصل مع مختص →", action: "progressive_lead", payload: "IT Modernization Audit" },
      ],
    },
  },

  // 5. WEB & APPLICATION DEVELOPMENT
  {
    id: "web_app_dev",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "web-app-development",
    keywords: [
      "website", "web development", "website development", "web app", "application", "software",
      "platform", "portal", "enterprise application", "custom software", "build a website",
      "need a new business website", "new business website", "web devlopment", "website?",
      "mujhe website banwani hai", "website banana hai", "build web app", "rebuild app",
      "web application", "saas portal", "mobile app", "ecommerce website", "e-commerce website",
      "webseite erstellen", "webseite bauen", "app entwicklung"
    ],
    response: {
      en: "We design and engineer custom, high-performance web applications and platforms tailored to business workflows.\n\nTo understand what would actually help, is this a new application build, a redesign of an existing platform, or custom enterprise software?",
      hi: "हम आपकी व्यावसायिक आवश्यकताओं के अनुसार कस्टम, उच्च-प्रदर्शन वेब एप्लिकेशन और प्लेटफॉर्म डिजाइन करते हैं।\n\nयह समझने के लिए कि क्या मदद करेगा: क्या यह नया एप्लिकेशन है, मौजूदा प्लेटफ़ॉर्म का रीडिजाइन, या कस्टम सॉफ़्टवेयर?",
      de: "Wir entwickeln maßgeschneiderte, hochleistungsfähige Webanwendungen und Plattformen.\n\nUm zu verstehen, was am besten hilft: Handelt es sich um eine Neuentwicklung, ein Redesign oder eine individuelle Unternehmenssoftware?",
      ar: "نصمم ونطور تطبيقات ومواقع ويب مخصصة عالية الأداء.\n\nلنفهم احتياجك بشكل أفضل: هل هذا تطبيق جديد، إعادة تصميم لموقع حالي، أم برنامج مؤسسي مخصص؟",
    },
    options: {
      en: [
        { label: "New application / platform", action: "intent_trigger", payload: "web_app_new" },
        { label: "Redesign existing platform", action: "intent_trigger", payload: "web_app_redesign" },
        { label: "SaaS / Portal development", action: "intent_trigger", payload: "web_app_saas" },
        { label: "Talk to a specialist", action: "progressive_lead", payload: "Web Application Project" },
      ],
      hi: [
        { label: "नया एप्लिकेशन / प्लेटफॉर्म", action: "intent_trigger", payload: "web_app_new" },
        { label: "मौजूदा प्लेटफ़ॉर्म रीडिजाइन", action: "intent_trigger", payload: "web_app_redesign" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "Web Application Project" },
      ],
      de: [
        { label: "Neue Anwendung / Plattform", action: "intent_trigger", payload: "web_app_new" },
        { label: "Redesign einer Plattform", action: "intent_trigger", payload: "web_app_redesign" },
        { label: "Mit Spezialisten sprechen", action: "progressive_lead", payload: "Web Application Project" },
      ],
      ar: [
        { label: "تطبيق / منصة جديدة", action: "intent_trigger", payload: "web_app_new" },
        { label: "التحدث مع مختص", action: "progressive_lead", payload: "Web Application Project" },
      ],
    },
  },

  {
    id: "web_app_redesign",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "web-app-development",
    keywords: ["redesign existing platform", "redesign", "website redesign", "web_app_redesign"],
    response: {
      en: "Got it. For a platform redesign, we focus on user experience, subsecond speed performance, security, and conversion metrics.\n\nBased on your goal, Web & Application Development is the direct practice.\n\nWould you like me to share the detailed service overview?",
      hi: "समझ गया। रीडिजाइन के लिए, हम उपयोगकर्ता अनुभव, उप-सेकंड गति, सुरक्षा और रूपांतरण पर ध्यान केंद्रित करते हैं।\n\nक्या आप विस्तृत सेवा विवरण देखना चाहेंगे?",
      de: "Verstanden. Bei einem Redesign konzentrieren wir uns auf Benutzererfahrung, Geschwindigkeit, Sicherheit und Konvertierungsraten.\n\nMöchten Sie die detaillierte Leistungsübersicht sehen?",
      ar: "فهمت ذلك. بالنسبة لإعادة التصميم، نركز على تجربة المستخدم، السرعة العالية، والأمان.\n\nهل ترغب في أن أعرض عليك تفاصيل الخدمة؟",
    },
    options: {
      en: [
        { label: "Show detailed approach →", action: "show_service_link", route: "/services/web-app-development" },
        { label: "Connect with tech team →", action: "progressive_lead", payload: "Web Redesign Scoping" },
      ],
      hi: [
        { label: "विस्तृत दृष्टिकोण देखें →", action: "show_service_link", route: "/services/web-app-development" },
        { label: "टीम से जुड़ें →", action: "progressive_lead", payload: "Web Redesign Scoping" },
      ],
      de: [
        { label: "Detaillierten Ansatz anzeigen →", action: "show_service_link", route: "/services/web-app-development" },
        { label: "Mit Team verbinden →", action: "progressive_lead", payload: "Web Redesign Scoping" },
      ],
      ar: [
        { label: "عرض النهج التفصيلي →", action: "show_service_link", route: "/services/web-app-development" },
        { label: "التواصل مع الفريق →", action: "progressive_lead", payload: "Web Redesign Scoping" },
      ],
    },
  },

  // 6. SEO SERVICES & AEO
  {
    id: "seo_services",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "seo-services",
    keywords: [
      "seo", "seo services", "search engine optimization", "google ranking", "search visibility",
      "organic traffic", "rank higher", "technical seo", "my website isn't ranking", "my website isn't getting traffic",
      "website traffic", "seo servic", "gugle", "gogle", "rankin", "seo?", "seo improve karni hai",
      "seo ka kaam", "rank my website", "search traffic", "aeo", "answer engine optimization", "chatgpt ranking"
    ],
    response: {
      en: "Yes. We work on technical SEO, search visibility, content structure and AI-search discoverability (AEO).\n\nBefore I point you toward the right approach, are you mainly trying to increase organic traffic, improve rankings for specific topics, or increase qualified enquiries?",
      hi: "हाँ। हम तकनीकी एसईओ, खोज दृश्यता, सामग्री संरचना और एआई-खोज खोजयोग्यता (AEO) पर काम करते हैं।\n\nसही दृष्टिकोण बताने से पहले, क्या आप मुख्य रूप से ऑर्गेनिक ट्रैफ़िक बढ़ाना चाहते हैं, या योग्य पूछताछ प्राप्त करना चाहते हैं?",
      de: "Ja. Wir arbeiten an technischem SEO, Sichtbarkeit, Content-Struktur und KI-Suchmaschinen-Optimierung (AEO).\n\nMöchten Sie vor allem den organischen Traffic steigern, Rankings für bestimmte Themen verbessern oder mehr Anfragen generieren?",
      ar: "نعم. نعمل على SEO الفني، ظهور محركات البحث، وتحسين الإجابة في محركات الذكاء الاصطناعي (AEO).\n\nهل تهدف بشكل رئيسي لزيادة الزيارات، أم تحسين الترتيب لمواضيع محددة؟",
    },
    options: {
      en: [
        { label: "Increase organic traffic & rankings", action: "intent_trigger", payload: "seo_traffic_deep" },
        { label: "Optimize for AI Search (AEO)", action: "intent_trigger", payload: "aeo_explanation" },
        { label: "Talk to an SEO specialist", action: "progressive_lead", payload: "SEO & AEO Consultation" },
      ],
      hi: [
        { label: "ऑर्गेनिक ट्रैफिक और रैंकिंग बढ़ाएं", action: "intent_trigger", payload: "seo_traffic_deep" },
        { label: "एआई सर्च (AEO) के लिए ऑप्टिमाइज़ करें", action: "intent_trigger", payload: "aeo_explanation" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "SEO & AEO Consultation" },
      ],
      de: [
        { label: "Organischen Traffic & Rankings steigern", action: "intent_trigger", payload: "seo_traffic_deep" },
        { label: "Für KI-Suche (AEO) optimieren", action: "intent_trigger", payload: "aeo_explanation" },
        { label: "Mit SEO-Spezialisten sprechen", action: "progressive_lead", payload: "SEO & AEO Consultation" },
      ],
      ar: [
        { label: "زيادة الزيارات والترتيب", action: "intent_trigger", payload: "seo_traffic_deep" },
        { label: "التحدث مع مختص", action: "progressive_lead", payload: "SEO & AEO Consultation" },
      ],
    },
  },

  {
    id: "seo_traffic_deep",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "seo-services",
    keywords: ["increase organic traffic", "seo_traffic_deep"],
    response: {
      en: "Makes sense. Our SEO engagements combine technical crawl health, semantic architecture, and authority building to capture high-intent search traffic.\n\nSEO Services would be the closest practice.\n\nWould you like to explore how we structure an audit and growth campaign?",
      hi: "सही है। हमारी एसईओ सेवाएं उच्च-आशय ट्रैफ़िक हासिल करने के लिए तकनीकी स्वास्थ्य और अथॉरिटी निर्माण को जोड़ती हैं।\n\nक्या आप देखना चाहेंगे कि हम अभियान कैसे बनाते हैं?",
      de: "Das macht Sinn. Unsere SEO-Engagements kombinieren technische Gesundheit und Autoritätsaufbau für qualifizierten Traffic.\n\nMöchten Sie erfahren, wie wir ein Audit strukturieren?",
      ar: "هذا منطقي. تجمع خدمات SEO لدينا بين الصحة الفنية وبناء السلطة الرقمية لزيادة الزيارات العالية الأهمية.\n\nهل ترغب في استكشاف كيفية إعداد تدقيق وحملة نمو؟",
    },
    options: {
      en: [
        { label: "Show SEO approach →", action: "show_service_link", route: "/services/seo-services" },
        { label: "Request an SEO audit →", action: "progressive_lead", payload: "SEO Audit Request" },
      ],
      hi: [
        { label: "एसईओ दृष्टिकोण देखें →", action: "show_service_link", route: "/services/seo-services" },
        { label: "ऑडिट का अनुरोध करें →", action: "progressive_lead", payload: "SEO Audit Request" },
      ],
      de: [
        { label: "SEO-Ansatz anzeigen →", action: "show_service_link", route: "/services/seo-services" },
        { label: "SEO-Audit anfordern →", action: "progressive_lead", payload: "SEO Audit Request" },
      ],
      ar: [
        { label: "عرض نهج SEO →", action: "show_service_link", route: "/services/seo-services" },
        { label: "طلب تدقيق SEO →", action: "progressive_lead", payload: "SEO Audit Request" },
      ],
    },
  },

  // 7. DIGITAL MARKETING & BRAND DEVELOPMENT
  {
    id: "digital_marketing",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "digital-marketing-brand-development",
    keywords: [
      "grow online", "online marketing", "brand growth", "lead generation", "demand generation",
      "digital presence", "marketing strategy", "customer acquisition", "business ko online grow karna hai",
      "digitial marketing", "marketing", "digital marketing", "b2b marketing", "linkedin ads", "google ads",
      "marketing agentur", "digitales marketing"
    ],
    response: {
      en: "We engineer high-intent B2B demand generation campaigns and brand positioning focused on pipeline and business results.\n\nAre you looking to scale qualified B2B leads, refine brand positioning, or optimize paid campaign ROI?",
      hi: "हम लिंक्डइन और गूगल सर्च पर परिणाम-उन्मुख B2B मार्केटिंग अभियान और ब्रांड निर्माण करते हैं।\n\nक्या आप योग्य B2B लीड बढ़ाना चाहते हैं या ब्रांड स्थिति को बेहतर बनाना चाहते हैं?",
      de: "Wir entwickeln B2B-Nachfragegenerierungskampagnen und Markenpositionierung mit Fokus auf messbare Ergebnisse.\n\nMöchten Sie qualifizierte B2B-Leads skalieren oder die Markenpositionierung verfeinern?",
      ar: "نصمم حملات التسويق الرقمي واستقطاب العملاء لتوسيع الأعمال وتحقيق النتائج.\n\nهل تتطلع لزيادة العملاء المحتملين أم تحسين تموضع العلامة التجارية؟",
    },
    options: {
      en: [
        { label: "B2B Lead Generation", action: "intent_trigger", payload: "marketing_b2b_deep" },
        { label: "Brand positioning & strategy", action: "intent_trigger", payload: "marketing_brand_deep" },
        { label: "Talk to a growth strategist", action: "progressive_lead", payload: "Digital Growth Strategy" },
      ],
      hi: [
        { label: "B2B लीड जनरेशन", action: "intent_trigger", payload: "marketing_b2b_deep" },
        { label: "ब्रांड स्थिति एवं रणनीति", action: "intent_trigger", payload: "marketing_brand_deep" },
        { label: "रणनीतिकार से बात करें", action: "progressive_lead", payload: "Digital Growth Strategy" },
      ],
      de: [
        { label: "B2B-Lead-Generierung", action: "intent_trigger", payload: "marketing_b2b_deep" },
        { label: "Markenpositionierung & Strategie", action: "intent_trigger", payload: "marketing_brand_deep" },
        { label: "Mit Wachstumsexperten sprechen", action: "progressive_lead", payload: "Digital Growth Strategy" },
      ],
      ar: [
        { label: "استقطاب العملاء B2B", action: "intent_trigger", payload: "marketing_b2b_deep" },
        { label: "التحدث مع خبير نمو", action: "progressive_lead", payload: "Digital Growth Strategy" },
      ],
    },
  },

  {
    id: "marketing_b2b_deep",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "digital-marketing-brand-development",
    keywords: ["b2b lead generation", "marketing_b2b_deep"],
    response: {
      en: "Understood. Our B2B demand generation targets decision-makers through paid acquisition, conversion-tuned landing funnels, and sales enablement assets.\n\nDigital Marketing & Brand Development covers this practice.\n\nWould you like to see how our campaigns are structured?",
      hi: "समझ गया। हमारी B2B डिमांड जनरेशन भुगतान अभियानों और रूपांतरण फ़नल के माध्यम से निर्णय निर्माताओं को लक्षित करती है।\n\nक्या आप देखना चाहेंगे कि हमारे अभियान कैसे व्यवस्थित हैं?",
      de: "Verstanden. Unsere B2B-Nachfragegenerierung zielt auf Entscheidungsträger durch gezielte Kampagnen und Konvertierungsfunnels ab.\n\nMöchten Sie erfahren, wie unsere Kampagnen aufgebaut sind?",
      ar: "فهمت ذلك. يستهدف استقطاب العملاء لدينا صُنّاع القرار من خلال حملات موجهة وصفحات تحويل عالية الفعالية.\n\nهل ترغب في رؤية كيفية هيكلة حملاتنا؟",
    },
    options: {
      en: [
        { label: "Show Digital Marketing overview →", action: "show_service_link", route: "/services/digital-marketing-brand-development" },
        { label: "Discuss growth campaign →", action: "progressive_lead", payload: "B2B Campaign Inquiry" },
      ],
      hi: [
        { label: "डिजिटल मार्केटिंग विवरण देखें →", action: "show_service_link", route: "/services/digital-marketing-brand-development" },
        { label: "अभियान पर चर्चा करें →", action: "progressive_lead", payload: "B2B Campaign Inquiry" },
      ],
      de: [
        { label: "Übersicht digitales Marketing anzeigen →", action: "show_service_link", route: "/services/digital-marketing-brand-development" },
        { label: "Kampagne besprechen →", action: "progressive_lead", payload: "B2B Campaign Inquiry" },
      ],
      ar: [
        { label: "عرض تفاصيل التسويق الرقمي →", action: "show_service_link", route: "/services/digital-marketing-brand-development" },
        { label: "مناقشة الحملة →", action: "progressive_lead", payload: "B2B Campaign Inquiry" },
      ],
    },
  },

  // 8. AI PORTFOLIO & AUTOMATION
  {
    id: "ai_automation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "ai-portfolio",
    keywords: [
      "ai", "ai?", "artificial intelligence", "ai automation", "workflow automation", "ai agents",
      "ai implementation", "ai integration", "business ai", "artifical intelligence", "automtion",
      "ai solutions", "ai se automation karna hai", "automate repetitive business processes with ai",
      "llm", "rag", "chatbots", "automate process", "ki lösungen", "künstliche intelligenz", "automation"
    ],
    response: {
      en: "Yes. We help identify practical AI and workflow-automation opportunities and turn them into working enterprise systems.\n\nIs your main goal automating internal workflows, building a custom conversational assistant, or integrating LLM data pipelines?",
      hi: "हाँ। हम व्यावहारिक एआई और वर्कफ़्लो-ऑटोमेशन के अवसरों की पहचान करते हैं और उन्हें कार्यशील व्यावसायिक प्रणालियों में बदलते हैं।\n\nक्या आपका मुख्य लक्ष्य आंतरिक प्रक्रियाओं को ऑटोमेट करना है, या कस्टम एआई असिस्टेंट बनाना है?",
      de: "Ja. Wir identifizieren praktische KI- und Automatisierungschancen und verwandeln sie in funktionsfähige Unternehmenssysteme.\n\nGeht es um die Automatisierung interner Abläufe, die Entwicklung eines KI-Assistenten oder LLM-Datenintegration?",
      ar: "نعم. نحدد فرص الذكاء الاصطناعي وأتمتة مسارات العمل ونحولها إلى أنظمة عمل مؤسسية فعالة.\n\nهل هدفك الرئيسي أتمتة العمليات الداخلية أم بناء مساعد ذكاء اصطناعي مخصص؟",
    },
    options: {
      en: [
        { label: "Workflow & process automation", action: "intent_trigger", payload: "ai_workflow_deep" },
        { label: "Custom AI Assistant / RAG", action: "intent_trigger", payload: "ai_assistant_deep" },
        { label: "Talk to an AI specialist", action: "progressive_lead", payload: "AI Automation Project" },
      ],
      hi: [
        { label: "वर्कफ़्लो एवं प्रक्रिया ऑटोमेशन", action: "intent_trigger", payload: "ai_workflow_deep" },
        { label: "कस्टम एआई असिस्टेंट", action: "intent_trigger", payload: "ai_assistant_deep" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "AI Automation Project" },
      ],
      de: [
        { label: "Workflows & Prozessautomatisierung", action: "intent_trigger", payload: "ai_workflow_deep" },
        { label: "Individueller KI-Assistent", action: "intent_trigger", payload: "ai_assistant_deep" },
        { label: "Mit KI-Spezialisten sprechen", action: "progressive_lead", payload: "AI Automation Project" },
      ],
      ar: [
        { label: "أتمتة مسارات العمل", action: "intent_trigger", payload: "ai_workflow_deep" },
        { label: "التحدث مع مختص", action: "progressive_lead", payload: "AI Automation Project" },
      ],
    },
  },

  {
    id: "ai_workflow_deep",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "ai-portfolio",
    keywords: ["workflow automation", "ai_workflow_deep"],
    response: {
      en: "Got it. Enterprise AI automation connects existing tools with secure model endpoints to remove repetitive manual overhead.\n\nAI Portfolio is our dedicated practice for this.\n\nWould you like to review our approach and typical architecture?",
      hi: "समझ गया। एंटरप्राइज एआई ऑटोमेशन दोहराव वाले मैनुअल काम को खत्म करने के लिए मौजूदा टूल्स को सुरक्षित एआई सिस्टम से जोड़ता है।\n\nक्या आप हमारा दृष्टिकोण देखना चाहेंगे?",
      de: "Verstanden. Enterprise-KI-Automatisierung verbindet bestehende Tools mit sicheren Modell-Endpoints, um manuelle Aufwände zu reduzieren.\n\nMöchten Sie unseren Ansatz kennenlernen?",
      ar: "فهمت ذلك. تربط أتمتة الذكاء الاصطناعي بين الأدوات الحالية والنماذج الآمنة لإلغاء المهام اليدوية المكررة.\n\nهل ترغب في مراجعة نهجنا وتصميمنا الهندسي؟",
    },
    options: {
      en: [
        { label: "Show AI Portfolio details →", action: "show_service_link", route: "/services/ai-portfolio" },
        { label: "Schedule AI feasibility call →", action: "progressive_lead", payload: "AI Automation Audit" },
      ],
      hi: [
        { label: "एआई पोर्टफोलियो विवरण देखें →", action: "show_service_link", route: "/services/ai-portfolio" },
        { label: "व्यवहार्यता पर चर्चा करें →", action: "progressive_lead", payload: "AI Automation Audit" },
      ],
      de: [
        { label: "KI-Portfolio-Details anzeigen →", action: "show_service_link", route: "/services/ai-portfolio" },
        { label: "KI-Machbarkeitsgespräch buchen →", action: "progressive_lead", payload: "AI Automation Audit" },
      ],
      ar: [
        { label: "عرض تفاصيل حلول الذكاء الاصطناعي →", action: "show_service_link", route: "/services/ai-portfolio" },
        { label: "جدولة استشارة فنية →", action: "progressive_lead", payload: "AI Automation Audit" },
      ],
    },
  },

  // 9. RISK, COMPLIANCE & GOVERNANCE
  {
    id: "risk_compliance",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "risk-compliance-governance",
    keywords: [
      "compliance", "risk", "privacy", "security governance", "regulations", "controls",
      "dpdp", "gdpr", "soc2", "iso 27001", "complaince", "need help with compliance", "governance",
      "regulatory requirements", "compliance support", "compliance ka kaam"
    ],
    response: {
      en: "Yes. We work around risk, compliance and governance frameworks including India's DPDP Act, SOC-2 readiness, ISO 27001, and enterprise security governance.\n\nAre you mainly trying to establish a governance framework, prepare for an audit, or address specific compliance requirements?",
      hi: "हाँ। हम DPDP अधिनियम, SOC-2, ISO 27001 और एंटरप्राइज सुरक्षा गवर्नेंस सहित अनुपालन ढांचे पर काम करते हैं।\n\nक्या आप मुख्य रूप से गवर्नेंस ढांचा स्थापित करना चाहते हैं, या किसी ऑडिट की तैयारी कर रहे हैं?",
      de: "Ja. Wir arbeiten an Risiko-, Compliance- und Governance-Frameworks wie DPDP Act, SOC-2-Bereitschaft, ISO 27001 und Sicherheits-Governance.\n\nMöchten Sie ein Governance-Framework aufbauen oder sich auf ein Audit vorbereiten?",
      ar: "نعم. نعمل على أطر الحوكمة والمخاطر والامتثال لقوانين حماية البيانات DPDP و SOC-2 و ISO 27001.\n\nهل تهدف بشكل رئيسي لإنشاء إطار حوكمة أم التحضير لتدقيق أمني؟",
    },
    options: {
      en: [
        { label: "Establish governance framework", action: "intent_trigger", payload: "rcg_governance_deep" },
        { label: "Audit & compliance readiness", action: "intent_trigger", payload: "rcg_audit_deep" },
        { label: "Talk to a compliance expert", action: "progressive_lead", payload: "Risk & Compliance Consultation" },
      ],
      hi: [
        { label: "गवर्नेंस ढांचा स्थापित करें", action: "intent_trigger", payload: "rcg_governance_deep" },
        { label: "ऑडिट एवं अनुपालन तैयारी", action: "intent_trigger", payload: "rcg_audit_deep" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "Risk & Compliance Consultation" },
      ],
      de: [
        { label: "Governance-Framework aufbauen", action: "intent_trigger", payload: "rcg_governance_deep" },
        { label: "Audit- & Compliance-Vorbereitung", action: "intent_trigger", payload: "rcg_audit_deep" },
        { label: "Mit Compliance-Experten sprechen", action: "progressive_lead", payload: "Risk & Compliance Consultation" },
      ],
      ar: [
        { label: "إنشاء إطار حوكمة", action: "intent_trigger", payload: "rcg_governance_deep" },
        { label: "التحدث مع مختص", action: "progressive_lead", payload: "Risk & Compliance Consultation" },
      ],
    },
  },

  {
    id: "rcg_governance_deep",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "risk-compliance-governance",
    keywords: ["establish governance framework", "rcg_governance_deep"],
    response: {
      en: "Understood. Building a defensible GRC posture requires continuous risk mapping, clear data policies, and automated audit trails.\n\nRisk, Compliance & Governance is the core practice.\n\nWould you like to review how we structure enterprise compliance assessments?",
      hi: "समझ गया। एक मजबूत GRC ढांचा बनाने के लिए निरंतर जोखिम मैपिंग और स्पष्ट डेटा नीतियों की आवश्यकता होती है।\n\nक्या आप हमारी मूल्यांकन प्रक्रिया देखना चाहेंगे?",
      de: "Verstanden. Der Aufbau eines GRC-Status erfordert kontinuierliches Risikomapping und klare Datenrichtlinien.\n\nMöchten Sie erfahren, wie wir Compliance-Assessments strukturieren?",
      ar: "فهمت ذلك. يتطلب بناء إطار GRC قوي تعيين المخاطر بشكل مستمر وساسات بيانات واضحة.\n\nهل ترغب في مراجعة كيفية إعداد تقييمات الامتثال؟",
    },
    options: {
      en: [
        { label: "Show Risk & Governance overview →", action: "show_service_link", route: "/services/risk-compliance-governance" },
        { label: "Check readiness with our team →", action: "progressive_lead", payload: "GRC Assessment Request" },
      ],
      hi: [
        { label: "जोखिम एवं गवर्नेंस विवरण देखें →", action: "show_service_link", route: "/services/risk-compliance-governance" },
        { label: "तैयारी की जांच करें →", action: "progressive_lead", payload: "GRC Assessment Request" },
      ],
      de: [
        { label: "Risiko- & Governance-Übersicht anzeigen →", action: "show_service_link", route: "/services/risk-compliance-governance" },
        { label: "Bereitschaft mit Team prüfen →", action: "progressive_lead", payload: "GRC Assessment Request" },
      ],
      ar: [
        { label: "عرض تفاصيل الحوكمة والمخاطر →", action: "show_service_link", route: "/services/risk-compliance-governance" },
        { label: "فحص الامتثال مع الفريق →", action: "progressive_lead", payload: "GRC Assessment Request" },
      ],
    },
  },

  // 10. AUDIT & IMPROVEMENT
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
      en: "We evaluate operational processes, software architecture, and cloud infrastructure to eliminate bottlenecks and optimize efficiency.\n\nAre you looking to audit cloud infrastructure costs, resolve software bottlenecks, or benchmark process efficiency?",
      hi: "हम बाधाओं को दूर करने और दक्षता का अनुकूलन करने के लिए परिचालन प्रक्रियाओं, सॉफ़्टवेयर वास्तुकला और क्लाउड इंफ्रास्ट्रक्चर का मूल्यांकन करते हैं।\n\nक्या आप क्लाउड लागत का ऑडिट करना चाहते हैं या प्रदर्शन संबंधी बाधाओं को हल करना चाहते हैं?",
      de: "Wir bewerten betriebliche Prozesse, Softwarearchitektur und Cloud-Infrastruktur, um Engpässe zu beseitigen und die Effizienz zu optimieren.\n\nMöchten Sie Cloud-Kosten prüfen oder Software-Engpässe beheben?",
      ar: "نقوم بتدقيق الأنظمة والبنية التحتية التقنية لإزالة الاختناقات وتحسين الكفاءة التشغيلية.\n\nهل ترغب في تدقيق تكاليف السحابة أم حلي اختناقات الأداء؟",
    },
    options: {
      en: [
        { label: "Cloud FinOps & Cost Audit", action: "intent_trigger", payload: "audit_cloud_deep" },
        { label: "Software & System Audit", action: "intent_trigger", payload: "audit_software_deep" },
        { label: "Request a system review", action: "progressive_lead", payload: "Audit & Assessment Request" },
      ],
      hi: [
        { label: "क्लाउड फिनऑप्स एवं लागत ऑडिट", action: "intent_trigger", payload: "audit_cloud_deep" },
        { label: "सॉफ्टवेयर एवं सिस्टम ऑडिट", action: "intent_trigger", payload: "audit_software_deep" },
        { label: "समीक्षा का अनुरोध करें", action: "progressive_lead", payload: "Audit & Assessment Request" },
      ],
      de: [
        { label: "Cloud FinOps & Kosten-Audit", action: "intent_trigger", payload: "audit_cloud_deep" },
        { label: "Software- & System-Audit", action: "intent_trigger", payload: "audit_software_deep" },
        { label: "Systemüberprüfung anfordern", action: "progressive_lead", payload: "Audit & Assessment Request" },
      ],
      ar: [
        { label: "تدقيق تكاليف السحابة", action: "intent_trigger", payload: "audit_cloud_deep" },
        { label: "طلب تدقيق الأنظمة", action: "progressive_lead", payload: "Audit & Assessment Request" },
      ],
    },
  },

  {
    id: "audit_cloud_deep",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "audit-improvement",
    keywords: ["cloud finops", "audit_cloud_deep"],
    response: {
      en: "Got it. Our cloud audits analyze resource utilization, latency bottlenecks, and idle overhead to recover wasted cloud spend.\n\nAudit & Improvement is the relevant practice.\n\nWould you like to see how we deliver system audits?",
      hi: "समझ गया। हमारे क्लाउड ऑडिट बेकार क्लाउड खर्च को वापस पाने के लिए संसाधन उपयोग और लेटेंसी बाधाओं का विश्लेषण करते हैं।\n\nक्या आप हमारी ऑडिट प्रक्रिया देखना चाहेंगे?",
      de: "Verstanden. Unsere Cloud-Audits analysieren Ressourcennutzung und Latenzengpässe, um unnötige Kosten zu senken.\n\nMöchten Sie erfahren, wie wir Audits durchführen?",
      ar: "فهمت ذلك. تحلل عمليات التدقيق لدينا استهلاك الموارد وااختناقات الأداء لتقليل التكاليف غير الضرورية.\n\nهل ترغب في معرفة كيف نقدم عمليات التدقيق؟",
    },
    options: {
      en: [
        { label: "Show Audit & Improvement overview →", action: "show_service_link", route: "/services/audit-improvement" },
        { label: "Schedule technical assessment →", action: "progressive_lead", payload: "Cloud FinOps Audit" },
      ],
      hi: [
        { label: "ऑडिट एवं सुधार विवरण देखें →", action: "show_service_link", route: "/services/audit-improvement" },
        { label: "तकनीकी मूल्यांकन शेड्यूल करें →", action: "progressive_lead", payload: "Cloud FinOps Audit" },
      ],
      de: [
        { label: "Audit & Improvement Übersicht anzeigen →", action: "show_service_link", route: "/services/audit-improvement" },
        { label: "Technische Bewertung vereinbaren →", action: "progressive_lead", payload: "Cloud FinOps Audit" },
      ],
      ar: [
        { label: "عرض تفاصيل التدقيق والتحسين →", action: "show_service_link", route: "/services/audit-improvement" },
        { label: "جدولة تقييم فني →", action: "progressive_lead", payload: "Cloud FinOps Audit" },
      ],
    },
  },

  // 11. TRAINING & STAFF AUGMENTATION
  {
    id: "staff_augmentation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "training-staff-augmentation",
    keywords: [
      "need developers", "developers", "technical resource", "technical resources", "hire developers",
      "staff augmentation", "upskill team", "training", "technical talent", "additional engineers",
      "team ke liye developers chahiye", "devoloper", "devs", "technical people for a project",
      "need technical people", "entwickler buchen", "entwickler"
    ],
    response: {
      en: "Sure. We support engineering teams with senior technical talent and dedicated staff augmentation pods based on project scope.\n\nWhat engineering roles, skill sets, or technologies are you looking to add to your team?",
      hi: "ज़रूर! हम आपकी परियोजनाओं की आवश्यकताओं के अनुसार अनुभवी डेवलपर्स और तकनीकी विशेषज्ञों की सहायता प्रदान करते हैं।\n\nआप अपनी टीम में किस प्रकार के डेवलपर्स या कौशल जोड़ना चाहते हैं?",
      de: "Sicher. Wir unterstützen Entwicklerteams mit erfahrenen Experten und engagierten Entwickler-Pods je nach Projektumfang.\n\nWelche Entwicklerrollen oder Fähigkeiten möchten Sie ergänzen?",
      ar: "بالتأكيد! نوفر مهندسين ومختصين ينضمون لفريقك حسب متطلبات المشروع.\n\nما هي الأدوار الفنية أو المهارات التي تتطلع لإضافتها لفريقك؟",
    },
    options: {
      en: [
        { label: "Dedicated developer pod", action: "intent_trigger", payload: "staff_pod_deep" },
        { label: "Technical upskilling & training", action: "intent_trigger", payload: "staff_training_deep" },
        { label: "Talk to talent director", action: "progressive_lead", payload: "Staff Augmentation Inquiry" },
      ],
      hi: [
        { label: "समर्पित डेवलपर पॉड", action: "intent_trigger", payload: "staff_pod_deep" },
        { label: "तकनीकी प्रशिक्षण", action: "intent_trigger", payload: "staff_training_deep" },
        { label: "विशेषज्ञ से बात करें", action: "progressive_lead", payload: "Staff Augmentation Inquiry" },
      ],
      de: [
        { label: "Dedizierter Entwickler-Pod", action: "intent_trigger", payload: "staff_pod_deep" },
        { label: "Technische Weiterbildung", action: "intent_trigger", payload: "staff_training_deep" },
        { label: "Mit Talent-Director sprechen", action: "progressive_lead", payload: "Staff Augmentation Inquiry" },
      ],
      ar: [
        { label: "فريق تطوير مخصص", action: "intent_trigger", payload: "staff_pod_deep" },
        { label: "التحدث مع مختص", action: "progressive_lead", payload: "Staff Augmentation Inquiry" },
      ],
    },
  },

  {
    id: "staff_pod_deep",
    intentLevel: "MODERATE_BUYING",
    associatedServiceSlug: "training-staff-augmentation",
    keywords: ["dedicated developer pod", "staff_pod_deep"],
    response: {
      en: "Understood. Our developer pods integrate directly into your sprint cycles, managed with strict delivery SLAs and modern code standards.\n\nTraining & Staff Augmentation covers this model.\n\nWould you like to review how our talent pods work?",
      hi: "समझ गया। हमारे डेवलपर पॉड सीधे आपके स्प्रिंट चक्रों में एकीकृत होते हैं।\n\nक्या आप देखना चाहेंगे कि हमारी टैलेंट टीम कैसे काम करती है?",
      de: "Verstanden. Unsere Entwickler-Pods integrieren sich direkt in Ihre Sprint-Zyklen mit strengen Qualitätsstandards.\n\nMöchten Sie erfahren, wie unsere Talent-Pods funktionieren?",
      ar: "فهمت ذلك. تنضم فرقنا الفنية مباشرة إلى دورات العمل الخاصة بك مع الالتزام بأعلى معايير الجودة.\n\nهل ترغب في معرفة كيفية عمل كفاءاتنا؟",
    },
    options: {
      en: [
        { label: "Show Staff Augmentation overview →", action: "show_service_link", route: "/services/training-staff-augmentation" },
        { label: "Request talent profiles →", action: "progressive_lead", payload: "Talent Pod Request" },
      ],
      hi: [
        { label: "टीम विस्तार विवरण देखें →", action: "show_service_link", route: "/services/training-staff-augmentation" },
        { label: "डेवलपर्स का अनुरोध करें →", action: "progressive_lead", payload: "Talent Pod Request" },
      ],
      de: [
        { label: "Staff Augmentation Übersicht anzeigen →", action: "show_service_link", route: "/services/training-staff-augmentation" },
        { label: "Talentprofile anfordern →", action: "progressive_lead", payload: "Talent Pod Request" },
      ],
      ar: [
        { label: "عرض تفاصيل دعم الكفاءات →", action: "show_service_link", route: "/services/training-staff-augmentation" },
        { label: "طلب ملفات الكفاءات →", action: "progressive_lead", payload: "Talent Pod Request" },
      ],
    },
  },

  // 12. PRODUCTS & PLATFORMS
  {
    id: "products_overview",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "products", "platforms", "software products", "what products do you have",
      "astrobeams", "astrobeams ai", "omnigrc", "product list", "software solutions",
      "produktübersicht", "produkte", "product catalog"
    ],
    response: {
      en: "Arav Innovations powers specialized proprietary platforms including AstroBeams AI (AI cosmic guidance & spiritual consultations), AstroBeams (live astrologer advisory), and OMNiGRC (enterprise risk & compliance SaaS).\n\nWould you like to know more about AstroBeams, OMNiGRC, or another platform?",
      hi: "आरव इनोवेशन विशेष प्लेटफॉर्म विकसित करता है जैसे एस्ट्रोबीम्स एआई (एआई आध्यात्मिक मार्गदर्शन), एस्ट्रोबीम्स (लाइव ज्योतिषी परामर्श), और ओएमएनआईजीआरसी (एंटरप्राइज रिस्क एवं अनुपालन SaaS)।\n\nक्या आप एस्ट्रोबीम्स या OMNiGRC के बारे में अधिक जानना चाहेंगे?",
      de: "Arav Innovations entwickelt eigene spezialisierte Plattformen wie AstroBeams AI (KI-Spiritualität), AstroBeams (Live-Astrologen-Beratung) und OMNiGRC (Enterprise GRC SaaS).\n\nMöchten Sie mehr über AstroBeams oder OMNiGRC erfahren?",
      ar: "تطور آراف إينوفيشينز منصات مخصصة مثل AstroBeams AI و AstroBeams و OMNiGRC للحوكمة والمخاطر.\n\nهل ترغب في معرفة المزيد عن AstroBeams أم OMNiGRC؟",
    },
    options: {
      en: [
        { label: "AstroBeams AI", action: "intent_trigger", payload: "astrobeams_ai_info" },
        { label: "AstroBeams Store", action: "intent_trigger", payload: "astrobeams_store_info" },
        { label: "OMNiGRC SaaS Platform", action: "intent_trigger", payload: "omnigrc_info" },
      ],
      hi: [
        { label: "एस्ट्रोबीम्स एआई (AstroBeams AI)", action: "intent_trigger", payload: "astrobeams_ai_info" },
        { label: "एस्ट्रोबीम्स स्टोर (AstroBeams)", action: "intent_trigger", payload: "astrobeams_store_info" },
        { label: "OMNiGRC प्लेटफॉर्म", action: "intent_trigger", payload: "omnigrc_info" },
      ],
      de: [
        { label: "AstroBeams AI", action: "intent_trigger", payload: "astrobeams_ai_info" },
        { label: "AstroBeams Live-Beratung", action: "intent_trigger", payload: "astrobeams_store_info" },
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
      en: "AstroBeams AI (astrobeams.in) is an AI-powered astrology and spiritual guidance platform that delivers 24/7 personalized cosmic guidance, horoscope analysis, and instant PDF life reports.\n\nWould you like to check out the AstroBeams AI product details?",
      hi: "एस्ट्रोबीम्स एआई (astrobeams.in) एक एआई-संचालित प्लेटफॉर्म है जो 24/7 वैयक्तिकृत ज्योतिषीय मार्गदर्शन और तुरंत पीडीएफ लाइफ रिपोर्ट प्रदान करता है।\n\nक्या आप एस्ट्रोबीम्स एआई विवरण देखना चाहेंगे?",
      de: "AstroBeams AI (astrobeams.in) ist eine KI-gestützte Astrologie-Plattform für 24/7 personalisierte Analysen und PDF-Berichte.\n\nMöchten Sie die Produktdetails ansehen?",
      ar: "AstroBeams AI منصة توفر استشارات فلكية فورية بواسطة الذكاء الاصطناعي وتقارير شاملة 24/7.\n\nهل ترغب في استكشاف المنصة؟",
    },
    options: {
      en: [
        { label: "Explore Product Page →", action: "show_service_link", route: "/products/astrobeams-ai" },
        { label: "Visit astrobeams.in ↗", action: "navigate", route: "https://astrobeams.in" },
      ],
      hi: [
        { label: "उत्पाद विवरण देखें →", action: "show_service_link", route: "/products/astrobeams-ai" },
      ],
      de: [
        { label: "Produktseite anzeigen →", action: "show_service_link", route: "/products/astrobeams-ai" },
      ],
      ar: [
        { label: "صفحة المنتج →", action: "show_service_link", route: "/products/astrobeams-ai" },
      ],
    },
  },

  {
    id: "astrobeams_store_info",
    intentLevel: "INFORMATIONAL",
    associatedProductSlug: "astrobeams",
    keywords: ["astrobeams", "astrobeams.store", "astrobeams_store_info"],
    response: {
      en: "AstroBeams (astrobeams.store) connects users with verified, expert astrologers for live 24/7 chat and voice consultations for career, relationships, and birth chart remedies.\n\nWould you like to view the platform breakdown?",
      hi: "एस्ट्रोबीम्स (astrobeams.store) उपयोगकर्ताओं को 24/7 लाइव चैट और कॉल पर प्रमाणित ज्योतिषियों से जोड़ता है।\n\nक्या आप प्लेटफ़ॉर्म विवरण देखना चाहेंगे?",
      de: "AstroBeams (astrobeams.store) verbindet Nutzer 24/7 per Live-Chat und Anruf mit zertifizierten Experten.\n\nMöchten Sie die Übersicht ansehen?",
      ar: "منصة AstroBeams تربط المستخدمين بمتخصصين معتمدين للاستشارات المباشرة عبر الصوت والمحادثة.\n\nهل ترغب في عرض التفاصيل؟",
    },
    options: {
      en: [
        { label: "Explore Product Page →", action: "show_service_link", route: "/products/astrobeams" },
        { label: "Visit astrobeams.store ↗", action: "navigate", route: "https://astrobeams.store" },
      ],
      hi: [
        { label: "उत्पाद विवरण देखें →", action: "show_service_link", route: "/products/astrobeams" },
      ],
      de: [
        { label: "Produktseite anzeigen →", action: "show_service_link", route: "/products/astrobeams" },
      ],
      ar: [
        { label: "صفحة المنتج →", action: "show_service_link", route: "/products/astrobeams" },
      ],
    },
  },

  {
    id: "omnigrc_info",
    intentLevel: "INFORMATIONAL",
    associatedProductSlug: "omnigrc",
    keywords: ["omnigrc", "omnigrc.vercel.app", "omnigrc_info"],
    response: {
      en: "OMNiGRC is an enterprise Governance, Risk & Compliance (GRC) SaaS solution designed to automate compliance tracking across DPDP, SOC-2, ISO 27001, and GDPR.\n\nWould you like to learn more about early beta access for OMNiGRC?",
      hi: "OMNiGRC एक एंटरप्राइज GRC SaaS समाधान है जो DPDP, SOC-2 और ISO 27001 के तहत अनुपालन ट्रैकिंग को ऑटोमेट करता है।\n\nक्या आप बीटा एक्सेस के बारे में अधिक जानना चाहते हैं?",
      de: "OMNiGRC ist eine Enterprise GRC SaaS-Lösung zur Automatisierung von Compliance für DPDP, SOC-2, ISO 27001 und DSGVO.\n\nMöchten Sie mehr über den Beta-Zugang erfahren?",
      ar: "OMNiGRC هي منصة SaaS لإدارة الحوكمة والمخاطر والامتثال لقوانين DPDP و SOC-2 و ISO 27001.\n\nهل ترغب في معرفة المزيد عن النسخة التجريبية؟",
    },
    options: {
      en: [
        { label: "Explore OMNiGRC Details →", action: "show_service_link", route: "/products/omnigrc" },
        { label: "Join Beta Waitlist", action: "progressive_lead", payload: "OMNiGRC Beta Access" },
      ],
      hi: [
        { label: "OMNiGRC विवरण देखें →", action: "show_service_link", route: "/products/omnigrc" },
        { label: "बीटा सूची में शामिल हों", action: "progressive_lead", payload: "OMNiGRC Beta Access" },
      ],
      de: [
        { label: "OMNiGRC-Details anzeigen →", action: "show_service_link", route: "/products/omnigrc" },
        { label: "Zur Beta-Warteliste anmelden", action: "progressive_lead", payload: "OMNiGRC Beta Access" },
      ],
      ar: [
        { label: "تفاصيل OMNiGRC →", action: "show_service_link", route: "/products/omnigrc" },
      ],
    },
  },

  // 13. REGIONAL PRESENCE / LOCATIONS
  {
    id: "regional_presence",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "which regions do you serve", "locations", "india", "uae", "dubai", "where are you located",
      "where is arav based", "office locations", "middle east operations", "gurgaon", "standorte"
    ],
    response: {
      en: "We maintain dual strategic hubs:\n\n• India HQ: Platinum Floor, Ardee City, Gurgaon, Haryana\n• UAE Office: IFZA Business Park, Dubai Silicon Oasis, Dubai\n\nWe serve clients across the Middle East, Asia, Europe, and global markets.",
      hi: "हमारे दो मुख्य कार्यालय हैं:\n\n• भारत मुख्यालय: अर्डी सिटी, गुरुग्राम\n• यूएई कार्यालय: दुबई सिलिकॉन ओएसिस, दुबई",
      de: "Wir betreiben zwei strategische Hauptstandorte:\n\n• Indien HQ: Gurgaon, Haryana\n• VAE Büro: Dubai Silicon Oasis, Dubai",
      ar: "تمتلك آراف مركزين إقليميين:\n\n• المقر الرئيسي: جورجاون (الهند)\n• المكتب الإقليمي: واحة دبي للسيليكون (الإمارات)",
    },
    options: {
      en: [
        { label: "Contact Us →", action: "navigate", route: "/contact" },
        { label: "Explore Practices →", action: "intent_trigger", payload: "services_overview" },
      ],
      hi: [
        { label: "संपर्क करें →", action: "navigate", route: "/contact" },
      ],
      de: [
        { label: "Kontakt aufnehmen →", action: "navigate", route: "/contact" },
      ],
      ar: [
        { label: "التواصل معنا →", action: "navigate", route: "/contact" },
      ],
    },
  },

  // 14. CONTACT & CONSULTATION INTENT
  {
    id: "contact_sales",
    intentLevel: "STRONG_BUYING",
    keywords: [
      "talk to someone", "speak with your team", "speak with team", "consultation", "quote",
      "contact", "talk to sales", "book a call", "schedule consultation", "how do i contact you",
      "call", "phone", "email", "reach out", "start a project", "talk to our team", "kontakt",
      "talk to consultant", "connect with specialist"
    ],
    response: {
      en: "I'd be happy to connect you with an Arav technical specialist.\n\nTo make sure we get the right consultant to reach out, what company or organization are you representing?",
      hi: "मुझे आपको आरव तकनीकी विशेषज्ञ से जोड़कर खुशी होगी।\n\nसही सलाहकार से संपर्क कराने के लिए, आप किस कंपनी या संगठन का प्रतिनिधित्व कर रहे हैं?",
      de: "Ich verbinde Sie gerne mit einem Arav-Spezialisten.\n\nFür welches Unternehmen oder welche Organisation sind Sie tätig?",
      ar: "يسعدني توصيلك بمختص فني من آراف.\n\nما اسم الشركة أو المؤسسة التي تمثلها؟",
    },
    triggerLeadForm: true,
  },

  // 15. PRICING & COST INTENT
  {
    id: "pricing_cost",
    intentLevel: "MODERATE_BUYING",
    keywords: [
      "cost", "price", "pricing", "rates", "how much", "how much does it cost", "what's your pricing",
      "how much do you charge", "budget", "quote", "preise", "kosten", "kitna kharcha hoga"
    ],
    response: {
      en: "Project investment depends on scope, technical complexity, and timeline requirements.\n\nWe provide tailored proposals after an initial discovery session to ensure clear deliverables and ROI.\n\nWould you like to share a quick summary of what you're planning to build or optimize?",
      hi: "परियोजना का निवेश कार्यक्षेत्र, तकनीकी जटिलता और समय सीमा पर निर्भर करता है। हम स्पष्ट डिलिवरेबल्स सुनिश्चित करने के लिए कस्टम प्रस्ताव प्रदान करते हैं।\n\nक्या आप संक्षेप में बताना चाहेंगे कि आप क्या बनाने की योजना बना रहे हैं?",
      de: "Die Projektkosten hängen vom Umfang, der Komplexität und dem Zeitrahmen ab.\n\nNach einem Erstgespräch erstellen wir ein maßgeschneidertes Angebot.\n\nMöchten Sie kurz beschreiben, was Sie planen?",
      ar: "تعتمد التكلفة على نطاق المشروع والمتطلبات التقنية.\n\nنقدم عروض أسعار مخصصة بعد جلسة فهم المتطلبات الأولى.\n\nهل ترغب في مشاركة ملخص سريع لما تخطط لبنائه؟",
    },
    options: {
      en: [
        { label: "Connect with an Arav specialist", action: "progressive_lead", payload: "Pricing & Scope Inquiry" },
        { label: "Explore Practices first", action: "intent_trigger", payload: "services_overview" },
      ],
      hi: [
        { label: "विशेषज्ञ से जुड़ें", action: "progressive_lead", payload: "Pricing & Scope Inquiry" },
      ],
      de: [
        { label: "Mit Spezialisten verbinden", action: "progressive_lead", payload: "Pricing & Scope Inquiry" },
      ],
      ar: [
        { label: "التواصل مع مختص", action: "progressive_lead", payload: "Pricing & Scope Inquiry" },
      ],
    },
  },
];

// Initialize Fuse.js for fuzzy pattern matching & typo resilience
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
  detectedProduct?: string;
} | null {
  const normQ = normalizeQuery(query);
  if (!normQ) return null;

  const langKey = (locale === "hi" ? "hi" : locale === "de" ? "de" : locale === "ar" ? "ar" : "en") as "en" | "hi" | "de" | "ar";

  // 1. Direct Keyword Match: Find intent with longest keyword overlap
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
    let text = intent.response[langKey] || intent.response.en;

    // Inject stored user name naturally if available
    if (sessionContext?.userName && !text.includes("👋")) {
      const prefix = langKey === "hi"
        ? `${sessionContext.userName}, `
        : langKey === "de"
        ? `Gut, ${sessionContext.userName}. `
        : langKey === "ar"
        ? `حسناً ${sessionContext.userName}، `
        : `Got it, ${sessionContext.userName}. `;
      if (Math.random() < 0.4) {
        text = `${prefix}${text}`;
      }
    }

    return {
      intent,
      responseText: text,
      isLeadForm: intent.triggerLeadForm || intent.intentLevel === "STRONG_BUYING",
      detectedService: intent.associatedServiceSlug,
      detectedProduct: intent.associatedProductSlug,
    };
  }

  // 2. Fuzzy Matching Fallback via Fuse.js
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
