"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Leaf, ShieldCheck, TimerReset } from "lucide-react";

const ITEMS = [
  {
    icon: BadgeCheck,
    stat: "Verified",
    title: "Background-checked professionals",
    body: "Identity, address, and court-record verification before a specialist enters a home.",
  },
  {
    icon: ShieldCheck,
    stat: "₹10 Lakh",
    title: "Property damage insurance cover",
    body: "Every visit carries ₹10 Lakh of property damage cover, so the house is protected while we work.",
  },
  {
    icon: Leaf,
    stat: "Botanical",
    title: "Eco-certified detergents",
    body: "Plant-derived enzymes and eco-certified detergents. No harsh residue on paws or little feet.",
  },
  {
    icon: TimerReset,
    stat: "24 hours",
    title: "Happiness guarantee",
    body: "If a detail was missed, tell us within 24 hours and we return. Same-day when the calendar allows.",
  },
];

export function TrustMatrix() {
  return (
    <section id="trust" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Assurance</p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,4vw,3.7rem)] leading-[1.02] tracking-[-0.045em]">
          The house is insured. The chemistry is botanical. The specialists are verified.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="glass rounded-[28px] p-6 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#10B981]" />
                  <span className="font-display text-sm tracking-[0.18em] text-[#10B981] uppercase">{item.stat}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-mist">{item.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
