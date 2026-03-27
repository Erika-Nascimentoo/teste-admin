import workerImage from "@/assets/worker-image.jpg";
import { Button } from "@/components/ui/button";

interface ProductSectionProps {
  onCtaClick: () => void;
}

export function ProductSection({ onCtaClick }: ProductSectionProps) {
  return (
    <section className="flex flex-col lg:flex-row" id="servico">
      {/* Left column — text */}
      <div className="flex flex-1 flex-col justify-center bg-secondary px-6 py-16 lg:w-[58%] lg:px-16 xl:px-24">
        <span className="mb-3 font-body text-subtitle uppercase tracking-widest text-primary">
          Nosso Serviço
        </span>
        <h2 className="mb-6 font-heading text-heading-mobile text-foreground lg:text-heading-desktop">
          O que é o recebimento correto de horas extras?
        </h2>
        <p className="mb-4 font-body text-body-mobile text-foreground/80 lg:text-body-desktop">
          Muitos trabalhadores realizam horas extras diariamente sem receber a remuneração adequada. A legislação brasileira garante que toda hora trabalhada além da jornada contratual deve ser paga com acréscimo mínimo de 50%.
        </p>
        <p className="mb-4 font-body text-body-mobile text-foreground/80 lg:text-body-desktop">
          Além disso, ao ser desligado, o trabalhador tem direito a receber todas as verbas rescisórias — como aviso prévio, 13º proporcional, férias proporcionais com 1/3 e multa de 40% sobre o FGTS.
        </p>
        <p className="mb-4 font-body text-body-mobile text-foreground/80 lg:text-body-desktop">
          O processo pode ser conduzido tanto por negociação extrajudicial quanto por ação na Justiça do Trabalho. Nosso escritório analisa cada caso individualmente para encontrar a melhor estratégia.
        </p>
        <p className="mb-8 font-body text-body-mobile text-foreground/80 lg:text-body-desktop">
          Se você trabalhou horas extras, fez banco de horas irregular ou foi demitido sem receber tudo corretamente, entre em contato e vamos avaliar seu caso.
        </p>
        <Button variant="cta" size="lg" onClick={onCtaClick} className="w-fit px-10 py-6">
          Avalie seu caso gratuitamente
        </Button>
      </div>

      {/* Right column — image */}
      <div className="hidden lg:flex lg:w-[42%]">
        <img
          src={workerImage}
          alt="Trabalhador avaliando seus direitos"
          className="h-full w-full object-cover"
          loading="lazy"
          width={800}
          height={960}
        />
      </div>
    </section>
  );
}
