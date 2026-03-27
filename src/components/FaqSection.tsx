import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      q: "Quanto tempo tenho para entrar com uma ação trabalhista?",
      a: "O trabalhador tem até 2 anos após o desligamento para entrar com uma ação, podendo reclamar os últimos 5 anos de trabalho.",
    },
    {
      q: "Preciso ter provas para reclamar horas extras?",
      a: "Não necessariamente. O ônus da prova pode recair sobre o empregador, especialmente em empresas com mais de 10 funcionários que são obrigadas a manter controle de ponto.",
    },
    {
      q: "Quanto custa para contratar o escritório?",
      a: "A consulta inicial é gratuita. Os honorários são combinados de forma transparente e, em muitos casos, são cobrados apenas ao final do processo, sobre o valor ganho.",
    },
    {
      q: "Posso processar meu empregador mesmo estando empregado?",
      a: "Sim, é um direito garantido por lei. No entanto, avaliamos cada situação para orientar a melhor estratégia.",
    },
    {
      q: "Como funciona o atendimento?",
      a: "Nosso atendimento começa pelo WhatsApp, onde fazemos uma triagem inicial. Em seguida, agendamos uma consulta detalhada para analisar seu caso.",
    },
  ];

  return (
    <section className="bg-dark px-6 py-20 lg:px-16 xl:px-24" id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-heading text-heading-mobile text-dark-foreground lg:text-heading-desktop">
          Perguntas Frequentes
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-lg border border-dark-card bg-dark-card px-6">
              <AccordionTrigger className="font-body text-body-mobile font-semibold text-dark-foreground hover:no-underline lg:text-body-desktop">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-body-mobile text-dark-foreground/70">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
