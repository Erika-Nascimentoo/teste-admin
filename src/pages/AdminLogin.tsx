import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loginValue = login.trim();
    const passwordValue = password.trim();

    const checkTable = async (tableName: string) => {
      return await supabase
        .from(tableName)
        .select("id, login, subdomain")
        .eq("login", loginValue)
        .eq("password", passwordValue)
        .maybeSingle();
    };

    let result = await checkTable("user");

    if (!result.data && !result.error) {
      result = await checkTable("users");
    }

    if (result.error) {
      console.error(
        "Supabase admin login error:",
        result.error,
        "result:",
        result,
      );
      setError(
        "Erro de conexão com o banco. Verifique o console e as regras do Supabase.",
      );
      setLoading(false);
      return;
    }

    if (!result.data) {
      console.warn("Login falhou: entrada não encontrada", {
        login: loginValue,
      });
      setError(
        "Login ou senha incorretos. Verifique usuário/senha no Supabase.",
      );
      setLoading(false);
      return;
    }

    sessionStorage.setItem("admin_authenticated", "true");
    sessionStorage.setItem("admin_user", result.data.login);
    if (result.data.subdomain) {
      sessionStorage.setItem("subdomain", result.data.subdomain); // ← troca client_id por subdomain
    } else {
      sessionStorage.removeItem("subdomain");
    }
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-6">
      <div className="w-full max-w-sm rounded-lg bg-background p-8 shadow-xl">
        <h1 className="mb-6 text-center font-heading text-heading-mobile text-foreground">
          Painel Admin
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            variant="cta"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
