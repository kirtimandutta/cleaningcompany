"use client";

import { useQuote } from "@/components/QuoteProvider";
import { FREQUENCIES, calculateQuote, formatInr, type FrequencyId } from "@/lib/pricing";

export function Subscription() {
  const { service, room, addons, frequency, setFrequency } = useQuote();

  return (
    <section id="cadence" className="px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Cadence</p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,4vw,3.7rem)] leading-[1.02] tracking-[-0.045em]">
          A rhythm that keeps the house quiet.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-mist">
          Weekly, bi-weekly, monthly, or a single reset. The estimate follows the cadence you choose.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FREQUENCIES.map((item) => {
            const preview = calculateQuote({ service, room, addons, frequency: item.id });
            const selected = frequency === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFrequency(item.id as FrequencyId)}
                aria-pressed={selected}
                className={`rounded-[28px] border p-5 text-left transition ${
                  selected ? "border-[#10B981] bg-[#10B981]/10 shadow-[0_0_0_1px_rgba(16,185,129,0.35)]" : "glass"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm uppercase tracking-[0.18em] text-mist">{item.label}</span>
                  {item.id === "biweekly" && (
                    <span className="rounded-full bg-[#10B981] px-2 py-1 text-[10px] font-semibold tracking-wide text-[#042015] uppercase">
                      Most chosen
                    </span>
                  )}
                </div>
                <p className="mt-6 font-display text-4xl tracking-[-0.05em]">{formatInr(preview.total)}</p>
                <p className="mt-2 text-sm text-[#10B981]">{item.note}</p>
                <p className="mt-4 text-sm text-mist">{item.id === "once" ? "Per visit" : "Per visit, on this cadence"}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
