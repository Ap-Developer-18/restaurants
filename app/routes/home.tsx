import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Navbar } from "../../src/components/site/Navbar";
import { Hero } from "../../src/components/site/Hero";
import { BookingCard } from "../../src/components/site/BookingCard";
import { About } from "../../src/components/site/About";
import { Rooms } from "../../src/components/site/Rooms";
import { Weddings } from "../../src/components/site/Weddings";
import { Facilities } from "../../src/components/site/Facilities";
import { Gallery } from "../../src/components/site/Gallery";
import { Testimonials } from "../../src/components/site/Testimonials";
import { Location } from "../../src/components/site/Location";
import { Footer } from "../../src/components/site/Footer";
import { WhatsAppFab } from "../../src/components/site/WhatsAppFab";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <BookingCard />
        <About />
        <Rooms />
        <Weddings />
        <Facilities />
        <Gallery />
        <Testimonials />
        <Location />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
