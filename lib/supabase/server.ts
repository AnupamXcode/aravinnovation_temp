import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";

/**
 * Creates a server-side Supabase client using Next.js async cookies.
 * Returns null if Supabase environment variables are not configured.
 */
export async function getSupabaseServerClient() {
  const { isConfigured } = getSupabaseConfig();
  if (!isConfigured) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Invoked from Server Component where cookies cannot be set directly.
          }
        },
      },
    }
  );
}
