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

    const { data, error: dbError } = await supabase
      .from("user")
      .select("id, login")
      .eq("login", login)
      .eq("password", password)
      .maybeSingle();

    if (dbError || !data) {
      setError("Login ou senha incorretos.");
      setLoading(false);
    } else {
      sessionStorage.setItem("admin_authenticated", "true");
      sessionStorage.setItem("admin_user", data.login);
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-6">
      <div className="w-full max-w-sm rounded-lg bg-background p-8 shadow-xl">
        <h1 className="mb-6 text-center font-heading text-heading-mobile text-foreground">Painel Admin</h1>
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
          <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
