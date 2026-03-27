import logo from "@/assets/logo.svg";
import heroImage from "@/assets/hero-image.jpg";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onCtaClick: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="flex min-h-screen flex-col lg:flex-row">
      {/* Left column */}
      <div className="flex flex-1 flex-col items-center justify-center bg-dark px-6 py-16 text-center lg:items-start lg:px-16 lg:text-left xl:px-24">
        <img src={logo} alt="Aceleração Jurídica" className="mb-10 w-[180px] lg:w-[230px]" />
        <h1 className="mb-6 font-heading text-heading-mobile text-dark-foreground lg:text-heading-desktop">
          O recebimento correto de suas horas extras e verbas rescisórias com especialistas
        </h1>
        <p className="mb-8 max-w-lg font-body text-body-mobile text-dark-foreground/80 lg:text-body-desktop">
          Não deixe seus direitos trabalhistas serem ignorados. Conte com quem entende do assunto para garantir tudo o que é seu por lei.
        </p>
        <Button variant="cta" size="lg" onClick={onCtaClick} className="px-10 py-6">
          Fale com um especialista
        </Button>
      </div>

      {/* Right column — image (hidden on mobile) */}
      <div className="hidden flex-1 lg:block">
        <img
          src={heroImage}
          alt="Trabalhador revisando documentos"
          className="h-full w-full object-cover"
          width={960}
          height={1080}
        />
      </div>
    </section>
  );
}
