import { z } from "zod";

// Honeypot field: real users never see or fill this input.
// Bots that auto-fill every field will trip it, and we silently discard the submission.
const honeypot = z.string().max(0, "Spam check failed").or(z.literal(""));

export const bookingSchema = z.object({
  serviceType: z.string().min(1, "Please select a service type"),
  packageInterest: z.string().min(1, "Please select a package"),
  address: z.string().min(5, "Please enter your street address"),
  city: z.string().min(2, "Please enter your city"),
  zip: z.string().min(5, "Please enter a valid ZIP code").max(10),
  stories: z.string().min(1, "Please select your home's stories"),
  date: z.string().min(1, "Please select an install date"),
  timeWindow: z.string().min(1, "Please select a time window"),
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  notes: z.string().max(1000).optional().default(""),
  website: honeypot.optional().default(""),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Please enter your street address"),
  homeSize: z.string().min(1, "Please select your approximate home size"),
  stories: z.string().min(1, "Please select your home's stories"),
  packageInterest: z.string().min(1, "Please select a package interest"),
  photoUrl: z.string().max(500).optional().default(""),
  notes: z.string().max(1000).optional().default(""),
  website: honeypot.optional().default(""),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
