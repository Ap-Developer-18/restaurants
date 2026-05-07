import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const slideVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50,
      scale: 0.95,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -50 : 50,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + reviews.length) % reviews.length);
  };

  return (
    <section
      id="testimonials"
      className="pt-24 md:pt-32 px-6 relative overflow-hidden bg-background"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center mb-6 lg:mb-16">
          <motion.p className="text-gold uppercase text-[10px] tracking-[0.5em] font-medium mb-4">
            Guest Stories
          </motion.p>
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
            Trusted by <span className="italic text-gold-soft">Thousands</span>
          </h2>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Main Stage */}
          <div className="relative w-full min-h-[400px] md:min-h-[350px] flex items-center justify-center">
            {/* Large Quote Mark Decoration */}
            <Quote className="absolute top-0 left-0 h-20 w-20 text-gold/5 -translate-x-6 -translate-y-6 md:-translate-x-12 rotate-12" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full text-center z-10"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>

                <blockquote className="font-display text-2xl md:text-4xl text-cream leading-[1.4] italic mb-10 px-4 md:px-16">
                  "{reviews[index].text}"
                </blockquote>

                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold blur-md opacity-20 rounded-full" />
                    <img
                      src={reviews[index].img}
                      alt={reviews[index].name}
                      className="relative h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-gold/40 shadow-gold p-0.5"
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

          <div className="flex gap-3 mt-6">
            {reviews.map((_, k) => (
              <button
                key={k}
                onClick={() => {
                  setDirection(k > index ? 1 : -1);
                  setIndex(k);
                }}
                className={`h-1 rounded-full transition-all duration-500 ${
                  k === index ? "w-10 bg-gold" : "w-3 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
