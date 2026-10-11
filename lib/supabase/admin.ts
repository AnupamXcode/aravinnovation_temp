import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

let adminClientInstance: SupabaseClient<any, "public", any> | null = null;

/**
 * Creates or returns the privileged Supabase Admin Client.
 * Uses SUPABASE_SERVICE_ROLE_KEY to bypass RLS for server-only operations
 * (e.g. saving incoming public leads, verifying admin roles, etc.).
 * 
 * NEVER expose this client or SUPABASE_SERVICE_ROLE_KEY to browser code.
 */
export function getSupabaseAdmin(): SupabaseClient<any, "public", any> | null {
  if (typeof window !== "undefined") {
    throw new Error("CRITICAL SECURITY ERROR: getSupabaseAdmin must NEVER be called in browser context!");
  }

  const { isServiceConfigured } = getSupabaseConfig();
  if (!isServiceConfigured) {
    return null;
  }

  if (!adminClientInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    adminClientInstance = createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return adminClientInstance;
}
