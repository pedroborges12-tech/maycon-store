import React from "react";
import { X, Ruler, Sparkles } from "lucide-react";

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-zinc-100 font-heading">
                Tabela de Medidas Oficial — MS
              </h3>
              <p className="text-xs text-zinc-400">
                Modelagem Oversized Box (Caimento Solto & Pesado)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800/50 hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/90 leading-relaxed">
              <strong>Dica de Caimento:</strong> Nossas camisetas oversized já possuem corte amplo e ombros caídos. Se você busca o visual streetwear autêntico tradicional, escolha seu tamanho habitual. Se prefere um caimento mais justo ao corpo, recomendamos um tamanho menor.
            </p>
          </div>

          {/* Camisetas Oversized Table */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-3 uppercase tracking-wider">
              1. Camisetas Oversized (em cm)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 uppercase">
                  <tr>
                    <th className="p-3">Tamanho</th>
                    <th className="p-3">Tórax / Peito</th>
                    <th className="p-3">Comprimento</th>
                    <th className="p-3">Manga</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 bg-zinc-900/50">
                  <tr>
                    <td className="p-3 font-bold text-amber-400">P</td>
                    <td className="p-3">56 cm</td>
                    <td className="p-3">74 cm</td>
                    <td className="p-3">23 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">M</td>
                    <td className="p-3">59 cm</td>
                    <td className="p-3">76 cm</td>
                    <td className="p-3">24 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">G</td>
                    <td className="p-3">62 cm</td>
                    <td className="p-3">78 cm</td>
                    <td className="p-3">25 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">GG</td>
                    <td className="p-3">65 cm</td>
                    <td className="p-3">80 cm</td>
                    <td className="p-3">26 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">XGG</td>
                    <td className="p-3">68 cm</td>
                    <td className="p-3">82 cm</td>
                    <td className="p-3">27 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bermudas Cargo Table */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-3 uppercase tracking-wider">
              2. Bermudas Cargo & Moletom (em cm)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 uppercase">
                  <tr>
                    <th className="p-3">Tamanho</th>
                    <th className="p-3">Cintura (Com Elástico)</th>
                    <th className="p-3">Comprimento Total</th>
                    <th className="p-3">Coxa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 bg-zinc-900/50">
                  <tr>
                    <td className="p-3 font-bold text-amber-400">P (38-40)</td>
                    <td className="p-3">38 - 42 cm</td>
                    <td className="p-3">48 cm</td>
                    <td className="p-3">32 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">M (42)</td>
                    <td className="p-3">42 - 46 cm</td>
                    <td className="p-3">50 cm</td>
                    <td className="p-3">34 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">G (44)</td>
                    <td className="p-3">46 - 50 cm</td>
                    <td className="p-3">52 cm</td>
                    <td className="p-3">36 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">GG (46-48)</td>
                    <td className="p-3">50 - 54 cm</td>
                    <td className="p-3">54 cm</td>
                    <td className="p-3">38 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm rounded-xl transition-all"
          >
            Entendi, Escolher Meu Tamanho
          </button>
        </div>

      </div>
    </div>
  );
}
