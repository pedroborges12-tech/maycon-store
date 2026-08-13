import React from "react";
import { LayoutDashboard, Package, Image, ShoppingCart, Tag, Users, Store, LogOut, Sparkles } from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab, onExitAdmin }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Gestão de Produtos", icon: Package },
    { id: "banners", label: "Banners da Hero", icon: Image, badge: "Dinâmico" },
    { id: "orders", label: "Gestão de Pedidos", icon: ShoppingCart },
    { id: "coupons", label: "Cupons de Desconto", icon: Tag },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800/80 min-h-screen flex flex-col justify-between p-4 shrink-0">
      
      <div className="space-y-6">
        
        {/* Brand Admin Logo */}
        <div className="flex items-center gap-3 px-2 py-2 border-b border-zinc-800/80 pb-4">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-amber-500/50 p-1.5 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M20 75 V25 L40 50 L60 25 V75" fill="none" stroke="#D4AF37" strokeWidth="12"/>
              <path d="M80 30 C80 30 62 25 62 42 C62 60 80 55 80 70 C80 80 62 75 62 75" fill="none" stroke="#D4AF37" strokeWidth="12"/>
            </svg>
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-sm text-white">MAYCON STORE</h2>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              Painel de Gestão
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                    isActive ? "bg-zinc-950 text-amber-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Exit Button */}
      <div className="pt-4 border-t border-zinc-900 space-y-2">
        <button
          onClick={onExitAdmin}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
        >
          <Store className="w-4 h-4 text-amber-500" />
          <span>Voltar para a Loja Pública</span>
        </button>
      </div>

    </aside>
  );
}
