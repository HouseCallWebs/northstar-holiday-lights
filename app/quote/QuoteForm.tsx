"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { ButtonAsButton, Button } from "@/components/ui/Button";
import { packages } from "@/lib/config";

const homeSizes = [
  "Under 1,500 sq ft",
  "1,500 – 2,500 sq ft",
  "2,500 – 4,000 sq ft",
  "4,000+ sq ft",
];

export function QuoteForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    homeSize: "",
    stories: "",
    packageInterest: "",
    photoUrl: "",
    notes: "",
    website: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-gold-500/30 bg-evergreen-900/60 p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold-400" />
        <h2 className="mt-6 font-display text-3xl text-cream">Quote Request Received</h2>
        <p className="mt-3 text-cream-dim/80">
          Thanks, {form.name.split(" ")[0] || "there"}! We&apos;ll review your details and follow up by
          phone or email — usually the same day during peak season.
        </p>
        <p className="mt-6 text-xs text-cream-dim/50">
          This is a demo — no real quote will be sent.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/book" variant="primary">
            Ready to skip ahead? Book now
          </Button>
          <Button href="/" variant="secondary">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-white/10 bg-evergreen-900/40 p-6 sm:p-10"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote-website">Company Website</label>
        <input
          id="quote-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jamie Sanders"
            className={inputClass}
          />
        </Field>
        <Field label="Phone">
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(720) 555-0100"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Email">
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="jamie@email.com"
          className={inputClass}
        />
      </Field>

      <Field label="Street Address">
        <input
          required
          type="text"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="123 Aspen Grove Way, Denver, CO"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Approximate Home Size">
          <select
            required
            value={form.homeSize}
            onChange={(e) => update("homeSize", e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select size
            </option>
            {homeSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Stories">
          <select
            required
            value={form.stories}
            onChange={(e) => update("stories", e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select stories
            </option>
            <option value="1">1 story</option>
            <option value="2">2 stories</option>
            <option value="3+">3+ stories</option>
          </select>
        </Field>
      </div>

      <Field label="Package Interest">
        <select
          required
          value={form.packageInterest}
          onChange={(e) => update("packageInterest", e.target.value)}
          className={inputClass}
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
      </Field>

      <Field label="Photo URL" hint="optional — a link to a photo of your home's front helps us quote faster">
        <input
          type="url"
          value={form.photoUrl}
          onChange={(e) => update("photoUrl", e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      </Field>

      <Field label="Notes" hint="optional">
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Tell us about your vision, roofline length, trees you'd like wrapped, etc."
          className={inputClass}
        />
      </Field>

      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <ButtonAsButton type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Request My Free Quote"
        )}
      </ButtonAsButton>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-gold-500 focus:outline-none";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-cream-dim/85">
        {label} {hint ? <span className="text-cream-dim/40">({hint})</span> : null}
      </span>
      {children}
    </label>
  );
}
