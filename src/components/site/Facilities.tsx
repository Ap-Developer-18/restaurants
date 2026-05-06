import { motion } from "framer-motion";
import {
  Waves,
  BedDouble,
  Sparkles,
  Presentation,
  UtensilsCrossed,
  Car,
  Wifi,
  ConciergeBell,
} from "lucide-react";

const facilities = [
  { icon: Waves, label: "Rooftop Pool", sub: "Infinity views" },
  { icon: BedDouble, label: "Luxury Rooms", sub: "Premium suites" },
  { icon: Sparkles, label: "Wedding Hall", sub: "Grand ballroom" },
  { icon: Presentation, label: "Conferences", sub: "Modern tech" },
  { icon: UtensilsCrossed, label: "Restaurant", sub: "Fine dining" },
  { icon: Car, label: "Valet Parking", sub: "Secure space" },
  { icon: Wifi, label: "High-Speed WiFi", sub: "Stay connected" },
  { icon: ConciergeBell, label: "Room Service", sub: "24/7 Support" },
];

export function Facilities() {
  return (
    <section id="facilities" className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6 lg:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold uppercase text-xs mb-4"
          >
            World Class Facilities
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight">
            Thoughtful <span className="italic text-gold-soft">Amenities</span>, <br />
            Effortless Luxury
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {facilities.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative glass-card rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial from-gold/10 via-transparent to-transparent" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Icon Container */}
                <div className="mb-6 relative">
                  <div className="h-16 w-16 rounded-2xl bg-secondary rotate-3 group-hover:rotate-12 transition-transform duration-500 absolute inset-0" />
                  <div className="h-16 w-16 rounded-2xl bg-card border border-gold/20 flex items-center justify-center relative z-10 group-hover:border-gold/50 transition-colors shadow-luxe">
                    <f.icon className="h-7 w-7 text-gold group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                <div className="font-display text-lg text-cream mb-1">{f.label}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-gold/80 transition-colors">
                  {f.sub}
                </div>
              </div>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-transparent via-gold to-transparent group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
