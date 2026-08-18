"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormData } from "@/lib/validations";
import { servicesData } from "@/data/services";
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
  className,
  source = "general_form",
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const defaultService =
    servicesData.find((s) => s.slug === initialService || s.title === initialService)?.title ||
    servicesData[0].title;

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
        trackEvent({
          type: "contact_submitted",
          service: data.service,
          company: data.company,
        });
        reset();
      } else {
        setErrorMessage(
          result.message || "There was an error submitting your request. Please try again."
        );
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = servicesData.map((s) => ({
    value: s.title,
    label: s.title,
  }));

  const timelineOptions = [
    { value: "Immediate (within 2 weeks)", label: "Immediate (within 2 weeks)" },
    { value: "1 - 3 Months", label: "1 - 3 Months" },
    { value: "3 - 6 Months", label: "3 - 6 Months" },
    { value: "Exploring / Long term", label: "Exploring / Long term" },
  ];

  if (isSubmitted) {
    return (
      <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#EFE2D6] shadow-xl text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#FCE3D3] text-[#E8672A] mx-auto flex items-center justify-center border border-[#F4A97F]/40">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold font-display text-[#3A2E27]">
          Requirement Received!
        </h3>
        <p className="text-sm text-[#7A6A5F] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Arav Innovations. Our strategy & engineering team will review your requirements and schedule an exploratory discussion within 1 business day.
        </p>
        <div className="pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsSubmitted(false)}
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
      className="rounded-3xl bg-white p-7 sm:p-10 border border-[#EFE2D6] shadow-xl space-y-6"
    >
      <div className="border-b border-[#EFE2D6] pb-4">
        <h3 className="text-2xl font-bold font-display text-[#3A2E27]">
          Initiate a Project Discussion
        </h3>
        <p className="text-xs text-[#7A6A5F] mt-1">
          Tell us about your organization and requirements. All inquiries are covered under NDA.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name"
          placeholder="e.g. Rahul Sharma / Fatima Al Mansoori"
          required
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Company / Enterprise Name"
          placeholder="e.g. Apex Global Solutions"
          required
          {...register("company")}
          error={errors.company?.message}
        />
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="email"
          label="Official Work Email"
          placeholder="name@company.com"
          required
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="tel"
          label="Phone / WhatsApp Number"
          placeholder="+91 98765 43210 or +971 50 123 4567"
          required
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      {/* Row 3: Service Selection & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Target Practice / Service"
          options={serviceOptions}
          required
          {...register("service")}
          error={errors.service?.message}
        />
        <Select
          label="Estimated Timeline"
          options={timelineOptions}
          {...register("timeline")}
          error={errors.timeline?.message}
        />
      </div>

      {/* Row 4: Requirement Description */}
      <Textarea
        label="Project Scope & Specific Objectives"
        placeholder="Briefly describe your current challenge, desired deliverables, technology stack (if known), or team expansion goals..."
        required
        rows={4}
        {...register("requirement")}
        error={errors.requirement?.message}
        helperText="Minimum 10 characters. Confidential."
      />

      {/* Optional Budget Band */}
      <Input
        label="Target Budget Band (Optional)"
        placeholder="e.g. $10k - $25k, ₹5L - ₹15L, or AED 50k+"
        {...register("budget")}
        error={errors.budget?.message}
      />

      {/* Submit Action */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center shadow-md hover:shadow-lg"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Submit Project Inquiry
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-[#7A6A5F] text-center pt-1">
        <ShieldCheck className="w-4 h-4 text-[#E8672A]" />
        <span>Strict Confidentiality Guaranteed. Operating in India & UAE.</span>
      </div>
    </form>
  );
}
