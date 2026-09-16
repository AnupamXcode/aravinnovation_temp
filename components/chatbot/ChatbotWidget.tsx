import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { MessageSquare, X, Send, Bot, ExternalLink, Mic, Volume2, VolumeX, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useSiteConfig } from "@/lib/site-config";
import { useSiteContent } from "@/lib/site-content";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  findIntent,
  chatbotIntents,
  ChatSessionContext,
  ChatbotIntentOption,
  serviceCardsData,
  productCardsData,
  getGreetingQuickReplies,
  ServiceCardData,
  ProductCardData,
} from "@/data/chatbot-knowledge";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: ChatbotIntentOption[];
  recommendedServiceSlug?: string;
  recommendedProductSlug?: string;
  isLeadConfirm?: boolean;
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

  const [sessionContext, setSessionContext] = React.useState<ChatSessionContext>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedContext = sessionStorage.getItem("arav_chat_context");
        if (savedContext) {
          const parsed = JSON.parse(savedContext);
          return { ...parsed, locale };
        }
      } catch {
        // ignore
      }
    }
    return {
      locale,
      conversationStage: "GREETING",
      history: [],
    };
  });

  const [leadFormState, setLeadFormState] = React.useState({
    name: "",
    company: "",
    industry: "",
    email: "",
    phone: "",
    requirement: "",
  });

  const getInitialWelcomeMessage = (userName?: string): ChatMessage => {
    if (userName) {
      const text =
        locale === "hi"
          ? `नमस्ते ${userName}! 👋 आपसे मिलकर दोबारा खुशी हुई।\n\nआज आप किस परियोजना या तकनीक पर काम करना चाहते हैं?`
          : locale === "de"
          ? `Hallo ${userName}! 👋 Schön, Sie wiederzusehen.\n\nWobei kann ich Ihnen heute bei Arav Innovations helfen?`
          : locale === "ar"
          ? `أهلاً ${userName}! 👋 يسعدنا التواصل معك مجدداً.\n\nما الذي تتطلع لبنائه أو تحسينه اليوم؟`
          : `Hi ${userName}! 👋 Great to see you again.\n\nWhat are you working on right now?`;

      return {
        id: "welcome-name",
        sender: "bot",
        text,
        options: getGreetingQuickReplies(locale, userName),
      };
    }

    const defaultIntro =
      chatbotKB?.defaultGreeting ||
      (locale === "hi"
        ? "नमस्ते! 👋 मैं आरव इनोवेशन सहायक हूँ।\n\nमैं सही तकनीक, डिजिटल ग्रोथ, एआई या अनुपालन समाधान खोजने में आपकी मदद कर सकता हूँ।\n\nआप अभी किस पर काम कर रहे हैं?"
        : locale === "de"
        ? "Hallo! 👋 Ich bin der Arav Innovations Assistent.\n\nIch helfe Ihnen, die richtige Technologie-, Wachstums-, KI- oder Compliance-Lösung zu finden.\n\nWoran arbeiten Sie derzeit?"
        : locale === "ar"
        ? "مرحباً! 👋 أنا مساعد آراف إينوفيشينز.\n\nيمكنني مساعدتك في تحديد الحل التقني، النمو الرقمي، أو الذكاء الاصطناعي المناسب.\n\nما الذي تعمل عليه الآن؟"
        : "Hi! 👋 I'm the Arav Innovations assistant.\n\nI can help you figure out the right technology, digital growth, AI, or governance solution.\n\nWhat are you working on right now?");

    return {
      id: "welcome",
      sender: "bot",
      text: defaultIntro,
      options: getGreetingQuickReplies(locale),
    };
  };

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
    return [getInitialWelcomeMessage(sessionContext.userName)];
  });

  const [inputText, setInputText] = React.useState("");
  const [leadSubmitted, setLeadSubmitted] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const initialInputRef = React.useRef<string>("");
  const [voiceStatusMsg, setVoiceStatusMsg] = React.useState<string | null>(null);

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

  const toggleListening = async () => {
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

    setVoiceStatusMsg(null);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (err: any) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setVoiceStatusMsg("Microphone access was denied. Please allow microphone access for this site.");
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          setVoiceStatusMsg("No microphone hardware found.");
        } else {
          setVoiceStatusMsg("Microphone access could not be granted. Please check browser settings.");
        }
        setTimeout(() => setVoiceStatusMsg(null), 4000);
        return;
      }
    }

    try {
      initialInputRef.current = inputText.trim();

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      const speechLang =
        locale === "hi"
          ? "hi-IN"
          : locale === "de"
          ? "de-DE"
          : locale === "ar"
          ? "ar-SA"
          : chatbotKB?.speechLanguage || "en-US";

      recognition.lang = speechLang;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onerror = (event: any) => {
        setIsListening(false);
        const err = event?.error;
        if (err === "aborted") return;
        if (err === "not-allowed") {
          setVoiceStatusMsg("Microphone access was denied. Please allow microphone access.");
        } else if (err === "no-speech") {
          setVoiceStatusMsg("No speech detected. Please try again.");
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
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setVoiceStatusMsg("Read Aloud is not supported in this browser.");
      setTimeout(() => setVoiceStatusMsg(null), 3000);
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const spokenText = cleanSpeechText(rawText);
    if (!spokenText) return;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    const targetLang =
      locale === "hi"
        ? "hi-IN"
        : locale === "de"
        ? "de-DE"
        : locale === "ar"
        ? "ar-SA"
        : chatbotKB?.speechLanguage || "en-US";

    utterance.lang = targetLang;

    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = targetLang.split("-")[0];
        const match =
          voices.find((v) => v.lang === targetLang) ||
          voices.find((v) => v.lang.startsWith(langPrefix));
        if (match) {
          utterance.voice = match;
        }
      }
    } catch {
      // fallback
    }

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Delayed launcher trigger
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
      if (window.scrollY > 150) showLauncher();
    };

    const handleClick = () => showLauncher();

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

  // Centralized lead submission to backend
  const handleLeadSubmitInternal = async (overrideData?: typeof leadFormState) => {
    const dataToSend = overrideData || leadFormState;
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: dataToSend.name || sessionContext.userName || "Website Visitor",
          company: dataToSend.company || sessionContext.userCompany || "Direct Enquiry",
          email: dataToSend.email || sessionContext.userEmail || "visitor@aravinnovations.com",
          phone: dataToSend.phone || sessionContext.userPhone || "N/A",
          service: sessionContext.mentionedService || "Strategy & AI Consultation",
          requirement: dataToSend.requirement || sessionContext.userRequirement || "Enquiry captured via Arav Assistant",
          timeline: "1 - 3 Months",
          source: "chatbot",
        }),
      });
      setLeadSubmitted(true);
      updateContext({ leadStep: undefined, conversationStage: "RECOMMENDED" });
      trackEvent({ type: "chatbot_lead", intent: "chatbot_enquiry", service: sessionContext.mentionedService });
    } catch {
      // ignore
    }
  };

  // Handle clicking contextual option chips
  const handleOptionClick = (option: ChatbotIntentOption) => {
    if (option.action === "show_service_link" && option.route) {
      trackEvent({ type: "service_view", serviceSlug: option.route, serviceTitle: option.label });
      router.push(option.route);
      return;
    }

    if (option.route && option.action === "navigate") {
      router.push(option.route);
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: option.label,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botMsg: ChatMessage;

      if (option.action === "intent_trigger" && option.payload) {
        const intentObj = chatbotIntents.find((i) => i.id === option.payload);
        if (intentObj) {
          const langKey = (locale === "hi" ? "hi" : locale === "de" ? "de" : locale === "ar" ? "ar" : "en") as "en" | "hi" | "de" | "ar";
          let text = intentObj.response[langKey] || intentObj.response.en;

          if (sessionContext.userName && !text.includes("👋") && Math.random() < 0.3) {
            const namePrefix = locale === "hi" ? `${sessionContext.userName}, ` : locale === "de" ? `Gut, ${sessionContext.userName}. ` : `Got it, ${sessionContext.userName}. `;
            text = `${namePrefix}${text}`;
          }

          const opts = intentObj.options ? intentObj.options[langKey] || intentObj.options.en : undefined;

          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text,
            options: opts,
            recommendedServiceSlug: intentObj.associatedServiceSlug,
            recommendedProductSlug: intentObj.associatedProductSlug,
          };
          updateContext({
            lastIntentId: intentObj.id,
            mentionedService: intentObj.associatedServiceSlug || sessionContext.mentionedService,
            mentionedProduct: intentObj.associatedProductSlug || sessionContext.mentionedProduct,
          });
        } else {
          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "Let me help you explore our capabilities or connect with our team. What are you looking to achieve?",
            options: getGreetingQuickReplies(locale, sessionContext.userName),
          };
        }
      } else if (option.action === "progressive_lead") {
        const prefills = option.payload || "Expert Consultation";
        setLeadFormState((prev) => ({ ...prev, requirement: prefills }));

        if (!sessionContext.userName) {
          updateContext({ userRequirement: prefills, leadStep: "NAME", conversationStage: "LEAD_CAPTURE" });
          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: locale === "hi"
              ? "ज़रूर! मैं आपको हमारी टीम से जोड़ने में मदद करूँगा। 🤝\n\nआगे बढ़ने से पहले, आपका नाम क्या है?"
              : locale === "de"
              ? "Gerne! Ich verbinde Sie mit unserem Team. 🤝\n\nWie heißen Sie?"
              : "Sure! I'd be happy to connect you with an Arav specialist. 🤝\n\nBefore we begin, what should I call you?",
          };
        } else {
          updateContext({ userRequirement: prefills, leadStep: "COMPANY", conversationStage: "LEAD_CAPTURE" });
          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: locale === "hi"
              ? `बहुत बढ़िया, ${sessionContext.userName}! आप किस कंपनी या संगठन का प्रतिनिधित्व करते हैं?`
              : locale === "de"
              ? `Wunderbar, ${sessionContext.userName}! Für welches Unternehmen sind Sie tätig?`
              : `Great, ${sessionContext.userName}! What company or organization do you represent?`,
          };
        }
      } else {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "What area would you like to explore next?",
          options: getGreetingQuickReplies(locale, sessionContext.userName),
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      if (chatbotKB?.autoReadAloud) {
        toggleReadAloud(botMsg.id, botMsg.text);
      }
    }, 450);
  };

  // Free-text user input handler & natural language processing
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

      // STEP 1: Name Step in Progressive Lead Capture
      if (sessionContext.leadStep === "NAME") {
        const cleanName = userText.replace(/my name is|i am|iam|call me|myself|this is/gi, "").trim();
        const userName = cleanName || userText;

        setLeadFormState((prev) => ({ ...prev, name: userName }));
        updateContext({ userName, leadStep: "COMPANY" });

        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: locale === "hi"
            ? `धन्यवाद, ${userName}! 🤝 आप किस कंपनी या संगठन में काम करते हैं?`
            : locale === "de"
            ? `Vielen Dank, ${userName}! 🤝 Für welches Unternehmen arbeiten Sie?`
            : `Thanks, ${userName}! 🤝 What company or organization do you represent?`,
        };
      }
      // STEP 2: Company Step
      else if (sessionContext.leadStep === "COMPANY") {
        setLeadFormState((prev) => ({ ...prev, company: userText }));
        updateContext({ userCompany: userText, leadStep: "EMAIL" });

        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: locale === "hi"
            ? `समझ गया। एक वरिष्ठ विशेषज्ञ द्वारा संपर्क के लिए आपका वर्क ईमेल (Work Email) क्या है?`
            : locale === "de"
            ? `Verstanden. Welche geschäftliche E-Mail-Adresse ist am besten geeignet?`
            : `Got it. What's the best work email for an Arav specialist to reach you?`,
        };
      }
      // STEP 3: Email Step
      else if (sessionContext.leadStep === "EMAIL") {
        setLeadFormState((prev) => ({ ...prev, email: userText }));
        updateContext({ userEmail: userText, leadStep: "PHONE" });

        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: locale === "hi"
            ? `धन्यवाद! और त्वरित बातचीत के लिए आपका फोन नंबर क्या है?`
            : locale === "de"
            ? `Vielen Dank! Und wie lautet Ihre Telefonnummer für Rückfragen?`
            : `Thanks! What is your contact phone number?`,
        };
      }
      // STEP 4: Phone Step & Confirmation Card
      else if (sessionContext.leadStep === "PHONE") {
        const finalState = { ...leadFormState, phone: userText };
        setLeadFormState(finalState);
        updateContext({ userPhone: userText, leadStep: "CONFIRM" });

        const nameVal = finalState.name || sessionContext.userName || "Client";
        const companyVal = finalState.company || "Company";
        const emailVal = finalState.email || "Email";

        const text =
          locale === "hi"
            ? `धन्यवाद, ${nameVal}! मैंने आपकी पूछताछ की जानकारी दर्ज कर ली है:\n\n• नाम: ${nameVal}\n• कंपनी: ${companyVal}\n• ईमेल: ${emailVal}\n• फोन: ${userText}\n\nक्या आप चाहते हैं कि मैं इसे आरव विशेषज्ञों को भेजूं?`
            : locale === "de"
            ? `Vielen Dank, ${nameVal}! Ich habe Ihre Details notiert:\n\n• Name: ${nameVal}\n• Firma: ${companyVal}\n• E-Mail: ${emailVal}\n• Telefon: ${userText}\n\nSoll ich Ihre Anfrage an das Arav-Team übermitteln?`
            : `Thanks, ${nameVal}! I've noted your enquiry details:\n\n• Name: ${nameVal}\n• Company: ${companyVal}\n• Email: ${emailVal}\n• Phone: ${userText}\n\nWould you like me to submit this enquiry to an Arav specialist now?`;

        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text,
          isLeadConfirm: true,
          options: [
            {
              label: locale === "hi" ? "पूछताछ भेजें →" : locale === "de" ? "Anfrage absenden →" : "Submit Enquiry →",
              action: "intent_trigger",
              payload: "confirm_submit_lead",
            },
          ],
        };
      }
      // STEP 5: Lead Submission Confirmation
      else if (userText.toLowerCase().includes("confirm_submit_lead") || sessionContext.leadStep === "CONFIRM") {
        handleLeadSubmitInternal();
        const text =
          locale === "hi"
            ? `धन्यवाद, ${sessionContext.userName || ""}! आपकी पूछताछ सफलतापूर्वक आरव टीम को भेज दी गई है। एक वरिष्ठ सलाहकार जल्द ही आपसे संपर्क करेगा।`
            : locale === "de"
            ? `Vielen Dank, ${sessionContext.userName || ""}! Ihre Anfrage wurde erfolgreich an das Arav-Team übermittelt.`
            : `Thanks, ${sessionContext.userName || ""}! Your enquiry has been received. An Arav technical specialist will reach out to you shortly.`;

        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text,
          options: getGreetingQuickReplies(locale, sessionContext.userName),
        };
        updateContext({ leadStep: undefined });
      }
      // STEP 6: Intent Matching & Natural Conversation
      else {
        const matched = findIntent(userText, locale, sessionContext);

        if (matched) {
          updateContext({
            lastIntentId: matched.intent.id,
            mentionedService: matched.detectedService || sessionContext.mentionedService,
            mentionedProduct: matched.detectedProduct || sessionContext.mentionedProduct,
          });

          const langKey = (locale === "hi" ? "hi" : locale === "de" ? "de" : locale === "ar" ? "ar" : "en") as "en" | "hi" | "de" | "ar";
          const options = matched.intent.options ? matched.intent.options[langKey] || matched.intent.options.en : undefined;

          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: matched.responseText,
            options,
            recommendedServiceSlug: matched.detectedService,
            recommendedProductSlug: matched.detectedProduct,
          };
        } else {
          // Dynamic Conversational Fallback with Context Memory
          const nameRef = sessionContext.userName ? `, ${sessionContext.userName}` : "";
          const fallbackText =
            chatbotKB?.fallbackResponse ||
            (locale === "hi"
              ? `मैं समझ गया${nameRef}।\n\nयह देखने के लिए कि क्या सबसे उपयुक्त होगा: क्या आप नया प्रोजेक्ट बनाना चाहते हैं, किसी मौजूदा प्रणाली को सुधारना चाहते हैं, या ग्रोथ / अनुपालन में मदद चाहते हैं?`
              : locale === "de"
              ? `Ich verstehe${nameRef}.\n\nUm die beste Lösung zu finden: Möchten Sie ein neues Projekt bauen, ein bestehendes System verbessern oder suchen Sie nach Wachstum / Compliance?`
              : `Got it${nameRef}.\n\nTo point you to the right solution: Are you looking to build something new, improve an existing system, grow search traffic, or explore compliance?`);

          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: fallbackText,
            options: getGreetingQuickReplies(locale, sessionContext.userName),
          };
        }
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      if (chatbotKB?.autoReadAloud) {
        toggleReadAloud(botMsg.id, botMsg.text);
      }
    }, 450);
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
            {/* Rounded Pill Badge */}
            <button
              type="button"
              onClick={handleOpen}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#0a0a0a] text-[#3A2E27] dark:text-[#FAF5EE] text-xs sm:text-sm font-semibold border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl hover:shadow-2xl hover:border-[#f15e1c] dark:hover:border-[#f15e1c] transition-all duration-200 cursor-pointer"
            >
              <span>{locale === "hi" ? "हमसे बात करें" : locale === "de" ? "Mit uns sprechen" : locale === "ar" ? "تحدث معنا" : "Strategy & AI Assistant"}</span>
              <span className="text-sm">👋</span>
            </button>

            {/* Circular Launcher Button */}
            <button
              type="button"
              onClick={handleOpen}
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f15e1c] text-white flex items-center justify-center shadow-2xl shadow-[#f15e1c]/40 hover:bg-[#d4581f] hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f15e1c] focus:ring-offset-2 shrink-0"
              aria-label="Open Arav Assistant Chat"
            >
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#2e936f] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white dark:border-[#000000] shadow-xs">
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
          className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[420px] h-[580px] max-h-[calc(100vh-4.5rem)] rounded-3xl bg-[#FFFDF9] dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#FBF3EA] dark:bg-[#0a0a0a] border-b border-[#EFE2D6] dark:border-[#1f1f1f] px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#f15e1c] text-white flex items-center justify-center shadow-md shadow-[#f15e1c]/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  {t("headerTitle") || "Arav Strategy & AI Consultant"}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                  <span className="w-2 h-2 rounded-full bg-[#2e936f]" />
                  <span>{t("onlineStatus") || "Online"}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleMinimize}
              className="text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#3A2E27] dark:hover:text-[#FAF5EE] p-1.5 rounded-xl hover:bg-[#FCE3D3]/40 dark:hover:bg-[#161616] cursor-pointer"
              aria-label="Minimize Chat Window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => {
              const serviceCard = msg.recommendedServiceSlug ? serviceCardsData[msg.recommendedServiceSlug] : undefined;
              const productCard = msg.recommendedProductSlug ? productCardsData[msg.recommendedProductSlug] : undefined;

              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col",
                    msg.sender === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl p-3.5 leading-relaxed",
                      msg.sender === "user"
                        ? "bg-[#f15e1c] text-white rounded-br-xs font-medium shadow-xs"
                        : "bg-[#FBF3EA] dark:bg-[#0a0a0a] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#1f1f1f] rounded-bl-xs whitespace-pre-line font-medium"
                    )}
                  >
                    {msg.text}

                    {/* Compact In-Chat Service Recommendation Card */}
                    {serviceCard && (
                      <div className="mt-3 p-3 rounded-xl bg-white dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#222222] shadow-sm space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-[#f15e1c]">
                          <Sparkles className="w-3 h-3" />
                          <span>RECOMMENDED SERVICE</span>
                        </div>
                        <h5 className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                          {serviceCard.title}
                        </h5>
                        <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] leading-snug">
                          {serviceCard.tagline}
                        </p>
                        <ul className="space-y-1 text-[11px] text-[#3A2E27] dark:text-[#EAE2D9]">
                          {serviceCard.capabilities.slice(0, 3).map((cap, cIdx) => (
                            <li key={cIdx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2e936f] shrink-0" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => router.push(serviceCard.route)}
                            className="text-[11px] px-3 py-1.5 rounded-lg bg-[#f15e1c] text-white font-bold hover:bg-[#d4581f] transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>Explore Service</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOptionClick({ label: `Talk to ${serviceCard.title} Expert`, action: "progressive_lead", payload: serviceCard.title })}
                            className="text-[11px] px-3 py-1.5 rounded-lg bg-[#2e936f] text-white font-bold hover:bg-[#25775a] transition-all cursor-pointer"
                          >
                            Talk to Expert
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Compact In-Chat Product Card */}
                    {productCard && (
                      <div className="mt-3 p-3 rounded-xl bg-white dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#222222] shadow-sm space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-[#2e936f]">
                          <Sparkles className="w-3 h-3" />
                          <span>ARAV PRODUCT PLATFORM</span>
                        </div>
                        <h5 className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                          {productCard.name} ({productCard.domain || ""})
                        </h5>
                        <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] leading-snug">
                          {productCard.description}
                        </p>
                        <div className="pt-1 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => router.push(productCard.route)}
                            className="text-[11px] px-3 py-1.5 rounded-lg bg-[#2e936f] text-white font-bold hover:bg-[#25775a] transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Platform Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          {productCard.externalUrl && (
                            <a
                              href={productCard.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] px-3 py-1.5 rounded-lg border border-[#EFE2D6] dark:border-[#222222] text-[#3A2E27] dark:text-[#FAF5EE] hover:border-[#f15e1c] transition-all flex items-center gap-1"
                            >
                              <span>Visit Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Read Aloud Toggle Button */}
                  {msg.sender === "bot" && (
                    <button
                      type="button"
                      onClick={() => toggleReadAloud(msg.id, msg.text)}
                      className="mt-1 flex items-center gap-1 text-[10px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] transition-colors cursor-pointer"
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
                          <span>🔊 Read Aloud</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Option Quick Reply Chips (Max 2-4 chips) */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleOptionClick(opt)}
                          className={cn(
                            "text-[11px] px-3 py-1.5 rounded-xl border font-semibold transition-all duration-200 text-left cursor-pointer flex items-center gap-1 shadow-2xs",
                            opt.route || opt.action === "show_service_link"
                              ? "bg-[#f15e1c] text-white border-[#f15e1c] hover:bg-[#d4581f] hover:scale-[1.02]"
                              : "bg-white dark:bg-[#0a0a0a] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c] text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#161616]"
                          )}
                        >
                          <span>{opt.label}</span>
                          {(opt.route || opt.action === "show_service_link") && <ExternalLink className="w-3 h-3 ml-0.5 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-2.5 px-3.5 rounded-2xl bg-[#FBF3EA] dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] w-max text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                <Bot className="w-4 h-4 text-[#f15e1c] animate-bounce" />
                <span className="font-mono text-[11px] font-medium">Arav Consultant is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Listening Overlay */}
          {isListening && (
            <div className="px-4 py-2 bg-[#f15e1c] text-white text-[11px] font-mono font-bold flex items-center justify-between animate-pulse">
              <span>🎙️ Listening... Speak your requirement</span>
              <button type="button" onClick={toggleListening} className="underline text-xs cursor-pointer">Cancel</button>
            </div>
          )}

          {/* Voice Warning Status */}
          {voiceStatusMsg && !isListening && (
            <div role="status" className="px-4 py-2 bg-[#fab60a]/15 border-t border-[#fab60a]/30 text-[#3A2E27] dark:text-[#ffec69] text-[11px] font-mono font-bold flex items-center justify-between">
              <span>{voiceStatusMsg}</span>
              <button type="button" onClick={() => setVoiceStatusMsg(null)} aria-label="Dismiss" className="text-xs font-extrabold ml-2">✕</button>
            </div>
          )}

          {/* Bottom Chat Input Bar */}
          <form
            onSubmit={handleCustomSend}
            className="p-3 border-t border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#0a0a0a] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={isListening ? "Listening to your voice..." : t("inputPlaceholder") || "Ask anything or type your answer..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-white dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#f15e1c]"
            />
            {/* Voice Microphone Button */}
            <button
              type="button"
              onClick={toggleListening}
              aria-pressed={isListening}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f15e1c]",
                isListening
                  ? "bg-rose-500 text-white animate-pulse shadow-rose-500/40"
                  : "bg-white dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] text-[#f15e1c] hover:bg-[#FCE3D3]/40"
              )}
              aria-label={isListening ? t("micStopAriaLabel") : t("micStartAriaLabel")}
              title={isListening ? t("micStopTitle") : t("micStartTitle")}
            >
              <Mic className={cn("w-4 h-4", isListening && "animate-bounce")} />
            </button>
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-[#f15e1c] text-white flex items-center justify-center hover:bg-[#d4581f] transition-colors shrink-0 cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
