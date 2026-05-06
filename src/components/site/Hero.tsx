import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import heroImg from "../../assets/resort/exterior-night.png";
import { useRef } from "react";
import { whatsappLink } from "../../lib/whatsapp";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax and fade effects for that cinematic feel
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-screen min-h-[750px] w-full overflow-hidden bg-background"
    >
      {/* Background with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.2, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: [0.2, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <img
            src={heroImg}
            alt="Tulips Resort Hisar luxury exterior"
            className="h-full w-full object-cover brightness-[0.7] contrast-[1.1]"
          />
        </motion.div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-transparent to-background" />
        <div className="absolute inset-0 bg-radial from-transparent via-background/40 to-background/90" />
      </motion.div>

      {/* Floating Elements / Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-gold/50" />
          <span className="text-gold uppercase text-[10px] md:text-xs tracking-[0.6em] font-medium">
            The Pinnacle of Luxury in Hisar
          </span>
          <div className="h-px w-8 bg-gold/50" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.2, 1, 0.3, 1] }}
            className="font-display text-cream text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter"
          >
            Where Grandeur{" "}
            <span className="sm:hidden text-gold"> Meets Grace </span>
            <br className="max-sm:hidden" />
            <span className="italic max-sm:hidden text-gold-soft drop-shadow-2xl">
              Meets Grace
            </span>
          </motion.h1>

          {/* Subtle floating sparkle icon */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 text-gold hidden md:block"
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-2 sm:mt-10 max-w-xl text-muted-foreground text-sm md:text-lg leading-relaxed font-light tracking-wide"
        >
          Discover a sanctuary of refined hospitality, bespoke weddings, and
          luxury stays designed for the most discerning guests.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 items-center"
        >
          <a
            href={whatsappLink(
              "Hello Tulips Resort, I'd like to plan an event or book a stay.",
            )}
            target="_blank"
            rel="noreferrer"
            className="group relative px-10 py-5 rounded-full gradient-gold text-background font-bold shadow-gold hover:shadow-luxe transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 uppercase tracking-widest text-xs">
              Reserve Experience
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <a
            href="#rooms"
            className="group flex items-center gap-3 text-cream/70 hover:text-gold transition-colors duration-300"
          >
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold">
              Explore Suites
            </span>
            <div className="h-10 w-10 rounded-full border border-gold/20 grid place-items-center group-hover:border-gold group-hover:bg-gold/5 transition-all">
              <ArrowRight className="h-4 w-4" />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Elegant Bottom Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      >
        <div className="h-12 w-px bg-linear-to-b from-gold/50 to-transparent" />
        <span className="text-[9px] text-gold/40 uppercase tracking-[0.5em] vertical-text">
          Scroll
        </span>
      </motion.div>

      {/* Side Social Handles (Premium Touch) */}
      <div className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-8 items-center text-gold/30">
        <div className="h-20 w-px bg-gold/20" />
        <span className="rotate-90 text-[10px] tracking-[0.3em] uppercase origin-left ml-1">
          Follow Us
        </span>
      </div>
    </section>
  );
}
