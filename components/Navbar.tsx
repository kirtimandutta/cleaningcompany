"use client";

import { MagneticButton } from "@/components/MagneticButton";
import { useQuote } from "@/components/QuoteProvider";
import { scrollToTarget } from "@/components/SmoothScroll";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#reset", label: "The Reset" },
  { href: "#estimate", label: "Estimate" },
  { href: "#transformation", label: "Before / After" },
  { href: "#checklist", label: "Ritual" },
  { href: "#trust", label: "Assurance" },
  { href: "#stories", label: "Stories" },
];

export function Navbar() {
  const { openBooking } = useQuote();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(stored);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("aura-theme", next);
  }

  function go(href: string) {
    setOpen(false);
    scrollToTarget(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <a
        href="#estimate"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-[#0B0F17]"
      >
        Skip to booking
      </a>
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 transition md:px-6 ${
          scrolled || open ? "glass mt-3 rounded-full" : "mt-4"
        }`}
      >
        <button type="button" onClick={() => go("#reset")} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#6ee7b7] to-[#059669] text-[#042015]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path
                d="M12 3c2 4 6 6.4 6 10.6a6 6 0 1 1-12 0C6 9.4 10 7 12 3z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="font-display text-lg tracking-[-0.04em]">AuraClean</span>
        </button>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => go(link.href)}
              className="text-sm text-mist transition hover:text-ink"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-10 w-10 place-items-center rounded-full border border-line"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <MagneticButton onClick={openBooking} className="btn-primary hidden h-10 px-4 text-sm sm:inline-flex">
            Book
          </MagneticButton>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass mx-4 mt-2 rounded-3xl p-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => go(link.href)}
                className="rounded-2xl px-3 py-3 text-left text-base hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <button type="button" onClick={openBooking} className="btn-primary mt-2 h-12">
              Book Your Clean in 60 Sec
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
