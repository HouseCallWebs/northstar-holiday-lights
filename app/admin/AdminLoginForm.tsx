"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { ButtonAsButton } from "@/components/ui/Button";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Incorrect password.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-white/10 bg-evergreen-900/50 p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
        <Lock className="h-5 w-5" />
      </div>
      <h1 className="mt-5 font-display text-2xl text-cream">Lead Dashboard</h1>
      <p className="mt-2 text-sm text-cream-dim/60">
        Demo-only admin view of bookings and quote requests. Password-protected via
        <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-xs">ADMIN_PASSWORD</code>
        env variable.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full rounded-xl border border-white/10 bg-evergreen-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:border-gold-500 focus:outline-none"
        />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <ButtonAsButton type="submit" className="w-full" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Unlock Dashboard"}
        </ButtonAsButton>
      </form>
    </div>
  );
}
