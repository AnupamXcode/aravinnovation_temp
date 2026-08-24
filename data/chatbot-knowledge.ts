export interface ChatbotIntentOption {
  label: string;
  action: "service_lookup" | "intent_trigger" | "all_services" | "locations" | "start_project" | "navigate";
  payload?: string;
  route?: string;
}

export interface ChatbotIntent {
  id: string;
  keywords: string[];
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

export const chatbotIntents: ChatbotIntent[] = [
  // 1. GREETING
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "hii", "namaste", "marhaba", "سلام", "नमस्ते", "who are you", "what do you do"],
    response: {
      en: "Hello! Welcome to Arav Innovations. We deliver enterprise IT strategy, full-stack web/app engineering, DPDP/SOC-2 compliance, and high-intent digital marketing. How can we assist you today?",
      hi: "नमस्ते! अराव इनोवेशन में आपका स्वागत है। हम एंटरप्राइज आईटी रणनीति, फुल-स्टैक वेब/ऐप इंजीनियरिंग, DPDP/SOC-2 अनुपालन और डिजिटल मार्केटिंग प्रदान करते हैं। आज हम आपकी कैसे सहायता कर सकते हैं?",
      ar: "مرحباً بك في آراف إينوفيشينز! نقدم استشارات تقنية، وهندسة البرمجيات، والامتثال لحماية البيانات، والتسويق الرقمي. كيف يمكننا مساعدتك اليوم؟",
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
    keywords: ["services", "practices", "what do you offer", "capabilities", "خدمات", "सेवाएं", "क्या करते हो"],
    response: {
      en: "We operate 7 core practices: (1) IT Strategy & Consulting, (2) Web & App Engineering, (3) Digital Marketing & SEO, (4) Risk & DPDP Governance, (5) Audit & FinOps, (6) Staff Augmentation Pods, and (7) AI Automation Solutions.",
      hi: "हमारी 7 मुख्य सेवाएं हैं: (1) आईटी रणनीति एवं कंसल्टिंग, (2) वेब एवं ऐप इंजीनियरिंग, (3) डिजिटल मार्केटिंग एवं SEO, (4) जोखिम एवं DPDP गवर्नेंस, (5) सिस्टम ऑडिट एवं परफॉरमेंस, (6) समर्पित इंजीनियरिंग स्क्वॉड, और (7) एआई समाधान।",
      ar: "نقدم 7 خدمات رئيسية: (1) استراتيجية التقنية، (2) هندسة الويب والموبايل، (3) التسويق الرقمي و SEO، (4) الحوكمة والامتثال، (5) تدقيق الأنظمة والأداء، (6) الفرق الهندسية المخصصة، و (7) حلول الذكاء الاصطناعي.",
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
        { label: "هندسة الويب والموبايل", action: "service_lookup", payload: "web-app-development" },
        { label: "استراتيجية التقنية", action: "service_lookup", payload: "it-strategy-consulting" },
        { label: "التسويق الرقمي", action: "service_lookup", payload: "digital-marketing" },
        { label: "الحوكمة والامتثال", action: "service_lookup", payload: "risk-governance-compliance" },
      ],
    },
  },
  // 3. WEB & APP DEVELOPMENT
  {
    id: "web_app_dev",
    keywords: ["website", "web development", "build app", "frontend", "backend", "next.js", "react", "تطوير موقع", "تطبيق", "वेबसाइट निर्माण", "ऐप डेवलपमेंट"],
    response: {
      en: "Our Web & App Engineering team builds subsecond Next.js web applications, multi-tenant SaaS portals, microservices, and native mobile apps designed for extreme scalability and security.",
      hi: "हमारी वेब एवं ऐप इंजीनियरिंग टीम सब-सेकंड Next.js वेब एप्लिकेशन, मल्टी-टैलेंट SaaS पोर्टल, माइक्रोसर्विसेज और नेटिव मोबाइल ऐप बनाती है।",
      ar: "يبني فريق هندسة البرمجيات لدينا تطبيقات ويب فائقة السرعة بـ Next.js، ومنصات SaaS متعددة المستخدمين، وتطبيقات موبايل ذات أمان وتوسع عاليين.",
    },
    options: {
      en: [
        { label: "View Web Dev Practice", action: "navigate", route: "/services/web-app-development" },
        { label: "Start a Web Project", action: "start_project" },
      ],
      hi: [
        { label: "वेब सेवा विवरण देखें", action: "navigate", route: "/services/web-app-development" },
        { label: "प्रोजेक्ट शुरू करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض خدمة الويب", action: "navigate", route: "/services/web-app-development" },
        { label: "بدء مشروع", action: "start_project" },
      ],
    },
  },
  // 4. IT STRATEGY & CONSULTING
  {
    id: "it_strategy",
    keywords: ["it strategy", "cloud migration", "architecture", "cto", "legacy modernization", "استشارات", "سحابة", "आईटी रणनीति", "क्लाउड"],
    response: {
      en: "We partner with CTOs and enterprise leadership to modernize legacy systems, design zero-trust multi-cloud roadmaps (AWS/Azure/GCP), and optimize IT infrastructure overhead.",
      hi: "हम CTO और एंटरप्राइज नेतृत्व के साथ साझेदारी करके लेगेसी सिस्टम्स का आधुनिकीकरण करते हैं और जीरो-ट्रस्ट मल्टी-क्लाउड रोडमैप (AWS/Azure/GCP) तैयार करते हैं।",
      ar: "نشترك مع المدراء التنفيذيين لتحديث الأنظمة القديمة، وتصميم خارطة طريق سحابية آمنة (AWS/Azure/GCP)، وتخفيض تكاليف التكنولوجيا.",
    },
    options: {
      en: [
        { label: "View IT Strategy Scope", action: "navigate", route: "/services/it-strategy-consulting" },
        { label: "Schedule Strategy Call", action: "start_project" },
      ],
      hi: [
        { label: "आईटी रणनीति दायरा देखें", action: "navigate", route: "/services/it-strategy-consulting" },
        { label: "कॉल शेड्यूल करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض تفاصيل الاستراتيجية", action: "navigate", route: "/services/it-strategy-consulting" },
        { label: "حجز مكالمة استراتيجية", action: "start_project" },
      ],
    },
  },
  // 5. DIGITAL MARKETING & SEO
  {
    id: "digital_marketing",
    keywords: ["marketing", "seo", "digital marketing", "leads", "google ads", "linkedin ads", "traffic", "تسويق", "سيو", "डिजिटल मार्केटिंग", "एसईओ"],
    response: {
      en: "We run high-intent B2B demand generation campaigns across LinkedIn & Google Search, supported by technical SEO auditing and closed-loop conversion funnel modeling.",
      hi: "हम LinkedIn और Google खोज पर उच्च-इरादे वाले B2B डिमांड जनरेशन अभियान चलाते हैं, जो तकनीकी SEO ऑडिट और रूपांतरण फ़नल मॉडलिंग द्वारा समर्थित हैं।",
      ar: "ننفذ حملات تسويقية مستهدفة للشركات B2B عبر LinkedIn و Google Search، مدعومة بتحسين محركات البحث التقني وتحليلات التحويل.",
    },
    options: {
      en: [
        { label: "View Marketing Practice", action: "navigate", route: "/services/digital-marketing" },
        { label: "Request Funnel Audit", action: "start_project" },
      ],
      hi: [
        { label: "मार्केटिंग विवरण देखें", action: "navigate", route: "/services/digital-marketing" },
        { label: "फ़नल ऑडिट का अनुरोध करें", action: "start_project" },
      ],
      ar: [
        { label: "عرض خدمة التسويق", action: "navigate", route: "/services/digital-marketing" },
        { label: "طلب تدقيق التسويق", action: "start_project" },
      ],
    },
  },
  // 6. RISK GOVERNANCE & DPDP COMPLIANCE
  {
    id: "risk_compliance",
    keywords: ["dpdp", "gdpr", "soc2", "compliance", "privacy", "cybersecurity", "حماية البيانات", "امتثال", "अनुपालन", "डेटा सुरक्षा"],
    response: {
      en: "We implement India DPDP Act 2023 readiness, SOC-2 framework readiness, ISO 27001 evidence tracking, and unencrypted PII scrubbing across enterprise data pipelines.",
      hi: "हम भारत DPDP एक्ट 2023 तत्परता, SOC-2 अनुपालन ढांचा, और डेटा पाइपलाइनों में PII सुरक्षा लागू करते हैं।",
      ar: "نطبق أطر الامتثال لمعايير SOC-2 و ISO 27001 وجاهزية قوانين حماية البيانات الشخصية مع تشفير البيانات الحساسة.",
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
  // 7. PRICING & COST
  {
    id: "pricing_cost",
    keywords: ["cost", "price", "pricing", "quote", "budget", "how much", "تكلفة", "أسعار", "लागत", "कीमत", "बजट"],
    response: {
      en: "We offer transparent, value-aligned engagement structures: Fixed-Scope Sprints, Monthly Engineering Retainers, and Dedicated Pod Expansion. Let's discuss your scope to provide an exact breakdown.",
      hi: "हम पारदर्शी जुड़ाव संरचनाएं प्रदान करते हैं: फिक्स्ड-स्कोप स्प्रिंट, मासिक इंजीनियरिंग रिटेनर, और समर्पित टीम। सटीक विवरण प्राप्त करने के लिए अपने दायरे पर चर्चा करें।",
      ar: "نقدم أطر تعاقد مرنة وشفافة: مشاريع ذات نطاق محدد، أو عقود صيانة شهرية، أو فرق عمل مخصصة. دعنا نناقش متطلباتك لتقديم الميزانية الدقيقة.",
    },
    triggerLeadForm: true,
  },
  // 8. BUYING INTENT (START PROJECT)
  {
    id: "buying_intent",
    keywords: ["start a project", "hire", "i need a website", "can you build", "talk to someone", "contact us", "بدء مشروع", "توظيف", "प्रोजेक्ट शुरू करें", "हायर करें"],
    response: {
      en: "Great! Please fill out the quick form below, and our senior strategy & practice director will reach out within 1 business day under NDA.",
      hi: "बहुत बढ़िया! कृपया नीचे दिया गया छोटा फॉर्म भरें, और हमारे वरिष्ठ निदेशक NDA के तहत 1 व्यावसायिक दिन के भीतर आपसे संपर्क करेंगे।",
      ar: "ممتاز! يرجى ملء النموذج السريع أدناه، وسيتواصل معك مديرنا الاستراتيجي خلال يوم عمل واحد مع اتفاقية عدم الإفصاح NDA.",
    },
    triggerLeadForm: true,
  },
  // 9. LOCATIONS & OFFICES
  {
    id: "locations_hubs",
    keywords: ["location", "office", "where are you", "gurgaon", "dubai", "hubs", "مكاتب", "فروع", "कार्यालय", "कहां स्थित हैं"],
    response: {
      en: "Arav Innovations operates dual delivery hubs: Gurgaon (HQ - Sector 44) serving South Asia, and Dubai (UAE - Downtown Boulevard Plaza) serving the GCC and global enterprise clients.",
      hi: "अराव इनोवेशन दो डिलीवरी हब संचालित करता है: गुरुग्राम (मुख्यालय - सेक्टर 44) और दुबई (यूएई - डाउनटाउन बुलेवार्ड प्लाजा)।",
      ar: "تمتلك آراف إينوفيشينز مركزين إقليميين: المقر الرئيسي في الهند (جورجاون - قطاع 44)، والمكتب الإقليمي في الإمارات (دبي - بوليفارد بلازا).",
    },
    options: {
      en: [
        { label: "View Contact Page", action: "navigate", route: "/contact" },
        { label: "Book a Consultation", action: "start_project" },
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
  // 10. CASE STUDIES & PROOF
  {
    id: "case_studies_proof",
    keywords: ["case study", "proof", "clients", "portfolio", "past work", "دراسات حالة", "أعمالكم", "केस स्टडी", "पोर्टफोलियो"],
    response: {
      en: "We have executed major transformations including FinTech cloud migrations (99.99% SLA), enterprise SaaS web portals (65% latency reduction), and DPDP compliance audits. Would you like to inspect our case studies?",
      hi: "हमने प्रमुख रूपांतरण निष्पादित किए हैं जिनमें फिनटेक क्लाउड माइग्रेशन (99.99% SLA), एंटरप्राइज SaaS पोर्टल (65% लेटेंसी कमी), और DPDP अनुपालन ऑडिट शामिल हैं।",
      ar: "نفذنا مشاريع تحول كبرى تشمل نقل التكنولوجيا المالية للسحابة توفر 99.99%، وتطوير منصات SaaS، وتدقيق الامتثال وحماية البيانات.",
    },
    options: {
      en: [
        { label: "Explore Case Studies", action: "navigate", route: "/case-studies" },
        { label: "Discuss Your Architecture", action: "start_project" },
      ],
      hi: [
        { label: "केस स्टडीज देखें", action: "navigate", route: "/case-studies" },
        { label: "अपने आर्किटेक्चर पर चर्चा करें", action: "start_project" },
      ],
      ar: [
        { label: "استعرض دراسات الحالة", action: "navigate", route: "/case-studies" },
        { label: "مناقشة معمارية مشروعك", action: "start_project" },
      ],
    },
  },
];

export function findIntent(query: string, locale = "en"): { intent: ChatbotIntent; responseText: string } | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  for (const intent of chatbotIntents) {
    for (const kw of intent.keywords) {
      if (q.includes(kw.toLowerCase())) {
        const langKey = (locale === "hi" ? "hi" : locale === "ar" ? "ar" : "en") as "en" | "hi" | "ar";
        return {
          intent,
          responseText: intent.response[langKey] || intent.response.en,
        };
      }
    }
  }
  return null;
}
