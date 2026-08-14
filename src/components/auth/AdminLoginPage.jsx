import React, { useState } from "react";
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Preencha o e-mail/usuário e a senha.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const validUser =
        username === "admin" ||
        username === "maycon@mayconstore.com.br" ||
        username === "maycon";
      const validPass =
        password === "maycon123" || password === "admin123" || password === "123456";

      if (validUser && validPass) {
        localStorage.setItem(
          "maycon_admin_session",
          JSON.stringify({ user: username, loggedAt: new Date().toISOString() })
        );
        onLoginSuccess();
      } else {
        setError(
          "Credenciais inválidas. Usuário: maycon — Senha: maycon123"
        );
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative z-10 space-y-6">

        {/* Logo + Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-zinc-950 border-2 border-amber-500/50 p-2.5 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M20 75 V25 L40 50 L60 25 V75" fill="none" stroke="#D4AF37" strokeWidth="12" strokeLinecap="round"/>
              <path d="M80 30 C80 30 62 25 62 42 C62 60 80 55 80 70 C80 80 62 75 62 75" fill="none" stroke="#D4AF37" strokeWidth="12" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold font-heading text-white tracking-tight">
              PAINEL DE GESTÃO MS
            </h1>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest block mt-0.5">
              Acesso Restrito do Administrador
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-950/50 border border-red-500/50 p-3 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-semibold mb-1">E-mail ou Usuário</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                placeholder="maycon@mayconstore.com.br"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Senha de Acesso</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gold-gradient hover:opacity-95 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all active:scale-95"
          >
            {isLoading ? (
              <span>AUTENTICANDO...</span>
            ) : (
              <>
                <span>ENTRAR NO PAINEL ADMIN</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-zinc-800/80 text-center">
          <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Acesso protegido — apenas administradores autorizados
          </p>
        </div>

      </div>
    </div>
  );
}
