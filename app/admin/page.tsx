import type { Metadata } from "next";
import { Download, Calendar, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getBookings, getQuotes } from "@/lib/storage";
import { AdminLoginForm } from "./AdminLoginForm";
import { AdminLogoutButton } from "./AdminLogoutButton";

export const metadata: Metadata = {
  title: "Lead Dashboard (Demo)",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return (
      <div className="flex min-h-[70vh] items-center bg-ink py-16">
        <Container>
          <AdminLoginForm />
        </Container>
      </div>
    );
  }

  const [bookings, quotes] = await Promise.all([getBookings(), getQuotes()]);

  return (
    <div className="bg-ink py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-cream">Lead Dashboard</h1>
            <p className="mt-1 text-sm text-cream-dim/60">
              Demo view — every booking and quote request submitted through this site lands here,
              newest first.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export?type=bookings"
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-cream-dim/80 hover:text-cream"
            >
              <Download className="h-4 w-4" /> Export Bookings
            </a>
            <a
              href="/api/admin/export?type=quotes"
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-cream-dim/80 hover:text-cream"
            >
              <Download className="h-4 w-4" /> Export Quotes
            </a>
            <AdminLogoutButton />
          </div>
        </div>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 font-display text-xl text-cream">
            <Calendar className="h-5 w-5 text-gold-400" />
            Bookings <span className="text-sm font-sans text-cream-dim/50">({bookings.length})</span>
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-evergreen-900/60 text-xs uppercase tracking-wide text-cream-dim/50">
                <tr>
                  <Th>Confirmation</Th>
                  <Th>Name</Th>
                  <Th>Contact</Th>
                  <Th>Service</Th>
                  <Th>Address</Th>
                  <Th>Date / Window</Th>
                  <Th>Submitted</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-cream-dim/50">
                      No bookings yet. Submit the <a href="/book" className="text-gold-400 underline">booking form</a> to see one appear here.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="text-cream-dim/85">
                      <Td className="font-semibold text-gold-400">{b.confirmationNumber}</Td>
                      <Td>{b.name}</Td>
                      <Td>
                        <div>{b.phone}</div>
                        <div className="text-xs text-cream-dim/50">{b.email}</div>
                      </Td>
                      <Td>{b.serviceType}</Td>
                      <Td>
                        {b.address}, {b.city} {b.zip}
                      </Td>
                      <Td>
                        {b.date} <span className="text-xs text-cream-dim/50">({b.timeWindow})</span>
                      </Td>
                      <Td className="text-xs text-cream-dim/50">
                        {new Date(b.createdAt).toLocaleString()}
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="flex items-center gap-2 font-display text-xl text-cream">
            <FileText className="h-5 w-5 text-gold-400" />
            Quote Requests <span className="text-sm font-sans text-cream-dim/50">({quotes.length})</span>
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-evergreen-900/60 text-xs uppercase tracking-wide text-cream-dim/50">
                <tr>
                  <Th>Name</Th>
                  <Th>Contact</Th>
                  <Th>Address</Th>
                  <Th>Home Size</Th>
                  <Th>Package</Th>
                  <Th>Submitted</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-cream-dim/50">
                      No quote requests yet. Submit the <a href="/quote" className="text-gold-400 underline">quote form</a> to see one appear here.
                    </td>
                  </tr>
                ) : (
                  quotes.map((q) => (
                    <tr key={q.id} className="text-cream-dim/85">
                      <Td>{q.name}</Td>
                      <Td>
                        <div>{q.phone}</div>
                        <div className="text-xs text-cream-dim/50">{q.email}</div>
                      </Td>
                      <Td>{q.address}</Td>
                      <Td>
                        {q.homeSize} <span className="text-xs text-cream-dim/50">({q.stories} stories)</span>
                      </Td>
                      <Td>{q.packageInterest}</Td>
                      <Td className="text-xs text-cream-dim/50">
                        {new Date(q.createdAt).toLocaleString()}
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-semibold">{children}</th>;
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className || ""}`}>{children}</td>;
}
