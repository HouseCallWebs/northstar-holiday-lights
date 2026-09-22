import { ClipboardList, PenTool, Truck, PartyPopper } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Request Your Quote",
    detail: "Tell us about your home and the look you want — takes about two minutes online.",
  },
  {
    icon: PenTool,
    title: "2. We Design Your Plan",
    detail: "We build a custom lighting plan, virtually or with an on-site visit, and lock a price.",
  },
  {
    icon: Truck,
    title: "3. We Install On Schedule",
    detail: "Pick your date and time window online — our insured crew handles the rest.",
  },
  {
    icon: PartyPopper,
    title: "4. Enjoy the Season",
    detail: "We monitor and maintain your display, then handle takedown & storage in January.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-evergreen-900/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From Quote to Takedown, We've Got It"
          description="A simple, four-step process designed so you never have to climb a ladder."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-start">
              {i < steps.length - 1 ? (
                <span className="absolute left-6 top-12 hidden h-px w-full bg-gradient-to-r from-gold-500/40 to-transparent lg:block" />
              ) : null}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-400 ring-1 ring-gold-500/30">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg text-cream">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim/70">{step.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
