import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Book Your Holiday Light Install",
  description:
    "Book your Christmas light installation online in minutes — pick your package, date, and time window.",
};

export default function BookPage() {
  return (
    <div className="bg-ink py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Auto Booking"
          title="Book Your Install in Under 5 Minutes"
          description="Pick your package, choose a date and time, and you're on the calendar — no phone tag required."
          className="mb-12"
        />
        <Suspense fallback={<BookingFormFallback />}>
          <BookingForm />
        </Suspense>
      </Container>
    </div>
  );
}

function BookingFormFallback() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse rounded-3xl border border-white/10 bg-evergreen-900/40 p-10">
      <div className="h-6 w-1/3 rounded bg-white/10" />
      <div className="mt-6 space-y-4">
        <div className="h-12 rounded bg-white/5" />
        <div className="h-12 rounded bg-white/5" />
        <div className="h-12 rounded bg-white/5" />
      </div>
    </div>
  );
}
