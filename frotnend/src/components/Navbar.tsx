"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV = [
  { label: "Marketplace", href: "#marketplace" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled ? "border-b border-zinc-800 bg-[#09090b]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-violet-600 text-[10px] font-bold">
            SH
          </span>
          <span className="text-sm">StellarHive</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((l) => (
            <a key={l.label} href={l.href} className="text-[13px] text-zinc-400 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/dashboard" className="px-3 py-1.5 text-[13px] text-zinc-400 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-violet-600 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-violet-500 transition-colors"
          >
            Get started
          </Link>
        </div>

        <button className="p-1.5 text-zinc-500 hover:text-white md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-zinc-800 bg-[#09090b] px-4 py-3 md:hidden">
          {NAV.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="block py-2.5 text-[13px] text-zinc-400 hover:text-white border-b border-zinc-800/50 last:border-0">
              {l.label}
            </a>
          ))}
          <Link href="/dashboard"
            className="mt-3 block rounded-md bg-violet-600 py-2 text-center text-[13px] font-medium text-white">
            Get started
          </Link>
        </div>
      )}
    </header>
  );
}
