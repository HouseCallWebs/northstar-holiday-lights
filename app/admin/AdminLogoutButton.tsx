"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/login", { method: "DELETE" });
        router.refresh();
      }}
      className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-cream-dim/80 hover:text-cream"
    >
      <LogOut className="h-4 w-4" />
      Log Out
    </button>
  );
}
