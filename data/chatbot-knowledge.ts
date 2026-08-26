import Fuse from "fuse.js";

export interface ChatbotIntentOption {
  label: string;
  action: "service_lookup" | "intent_trigger" | "all_services" | "locations" | "start_project" | "navigate";
  payload?: string;
  route?: string;
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
  mentionedBudget?: string;
  history: string[];
}

export const WARM_OPENERS = {
  en: [
    "Great question! Let me help you with that. ",
    "Absolutely, let me share some details. ",
    "That's a perfect question. ",
    "I'm glad you asked! ",
    "Here is what we typically recommend: ",
  ],
  hi: [
    "बहुत अच्छा सवाल! मुझे आपको इसमें मदद करने दें। ",
    "बिल्कुल, मैं कुछ विवरण साझा करता हूं। ",
    "यह एक बेहतरीन सवाल है। ",
    "मुझे खुशी है कि आपने पूछा! ",
    "यहां बताया गया है कि हम आमतौर पर क्या सलाह देते हैं: ",
  ],
  ar: [
    "سؤال ممتاز! دعني أساعدك في ذلك. ",
    "بالتأكيد، يسعدني مشاركة التفاصيل. ",
    "هذا سؤال في محله تماماً. ",
    "يسرني أنك سألت عن هذا! ",
    "إليك ما نوصي به عادةً: ",
  ],
};

