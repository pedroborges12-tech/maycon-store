import React, { useState } from "react";
import { Star, ShoppingBag, Eye, Zap, Flame } from "lucide-react";

export default function ProductCard({ product, onSelectProduct, onQuickAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const secondaryImage = product.images[1] || product.images[0];
  
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-zinc-900/90 border border-zinc-800/80 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 transform hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isNew && (
          <span className="px-2.5 py-1 bg-amber-500 text-zinc-950 font-black text-[10px] uppercase tracking-wider rounded-md shadow-md shadow-amber-500/20">
            NEW DROP
          </span>
        )}
        {discountPercent > 0 && (
          <span className="px-2.5 py-1 bg-zinc-950/90 border border-amber-500/50 text-amber-400 font-extrabold text-[10px] uppercase tracking-wider rounded-md backdrop-blur-md">
            -{discountPercent}% OFF
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="px-2.5 py-1 bg-red-950/80 border border-red-500/50 text-red-400 font-bold text-[10px] uppercase tracking-wider rounded-md backdrop-blur-md flex items-center gap-1">
            <Flame className="w-3 h-3 text-red-400 fill-current animate-bounce" />
            Últimas {product.stock} un.
          </span>
        )}
      </div>

      {/* Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950 cursor-pointer"
      >
        <img
          src={hovered ? secondaryImage : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-500 transform group-hover:scale-105"
        />
        
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>

        {/* Quick View Button Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="px-4 py-2.5 bg-zinc-900/90 border border-amber-500/50 text-amber-400 text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-xl hover:bg-amber-500 hover:text-zinc-950 transition-all transform hover:scale-105"
          >
            <Eye className="w-4 h-4" />
            <span>VER DETALHES</span>
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-amber-500/90">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm font-extrabold text-zinc-100 hover:text-amber-400 cursor-pointer transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Available Sizes Badges */}
          <div className="flex flex-wrap gap-1 mt-2">
            {product.sizes.map((sz) => (
              <span
                key={sz}
                className="px-1.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-[10px] font-bold text-zinc-400"
              >
                {sz}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-white">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-500 line-through">
                  R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block">
              ou 3x de R$ {(product.price / 3).toFixed(2).replace(".", ",")} sem juros
            </span>
          </div>

          <button
            onClick={() => onQuickAddToCart(product)}
            className="p-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-95"
            title="Adicionar ao Carrinho"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>

    </div>
  );
}
