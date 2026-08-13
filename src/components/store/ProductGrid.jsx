import React from "react";
import ProductCard from "./ProductCard";
import { PackageX } from "lucide-react";

export default function ProductGrid({
  products = [],
  onSelectProduct,
  onQuickAddToCart
}) {
  if (products.length === 0) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center max-w-md mx-auto my-12">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-zinc-100 font-heading mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-xs text-zinc-400">
          Tente ajustar seus filtros de busca, categoria ou tamanho para encontrar os produtos desejados.
        </p>
      </div>
    );
  }

  return (
    <div id="produtos" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
          onQuickAddToCart={onQuickAddToCart}
        />
      ))}
    </div>
  );
}