export const CASUAL_FOLLOWUPS = {
  en: [
    "Does that help?",
    "Anything else you'd like to know?",
    "Feel free to ask anything else!",
    "Happy to dive deeper if needed.",
  ],
  hi: [
    "क्या इससे आपको मदद मिली?",
    "क्या आप कुछ और जानना चाहते हैं?",
    "बेझिझक कुछ भी और पूछें!",
    "यदि आवश्यकता हो तो अधिक विवरण देने में खुशी होगी।",
  ],
  ar: [
    "هل كان هذا مفيداً؟",
    "هل هناك أي شيء آخر تود معرفته؟",
    "لا تتردد في طرح أي سؤال آخر!",
    "يسعدني تقديم المزيد من التفاصيل إذا أردت.",
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
      en: "Hey! 👋 Welcome to Arav Innovations. I'm your AI strategy assistant. How can I help answer questions about our services, team, or project engagement today?",
      hi: "नमस्ते! 👋 आरव इनोवेशन में आपका स्वागत है। मैं आपका एआई रणनीति सहायक हूँ। आज मैं आपकी सेवाओं, टीम या परियोजना के बारे में कैसे मदद कर सकता हूँ?",
      ar: "مرحباً بك! 👋 في آراف إينوفيشينز. أنا مساعدك الاستراتيجي. كيف يمكنني مساعدتك في الإجابة عن استفساراتك حول خدماتنا أو فريقنا اليوم؟",
    },
    options: {
      en: [
        { label: "Explore Practices", action: "all_services" },
        { label: "Start a Project", action: "start_project" },
        { label: "Office Locations", action: "locations" },
      ],
      hi: [
        { label: "सेवाएं देखें", action: "all_services" },
        { label: "प्रोजेक्ट शुरू करें", action: "start_project" },
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
      "what servises do yu offer", "wht servises do yu offer", "services do you offer", "services offered"
    ],
    response: {
      en: "We operate 7 core practices: (1) IT Strategy & Consulting, (2) Web & App Development, (3) Digital Marketing & SEO, (4) Risk & DPDP Governance, (5) System Audit & FinOps, (6) Dedicated Engineering Pods, and (7) AI & Automation Solutions. Which area interests you most?",
      hi: "हम 7 मुख्य सेवाएं प्रदान करते हैं: (1) आईटी रणनीति, (2) वेब एवं ऐप डेवलपमेंट, (3) डिजिटल मार्केटिंग एवं एसईओ, (4) जोखिम एवं DPDP गवर्नेंस, (5) सिस्टम ऑडिट एवं परफॉरमेंस, (6) समर्पित टीम, और (7) एआई समाधान। आपको किस क्षेत्र में सबसे ज्यादा रुचि है?",
      ar: "نقدم 7 خدمات رئيسية: (1) استراتيجية التقنية، (2) تطوير الويب والموبايل، (3) التسويق الرقمي و SEO، (4) الامتثال والسطوة، (5) تدقيق الأنظمة والأداء، (6) الفرق المخصصة، و (7) حلول الذكاء الاصطناعي. أي مجال يهمك أكثر؟",
    },
    options: {
      en: [
        { label: "Web & App Dev", action: "service_lookup", payload: "web-app-development" },
        { label: "IT Strategy", action: "service_lookup", payload: "it-strategy-consulting" },
        { label: "Digital Marketing", action: "service_lookup", payload: "digital-marketing" },
        { label: "Risk & Compliance", action: "service_lookup", payload: "risk-governance-compliance" },
      ],
      hi: [
        { label: "वेब एवं ऐप विकास", action: "service_lookup", payload: "web-app-development" },
        { label: "आईटी रणनीति", action: "service_lookup", payload: "it-strategy-consulting" },
        { label: "डिजिटल मार्केटिंग", action: "service_lookup", payload: "digital-marketing" },
        { label: "जोखिम एवं अनुपालन", action: "service_lookup", payload: "risk-governance-compliance" },
      ],
      ar: [
        { label: "تطوير الويب والموبايل", action: "service_lookup", payload: "web-app-development" },
        { label: "استراتيجية التقنية", action: "service_lookup", payload: "it-strategy-consulting" },
        { label: "التسويق الرقمي", action: "service_lookup", payload: "digital-marketing" },
        { label: "الحوكمة والامتثال", action: "service_lookup", payload: "risk-governance-compliance" },
      ],
    },
  },

  // 3. PRICING & COST
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
      en: "Pricing varies by project scope. Our common models include: Project-based Fixed Sprints, Monthly Engineering Retainers, Strategic Advisory, and Custom Pods. Tell us about your project requirements and we can discuss exact options.",
      hi: "कीमत परियोजना के दायरे के आधार पर अलग-अलग होती है। मुख्य मॉडल: प्रोजेक्ट-आधारित फिक्स्ड स्प्रिंट, मासिक इंजीनियरिंग रिटेनर, परामर्श, और कस्टम टीम। अपनी जरूरतें बताएं ताकि हम सटीक विकल्पों पर चर्चा कर सकें।",
      ar: "تختلف الأسعار حسب نطاق المشروع. النماذج الشائعة: بالمشروع المحدد، اشتراك شهري للهندسة، استشارات استراتيجية، أو فرق مخصصة. شاركنا متطلباتك لنحدد الخيارات المناسبة.",
    },
    options: {
      en: [
        { label: "Discuss Your Scope", action: "start_project" },
        { label: "View Practice Services", action: "navigate", route: "/services" },
      ],
      hi: [
        { label: "दायरे पर चर्चा करें", action: "start_project" },
        { label: "सेवाएं देखें", action: "navigate", route: "/services" },
      ],
      ar: [
        { label: "مناقشة متطلباتك", action: "start_project" },
        { label: "عرض جميع الخدمات", action: "navigate", route: "/services" },
      ],
    },
    triggerLeadForm: false,
  },

  // 4. TIMELINE & PROCESS
  {
    id: "timeline_process",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "timeline", "how long", "process", "how do you work", "timeline process", "fast delivery",
      "how long does a project take", "what's your timeline", "how fast can you deliver",
      "when can you start", "what's your process", "walk me through your approach", "methodology",
      "delivery schedule", "development timeline", "implementation cycle"
    ],
    response: {
      en: "We follow a structured 5-step approach: Understand → Strategize → Implement → Optimize → Deliver. Timelines depend on complexity (e.g., MVPs in 4-6 weeks, Enterprise portals in 8-12 weeks). Would you like to discuss your specific timeline?",
      hi: "हम 5-चरणीय दृष्टिकोण का पालन करते हैं: समझें → रणनीति बनाएं → लागू करें → अनुकूलित करें → डिलीवर करें। समय-सीमा जटिलता पर निर्भर करती है (उदा. MVP 4-6 हफ्तों में)। क्या आप अपनी विशिष्ट समय-सीमा पर चर्चा करना चाहते हैं?",
      ar: "نتبع منهجية محددة من 5 خطوات: الفهم ← الاستراتيجية ← التنفيذ ← التحسين ← التسليم. تختلف المدة حسب حجم المشروع (مثل MVP خلال 4-6 أسابيع). هل ترغب في مناقشة جدولك الزمني؟",
    },
    options: {
      en: [
        { label: "Talk to an Expert", action: "start_project" },
        { label: "Explore Case Studies", action: "navigate", route: "/case-studies" },
      ],
      hi: [
        { label: "विशेषज्ञ से बात करें", action: "start_project" },
        { label: "केस स्टडीज देखें", action: "navigate", route: "/case-studies" },
      ],
      ar: [
        { label: "التحدث مع خبير", action: "start_project" },
        { label: "استعراض دراسات الحالة", action: "navigate", route: "/case-studies" },
      ],
    },
  },

  // 5. INDUSTRIES & USE CASES
  {
    id: "industries_usecases",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "fintech", "healthcare", "ecommerce", "industry", "sectors", "clients", "startups", "enterprise",
      "do you work with fintech", "can you help healthcare companies", "do you serve e-commerce",
      "what industries do you specialize in", "who are your typical clients", "have you worked on projects like mine",
      "do you work with startups", "can you help enterprises", "what sectors have you worked in", "domain expertise"
    ],
    response: {
      en: "We work across Financial Technology (FinTech), Healthcare & Life Sciences, E-Commerce & Retail, SaaS Platforms, and Enterprise Operations. Tell us about your industry so we can tailor relevant architectural solutions.",
      hi: "हम फिनटेक (FinTech), स्वास्थ्यसेवा, ई-कॉमर्स, सास (SaaS) प्लेटफॉर्म और एंटरप्राइज में काम करते हैं। अपने उद्योग का नाम बताएं ताकि हम प्रासंगिक आर्किटेक्चर समाधान दे सकें।",
      ar: "نعمل عبر القطاعات المالية (FinTech)، الرعاية الصحية، التجارة الإلكترونية، المنصات السحابية SaaS، والمؤسسات الكبرى. أخبرنا عن قطاعك لنقدم لك معلومات مخصصة.",
    },
    options: {
      en: [
        { label: "Share Your Industry", action: "start_project" },
        { label: "View Case Studies", action: "navigate", route: "/case-studies" },
      ],
      hi: [
        { label: "अपना उद्योग बताएं", action: "start_project" },
        { label: "केस स्टडी देखें", action: "navigate", route: "/case-studies" },
      ],
      ar: [
        { label: "شاركنا قطاعك", action: "start_project" },
        { label: "عرض دراسات الحالة", action: "navigate", route: "/case-studies" },
      ],
    },
  },

  // 6. CASE STUDIES & PROOF
  {
    id: "case_studies_proof",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "case study", "proof", "portfolio", "past work", "examples", "track record", "success stories",
      "show me your work", "do you have case studies", "what's your track record", "can i see examples",
      "what have you built", "any success stories", "show me your portfolio", "previous projects", "client results"
    ],
    response: {
      en: "We have documented case studies covering high-scale FinTech migrations (99.99% SLA), SaaS subsecond platforms (65% latency drop), and DPDP compliance audits. Visit /case-studies to read detailed breakdowns.",
      hi: "हमारे पास उच्च-स्तरीय फिनटेक माइग्रेशन (99.99% SLA), SaaS प्लेटफॉर्म (65% लेटेंसी कमी) और DPDP अनुपालन पर केस स्टडीज हैं। विस्तृत जानकारी के लिए /case-studies देखें।",
      ar: "لدينا دراسات حالة موثقة تشمل نقل التكنولوجيا المالية بنسبة توفر 99.99%، وتقليل زمن الاستجابة بنسبة 65%، وتدقيق الامتثال. تفضل بزيارة /case-studies.",
    },
    options: {
      en: [
        { label: "Explore Case Studies", action: "navigate", route: "/case-studies" },
        { label: "Discuss Your Project", action: "start_project" },
      ],
      hi: [
        { label: "केस स्टडीज देखें", action: "navigate", route: "/case-studies" },
        { label: "प्रोजेक्ट पर चर्चा करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض دراسات الحالة", action: "navigate", route: "/case-studies" },
        { label: "مناقشة مشروعك", action: "start_project" },
      ],
    },
  },

  // 7. TEAM & COMPANY BACKGROUND
  {
    id: "team_company",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "who are you", "about company", "team", "who founded", "locations", "company size", "experience",
      "tell me about your team", "how big is your company", "where are you located", "who founded arav",
      "how many people do you have", "what's your experience", "about arav", "company overview", "founders"
    ],
    response: {
      en: "Arav Innovations is a multidisciplinary technology & strategy firm based in India (Gurgaon HQ) & UAE (Dubai) with specialists across engineering, marketing, governance, and audit. We help enterprises scale globally.",
      hi: "आरव इनोवेशन एक बहुविषयक प्रौद्योगिकी एवं रणनीति फर्म है जिसका मुख्यालय गुरुग्राम (भारत) और दुबई (यूएई) में है। हम विश्व स्तर पर उद्यमों को स्केल करने में मदद करते हैं।",
      ar: "آراف إينوفيشينز هي شركة تكنولوجيا واستراتيجية متكاملة تقع في الهند (المقر الرئيسي في جورجاون) والإمارات (دبي) وتساعد الشركات على التوسع عالمياً.",
    },
    options: {
      en: [
        { label: "About Us Page", action: "navigate", route: "/about" },
        { label: "Contact Directors", action: "navigate", route: "/contact" },
      ],
      hi: [
        { label: "हमारे बारे में पढ़ें", action: "navigate", route: "/about" },
        { label: "संपर्क पेज देखें", action: "navigate", route: "/contact" },
      ],
      ar: [
        { label: "عن الشركة", action: "navigate", route: "/about" },
        { label: "صفحة التواصل", action: "navigate", route: "/contact" },
      ],
    },
  },

  // 8. CONTACT & GETTING STARTED
  {
    id: "contact_getting_started",
    intentLevel: "STRONG_BUYING",
    keywords: [
      "contact", "reach you", "get started", "how to start", "call", "phone", "email", "partner",
      "how do i reach you", "what's your contact info", "how do i get started", "how do we work together",
      "can we set up a call", "i want to partner with you", "contact details", "phone number", "email address",
      "book a call", "schedule consultation"
    ],
    response: {
      en: "Great! You can get started right now by: (1) Filling out the quick inquiry form below, (2) Calling our team at +91 96506 25777, or (3) Emailing support@aravinnovations.com. Which works best?",
      hi: "बहुत बढ़िया! आप अभी शुरुआत कर सकते हैं: (1) नीचे दिया गया फॉर्म भरकर, (2) +91 96506 25777 पर कॉल करके, या (3) support@aravinnovations.com पर ईमेल करके। आपके लिए क्या सबसे अच्छा रहेगा?",
      ar: "ممتاز! يمكنك البدء الآن عبر: (1) تعبئة نموذج الاستفسار السريع أدناه، (2) الاتصال بنا على +91 96506 25777، أو (3) مراسلتنا على support@aravinnovations.com. ما الأنسب لك؟",
    },
    triggerLeadForm: true,
  },

  // 9. OBJECTION HANDLING & WHY ARAV
  {
    id: "objection_why_arav",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "why choose you", "why arav", "differentiators", "unique value", "competitors", "convince me",
      "i'm not sure if you can help", "we've worked with another agency", "why should i choose you over competitors",
      "what makes you different", "what's your unique value", "why work with arav", "competitive advantage"
    ],
    response: {
      en: "Our key differentiators: Hands-on senior engineering leadership, transparent fixed-scope sprints, strict DPDP/SOC-2 compliance frameworks, and zero fluff. We focus on measurable business ROI.",
      hi: "हमारी मुख्य विशेषताएं: वरिष्ठ इंजीनियरिंग नेतृत्व, पारदर्शी फिक्स्ड स्प्रिंट, सख्त DPDP/SOC-2 अनुपालन ढांचा और 100% स्पष्टता। हम मापने योग्य ROI पर ध्यान केंद्रित करते हैं।",
      ar: "ما يميزنا: قيادة هندسية خبيرة، تنفيذ شفاف بنظام المواعيد المحددة، والالتزام التام بأطر حماية البيانات. نحن نركز على تحقيق عائد استثماري ملموس.",
    },
    options: {
      en: [
        { label: "Talk to Leadership", action: "start_project" },
        { label: "View Our Services", action: "navigate", route: "/services" },
      ],
      hi: [
        { label: "नेतृत्व से बात करें", action: "start_project" },
        { label: "हमारी सेवाएं देखें", action: "navigate", route: "/services" },
      ],
      ar: [
        { label: "التحدث مع الإدارة", action: "start_project" },
        { label: "عرض خدماتنا", action: "navigate", route: "/services" },
      ],
    },
  },

  // 10. DIRECT BUYING INTENT
  {
    id: "buying_intent",
    intentLevel: "STRONG_BUYING",
    keywords: [
      "start a project", "hire", "i need a website", "can you build", "talk to someone", "contact us",
      "i want to work with you", "let's partner", "i want a quote", "i'm ready to hire", "send me a proposal",
      "let's discuss a project", "hire your team", "need to build app now", "request quote", "let's start",
      "hire your team to build a web app", "hire team", "build a web app", "want to hire"
    ],
    response: {
      en: "Fantastic! Please fill out the brief project form below so our senior director can evaluate your requirements and reach out within 1 business day under NDA.",
      hi: "बहुत बढ़िया! कृपया नीचे दिए गए छोटे फॉर्म को भरें ताकि हमारे वरिष्ठ निदेशक आपकी आवश्यकताओं की समीक्षा कर 1 कार्य दिवस में संपर्क कर सकें।",
      ar: "رائع! يرجى ملء النموذج السريع أدناه وسيقوم مديرنا التنفيذي بمراجعة طلبك والتواصل معك خلال يوم عمل واحد تحت اتفاقية عدم الإفصاح.",
    },
    triggerLeadForm: true,
  },

  // 11. WEB & APP DEVELOPMENT
  {
    id: "web_app_dev",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "web-app-development",
    keywords: [
      "website", "web development", "build app", "frontend", "backend", "next.js", "react",
      "do you do web development", "can you build an app", "need a website", "subsecond web apps",
      "saas portal development", "custom software engineering", "mobile app dev", "वेबसाइट निर्माण", "ऐप डेवलपमेंट"
    ],
    response: {
      en: "Our Web & App Engineering team builds subsecond Next.js web portals, multi-tenant SaaS platforms, microservices, and native mobile apps designed for high scale and security.",
      hi: "हमारी वेब एवं ऐप इंजीनियरिंग टीम सब-सेकंड Next.js वेब पोर्टल, मल्टी-टैलेंट SaaS प्लेटफॉर्म, और मोबाइल ऐप बनाती है।",
      ar: "يبني فريق تطوير الويب والتطبيقات لدينا منصات Next.js فائقة السرعة، وبوابات SaaS، وتطبيقات جوال تتميز بالأمان والتوسع العالي.",
    },
    options: {
      en: [
        { label: "View Web Dev Scope", action: "navigate", route: "/services/web-app-development" },
        { label: "Start a Web Project", action: "start_project" },
      ],
      hi: [
        { label: "वेब सेवा विवरण देखें", action: "navigate", route: "/services/web-app-development" },
        { label: "प्रोजेक्ट शुरू करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض تفاصيل خدمة الويب", action: "navigate", route: "/services/web-app-development" },
        { label: "بدء مشروع", action: "start_project" },
      ],
    },
  },

  // 12. IT STRATEGY & CONSULTING
  {
    id: "it_strategy",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "it-strategy-consulting",
    keywords: [
      "it strategy", "cloud migration", "architecture", "cto", "legacy modernization",
      "do you offer consulting", "do you work on cloud migration", "aws azure gcp roadmap",
      "cto advisory", "infrastructure audit", "आईटी रणनीति", "क्लाउड"
    ],
    response: {
      en: "We partner with CTOs and enterprise directors to modernize legacy codebases, design zero-trust multi-cloud roadmaps (AWS/Azure/GCP), and optimize technical infrastructure overhead.",
      hi: "हम CTO और एंटरप्राइज निदेशकों के साथ मिलकर लेगेसी कोडबेस का आधुनिकीकरण करते हैं और जीरो-ट्रस्ट मल्टी-क्लाउड रोडमैप तैयार करते हैं।",
      ar: "نشترك مع مدراء التكنولوجيا التنفيذيين لتحديث الأنظمة القديمة وتصميم خطط العمل السحابية الآمنة (AWS/Azure/GCP).",
    },
    options: {
      en: [
        { label: "View Strategy Scope", action: "navigate", route: "/services/it-strategy-consulting" },
        { label: "Schedule Advisory Call", action: "start_project" },
      ],
      hi: [
        { label: "रणनीति दायरा देखें", action: "navigate", route: "/services/it-strategy-consulting" },
        { label: "परामर्श कॉल तय करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض نطاق الاستراتيجية", action: "navigate", route: "/services/it-strategy-consulting" },
        { label: "حجز مكالمة استشارية", action: "start_project" },
      ],
    },
  },

  // 13. DIGITAL MARKETING & SEO
  {
    id: "digital_marketing",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "digital-marketing",
    keywords: [
      "marketing", "seo", "digital marketing", "leads", "google ads", "linkedin ads", "traffic",
      "can you help with digital marketing", "seo services", "b2b lead generation",
      "search engine optimization", "marketing funnel growth", "डिजिटल मार्केटिंग", "एसईओ"
    ],
    response: {
      en: "We engineer high-intent B2B demand generation campaigns across LinkedIn & Search, supported by technical SEO audits, landing page CRO, and closed-loop conversion modeling.",
      hi: "हम LinkedIn और Google खोज पर उच्च-इरादे वाले B2B डिमांड जनरेशन अभियान चलाते हैं, जो तकनीकी SEO ऑडिट और रूपांतरण दर अनुकूलन द्वारा समर्थित हैं।",
      ar: "نصمم حملات استقطاب العملاء للشركات B2B عبر LinkedIn و Google Search مع تحسين محركات البحث وتقارير تحويل المبيعات.",
    },
    options: {
      en: [
        { label: "View Marketing Scope", action: "navigate", route: "/services/digital-marketing" },
        { label: "Request Growth Audit", action: "start_project" },
      ],
      hi: [
        { label: "मार्केटिंग दायरा देखें", action: "navigate", route: "/services/digital-marketing" },
        { label: "ग्रोथ ऑडिट का अनुरोध करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض خدمة التسويق", action: "navigate", route: "/services/digital-marketing" },
        { label: "طلب تدقيق التسويق", action: "start_project" },
      ],
    },
  },

  // 14. RISK GOVERNANCE & DPDP COMPLIANCE
  {
    id: "risk_compliance",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "risk-governance-compliance",
    keywords: [
      "dpdp", "gdpr", "soc2", "compliance", "privacy", "cybersecurity", "risk governance",
      "data privacy cybersecurity", "compliance framework", "security readiness", "अनुपालन", "डेटा सुरक्षा"
    ],
    response: {
      en: "We implement India DPDP Act 2023 readiness, SOC-2 framework preparedness, ISO 27001 evidence tracking, and unencrypted PII scrubbing across data pipelines.",
      hi: "हम भारत DPDP एक्ट 2023 तत्परता, SOC-2 अनुपालन ढांचा, और डेटा पाइपलाइनों में PII सुरक्षा लागू करते हैं।",
      ar: "نطبق أطر الامتثال لمعايير SOC-2 و ISO 27001 وقوانين حماية البيانات الشخصية DPDP لحماية المعلومات الحساسة.",
    },
    options: {
      en: [
        { label: "View DPDP & Risk Scope", action: "navigate", route: "/services/risk-governance-compliance" },
        { label: "Request Compliance Check", action: "start_project" },
      ],
      hi: [
        { label: "अनुपालन दायरा देखें", action: "navigate", route: "/services/risk-governance-compliance" },
        { label: "अनुपालन जांच का अनुरोध करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض تفاصيل الامتثال", action: "navigate", route: "/services/risk-governance-compliance" },
        { label: "طلب فحص الامتثال", action: "start_project" },
      ],
    },
  },

  // 15. AUDIT & FINOPS
  {
    id: "system_audit_finops",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "audit-finops-tuning",
    keywords: [
      "audit", "finops", "cloud cost", "performance tuning", "code audit", "security audit",
      "cost reduction", "cloud optimization", "ऑडिट", "क्लाउड लागत"
    ],
    response: {
      en: "We perform independent audits on multi-cloud environments (AWS/Azure/GCP), optimizing query latencies, fixing architectural security gaps, and cutting cloud infrastructure bills by up to 40%.",
      hi: "हम मल्टी-क्लाउड परिवेशों पर स्वतंत्र ऑडिट करते हैं, प्रश्नों की गति में सुधार करते हैं, और क्लाउड बुनियादी ढांचे के बिलों को 40% तक कम करते हैं।",
      ar: "نقوم بتدقيق شامل للبيئات السحابية (AWS/Azure/GCP) لتقليل تكاليف السحابة بنسبة تصل إلى 40% وتحسين السرعة والأمان.",
    },
    options: {
      en: [
        { label: "View Audit Services", action: "navigate", route: "/services/audit-finops-tuning" },
        { label: "Request System Audit", action: "start_project" },
      ],
      hi: [
        { label: "ऑडिट सेवाएं देखें", action: "navigate", route: "/services/audit-finops-tuning" },
        { label: "सिस्टम ऑडिट का अनुरोध करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض خدمات التدقيق", action: "navigate", route: "/services/audit-finops-tuning" },
        { label: "طلب تدقيق الأنظمة", action: "start_project" },
      ],
    },
  },

  // 16. DEDICATED PODS & STAFF AUGMENTATION
  {
    id: "staff_augmentation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "staff-augmentation-pods",
    keywords: [
      "staff augmentation", "dedicated team", "hire developers", "engineering pod", "staffing",
      "developers", "extended team", "dedicated developers", "डेवलपर"
    ],
    response: {
      en: "We deploy autonomous engineering pods (Frontend, Backend, DevOps, QA) ready to integrate into your agile sprint cycles within 72 hours under strict SLAs.",
      hi: "हम 72 घंटों के भीतर आपकी स्प्रिंट प्रक्रियाओं में एकीकृत होने के लिए समर्पित इंजीनियरिंग टीमों को तैनात करते हैं।",
      ar: "نوفر فرق عمل هندسية مخصصة ومستقلة جاهزة للاندماج مع فريقك خلال 72 ساعة مع تطبيق معايير الالتزام SLA.",
    },
    options: {
      en: [
        { label: "View Pod Scope", action: "navigate", route: "/services/staff-augmentation-pods" },
        { label: "Hire Engineering Pod", action: "start_project" },
      ],
      hi: [
        { label: "टीम विवरण देखें", action: "navigate", route: "/services/staff-augmentation-pods" },
        { label: "इंजीनियरिंग टीम हायर करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض نطاق الفرق", action: "navigate", route: "/services/staff-augmentation-pods" },
        { label: "توظيف فريق مخصص", action: "start_project" },
      ],
    },
  },

  // 17. AI & AUTOMATION SOLUTIONS
  {
    id: "ai_automation",
    intentLevel: "INFORMATIONAL",
    associatedServiceSlug: "ai-automation-solutions",
    keywords: [
      "ai", "automation", "llm", "rag", "ai bot", "machine learning", "chatbots", "workflow automation",
      "custom ai solutions", "एआई", "ऑटोमेशन"
    ],
    response: {
      en: "We build enterprise AI applications including custom RAG knowledge search engines, LLM fine-tuning pipelines, automated customer service bots, and intelligent workflow automation.",
      hi: "हम एंटरप्राइज एआई एप्लिकेशन बनाते हैं जिनमें कस्टम RAG नॉलेज सर्च इंजन, LLM फाइन-ट्यूनिंग और स्वचालन शामिल हैं।",
      ar: "نبني تطبيقات ذكاء اصطناعي مخصصة للمؤسسات تشمل محركات بحث البيانات RAG، وأتمتة خطوط العمل الذكية.",
    },
    options: {
      en: [
        { label: "View AI Scope", action: "navigate", route: "/services/ai-automation-solutions" },
        { label: "Discuss AI Project", action: "start_project" },
      ],
      hi: [
        { label: "एआई सेवा देखें", action: "navigate", route: "/services/ai-automation-solutions" },
        { label: "एआई प्रोजेक्ट पर चर्चा करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض تفاصيل الذكاء الاصطناعي", action: "navigate", route: "/services/ai-automation-solutions" },
        { label: "مناقشة مشروع AI", action: "start_project" },
      ],
    },
  },

  // 18. LOCATIONS & HUBS
  {
    id: "locations_hubs",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "location", "office", "where are you", "gurgaon", "dubai", "hubs", "مكاتب", "فروع", "कार्यालय", "कहां स्थित हैं"
    ],
    response: {
      en: "Arav Innovations operates dual delivery hubs: Gurgaon HQ (Sector 44) serving India & South Asia, and Dubai Hub (Downtown Boulevard Plaza) serving the GCC and global enterprises.",
      hi: "आरव इनोवेशन दो डिलीवरी हब संचालित करता है: गुरुग्राम (मुख्यालय - सेक्टर 44) और दुबई (यूएई - डाउनटाउन बुलेवार्ड प्लाजा)।",
      ar: "تمتلك آراف إينوفيشينز مركزين إقليميين: المقر الرئيسي في الهند (جورجاون - قطاع 44)، والمكتب الإقليمي في الإمارات (دبي - بوليفارد بلازا).",
    },
    options: {
      en: [
        { label: "View Contact Page", action: "navigate", route: "/contact" },
        { label: "Book Consultation", action: "start_project" },
      ],
      hi: [
        { label: "संपर्क पेज देखें", action: "navigate", route: "/contact" },
        { label: "परामर्श बुक करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض صفحة التواصل", action: "navigate", route: "/contact" },
        { label: "حجز استشارة", action: "start_project" },
      ],
    },
  },

  // 19. TRAINING & UPSKILLING
  {
    id: "training_upskilling",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "training", "upskilling", "workshop", "corporate training", "team training", "upskill",
      "do you offer training", "can you upskill our team", "do you provide training", "प्रशिक्षण", "ट्रेनिंग"
    ],
    response: {
      en: "We offer executive & engineering corporate training programs covering Cloud Architecture, DevSecOps, DPDP/SOC-2 Data Compliance, and AI Engineering implementation.",
      hi: "हम क्लाउड आर्किटेक्चर, देवसेकऑप्स, DPDP/SOC-2 अनुपालन और एआई इंजीनियरिंग पर कॉर्पोरेट प्रशिक्षण कार्यक्रम प्रदान करते हैं।",
      ar: "نقدم برامج تدريبية متخصصة للشركات تغطي هندسة السحابة، والامتثال لحماية البيانات، وتطبيقات الذكاء الاصطناعي.",
    },
    options: {
      en: [
        { label: "Request Training Deck", action: "start_project" },
        { label: "View All Practices", action: "navigate", route: "/services" },
      ],
      hi: [
        { label: "ट्रेनिंग विवरण मांगें", action: "start_project" },
        { label: "सभी सेवाएं देखें", action: "navigate", route: "/services" },
      ],
      ar: [
        { label: "طلب برنامج التدريب", action: "start_project" },
        { label: "عرض الخدمات", action: "navigate", route: "/services" },
      ],
    },
  },

  // 20. SECURITY & DATA PRIVACY
  {
    id: "security_privacy",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "security", "privacy", "data safety", "is my data safe", "encryption", "confidentiality",
      "nda", "how do you handle security", "data protection", "सुरक्षा", "डेटा गोपनीयता"
    ],
    response: {
      en: "Security and confidentiality are foundational. All client data and IP are governed by strict non-disclosure agreements (NDA), zero-trust access controls, SOC-2 readiness, and end-to-end data encryption.",
      hi: "सुरक्षा और गोपनीयता हमारी प्राथमिकता है। सभी क्लाइंट डेटा और IP सख्त गैर-प्रकटीकरण समझौतों (NDA), जीरो-ट्रस्ट सुरक्षा और डेटा एन्क्रिप्शन के तहत सुरक्षित हैं।",
      ar: "الأمان والسرية أولوية قصوى. جميع بيانات العملاء وحقوق الملكية محمية بموجب اتفاقيات عدم الإفصاح NDA وتشفير البيانات الشامل.",
    },
    options: {
      en: [
        { label: "View Security Framework", action: "navigate", route: "/services/risk-governance-compliance" },
        { label: "Talk to Compliance Team", action: "start_project" },
      ],
      hi: [
        { label: "सुरक्षा ढांचा देखें", action: "navigate", route: "/services/risk-governance-compliance" },
        { label: "अनुपालन टीम से बात करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض إطار الأمان", action: "navigate", route: "/services/risk-governance-compliance" },
        { label: "التحدث مع فريق الامتثال", action: "start_project" },
      ],
    },
  },

  // 21. PARTNER & RESELLER
  {
    id: "partner_reseller",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "partner", "partnership", "reseller", "white label", "agency partnership", "outsource to you",
      "can we partner with you", "agency collaboration", "subcontracting", "साझेदारी"
    ],
    response: {
      en: "We partner with global digital agencies, consultancies, and technology brokers through white-label engineering pods, strategic joint deliveries, and transparent referral structures.",
      hi: "हम वैश्विक डिजिटल एजेंसियों और प्रौद्योगिकी सलाहकारों के साथ व्हाइट-लेबल इंजीनियरिंग टीमों और रणनीतिक साझेदारी के माध्यम से काम करते हैं।",
      ar: "نشترك مع الوكالات الرقمية والشركات الاستشارية العالمية من خلال تقديم خدمات الفرق الهندسية بنظام العلامة البيضاء White-Label.",
    },
    options: {
      en: [
        { label: "Discuss Partnership", action: "start_project" },
        { label: "Explore Staffing Pods", action: "navigate", route: "/services/staff-augmentation-pods" },
      ],
      hi: [
        { label: "साझेदारी पर चर्चा करें", action: "start_project" },
        { label: "टीम मॉडल देखें", action: "navigate", route: "/services/staff-augmentation-pods" },
      ],
      ar: [
        { label: "مناقشة الشراكة", action: "start_project" },
        { label: "عرض نموذج الفرق", action: "navigate", route: "/services/staff-augmentation-pods" },
      ],
    },
  },

  // 22. SUPPORT & MAINTENANCE SLA
  {
    id: "support_sla",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "support", "sla", "maintenance", "post launch", "after launch", "24/7 support",
      "support contract", "uptime", "maintenance support", "सपोर्ट", "रखरखाव"
    ],
    response: {
      en: "We provide comprehensive post-launch SLA contracts with 99.99% uptime guarantees, 24/7 critical incident response, automated daily backups, and continuous security patching.",
      hi: "हम 99.99% अपटाइम गारंटी, 24/7 क्रिटिकल सहायता, स्वचालित दैनिक बैकअप और निरंतर सुरक्षा पैचिंग के साथ पोस्ट-लॉन्च SLA समझौते प्रदान करते हैं।",
      ar: "نوفر عقود دعم وصيانة بعد الإطلاق مع ضمان توفر بنسبة 99.99%، واستجابة طارئة على مدار الساعة 24/7، ونسخ احتياطي يومي.",
    },
    options: {
      en: [
        { label: "Discuss SLA Contract", action: "start_project" },
        { label: "View Audit Services", action: "navigate", route: "/services/audit-finops-tuning" },
      ],
      hi: [
        { label: "SLA पर चर्चा करें", action: "start_project" },
        { label: "ऑडिट सेवाएं देखें", action: "navigate", route: "/services/audit-finops-tuning" },
      ],
      ar: [
        { label: "مناقشة اتفاقية SLA", action: "start_project" },
        { label: "عرض خدمات التدقيق", action: "navigate", route: "/services/audit-finops-tuning" },
      ],
    },
  },

  // 23. STARTUP PACKAGES
  {
    id: "saas_startup_pkg",
    intentLevel: "INFORMATIONAL",
    keywords: [
      "startup package", "early stage", "mvp", "bootstrapped", "seed stage", "startup offer",
      "do you work with startups", "mvp development for startups", "स्टार्टअप", "एमवीपी"
    ],
    response: {
      en: "We offer dedicated Startup Sprint packages engineered to convert product concepts into production-ready MVPs within 4 to 6 weeks, paired with cloud credits guidance and scalability architecture.",
      hi: "हम 4 से 6 हफ्तों में उत्पाद विचारों को प्रोडक्शन-रेडी MVP में बदलने के लिए विशेष स्टार्टअप स्प्रिंट पैकेज प्रदान करते हैं।",
      ar: "نقدم حزم خاصة بالشركات الناشئة تحول أفكار المنتجات إلى نماذج أولية جاهزة للإطلاق MVP خلال 4 إلى 6 أسابيع.",
    },
    options: {
      en: [
        { label: "Build Your MVP", action: "start_project" },
        { label: "View Web & App Practice", action: "navigate", route: "/services/web-app-development" },
      ],
      hi: [
        { label: "अपना MVP बनाएं", action: "start_project" },
        { label: "वेब विकास देखें", action: "navigate", route: "/services/web-app-development" },
      ],
      ar: [
        { label: "بناء نموذج MVP", action: "start_project" },
        { label: "عرض خدمات الويب", action: "navigate", route: "/services/web-app-development" },
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
  const q = query.toLowerCase().trim();
  if (!q) return null;

  const langKey = (locale === "hi" ? "hi" : locale === "ar" ? "ar" : "en") as "en" | "hi" | "ar";

  // 1. Direct Keyword Check: collect all matching intents and pick the one with the longest keyword match
  let bestMatch: { intent: ChatbotIntent; kwLength: number } | null = null;

  for (const intent of chatbotIntents) {
    for (const kw of intent.keywords) {
      const cleanKw = kw.toLowerCase().trim();
      let matched = false;

      // For short single-word keywords (<= 4 chars like "hi", "hey"), require word boundary so "hire" or "this" don't falsely match "hi"
      if (/^[a-z0-9]+$/i.test(cleanKw) && cleanKw.length <= 4) {
        const regex = new RegExp(`\\b${cleanKw}\\b`, "i");
        matched = regex.test(q);
      } else {
        matched = q.includes(cleanKw);
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

    // Context carryover: append context reference if industry/service was previously mentioned
    if (sessionContext?.mentionedIndustry && (intent.id === "services_overview" || intent.id === "industries_usecases" || intent.id === "pricing_cost")) {
      const industryMsg = locale === "hi"
        ? `\n\n(ध्यान दें: ${sessionContext.mentionedIndustry} क्षेत्र के लिए हमारे पास समर्पित अनुभव और केस स्टडीज उपलब्ध हैं।)`
        : locale === "ar"
        ? `\n\n(ملاحظة: بالنسبة لقطاع ${sessionContext.mentionedIndustry}، لدينا خبرة سابقة ودراسات حالة مخصصة.)`
        : `\n\n(Note: For the ${sessionContext.mentionedIndustry} sector, we have specialized experience and case studies.)`;
      text += industryMsg;
    }

    return {
      intent,
      responseText: text,
      isLeadForm: intent.triggerLeadForm || intent.intentLevel === "STRONG_BUYING",
      detectedService: intent.associatedServiceSlug,
    };
  }

  // 2. Fuzzy Matching fallback via Fuse.js for misspelled queries
  const fuseResults = fuse.search(q);
  if (fuseResults.length > 0) {
    const matchedId = fuseResults[0].item.id;
    const intent = chatbotIntents.find((i) => i.id === matchedId);
    if (intent) {
      let text = intent.response[langKey] || intent.response.en;
      return {
        intent,
        responseText: text,
        isLeadForm: intent.triggerLeadForm || intent.intentLevel === "STRONG_BUYING",
        detectedService: intent.associatedServiceSlug,
      };
    }
  }

  // 3. Extract industry if mentioned in query
  let detectedIndustry: string | undefined;
  if (q.includes("fintech") || q.includes("finance")) detectedIndustry = "FinTech & Banking";
  else if (q.includes("health") || q.includes("hospital")) detectedIndustry = "Healthcare";
  else if (q.includes("ecommerce") || q.includes("retail")) detectedIndustry = "E-Commerce";
  else if (q.includes("startup")) detectedIndustry = "Startups";
  else if (q.includes("enterprise")) detectedIndustry = "Enterprise";

  if (detectedIndustry) {
    const defaultIntent = chatbotIntents.find((i) => i.id === "industries_usecases")!;
    return {
      intent: defaultIntent,
      responseText: defaultIntent.response[langKey] || defaultIntent.response.en,
      isLeadForm: false,
      detectedIndustry,
    };
  }

  return null;
}
