import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "./QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Holiday Lighting Quote",
  description:
    "Request a free, no-obligation Christmas light installation quote for your home or business.",
};

export default function QuotePage() {
  return (
    <div className="bg-ink py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Free Quote"
          title="Tell Us About Your Home"
          description="Share a few details and we'll follow up with a custom quote — usually the same day in peak season."
          className="mb-12"
        />
        <QuoteForm />
      </Container>
    </div>
  );
}
