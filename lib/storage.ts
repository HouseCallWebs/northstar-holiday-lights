import { promises as fs } from "fs";
import path from "path";

// Persistence layer with two backends:
//
// 1. Vercel KV (Upstash Redis) — used automatically in production once you
//    connect a KV/Redis store to this project in the Vercel dashboard
//    (Project → Storage → Create Database → "Upstash for Redis" or
//    "Vercel KV"). Vercel injects KV_REST_API_URL / KV_REST_API_TOKEN
//    automatically — no code changes needed.
// 2. Local JSON files under /data — used automatically when those env vars
//    aren't set (e.g. local `npm run dev`). This keeps the zero-setup local
//    demo experience exactly as before.
//
// Vercel's serverless filesystem is ephemeral/read-only outside /tmp, so
// the JSON-file path is dev-only. Do not rely on it in production.

const DATA_DIR = path.join(process.cwd(), "data");

export type BookingRecord = {
  id: string;
  confirmationNumber: string;
  createdAt: string;
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
};

export type QuoteRecord = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  homeSize: string;
  stories: string;
  packageInterest: string;
  photoUrl: string;
  notes: string;
};

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const useKv = Boolean(KV_URL && KV_TOKEN);

let kvClientPromise: Promise<import("@vercel/kv").VercelKV> | null = null;
async function getKv() {
  if (!kvClientPromise) {
    kvClientPromise = import("@vercel/kv").then((mod) => mod.createClient({
      url: KV_URL!,
      token: KV_TOKEN!,
    }));
  }
  return kvClientPromise;
}

// --- Local JSON-file backend (dev fallback) ---

async function ensureDataFile(fileName: string) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const filePath = path.join(DATA_DIR, fileName);
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf-8");
  }
  return filePath;
}

async function readJsonArrayFile<T>(fileName: string): Promise<T[]> {
  const filePath = await ensureDataFile(fileName);
  const raw = await fs.readFile(filePath, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function appendJsonRecordFile<T>(fileName: string, record: T): Promise<void> {
  const filePath = await ensureDataFile(fileName);
  const existing = await readJsonArrayFile<T>(fileName);
  existing.push(record);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
}

// --- KV backend (production) ---
// Each record type is stored as a Redis list (RPUSH to append, LRANGE to read all).

const KV_KEYS = {
  bookings: "northstar:bookings",
  quotes: "northstar:quotes",
};

async function appendKvRecord<T>(key: string, record: T): Promise<void> {
  const kv = await getKv();
  await kv.rpush(key, JSON.stringify(record));
}

async function readKvArray<T>(key: string): Promise<T[]> {
  const kv = await getKv();
  const raw = await kv.lrange<string>(key, 0, -1);
  return raw
    .map((item) => {
      try {
        return typeof item === "string" ? (JSON.parse(item) as T) : (item as T);
      } catch {
        return null;
      }
    })
    .filter((item): item is T => item !== null);
}

// --- Public API (unchanged signatures — callers don't know which backend is active) ---

export async function saveBooking(record: BookingRecord) {
  if (useKv) {
    await appendKvRecord(KV_KEYS.bookings, record);
  } else {
    await appendJsonRecordFile<BookingRecord>("bookings.json", record);
  }
}

export async function getBookings(): Promise<BookingRecord[]> {
  const all = useKv
    ? await readKvArray<BookingRecord>(KV_KEYS.bookings)
    : await readJsonArrayFile<BookingRecord>("bookings.json");
  return all.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function saveQuote(record: QuoteRecord) {
  if (useKv) {
    await appendKvRecord(KV_KEYS.quotes, record);
  } else {
    await appendJsonRecordFile<QuoteRecord>("quotes.json", record);
  }
}

export async function getQuotes(): Promise<QuoteRecord[]> {
  const all = useKv
    ? await readKvArray<QuoteRecord>(KV_KEYS.quotes)
    : await readJsonArrayFile<QuoteRecord>("quotes.json");
  return all.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
