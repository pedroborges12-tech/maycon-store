import React from "react";
import { SlidersHorizontal, Check } from "lucide-react";

export const CATEGORIES = [
  { id: "todas", label: "Todas as Peças" },
  { id: "camisetas", label: "Camisetas Oversized" },
  { id: "polos", label: "Polos Piquet" },
  { id: "bermudas", label: "Bermudas Cargo" },
  { id: "calcados", label: "Tênis & Calçados" },
  { id: "acessorios", label: "Acessórios Gold" }
];

export const SIZES = ["P", "M", "G", "GG", "XGG", "38", "39", "40", "41", "42", "43", "60cm", "70cm", "Único"];

export default function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  selectedSize,
  setSelectedSize,
  priceFilter,
  setPriceFilter,
  sortBy,
  setSortBy
}) {
  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 mb-8 space-y-6">
      
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all uppercase tracking-wider ${
                isActive
                  ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: Size & Sort */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2 border-t border-zinc-800/80">
        
        {/* Sizes */}
        <div className="sm:col-span-8 flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-xs font-bold text-zinc-400 flex items-center gap-1 shrink-0 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
            Tamanho:
          </span>

          <button
            onClick={() => setSelectedSize("")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedSize === ""
                ? "bg-amber-500/20 border border-amber-500 text-amber-400"
                : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
            }`}
          >
            Todos
          </button>

          {SIZES.slice(0, 7).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size === selectedSize ? "" : size)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSize === size
                  ? "bg-amber-500/20 border border-amber-500 text-amber-400"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="sm:col-span-4 flex items-center justify-end gap-2">
          <span className="text-xs text-zinc-400 shrink-0">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-semibold rounded-xl px-3 py-2 focus:border-amber-500 focus:outline-none"
          >
            <option value="bestseller">Mais Vendidos</option>
            <option value="newest">Novidades Primeiro</option>
            <option value="price_asc">Menor Preço</option>
            <option value="price_desc">Maior Preço</option>
          </select>
        </div>

      </div>

    </div>
  );
}
