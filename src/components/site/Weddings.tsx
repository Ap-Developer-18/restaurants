import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Heart,
  Building2,
  Cake,
  Waves,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import wedding from "../../assets/resort/wedding-stage.png";
import { whatsappLink } from "../../lib/whatsapp";

const events = [
  {
    icon: Heart,
    title: "Destination Weddings",
    desc: "Bespoke celebrations with cinematic décor and world-class hospitality.",
  },
  {
    icon: Building2,
    title: "Banquet Halls",
    desc: "Grand pillarless halls accommodating up to 1500 guests.",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    desc: "Sophisticated settings for conferences, off-sites and launches.",
  },
  {
    icon: Cake,
    title: "Birthday & Private",
    desc: "Intimate gatherings curated to your personal style.",
  },
  {
    icon: Waves,
    title: "Poolside Parties",
    desc: "Stunning rooftop pool evenings under the golden stars.",
  },
];

export function Weddings() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3],
  );

  return (
    <section
      id="weddings"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* Parallax Background with Vignette */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src={wedding}
          alt="Wedding mandap"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-background/60" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold uppercase text-[10px] sm:text-xs tracking-[0.5em] font-medium mb-6"
          >
            Exquisite Spaces
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl text-cream leading-tight"
          >
            Where Every Celebration <br />
            <span className="italic text-gold-soft drop-shadow-sm">
              Becomes a Legacy
            </span>
          </motion.h2>
        </div>

        {/* Event Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass-card group relative overflow-hidden rounded-lg lg:rounded-3xl p-8 hover:border-gold/40 transition-all duration-500"
            >
              {/* Subtle radial glow on hover */}
              <div className="absolute inset-0 bg-radial from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-background transition-all duration-500">
                  <e.icon className="h-6 w-6" />
                </div>

                <h3 className="font-display text-xl text-cream mb-3 group-hover:text-gold transition-colors">
                  {e.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {e.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center mt-20"
        >
          <a
            href={whatsappLink(
              "Hello Tulips Resort, I'd like to plan an event with you.",
            )}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full gradient-gold font-bold shadow-gold hover:shadow-luxe transition-all duration-300"
          >
            <span className="uppercase tracking-wider text-sm">
              Plan Your Event
            </span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-6 text-muted-foreground text-xs uppercase tracking-widest">
            Personalized Tours Available Daily
          </p>
        </motion.div>
      </div>
    </section>
  );
}
