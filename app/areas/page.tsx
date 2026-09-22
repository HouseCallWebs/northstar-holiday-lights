import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cities, citySEOPages, cityHref, site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Service Area",
  description: `${site.name} installs and maintains Christmas lighting across the ${site.metro}.`,
};

export default function AreasPage() {
  return (
    <div className="bg-ink py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Service Area"
          title={`Serving the ${site.metro}`}
          description="We install, maintain, and take down holiday lighting across the following cities and suburbs."
          align="left"
          className="mb-12"
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => {
            const hasLandingPage = citySEOPages.includes(city.slug);
            return (
              <Link
                key={city.slug}
                id={city.slug}
                href={cityHref(city.slug)}
                className="flex scroll-mt-28 items-center justify-between rounded-xl border border-white/10 bg-evergreen-900/50 px-5 py-4 hover:border-gold-500/40"
              >
                <span className="flex items-center gap-2 text-cream">
                  <MapPin className="h-4 w-4 text-gold-400" />
                  {city.name}
                  {!hasLandingPage ? (
                    <span className="text-xs font-normal text-cream-dim/40">(area page coming soon)</span>
                  ) : null}
                </span>
                {hasLandingPage ? <ArrowRight className="h-4 w-4 text-cream-dim/40" /> : null}
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-cream-dim/60">
          Don&apos;t see your city?{" "}
          <Link href="/quote" className="text-gold-400 hover:underline">
            Request a quote
          </Link>{" "}
          anyway — we regularly expand into nearby neighborhoods each season.
        </p>
      </Container>
    </div>
  );
}
