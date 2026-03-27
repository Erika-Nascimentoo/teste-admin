import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  LogOut,
  Download,
  Users,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Lead {
  id: number;
  nome: string;
  telefone: string;
  created_at: string;
  URL: string;
  subdomain?: string;
}

type DateFilter = "hoje" | "semana" | "mes" | "todos";

function getSlugFromURL(url: string): string {
  try {
    const withoutProtocol = url.replace(/^https?:\/\//, "");
    const path = withoutProtocol.split("/").slice(1).join("/");
    const slug = path.split("/")[0];
    return slug || "—";
  } catch {
    return "—";
  }
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function isWithinRange(dateStr: string, filter: DateFilter): boolean {
  if (filter === "todos") return true;
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (filter === "hoje") {
    return date >= today;
  }
  if (filter === "semana") {
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    return date >= weekAgo;
  }
  if (filter === "mes") {
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);
    return date >= monthAgo;
  }
  return true;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLeadId, setExpandedLeadId] = useState<number | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>("todos");
  const [lpFilter, setLpFilter] = useState<string>("todas");
  const [searchTerm, setSearchTerm] = useState("");

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
    const subdomain = sessionStorage.getItem("subdomain");

    const query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = subdomain
      ? await query.eq("subdomain", subdomain)
      : await query;

    if (!error && data) setLeads(data);
    if (error) console.error("Erro fetchLeads:", error);
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_user");
    sessionStorage.removeItem("subdomain");
    navigate("/admin");
  };

  // Lista única de LPs extraídas das URLs
  const uniqueLPs = useMemo(() => {
    const slugs = leads
      .map((l) => (l.URL ? getSlugFromURL(l.URL) : null))
      .filter((s): s is string => !!s && s !== "—");
    return Array.from(new Set(slugs));
  }, [leads]);

  // Leads filtrados
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchDate = isWithinRange(l.created_at, dateFilter);
      const matchLP =
        lpFilter === "todas" ||
        (l.URL && getSlugFromURL(l.URL) === lpFilter);
      const matchSearch =
        searchTerm === "" ||
        l.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.telefone.includes(searchTerm);
      return matchDate && matchLP && matchSearch;
    });
  }, [leads, dateFilter, lpFilter, searchTerm]);

  // Dados para o gráfico (últimos 14 dias)
  const chartData = useMemo(() => {
    const days: Record<string, number> = {};
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];
      days[key] = 0;
    }
    filteredLeads.forEach((l) => {
      const key = l.created_at.split("T")[0];
      if (key in days) days[key]++;
    });
    return Object.entries(days).map(([date, count]) => ({
      date: formatDateLabel(date),
      leads: count,
    }));
  }, [filteredLeads]);

  // Contadores
  const totalLeads = filteredLeads.length;
  const todayLeads = filteredLeads.filter((l) =>
    isWithinRange(l.created_at, "hoje")
  ).length;
  const weekLeads = filteredLeads.filter((l) =>
    isWithinRange(l.created_at, "semana")
  ).length;

  const exportCSV = () => {
    const headers = ["Nome", "Telefone", "Data", "LP", "URL"];
    const rows = filteredLeads.map((l) => [
      l.nome,
      l.telefone,
      new Date(l.created_at).toLocaleString("pt-BR"),
      l.URL ? getSlugFromURL(l.URL) : "",
      l.URL || "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  const hasActiveFilters =
    dateFilter !== "todos" || lpFilter !== "todas" || searchTerm !== "";

  const clearFilters = () => {
    setDateFilter("todos");
    setLpFilter("todas");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-heading-mobile text-foreground lg:text-heading-desktop">
              Leads
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {sessionStorage.getItem("subdomain") || "painel"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportCSV} className="gap-2">
              <Download size={16} /> Exportar CSV
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut size={16} /> Sair
            </Button>
          </div>
        </div>

        {/* Cards de contagem */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users size={20} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Total de leads</p>
            </div>
            <p className="mt-3 text-4xl font-bold text-foreground">{totalLeads}</p>
            <p className="mt-1 text-xs text-muted-foreground">no período selecionado</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">Hoje</p>
            </div>
            <p className="mt-3 text-4xl font-bold text-foreground">{todayLeads}</p>
            <p className="mt-1 text-xs text-muted-foreground">leads nas últimas 24h</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Calendar size={20} className="text-blue-500" />
              </div>
              <p className="text-sm text-muted-foreground">Essa semana</p>
            </div>
            <p className="mt-3 text-4xl font-bold text-foreground">{weekLeads}</p>
            <p className="mt-1 text-xs text-muted-foreground">últimos 7 dias</p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Leads por dia — últimas 2 semanas
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                width={24}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [value, "leads"]}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorLeads)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Filtros */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Filter size={16} className="text-muted-foreground" />

            {/* Busca */}
            <div className="relative flex-1 min-w-[180px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Filtro de data */}
            <div className="flex rounded-md border border-input overflow-hidden text-sm">
              {(["hoje", "semana", "mes", "todos"] as DateFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setDateFilter(f)}
                  className={`px-3 py-2 transition-colors ${
                    dateFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {f === "hoje" ? "Hoje" : f === "semana" ? "Semana" : f === "mes" ? "Mês" : "Todos"}
                </button>
              ))}
            </div>

            {/* Filtro por LP */}
            {uniqueLPs.length > 0 && (
              <select
                value={lpFilter}
                onChange={(e) => setLpFilter(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="todas">Todas as LPs</option>
                {uniqueLPs.map((slug) => (
                  <option key={slug} value={slug}>
                    {slug}
                  </option>
                ))}
              </select>
            )}

            {/* Limpar filtros */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} /> Limpar
              </button>
            )}
          </div>
        </div>

        {/* Tabela */}
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-foreground w-8"></th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Nome</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Telefone</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">LP</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <>
                    <tr
                      key={lead.id}
                      className="border-t border-border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() =>
                        setExpandedLeadId(
                          expandedLeadId === lead.id ? null : lead.id
                        )
                      }
                    >
                      <td className="px-4 py-3 w-8">
                        <ChevronDown
                          size={16}
                          className={`text-muted-foreground transform transition-transform ${
                            expandedLeadId === lead.id ? "rotate-180" : ""
                          }`}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">{lead.nome}</td>
                      <td className="px-4 py-3 text-foreground">{lead.telefone}</td>
                      <td className="px-4 py-3">
                        {lead.URL ? (
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {getSlugFromURL(lead.URL)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(lead.created_at).toLocaleString("pt-BR")}
                      </td>
                    </tr>
                    {expandedLeadId === lead.id && (
                      <tr className="border-t border-border bg-muted/20">
                        <td colSpan={5} className="px-4 py-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                            URL completa
                          </p>
                          <p className="text-sm text-foreground break-all bg-background p-3 rounded-lg border border-border">
                            {lead.URL || "Sem URL registrada"}
                          </p>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      Nenhum lead encontrado para os filtros selecionados.
                    </td>
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