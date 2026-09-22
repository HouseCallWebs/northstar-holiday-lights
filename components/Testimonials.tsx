import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/config";

export function Testimonials() {
  return (
    <section className="bg-evergreen-900/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Demo Testimonials"
          title="What Customers Say"
          description="Example reviews written for this demo — a real deployment would pull live reviews from Google, Facebook, or the platform of your choice."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-evergreen-900/60 p-7"
            >
              <Quote className="h-6 w-6 text-gold-400" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cream-dim/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-cream">{t.name}</span>
                <span className="text-cream-dim/60"> · {t.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
