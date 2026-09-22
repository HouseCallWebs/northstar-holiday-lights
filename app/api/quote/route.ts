import { randomUUID } from "crypto";
import { quoteSchema } from "@/lib/validation";
import { saveQuote } from "@/lib/storage";
import { notify } from "@/lib/notify";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit(`quote:${clientKey}`);
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

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.issues[0]?.message || "Invalid submission." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.website) {
    return Response.json({ ok: true });
  }

  const id = randomUUID();

  await saveQuote({
    id,
    createdAt: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    homeSize: data.homeSize,
    stories: data.stories,
    packageInterest: data.packageInterest,
    photoUrl: data.photoUrl || "",
    notes: data.notes || "",
  });

  await notify({
    type: "quote",
    summary: `${data.name} requested a quote (${data.packageInterest}) at ${data.address}`,
    data,
  });

  return Response.json({ ok: true, id });
}
