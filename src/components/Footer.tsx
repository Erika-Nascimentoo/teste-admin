import { MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-dark px-6 py-12 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h4 className="mb-4 font-heading text-card-title-mobile text-dark-foreground">Aceleração Jurídica</h4>
            <p className="font-body text-sm text-dark-foreground/60">
              Escritório especializado em Direito do Trabalho em Campo Grande - MS.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-heading text-card-title-mobile text-dark-foreground">Contato</h4>
            <div className="space-y-2 text-sm text-dark-foreground/60">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-primary" /> (67) 99150-5089
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-primary" /> contato@aceleracaojuridica
              </p>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-heading text-card-title-mobile text-dark-foreground">Endereço</h4>
            <a
              href="https://maps.app.goo.gl/o5SpdvYkWjowbdLv7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm text-dark-foreground/60 hover:text-primary transition-colors"
            >
              <MapPin size={14} className="mt-1 shrink-0 text-primary" />
              R. 15 de Novembro, 2550 - Jardim dos Estados, Campo Grande - MS, 79020-300
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-dark-card pt-6 text-center text-sm text-dark-foreground/40">
          <p>© {new Date().getFullYear()} Aceleração Jurídica. Todos os direitos reservados.</p>
          <Link
            to="/o-recebimento-correto-de-suas-horas-extras-e-verbas-rescisorias-com-especialistas/politica-de-privacidade"
            className="mt-2 inline-block hover:text-primary transition-colors"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
