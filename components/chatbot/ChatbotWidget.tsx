"use client";

import * as React from "react";
import { MessageSquare, X, Send, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string; payload?: string }[];
  isLeadForm?: boolean;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! Welcome to Arav Innovations. How can we help you today?",
      options: [
        { label: "What services do you offer?", action: "services" },
        { label: "Where are your offices?", action: "locations" },
        { label: "I want to start a project", action: "start_project" },
        { label: "Speak with an advisor", action: "talk_advisor" },
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

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent({ type: "chatbot_started" });
  };

  const handleOptionClick = (option: { label: string; action: string; payload?: string }) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: option.label,
    };

    let botMsg: ChatMessage;

    switch (option.action) {
      case "services":
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Arav Innovations provides 7 core practices:\n\n1. IT Strategy & Consulting\n2. Web & App Development\n3. Digital Marketing (B2B)\n4. SEO & Organic Growth\n5. Risk Governance & Compliance (DPDP/SOC2/ISO)\n6. Audit & Improvement\n7. Training & Staff Augmentation\n\nWhich area are you interested in?",
          options: [
            { label: "Web & App Development", action: "start_project", payload: "Web & App Development" },
            { label: "IT Strategy & Cloud", action: "start_project", payload: "IT Strategy" },
            { label: "Risk & Compliance", action: "start_project", payload: "Risk Governance" },
            { label: "Digital Marketing / SEO", action: "start_project", payload: "Digital Marketing" },
          ],
        };
        break;

      case "locations":
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "We operate dual regional delivery centers in India (Bengaluru / Noida) and the UAE (Dubai), serving clients globally across cross-border technical standards.",
          options: [
            { label: "Start a project with India team", action: "start_project" },
            { label: "Start a project with UAE team", action: "start_project" },
          ],
        };
        break;

      case "start_project":
      case "talk_advisor":
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Great! Let's get your details so our leadership team can prepare an exploratory briefing for you.",
          isLeadForm: true,
        };
        trackEvent({
          type: "chatbot_lead",
          intent: option.action,
          service: option.payload,
        });
        break;

      default:
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Thank you for reaching out! You can explore our services or schedule a direct consultation.",
          options: [
            { label: "Explore All 7 Services", action: "services" },
            { label: "Talk to an Expert", action: "start_project" },
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

    const lower = userText.toLowerCase();
    let botMsg: ChatMessage;

    if (
      lower.includes("website") ||
      lower.includes("app") ||
      lower.includes("hire") ||
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("quote") ||
      lower.includes("project")
    ) {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "I can help connect you with our engineering & advisory team for that. Please share your contact details below:",
        isLeadForm: true,
      };
      trackEvent({ type: "chatbot_lead", intent: "high_intent_keyword" });
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone")) {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "You can reach us at connect@aravinnovations.com or fill out the quick callback form below:",
        isLeadForm: true,
      };
    } else {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Thanks for your question! Here are a few quick options to help you navigate:",
        options: [
          { label: "View Our 7 Practices", action: "services" },
          { label: "Our Regional Offices", action: "locations" },
          { label: "Start a Project Discussion", action: "start_project" },
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
      {/* Floating 3D Chat Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#E8672A] px-4 py-3 text-white shadow-2xl shadow-[#E8672A]/40 hover:bg-[#d4581f] hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E8672A] focus:ring-offset-2"
          aria-label="Open Arav Assistant"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-bold font-display hidden sm:inline">
            Arav Advisor
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-3xl bg-[#FFFDF9] dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
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
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#3A2E27] dark:hover:text-[#FAF5EE] p-1.5 rounded-xl hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
              aria-label="Close Chat"
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

                {/* Quick Option Buttons */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleOptionClick(opt)}
                        className="text-[11px] px-3 py-1.5 rounded-xl bg-white dark:bg-[#1F1A16] border border-[#EFE2D6] dark:border-[#2C241E] hover:border-[#E8672A] text-[#3A2E27] dark:text-[#FAF5EE] font-medium transition-colors hover:bg-[#FCE3D3]/30 dark:hover:bg-[#261F1A] text-left cursor-pointer"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Lead Capture in Chat */}
                {msg.isLeadForm && !leadSubmitted && (
                  <form
                    onSubmit={handleLeadSubmit}
                    className="w-full mt-2 p-3.5 rounded-2xl bg-white dark:bg-[#1F1A16] border border-[#EFE2D6] dark:border-[#2C241E] space-y-2.5 shadow-xs"
                  >
                    <div className="text-[11px] font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                      Quick Contact Request
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
