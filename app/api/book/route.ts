import { randomUUID } from "crypto";
import { bookingSchema } from "@/lib/validation";
import { saveBooking } from "@/lib/storage";
import { notify } from "@/lib/notify";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit(`book:${clientKey}`);
  if (!rateLimit.allowed) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.issues[0]?.message || "Invalid submission." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot tripped — pretend success so bots don't learn anything, but discard.
  if (data.website) {
    return Response.json({ ok: true, confirmationNumber: "NHL-0000" });
  }

  const id = randomUUID();
  const confirmationNumber = `NHL-${Date.now().toString(36).toUpperCase().slice(-5)}`;

  await saveBooking({
    id,
    confirmationNumber,
    createdAt: new Date().toISOString(),
    serviceType: data.serviceType,
    packageInterest: data.packageInterest,
    address: data.address,
    city: data.city,
    zip: data.zip,
    stories: data.stories,
    date: data.date,
    timeWindow: data.timeWindow,
    name: data.name,
    phone: data.phone,
    email: data.email,
    notes: data.notes || "",
  });

  await notify({
    type: "booking",
    summary: `${data.name} booked ${data.serviceType} for ${data.date} (${data.timeWindow}) — confirmation ${confirmationNumber}`,
    data,
  });

  return Response.json({ ok: true, confirmationNumber, id });
}
