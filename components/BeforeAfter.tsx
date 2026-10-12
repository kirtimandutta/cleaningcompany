"use client";

import { MaterialScene, type SceneKind } from "@/components/scenes";
import { ChevronsLeftRight } from "lucide-react";
import { useRef, useState } from "react";

const SCENES: { id: SceneKind; label: string; before: string; after: string }[] = [
  { id: "tile", label: "Grout", before: "Stained grout", after: "Stone, restored" },
  { id: "hob", label: "Hob", before: "Greasy hob", after: "Glass, clear" },
  { id: "sofa", label: "Cushion", before: "Tired cushion", after: "Linen, reset" },
];

export function BeforeAfter() {
  const frame = useRef<HTMLDivElement>(null);
  const [kind, setKind] = useState<SceneKind>("tile");
  const [pos, setPos] = useState(58);
  const scene = SCENES.find((item) => item.id === kind) ?? SCENES[0];

  function move(clientX: number) {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }

  return (
    <section id="transformation" className="px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="kicker">The reveal</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.045em]">
            Drag the glass. Watch the room exhale.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mist">
            Stained tile and grout, a greasy kitchen hob, a sofa cushion that has hosted one season too many — then the finish we leave behind.
          </p>
          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Comparison scenes">
            {SCENES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={kind === item.id}
                onClick={() => setKind(item.id)}
                className={`rounded-full px-4 py-2 text-sm ${
                  kind === item.id ? "bg-[#10B981] text-[#042015]" : "border border-line text-mist"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={frame}
          className="relative aspect-[16/10] cursor-ew-resize touch-pan-y overflow-hidden rounded-[32px] border border-line shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
          onPointerDown={(event) => {
            frame.current?.setPointerCapture(event.pointerId);
            move(event.clientX);
          }}
          onPointerMove={(event) => {
            if (event.buttons !== 1 && event.pointerType === "mouse") return;
            if (!frame.current?.hasPointerCapture(event.pointerId) && event.pointerType !== "touch") return;
            move(event.clientX);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") setPos((value) => Math.max(4, value - 4));
            if (event.key === "ArrowRight") setPos((value) => Math.min(96, value + 4));
          }}
          tabIndex={0}
          role="slider"
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
        >
          <MaterialScene kind={kind} state="after" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <MaterialScene kind={kind} state="before" />
          </div>
          <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-[11px] tracking-[0.16em] text-white uppercase backdrop-blur">
            {scene.before}
          </span>
          <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-white/85 px-3 py-1 text-[11px] tracking-[0.16em] text-[#0B0F17] uppercase">
            {scene.after}
          </span>
          <div className="absolute inset-y-0 z-10 w-px bg-white" style={{ left: `${pos}%` }} />
          <div
            className="absolute top-1/2 z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0B0F17] shadow-xl"
            style={{ left: `${pos}%` }}
          >
            <ChevronsLeftRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
