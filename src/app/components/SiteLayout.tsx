import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { ProductsSection } from "./ProductsSection";
import { ColorDivider, ServicesSection } from "./ServicesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { OrderForm } from "./OrderForm";

function PerforatedDivider({ topColor, bottomColor }: { topColor: string; bottomColor: string }) {
  return null;
}

export function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <PerforatedDivider topColor="#f2e8de" bottomColor="#f7f4fb" />
      <ProductsSection />
      <PerforatedDivider topColor="#f7f4fb" bottomColor="#f2e8de" />
      <ColorDivider />
      <ServicesSection />
      <ColorDivider />
      <HowItWorksSection />
      <OrderForm />
    </div>
  );
}