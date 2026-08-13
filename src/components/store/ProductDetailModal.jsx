import React, { useState } from "react";
import { X, Star, ShoppingBag, Zap, ShieldCheck, Truck, RefreshCw, Ruler, Check } from "lucide-react";
import { MOCK_REVIEWS } from "../../data/initialData";

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenSizeGuide
}) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart({
      product,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
  };

  const handleBuyNow = () => {
    onBuyNow({
      product,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl my-auto relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-amber-500/40 transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-zinc-950 p-4 sm:p-6 flex flex-col justify-between">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 mb-4">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-amber-500 text-zinc-950 font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === imgUrl
                      ? "border-amber-500 shadow-md shadow-amber-500/30 scale-105"
                      : "border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span className="uppercase font-bold tracking-widest text-amber-500">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-500 text-xs">({product.reviewCount} avaliações)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight mb-3">
                {product.name}
              </h2>

              {/* Price Tag */}
              <div className="flex items-baseline gap-3 mb-4 bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through">
                    R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                )}
                <span className="ml-auto text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                  10% no Pix
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Stock Warning */}
              {product.stock > 0 && product.stock <= 5 && (
                <div className="mb-4 bg-red-950/40 border border-red-500/40 p-2.5 rounded-xl text-xs text-red-300 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>Estoque Crítico: Apenas <strong>{product.stock} unidades</strong> disponíveis no momento!</span>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                    Cor: <span className="text-zinc-100">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          selectedColor === c.name
                            ? "border-amber-500 bg-amber-500/10 text-amber-400"
                            : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-zinc-700"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Tamanho Selecionado: <span className="text-zinc-100">{selectedSize}</span>
                  </label>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Guia de Medidas</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 rounded-xl text-xs font-black transition-all ${
                        selectedSize === sz
                          ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30 scale-105"
                          : "bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-zinc-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-xl bg-zinc-950 border border-amber-500/50 hover:bg-amber-500/10 text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>

              {/* Buy Now (Direct Checkout) */}
              <button
                onClick={handleBuyNow}
                className="w-full py-4 rounded-xl bg-gold-gradient hover:opacity-95 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all transform active:scale-98"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>COMPRAR AGORA (CHECKOUT RÁPIDO)</span>
              </button>

            </div>

            {/* Small Guarantee Icons */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-400 text-center">
              <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-amber-500" />
                <span>Envio Expresso</span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Garantia MS</span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-amber-500" />
                <span>Troca Grátis</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
