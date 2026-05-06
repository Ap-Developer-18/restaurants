import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  Users,
  BedDouble,
  User,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { whatsappLink } from "../../lib/whatsapp";

export function BookingCard() {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",
    rooms: "1",
    name: "",
    phone: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

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

  // Ultra-refined field styling
  const fieldBase =
    "w-full bg-background/50 border border-gold/20 rounded-2xl px-4 py-3.5 text-sm text-cream placeholder:text-muted-foreground/40 focus:outline-hidden focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-300";

  return (
    <section className="relative -mt-20 md:-mt-22 z-30 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl relative"
      >
        {/* Animated Background Glow */}
        <div className="absolute -inset-1 bg-linear-to-r from-gold/20 via-gold/5 to-gold/20 blur-xl rounded-[2.5rem] opacity-50" />

        <form
          onSubmit={onSubmit}
          className="relative bg-card/80 backdrop-blur-3xl border border-white/10 rounded-lg sm:rounded-[2.5rem] p-4 sm:p-8 md:p-10 shadow-luxe overflow-hidden"
        >
          {/* Subtle internal pattern */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="h-32 w-32 text-gold" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-8 bg-gold rounded-full" />
                <span className="text-gold uppercase text-[10px] tracking-[0.4em] font-bold">
                  Reservations
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-cream">
                Check{" "}
                <span className="italic text-gold-soft">Availability</span>
              </h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full border border-gold/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                Best Price Guaranteed
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 relative z-10">
            <Field icon={<Calendar className="h-4 w-4" />} label="Check-in">
              <input
                required
                type="date"
                value={form.checkIn}
                onChange={(e) => update("checkIn", e.target.value)}
                className={`${fieldBase} color-scheme-dark`}
              />
            </Field>

            <Field icon={<Calendar className="h-4 w-4" />} label="Check-out">
              <input
                required
                type="date"
                value={form.checkOut}
                onChange={(e) => update("checkOut", e.target.value)}
                className={`${fieldBase} color-scheme-dark`}
              />
            </Field>

            <Field icon={<Users className="h-4 w-4" />} label="Guests & Rooms">
              <div className="grid grid-cols-3 gap-2">
                <div className="relative group">
                  <input
                    type="number"
                    min={1}
                    value={form.adults}
                    onChange={(e) => update("adults", e.target.value)}
                    className={`${fieldBase} text-center px-2`}
                  />
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] bg-card px-1 text-gold/60 uppercase">
                    Adult
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    value={form.children}
                    onChange={(e) => update("children", e.target.value)}
                    className={`${fieldBase} text-center px-2`}
                  />
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] bg-card px-1 text-gold/60 uppercase">
                    Child
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    value={form.rooms}
                    onChange={(e) => update("rooms", e.target.value)}
                    className={`${fieldBase} text-center px-2`}
                  />
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] bg-card px-1 text-gold/60 uppercase">
                    Room
                  </span>
                </div>
              </div>
            </Field>

            <Field icon={<User className="h-4 w-4" />} label="Guest Details">
              <div className="space-y-3">
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={fieldBase}
                  placeholder="Full Name"
                />
              </div>
            </Field>

            <div className="lg:col-span-3">
              <Field icon={<Phone className="h-4 w-4" />} label="Phone Number">
                <input
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={fieldBase}
                  placeholder="e.g. +91 98765 43210"
                />
              </Field>
            </div>

            <div className="lg:col-span-1 flex items-end">
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
