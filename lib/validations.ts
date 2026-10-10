import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)."),
  email: z.string().email("Please enter a valid work email address."),
  phone: z.string().min(7, "Please enter a valid phone number with country code."),
  requirement: z.string().min(10, "Please describe your need or project goals (at least 10 characters)."),
  company: z.string().optional().or(z.literal("")),
  service: z.string().optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const requirementFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Valid email is required"),
  requirement: z.string().min(5, "Please state your requirement"),
  resourceTitle: z.string().optional(),
});

export type RequirementFormData = z.infer<typeof requirementFormSchema>;

export const careerApplicationSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  role: z.string().min(2, "Role is required"),
  portfolioOrLinkedIn: z.string().url("Please provide a valid LinkedIn or portfolio link").optional().or(z.literal("")),
  message: z.string().min(10, "Please share a brief note about yourself"),
});

export type CareerApplicationData = z.infer<typeof careerApplicationSchema>;

export const chatbotLeadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  service: z.string().optional(),
  requirement: z.string().min(5, "Requirement details are required"),
  timeline: z.string().optional(),
});

export type ChatbotLeadData = z.infer<typeof chatbotLeadSchema>;
