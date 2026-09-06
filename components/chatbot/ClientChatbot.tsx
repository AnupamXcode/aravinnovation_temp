"use client";

import dynamic from "next/dynamic";

const ChatbotWidgetComponent = dynamic(
  () => import("./ChatbotWidget").then((mod) => mod.ChatbotWidget),
  { ssr: false }
);

export function ClientChatbot() {
  return <ChatbotWidgetComponent />;
}
