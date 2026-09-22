import { housecallwebs } from "@/lib/config";

export function DemoBanner() {
  return (
    <div className="w-full bg-evergreen-950 text-cream-dim">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-1.5 text-center text-[11px] font-medium tracking-wide sm:text-xs">
        <span>
          {housecallwebs.bannerText} —{" "}
          <a
            href={housecallwebs.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gold-500/60 underline-offset-2 hover:text-gold-400"
          >
            housecallwebs.com
          </a>
        </span>
      </div>
    </div>
  );
}
