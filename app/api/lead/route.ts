import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations";

function sanitizeString(str?: string): string {
  if (!str) return "";
  return str
    .replace(/[<>]/g, "") // Strip HTML tag angle brackets
    .trim();
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    
    // Sanitize input strings before validation
    const sanitizedBody = {
      name: sanitizeString(rawBody.name),
      company: sanitizeString(rawBody.company),
      email: sanitizeString(rawBody.email).toLowerCase(),
      phone: sanitizeString(rawBody.phone),
      service: sanitizeString(rawBody.service),
      requirement: sanitizeString(rawBody.requirement),
      timeline: sanitizeString(rawBody.timeline),
      budget: rawBody.budget ? sanitizeString(rawBody.budget) : undefined,
    };

    const validatedData = leadFormSchema.parse(sanitizedBody);

    // In production, send to CRM webhook / Email service / DB
    // No client secrets are exposed
    console.log("[Arav Innovations Lead Captured]:", validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your requirement has been received. Our expert team will review your requirements and provide a clear, actionable roadmap.",
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

