"use client";

import { Estimator } from "@/components/Estimator";
import { scrollToTarget } from "@/components/SmoothScroll";
import { asset } from "@/lib/asset";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CHAPTERS = [
  {
    id: 1,
    badge: "01 / The Reset",
    title: "Your Living Space, Restored to Zero.",
    subtitle: "Hospital-grade clean. Zero harsh chemical residue.",
    pills: [] as string[],
  },
  {
    id: 2,
    badge: "02 / Botanical Purity",
    title: "Tough on Grime. Safe for Paws & Little Feet.",
    subtitle: "Plant chemistry, with the discipline of a hotel turn-down.",
    pills: ["100% Plant-Derived Solutions", "99.9% HEPA Allergen Removal", "Steam Extraction"],
  },
  {
    id: 3,
    badge: "03 / Hospitality Standards",
    title: "Trained Specialists. Insured Service. 5-Star Finish.",
    subtitle: "The quiet confidence of a suite that was just reset.",
    pills: ["Background-Verified Staff", "Zero Checklist Left Behind", "Same-Day Re-Clean Guarantee"],
  },
];

const MARKS = [
  { id: 1, label: "Reset", progress: 0.06 },
  { id: 2, label: "Purity", progress: 0.4 },
  { id: 3, label: "Standards", progress: 0.72 },
  { id: 4, label: "Book", progress: 0.94 },
];

function chapterFor(progress: number) {
  if (progress < 0.225) return 1;
  if (progress < 0.575) return 2;
  if (progress < 0.85) return 3;
  return 4;
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const writeProgress = (value: string) => {
    rootRef.current?.querySelectorAll("[data-progress]").forEach((node) => {
      node.textContent = value;
    });
  };
  const [chapter, setChapter] = useState(1);
  const [ready, setReady] = useState(false);
  const active = CHAPTERS.find((item) => item.id === chapter);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    let disposed = false;
    let revert: (() => void) | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const prime = () => {
      video.muted = true;
      const pending = video.play();
      pending?.then(() => video.pause()).catch(() => undefined);
    };

    if (video.readyState >= 2) prime();
    else video.addEventListener("loadeddata", prime, { once: true });

    const arm = async () => {
      const placeStill = () => {
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.pause();
          video.currentTime = Math.max(0, video.duration * 0.92);
        }
        setReady(true);
      };

      if (reduce) {
        if (video.readyState >= 1) placeStill();
        else video.addEventListener("loadedmetadata", placeStill, { once: true });
        return;
      }

      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const seek = (progress: number) => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;
        const next = Math.min(duration - 0.04, Math.max(0, duration * progress));
        if (Math.abs(video.currentTime - next) > 0.04) video.currentTime = next;
      };

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            root.style.setProperty("--p", self.progress.toFixed(4));
            writeProgress(String(Math.round(self.progress * 100)).padStart(2, "0"));
            seek(self.progress);
            const next = chapterFor(self.progress);
            setChapter((current) => (current === next ? current : next));
          },
        });
      }, root);
      revert = () => ctx.revert();

      const kick = () => {
        video.pause();
        ScrollTrigger.refresh();
        setReady(true);
      };
      if (video.readyState >= 1) kick();
      else video.addEventListener("loadedmetadata", kick, { once: true });
    };

    const fail = () => setReady(true);
    video.addEventListener("error", fail);
    void arm();

    return () => {
      disposed = true;
      video.removeEventListener("error", fail);
      revert?.();
    };
  }, []);

  function jump(progress: number) {
    const root = rootRef.current;
    if (!root) return;
    const travel = Math.max(0, root.offsetHeight - window.innerHeight);
    scrollToTarget(root.offsetTop + travel * progress);
  }

  return (
    <section ref={rootRef} id="reset" className="hero-pin relative h-[350vh]" style={{ ["--p" as string]: 0 }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0B0F17]">
        <video
          ref={videoRef}
          className="sticky top-0 h-screen w-full object-cover will-change-transform"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          src={asset("/videos/auraclean-sanctuary-banner.mp4")}
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,15,23,0.2)_50%,rgba(11,15,23,0.78)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/15 to-[#0B0F17]/70" />

        <div className="absolute right-5 top-28 z-20 hidden flex-col gap-4 md:flex">
          {MARKS.map((mark) => (
            <button
              key={mark.id}
              type="button"
              onClick={() => jump(mark.progress)}
              className="group flex items-center justify-end gap-3"
              aria-current={chapter === mark.id ? "true" : undefined}
            >
              <span
                className={`text-[11px] uppercase tracking-[0.22em] ${
                  chapter === mark.id ? "text-white" : "text-white/45"
                }`}
              >
                {mark.label}
              </span>
              <span className={`h-2 w-2 rounded-full ${chapter === mark.id ? "bg-[#10B981]" : "bg-white/35"}`} />
            </button>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-8 left-6 top-28 hidden w-px bg-white/15 md:block">
          <div className="h-full origin-top bg-[#10B981]" style={{ transform: "scaleY(var(--p))" }} />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col px-5 pb-6 pt-24 md:px-14 md:pb-8">
          <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/70 md:hidden">
            <span>AuraClean</span>
            <span>
              <span data-progress>00</span>%
            </span>
          </div>
          <div className="absolute right-14 top-28 hidden text-[11px] uppercase tracking-[0.28em] text-white/60 md:block">
            Scroll <span data-progress>00</span>
          </div>

          <div className="mt-auto max-w-4xl motion-reduce:hidden">
            <AnimatePresence mode="wait">
              {chapter < 4 && active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="kicker text-[#6ee7b7]">{active.badge}</p>
                  <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[0.98] tracking-[-0.05em] text-white">
                    {active.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/78">{active.subtitle}</p>
                  {active.pills.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {active.pills.map((pill) => (
                        <span
                          key={pill}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}
                  {chapter === 1 && (
                    <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/70">
                      <span className="scroll-line" />
                      Scroll the reset
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="estimator"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="max-h-[min(68vh,640px)] overflow-auto rounded-[28px]"
                  data-lenis-prevent
                >
                  <Estimator variant="overlay" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto hidden max-w-3xl motion-reduce:block">
            <p className="kicker text-[#6ee7b7]">01 / The Reset</p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-[-0.05em] text-white">
              Your Living Space, Restored to Zero.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/78">Hospital-grade clean. Zero harsh chemical residue.</p>
            <a href="#estimate" className="btn-primary mt-8 h-12 px-6">
              Book Your Clean in 60 Sec
            </a>
          </div>
        </div>

        {!ready && (
          <div className="absolute inset-0 z-30 flex items-end bg-[#0B0F17]/35 p-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/70">Preparing the sanctuary</p>
          </div>
        )}
      </div>
    </section>
  );
}
