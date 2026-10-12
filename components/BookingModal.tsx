"use client";

import { getLenis } from "@/components/SmoothScroll";
import { useQuote } from "@/components/QuoteProvider";
import { formatInr } from "@/lib/pricing";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const WINDOWS = ["Morning 8–11", "Midday 11–2", "Afternoon 2–5", "Evening 5–8"];

export function BookingModal() {
  const { bookingOpen, closeBooking, quote } = useQuote();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    date: "",
    window: WINDOWS[0],
    notes: "",
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!bookingOpen) return;
    setStep(0);
    setDone(false);
    setError("");
    const lenis = getLenis();
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [bookingOpen, closeBooking]);

  if (!mounted || !bookingOpen) return null;

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function next() {
    if (step === 0) {
      if (form.name.trim().length < 2) {
        setError("Add the name we should ask for at the door.");
        return;
      }
      if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
        setError("Enter a 10-digit Indian mobile number.");
        return;
      }
    }
    if (step === 1 && !form.date) {
      setError("Choose a day for the visit.");
      return;
    }
    setError("");
    setStep((current) => current + 1);
  }

  const today = new Date();
  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  return createPortal(
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[80] grid place-items-end p-0 sm:place-items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <motion.button
          type="button"
          className="absolute inset-0 bg-black/65"
          aria-label="Close booking"
          onClick={closeBooking}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="glass relative max-h-[100svh] w-full max-w-lg overflow-auto rounded-t-[28px] p-6 sm:rounded-[28px]"
          data-lenis-prevent
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="kicker">60-second booking</p>
              <h2 id="booking-title" className="mt-2 font-display text-3xl tracking-[-0.04em]">
                {done ? "Request noted." : "Reserve the sanctuary."}
              </h2>
            </div>
            <button type="button" onClick={closeBooking} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-line">
              <X className="h-4 w-4" />
            </button>
          </div>

          {done ? (
            <div className="py-8 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#10B981] text-[#042015]">
                <Check className="h-6 w-6" />
              </span>
              <p className="mt-5 text-lg">
                {form.name.trim()}, your {quote.service.label.toLowerCase()} for {quote.room.label} is staged at {formatInr(quote.total)}.
              </p>
              <p className="mt-3 text-sm text-mist">
                No payment was taken. A coordinator confirms the visit before anyone arrives. This preview keeps the request on this device only.
              </p>
              <button type="button" onClick={closeBooking} className="btn-primary mt-6 h-12 px-6 text-sm">
                Close
              </button>
            </div>
          ) : (
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (step < 2) next();
                else setDone(true);
              }}
            >
              <div className="flex gap-2 text-xs uppercase tracking-[0.18em] text-mist">
                {["Contact", "Schedule", "Confirm"].map((label, index) => (
                  <span key={label} className={index === step ? "text-[#10B981]" : undefined}>
                    0{index + 1} {label}
                  </span>
                ))}
              </div>

              {step === 0 && (
                <>
                  <label className="block text-sm">
                    Name
                    <input className="field mt-2" value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" />
                  </label>
                  <label className="block text-sm">
                    Mobile
                    <input className="field mt-2" inputMode="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" placeholder="98XXXXXXXX" />
                  </label>
                  <label className="block text-sm">
                    Neighbourhood
                    <input className="field mt-2" value={form.area} onChange={(event) => update("area", event.target.value)} placeholder="Bandra West" />
                  </label>
                </>
              )}

              {step === 1 && (
                <>
                  <label className="block text-sm">
                    Preferred day
                    <input className="field mt-2" type="date" min={minDate} value={form.date} onChange={(event) => update("date", event.target.value)} />
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {WINDOWS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => update("window", item)}
                        className={`rounded-2xl border px-3 py-3 text-sm ${form.window === item ? "border-[#10B981] bg-[#10B981]/10" : "border-line"}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <label className="block text-sm">
                    Notes
                    <textarea className="field mt-2 min-h-24 resize-none" value={form.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Pets, access, anything fragile." />
                  </label>
                </>
              )}

              {step === 2 && (
                <div className="rounded-2xl border border-line p-4 text-sm">
                  <p className="font-display text-3xl tracking-[-0.04em]">{formatInr(quote.total)}</p>
                  <p className="mt-2 text-mist">
                    {quote.service.label} · {quote.room.label} · {quote.frequency.label}
                  </p>
                  <p className="mt-3">
                    {form.name} · {form.phone}
                  </p>
                  <p className="text-mist">
                    {form.date} · {form.window}
                    {form.area ? ` · ${form.area}` : ""}
                  </p>
                </div>
              )}

              {error && <p className="text-sm text-red-300">{error}</p>}

              <div className="flex gap-2 pt-2">
                {step > 0 && (
                  <button type="button" className="btn-ghost h-12 flex-1" onClick={() => setStep((current) => current - 1)}>
                    Back
                  </button>
                )}
                <button type="submit" className="btn-primary h-12 flex-1 px-4 text-sm">
                  {step === 2 ? "Confirm request" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
