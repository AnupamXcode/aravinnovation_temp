/**
 * Web Vitals & Performance Observer Utility
 * Reference: Delta Prompt 31 Performance Optimization
 */

export function reportWebVitals(metric: { name: string; value: number; id?: string }) {
  if (typeof window === "undefined" || metric.value < 0) return;

  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}: ${Math.round(metric.value)}ms`);
  }
}

export function measureLCP() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      if (lastEntry) {
        reportWebVitals({
          name: "LCP",
          value: lastEntry.renderTime || lastEntry.loadTime || 0,
        });
      }
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  } catch (e) {
    // Non-critical metric observation
  }
}

export function measureFID() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        reportWebVitals({
          name: "FID",
          value: entry.processingStart - entry.startTime,
        });
      });
    });
    observer.observe({ type: "first-input", buffered: true });
  } catch (e) {
    // Non-critical metric observation
  }
}
