// Lightweight in-memory rate limiter — resets on server restart.
// Good enough to blunt basic form-spam/abuse in a demo; swap for a
// shared store (Upstash/Redis) if this ever needs to survive multiple
// server instances.

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const timestamps = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - oldest) };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { allowed: true };
}

export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}
