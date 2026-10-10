"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormData } from "@/lib/validations";
import { servicesData } from "@/data/services";
import { productsData } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface LeadFormProps {
  initialService?: string;
  className?: string;
  source?: string;
}

export function LeadForm({
  initialService,
  source = "general_form",
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedLeadId, setSubmittedLeadId] = React.useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const foundService = servicesData.find((s) => s.slug === initialService || s.title === initialService)?.title;
  const foundProduct = productsData.find((p) => p.slug === initialService || p.name === initialService)?.name;
  const defaultService = foundService || (foundProduct ? `Product Demo: ${foundProduct}` : (initialService || servicesData[0].title));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: defaultService,
      requirement: "",
      timeline: "1 - 3 Months",
      budget: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      trackEvent({
        type: "contact_started",
        source,
      });

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setSubmittedLeadId(result.leadId || `ARAV-${Date.now()}`);
        setSubmittedEmail(data.email);
        trackEvent({
          type: "form_submit_success",
          source,
        });
        trackEvent({
          type: "contact_submitted",
        });
        reset();
      } else {
        setErrorMessage(
          result.message || "There was an error submitting your request. Please check your details and try again."
        );
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl bg-white dark:bg-[#000000] p-8 sm:p-12 border border-[#2e936f]/30 dark:border-[#1f1f1f] shadow-2xl text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#2e936f]/10 text-[#2e936f] mx-auto flex items-center justify-center border border-[#2e936f]/30 shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
            Requirement Received!
          </h3>
          {submittedLeadId && (
            <p className="text-xs font-mono text-[#f15e1c] font-bold">
              Reference ID: {submittedLeadId}
            </p>
          )}
        </div>
        <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Arav Innovations. A confirmation record has been generated for <strong className="text-[#1b2823] dark:text-[#ffffff]">{submittedEmail}</strong>.
          Our team will review your requirements and follow up promptly.
        </p>
        <div className="pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsSubmitted(false)}
            className="cursor-pointer"
          >
            Submit Another Requirement
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl bg-white dark:bg-[#000000] p-6 sm:p-10 border border-[#f7d7b0] dark:border-[#1f1f1f] shadow-2xl space-y-5"
    >
      <div className="border-b border-[#f7d7b0]/60 dark:border-[#1f1f1f] pb-3 space-y-1">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
          Book a Free Consultation
        </h3>
        <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
          Share your current goals or challenges below. Our senior practice leads will review your request.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Primary Field 1: Name */}
      <Input
        label="Full Name*"
        placeholder="e.g. Rahul Sharma / Fatima Al Mansoori"
        required
        {...register("name")}
        error={errors.name?.message}
      />

      {/* Primary Field 2 & 3: Work Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="email"
          label="Work Email*"
          placeholder="name@company.com"
          required
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="tel"
          label="Phone / WhatsApp Number*"
          placeholder="+91 96506 25777 or +971 52 155 5792"
          required
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      {/* Primary Field 4: Need / How Can We Help? */}
      <Textarea
        label="Need / How Can We Help?*"
        placeholder="Describe your current technology goals, software engineering requirements, digital growth bottlenecks, or compliance challenges..."
        required
        rows={4}
        {...register("requirement")}
        error={errors.requirement?.message}
        helperText="Minimum 10 characters. Strictly confidential."
      />

      {/* Submit Action */}
      <div className="pt-2 text-center space-y-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center shadow-md hover:shadow-xl hover:shadow-[#f15e1c]/25 bg-[#f15e1c] text-white"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Book a Free Consultation
        </Button>
        <span className="text-xs text-[#4a5c55] dark:text-[#d3eee4] font-medium block">
          We reply within 1 business day.* <span className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0] italic">(Pending management confirmation)</span>
        </span>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-[#4a5c55] dark:text-[#d3eee4] text-center pt-1 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a]">
        <ShieldCheck className="w-4 h-4 text-[#2e936f]" />
        <span>Strict Confidentiality Guaranteed. Strategic Hubs in India &amp; UAE.</span>
      </div>
    </form>
  );
}
