"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Snowflake } from "lucide-react";
import { site } from "@/lib/config";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#packages", label: "Packages" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/areas", label: "Service Area" },
  { href: "/quote", label: "Get a Quote" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-evergreen-950/90 backdrop-blur supports-[backdrop-filter]:bg-evergreen-950/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Snowflake className="h-6 w-6 text-gold-400" strokeWidth={1.75} />
          <span className="font-display text-lg font-semibold text-cream sm:text-xl">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream-dim/90 transition-colors hover:text-gold-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-cream-dim transition-colors hover:text-gold-400"
          >
            <Phone className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
          <Button href="/book" size="sm">
            Book Install
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-evergreen-950 px-5 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-cream-dim"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-cream"
            >
              <Phone className="h-4 w-4" />
              Call {site.phoneDisplay}
            </a>
            <Button href="/book" onClick={() => setOpen(false)}>
              Book Install
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
