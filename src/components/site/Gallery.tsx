import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import a from "../../assets/resort/exterior-night.png";
import b from "../../assets/resort/exterior-day.png";
import c from "../../assets/resort/exterior-front.png";
import d from "../../assets/resort/banquet-hall.png";
import e from "../../assets/resort/wedding-stage.png";
import f from "../../assets/resort/rooftop-pool.png";
import g from "../../assets/resort/room-luxury.png";
import h from "../../assets/resort/room-deluxe.png";
import i from "../../assets/resort/lobby.png";

type Cat = "All" | "Rooms" | "Weddings" | "Pool" | "Banquets";
const items: { src: string; cat: Cat; label: string }[] = [
  { src: a, cat: "Banquets", label: "Resort by Night" },
  { src: g, cat: "Rooms", label: "Luxury Suite" },
  { src: f, cat: "Pool", label: "Rooftop Pool" },
  { src: e, cat: "Weddings", label: "Grand Wedding Stage" },
  { src: d, cat: "Banquets", label: "Pillarless Banquet Hall" },
  { src: h, cat: "Rooms", label: "Deluxe Premium Room" },
  { src: c, cat: "Banquets", label: "Royal Entrance" },
  { src: b, cat: "Banquets", label: "Sunlit Exterior" },
  { src: i, cat: "Banquets", label: "Grand Lobby" },
];

const tabs: Cat[] = ["All", "Rooms", "Weddings", "Pool", "Banquets"];

export function Gallery() {
  const [tab, setTab] = useState<Cat>("All");
  const [open, setOpen] = useState<{ src: string; label: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    return tab === "All" ? items : items.filter((x) => x.cat === tab);
  }, [tab]);

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [tab]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-6 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold uppercase text-[10px] tracking-[0.5em] mb-4"
          >
            Visual Journey
          </motion.p>
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
            Moments of{" "}
            <span className="italic text-gold-soft">Timeless Beauty</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-6 py-2.5 rounded-full text-xs overflow-hidden font-medium tracking-widest transition-all duration-500 uppercase border ov ${
                tab === t
                  ? "text-background border-gold"
                  : "text-muted-foreground border-gold/20"
              }`}
            >
              {tab === t && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 gradient-gold z-0"
                />
              )}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:auto-rows-[300px]">
          <LayoutGroup>
            <AnimatePresence mode="popLayout">
              {currentItems.map((it, idx) => (
                <motion.div
                  key={it.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative overflow-hidden rounded-lg lg:rounded-[2rem] cursor-pointer shadow-luxe
                    ${(idx === 0 || idx === 4) && filtered.length > 3 ? "lg:row-span-2" : ""} 
                    ${idx === 3 && filtered.length > 3 ? "lg:col-span-2" : ""}
                  `}
                  onClick={() => setOpen(it)}
                >
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-gold text-[10px] uppercase tracking-[0.3em] mb-2">
                      {it.cat}
                    </p>
                    <h4 className="text-cream font-display text-xl">
                      {it.label}
                    </h4>
                  </div>
                  <motion.img
                    src={it.src}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </div>

        {/* Pagination UI - Only shows if more than 1 page */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-3 rounded-full border border-gold/20 text-gold disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gold hover:text-background transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentPage === i + 1 ? "w-8 bg-gold" : "w-2 bg-gold/20"
                  }`}
                />
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-3 rounded-full border border-gold/20 text-gold disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gold hover:text-background transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox remains same as your previous code */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl grid place-items-center p-4"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-6 right-6 z-[110] p-4 bg-gold text-background rounded-full"
            >
              <X />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={open.src}
              className="max-h-[70vh] rounded-3xl shadow-2xl"
            />
            <div className="text-center mt-4">
              <h3 className="text-cream font-display text-2xl">{open.label}</h3>
            </div>
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setOpen(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
