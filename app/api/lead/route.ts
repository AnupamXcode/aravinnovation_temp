import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations";
import { saveSubmission, updateSubmissionEmailStatus } from "@/lib/submissions";
import { sendContactEmail } from "@/lib/email";
import { z } from "zod";

function sanitizeString(str?: unknown): string {
  if (typeof str !== "string" || !str) return "";
  return str
    .replace(/[<>]/g, "") // Strip HTML tag angle brackets
    .trim();
}

export async function POST(request: Request) {
  try {
    let rawBody: Record<string, unknown> = {};
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request payload." },
        { status: 400 }
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

    // Save submission to persistent store (guaranteed not to throw filesystem errors)
    const submission = saveSubmission({
      ...validatedData,
      source,
    });

    console.log("[Arav Innovations Lead Saved]:", submission.id, submission.name, submission.email);

    // Asynchronous background email dispatch (Admin to jrshrivastava03@gmail.com & User confirmation)
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

      updateSubmissionEmailStatus(
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
