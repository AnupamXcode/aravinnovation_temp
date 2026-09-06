"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";

const ChatbotWidgetComponent = dynamic(
  () => import("./ChatbotWidget").then((mod) => mod.ChatbotWidget),
  { ssr: false }
);

export function ClientChatbot() {
  const pathname = usePathname();
  const [shouldLoadChatbot, setShouldLoadChatbot] = React.useState(false);

  React.useEffect(() => {
    if (pathname?.includes("/admin")) return;
    if (shouldLoadChatbot) return;

    // Load heavy AI chatbot chunk on user interaction (click, scroll > 300px, or pointer hover)
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShouldLoadChatbot(true);
        cleanup();
      }
    };

    const handleTouch = () => {
      setShouldLoadChatbot(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouch);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });

    return cleanup;
  }, [pathname, shouldLoadChatbot]);

  if (pathname?.includes("/admin")) {
    return null;
  }

  if (!shouldLoadChatbot) {
    return (
      <div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 pointer-events-auto"
        style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          type="button"
          onClick={() => setShouldLoadChatbot(true)}
          onPointerEnter={() => setShouldLoadChatbot(true)}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f15e1c] text-white flex items-center justify-center shadow-2xl shadow-[#f15e1c]/40 hover:bg-[#d4581f] transition-all duration-200 cursor-pointer shrink-0"
          aria-label="Open Arav Assistant Chat"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E53E3E] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white dark:border-[#000000] shadow-xs">
            1
          </span>
        </button>
      </div>
    );
  }

  return <ChatbotWidgetComponent />;
}
