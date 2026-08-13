import React, { useState } from "react";
import { Image, Plus, Trash2, Edit2, Check, Eye, EyeOff, Sparkles } from "lucide-react";

export default function BannerManager({
  banners = [],
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  // Form State
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ctaText, setCtaText] = useState("VER COMPRE AGORA");
  const [ctaLink, setCtaLink] = useState("#produtos");
  const [active, setActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(1);

  const handleOpenAddModal = () => {
    setEditingBanner(null);
    setBadge("NOVA CAMPANHA MAYCON STORE");
    setTitle("OVERSZIED GOLD COLLECTION");
    setSubtitle("Peças exclusivas com caimento pesado e bordado dourado 18k.");
    setImageUrl("https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80");
    setCtaText("GARANTIR MEU LOOK");
    setCtaLink("#produtos");
    setActive(true);
    setDisplayOrder(banners.length + 1);
    setModalOpen(true);
  };

  const handleOpenEditModal = (banner) => {
    setEditingBanner(banner);
    setBadge(banner.badge || "");
    setTitle(banner.title || "");
    setSubtitle(banner.subtitle || "");
    setImageUrl(banner.imageUrl || "");
    setCtaText(banner.ctaText || "VER COMPRE AGORA");
    setCtaLink(banner.ctaLink || "#produtos");
    setActive(banner.active ?? true);
    setDisplayOrder(banner.displayOrder || 1);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      alert("Preencha o título e o link da imagem do banner.");
      return;
    }

    const payload = {
      badge,
      title,
      subtitle,
      imageUrl,
      ctaText,
      ctaLink,
      active,
      displayOrder: parseInt(displayOrder, 10) || 1
    };

    if (editingBanner) {
      onUpdateBanner({ ...editingBanner, ...payload });
    } else {
      onAddBanner(payload);
    }

    setModalOpen(false);
  };

  const toggleBannerStatus = (banner) => {
    onUpdateBanner({ ...banner, active: !banner.active });
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight flex items-center gap-2">
            <span>Gestão dos Banners da Hero (Topo)</span>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase rounded">
              Tempo Real
            </span>
          </h1>
          <p className="text-xs text-zinc-400">
            Publique anúncios de campanhas de aniversário, promoções ou novidades que aparecem instantaneamente na Hero da loja.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>CRIAR NOVO BANNER</span>
        </button>
      </div>

      {/* Banner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`bg-zinc-900 border rounded-3xl overflow-hidden flex flex-col justify-between transition-all ${
              banner.active ? "border-zinc-800 hover:border-amber-500/40" : "border-zinc-800/40 opacity-60"
            }`}
          >
            {/* Banner Preview Image Header */}
            <div className="relative h-44 w-full bg-zinc-950">
              <img src={banner.imageUrl} alt="" className="w-full h-full object-cover filter brightness-[0.6]" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 bg-zinc-950/80 border border-zinc-700 text-amber-400 font-extrabold text-[10px] rounded-md">
                  Ordem: #{banner.displayOrder}
                </span>
                {banner.badge && (
                  <span className="px-2.5 py-1 bg-amber-500 text-zinc-950 font-black text-[10px] rounded-md uppercase">
                    {banner.badge}
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleBannerStatus(banner)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all ${
                    banner.active
                      ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                      : "bg-red-500/20 border border-red-500/50 text-red-400"
                  }`}
                >
                  {banner.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{banner.active ? "ATIVO NA LOJA" : "INATIVO"}</span>
                </button>
              </div>
            </div>

            {/* Banner Meta details */}
            <div className="p-5 space-y-2 flex-1">
              <h3 className="text-lg font-extrabold text-white font-heading">{banner.title}</h3>
              <p className="text-xs text-zinc-400">{banner.subtitle}</p>
              <div className="pt-2 text-[11px] text-amber-400 font-bold">
                Botão CTA: "{banner.ctaText}" ({banner.ctaLink})
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">ID: {banner.id}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(banner)}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Deseja excluir o banner "${banner.title}"?`)) {
                      onDeleteBanner(banner.id);
                    }
                  }}
                  className="p-1.5 bg-zinc-800 hover:bg-red-950 text-red-400 rounded-lg"
                  title="Excluir Banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ADD / EDIT BANNER MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative my-auto p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-xl font-extrabold text-white font-heading">
                {editingBanner ? "Editar Banner da Hero" : "Novo Banner Promocional"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Título Principal *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: ANIVERSÁRIO MAYCON STORE 15% OFF"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 uppercase"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Selo / Badge (Pequeno texto no topo)</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Ex: LANÇAMENTO EXCLUSIVO"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 uppercase"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Subtítulo / Descrição</label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ex: Coleção oversized com desconto especial por tempo limitado."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">URL da Imagem de Fundo *</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Texto do Botão CTA</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="GARANTIR MEU LOOK"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 uppercase"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Ordem de Exibição</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300 font-bold">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-0"
                  />
                  <span>Ativar Banner Imediatamente</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-xl uppercase tracking-wider"
                  >
                    Publicar Banner
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
