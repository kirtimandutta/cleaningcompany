"use client";

import { MagneticButton } from "@/components/MagneticButton";
import { useQuote } from "@/components/QuoteProvider";
import { ADDONS, FREQUENCIES, ROOMS, SERVICES, formatInr, type AddonId } from "@/lib/pricing";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CookingPot, Refrigerator, Sofa, Waves } from "lucide-react";

const ADDON_ICONS = {
  sofa: Sofa,
  cabinets: CookingPot,
  balcony: Waves,
  fridge: Refrigerator,
} as const;

export function Estimator({ variant = "dock" }: { variant?: "dock" | "overlay" }) {
  const card = <EstimatorCard variant={variant} />;
  if (variant === "overlay") return card;

  return (
    <section id="estimate" className="relative px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Instant booking dock</p>
        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-[clamp(2.2rem,4vw,3.7rem)] leading-[1.02] tracking-[-0.045em]">
            A clear price, before anyone rings the bell.
          </h2>
          <p className="max-w-sm text-mist">
            Choose the ritual, the home, and only the add-ons you want. The figure updates as you go.
          </p>
        </div>
        <div className="mt-10">{card}</div>
      </div>
    </section>
  );
}

function EstimatorCard({ variant }: { variant: "dock" | "overlay" }) {
  const { service, setService, room, setRoom, addons, toggleAddon, frequency, quote, openBooking } = useQuote();
  const video = variant === "overlay";

  return (
    <div className={`${video ? "glass-video text-white" : "glass"} rounded-[28px] p-4 md:p-6`}>
      {video && <p className="kicker mb-4 text-[#6ee7b7]">04 / Sanctuary</p>}
      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
        <div className="space-y-6">
          <fieldset>
            <legend className={`mb-3 text-xs uppercase tracking-[0.22em] ${video ? "text-white/60" : "text-mist"}`}>
              Service
            </legend>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Service">
              {SERVICES.map((item) => (
                <Segment
                  key={item.id}
                  active={service === item.id}
                  label={item.label}
                  layoutId={`service-${variant}`}
                  video={video}
                  onClick={() => setService(item.id)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={`mb-3 text-xs uppercase tracking-[0.22em] ${video ? "text-white/60" : "text-mist"}`}>
              Home
            </legend>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Home size">
              {ROOMS.map((item) => (
                <Segment
                  key={item.id}
                  active={room === item.id}
                  label={item.label}
                  layoutId={`room-${variant}`}
                  video={video}
                  onClick={() => setRoom(item.id)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={`mb-3 text-xs uppercase tracking-[0.22em] ${video ? "text-white/60" : "text-mist"}`}>
              Add-ons
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {ADDONS.map((item) => {
                const Icon = ADDON_ICONS[item.id];
                const on = addons.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleAddon(item.id as AddonId)}
                    className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                      on
                        ? "border-[#10B981]/60 bg-[#10B981]/10"
                        : video
                          ? "border-white/10 bg-white/5"
                          : "border-line bg-transparent"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#10B981]" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm">{item.label}</span>
                      <span className={`text-xs ${video ? "text-white/55" : "text-mist"}`}>{formatInr(item.price)}</span>
                    </span>
                    <span
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-[#10B981]" : "bg-white/15"}`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? "left-5" : "left-0.5"}`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <aside
          className={`flex flex-col justify-between rounded-[24px] border p-5 ${
            video ? "border-white/10 bg-black/25" : "border-line bg-[color:color-mix(in_srgb,var(--fg)_4%,transparent)]"
          }`}
          style={{
            backgroundImage: "radial-gradient(120% 80% at 100% 0%, rgba(16,185,129,0.18), transparent 55%)",
          }}
        >
          <div>
            <p className={`text-xs uppercase tracking-[0.22em] ${video ? "text-white/55" : "text-mist"}`}>
              Estimated: {quote.service.label}
            </p>
            <p className={`mt-2 text-sm ${video ? "text-white/70" : "text-mist"}`}>
              {quote.room.label}
              {quote.frequency.id !== "once" ? ` · ${quote.frequency.label}` : ""}
            </p>
            <div className="mt-6 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={quote.total}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="font-display text-[clamp(2.4rem,4vw,3.5rem)] leading-none tracking-[-0.05em]"
                  aria-live="polite"
                >
                  {formatInr(quote.total)}
                </motion.p>
              </AnimatePresence>
            </div>
            {quote.savings > 0 && (
              <p className="mt-3 text-sm text-[#6ee7b7]">
                <span className={`mr-2 line-through ${video ? "text-white/40" : "text-mist"}`}>
                  {formatInr(quote.subtotal)}
                </span>
                {FREQUENCIES.find((item) => item.id === frequency)?.note} on this visit
              </p>
            )}
            <ul className={`mt-5 space-y-1.5 text-sm ${video ? "text-white/65" : "text-mist"}`}>
              <li className="flex justify-between">
                <span>Ritual</span>
                <span>{formatInr(quote.base)}</span>
              </li>
              <li className="flex justify-between">
                <span>Add-ons</span>
                <span>{formatInr(quote.addonTotal)}</span>
              </li>
            </ul>
          </div>
          <MagneticButton onClick={openBooking} className="btn-primary mt-6 h-12 w-full px-5 text-sm">
            Book Your Clean in 60 Sec
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </aside>
      </div>
    </div>
  );
}

function Segment({
  active,
  label,
  onClick,
  layoutId,
  video,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  layoutId: string;
  video: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`relative rounded-full px-3.5 py-2 text-left text-sm ${active ? "text-[#042015]" : video ? "text-white/75" : "text-mist"}`}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-gradient-to-b from-[#6ee7b7] to-[#059669]"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
