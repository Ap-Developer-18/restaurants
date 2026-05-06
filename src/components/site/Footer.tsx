import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background text-cream pt-24 pb-12 px-6 relative overflow-hidden border-t border-gold/10">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_20px_var(--gold)]" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-gold to-gold-soft grid place-items-center font-display text-xl font-bold text-background shadow-gold">
              T
            </div>
            <div className="font-display text-2xl tracking-tight">
              Tulips <span className="italic text-gold-soft">Resort</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Hisar's premier hospitality destination. Experience signature
            weddings, luxury stays, and moments that last a lifetime.
          </p>
          <div className="flex gap-4">
            {[
              { icon: FaInstagram, link: "#" },
              { icon: FaFacebook, link: "#" },
              { icon: FaYoutube, link: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                className="h-10 w-10 grid place-items-center rounded-xl border border-gold/20 text-gold/80 hover:bg-gold hover:text-background hover:scale-110 transition-all duration-300"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.3em] text-gold mb-8">
            Navigation
          </h4>
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-4 text-sm text-muted-foreground">
            {[
              "About",
              "Rooms",
              "Weddings",
              "Facilities",
              "Gallery",
              "Contact",
            ].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="hover:text-gold transition-colors inline-block group"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-px w-0 bg-gold group-hover:w-4 transition-all duration-300" />
                    {l}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.3em] text-gold mb-8">
            Reservations
          </h4>
          <ul className="space-y-6 text-sm">
            <li className="flex gap-4 group">
              <MapPin className="h-5 w-5 text-gold shrink-0" />
              <span className="text-muted-foreground group-hover:text-cream transition-colors">
                Tosham Road, <br /> Hisar, Haryana - 125001
              </span>
            </li>
            <li className="flex gap-4 group">
              <Phone className="h-5 w-5 text-gold shrink-0" />
              <a
                href="tel:+919254600098"
                className="text-muted-foreground group-hover:text-gold transition-colors"
              >
                +91 92546 00098
              </a>
            </li>
            <li className="flex gap-4 group">
              <Mail className="h-5 w-5 text-gold shrink-0" />
              <a
                href="mailto:reservations@tulipsresort.com"
                className="text-muted-foreground group-hover:text-gold transition-colors break-all"
              >
                reservations@tulipsresort.com
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter/Back to Top */}
        <div className="flex flex-col justify-between items-start lg:items-end">
          <div className="w-full">
            <h4 className="font-display text-sm uppercase tracking-[0.3em] text-gold mb-8 lg:text-right">
              Newsletter
            </h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-card border border-gold/10 rounded-full px-6 py-3 text-xs focus:outline-hidden focus:border-gold/40 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gold text-xs font-bold uppercase tracking-wider p-2">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl mt-20 pt-8 border-t border-gold/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-widest text-muted-foreground/60">
        <div className="text-center md:text-left">
          © {new Date().getFullYear()} Tulips Resort. Managed with excellence.
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-gold transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gold transition-colors">
            Terms of Service
          </a>
        </div>
        <div className="flex items-center gap-2">
          Handcrafted by{" "}
          <span className="text-gold-soft font-bold">Aman Punia</span>
        </div>
      </div>
    </footer>
  );
}
