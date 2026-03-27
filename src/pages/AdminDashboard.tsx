import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Lead {
  id: number;
  nome: string;
  telefone: string;
  created_at: string;
  URL: string;
  client_id?: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLeadId, setExpandedLeadId] = useState<number | null>(null);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated");
    if (!isAuth) {
      navigate("/admin");
      return;
    }
    fetchLeads();
  }, [navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    const clientId = Number(sessionStorage.getItem("client_id"));

    const query = supabase.from("leads").select("*").order("created_at", { ascending: false });
    const { data, error } = clientId
      ? await query.eq("client_id", clientId)
      : await query;

    if (!error && data) setLeads(data);
    if (error) console.error("Erro fetchLeads:", error);
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_user");
    navigate("/admin");
  };

  const filteredLeads = leads;

  const exportCSV = () => {
    const headers = ["Nome", "Telefone", "Data", "URL"];
    const rows = filteredLeads.map((l) => [
      l.nome, l.telefone, l.created_at, l.URL || "",
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



        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full font-body text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-foreground w-8"></th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Nome</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Telefone</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <>
                    <tr key={lead.id} className="border-t border-border hover:bg-muted/50 cursor-pointer" onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)}>
                      <td className="px-4 py-3 text-foreground w-8">
                        <ChevronDown size={18} className={`transform transition-transform ${expandedLeadId === lead.id ? 'rotate-180' : ''}`} />
                      </td>
                      <td className="px-4 py-3 text-foreground">{lead.nome}</td>
                      <td className="px-4 py-3 text-foreground">{lead.telefone}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(lead.created_at).toLocaleString("pt-BR")}</td>
                    </tr>
                    {expandedLeadId === lead.id && (
                      <tr className="border-t border-border bg-muted/30">
                        <td colSpan={4} className="px-4 py-4">
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-foreground">URL da página:</p>
                            <p className="text-sm text-muted-foreground break-all bg-background p-3 rounded border border-border">
                              {lead.URL || "Sem URL registrada"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Nenhum lead encontrado.</td>
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
