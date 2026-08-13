import React from "react";
import { DollarSign, ShoppingBag, TrendingUp, Clock, Award, ArrowUpRight, Sparkles } from "lucide-react";

export default function AdminDashboard({ orders = [], products = [] }) {
  
  // Calculate metric aggregations
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const ticketMedio = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  
  const pendingOrdersCount = orders.filter(o => o.orderStatus === "pendente").length;

  // Sales timeframes simulation
  const salesToday = totalRevenue * 0.18;
  const salesWeek = totalRevenue * 0.45;
  const salesMonth = totalRevenue * 0.85;
  const salesYear = totalRevenue * 1.25 + 14850;

  // Top products calculation
  const topProducts = products.slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
          Dashboard de Desempenho
        </h1>
        <p className="text-xs text-zinc-400">
          Acompanhamento em tempo real das métricas financeiras e vendas da Maycon Store.
        </p>
      </div>

      {/* Timeframe Sales Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span>Vendas do Dia</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            R$ {salesToday.toFixed(2).replace(".", ",")}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% em relação a ontem
          </span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span>Vendas da Semana</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            R$ {salesWeek.toFixed(2).replace(".", ",")}
          </div>
          <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +8.7% nesta semana
          </span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span>Vendas do Mês</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            R$ {salesMonth.toFixed(2).replace(".", ",")}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Meta mensal 92% atingida
          </span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span>Vendas do Ano</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gold-gradient">
            R$ {salesYear.toFixed(2).replace(".", ",")}
          </div>
          <span className="text-[11px] text-zinc-400 font-semibold">
            Acumulado 2026
          </span>
        </div>

      </div>

      {/* Secondary Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-semibold block">Ticket Médio</span>
            <span className="text-lg font-bold text-zinc-100">
              R$ {ticketMedio.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-semibold block">Pedidos Pendentes</span>
            <span className="text-lg font-bold text-amber-400">
              {pendingOrdersCount} pedidos
            </span>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-semibold block">Taxa de Conversão Pix</span>
            <span className="text-lg font-bold text-emerald-400">
              88.4%
            </span>
          </div>
        </div>

      </div>

      {/* SVG Interactive Sales Chart */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              Evolução das Vendas (Últimos 7 dias)
            </h3>
            <span className="text-xs text-zinc-400">Valores em Reais (R$)</span>
          </div>
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold rounded-lg">
            Crescimento +18%
          </span>
        </div>

        {/* Visual Line Chart SVG */}
        <div className="h-48 w-full pt-4">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="30" x2="500" y2="30" stroke="#27272a" strokeDasharray="4" />
            <line x1="0" y1="75" x2="500" y2="75" stroke="#27272a" strokeDasharray="4" />
            <line x1="0" y1="120" x2="500" y2="120" stroke="#27272a" strokeDasharray="4" />

            {/* Area Fill */}
            <path
              d="M 0,110 Q 70,40 140,80 T 280,30 T 420,60 T 500,20 L 500,150 L 0,150 Z"
              fill="url(#chartGrad)"
            />

            {/* Line Path */}
            <path
              d="M 0,110 Q 70,40 140,80 T 280,30 T 420,60 T 500,20"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Points */}
            <circle cx="140" cy="80" r="5" fill="#D4AF37" />
            <circle cx="280" cy="30" r="5" fill="#D4AF37" />
            <circle cx="420" cy="60" r="5" fill="#D4AF37" />
            <circle cx="500" cy="20" r="6" fill="#FFF" stroke="#D4AF37" strokeWidth="3" />
          </svg>
        </div>

        <div className="flex justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
          <span>Seg (R$ 1.250)</span>
          <span>Ter (R$ 2.400)</span>
          <span>Qua (R$ 1.890)</span>
          <span>Qui (R$ 3.800)</span>
          <span>Sex (R$ 2.950)</span>
          <span>Sáb (R$ 4.600)</span>
          <span className="font-bold text-amber-400">Hoje (R$ 5.210)</span>
        </div>
      </div>

      {/* Top Selling Products Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white font-heading">
          Produtos Mais Vendidos (Top Ranking)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 uppercase">
              <tr>
                <th className="p-3">Produto</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Preço</th>
                <th className="p-3">Estoque</th>
                <th className="p-3">Avaliação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {topProducts.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3 font-bold text-zinc-100 flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover bg-zinc-950" />
                    <span>{p.name}</span>
                  </td>
                  <td className="p-3 uppercase text-amber-400 font-semibold">{p.category}</td>
                  <td className="p-3 font-bold text-white">R$ {p.price.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.stock > 5 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {p.stock} un.
                    </span>
                  </td>
                  <td className="p-3 text-amber-400 font-bold">★ {p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
