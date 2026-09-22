import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceJsonLd } from "@/components/JsonLd";
import { cityDetails, citySEOPages, site } from "@/lib/config";

export function generateStaticParams() {
  return citySEOPages.map((slug) => ({ city: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const detail = cityDetails[city];
  if (!detail) return {};

  return {
    title: `Christmas Light Installation in ${detail.name}, CO`,
    description: `Professional Christmas light installation, maintenance, and takedown in ${detail.name}, Colorado. Book online in minutes.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const detail = cityDetails[city];
  if (!detail) notFound();

  return (
    <div className="bg-ink py-16 sm:py-24">
      <ServiceJsonLd
        name={`Christmas Light Installation in ${detail.name}, CO`}
        description={detail.intro}
      />
      <Container className="max-w-3xl">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          <MapPin className="h-3.5 w-3.5" /> {site.metro}
        </p>
        <h1 className="mt-3 font-display text-3xl text-cream sm:text-4xl">
          Christmas Light Installation in {detail.name}, CO
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-cream-dim/80">{detail.intro}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-lg text-cream">Why {detail.name} Chooses Us</h2>
            <ul className="mt-4 space-y-3">
              {detail.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-cream-dim/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg text-cream">Neighborhoods We Serve</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {detail.neighborhoods.map((n) => (
                <li
                  key={n}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-cream-dim/80"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/book" size="lg">
            Book Your {detail.name} Install
          </Button>
          <Button href="/quote" size="lg" variant="secondary">
            Get a Free Quote
          </Button>
        </div>
      </Container>
    </div>
  );
}
