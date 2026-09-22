import { Phone, CalendarCheck } from "lucide-react";
import { site } from "@/lib/config";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-white/10 bg-evergreen-950/95 backdrop-blur lg:hidden">
      <a
        href={site.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 border-r border-white/10 py-3.5 text-sm font-semibold text-cream"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>
      <a
        href="/book"
        className="flex flex-1 items-center justify-center gap-2 bg-gradient-to-b from-gold-400 to-gold-600 py-3.5 text-sm font-semibold text-evergreen-950"
      >
        <CalendarCheck className="h-4 w-4" />
        Book Install
      </a>
    </div>
  );
}
