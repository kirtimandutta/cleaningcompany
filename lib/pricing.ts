export const SERVICES = [
  { id: "deep", label: "Deep Cleaning" },
  { id: "move", label: "Move-In / Move-Out" },
  { id: "reno", label: "Post-Renovation" },
  { id: "recurring", label: "Recurring Sanctuary Reset" },
] as const;

export const ROOMS = [
  { id: "1bhk", label: "1 BHK / Studio" },
  { id: "2bhk", label: "2 BHK" },
  { id: "3bhk", label: "3 BHK" },
  { id: "4bhk", label: "4+ BHK / Villa" },
] as const;

export const ADDONS = [
  { id: "sofa", label: "Sofa Shampooing", price: 799 },
  { id: "cabinets", label: "Interior Kitchen Cabinets", price: 649 },
  { id: "balcony", label: "Balcony Jet Washing", price: 549 },
  { id: "fridge", label: "Refrigerator Deep Clean", price: 399 },
] as const;

export const FREQUENCIES = [
  { id: "weekly", label: "Weekly", save: 0.2, note: "Save 20%" },
  { id: "biweekly", label: "Bi-Weekly", save: 0.15, note: "Save 15%" },
  { id: "monthly", label: "Monthly", save: 0.1, note: "Save 10%" },
  { id: "once", label: "One-Time", save: 0, note: "Single visit" },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];
export type RoomId = (typeof ROOMS)[number]["id"];
export type AddonId = (typeof ADDONS)[number]["id"];
export type FrequencyId = (typeof FREQUENCIES)[number]["id"];

const BASE: Record<ServiceId, Record<RoomId, number>> = {
  deep: { "1bhk": 2499, "2bhk": 4299, "3bhk": 6499, "4bhk": 9499 },
  move: { "1bhk": 3499, "2bhk": 5999, "3bhk": 8999, "4bhk": 12999 },
  reno: { "1bhk": 4499, "2bhk": 7499, "3bhk": 10999, "4bhk": 15999 },
  recurring: { "1bhk": 1999, "2bhk": 3499, "3bhk": 5299, "4bhk": 7999 },
};

export type QuoteInput = {
  service: ServiceId;
  room: RoomId;
  addons: AddonId[];
  frequency: FrequencyId;
};

export type Quote = {
  base: number;
  addonTotal: number;
  subtotal: number;
  savings: number;
  total: number;
  service: (typeof SERVICES)[number];
  room: (typeof ROOMS)[number];
  frequency: (typeof FREQUENCIES)[number];
  addons: (typeof ADDONS)[number][];
};

export function calculateQuote(input: QuoteInput): Quote {
  const service = SERVICES.find((item) => item.id === input.service) ?? SERVICES[0];
  const room = ROOMS.find((item) => item.id === input.room) ?? ROOMS[0];
  const frequency = FREQUENCIES.find((item) => item.id === input.frequency) ?? FREQUENCIES[3];
  const addons = ADDONS.filter((item) => input.addons.includes(item.id));
  const base = BASE[service.id][room.id];
  const addonTotal = addons.reduce((sum, item) => sum + item.price, 0);
  const subtotal = base + addonTotal;
  const savings = Math.round(subtotal * frequency.save);
  return {
    base,
    addonTotal,
    subtotal,
    savings,
    total: subtotal - savings,
    service,
    room,
    frequency,
    addons,
  };
}

export function formatInr(value: number) {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
}
