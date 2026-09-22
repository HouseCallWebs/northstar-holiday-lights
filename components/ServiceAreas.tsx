import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cities, cityHref, site } from "@/lib/config";

export function ServiceAreas() {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Where We Work"
              title={`Proudly Serving the ${site.metro}`}
              description="From downtown Denver to the surrounding suburbs, our crews cover the full metro area."
            />
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={cityHref(city.slug)}
                    className="flex items-center gap-1.5 text-sm text-cream-dim/85 hover:text-gold-400"
                  >
                    <MapPin className="h-3.5 w-3.5 text-gold-500/70" />
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-cream-dim/60">
              Don&apos;t see your neighborhood? <Link href="/quote" className="text-gold-400 hover:underline">Ask us</Link> — we frequently add nearby areas each season.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-evergreen-900">
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(228,194,101,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(228,194,101,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-40 w-40">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/20" />
                <span className="absolute inset-6 rounded-full bg-gold-500/10" />
                <span className="absolute inset-16 flex items-center justify-center rounded-full bg-gold-500 text-evergreen-950">
                  <MapPin className="h-5 w-5" />
                </span>
              </div>
            </div>
            {[
              { top: "20%", left: "30%" },
              { top: "35%", left: "70%" },
              { top: "65%", left: "25%" },
              { top: "75%", left: "60%" },
              { top: "50%", left: "50%" },
            ].map((pos, i) => (
              <span
                key={i}
                className="absolute h-2 w-2 rounded-full bg-cream/60"
                style={{ top: pos.top, left: pos.left }}
              />
            ))}
            <span className="absolute bottom-4 right-4 rounded-full bg-evergreen-950/80 px-3 py-1 text-[11px] font-medium text-cream-dim/70">
              Map placeholder — demo only
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
