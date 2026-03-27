import { AlertTriangle, Clock, Ban } from "lucide-react";

export function PainSection() {
  const pains = [
    {
      icon: Clock,
      title: "Horas extras não pagas",
      text: "Você trabalha além do horário e não vê isso refletido no seu contracheque. Essa situação é mais comum do que parece.",
    },
    {
      icon: Ban,
      title: "Demissão sem receber tudo",
      text: "Foi desligado e sente que não recebeu todos os valores corretos? Muitos empregadores calculam as verbas rescisórias de forma incompleta.",
    },
    {
      icon: AlertTriangle,
      title: "Medo de perder seus direitos",
      text: "O prazo para reclamar na Justiça é limitado. Cada dia que passa pode significar dinheiro que você não vai mais recuperar.",
    },
  ];

  return (
    <section className="bg-dark px-6 py-20 lg:px-16 xl:px-24" id="problemas">
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-3 inline-block font-body text-subtitle uppercase tracking-widest text-primary">
          Identificação
        </span>
        <h2 className="mb-4 font-heading text-heading-mobile text-dark-foreground lg:text-heading-desktop">
          Você está passando por isso?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl font-body text-body-mobile text-dark-foreground/70 lg:text-body-desktop">
          Sabemos como é difícil lidar com a sensação de injustiça no trabalho. Você não está sozinho — e existem soluções legais para o seu caso.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {pains.map((pain) => (
            <div key={pain.title} className="rounded-lg bg-dark-card p-8 text-left">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <pain.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 font-body text-card-title-mobile font-semibold text-dark-foreground lg:text-card-title-desktop">
                {pain.title}
              </h3>
              <p className="font-body text-body-mobile text-dark-foreground/70">
                {pain.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
