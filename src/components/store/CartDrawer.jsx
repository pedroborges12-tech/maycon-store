import React, { useState } from "react";
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Truck, Check } from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  setAppliedCoupon,
  availableCoupons = []
}) {
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = (subtotal * appliedCoupon.discountValue) / 100;
    } else if (appliedCoupon.discountType === "fixed") {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const freeShippingThreshold = 299.0;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const isFreeShipping = subtotal >= freeShippingThreshold;

  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (!couponCodeInput.trim()) return;

    const found = availableCoupons.find(
      (c) => c.code.toUpperCase() === couponCodeInput.trim().toUpperCase() && c.active
    );

    if (found) {
      if (subtotal < found.minOrder) {
        setCouponError(`Pedido mínimo para este cupom é R$ ${found.minOrder.toFixed(2)}`);
        return;
      }
      setAppliedCoupon(found);
      setCouponSuccess(`Cupom ${found.code} aplicado com sucesso!`);
      setCouponCodeInput("");
    } else {
      setCouponError("Cupom inválido ou expirado.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl relative">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold font-heading text-white">Meu Carrinho</h2>
                <span className="text-xs text-zinc-400">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "itens"} selecionados
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-zinc-900/90 border-b border-zinc-800/80 p-4">
            <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-4 h-4 text-amber-500" />
                {isFreeShipping ? (
                  <span className="text-emerald-400">PARABÉNS! VOCÊ GANHOU FRETE GRÁTIS</span>
                ) : (
                  <span>
                    Faltam <strong className="text-amber-400">R$ {missingForFreeShipping.toFixed(2).replace(".", ",")}</strong> para Frete Grátis
                  </span>
                )}
              </span>
            </div>

            <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="bg-gold-gradient h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-zinc-300">Seu carrinho está vazio</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Explore nosso catálogo e garanta as melhores peças streetwear da Maycon Store.
                </p>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}-${idx}`}
                  className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-3.5 flex gap-3.5 items-center relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-zinc-950 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-zinc-100 truncate pr-6">
                      {item.name}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                      <span className="px-1.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded font-semibold text-amber-400">
                        {item.size}
                      </span>
                      {item.color && <span>• {item.color}</span>}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-extrabold text-white">
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 text-zinc-400 hover:text-white flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-zinc-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="w-6 h-6 text-zinc-400 hover:text-white flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 p-1"
                    title="Remover item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Call to Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-900 bg-zinc-900/60 space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Cupom de Desconto (ex: MAYCON15)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 uppercase focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-xl"
                  >
                    Aplicar
                  </button>
                </div>

                {couponError && <p className="text-[11px] text-red-400 font-medium">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-400 font-medium">{couponSuccess}</p>}

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs bg-amber-500/10 border border-amber-500/30 p-2 rounded-xl text-amber-400">
                    <span>Cupom <strong>{appliedCoupon.code}</strong> ativo</span>
                    <button
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      className="text-zinc-400 hover:text-zinc-100 text-[10px]"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </form>

              {/* Order Summary */}
              <div className="space-y-1.5 text-xs text-zinc-400 border-t border-zinc-800/80 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-zinc-200">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto ({appliedCoupon?.code}):</span>
                    <span>- R$ {discountAmount.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span className={isFreeShipping ? "text-emerald-400 font-bold" : "text-zinc-200"}>
                    {isFreeShipping ? "GRÁTIS" : "Calculado no checkout"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-zinc-800">
                  <span>Total Final:</span>
                  <span className="text-gold-gradient">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 rounded-xl bg-gold-gradient hover:opacity-95 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all transform active:scale-98"
              >
                <span>FINALIZAR COMPRA</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
