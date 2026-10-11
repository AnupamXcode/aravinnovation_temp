import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations";
import { saveSubmissionAsync, updateSubmissionEmailStatusAsync } from "@/lib/submissions";
import { sendContactEmail } from "@/lib/email";
import { z } from "zod";

function sanitizeString(str?: unknown): string {
  if (typeof str !== "string" || !str) return "";
  return str
    .replace(/[<>]/g, "") // Strip HTML tag angle brackets
    .trim();
}

// In-memory rate limiting map for basic spam protection (10 submissions / 2 min per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 120000 });
    return true;
  }
  if (entry.count >= 10) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // 1. IP & Rate limiting check
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submission attempts from this network. Please wait a minute before trying again.",
        },
        { status: 429 }
      );
    }

    let rawBody: Record<string, unknown> = {};
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 2. Honeypot check (hidden spam field)
    if (rawBody._hp || rawBody.company_website_url_hp) {
      console.warn("[Spam Honeypot Triggered on /api/lead]:", clientIp);
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    // Flexible field name normalization (handles companyName, fullName, workEmail, message, etc.)
    const name = sanitizeString(rawBody.name || rawBody.fullName || rawBody.userName || "Website Inquiry");
    const company = sanitizeString(rawBody.company || rawBody.companyName || rawBody.organization || "Independent / Enterprise");
    const email = sanitizeString(rawBody.email || rawBody.workEmail).toLowerCase();
    const phone = sanitizeString(rawBody.phone || rawBody.phoneNumber || rawBody.whatsapp || "N/A");
    const service = sanitizeString(rawBody.service || rawBody.serviceRequired || rawBody.productName || "IT Strategy & Implementation");
    const requirementRaw = sanitizeString(rawBody.requirement || rawBody.message || rawBody.details || rawBody.description);
    const timeline = sanitizeString(rawBody.timeline || rawBody.estimatedTimeline || "1 - 3 Months");
    const budget = rawBody.budget || rawBody.projectBudget ? sanitizeString(rawBody.budget || rawBody.projectBudget) : undefined;
    const industry = rawBody.industry ? sanitizeString(rawBody.industry) : undefined;
    const originalQuery = rawBody.originalQuery ? sanitizeString(rawBody.originalQuery) : requirementRaw;
    const conversationContext = Array.isArray(rawBody.conversationContext)
      ? rawBody.conversationContext.map((c: any) => ({
          sender: (c.sender === "user" ? "user" : "bot") as "bot" | "user",
          text: sanitizeString(c.text),
        }))
      : undefined;
    const source = rawBody.source ? sanitizeString(rawBody.source) : "website_form";

    // Ensure requirement has min 10 chars as per schema
    const requirement = requirementRaw.length >= 10 
      ? requirementRaw 
      : `${requirementRaw} (Enterprise project inquiry submitted via website)`;

    const sanitizedBody = {
      name,
      company,
      email,
      phone,
      service,
      requirement,
      timeline,
      budget,
    };

    // Server-side Zod validation
    const validatedData = leadFormSchema.parse(sanitizedBody);

    // 3. Save submission to persistent store (Supabase with local fallback)
    const { submission, storage, error: storageError } = await saveSubmissionAsync({
      name: validatedData.name,
      company: validatedData.company || "Independent / Enterprise",
      email: validatedData.email,
      phone: validatedData.phone,
      service: validatedData.service || "IT Strategy & Implementation",
      requirement: validatedData.requirement,
      timeline: validatedData.timeline || "1 - 3 Months",
      budget: validatedData.budget,
      industry,
      originalQuery,
      conversationContext,
      source,
      ipAddress: clientIp,
    });

    console.log(`[Arav Innovations Lead Saved via ${storage}]:`, submission.id, submission.name, submission.email);
    if (storageError) {
      console.warn("[Arav Innovations Lead Storage Notice]:", storageError);
    }

    // 4. Asynchronous background email dispatch (Admin to jrshrivastava03@gmail.com & User confirmation)
    (async () => {
      let companyRes = { success: false };
      let userRes = { success: false };

      try {
        companyRes = await sendContactEmail({
          to: 'jrshrivastava03@gmail.com',
          submission,
          type: 'admin',
        });
      } catch (e) {
        console.error('[Email Admin Dispatch Error]:', e);
      }

      try {
        if (submission.email && submission.email.includes('@')) {
          userRes = await sendContactEmail({
            to: submission.email,
            submission,
            type: 'user',
          });
        }
      } catch (e) {
        console.error('[Email User Dispatch Error]:', e);
      }

      await updateSubmissionEmailStatusAsync(
        submission.id,
        companyRes.success ? 'SENT' : 'FAILED',
        userRes.success ? 'SENT' : 'FAILED'
      );
    })();

    return NextResponse.json(
      {
        success: true,
        message: "Your query has been received. Thank you for reaching out. Our team will review your request and get back to you.",
        leadId: submission.id,
        submission,
        storageMode: storage,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.warn('[Validation Error on /api/lead]:', error.issues);
      return NextResponse.json(
        {
          success: false,
          message: "Please check the highlighted fields and try again.",
          errors: error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
        },
        { status: 400 }
      );
    }

    console.error("[Fatal Error on /api/lead]:", error);
    return NextResponse.json(
      { success: false, message: "We couldn't submit your request right now. Please try again." },
      { status: 500 }
    );
  }
}
