import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getBookings, getQuotes } from "@/lib/storage";

export async function GET(request: Request) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const type = new URL(request.url).searchParams.get("type");
  const data = type === "quotes" ? await getQuotes() : await getBookings();
  const fileName = type === "quotes" ? "quotes.json" : "bookings.json";

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
