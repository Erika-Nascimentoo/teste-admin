import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatPhone, getUtmParams } from "@/lib/utils-landing";

interface ContactPopupProps {
  open: boolean;
  onClose: () => void;
}

export function ContactPopup({ open, onClose }: ContactPopupProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);

    const utms = getUtmParams();
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      ...utms,
    };

    try {
      await fetch("https://n8n.aceleracaojuridica.com.br/webhook/lead-landing-popup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // silently continue
    }

    const nameEncoded = encodeURIComponent(name.trim());
    window.location.href = `/whatsapp-landing/?whatsapp=67991505089&name=${nameEncoded}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-md rounded-lg bg-background p-8 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>
        <h3 className="mb-6 text-heading-mobile font-heading text-foreground">Fale conosco pelo WhatsApp</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-4 py-3 font-body text-body-mobile text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="tel"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            required
            className="w-full rounded-md border border-input bg-background px-4 py-3 font-body text-body-mobile text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Enviar e continuar no WhatsApp"}
          </Button>
        </form>
      </div>
    </div>
  );
}
