import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import lobby from "../../assets/resort/lobby.png";
import pool from "../../assets/resort/rooftop-pool.png";
import exterior from "../../assets/resort/exterior-day.png";
import wedding from "../../assets/resort/wedding-stage.png";

const stats = [
  { value: 4.5, suffix: " Acres", label: "Manicured Property" },
  { value: 24, suffix: "+", label: "Boutique Rooms" },
  { value: 1500, suffix: "+", label: "Grand Capacity" },
  { value: 10, suffix: "+ Yrs", label: "Legacy of Service" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      // Ease out cubic for a smoother finish
      const easeOut = 1 - Math.pow(1 - p, 3);
      setN(to * easeOut);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {Number.isInteger(to) ? Math.round(n) : n.toFixed(1)}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 bg-background overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-lg:flex max-lg:flex-col-reverse lg:grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Enhanced Image Masonry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.2, 1, 0.3, 1] }}
            className="grid grid-cols-12 gap-4 h-[500px] md:h-[650px] relative"
          >
            {/* Background Accent Glow */}
            <div className="absolute -inset-10 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="col-span-7 space-y-4">
              <div className="h-3/5 overflow-hidden rounded-lg lg:rounded-[2rem] border border-gold/10 group">
                <img
                  src={exterior}
                  alt="Resort exterior"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="h-2/5 overflow-hidden rounded-lg lg:rounded-[2rem] border border-gold/10 group">
                <img
                  src={pool}
                  alt="Rooftop pool"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>

            <div className="col-span-5 space-y-4 pt-16">
              <div className="h-2/5 overflow-hidden rounded-lg lg:rounded-[2rem] border border-gold/10 group">
                <img
                  src={lobby}
                  alt="Grand lobby"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="h-3/5 overflow-hidden rounded-lg lg:rounded-[2rem] border border-gold/10 group relative">
                <img
                  src={wedding}
                  alt="Wedding stage"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold/50" />
              <p className="text-gold uppercase text-[10px] md:text-xs tracking-[0.5em] font-medium">
                The Heritage
              </p>
            </div>

            <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight mb-8">
              A sanctuary of <br />
              <span className="italic text-gold-soft drop-shadow-sm">
                refined legacy
              </span>
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base max-w-lg">
              <p>
                Nestled in the heart of Hisar, Tulips Resort stands as a
                testament to architectural elegance and heartfelt hospitality.
                What began as a vision of luxury has evolved into Haryana's most
                coveted destination for discerning travelers.
              </p>
              <p>
                From our grand pillarless halls to our serene rooftop infinity
                views, every corner of our property is designed to provide a
                backdrop for life's most significant moments.
              </p>
            </div>

            {/* Premium Stats Grid */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="relative group"
                >
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl md:text-5xl text-gold-soft leading-none">
                      <Counter to={s.value} suffix="" />
                    </span>
                    <span className="text-gold text-lg md:text-2xl font-display">
                      {s.suffix}
                    </span>
                  </div>
                  <div className="h-px w-full bg-linear-to-r from-gold/30 to-transparent mt-3 mb-2" />
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-gold transition-colors">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
