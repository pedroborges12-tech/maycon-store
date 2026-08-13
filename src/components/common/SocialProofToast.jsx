import React, { useState, useEffect } from "react";
import { ShoppingBag, CheckCircle, X } from "lucide-react";
import { MOCK_REVIEWS } from "../../data/initialData";

const MOCK_SALES_NOTIFS = [
  { name: "Gabriel S.", city: "São Paulo - SP", product: "Camiseta Oversized MS Heavy Gold", time: "há 2 minutos" },
  { name: "Felipe R.", city: "Rio de Janeiro - RJ", product: "Bermuda Cargo MS Tactical Black", time: "há 4 minutos" },
  { name: "Lucas M.", city: "Curitiba - PR", product: "Tênis MS Street Runner Black Gold", time: "há 7 minutos" },
  { name: "Matheus O.", city: "Belo Horizonte - MG", product: "Camisa Polo MS Piquet Gold Edition", time: "há 12 minutos" },
  { name: "Bruno K.", city: "Porto Alegre - RS", product: "Corrente MS Cuban Gold Plated 18k", time: "há 15 minutos" }
];

export default function SocialProofToast() {
  const [currentNotif, setCurrentNotif] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first toast after 4 seconds
    const timer = setTimeout(() => {
      triggerRandomNotif();
    }, 4000);

    // Loop interval every 22 seconds
    const interval = setInterval(() => {
      triggerRandomNotif();
    }, 22000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const triggerRandomNotif = () => {
    const randomIdx = Math.floor(Math.random() * MOCK_SALES_NOTIFS.length);
    setCurrentNotif(MOCK_SALES_NOTIFS[randomIdx]);
    setIsVisible(true);

    // Auto hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  };

  if (!isVisible || !currentNotif) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 max-w-sm bg-zinc-900/95 border border-amber-500/40 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl shadow-amber-500/10 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0">
        <ShoppingBag className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
          <CheckCircle className="w-3 h-3 text-emerald-400" />
          <span>NOVA COMPRA REALIZADA</span>
        </div>
        <p className="text-xs text-zinc-100 font-semibold truncate">
          {currentNotif.name} ({currentNotif.city})
        </p>
        <p className="text-[11px] text-zinc-400 truncate">
          Comprou: <span className="text-zinc-200">{currentNotif.product}</span>
        </p>
        <span className="text-[10px] text-zinc-500">{currentNotif.time}</span>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="text-zinc-500 hover:text-zinc-300 p-1 shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
