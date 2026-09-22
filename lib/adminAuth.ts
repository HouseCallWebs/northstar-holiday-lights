import { cookies } from "next/headers";

const COOKIE_NAME = "nhl_admin";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  const expected = process.env.ADMIN_PASSWORD || "northstar-demo";
  return value === expected;
}
