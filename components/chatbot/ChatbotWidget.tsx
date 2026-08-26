"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { MessageSquare, X, Send, Bot, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useSiteConfig } from "@/lib/site-config";
import { useSiteContent } from "@/lib/site-content";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { findIntent, WARM_OPENERS, CASUAL_FOLLOWUPS, ChatSessionContext } from "@/data/chatbot-knowledge";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string; payload?: string; route?: string; ctaType?: string }[];
  isLeadForm?: boolean;
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

  const [shouldShowLauncher, setShouldShowLauncher] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  
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
    return [
      {
        id: "welcome",
        sender: "bot",
        text: t("greeting"),
        options: [
          { label: locale === "hi" ? "सेवाएं देखें" : locale === "ar" ? "استكشف الخدمات" : "Explore Practices", action: "all_services" },
          { label: locale === "hi" ? "प्रोजेक्ट शुरू करें" : locale === "ar" ? "بدء مشروع" : "Start a Project", action: "start_project" },
          { label: locale === "hi" ? "कार्यालय स्थान" : locale === "ar" ? "الفروع والمكاتب" : "Office Locations", action: "locations" },
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

  // Restore session context across page navigations / reloads
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

  // Sync messages to sessionStorage whenever updated
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
  }, [messages, isOpen]);

  if (!isMasterOn) return null;

  const handleOpen = () => {
    setIsOpen(true);
    setShouldShowLauncher(true);
    trackEvent({ type: "chatbot_started" });
  };

  const handleMinimize = () => {
    setIsOpen(false);
    setShouldShowLauncher(true);
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
          ? "आरव इनोवेशन 7 मुख्य सेवाएं प्रदान करता है:\n\n• आईटी रणनीति एवं कंसल्टिंग\n• वेब एवं ऐप इंजीनियरिंग\n• डिजिटल मार्केटिंग एवं SEO\n• जोखिम एवं DPDP अनुपालन\n• सिस्टम ऑडिट एवं परफॉरमेंस\n• समर्पित इंजीनियरिंग स्क्वॉड\n• एआई एवं ऑटोमेशन समाधान"
          : locale === "ar"
          ? "تقدم آراف إينوفيشينز 7 خدمات أساسية:\n\n• استراتيجية تكنولوجيا المعلومات\n• تطوير الويب والموبايل\n• التسويق الرقمي و SEO\n• الحوكمة والامتثال\n• تدقيق الأنظمة والأداء\n• الفرق الهندسية المخصصة\n• حلول الذكاء الاصطناعي"
          : "Arav Innovations provides 7 core practices:\n\n• IT Strategy & Consulting\n• Web & App Development\n• Digital Marketing & SEO\n• Risk Governance & Compliance\n• Audit & FinOps Tuning\n• Dedicated Engineering Pods\n• AI & Automation Solutions";

      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text,
        options: [
          { label: locale === "hi" ? "वेब विकास" : locale === "ar" ? "تطوير الويب" : "Web & App Dev", action: "navigate", route: "/services/web-app-development" },
          { label: locale === "hi" ? "आईटी रणनीति" : locale === "ar" ? "استراتيجية التقنية" : "IT Strategy", action: "navigate", route: "/services/it-strategy-consulting" },
          { label: locale === "hi" ? "मार्केटिंग" : locale === "ar" ? "التسويق الرقمي" : "Digital Marketing", action: "navigate", route: "/services/digital-marketing" },
          { label: locale === "hi" ? "सभी सेवाएं देखें" : locale === "ar" ? "جميع الخدمات" : "View All Practices", action: "navigate", route: "/services" },
        ],
      };
    } else if (option.action === "locations") {
      const text =
        locale === "hi"
          ? "हमारे दो मुख्य कार्यालय हैं:\n\n• भारत मुख्यालय: सेक्टर 44, गुरुग्राम\n• यूएई कार्यालय: बुलेवार्ड प्लाजा, डाउनटाउन दुबई"
          : locale === "ar"
          ? "تمتلك آراف إينوفيشينز مركزين إقليميين:\n\n• المقر الرئيسي: قطاع 44، جورجاون (الهند)\n• المكتب الإقليمي: بوليفارد प्लाजा، دبي (الإمارات)"
          : "We operate dual regional hubs:\n\n• India HQ: Sector 44, Gurgaon\n• UAE Office: Boulevard Plaza, Downtown Dubai";

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
      const prefills = sessionContext.mentionedService
        ? `Inquiry regarding ${sessionContext.mentionedService}`
        : sessionContext.mentionedIndustry
        ? `Inquiry for ${sessionContext.mentionedIndustry} sector`
        : "";

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
        text: t("greeting"),
        options: [
          { label: locale === "hi" ? "सेवाएं देखें" : locale === "ar" ? "استكشف الخدمات" : "Explore Practices", action: "all_services" },
          { label: locale === "hi" ? "प्रोजेक्ट शुरू करें" : locale === "ar" ? "بدء مشروع" : "Start a Project", action: "start_project" },
        ],
      };
    }

    setMessages((prev) => [...prev, userMsg, botMsg]);
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

    let botMsg: ChatMessage;

    const matched = findIntent(userText, locale, sessionContext);

    if (matched) {
      if (matched.detectedService) updateContext({ mentionedService: matched.detectedService });
      if (matched.detectedIndustry) updateContext({ mentionedIndustry: matched.detectedIndustry });

      const langKey = (locale === "hi" ? "hi" : locale === "ar" ? "ar" : "en") as "en" | "hi" | "ar";
      const options = matched.intent.options ? matched.intent.options[langKey] : undefined;

      // Select dynamic warm opener & follow-up if not greeting
      let finalResponseText = matched.responseText;
      if (matched.intent.id !== "greeting") {
        const openers = WARM_OPENERS[langKey] || WARM_OPENERS.en;
        const followups = CASUAL_FOLLOWUPS[langKey] || CASUAL_FOLLOWUPS.en;
        const opener = openers[Math.floor(Math.random() * openers.length)];
        const followup = followups[Math.floor(Math.random() * followups.length)];

        finalResponseText = `${opener}${matched.responseText}\n\n${followup}`;
      }

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
        text: finalResponseText,
        options,
        isLeadForm: matched.isLeadForm,
      };
    } else {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text:
          locale === "hi"
            ? "मैं आरव इनोवेशन की सेवाओं, तकनीकों, और परियोजनाओं से संबंधित प्रश्नों में मदद कर सकता हूँ। क्या आप अपनी आवश्यकता बताना चाहेंगे?"
            : locale === "ar"
            ? "أنا هنا لمساعدتك في استفسارات خدمات آراف إينوفيشينز ومشاريعها. هل ترغب في بدء مناقشة مشروعك؟"
            : "I can help with questions about Arav Innovations' services, architecture, or project scope. Would you like to discuss your project requirements?",
        options: [
          { label: locale === "hi" ? "सेवाएं देखें" : locale === "ar" ? "جميع الخدمات" : "Explore Practices", action: "all_services" },
          { label: locale === "hi" ? "प्रोजेक्ट शुरू करें" : locale === "ar" ? "بدء مشروع" : "Start a Project", action: "start_project" },
        ],
      };
    }

    setMessages((prev) => [...prev, userMsg, botMsg]);
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
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 sm:gap-3 motion-reduce:transition-none"
          >
            {/* Rounded Pill Prompt */}
            <button
              type="button"
              onClick={handleOpen}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white dark:bg-[#1E1915] text-[#3A2E27] dark:text-[#FAF5EE] text-xs sm:text-sm font-semibold border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl hover:shadow-2xl hover:border-[#E8672A] dark:hover:border-[#E8672A] transition-all duration-200 cursor-pointer"
            >
              <span>{locale === "hi" ? "हमसे चैट करें" : locale === "ar" ? "تحدث معنا" : "Chat with us"}</span>
              <span className="text-sm sm:text-base">👋</span>
            </button>

            {/* Circular Launcher Button */}
            <button
              type="button"
              onClick={handleOpen}
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E8672A] text-white flex items-center justify-center shadow-2xl shadow-[#E8672A]/40 hover:bg-[#d4581f] hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E8672A] focus:ring-offset-2 shrink-0"
              aria-label="Open Arav Assistant Chat"
            >
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E53E3E] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white dark:border-[#12100E] shadow-xs">
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
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-3xl bg-[#FFFDF9] dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header with Minimize Button */}
          <div className="bg-[#FBF3EA] dark:bg-[#1E1915] border-b border-[#EFE2D6] dark:border-[#2C241E] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#E8672A] text-white flex items-center justify-center shadow-xs">
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
              className="text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#3A2E27] dark:hover:text-[#FAF5EE] p-1.5 rounded-xl hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A] cursor-pointer"
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
                      ? "bg-[#E8672A] text-white rounded-br-xs"
                      : "bg-[#FBF3EA] dark:bg-[#1E1915] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E] rounded-bl-xs whitespace-pre-line"
                  )}
                >
                  {msg.text}
                </div>

                {/* Option Buttons */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleOptionClick(opt)}
                        className={cn(
                          "text-[11px] px-3 py-1.5 rounded-xl border font-medium transition-colors text-left cursor-pointer flex items-center gap-1",
                          opt.route || opt.ctaType === "page"
                            ? "bg-[#E8672A] text-white border-[#E8672A] hover:bg-[#d4581f]"
                            : "bg-white dark:bg-[#1F1A16] border-[#EFE2D6] dark:border-[#2C241E] hover:border-[#E8672A] text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FCE3D3]/30 dark:hover:bg-[#261F1A]"
                        )}
                      >
                        <span>{opt.label}</span>
                        {(opt.route || opt.ctaType === "page") && <ExternalLink className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Lead Capture Form */}
                {msg.isLeadForm && !leadSubmitted && (
                  <form
                    onSubmit={handleLeadSubmit}
                    className="w-full mt-2 p-3.5 rounded-2xl bg-white dark:bg-[#1F1A16] border border-[#EFE2D6] dark:border-[#2C241E] space-y-2.5 shadow-xs"
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
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#E8672A]"
                    />
                    <input
                      type="email"
                      placeholder={`${t("emailLabel")} *`}
                      required
                      value={leadFormState.email}
                      onChange={(e) =>
                        setLeadFormState({ ...leadFormState, email: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#E8672A]"
                    />
                    <input
                      type="tel"
                      placeholder={`${t("phoneLabel")} *`}
                      required
                      value={leadFormState.phone}
                      onChange={(e) =>
                        setLeadFormState({ ...leadFormState, phone: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#E8672A]"
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
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#E8672A] resize-none"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="w-full justify-center text-xs h-8"
                    >
                      {t("submitLead")} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </form>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <form
            onSubmit={handleCustomSend}
            className="p-3 border-t border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1E1915] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t("inputPlaceholder")}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-white dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#E8672A]"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-[#E8672A] text-white flex items-center justify-center hover:bg-[#d4581f] transition-colors shrink-0 cursor-pointer shadow-xs"
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
