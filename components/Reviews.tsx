"use client";

import { MaterialScene, type SceneKind } from "@/components/scenes";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

const STORIES: {
  quote: string;
  name: string;
  place: string;
  kind: SceneKind;
}[] = [
  {
    quote: "The kitchen glass looked rented. They left the grout pale and the air soft — no perfume, just clean.",
    name: "Meera S.",
    place: "Bandra West · 3 BHK",
    kind: "hob",
  },
  {
    quote: "We have a senior dog. I asked them to skip anything harsh. The floors were quiet and he slept through it.",
    name: "Arjun & Nila",
    place: "Indiranagar · Villa",
    kind: "tile",
  },
  {
    quote: "Post-renovation dust was in the curtains of light. After AuraClean the apartment finally looked finished.",
    name: "Rohan K.",
    place: "Jubilee Hills · 4 BHK",
    kind: "sofa",
  },
  {
    quote: "The bed was dressed the way a good hotel does it. I opened the door and the week got quieter.",
    name: "Sana Q.",
    place: "Vasant Vihar · 2 BHK",
    kind: "sofa",
  },
  {
    quote: "Move-out day, and the owner asked who had cleaned. That has never happened to us before.",
    name: "Dev P.",
    place: "Koregaon Park · Penthouse",
    kind: "tile",
  },
];

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const story = STORIES[index];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % STORIES.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  function step(direction: number) {
    setIndex((current) => (current + direction + STORIES.length) % STORIES.length);
  }

  return (
    <section id="stories" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="kicker">Homeowner stories</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.7rem)] leading-[1.02] tracking-[-0.045em]">
              Five-star quiet, room by room.
            </h2>
          </div>
          <GoogleBadge />
        </div>

        <div
          className="glass mt-10 grid overflow-hidden rounded-[32px] lg:grid-cols-[1.1fr_0.9fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="grid grid-cols-2">
            <figure className="relative min-h-64">
              <MaterialScene kind={story.kind} state="before" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-[11px] tracking-[0.16em] text-white uppercase">
                Before
              </figcaption>
            </figure>
            <figure className="relative min-h-64">
              <MaterialScene kind={story.kind} state="after" />
              <figcaption className="absolute right-3 bottom-3 rounded-full bg-white/90 px-3 py-1 text-[11px] tracking-[0.16em] text-[#0B0F17] uppercase">
                After
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-col justify-between p-6 md:p-10">
            <div>
              <div className="flex gap-1 text-[#10B981]" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug tracking-[-0.04em]">
                “{story.quote}”
              </blockquote>
            </div>
            <div className="mt-8 flex items-end justify-between gap-4">
              <div>
                <p className="font-medium">{story.name}</p>
                <p className="text-sm text-mist">{story.place}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#10B981]">Verified homeowner</p>
              </div>
              <div className="flex gap-2">
                <button type="button" aria-label="Previous story" onClick={() => step(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-line">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Next story" onClick={() => step(1)} className="grid h-11 w-11 place-items-center rounded-full border border-line">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {STORIES.map((item, dot) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show story from ${item.name}`}
              onClick={() => setIndex(dot)}
              className={`h-1.5 rounded-full transition-all ${dot === index ? "w-8 bg-[#10B981]" : "w-2 bg-white/25"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GoogleBadge() {
  return (
    <div className="inline-flex items-center gap-3 self-start rounded-full border border-line bg-white/[0.04] px-4 py-2 backdrop-blur">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
        <path fill="#34A853" d="M12 24c3.2 0 5.9-1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
        <path fill="#FBBC05" d="M5.4 14.4A7.2 7.2 0 0 1 5 12c0-.8.1-1.6.4-2.4V6.5H1.4A12 12 0 0 0 0 12c0 1.9.5 3.8 1.4 5.5l4-3.1z" />
        <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0A12 12 0 0 0 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
      </svg>
      <div className="leading-tight">
        <p className="text-sm font-medium">4.9 · Google reviews</p>
        <p className="text-xs text-mist">Homeowner rating</p>
      </div>
    </div>
  );
}
