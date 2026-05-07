"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoAlbum, {
  type RenderPhotoProps,
  type RenderPhotoContext,
  type Photo,
} from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "react-photo-album/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

import a from "../../assets/resort/exterior-night.png";
import b from "../../assets/resort/exterior-day.png";
import c from "../../assets/resort/exterior-front.png";
import d from "../../assets/resort/banquet-hall.png";
import e from "../../assets/resort/wedding-stage.png";
import f from "../../assets/resort/rooftop-pool.png";
import g from "../../assets/resort/room-luxury.png";
import h from "../../assets/resort/room-deluxe.png";
import i from "../../assets/resort/lobby.png";

/* ─── Types ─────────────────────────────────────────────── */
type Cat = "All" | "Rooms" | "Weddings" | "Pool" | "Banquets";

interface GalleryPhoto extends Photo {
  cat: Cat;
  title: string;
  description: string;
}

/* ─── Data ───────────────────────────────────────────────── */
const ALL_PHOTOS: GalleryPhoto[] = [
  {
    src: a,
    width: 1600,
    height: 1066,
    cat: "Banquets",
    title: "Resort by Night",
    description: "A magical view of the resort lit up under the stars.",
  },
  {
    src: g,
    width: 1600,
    height: 1066,
    cat: "Rooms",
    title: "Luxury Suite",
    description: "Indulge in our most opulent suite with panoramic views.",
  },
  {
    src: f,
    width: 1600,
    height: 1200,
    cat: "Pool",
    title: "Rooftop Pool",
    description: "Infinity pool overlooking the cityscape at dusk.",
  },
  {
    src: e,
    width: 1600,
    height: 1066,
    cat: "Weddings",
    title: "Grand Wedding Stage",
    description: "A stage crafted for your most cherished moments.",
  },
  {
    src: d,
    width: 1600,
    height: 1066,
    cat: "Banquets",
    title: "Pillarless Banquet Hall",
    description: "Unobstructed elegance for grand celebrations.",
  },
  {
    src: h,
    width: 1600,
    height: 1066,
    cat: "Rooms",
    title: "Deluxe Premium Room",
    description: "Refined comfort with bespoke interior detailing.",
  },
  {
    src: c,
    width: 1600,
    height: 1200,
    cat: "Banquets",
    title: "Royal Entrance",
    description: "First impressions that define the art of arrival.",
  },
  {
    src: b,
    width: 1600,
    height: 1066,
    cat: "Banquets",
    title: "Sunlit Exterior",
    description: "Golden hour draped across our timeless architecture.",
  },
  {
    src: i,
    width: 1600,
    height: 1066,
    cat: "Banquets",
    title: "Grand Lobby",
    description: "Where every journey into luxury begins.",
  },
];

const TABS: Cat[] = ["All", "Rooms", "Weddings", "Pool", "Banquets"];
const ITEMS_PER_PAGE = 6;
const MIN_PHOTOS_FOR_PAGINATION = 10;

/* ─── Gallery Component ──────────────────────────────────── */
export function Gallery() {
  const [activeTab, setActiveTab] = useState<Cat>("All");
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      activeTab === "All"
        ? ALL_PHOTOS
        : ALL_PHOTOS.filter((p) => p.cat === activeTab),
    [activeTab],
  );

  /* Pagination only when > 10 photos */
  const usePagination = filtered.length > MIN_PHOTOS_FOR_PAGINATION;
  const totalPages = usePagination
    ? Math.ceil(filtered.length / ITEMS_PER_PAGE)
    : 1;
  const visiblePhotos = usePagination
    ? filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    : filtered;

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  /* Lightbox slides — from full filtered set so prev/next works across pages */
  const slides = filtered.map((p) => ({
    src: p.src,
    width: p.width,
    height: p.height,
    title: p.title,
    description: p.description,
  }));

  const handlePhotoClick = ({ index }: { index: number }) => {
    const globalIdx = filtered.findIndex(
      (p) => p.src === visiblePhotos[index].src,
    );
    setLightboxIdx(globalIdx);
  };

  /* ── render.photo: (props, context) => ReactNode ───────── */
  const renderPhoto = (
    props: RenderPhotoProps,
    context: RenderPhotoContext<GalleryPhoto>,
  ) => {
    const { photo } = context;
    return (
      <div
        onClick={props.onClick}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
          cursor: "pointer",
          width: "100%",
          height: "100%",
        }}
        className="group"
      >
        <img
          src={photo.src}
          alt={photo.title ?? "Gallery image"}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
          className="group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(12,10,9,0.85) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        >
          <p className="text-gold-soft text-[9px] uppercase tracking-[0.3em] mb-1">
            {photo.cat}
          </p>
          <h4 className="text-stone-100 text-base font-serif leading-snug">
            {photo.title}
          </h4>
        </div>
      </div>
    );
  };

  return (
    <section
      id="gallery"
      className="pb-24 md:pb-32 px-6 min-h-screen bg-background"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold-soft uppercase text-[10px] tracking-[0.5em] mb-3"
          >
            Visual Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-6x text-stone-100 leading-tight"
          >
            Moments of{" "}
            <em className="not-italic text-gold-soft">Timeless Beauty</em>
          </motion.h2>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-5 py-2 rounded-full text-[11px] font-medium tracking-widest uppercase overflow-hidden transition-colors duration-300"
              style={{
                border: "1px solid",
                borderColor: activeTab === tab ? "#62ff00" : "#62ff0010",
                color: activeTab === tab ? "black" : "rgb(120 113 108)",
              }}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="pill"
                  className="absolute inset-0 bg-gold-soft"
                  style={{ borderRadius: "9999px" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + String(page)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.38 }}
          >
            <PhotoAlbum<GalleryPhoto>
              layout="masonry"
              photos={visiblePhotos}
              columns={(containerWidth) =>
                containerWidth < 640 ? 1 : containerWidth < 1024 ? 2 : 3
              }
              spacing={12}
              onClick={handlePhotoClick}
              render={{ photo: renderPhoto }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Pagination — only renders when photos > 10 */}
        {usePagination && (
          <div className="mt-14 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-3 rounded-full border border-amber-600/20 text-gold-soft disabled:opacity-20 disabled:cursor-not-allowed hover:bg-amber-500 hover:text-stone-950 transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  animate={{
                    width: page === idx + 1 ? 28 : 6,
                    opacity: page === idx + 1 ? 1 : 0.35,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="h-1.5 rounded-full bg-amber-400"
                  style={{ minWidth: 6 }}
                />
              ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-3 rounded-full border border-amber-600/20 text-gold-soft disabled:opacity-20 disabled:cursor-not-allowed hover:bg-amber-500 hover:text-stone-950 transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIdx >= 0}
        close={() => setLightboxIdx(-1)}
        index={lightboxIdx}
        slides={slides}
        plugins={[Zoom, Slideshow, Thumbnails, Captions]}
        zoom={{ maxZoomPixelRatio: 3 }}
        slideshow={{ delay: 4000 }}
        thumbnails={{ position: "bottom", width: 80, height: 50, gap: 8 }}
        captions={{ showToggle: true }}
        styles={{
          container: {
            backgroundColor: "rgba(12,10,9,0.96)",
            backdropFilter: "blur(20px)",
          },
          slide: { padding: "0 16px" },
          thumbnail: { borderRadius: 8 },
          thumbnailsTrack: { gap: 8 },
        }}
      />
    </section>
  );
}
