"use client";

import { MotionConfig } from "framer-motion";
import { useLayoutEffect } from "react";

let active: import("lenis").default | null = null;

export function getLenis() {
  return active;
}

export function scrollToTarget(target: number | string | HTMLElement) {
  const lenis = active;
  if (lenis) {
    lenis.scrollTo(target, {
      offset: typeof target === "number" ? 0 : -8,
      duration: 1.1,
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  const node = typeof target === "string" ? document.querySelector(target) : target;
  node?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const Lenis = (await import("lenis")).default;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        duration: 1.08,
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.05,
        allowNestedScroll: true,
        anchors: { offset: -8 },
      });
      active = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      requestAnimationFrame(refresh);

      cleanup = () => {
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
        if (active === lenis) active = null;
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
