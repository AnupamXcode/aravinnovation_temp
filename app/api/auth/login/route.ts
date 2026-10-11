import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { RECOVERY_COOKIE_NAME, RECOVERY_TOKEN_SECRET } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = (body.email || body.username || "").trim();
    const password = (body.password || "").trim();

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide credentials." },
        { status: 400 }
      );
    }

    // 1. If Supabase is configured, authenticate through Supabase Auth
    if (isSupabaseConfigured()) {
      const supabase = await getSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: identifier,
          password: password,
        });

        if (error) {
          console.warn("[Supabase Auth Sign-In Failed]:", error.message);
          return NextResponse.json(
            { success: false, message: error.message },
            { status: 401 }
          );
        }

        return NextResponse.json({
          success: true,
          mode: "supabase",
          message: "Authenticated successfully via Supabase.",
          user: {
            id: data.user.id,
            email: data.user.email,
          },
        });
      }
    }

    // 2. Recovery / Local Fallback authentication (Before Supabase is connected)
    // Allows site administrators to access the dashboard during local setup
    if (identifier === "aravinadmin" && password === "passwordasarav") {
      const cookieStore = await cookies();
      cookieStore.set(RECOVERY_COOKIE_NAME, RECOVERY_TOKEN_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        mode: "local_recovery",
        message: "Authenticated via local recovery credentials. Please configure Supabase Auth for production.",
        user: {
          id: "local-recovery-admin",
          email: "admin@aravinnovations.com",
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid username or password." },
      { status: 401 }
    );
  } catch (error) {
    console.error("[Login Route Exception]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
