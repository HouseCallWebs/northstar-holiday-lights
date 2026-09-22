import Link from "next/link";
import { Phone, Mail, MapPin, Snowflake } from "lucide-react";
import { site, cities, cityHref, housecallwebs } from "@/lib/config";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-evergreen-950 text-cream-dim">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-gold-400" />
            <span className="font-display text-lg text-cream">{site.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-cream-dim/70">
            {site.tagline}. Serving the {site.metro} since {site.founded}.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-gold-400">
              <Phone className="h-4 w-4" /> {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-gold-400">
              <Mail className="h-4 w-4" /> {site.email}
            </a>
            <span className="flex items-center gap-2 text-cream-dim/70">
              <MapPin className="h-4 w-4" /> {site.address.city}, {site.address.state}
            </span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream">
            Services
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services/residential-install" className="hover:text-gold-400">Residential Install</Link></li>
            <li><Link href="/services/commercial-hoa" className="hover:text-gold-400">Commercial &amp; HOA</Link></li>
            <li><Link href="/services/maintenance" className="hover:text-gold-400">Maintenance &amp; Bulb Replace</Link></li>
            <li><Link href="/services/takedown-storage" className="hover:text-gold-400">Takedown &amp; Storage</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream">
            Service Area
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {cities.slice(0, 8).map((city) => (
              <li key={city.slug}>
                <Link href={cityHref(city.slug)} className="hover:text-gold-400">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/areas" className="mt-3 inline-block text-sm text-gold-400 hover:underline">
            View all cities →
          </Link>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream">
            Get Started
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/book" className="hover:text-gold-400">Book an Install</Link></li>
            <li><Link href="/quote" className="hover:text-gold-400">Request a Quote</Link></li>
            <li><Link href="/#faq" className="hover:text-gold-400">FAQ</Link></li>
            <li><Link href="/admin" className="hover:text-gold-400">Lead Dashboard (Demo)</Link></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-cream-dim/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. This is a fictional demo business — all
            names, pricing, reviews, and contact details are illustrative only and not a real
            company.
          </p>
          <p>
            Demo site built by{" "}
            <a
              href={housecallwebs.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-400 hover:underline"
            >
              Housecallwebs
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
