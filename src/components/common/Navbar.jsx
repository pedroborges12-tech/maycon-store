import React, { useState } from "react";
import { ShoppingBag, Search, ShieldCheck, SlidersHorizontal, Sparkles, UserCheck } from "lucide-react";


export default function Navbar({
  cartCount,
  onOpenCart,
  searchTerm,
  setSearchTerm,
  isAdminView,
  setIsAdminView,
  onOpenSizeGuide
}) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-zinc-950 font-extrabold text-xs py-1.5 px-4 text-center tracking-wider overflow-hidden">
        <div className="flex items-center justify-center gap-4 animate-pulse">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            FRETE GRÁTIS NAS COMPRAS ACIMA DE R$ 299
          </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline font-black">CUPOM: MAYCON15 (15% OFF)</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden lg:inline">10% DE DESCONTO NO PIX</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo MS */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-amber-500/40 p-2 flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:border-amber-400 group-hover:shadow-amber-500/20 transition-all">
              {/* MS Gold Monogram */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M20 75 V25 L40 50 L60 25 V75" fill="none" stroke="#D4AF37" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M80 30 C80 30 62 25 62 42 C62 60 80 55 80 70 C80 80 62 75 62 75" fill="none" stroke="#D4AF37" strokeWidth="10" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl tracking-tighter font-extrabold text-white group-hover:text-amber-400 transition-colors">
                MAYCON<span className="text-amber-400">.STORE</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-semibold -mt-1">
                Streetwear Culture
              </span>
            </div>
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar camisetas oversized, polos, bermudas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-amber-500 rounded-full pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Sizing Table Button */}
            <button
              onClick={onOpenSizeGuide}
              className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-amber-500/40 transition-all"
              title="Guia de tamanhos"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
              <span>Tabela de Medidas</span>
            </button>

            {/* Instagram Reference Link */}
            <a
              href="https://www.instagram.com/mayconstore1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all"
              title="Siga no Instagram @mayconstore1"
            >
              <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@mayconstore1</span>
            </a>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-xl text-zinc-100 hover:text-amber-400 transition-all focus:outline-none group"
              aria-label="Ver Carrinho"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-amber-500/30 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-amber-500/50 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
