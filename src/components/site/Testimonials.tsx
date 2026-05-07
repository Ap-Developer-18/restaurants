import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Aanya Sharma",
    role: "Bride",
    text: "Our dream wedding came alive at Tulips. Every detail felt curated and elegant — guests still talk about it.",
    img: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Rohan Mehta",
    role: "Corporate Guest",
    text: "Spotless rooms, attentive service and a genuinely premium feel. The best stay I've had in Hisar.",
    img: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Priya Kapoor",
    role: "Event Planner",
    text: "The banquet hall and team are top-tier. They made a 1000-guest event look effortless.",
    img: "https://i.pravatar.cc/120?img=32",
  },
  {
    name: "Vikram Singh",
    role: "Family Stay",
    text: "Beautiful rooftop pool, lovely restaurant, peaceful greenery. Felt like a true getaway.",
    img: "https://i.pravatar.cc/120?img=15",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => paginate(1), 6000);
    return () => clearInterval(t);
  }, [paused, paginate]);

  return (
    <section
      id="testimonials"
      className="pt-24 md:pt-32 px-6 relative overflow-hidden bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold uppercase text-[10px] tracking-[0.5em] font-medium mb-4"
          >
            Guest Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-cream leading-tight"
          >
            Trusted by <span className="italic text-gold-soft">Thousands</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="relative flex flex-col items-center">
          {/* Decorative quote */}
          <Quote className="absolute top-0 left-0 h-20 w-20 text-gold/5 -translate-x-6 -translate-y-6 md:-translate-x-12 rotate-12 pointer-events-none" />

          {/* Slide stage */}
          <div className="relative w-full min-h-95 md:min-h-80 flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-full text-center px-2"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-7">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-xl sm:text-2xl md:text-4xl text-cream leading-[1.45] italic mb-10 px-4 md:px-20">
                  &ldquo;{reviews[index].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold blur-md opacity-20 rounded-full" />
                    <img
                      src={reviews[index].img}
                      alt={reviews[index].name}
                      className="relative h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-gold/40 p-0.5"
                    />
                  </div>
                  <div>
                    <h4 className="text-gold-soft font-display text-xl tracking-wide">
                      {reviews[index].name}
                    </h4>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mt-1">
                      {reviews[index].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-6 mt-12">
            {/* Prev */}
            <button
              onClick={() => paginate(-1)}
              className="p-2.5 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-background transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2.5 items-center">
              {reviews.map((_, k) => (
                <button
                  key={k}
                  onClick={() => {
                    setDirection(k > index ? 1 : -1);
                    setIndex(k);
                  }}
                  aria-label={`Go to review ${k + 1}`}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: k === index ? 28 : 6,
                    backgroundColor:
                      k === index
                        ? "var(--color-gold, #b8953a)"
                        : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => paginate(1)}
              className="p-2.5 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-background transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Auto-play progress bar */}
          {!paused && (
            <div className="mt-6 w-32 h-px bg-gold/10 overflow-hidden rounded-full">
              <motion.div
                key={index}
                className="h-full bg-gold/40 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
