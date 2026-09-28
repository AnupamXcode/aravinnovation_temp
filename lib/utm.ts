/**
 * Utility to capture and store UTM parameters from current URL query parameters into sessionStorage/localStorage
 */

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const keys: (keyof UtmParams)[] = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];

    const captured: UtmParams = {};
    let hasUtm = false;

    keys.forEach((key) => {
      const val = params.get(key);
      if (val) {
        captured[key] = val;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      sessionStorage.setItem("arav_utm_params", JSON.stringify(captured));
      return captured;
    }

    const stored = sessionStorage.getItem("arav_utm_params");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // SessionStorage unavailable
  }

  return {};
}
