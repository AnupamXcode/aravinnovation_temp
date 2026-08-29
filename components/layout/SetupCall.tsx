"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Phone, Calendar, MessageCircle, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const UAE_PHONE_DISPLAY = "UAE Regional Office (+971 521555792)";
const UAE_PHONE_TEL = "tel:+971521555792";
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export function SetupCall() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<string>("");

  React.useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent<{ service?: string }>;
      if (customEvent.detail?.service) {
        setSelectedService(customEvent.detail.service);
      }
      setIsOpen(true);
    };

    window.addEventListener("arav:open-setup-call", handleOpenModal);
    return () => {
      window.removeEventListener("arav:open-setup-call", handleOpenModal);
    };
  }, []);

  // Hide on admin routes
  if (pathname?.includes("/admin")) {
    return null;
  }

  const handleScheduleClick = () => {
    setIsOpen(false);
    const serviceName = selectedService || pathname?.split("/services/")[1] || "";
    const intentQuery = serviceName ? `?intent=setup-call&service=${serviceName}` : "?intent=setup-call";
    router.push(`/contact${intentQuery}`);
  };

  return (
    <>
      {/* Setup Call Interactive Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#101b17]/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 sm:p-8 space-y-6 text-left"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f15e1c]/10 text-[#f15e1c] text-[11px] font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Direct Executive Scoping</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-[#1b2823] dark:text-[#ffffff]">
                    Setup a Project Call
                  </h3>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">
                    Connect directly with our engineering and strategy leadership.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-[#4a5c55] dark:text-[#d3eee4] hover:bg-[#f7d7b0]/50 dark:hover:bg-[#253630] transition-colors cursor-pointer"
                  aria-label="Close setup call window"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Cards */}
              <div className="space-y-3">
                {/* 1. Direct Telephone Call */}
                <a
                  href={UAE_PHONE_TEL}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] transition-all group cursor-pointer shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-[#f15e1c] text-white shrink-0 shadow-xs">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-mono text-[#f15e1c] uppercase tracking-wider">
                        Direct Phone Call
                      </div>
                      <div className="text-sm font-extrabold text-[#1b2823] dark:text-[#ffffff]">
                        {UAE_PHONE_DISPLAY}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#f15e1c] group-hover:translate-x-1 transition-transform" />
                </a>

                {/* 2. Instant WhatsApp Inquiry */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#253630] hover:border-[#2e936f] dark:hover:border-[#2e936f] transition-all group cursor-pointer shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-[#2e936f] text-white shrink-0 shadow-xs">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-mono text-[#2e936f] uppercase tracking-wider">
                        Instant Messaging
                      </div>
                      <div className="text-sm font-extrabold text-[#1b2823] dark:text-[#ffffff]">
                        Instant WhatsApp Inquiry
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#2e936f] group-hover:translate-x-1 transition-transform" />
                </a>

                {/* 3. Detailed Online Scoping Form */}
                <button
                  type="button"
                  onClick={handleScheduleClick}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] transition-all group cursor-pointer shadow-xs hover:shadow-md text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-[#fab60a] text-white shrink-0 shadow-xs">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-mono text-[#f15e1c] uppercase tracking-wider">
                        Online Project Scoping
                      </div>
                      <div className="text-sm font-extrabold text-[#1b2823] dark:text-[#ffffff]">
                        Schedule Detailed Scoping Call
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#f15e1c] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Modal Footer SLA Trust Badge */}
              <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] flex items-center justify-between text-xs text-[#2e936f] font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> Strict NDA &amp; Confidentiality
                </span>
                <span className="font-mono text-[10px] text-[#4a5c55] dark:text-[#d3eee4]">
                  Response &lt; 2 hrs
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
