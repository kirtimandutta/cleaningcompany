"use client";

import {
  calculateQuote,
  type AddonId,
  type FrequencyId,
  type Quote,
  type RoomId,
  type ServiceId,
} from "@/lib/pricing";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type QuoteContextValue = {
  service: ServiceId;
  setService: (id: ServiceId) => void;
  room: RoomId;
  setRoom: (id: RoomId) => void;
  addons: AddonId[];
  toggleAddon: (id: AddonId) => void;
  frequency: FrequencyId;
  setFrequency: (id: FrequencyId) => void;
  quote: Quote;
  bookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [service, setService] = useState<ServiceId>("deep");
  const [room, setRoom] = useState<RoomId>("1bhk");
  const [addons, setAddons] = useState<AddonId[]>([]);
  const [frequency, setFrequency] = useState<FrequencyId>("once");
  const [bookingOpen, setBookingOpen] = useState(false);

  const toggleAddon = useCallback((id: AddonId) => {
    setAddons((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }, []);

  const quote = useMemo(
    () => calculateQuote({ service, room, addons, frequency }),
    [service, room, addons, frequency],
  );

  const value = useMemo<QuoteContextValue>(
    () => ({
      service,
      setService,
      room,
      setRoom,
      addons,
      toggleAddon,
      frequency,
      setFrequency,
      quote,
      bookingOpen,
      openBooking: () => setBookingOpen(true),
      closeBooking: () => setBookingOpen(false),
    }),
    [service, room, addons, toggleAddon, frequency, quote, bookingOpen],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used within QuoteProvider");
  return context;
}
