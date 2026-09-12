"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const PageLoader = dynamic(
  () => import("@/components/layout/PageLoader").then((mod) => mod.PageLoader),
  { ssr: false }
);

const WebsiteShutdownOverlay = dynamic(
  () => import("@/components/layout/WebsiteShutdownOverlay").then((mod) => mod.WebsiteShutdownOverlay),
  { ssr: false }
);

const BackToTop = dynamic(
  () => import("@/components/ui/BackToTop").then((mod) => mod.BackToTop),
  { ssr: false }
);

const SetupCall = dynamic(
  () => import("@/components/layout/SetupCall").then((mod) => mod.SetupCall),
  { ssr: false }
);

const MobilePreviewToggle = dynamic(
  () => import("@/components/layout/MobilePreviewToggle").then((mod) => mod.MobilePreviewToggle),
  { ssr: false }
);

const ClientChatbot = dynamic(
  () => import("@/components/chatbot/ClientChatbot").then((mod) => mod.ClientChatbot),
  { ssr: false }
);

export function ClientOverlays({ children }: { children: React.ReactNode }) {
  return (
    <WebsiteShutdownOverlay>
      <PageLoader />
      {children}
      <BackToTop />
      <SetupCall />
      <ClientChatbot />
      {(process.env.NODE_ENV === "development" || process.env.VERCEL_ENVIRONMENT === "development") && (
        <MobilePreviewToggle />
      )}
    </WebsiteShutdownOverlay>
  );
}
