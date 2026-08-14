import React from "react";
import { DollarSign, ShoppingBag, TrendingUp, Clock, Award, Package } from "lucide-react";

export default function AdminDashboard({ orders = [], products = [] }) {
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const ticketMedio = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "pendente").length;
  const lowStockCount = products.filter((p) => p.stock <= 3).length;

  const fmt = (val) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
          Dashboard de Desempenho
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Dados reais dos pedidos realizados na Maycon Store.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span>Receita Total</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{fmt(totalRevenue)}</div>
          <span className="text-[11px] text-zinc-500">Acumulado total de pedidos</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span>Total de Pedidos</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{totalOrdersCount}</div>
          <span className="text-[11px] text-zinc-500">Pedidos registrados</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span>Ticket Médio</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{fmt(ticketMedio)}</div>
          <span className="text-[11px] text-zinc-500">Valor médio por pedido</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span>Pendentes</span>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{pendingOrdersCount}</div>
          <span className="text-[11px] text-zinc-500">Pedidos aguardando</span>
        </div>
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-semibold block">Produtos Cadastrados</span>
            <span className="text-lg font-bold text-zinc-100">{products.length} itens</span>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-semibold block">Estoque Crítico</span>
            <span className="text-lg font-bold text-red-400">{lowStockCount} produto{lowStockCount !== 1 ? "s" : ""}</span>
            <span className="text-[11px] text-zinc-500 block">Com 3 unidades ou menos</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl space-y-4">
        <h3 className="text-base font-bold text-white font-heading">
          Pedidos Recentes
        </h3>
        {orders.length === 0 ? (
          <p className="text-sm text-zinc-500 text-center py-8">
            Nenhum pedido registrado ainda. Os pedidos aparecerão aqui quando clientes finalizarem compras.
          </p>
        ) : (
          <div className="space-y-2">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-zinc-950/60 rounded-xl text-xs">
                <div>
                  <span className="font-bold text-white">#{order.id}</span>
                  <span className="text-zinc-500 ml-2">{order.customer?.name || "—"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 font-bold">{fmt(order.total || 0)}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                    order.orderStatus === "pendente" ? "bg-amber-500/20 text-amber-400" :
                    order.orderStatus === "enviado" ? "bg-emerald-500/20 text-emerald-400" :
                    "bg-zinc-700 text-zinc-300"
                  }`}>
                    {order.orderStatus?.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
