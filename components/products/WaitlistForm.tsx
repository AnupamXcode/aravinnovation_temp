"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface WaitlistFormProps {
  productName: string;
}

export function WaitlistForm({ productName }: WaitlistFormProps) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl bg-[#2e936f]/10 border border-[#2e936f]/30 text-center space-y-2">
        <CheckCircle2 className="w-8 h-8 text-[#2e936f] mx-auto" />
        <h4 className="text-base font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
          You&apos;re on the early access waitlist!
        </h4>
        <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
          We will notify you at <span className="font-semibold text-[#f15e1c]">{email}</span> as soon as {productName} opens beta registration.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
      <Input
        type="email"
        required
        placeholder="Enter your work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] bg-white dark:bg-[#171411] transition-transform duration-150 focus:scale-[1.02]"
      />
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={loading}
        className="w-full sm:w-auto shrink-0 rounded-full shadow-md"
        rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
      >
        {loading ? "Joining..." : "Notify Me When Ready"}
      </Button>
    </form>
  );
}
