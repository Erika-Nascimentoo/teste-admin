import maurilioImg from "@/assets/maurilio.png";
import { Button } from "@/components/ui/button";

interface AboutSectionProps {
  onCtaClick: () => void;
}

export function AboutSection({ onCtaClick }: AboutSectionProps) {
  return (
    <section className="flex flex-col lg:flex-row" id="sobre">
      {/* Left column — photo */}
      <div className="flex items-center justify-center bg-muted p-8 lg:w-[40%] lg:p-0">
        <img
          src={maurilioImg}
          alt="Dr. Maurílio Tavares"
          className="h-auto max-h-[500px] w-full max-w-[400px] rounded-lg object-cover lg:max-h-none lg:h-full lg:max-w-none lg:rounded-none"
          loading="lazy"
        />
      </div>

      {/* Right column — text */}
      <div className="flex flex-1 flex-col justify-center bg-secondary px-6 py-16 lg:w-[60%] lg:px-16 xl:px-24">
        <span className="mb-3 font-body text-subtitle uppercase tracking-widest text-primary">
          Sobre o Escritório
        </span>
        <h2 className="mb-6 font-heading text-heading-mobile text-foreground lg:text-heading-desktop">
          Dr. Maurílio Tavares
        </h2>
        <p className="mb-4 font-body text-body-mobile text-foreground/80 lg:text-body-desktop">
          Advogado especialista em Direito do Trabalho, com mais de 7 anos de atuação dedicada à defesa dos direitos dos trabalhadores. Sua experiência abrange desde negociações extrajudiciais até processos complexos na Justiça do Trabalho.
        </p>
        <p className="mb-8 font-body text-body-mobile text-foreground/80 lg:text-body-desktop">
          Com atendimento próximo e humanizado, o Dr. Maurílio busca entender a fundo cada caso para oferecer a melhor estratégia jurídica, sempre com ética, transparência e compromisso com os resultados
        </p>
        <Button variant="cta" size="lg" onClick={onCtaClick} className="w-fit px-10 py-6">
          Agende uma consulta
        </Button>
      </div>
    </section>
  );
}
