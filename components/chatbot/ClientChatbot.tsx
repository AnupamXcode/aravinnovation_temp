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

    let timer: NodeJS.Timeout;
    const triggerLoad = () => setShouldLoadChatbot(true);

    // Defer loading heavy chatbot JS until browser is idle or user scrolls / interacts
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = (window as any).requestIdleCallback(triggerLoad, { timeout: 4000 });
      const handleInteraction = () => {
        triggerLoad();
        window.removeEventListener("scroll", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
      };
      window.addEventListener("scroll", handleInteraction, { passive: true });
      window.addEventListener("touchstart", handleInteraction, { passive: true });

      return () => {
        if ((window as any).cancelIdleCallback) (window as any).cancelIdleCallback(idleId);
        window.removeEventListener("scroll", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
      };
    } else {
      timer = setTimeout(triggerLoad, 3000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

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
