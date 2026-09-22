import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { packages } from "@/lib/config";

export function Packages() {
  return (
    <section id="packages" className="scroll-mt-28 bg-evergreen-900/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Sample Pricing"
          title="Packages Built for Every Home"
          description="Every project starts with a free consult, so pricing below is a sample starting point — your quote is tailored to your home's size and design."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8",
                pkg.highlight
                  ? "border-gold-500/50 bg-evergreen-900 shadow-2xl shadow-gold-600/10 lg:-translate-y-3"
                  : "border-white/10 bg-evergreen-900/50"
              )}
            >
              {pkg.highlight ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-evergreen-950">
                  Most Popular
                </span>
              ) : null}

              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                {pkg.tierLabel}
              </span>
              <h3 className="mt-2 font-display text-2xl text-cream">{pkg.name}</h3>
              <p className="mt-3 text-sm text-cream-dim/70">{pkg.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl text-cream">{pkg.price}</span>
                <span className="text-sm text-cream-dim/60">starting / season</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-cream-dim/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href={`/book?package=${pkg.id}`}
                variant={pkg.highlight ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                Book This Package
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-cream-dim/50">
          Sample pricing shown for demo purposes. Final quotes depend on home size, roofline
          length, and design complexity.
        </p>
      </Container>
    </section>
  );
}
