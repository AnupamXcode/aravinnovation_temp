import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function GET() {
  try {
    const session = await getAdminSession();
    const supabaseConfig = getSupabaseConfig();

    return NextResponse.json({
      isAuthenticated: session.isAuthenticated,
      mode: session.mode,
      user: session.user,
      supabaseConfig: {
        isConfigured: supabaseConfig.isConfigured,
        isServiceConfigured: supabaseConfig.isServiceConfigured,
        missingKeys: supabaseConfig.missingKeys,
      },
    });
  } catch (error) {
    console.error("[Session Route Exception]:", error);
    return NextResponse.json(
      { isAuthenticated: false, mode: "unauthenticated", user: null },
      { status: 500 }
    );
  }
}
