import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function WhatsAppLanding() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("whatsapp") || "67991505089";

  useEffect(() => {
    const timer = setTimeout(() => {
      const message = encodeURIComponent(
        `Olá, meu nome é ${name} e estou entrando em contato pelo site.`
      );
      window.location.href = `https://api.whatsapp.com/send/?phone=${phone}&text=${message}`;
    }, 5000);
    return () => clearTimeout(timer);
  }, [name, phone]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-6">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-center font-heading text-heading-mobile text-dark-foreground">
          Conectando com o Dr. Maurílio Tavares...
        </p>
        <p className="text-center font-body text-body-mobile text-dark-foreground/60">
          Você será redirecionado em instantes.
        </p>
      </div>
    </div>
  );
}
