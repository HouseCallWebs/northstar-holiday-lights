import { site } from "./config";

// Server-side notification path for new bookings/quotes.
// Wire a real key in production; with nothing configured this still
// saves the record (see lib/storage.ts) and logs clearly to the server console
// so nothing is silently lost in a demo.

type NotifyPayload = {
  type: "booking" | "quote";
  summary: string;
  data: Record<string, unknown>;
};

export async function notify(payload: NotifyPayload) {
  const webhookUrl = process.env.BOOKING_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.OWNER_NOTIFY_EMAIL;

  let delivered = false;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site: site.name, ...payload }),
      });
      delivered = true;
    } catch (err) {
      console.error("[notify] webhook delivery failed:", err);
    }
  }

  if (resendKey && notifyEmail) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: `${site.name} <notifications@${site.domain}>`,
        to: notifyEmail,
        subject: `New ${payload.type} — ${site.name}`,
        text: `${payload.summary}\n\n${JSON.stringify(payload.data, null, 2)}`,
      });
      delivered = true;
    } catch (err) {
      console.error("[notify] email delivery failed:", err);
    }
  }

  if (!delivered) {
    console.log(
      `[notify] New ${payload.type} saved — no RESEND_API_KEY/BOOKING_WEBHOOK_URL configured. ` +
        `Set them in .env.local to wire real notifications. Summary: ${payload.summary}`
    );
  }
}
