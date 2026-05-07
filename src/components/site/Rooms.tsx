import { motion } from "framer-motion";
import {
  Wifi,
  Coffee,
  Bath,
  Tv,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import deluxe from "../../assets/resort/room-deluxe.png";
import luxury from "../../assets/resort/room-luxury.png";
import lobby from "../../assets/resort/lobby.png";
import { whatsappLink } from "../../lib/whatsapp";

const rooms = [
  {
    name: "Deluxe Room",
    desc: "Warm, intimate spaces with thoughtful design and modern comforts for a peaceful stay.",
    price: "3,499",
    img: deluxe,
    size: "320 sq.ft",
  },
  {
    name: "Executive Suite",
    desc: "Spacious suites featuring elegant furnishings and panoramic views of the lush greenery.",
    price: "5,999",
    img: luxury,
    size: "450 sq.ft",
  },
  {
    name: "Luxury Suite",
    desc: "Our signature residence — offering refined opulence and bespoke services for discerning guests.",
    price: "8,999",
    img: lobby,
    size: "680 sq.ft",
  },
];

const amenities = [
  { Icon: Wifi, label: "High-speed WiFi" },
  { Icon: Coffee, label: "Tea/Coffee" },
  { Icon: Bath, label: "Rain Shower" },
  { Icon: Tv, label: "Smart TV" },
];

export function Rooms() {
  return (
    <section
      id="rooms"
      className="py-24 md:py-32 px-6 bg-background relative overflow-hidden"
    >
      {/* Decorative background text or element */}
      <div className="absolute top-1/4 -right-20 pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[20rem] font-display text-gold leading-none">
          SUITES
        </h2>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold uppercase text-[10px] sm:text-xs tracking-[0.5em] font-medium mb-6"
          >
            Stay with Us
          </motion.p>
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
            Rooms Designed for <br />
            <span className="italic text-gold-soft drop-shadow-sm">
              Quiet Luxury
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.2, 1, 0.3, 1],
              }}
              className="group glass-card rounded-lg overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-700 flex flex-col"
            >
              {/* Image Container with Floating Badge */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={r.img}
                  alt={r.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />

                {/* Luxury Price Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-background/60 backdrop-blur-md rounded-full border border-white/10">
                  <div className="text-[10px] uppercase tracking-widest text-gold-soft font-bold">
                    From ₹{r.price}
                  </div>
                </div>

                {/* Bottom Left Detail */}
                <div className="absolute bottom-6 left-8 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-xs text-cream/80 tracking-widest uppercase">
                    {r.size}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 md:p-6 lg:p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl md:text-3xl text-cream mb-4 group-hover:text-gold-soft transition-colors">
                  {r.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                  {r.desc}
                </p>

                {/* Amenity Grid */}
                <div className="flex flex-wrap gap-5 mb-8">
                  {amenities.map(({ Icon, label }) => (
                    <div key={label} className="group/icon relative">
                      <Icon className="h-4 w-4 text-gold/60 group-hover/icon:text-gold transition-colors" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gold text-background text-[9px] px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold uppercase tracking-tighter">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappLink(
                    `Hello Tulips Resort, I'd like to check availability for the ${r.name}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="relative group/btn w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-secondary hover:bg-gold text-cream hover:text-background font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden"
                >
                  <MessageCircle className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">Reserve Suite</span>
                  <ArrowRight className="h-4 w-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
