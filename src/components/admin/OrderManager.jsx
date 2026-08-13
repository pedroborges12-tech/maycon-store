import React, { useState } from "react";
import { ShoppingCart, Printer, Search, Eye, CheckCircle2, Clock, Truck, PackageCheck, AlertTriangle } from "lucide-react";

export const ORDER_STATUSES = [
  { id: "pendente", label: "Pendente", color: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
  { id: "pago", label: "Pago", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
  { id: "em_preparacao", label: "Em Preparação", color: "bg-blue-500/20 text-blue-400 border-blue-500/40" },
  { id: "enviado", label: "Enviado", color: "bg-purple-500/20 text-purple-400 border-purple-500/40" },
  { id: "entregue", label: "Entregue", color: "bg-zinc-800 text-zinc-300 border-zinc-700" },
  { id: "cancelado", label: "Cancelado", color: "bg-red-500/20 text-red-400 border-red-500/40" }
];

export default function OrderManager({ orders = [], onUpdateOrderStatus, onOpenReceipt }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("todos");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatusFilter === "todos" || o.orderStatus === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
          Gestão de Pedidos & Notas Fiscais
        </h1>
        <p className="text-xs text-zinc-400">
          Acompanhe o fluxo de vendas, altere o status de entrega e acione a impressão de cupom fiscal térmico (NFC-e).
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por ID do pedido ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedStatusFilter("todos")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all uppercase ${
              selectedStatusFilter === "todos"
                ? "bg-amber-500 text-zinc-950"
                : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
            }`}
          >
            Todos
          </button>
          {ORDER_STATUSES.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all uppercase ${
                selectedStatusFilter === st.id
                  ? "bg-amber-500 text-zinc-950"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 uppercase">
              <tr>
                <th className="p-4">Nº Pedido / Data</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Pagamento</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status do Pedido</th>
                <th className="p-4 text-right">Nota Fiscal (NFC-e)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const statusObj = ORDER_STATUSES.find((s) => s.id === order.orderStatus) || ORDER_STATUSES[0];
                  return (
                    <tr key={order.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="p-4 font-bold text-zinc-100">
                        <span className="text-amber-400 block text-sm font-extrabold">{order.id}</span>
                        <span className="text-[10px] text-zinc-500">
                          {new Date(order.date).toLocaleString("pt-BR")}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white">{order.customer?.name}</div>
                        <div className="text-[11px] text-zinc-400">{order.customer?.phone}</div>
                        <div className="text-[10px] text-zinc-500">{order.customer?.address?.city}/{order.customer?.address?.state}</div>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-bold uppercase text-zinc-300">
                          {order.paymentMethod === "pix" ? "Pix Instantâneo" : "Cartão de Crédito"}
                        </span>
                      </td>

                      <td className="p-4 font-black text-white text-sm">
                        R$ {order.total.toFixed(2).replace(".", ",")}
                      </td>

                      <td className="p-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border uppercase focus:outline-none cursor-pointer ${statusObj.color}`}
                        >
                          {ORDER_STATUSES.map((st) => (
                            <option key={st.id} value={st.id} className="bg-zinc-950 text-white">
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => onOpenReceipt(order)}
                          className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-xl text-xs font-bold flex items-center justify-end gap-1.5 ml-auto transition-all"
                        >
                          <Printer className="w-4 h-4" />
                          <span>IMPRIMIR NFC-E (58/80MM)</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
