import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceJsonLd } from "@/components/JsonLd";
import { serviceDetails, site } from "@/lib/config";

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  if (!detail) return {};

  return {
    title: detail.heading,
    description: detail.intro,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  if (!detail) notFound();

  return (
    <div className="bg-ink py-16 sm:py-24">
      <ServiceJsonLd name={detail.name} description={detail.intro} />
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          {site.name} Services
        </p>
        <h1 className="mt-3 font-display text-3xl text-cream sm:text-4xl">{detail.heading}</h1>
        <p className="mt-5 text-lg leading-relaxed text-cream-dim/80">{detail.intro}</p>

        <ul className="mt-8 space-y-3">
          {detail.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-cream-dim/85">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/book" size="lg">
            Book This Service
          </Button>
          <Button href="/quote" size="lg" variant="secondary">
            Request a Custom Quote
          </Button>
        </div>
      </Container>
    </div>
  );
}
