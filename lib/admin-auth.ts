import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured, isSupabaseServiceConfigured } from "@/lib/supabase/config";

export interface AdminSession {
  isAuthenticated: boolean;
  mode: "supabase" | "local_recovery" | "unauthenticated";
  user: {
    id: string;
    email: string;
    role: "superadmin" | "admin" | "editor";
  } | null;
}

const RECOVERY_COOKIE_NAME = "arav_admin_recovery_token";
const RECOVERY_TOKEN_SECRET = "arav_local_dev_secret_token_2026";

/**
 * Checks admin authentication on the server for route handlers and Server Components.
 */
export async function getAdminSession(): Promise<AdminSession> {
  const cookieStore = await cookies();

  // 1. Try Supabase Auth session if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = await getSupabaseServerClient();
      if (supabase) {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (!error && user && user.email) {
          // Verify role in admin_profiles table if service role is configured
          let role: "superadmin" | "admin" | "editor" = "admin";
          if (isSupabaseServiceConfigured()) {
            const adminClient = getSupabaseAdmin();
            if (adminClient) {
              const { data: profile } = await (adminClient as any)
                .from("admin_profiles")
                .select("role")
                .eq("id", user.id)
                .single();
              if (profile && (profile as any).role) {
                role = (profile as any).role;
              }
            }
          }

          return {
            isAuthenticated: true,
            mode: "supabase",
            user: {
              id: user.id,
              email: user.email,
              role,
            },
          };
        }
      }
    } catch (err) {
      console.error("[Supabase Admin Auth Verification Exception]:", err);
    }
  }

  // 2. Recovery / Local Fallback session check (during onboarding before Supabase is connected)
  const recoveryCookie = cookieStore.get(RECOVERY_COOKIE_NAME)?.value;
  if (recoveryCookie && recoveryCookie === RECOVERY_TOKEN_SECRET) {
    return {
      isAuthenticated: true,
      mode: "local_recovery",
      user: {
        id: "local-recovery-admin",
        email: "admin@aravinnovations.com",
        role: "admin",
      },
    };
  }

  return {
    isAuthenticated: false,
    mode: "unauthenticated",
    user: null,
  };
}

export { RECOVERY_COOKIE_NAME, RECOVERY_TOKEN_SECRET };
