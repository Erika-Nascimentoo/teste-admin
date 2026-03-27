import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  name: string;
  phone: string;
  timestamp: string;
  page_url: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterUtm, setFilterUtm] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin");
        return;
      }
      fetchLeads();
    };
    checkAuth();
  }, [navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("leads").select("*").order("timestamp", { ascending: false });
    if (!error && data) setLeads(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const filteredLeads = filterUtm
    ? leads.filter((l) =>
        [l.utm_source, l.utm_medium, l.utm_campaign, l.utm_term, l.utm_content]
          .filter(Boolean)
          .some((v) => v?.toLowerCase().includes(filterUtm.toLowerCase()))
      )
    : leads;

  const exportCSV = () => {
    const headers = ["Nome", "Telefone", "Data", "UTM Source", "UTM Medium", "UTM Campaign"];
    const rows = filteredLeads.map((l) => [
      l.name, l.phone, l.timestamp, l.utm_source || "", l.utm_medium || "", l.utm_campaign || "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-heading text-heading-mobile text-foreground lg:text-heading-desktop">Leads</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportCSV}>Exportar CSV</Button>
            <Button variant="ghost" onClick={handleLogout}>Sair</Button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Filtrar por UTM..."
          value={filterUtm}
          onChange={(e) => setFilterUtm(e.target.value)}
          className="mb-6 w-full max-w-xs rounded-md border border-input bg-background px-4 py-2 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />

        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full font-body text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Nome</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Telefone</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Data</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Source</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Medium</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Campaign</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3 text-foreground">{lead.name}</td>
                    <td className="px-4 py-3 text-foreground">{lead.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(lead.timestamp).toLocaleString("pt-BR")}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.utm_source || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.utm_medium || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.utm_campaign || "—"}</td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Nenhum lead encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
