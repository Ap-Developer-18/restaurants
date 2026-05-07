import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Users,
  BedDouble,
  User,
  Phone,
  Send,
  Sparkles,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";
import { whatsappLink } from "../../lib/whatsapp";

/* ─── Counter Input ──────────────────────────────────────── */
function Counter({
  label,
  value,
  min = 0,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[9px] uppercase tracking-[0.2em] text-gold/60">
        {label}
      </span>
      <div className="flex items-center gap-2 bg-background/50 border border-gold/20 rounded-xl px-2 py-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-6 w-6 flex items-center justify-center rounded-lg text-gold/60 hover:text-gold hover:bg-gold/10 transition-all"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-5 text-center text-sm text-cream font-medium tabular-nums">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="h-6 w-6 flex items-center justify-center rounded-lg text-gold/60 hover:text-gold hover:bg-gold/10 transition-all"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

/* ─── Field Wrapper ──────────────────────────────────────── */
function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold/80 mb-3 font-bold">
        {icon} {label}
      </span>
      {children}
    </div>
  );
}

/* ─── Shared input class ─────────────────────────────────── */
const fieldBase =
  "w-full bg-background/50 border border-gold/20 rounded-2xl px-4 py-3.5 text-sm text-cream placeholder:text-muted-foreground/40 focus:outline-hidden focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-300";

/* ─── BookingCard ────────────────────────────────────────── */
export function BookingCard() {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    rooms: 1,
    name: "",
    phone: "",
  });

  const update = (k: string, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Tulips Resort,
I want to book:
Check-in: ${form.checkIn}
Check-out: ${form.checkOut}
Adults: ${form.adults}
Children: ${form.children}
Rooms: ${form.rooms}
Name: ${form.name}
Phone: ${form.phone}`;
    window.open(whatsappLink(msg), "_blank");
  };

  return (
    <section className="relative -mt-20 md:-mt-22 z-30 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl relative"
      >
        {/* Glow */}
        <div className="absolute -inset-1 bg-linear-to-r from-gold/20 via-gold/5 to-gold/20 blur-xl rounded-[2.5rem] opacity-50" />

        <form
          onSubmit={onSubmit}
          className="relative bg-card/80 backdrop-blur-3xl border border-white/10 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-luxe overflow-hidden"
        >
          {/* Decorative sparkle */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Sparkles className="h-32 w-32 text-gold" />
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-8 bg-gold rounded-full" />
                <span className="text-gold uppercase text-[10px] tracking-[0.4em] font-bold">
                  Reservations
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-cream">
                Check{" "}
                <span className="italic text-gold-soft">Availability</span>
              </h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full border border-gold/20 self-start sm:self-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                Best Price Guaranteed
              </span>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {/* Check-in */}
            <Field icon={<Calendar className="h-4 w-4" />} label="Check-in">
              <input
                required
                type="date"
                value={form.checkIn}
                onChange={(e) => update("checkIn", e.target.value)}
                className={`${fieldBase} [color-scheme:dark]`}
              />
            </Field>

            {/* Check-out */}
            <Field icon={<Calendar className="h-4 w-4" />} label="Check-out">
              <input
                required
                type="date"
                value={form.checkOut}
                onChange={(e) => update("checkOut", e.target.value)}
                className={`${fieldBase} [color-scheme:dark]`}
              />
            </Field>

            {/* Guests & Rooms — counter UI */}
            <Field icon={<Users className="h-4 w-4" />} label="Guests & Rooms">
              <div className="flex items-center justify-between gap-2 overflow-auto bg-background/50 border border-gold/20 rounded-2xl px-3 py-2.5 flex-1">
                <Counter
                  label="Adults"
                  value={form.adults}
                  min={1}
                  onChange={(v) => update("adults", v)}
                />
                <div className="w-px h-10 bg-gold/10" />
                <Counter
                  label="Children"
                  value={form.children}
                  min={0}
                  onChange={(v) => update("children", v)}
                />
                <div className="w-px h-10 bg-gold/10" />
                <Counter
                  label="Rooms"
                  value={form.rooms}
                  min={1}
                  onChange={(v) => update("rooms", v)}
                />
              </div>
            </Field>

            {/* Guest name */}
            <Field icon={<User className="h-4 w-4" />} label="Full Name">
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={fieldBase}
                placeholder="Your name"
              />
            </Field>

            {/* Phone — spans 3 cols on lg */}
            <div className="sm:col-span-2 lg:col-span-3">
              <Field icon={<Phone className="h-4 w-4" />} label="Phone Number">
                <input
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={fieldBase}
                  placeholder="e.g. +91 98765 43210"
                  type="tel"
                />
              </Field>
            </div>

            {/* Submit */}
            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="group w-full h-[54px] inline-flex items-center justify-center gap-3 px-6 rounded-2xl gradient-gold text-background font-bold shadow-gold hover:shadow-luxe hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <span className="uppercase tracking-widest text-xs">
                  Book Now
                </span>
                <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
