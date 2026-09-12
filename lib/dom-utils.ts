/**
 * DOM Utility Module for Batching Reads/Writes to Prevent Forced Reflows
 * Reference: Delta Prompt 31 Performance Optimization
 */

export interface DOMMetrics {
  clientWidth: number;
  clientHeight: number;
  scrollY: number;
  scrollX: number;
}

/**
 * Batch DOM reads to prevent forced layout thrashing
 */
export function batchDOMRead(callback: (metrics: DOMMetrics) => void): void {
  if (typeof window === "undefined") return;

  const metrics: DOMMetrics = {
    clientWidth: document.documentElement.clientWidth,
    clientHeight: document.documentElement.clientHeight,
    scrollY: window.scrollY,
    scrollX: window.scrollX,
  };
  callback(metrics);
}

/**
 * Batch DOM style updates within a single animation frame
 */
export function batchDOMWrite(elements: HTMLElement[], updates: Record<string, string>): void {
  if (typeof window === "undefined" || !elements.length) return;

  requestAnimationFrame(() => {
    elements.forEach((el) => {
      if (el && el.style) {
        Object.assign(el.style, updates);
      }
    });
  });
}
