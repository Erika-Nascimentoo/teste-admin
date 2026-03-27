import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  onClick: () => void;
}

export function FloatingWhatsApp({ onClick }: FloatingWhatsAppProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:bg-gold-light md:h-16 md:w-16"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
}
