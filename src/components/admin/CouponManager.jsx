import React, { useState } from "react";
import { Tag, Plus, Check, Trash2, Sparkles } from "lucide-react";

export default function CouponManager({ coupons = [], onAddCoupon, onToggleCoupon }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrder, setMinOrder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !discountValue) return;

    onAddCoupon({
      code: code.toUpperCase(),
      discountType,
      discountValue: parseFloat(discountValue),
      minOrder: minOrder ? parseFloat(minOrder) : 0,
      active: true
    });

    setCode("");
    setDiscountValue("");
    setMinOrder("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
            Gestão de Cupons de Desconto
          </h1>
          <p className="text-xs text-zinc-400">
            Crie códigos promocionais por porcentagem ou valor fixo para utilizar em ofertas no Instagram e campanhas da loja.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>CRIAR NOVO CUPOM</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 uppercase">
              <tr>
                <th className="p-4">Código do Cupom</th>
                <th className="p-4">Desconto</th>
                <th className="p-4">Pedido Mínimo</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 font-black text-amber-400 text-sm tracking-wider uppercase font-mono">
                    {c.code}
                  </td>
                  <td className="p-4 font-bold text-white">
                    {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `R$ ${c.discountValue.toFixed(2)} OFF`}
                  </td>
                  <td className="p-4">
                    {c.minOrder > 0 ? `R$ ${c.minOrder.toFixed(2)}` : "Sem mínimo"}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                      c.active ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {c.active ? "ATIVO" : "INATIVO"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onToggleCoupon(c.id)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-lg"
                    >
                      {c.active ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE COUPON MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-heading">Novo Cupom de Desconto</h3>
            
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Código do Cupom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: MAYCON20"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-zinc-100 uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Tipo de Desconto</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-zinc-100"
                  >
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Valor do Desconto *</label>
                  <input
                    type="number"
                    required
                    placeholder="15"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Valor Mínimo do Pedido (R$)</label>
                <input
                  type="number"
                  placeholder="100"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-zinc-100"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-xl uppercase tracking-wider"
                >
                  Criar Cupom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
