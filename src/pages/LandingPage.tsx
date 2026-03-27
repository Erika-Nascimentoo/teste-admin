import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProductSection } from "@/components/ProductSection";
import { PainSection } from "@/components/PainSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { ContactPopup } from "@/components/ContactPopup";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function LandingPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = () => setPopupOpen(true);

  return (
    <>
      <HeroSection onCtaClick={openPopup} />
      <AboutSection onCtaClick={openPopup} />
      <PainSection />
      <ProductSection onCtaClick={openPopup} />
      <ServicesSection onCtaClick={openPopup} />
      <FaqSection />
      <Footer />
      <FloatingWhatsApp onClick={openPopup} />
      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
