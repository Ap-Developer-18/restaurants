import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { whatsappLink } from "../../lib/whatsapp";

const links = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Weddings", href: "#weddings" },
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <span className="text-cream font-display text-xl tracking-wide">
              Tulips <span className="text-gradient-gold">Resort</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-cream/85 text-sm tracking-wide uppercase hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919254600098"
              className="flex items-center gap-2 text-cream/85 text-sm hover:text-gold"
            >
              <Phone className="h-4 w-4" /> +91 92546 00098
            </a>
            <a
              href={whatsappLink(
                "Hello Tulips Resort, I want to book a room/event.",
              )}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-gold-soft gradient-gold text-black text-sm font-semibold shadow-gold hover:scale-[1.03] transition-transform"
            >
              Book Now
            </a>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-cream p-2"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden glass-dark mt-3 bg-black/10 backdrop-blur-2xl mx-6 rounded-lg p-6 flex flex-col gap-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-cream/90 uppercase text-sm tracking-wide"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink(
                "Hello Tulips Resort, I want to book a room/event.",
              )}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full gradient-gold text-cocoa text-center font-semibold"
            >
              Book on WhatsApp
            </a>
          </motion.div>
        )}
      </motion.header>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] gradient-gold z-[60] origin-left"
      />
    </>
  );
}
