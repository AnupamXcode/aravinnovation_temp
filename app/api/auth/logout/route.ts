import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { RECOVERY_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 1. Sign out from Supabase if active
    if (isSupabaseConfigured()) {
      const supabase = await getSupabaseServerClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    }

    // 2. Clear recovery cookie
    cookieStore.delete(RECOVERY_COOKIE_NAME);

    return NextResponse.json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("[Logout Route Exception]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to log out completely." },
      { status: 500 }
    );
  }
}
