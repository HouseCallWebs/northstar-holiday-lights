import { CalendarCheck, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/config";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-evergreen-950 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(228,194,101,0.14),_transparent_60%)]" />
      <Container className="relative text-center">
        <h2 className="font-display text-3xl text-cream sm:text-4xl">
          Your Neighbors Will Ask Who Did Your Lights.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream-dim/80">
          Booking calendars fill up fast in peak season — lock in your install date online in
          under five minutes.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/book" size="lg">
            <CalendarCheck className="h-5 w-5" />
            Book Your Install
          </Button>
          <Button href={site.phoneHref} size="lg" variant="outline">
            <Phone className="h-5 w-5" />
            Call {site.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
}
