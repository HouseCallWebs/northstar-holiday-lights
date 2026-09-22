import Image from "next/image";
import { Phone, CalendarCheck, Star, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-evergreen-950">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1576692155415-95f820a2c4c1?auto=format&fit=crop&w=2000&q=80"
          alt="A well-lit home decorated with Christmas lights at night"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-evergreen-950/70 via-evergreen-950/85 to-evergreen-950" />
        <div className="snow-dot absolute inset-0 opacity-[0.06]" />
      </div>

      <Container className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-gold-400">
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
            Booking now for the {new Date().getFullYear()} season
          </div>

          <h1 className="font-display text-4xl leading-tight text-cream sm:text-5xl md:text-6xl">
            Holiday Lights That Make Your Block Stop and Stare —{" "}
            <span className="text-gold-gradient">Booked Online in Minutes</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-cream-dim/85">
            Custom-designed Christmas light installation, maintenance, and takedown for homes and
            businesses across the {site.metro}. No ladders, no tangled totes — just a beautiful
            display, start to finish.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/book" size="lg" className="w-full sm:w-auto">
              <CalendarCheck className="h-5 w-5" />
              Book Your Install
            </Button>
            <Button href={site.phoneHref} size="lg" variant="outline" className="w-full sm:w-auto">
              <Phone className="h-5 w-5" />
              {site.phoneDisplay}
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-cream-dim/70">
            <Clock className="h-4 w-4 text-gold-400" />
            {site.responseTime}
          </div>
        </div>
      </Container>
    </section>
  );
}
