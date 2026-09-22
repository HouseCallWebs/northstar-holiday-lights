import Link from "next/link";
import { Home, Wrench, ShieldCheck, PackageCheck, Building2, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/config";

const icons = { Home, Wrench, ShieldCheck, PackageCheck, Building2, Sparkles };

export function ServicesGrid() {
  return (
    <section id="services" className="scroll-mt-28 bg-ink py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Full-Service Holiday Lighting, Start to Finish"
          description="From the first design sketch to the January takedown, we handle every step — you just enjoy the display."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <Link
                key={`${service.slug}-${i}`}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-evergreen-900/60 p-6 transition-colors hover:border-gold-500/40 hover:bg-evergreen-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl text-cream">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-dim/70">
                  {service.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-400">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
