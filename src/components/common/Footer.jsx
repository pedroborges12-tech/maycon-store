import React from "react";
import { ShieldCheck, Truck, RefreshCw, Lock, Printer, Award } from "lucide-react";


export default function Footer({ onOpenSizeGuide, setIsAdminView }) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 mt-20">
      
      {/* Brand Value Pillars */}
      <div className="border-b border-zinc-900/80 bg-zinc-900/30 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-zinc-100 font-bold text-sm">Envio para todo Brasil</h4>
            <p className="text-xs text-zinc-500">Rastreio em tempo real via WhatsApp e E-mail.</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-zinc-100 font-bold text-sm">Pix com Confirmação Instantânea</h4>
            <p className="text-xs text-zinc-500">Ganhe 10% de desconto comprando via Pix.</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="text-zinc-100 font-bold text-sm">Primeira Troca Grátis</h4>
            <p className="text-xs text-zinc-500">Até 30 dias para solicitar a troca do seu produto.</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-zinc-100 font-bold text-sm">Algodão Premium 260g</h4>
            <p className="text-xs text-zinc-500">Modelagem Oversized Box autêntica e resistente.</p>
          </div>

        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-amber-500/50 p-1.5 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M20 75 V25 L40 50 L60 25 V75" fill="none" stroke="#D4AF37" strokeWidth="12"/>
                  <path d="M80 30 C80 30 62 25 62 42 C62 60 80 55 80 70 C80 80 62 75 62 75" fill="none" stroke="#D4AF37" strokeWidth="12"/>
                </svg>
              </div>
              <span className="font-heading text-xl font-black text-zinc-100">
                MAYCON<span className="text-amber-400">.STORE</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              Marca de moda streetwear masculina focada no conceito urbano, caimento diferenciado e acabamento de alta padrão. Estilo autêntico para quem vive a rua.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/mayconstore1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@mayconstore1</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h5 className="text-zinc-100 font-bold text-sm tracking-wider uppercase mb-4 text-amber-400">
              Navegação
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#produtos" className="hover:text-zinc-100 transition-colors">Coleção Oversized</a></li>
              <li><a href="#produtos" className="hover:text-zinc-100 transition-colors">Polos Piquet Gold</a></li>
              <li><a href="#produtos" className="hover:text-zinc-100 transition-colors">Bermudas Cargo Táticas</a></li>
              <li><a href="#produtos" className="hover:text-zinc-100 transition-colors">Tênis Chunky Urban</a></li>
              <li><a href="#produtos" className="hover:text-zinc-100 transition-colors">Acessórios Banho 18k</a></li>
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-amber-400 text-left transition-colors font-medium">
                  Guia de Medidas & Tamanhos
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="md:col-span-3">
            <h5 className="text-zinc-100 font-bold text-sm tracking-wider uppercase mb-4 text-amber-400">
              Pagamento Seguro
            </h5>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                PIX INSTANTÂNEO
              </span>
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-semibold text-zinc-300">
                Cartão em até 12x
              </span>
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-semibold text-zinc-300">
                Boleto Bancário
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Ambiente 100% Criptografado SSL</span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} MAYCON STORE (MS). Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Design & Tecnologia: <span className="text-amber-400 font-semibold">Streetwear Engine MS</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
