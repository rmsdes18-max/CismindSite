import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { ProductsSection } from "./ProductsSection";
import { ServicesSection } from "./ServicesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { OrderForm } from "./OrderForm";
import { ServicesGrid } from "./ServicesGrid";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

export function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section id="hero"><HeroSection /></section>
      <section id="produse"><ProductsSection /></section>
      <section id="servicii"><ServicesSection /></section>
      <section id="cum-functioneaza"><HowItWorksSection /></section>
      <ServicesGrid />
      <section id="cerere-oferta"><OrderForm /></section>
      <Footer />
      <CookieBanner />
    </div>
  );
}