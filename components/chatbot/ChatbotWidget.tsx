"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { MessageSquare, X, Send, Bot, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useSiteConfig } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";
import {
  findMatchingService,
  isGreeting,
  isBuyingIntent,
  servicesKnowledge,
} from "@/data/chatbot-knowledge";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string; payload?: string; route?: string }[];
  isLeadForm?: boolean;
}

export function ChatbotWidget() {
  const pathname = usePathname();
  const { config } = useSiteConfig();
  const router = useRouter();

  if (pathname?.includes("/admin")) {
    return null;
  }

  const [shouldShowLauncher, setShouldShowLauncher] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! Welcome to Arav Innovations. How can we help you today?",
      options: [
        { label: "Digital Marketing", action: "service_lookup", payload: "digital-marketing" },
        { label: "Web & App Development", action: "service_lookup", payload: "web-app-development" },
        { label: "AI & Automation", action: "service_lookup", payload: "ai-solutions" },
        { label: "What services do you offer?", action: "all_services" },
        { label: "Where are your offices?", action: "locations" },
        { label: "Start a project", action: "start_project" },
      ],
    },
  ]);
  const [inputText, setInputText] = React.useState("");
  const [leadFormState, setLeadFormState] = React.useState({
    name: "",
    email: "",
    phone: "",
    requirement: "",
  });
  const [leadSubmitted, setLeadSubmitted] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Task B: Delayed trigger behavior (interaction or 10s idle timer)
  React.useEffect(() => {
    if (!config.chatbotEnabled) return;

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
  }, [config.chatbotEnabled, config.chatbotDelaySeconds]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  if (!config.chatbotEnabled) return null;

  const handleOpen = () => {
    setIsOpen(true);
    setShouldShowLauncher(true);
    trackEvent({ type: "chatbot_started" });
  };

  // Task A: Minimize chat window without clearing conversation or resetting state
  const handleMinimize = () => {
    setIsOpen(false);
    setShouldShowLauncher(true);
    try {
      sessionStorage.setItem("arav_chat_dismissed", "true");
    } catch {
      // ignore
    }
  };

  const handleOptionClick = (option: { label: string; action: string; payload?: string; route?: string }) => {
    // If option has a direct route (e.g. [ Explore Digital Marketing ])
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

    if (option.action === "service_lookup" && option.payload) {
      const match = servicesKnowledge.find((s) => s.slug === option.payload);
      if (match) {
        // Check admin service status
        const isEnabled = config.serviceStates[match.slug] !== false;
        if (!isEnabled) {
          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: `${match.name} is currently under maintenance.\n\nOur team is working on it and it will be available again soon. Feel free to contact us for specific inquiries.`,
            options: [
              { label: "Start a Project", action: "start_project" },
              { label: "Explore Other Services", action: "all_services" },
            ],
          };
        } else {
          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: `**${match.name}**\n\n${match.description}`,
            options: [
              { label: `Explore ${match.name}`, action: "navigate", route: match.route },
              { label: "Start a Project", action: "start_project" },
              { label: "Contact Us", action: "talk_advisor" },
            ],
          };
        }
      } else {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Thank you for asking! How can our team help with your requirements?",
          options: [{ label: "Start a Project", action: "start_project" }],
        };
      }
    } else if (option.action === "all_services") {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Arav Innovations provides 7 core practices:\n\n• IT Strategy & Consulting\n• Web & App Development\n• Digital Marketing (B2B)\n• Search Engine Optimization (SEO)\n• Risk Governance & Compliance\n• Audit & Improvement\n• Training & Staff Augmentation\n\nWhich area would you like to explore?",
        options: [
          { label: "Digital Marketing", action: "service_lookup", payload: "digital-marketing" },
          { label: "Web & App Development", action: "service_lookup", payload: "web-app-development" },
          { label: "IT Strategy", action: "service_lookup", payload: "it-strategy-consulting" },
          { label: "SEO & Growth", action: "service_lookup", payload: "seo" },
          { label: "Risk & Compliance", action: "service_lookup", payload: "risk-governance-compliance" },
          { label: "View All Practices", action: "navigate", route: "/services" },
        ],
      };
    } else if (option.action === "locations") {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "We operate dual regional headquarters in India (Gurgaon HQ) and the UAE (Dubai), serving enterprise clients globally across India, UAE, US, EU, and Canada.",
        options: [
          { label: "Contact Gurgaon Office", action: "start_project" },
          { label: "Contact Dubai Office", action: "start_project" },
        ],
      };
    } else if (option.action === "start_project" || option.action === "talk_advisor") {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Great! Let's get your project details so our senior advisory team can contact you within 24 hours.",
        isLeadForm: true,
      };
      trackEvent({ type: "chatbot_lead", intent: option.action });
    } else {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Hey there! 👋 How can I help you?",
        options: [
          { label: "Digital Marketing", action: "service_lookup", payload: "digital-marketing" },
          { label: "Web & App Development", action: "service_lookup", payload: "web-app-development" },
          { label: "AI & Automation", action: "service_lookup", payload: "ai-solutions" },
          { label: "Start a Project", action: "start_project" },
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

    // Task B1: Conversational Greetings
    if (isGreeting(userText)) {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Hey there! 👋 How can I help you?",
        options: [
          { label: "Digital Marketing", action: "service_lookup", payload: "digital-marketing" },
          { label: "Web Development", action: "service_lookup", payload: "web-app-development" },
          { label: "AI & Automation", action: "service_lookup", payload: "ai-solutions" },
          { label: "Start a Project", action: "start_project" },
        ],
      };
    } else {
      // Task B2: Service-aware Keyword Match
      const matchedService = findMatchingService(userText);
      if (matchedService) {
        // Check admin per-service maintenance state
        const isEnabled = config.serviceStates[matchedService.slug] !== false;

        if (!isEnabled) {
          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: `${matchedService.name} is currently under maintenance.\n\nOur team is working on it and it will be available again soon. Feel free to contact us for specific inquiries.`,
            options: [
              { label: "Start a Project", action: "start_project" },
              { label: "Explore Other Services", action: "all_services" },
            ],
          };
        } else {
          botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: `**${matchedService.name}**\n\n${matchedService.description}`,
            options: [
              { label: `Explore ${matchedService.name}`, action: "navigate", route: matchedService.route },
              { label: "Start a Project", action: "start_project" },
              { label: "Contact Us", action: "talk_advisor" },
            ],
          };
        }
      } else if (isBuyingIntent(userText)) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Absolutely! We'd be happy to discuss your requirements. Please share your project details below so our advisory team can contact you:",
          isLeadForm: true,
        };
        trackEvent({ type: "chatbot_lead", intent: "high_intent_input" });
      } else if (userText.toLowerCase().includes("office") || userText.toLowerCase().includes("location")) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "We operate dual regional delivery centers in Gurgaon (India HQ) and Dubai (UAE), serving clients globally across cross-border technical standards.",
          options: [
            { label: "Start a Project", action: "start_project" },
            { label: "Contact Us", action: "talk_advisor" },
          ],
        };
      } else {
        // Task B7: Unknown Questions (Non-hallucinating fallback)
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "I can help you with Arav Innovations' services, projects and getting in touch with our team. Could you tell me what you're looking for?",
          options: [
            { label: "Digital Marketing", action: "service_lookup", payload: "digital-marketing" },
            { label: "Web Development", action: "service_lookup", payload: "web-app-development" },
            { label: "What services do you offer?", action: "all_services" },
            { label: "Start a Project", action: "start_project" },
          ],
        };
      }
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
          service: "General Inquiry (Chatbot)",
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
          text: `Thank you, ${leadFormState.name}! We have received your inquiry. Our regional advisor will contact you at ${leadFormState.email} shortly.`,
        },
      ]);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Floating Launcher (Always visible when Chat window is closed/minimized) */}
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
              <span>Chat with us</span>
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
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-3xl bg-[#FFFDF9] dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header with Minimize Button (Task A1) */}
          <div className="bg-[#FBF3EA] dark:bg-[#1E1915] border-b border-[#EFE2D6] dark:border-[#2C241E] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#E8672A] text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Arav Assistant
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Online &bull; Operating Globally</span>
                </div>
              </div>
            </div>

            {/* X Minimize Button (Task A1: Minimize to floating launcher) */}
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

                {/* Quick Option & Page-directed Buttons (Task B5) */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleOptionClick(opt)}
                        className={cn(
                          "text-[11px] px-3 py-1.5 rounded-xl border font-medium transition-colors text-left cursor-pointer flex items-center gap-1",
                          opt.route
                            ? "bg-[#E8672A] text-white border-[#E8672A] hover:bg-[#d4581f]"
                            : "bg-white dark:bg-[#1F1A16] border-[#EFE2D6] dark:border-[#2C241E] hover:border-[#E8672A] text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FCE3D3]/30 dark:hover:bg-[#261F1A]"
                        )}
                      >
                        <span>{opt.label}</span>
                        {opt.route && <ExternalLink className="w-3 h-3" />}
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
                      Quick Project Consultation Request
                    </div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={leadFormState.name}
                      onChange={(e) =>
                        setLeadFormState({ ...leadFormState, name: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#E8672A]"
                    />
                    <input
                      type="email"
                      placeholder="Work Email *"
                      required
                      value={leadFormState.email}
                      onChange={(e) =>
                        setLeadFormState({ ...leadFormState, email: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#E8672A]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp *"
                      required
                      value={leadFormState.phone}
                      onChange={(e) =>
                        setLeadFormState({ ...leadFormState, phone: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-1 focus:ring-[#E8672A]"
                    />
                    <textarea
                      placeholder="Brief requirement..."
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
                      Connect with Advisor <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
              placeholder="Ask anything about Arav..."
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
