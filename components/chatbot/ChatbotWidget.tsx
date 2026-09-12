import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { MessageSquare, X, Send, Bot, ArrowRight, ExternalLink, Mic, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useSiteConfig } from "@/lib/site-config";
import { useSiteContent } from "@/lib/site-content";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { findIntent, ChatSessionContext } from "@/data/chatbot-knowledge";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string; payload?: string; route?: string; ctaType?: string }[];
  isLeadForm?: boolean;
}

function cleanSpeechText(text: string): string {
  return text
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[*_#`~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function ChatbotWidget() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Chatbot");
  const { config } = useSiteConfig();
  const { content } = useSiteContent();
  const router = useRouter();

  if (pathname?.includes("/admin")) {
    return null;
  }

  const chatbotKB = content.chatbotKB;
  const isMasterOn = config.chatbotEnabled && chatbotKB?.masterEnabled !== false;

  const [shouldShowLauncher, setShouldShowLauncher] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [speakingMsgId, setSpeakingMsgId] = React.useState<string | null>(null);
  const recognitionRef = React.useRef<any>(null);

  const [sessionContext, setSessionContext] = React.useState<ChatSessionContext>({
    locale,
    history: [],
  });

  const [messages, setMessages] = React.useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedMessages = sessionStorage.getItem("arav_chat_messages");
        if (savedMessages) {
          const parsed = JSON.parse(savedMessages);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // ignore
      }
    }
    const welcomeMsg =
      chatbotKB?.defaultGreeting ||
      (locale === "hi"
        ? "नमस्ते! आरव इनोवेशन में आपका स्वागत है। आप क्या बनाना या बेहतर करना चाहते हैं?"
        : locale === "ar"
        ? "مرحباً! أهلاً بك في آراف إينوفيشينز. ما الذي تتطلع لتطويره أو بنائه؟"
        : "Hi! Welcome to Arav Innovations. What are you looking to build, improve or transform?");

    return [
      {
        id: "welcome",
        sender: "bot",
        text: welcomeMsg,
        options: [
          { label: locale === "hi" ? "सेवाएं देखें" : locale === "ar" ? "استكشف الخدمات" : "Explore Services", action: "all_services" },
          { label: locale === "hi" ? "वेबसाइट बनाएं" : locale === "ar" ? "تطوير موقع" : "Build / Improve a Website", action: "navigate", route: "/services/web-app-development" },
          { label: locale === "hi" ? "आईटी आधुनिक बनाएं" : locale === "ar" ? "تحديث التقنية" : "Modernize IT", action: "navigate", route: "/services/it-strategy-implementation" },
          { label: locale === "hi" ? "ऑनलाइन ग्रोथ" : locale === "ar" ? "النمو الرقمي" : "Grow Online", action: "navigate", route: "/services/digital-marketing-brand-development" },
          { label: locale === "hi" ? "एआई समाधान" : locale === "ar" ? "حلول الذكاء الاصطناعي" : "Explore AI", action: "navigate", route: "/services/ai-portfolio" },
          { label: locale === "hi" ? "टीम से बात करें" : locale === "ar" ? "التواصل معنا" : "Talk to Our Team", action: "navigate", route: "/contact" },
        ],
      },
    ];
  });

  const [inputText, setInputText] = React.useState("");
  const [leadFormState, setLeadFormState] = React.useState({
    name: "",
    email: "",
    phone: "",
    requirement: "",
  });
  const [leadSubmitted, setLeadSubmitted] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Clean up speech synthesis on unmount
  React.useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const initialInputRef = React.useRef<string>("");
  const [voiceStatusMsg, setVoiceStatusMsg] = React.useState<string | null>(null);

  // Stop active speech recognition if locale changes mid-session
  React.useEffect(() => {
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }
  }, [locale]);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceStatusMsg("Voice input is not supported in this browser. Please use text input.");
      setTimeout(() => setVoiceStatusMsg(null), 4000);
      return;
    }

    try {
      initialInputRef.current = inputText.trim();
      setVoiceStatusMsg(null);

      // Synchronous instantiation within user click gesture handler
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      // Map application locale to BCP-47 speech recognition locale
      const speechLang =
        locale === "hi"
          ? "hi-IN"
          : locale === "ar"
          ? "ar-SA"
          : locale === "fr"
          ? "fr-FR"
          : locale === "es"
          ? "es-ES"
          : chatbotKB?.speechLanguage || "en-US";

      recognition.lang = speechLang;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        const err = event?.error;
        if (err === "aborted") {
          return;
        }
        if (err === "not-allowed") {
          setVoiceStatusMsg("Microphone access was denied. Please allow microphone access for this site.");
        } else if (err === "service-not-allowed") {
          setVoiceStatusMsg("Voice recognition is unavailable in this browser.");
        } else if (err === "network") {
          setVoiceStatusMsg("Voice recognition service is unavailable. Please try again.");
        } else if (err === "no-speech") {
          setVoiceStatusMsg("No speech detected. Please try again.");
        } else if (err === "audio-capture") {
          setVoiceStatusMsg("No microphone hardware found.");
        } else {
          setVoiceStatusMsg("Voice input couldn't start. Please try again.");
        }
        setTimeout(() => setVoiceStatusMsg(null), 4000);
      };

      recognition.onresult = (event: any) => {
        const rawTranscript = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join("")
          .trim();

        if (!rawTranscript) return;

        if (initialInputRef.current) {
          setInputText(`${initialInputRef.current} ${rawTranscript}`);
        } else {
          setInputText(rawTranscript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceStatusMsg("Could not start speech recognition. Please try again.");
      setTimeout(() => setVoiceStatusMsg(null), 3000);
    }
  };

  const toggleReadAloud = (msgId: string, rawText: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const spokenText = cleanSpeechText(rawText);
    if (!spokenText) return;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = locale === "hi" ? "hi-IN" : locale === "ar" ? "ar-SA" : chatbotKB?.speechLanguage || "en-US";
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Restore session context
  React.useEffect(() => {
    try {
      const savedContext = sessionStorage.getItem("arav_chat_context");
      if (savedContext) {
        const parsed = JSON.parse(savedContext);
        setSessionContext((prev) => ({ ...prev, ...parsed, locale }));
      }
    } catch {
      // ignore
    }
  }, [locale]);

  // Save messages to session storage
  React.useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem("arav_chat_messages", JSON.stringify(messages));
      }
    } catch {
      // ignore
    }
  }, [messages]);

  // Delayed launcher trigger behavior
  React.useEffect(() => {
    if (!isMasterOn) return;

    try {
      if (sessionStorage.getItem("arav_chat_dismissed") === "true") {
        setShouldShowLauncher(true);
        return;
      }
    } catch {
      // ignore
    }

    let triggered = false;

    const showLauncher = () => {
      if (!triggered) {
        triggered = true;
        setShouldShowLauncher(true);
        cleanup();
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 150) {
        showLauncher();
      }
    };

    const handleClick = () => {
      showLauncher();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    const timer = setTimeout(() => {
      showLauncher();
    }, (config.chatbotDelaySeconds || 10) * 1000);

    const cleanup = () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      clearTimeout(timer);
    };

    return cleanup;
  }, [isMasterOn, config.chatbotDelaySeconds]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  if (!isMasterOn) return null;

  const handleOpen = () => {
    setIsOpen(true);
    setShouldShowLauncher(true);
    trackEvent({ type: "chatbot_started" });
  };

  const handleMinimize = () => {
    setIsOpen(false);
    setShouldShowLauncher(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
    try {
      sessionStorage.setItem("arav_chat_dismissed", "true");
    } catch {
      // ignore
    }
  };

  const updateContext = (newCtx: Partial<ChatSessionContext>) => {
    setSessionContext((prev) => {
      const updated = { ...prev, ...newCtx };
      try {
        sessionStorage.setItem("arav_chat_context", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleOptionClick = (option: { label: string; action: string; payload?: string; route?: string; ctaType?: string }) => {
    if (option.route) {
      router.push(option.route);
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: option.label,
    };

    let botMsg: ChatMessage;

    if (option.action === "all_services") {
      const text =
        locale === "hi"
          ? "ज़रूर। हमारी मुख्य सेवाएं निम्नलिखित हैं:\n\n• आईटी रणनीति एवं कार्यान्वयन\n• डिजिटल मार्केटिंग एवं ब्रांड विकास\n• वेब एवं एप्लिकेशन विकास\n• जोखिम, अनुपालन एवं गवर्नेंस\n• ऑडिट एवं सुधार\n• प्रशिक्षण एवं टीम विस्तार\n• एसईओ सेवाएं\n• एआई पोर्टफोलियो\n\nआप किस सेवा के बारे में जानना चाहते हैं?"
          : locale === "ar"
          ? "تشمل خدماتنا الرئيسية:\n\n• استراتيجية التقنية والتنفيذ\n• التسويق الرقمي وبناء العلامة\n• تطوير الويب والتطبيقات\n• الحوكمة والامتثال والارتقاء\n• التدقيق والتحسين\n• التدريب ودعم الكفاءات\n• خدمات SEO\n• حلول الذكاء الاصطناعي"
          : "Sure. Our core services cover:\n\n• IT Strategy & Implementation\n• Digital Marketing & Brand Development\n• Web & Application Development\n• Risk, Compliance & Governance\n• Audit & Improvement\n• Training & Staff Augmentation\n• SEO Services\n• AI Portfolio\n\nWhich one would you like to explore?";

      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text,
        options: [
          { label: "IT Strategy", action: "navigate", route: "/services/it-strategy-implementation", ctaType: "page" },
          { label: "Web & App Dev", action: "navigate", route: "/services/web-app-development", ctaType: "page" },
          { label: "Digital Marketing", action: "navigate", route: "/services/digital-marketing-brand-development", ctaType: "page" },
          { label: "SEO Services", action: "navigate", route: "/services/seo-services", ctaType: "page" },
          { label: "Risk & Governance", action: "navigate", route: "/services/risk-compliance-governance", ctaType: "page" },
          { label: "Audit & Improvement", action: "navigate", route: "/services/audit-improvement", ctaType: "page" },
          { label: "Staff Augmentation", action: "navigate", route: "/services/training-staff-augmentation", ctaType: "page" },
          { label: "AI Portfolio", action: "navigate", route: "/services/ai-portfolio", ctaType: "page" },
        ],
      };
    } else if (option.action === "locations") {
      const text =
        locale === "hi"
          ? "हमारे दो मुख्य कार्यालय हैं:\n\n• भारत मुख्यालय: अर्डी सिटी, गुरुग्राम\n• यूएई कार्यालय: दुबई सिलिकॉन ओएसिस, दुबई"
          : locale === "ar"
          ? "تمتلك آراف إينوفيشينز مركزين إقليميين:\n\n• المقر الرئيسي: ارضي سيتي، جورجاون (الهند)\n• المكتب الإقليمي: دبي سيليكون واحة، دبي (الإمارات)"
          : "We operate dual regional hubs:\n\n• India HQ: Platinum Floor, Ardee City, Gurgaon\n• UAE Office: IFZA Business Park, Dubai Silicon Oasis";

      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text,
        options: [
          { label: locale === "hi" ? "संपर्क पेज" : locale === "ar" ? "صفحة التواصل" : "Contact Page", action: "navigate", route: "/contact" },
          { label: locale === "hi" ? "प्रोजेक्ट शुरू करें" : locale === "ar" ? "بدء مشروع" : "Start a Project", action: "start_project" },
        ],
      };
    } else if (option.action === "start_project") {
      const prefills = option.payload || (sessionContext.mentionedService
        ? `Inquiry regarding ${sessionContext.mentionedService}`
        : sessionContext.mentionedIndustry
        ? `Inquiry for ${sessionContext.mentionedIndustry} sector`
        : "");

      if (prefills && !leadFormState.requirement) {
        setLeadFormState((prev) => ({ ...prev, requirement: prefills }));
      }

      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: t("leadSubtitle"),
        isLeadForm: true,
      };
    } else {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: chatbotKB?.defaultGreeting || t("greeting"),
        options: [
          { label: locale === "hi" ? "सेवाएं देखें" : locale === "ar" ? "استكشف الخدمات" : "Explore Services", action: "all_services" },
          { label: locale === "hi" ? "प्रोजेक्ट शुरू करें" : locale === "ar" ? "بدء مشروع" : "Start a Project", action: "start_project" },
        ],
      };
    }

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      if (chatbotKB?.autoReadAloud) {
        toggleReadAloud(botMsg.id, botMsg.text);
      }
    }, 400);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botMsg: ChatMessage;

      const matched = findIntent(userText, locale, sessionContext);

      if (matched) {
        updateContext({
          lastIntentId: matched.intent.id,
          mentionedService: matched.detectedService || sessionContext.mentionedService,
          mentionedIndustry: matched.detectedIndustry || sessionContext.mentionedIndustry,
        });

        const langKey = (locale === "hi" ? "hi" : locale === "ar" ? "ar" : "en") as "en" | "hi" | "ar";
        const options = matched.intent.options ? matched.intent.options[langKey] : undefined;

        if (matched.isLeadForm) {
          const detectedSvc = matched.detectedService || sessionContext.mentionedService;
          const detectedInd = matched.detectedIndustry || sessionContext.mentionedIndustry;
          const prefills = detectedSvc
            ? `Inquiry regarding ${detectedSvc}`
            : detectedInd
            ? `Inquiry for ${detectedInd} sector`
            : userText;
          setLeadFormState((prev) => ({
            ...prev,
            requirement: prev.requirement || prefills,
          }));
        }

        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: matched.responseText,
          options,
          isLeadForm: matched.isLeadForm,
        };
      } else {
        const fallbackText =
          chatbotKB?.fallbackResponse ||
          "I can help with Arav Innovations' services, solutions and business technology capabilities. What are you looking to build, improve or transform?";

        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: fallbackText,
          options: [
            { label: locale === "hi" ? "सेवाएं देखें" : locale === "ar" ? "جميع الخدمات" : "Explore Services", action: "all_services" },
            { label: locale === "hi" ? "प्रोजेक्ट शुरू करें" : locale === "ar" ? "بدء مشروع" : "Start a Conversation", action: "start_project" },
          ],
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      if (chatbotKB?.autoReadAloud) {
        toggleReadAloud(botMsg.id, botMsg.text);
      }
    }, 450);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadFormState.name,
          company: "Direct Inquirer (Chatbot)",
          email: leadFormState.email,
          phone: leadFormState.phone,
          service: sessionContext.mentionedService || "General Inquiry (Chatbot)",
          requirement: leadFormState.requirement || "Inquiry from chatbot assistant",
          timeline: "1 - 3 Months",
        }),
      });
      setLeadSubmitted(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: t("leadSubmittedMsg"),
        },
      ]);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Floating Launcher */}
      <AnimatePresence>
        {shouldShowLauncher && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 sm:gap-3 motion-reduce:transition-none"
            style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
          >
            {/* Rounded Pill Prompt */}
            <button
              type="button"
              onClick={handleOpen}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white dark:bg-[#0a0a0a] text-[#3A2E27] dark:text-[#FAF5EE] text-xs sm:text-sm font-semibold border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl hover:shadow-2xl hover:border-[#f15e1c] dark:hover:border-[#f15e1c] transition-all duration-200 cursor-pointer"
            >
              <span>{locale === "hi" ? "हमसे चैट करें" : locale === "ar" ? "تحدث معنا" : "Chat with us"}</span>
              <span className="text-sm sm:text-base">👋</span>
            </button>

            {/* Circular Launcher Button */}
            <button
              type="button"
              onClick={handleOpen}
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f15e1c] text-white flex items-center justify-center shadow-2xl shadow-[#f15e1c]/40 hover:bg-[#d4581f] hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f15e1c] focus:ring-offset-2 shrink-0"
              aria-label="Open Arav Assistant Chat"
            >
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E53E3E] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white dark:border-[#000000] shadow-xs">
                1
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      {isOpen && (
        <div
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
          className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[380px] h-[520px] max-h-[calc(100vh-5rem)] rounded-3xl bg-[#FFFDF9] dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header with Minimize Button */}
          <div className="bg-[#FBF3EA] dark:bg-[#0a0a0a] border-b border-[#EFE2D6] dark:border-[#1f1f1f] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#f15e1c] text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  {t("headerTitle")}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{t("onlineStatus")}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleMinimize}
              className="text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#3A2E27] dark:hover:text-[#FAF5EE] p-1.5 rounded-xl hover:bg-[#FCE3D3]/40 dark:hover:bg-[#161616] cursor-pointer"
              aria-label="Minimize Chat Window"
              title="Minimize Chat Window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col",
                  msg.sender === "user" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-3.5 leading-relaxed",
                    msg.sender === "user"
                      ? "bg-[#f15e1c] text-white rounded-br-xs font-medium"
                      : "bg-[#FBF3EA] dark:bg-[#0a0a0a] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#1f1f1f] rounded-bl-xs whitespace-pre-line font-medium"
                  )}
                >
                  {msg.text}
                </div>

                {/* Read Aloud Button for Bot Messages */}
                {msg.sender === "bot" && (
                  <button
                    type="button"
                    onClick={() => toggleReadAloud(msg.id, msg.text)}
                    className="mt-1 flex items-center gap-1 text-[10px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] transition-colors cursor-pointer"
                    aria-label="Read message aloud"
                    title="Read Aloud"
                  >
                    {speakingMsgId === msg.id ? (
                      <>
                        <VolumeX className="w-3 h-3 text-[#f15e1c] animate-pulse" />
                        <span className="text-[#f15e1c] font-bold">Stop Speaking</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-[#2e936f]" />
                        <span>Read Aloud</span>
                      </>
                    )}
                  </button>
                )}

                {/* Option Buttons */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleOptionClick(opt)}
                        className={cn(
                          "text-[11px] px-3 py-1.5 rounded-xl border font-semibold transition-all duration-200 text-left cursor-pointer flex items-center gap-1 shadow-2xs",
                          opt.route || opt.ctaType === "page"
                            ? "bg-[#f15e1c] text-white border-[#f15e1c] hover:bg-[#d4581f] hover:scale-[1.02]"
                            : "bg-white dark:bg-[#0a0a0a] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c] text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#161616]"
                        )}
                      >
                        <span>{opt.label}</span>
                        {(opt.route || opt.ctaType === "page") && <ExternalLink className="w-3 h-3 ml-0.5 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Lead Capture Form */}
                {msg.isLeadForm && !leadSubmitted && (
                  <form
                    onSubmit={handleLeadSubmit}
                    className="w-full mt-2 p-3.5 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-2.5 shadow-xs"
                  >
                    <div className="text-[11px] font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                      {t("leadTitle")}
                    </div>
                    <input
                      type="text"
                      placeholder={`${t("nameLabel")} *`}
                      required
                      value={leadFormState.name}
                      onChange={(e) =>
                        setLeadFormState({ ...leadFormState, name: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#f15e1c]"
                    />
                    <input
                      type="email"
                      placeholder={`${t("emailLabel")} *`}
                      required
                      value={leadFormState.email}
                      onChange={(e) =>
                        setLeadFormState({ ...leadFormState, email: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#f15e1c]"
                    />
                    <input
                      type="tel"
                      placeholder={`${t("phoneLabel")} *`}
                      required
                      value={leadFormState.phone}
                      onChange={(e) =>
                        setLeadFormState({ ...leadFormState, phone: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#f15e1c]"
                    />
                    <textarea
                      placeholder={t("requirementLabel")}
                      rows={2}
                      value={leadFormState.requirement}
                      onChange={(e) =>
                        setLeadFormState({
                          ...leadFormState,
                          requirement: e.target.value,
                        })
                      }
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#f15e1c] resize-none"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="w-full justify-center text-xs h-8 bg-[#f15e1c] hover:bg-[#d4581f]"
                    >
                      {t("submitLead")} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </form>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#FBF3EA] dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] w-max text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                <Bot className="w-4 h-4 text-[#f15e1c] animate-bounce" />
                <span className="font-mono text-[11px] font-medium">Arav Assistant is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Listening Overlay Status */}
          {isListening && (
            <div className="px-4 py-2 bg-rose-500 text-white text-[11px] font-mono font-bold flex items-center justify-between animate-pulse motion-reduce:animate-none">
              <span>🎙️ Listening... Speak your question now</span>
              <button type="button" onClick={toggleListening} className="underline text-xs">Cancel</button>
            </div>
          )}

          {/* Voice Status Error / Warning Message */}
          {voiceStatusMsg && !isListening && (
            <div role="status" aria-live="polite" className="px-4 py-2 bg-amber-500/15 border-t border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] font-mono font-bold flex items-center justify-between">
              <span>{voiceStatusMsg}</span>
              <button type="button" onClick={() => setVoiceStatusMsg(null)} aria-label="Dismiss status message" className="text-xs font-extrabold ml-2">✕</button>
            </div>
          )}

          {/* Bottom Chat Input Bar */}
          <form
            onSubmit={handleCustomSend}
            className="p-3 border-t border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#0a0a0a] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={isListening ? "Listening to your voice..." : t("inputPlaceholder")}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-white dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#f15e1c]"
            />
            {/* Microphone Voice Input Button */}
            <button
              type="button"
              onClick={toggleListening}
              aria-pressed={isListening}
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f15e1c]",
                isListening
                  ? "bg-rose-500 text-white animate-pulse motion-reduce:animate-none shadow-rose-500/40"
                  : "bg-white dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] text-[#f15e1c] hover:bg-[#FCE3D3]/40"
              )}
              aria-label={isListening ? t("micStopAriaLabel") : t("micStartAriaLabel")}
              title={isListening ? t("micStopTitle") : t("micStartTitle")}
            >
              <Mic className={cn("w-3.5 h-3.5", isListening && "animate-bounce motion-reduce:animate-none")} />
            </button>
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-[#f15e1c] text-white flex items-center justify-center hover:bg-[#d4581f] transition-colors shrink-0 cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
