"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Calendar } from "@/components/Calendar";
import { ButtonAsButton, Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { bookingServiceTypes, packages, timeWindows, site } from "@/lib/config";

type FormState = {
  serviceType: string;
  packageInterest: string;
  address: string;
  city: string;
  zip: string;
  stories: string;
  date: string;
  timeWindow: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  website: string; // honeypot
};

const STEP_LABELS = ["Service", "Schedule", "Contact", "Review"];

function formatDateLabel(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export function BookingForm() {
  const searchParams = useSearchParams();
  const prefillPackage = searchParams.get("package") || "";

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ confirmationNumber: string } | null>(null);

  const [form, setForm] = useState<FormState>({
    serviceType: "new-install",
    packageInterest: prefillPackage,
    address: "",
    city: "",
    zip: "",
    stories: "",
    date: "",
    timeWindow: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    website: "",
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function stepIsValid(index: number) {
    if (index === 0) {
      return Boolean(form.serviceType && form.packageInterest && form.address && form.city && form.zip && form.stories);
    }
    if (index === 1) {
      return Boolean(form.date && form.timeWindow);
    }
    if (index === 2) {
      return Boolean(form.name && form.phone && form.email);
    }
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setConfirmation({ confirmationNumber: json.confirmationNumber });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-gold-500/30 bg-evergreen-900/60 p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold-400" />
        <h2 className="mt-6 font-display text-3xl text-cream">You&apos;re Booked!</h2>
        <p className="mt-3 text-cream-dim/80">
          We&apos;ll confirm your {formatDateLabel(form.date)} ({timeWindows.find((w) => w.id === form.timeWindow)?.label})
          appointment by text and email shortly.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-evergreen-950/60 p-5 text-left text-sm">
          <div className="flex justify-between border-b border-white/10 pb-3">
            <span className="text-cream-dim/60">Confirmation #</span>
            <span className="font-semibold text-gold-400">{confirmation.confirmationNumber}</span>
          </div>
          <dl className="mt-3 space-y-2">
            <div className="flex justify-between">
              <dt className="text-cream-dim/60">Service</dt>
              <dd className="text-cream">{bookingServiceTypes.find((s) => s.id === form.serviceType)?.label}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cream-dim/60">Package</dt>
              <dd className="text-cream">
                {packages.find((p) => p.id === form.packageInterest)?.name || "Not sure yet"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cream-dim/60">Address</dt>
              <dd className="text-right text-cream">{form.address}, {form.city}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cream-dim/60">Date</dt>
              <dd className="text-cream">{formatDateLabel(form.date)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cream-dim/60">Time Window</dt>
              <dd className="text-cream">{timeWindows.find((w) => w.id === form.timeWindow)?.hours}</dd>
            </div>
          </dl>
        </div>

        <p className="mt-6 text-xs text-cream-dim/50">
          This is a demo booking — nothing was actually scheduled or charged. In a live deployment
          this confirmation would also trigger a real text/email notification.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/" variant="secondary">
            Back to Home
          </Button>
          <Button href={site.phoneHref} variant="outline">
            <Phone className="h-4 w-4" /> Questions? Call Us
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-10 flex items-center justify-between">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="relative flex flex-1 flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                i < step && "border-gold-500 bg-gold-500 text-evergreen-950",
                i === step && "border-gold-500 text-gold-400",
                i > step && "border-white/15 text-cream-dim/40"
              )}
            >
              {i + 1}
            </div>
            <span
              className={cn(
                "mt-2 hidden text-xs sm:block",
                i <= step ? "text-cream-dim/85" : "text-cream-dim/40"
              )}
            >
              {label}
            </span>
            {i < STEP_LABELS.length - 1 ? (
              <span
                className={cn(
                  "absolute mt-4 h-px w-1/4 translate-x-[calc(50%+1rem)]",
                  i < step ? "bg-gold-500" : "bg-white/10"
                )}
              />
            ) : null}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) {
            if (stepIsValid(step)) setStep((s) => s + 1);
            return;
          }
          handleSubmit();
        }}
        className="rounded-3xl border border-white/10 bg-evergreen-900/40 p-6 sm:p-10"
      >
        {/* Honeypot — hidden from real users */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Company Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        {step === 0 ? (
          <fieldset className="space-y-6">
            <legend className="font-display text-2xl text-cream">Service & Property</legend>

            <div>
              <label className="mb-2 block text-sm font-medium text-cream-dim/85">Service Type</label>
              <div className="grid gap-2 sm:grid-cols-2">
                {bookingServiceTypes.map((option) => (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => update("serviceType", option.id)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                      form.serviceType === option.id
                        ? "border-gold-500 bg-gold-500/10 text-gold-400"
                        : "border-white/10 text-cream-dim/80 hover:border-white/30"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-cream-dim/85">Package Interest</label>
              <select
                required
                value={form.packageInterest}
                onChange={(e) => update("packageInterest", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream focus:border-gold-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select a package
                </option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} ({pkg.price}+)
                  </option>
                ))}
                <option value="not-sure">Not sure yet — help me choose</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-cream-dim/85">Street Address</label>
              <input
                required
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="123 Aspen Grove Way"
                className="w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-cream-dim/85">City</label>
                <input
                  required
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Denver"
                  className="w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-cream-dim/85">ZIP Code</label>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  placeholder="80238"
                  className="w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-cream-dim/85">Home Stories</label>
              <div className="flex gap-2">
                {["1", "2", "3+"].map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => update("stories", option)}
                    className={cn(
                      "flex-1 rounded-xl border py-3 text-sm font-medium transition-colors",
                      form.stories === option
                        ? "border-gold-500 bg-gold-500/10 text-gold-400"
                        : "border-white/10 text-cream-dim/80 hover:border-white/30"
                    )}
                  >
                    {option} {option === "1" ? "story" : "stories"}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset className="space-y-6">
            <legend className="font-display text-2xl text-cream">Pick a Date & Time</legend>
            <Calendar selected={form.date || null} onSelect={(dateKey) => update("date", dateKey)} />

            <div>
              <label className="mb-2 block text-sm font-medium text-cream-dim/85">Time Window</label>
              <div className="grid gap-2 sm:grid-cols-2">
                {timeWindows.map((window) => (
                  <button
                    type="button"
                    key={window.id}
                    onClick={() => update("timeWindow", window.id)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition-colors",
                      form.timeWindow === window.id
                        ? "border-gold-500 bg-gold-500/10"
                        : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <span className={cn("block text-sm font-semibold", form.timeWindow === window.id ? "text-gold-400" : "text-cream")}>
                      {window.label}
                    </span>
                    <span className="text-xs text-cream-dim/60">{window.hours}</span>
                  </button>
                ))}
              </div>
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset className="space-y-6">
            <legend className="font-display text-2xl text-cream">Your Contact Info</legend>

            <div>
              <label className="mb-2 block text-sm font-medium text-cream-dim/85">Full Name</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Jamie Sanders"
                className="w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-cream-dim/85">Phone</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(720) 555-0100"
                  className="w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-cream-dim/85">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="jamie@email.com"
                  className="w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-cream-dim/85">
                Anything else we should know? <span className="text-cream-dim/40">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Gate code, specific design ideas, etc."
                className="w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-gold-500 focus:outline-none"
              />
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset className="space-y-4">
            <legend className="font-display text-2xl text-cream">Review & Confirm</legend>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-evergreen-950/60 p-5 text-sm">
              <Row label="Service" value={bookingServiceTypes.find((s) => s.id === form.serviceType)?.label} />
              <Row
                label="Package"
                value={packages.find((p) => p.id === form.packageInterest)?.name || "Not sure yet"}
              />
              <Row label="Address" value={`${form.address}, ${form.city} ${form.zip}`} />
              <Row label="Stories" value={form.stories} />
              <Row label="Date" value={form.date ? formatDateLabel(form.date) : ""} />
              <Row label="Time Window" value={timeWindows.find((w) => w.id === form.timeWindow)?.hours} />
              <Row label="Name" value={form.name} />
              <Row label="Phone" value={form.phone} />
              <Row label="Email" value={form.email} />
            </div>
            <p className="text-xs text-cream-dim/50">
              By booking, you agree to be contacted by {site.name} to confirm your appointment.
              This is a demo — no real appointment is scheduled.
            </p>
          </fieldset>
        ) : null}

        {error ? (
          <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-4">
          <ButtonAsButton
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={cn(step === 0 && "invisible")}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </ButtonAsButton>

          <ButtonAsButton type="submit" disabled={!stepIsValid(step) || submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Booking...
              </>
            ) : step < 3 ? (
              <>
                Continue <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Confirm Booking <CheckCircle2 className="h-4 w-4" />
              </>
            )}
          </ButtonAsButton>
        </div>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-cream-dim/60">{label}</span>
      <span className="text-right font-medium text-cream">{value || "—"}</span>
    </div>
  );
}
