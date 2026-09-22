import { cookies } from "next/headers";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

const COOKIE_NAME = "nhl_admin";

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit(`admin-login:${clientKey}`);
  if (!rateLimit.allowed) {
    return Response.json({ ok: false, error: "Too many attempts. Please wait a few minutes." }, { status: 429 });
  }

  const { password } = await request.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD || "northstar-demo";

  if (password !== expected) {
    return Response.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, expected, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return Response.json({ ok: true });
}
