import { ShieldCheck, Award, CalendarClock, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/config";

const items = [
  {
    icon: ShieldCheck,
    label: "Licensed & Insured",
    detail: "(example — verify with any provider)",
  },
  {
    icon: Award,
    label: `${site.yearsInBusiness} Years in Business`,
    detail: `Serving the metro since ${site.founded}`,
  },
  {
    icon: Zap,
    label: "100% Booked Online",
    detail: "Real-time scheduling, no phone tag",
  },
  {
    icon: CalendarClock,
    label: site.responseTime,
    detail: "During Sept – Jan peak season",
  },
];

export function TrustRow() {
  return (
    <section className="border-y border-white/10 bg-evergreen-900">
      <Container className="grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
        {items.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <Icon className="h-6 w-6 text-gold-400" />
            <p className="text-sm font-semibold text-cream">{label}</p>
            <p className="text-xs text-cream-dim/60">{detail}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
