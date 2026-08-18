export type AnalyticsEvent =
  | { type: "page_view"; path: string; title?: string }
  | { type: "service_view"; serviceSlug: string; serviceTitle: string }
  | { type: "cta_click"; label: string; location: string; targetUrl?: string }
  | { type: "case_study_view"; caseStudySlug: string; title: string }
  | { type: "contact_started"; source: string }
  | { type: "contact_submitted"; service?: string; company?: string }
  | { type: "chatbot_started" }
  | { type: "chatbot_lead"; intent: string; service?: string }
  | { type: "resource_requested"; resourceName: string }
  | { type: "book_call"; source: string }
  | { type: "career_application"; role: string };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // Log in development for testing
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event: ${event.type}]`, event);
  }

  // Google Analytics (gtag) hook
  if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    const { type, ...payload } = event;
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", type, payload);
  }

  // Custom dataLayer push
  if (Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(event);
  }
}
