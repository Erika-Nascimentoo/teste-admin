import { Shield, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  onCtaClick: () => void;
}

export function ServicesSection({ onCtaClick }: ServicesSectionProps) {
  const services = [
    { title: "Reconhecimento de vínculo empregatício", description: "Trabalhou sem carteira assinada? Podemos ajudar a comprovar seu vínculo e garantir todos os direitos." },
    { title: "Desrespeito aos direitos trabalhistas", description: "Jornada irregular, desvio de função, assédio moral — protegemos seus direitos em todas as frentes." },
    { title: "Horas extras e verbas rescisórias", description: "Análise completa dos seus recebimentos para garantir que tudo foi pago corretamente." },
  ];

  const differentials = [
    { icon: Shield, title: "Especialização na defesa dos trabalhadores" },
    { icon: Heart, title: "Atendimento humanizado e transparente" },
    { icon: Target, title: "Atuação técnica e estratégica nos processos" },
  ];

  return (
    <section className="bg-secondary px-6 py-20 lg:px-16 xl:px-24" id="servicos">
      <div className="mx-auto max-w-5xl">
        <span className="mb-3 block font-body text-subtitle uppercase tracking-widest text-primary">
          Áreas de Atuação
        </span>
        <h2 className="mb-12 font-heading text-heading-mobile text-foreground lg:text-heading-desktop">
          Como podemos ajudar
        </h2>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-lg border border-border bg-background p-8">
              <h3 className="mb-3 font-body text-card-title-mobile font-semibold text-foreground lg:text-card-title-desktop">
                {s.title}
              </h3>
              <p className="font-body text-body-mobile text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-8">
          {differentials.map((d) => (
            <div key={d.title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                <d.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-body text-body-mobile font-medium text-foreground">{d.title}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg" onClick={onCtaClick} className="px-10 py-6">
            Fale com um especialista
          </Button>
        </div>
      </div>
    </section>
  );
}
