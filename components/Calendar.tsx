"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const BOOKING_WINDOW_DAYS = 90;
const LEAD_TIME_DAYS = 2;

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export function Calendar({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (dateKey: string) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const earliest = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + LEAD_TIME_DAYS);
    return d;
  }, [today]);

  const latest = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + BOOKING_WINDOW_DAYS);
    return d;
  }, [today]);

  const [viewDate, setViewDate] = useState(() => new Date(earliest.getFullYear(), earliest.getMonth(), 1));

  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const startOffset = firstOfMonth.getDay();

  const cells: (Date | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewDate.getFullYear(), viewDate.getMonth(), i + 1)),
  ];

  const earliestMonth = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
  const canGoPrev = firstOfMonth > earliestMonth;
  const canGoNext = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1) <= latest;

  return (
    <div className="rounded-2xl border border-white/10 bg-evergreen-950/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          disabled={!canGoPrev}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-cream disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-display text-lg text-cream">
          {viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
        <button
          type="button"
          onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
          disabled={!canGoNext}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-cream disabled:opacity-30"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-cream-dim/50">
        {WEEKDAY_LABELS.map((label, i) => (
          <span key={`${label}-${i}`}>{label}</span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <span key={`empty-${i}`} />;

          const isSunday = date.getDay() === 0;
          const inRange = date >= earliest && date <= latest;
          const disabled = isSunday || !inRange;
          const dateKey = toDateKey(date);
          const isSelected = selected === dateKey;

          return (
            <button
              key={dateKey}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(dateKey)}
              className={cn(
                "aspect-square rounded-lg text-sm font-medium transition-colors",
                disabled && "cursor-not-allowed text-cream-dim/20",
                !disabled && !isSelected && "text-cream-dim/85 hover:bg-white/10",
                isSelected && "bg-gradient-to-b from-gold-400 to-gold-600 text-evergreen-950"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-cream-dim/50">
        Closed Sundays. Showing availability for the next {BOOKING_WINDOW_DAYS} days.
      </p>
    </div>
  );
}
