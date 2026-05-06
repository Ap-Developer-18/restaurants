import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { whatsappLink } from "../../lib/whatsapp";
import { useState, useEffect } from "react";

export function WhatsAppFab() {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-reveal label after a few seconds to catch attention
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 4000);
    const hideTimer = setTimeout(() => setIsOpen(false), 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <motion.a
        href={whatsappLink("Hello Tulips Resort, I'd like to make an inquiry.")}
        target="_blank"
        rel="noreferrer"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="group relative flex items-center gap-3 bg-card/40 backdrop-blur-2xl border border-gold/20 p-2 rounded-full shadow-luxe hover:border-gold/50 transition-all duration-500"
      >
        {/* Expanding Label */}
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="overflow-hidden whitespace-nowrap pl-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft"
            >
              Concierge Online
            </motion.span>
          )}
        </AnimatePresence>

        {/* The Icon Button */}
        <div className="relative h-12 w-12 rounded-full grid place-items-center bg-linear-to-br from-gold to-gold-soft text-background shadow-gold group-hover:scale-110 transition-transform duration-500">
          <MessageCircle className="h-5 w-5" />

          {/* Subtle Sparkle animation */}
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-1 -right-1 text-white"
          >
            <Sparkles className="h-3 w-3" />
          </motion.div>

          {/* Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
        </div>
      </motion.a>

      {/* Decorative text below FAB (Optional) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mr-2 text-[8px] uppercase tracking-[0.4em] text-gold/40 pointer-events-none"
      >
        Inquiry
      </motion.div>
    </div>
  );
}
