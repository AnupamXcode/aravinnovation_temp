import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadFormSchema.parse(body);

    // In production, send to CRM webhook / Email service / DB
    // No client secrets are exposed
    console.log("[Arav Innovations Lead Captured]:", validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your requirement has been received. Our leadership team will review and connect within 1 business day.",
        leadId: `ARAV-${Date.now()}`,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error && typeof error === "object" && "issues" in error) {
      return NextResponse.json(
        { success: false, errors: (error as { issues: unknown[] }).issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
