import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Returns a singleton browser Supabase client.
 * Returns null if Supabase environment variables are not configured.
 */
export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    return null;
  }

  const { isConfigured } = getSupabaseConfig();
  if (!isConfigured) {
    return null;
  }

  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    browserClient = createBrowserClient(url, anonKey);
  }

  return browserClient;
}
