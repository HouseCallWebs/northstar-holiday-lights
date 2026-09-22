import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceDetails } from "@/lib/config";

export const metadata: Metadata = {
  title: "Holiday Lighting Services",
  description:
    "Residential install, commercial & HOA lighting, maintenance, and takedown & storage across the Denver metro.",
};

export default function ServicesPage() {
  return (
    <div className="bg-ink py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Every Step, Handled"
          description="Pick a service below to learn more, or head straight to booking."
          align="left"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {Object.entries(serviceDetails).map(([slug, detail]) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-evergreen-900/60 p-7 hover:border-gold-500/40"
            >
              <h2 className="font-display text-xl text-cream">{detail.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-dim/70">
                {detail.intro}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-400">
                View details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
