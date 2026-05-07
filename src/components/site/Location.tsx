import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { whatsappLink } from "../../lib/whatsapp";

export function Location() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 bg-background relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold uppercase text-[10px] sm:text-xs tracking-[0.5em] font-medium mb-6">
              Connect With Us
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
              Find Your Way to <br />
              <span className="italic text-gold-soft">Tulips Resort</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md text-sm md:text-base">
              A sanctuary of peace just a short drive from the heart of Hisar.
              We invite you to experience hospitality in its finest form.
            </p>

            <div className="mt-6 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactCard
                icon={<MapPin className="h-5 w-5" />}
                title="Our Address"
                body="Tosham Road, Hisar, Haryana"
                link="https://maps.google.com/?q=Tulips+Resort+Hisar"
              />
              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                title="Call Us"
                body="+91 92546 00098"
                link="tel:+919254600098"
              />
              <ContactCard
                icon={<Mail className="h-5 w-5" />}
                title="Email Support"
                body="reservations@tulips.com"
                link="mailto:reservations@tulipsresort.com"
              />
              <ContactCard
                icon={<MessageCircle className="h-5 w-5" />}
                title="WhatsApp"
                body="Chat with Concierge"
                link={whatsappLink(
                  "Hello Tulips Resort, I'd like more information.",
                )}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group h-full"
          >
            {/* The "Frame" effect */}
            <div className="absolute -inset-1 bg-linear-to-tr from-gold/40 via-transparent to-gold/20 rounded-[2.5rem] blur-sm opacity-50 group-hover:opacity-100 transition duration-1000" />

            <div className="relative h-full rounded-lg lg:rounded-4xl overflow-hidden shadow-luxe border border-gold/10 max-md:h-100">
              <iframe
                title="Tulips Resort location"
                src="https://www.google.com/maps?q=Tosham+Road+Hisar+Haryana&output=embed"
                className="w-full h-full grayscale-30 contrast-[1.1] invert-[0.9] hue-rotate-180"
                loading="lazy"
              />
              <div className="absolute bottom-6 right-6">
                <a
                  href="https://maps.google.com/?q=Tulips+Resort+Hisar"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gold text-background rounded-full font-bold text-xs uppercase tracking-widest shadow-gold hover:scale-105 transition-transform"
                >
                  Get Directions <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  body,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="glass-card p-6 rounded-lg lg:rounded-3xl border border-gold/5 hover:border-gold/30 transition-all duration-500 group"
    >
      <div className="h-10 w-10 grid place-items-center rounded-xl bg-gold/10 text-gold mb-4 group-hover:bg-gold group-hover:text-background transition-all duration-500">
        {icon}
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
        {title}
      </div>
      <div className="text-cream font-display text-sm group-hover:text-gold transition-colors">
        {body}
      </div>
    </a>
  );
}
