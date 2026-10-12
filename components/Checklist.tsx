"use client";

import { getLenis } from "@/components/SmoothScroll";
import { RITUAL, RITUAL_COUNT, type AreaId } from "@/lib/checklist";
import { AnimatePresence, motion } from "framer-motion";
import { Bath, BedDouble, CookingPot, Sofa, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const ICONS = {
  kitchen: CookingPot,
  bath: Bath,
  living: Sofa,
  bedroom: BedDouble,
} as const;

export function Checklist() {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState<AreaId>("kitchen");

  return (
    <section id="checklist" className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">The ritual</p>
        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-display text-[clamp(2.2rem,4vw,3.7rem)] leading-[1.02] tracking-[-0.045em]">
            The {RITUAL_COUNT}-Point Sanctuary Checklist.
          </h2>
          <p className="max-w-sm text-mist">
            Nothing poetic is left to memory. Every visit follows the same itemized hospitality standard.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {RITUAL.map((group) => {
            const Icon = ICONS[group.id];
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => {
                  setArea(group.id);
                  setOpen(true);
                }}
                className="glass rounded-[28px] p-6 text-left transition hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#10B981]" />
                  <span className="text-xs uppercase tracking-[0.2em] text-mist">{group.tasks.length} tasks</span>
                </div>
                <h3 className="mt-6 font-display text-3xl tracking-[-0.04em]">{group.label}</h3>
                <p className="mt-2 text-mist">{group.summary}</p>
                <ul className="mt-5 space-y-2 text-sm text-mist">
                  {group.tasks.slice(0, 3).map((task) => (
                    <li key={task.id} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#10B981]" />
                      {task.title}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <button type="button" onClick={() => setOpen(true)} className="btn-primary mt-8 h-12 px-6 text-sm">
          Open the {RITUAL_COUNT}-point ritual
        </button>
      </div>

      <ChecklistDrawer open={open} area={area} onArea={setArea} onClose={() => setOpen(false)} />
    </section>
  );
}

function ChecklistDrawer({
  open,
  area,
  onArea,
  onClose,
}: {
  open: boolean;
  area: AreaId;
  onArea: (id: AreaId) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [noted, setNoted] = useState<string[]>([]);
  const current = RITUAL.find((item) => item.id === area) ?? RITUAL[0];

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return current.tasks;
    return current.tasks.filter(
      (task) => task.title.toLowerCase().includes(needle) || task.detail.toLowerCase().includes(needle),
    );
  }, [current.tasks, query]);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex justify-end" role="dialog" aria-modal="true" aria-label="Sanctuary checklist">
          <motion.button
            type="button"
            aria-label="Close checklist"
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="glass relative flex h-full w-full max-w-xl flex-col overflow-hidden rounded-none md:m-3 md:h-[calc(100%-1.5rem)] md:rounded-[28px]"
            data-lenis-prevent
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-5">
              <div>
                <p className="kicker">Checklist</p>
                <h3 className="mt-2 font-display text-3xl tracking-[-0.04em]">
                  {RITUAL_COUNT} points. Zero left behind.
                </h3>
                <p className="mt-2 text-sm text-mist">{noted.length} details marked on this device.</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-line">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex gap-2 overflow-auto px-5 py-4">
              {RITUAL.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => onArea(group.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm ${
                    area === group.id ? "bg-[#10B981] text-[#042015]" : "border border-line text-mist"
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>

            <div className="px-5">
              <input
                className="field"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the ritual"
                aria-label="Search the ritual"
              />
            </div>

            <div className="mt-4 flex-1 space-y-2 overflow-auto px-5 pb-8" data-lenis-prevent>
              {visible.length === 0 && <p className="py-8 text-sm text-mist">Nothing in this room matches that.</p>}
              {visible.map((task) => {
                const isOpen = expanded === task.id;
                const marked = noted.includes(task.id);
                return (
                  <div key={task.id} className="rounded-2xl border border-line">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : task.id)}
                    >
                      <span className="text-sm">{task.title}</span>
                      <span className="text-mist">{isOpen ? "–" : "+"}</span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="px-4 pb-4">
                          <p className="text-sm leading-relaxed text-mist">{task.detail}</p>
                          <button
                            type="button"
                            className={`mt-3 rounded-full px-3 py-1.5 text-xs ${marked ? "bg-[#10B981] text-[#042015]" : "border border-line"}`}
                            onClick={() =>
                              setNoted((current) =>
                                current.includes(task.id) ? current.filter((id) => id !== task.id) : [...current, task.id],
                              )
                            }
                          >
                            {marked ? "Noted" : "Mark as reviewed"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
