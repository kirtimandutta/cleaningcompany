"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ButtonHTMLAttributes } from "react";

export function MagneticButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const bounds = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });
  const full = className?.includes("w-full");

  return (
    <div
      ref={bounds}
      className={full ? "flex w-full" : "inline-flex"}
      onMouseMove={(event) => {
        const rect = bounds.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - rect.left - rect.width / 2) * 0.22);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ x: springX, y: springY }} className={full ? "w-full" : "inline-flex"}>
        <button className={className} type="button" {...props}>
          {children}
        </button>
      </motion.div>
    </div>
  );
}
