"use client";

import { MagneticButton } from "@/components/MagneticButton";
import { useQuote } from "@/components/QuoteProvider";
import { scrollToTarget } from "@/components/SmoothScroll";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const { openBooking } = useQuote();

  return (
    <footer className="px-4 pt-10 pb-8 md:px-6">
      <div className="glass mx-auto max-w-6xl rounded-[32px] px-6 py-12 text-center md:px-12">
        <p className="kicker">The close</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] tracking-[-0.045em]">
          The house, returned to quiet.
        </h2>
        <div className="mt-8 flex justify-center">
          <MagneticButton onClick={openBooking} className="btn-primary h-12 px-6 text-sm">
            Book Your Clean in 60 Sec
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-8 border-t border-line py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl tracking-[-0.04em]">AuraClean</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            Premium eco-conscious home cleaning and deep sanitization. Hospital-grade finish, botanical chemistry, hotel discipline.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mist">Visit</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <button type="button" onClick={() => scrollToTarget("#estimate")} className="hover:text-[#10B981]">
                Instant estimate
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToTarget("#checklist")} className="hover:text-[#10B981]">
                75-point ritual
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToTarget("#cadence")} className="hover:text-[#10B981]">
                Cadence
              </button>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mist">Studio</p>
          <p className="mt-3 text-sm text-mist">Mumbai · Bengaluru · Delhi NCR · Pune · Hyderabad</p>
          <p className="mt-2 text-sm">book@auraclean.com</p>
          <p className="text-sm text-mist">+91 80 4550 2499</p>
        </div>
      </div>
      <p className="mx-auto max-w-6xl text-xs text-mist">
        Estimates are sample visit prices for this experience and are confirmed before anyone arrives. No payment is taken on this page.
      </p>
    </footer>
  );
}
