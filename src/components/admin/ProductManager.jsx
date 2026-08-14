import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, Package, Check, X, Sparkles, Image as ImageIcon } from "lucide-react";
import { SIZES } from "../store/ProductFilters";

export default function ProductManager({
  products = [],
  categories = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) {
  // Build filter tabs: all + dynamic categories
  const categoryTabs = [
    { id: "todas", label: "Todas" },
    ...categories.map((c) => ({ id: c.slug, label: c.name }))
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("camisetas");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [selectedSizes, setSelectedSizes] = useState(["P", "M", "G", "GG"]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "todas" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName("");
    setCategory("camisetas");
    setPrice("");
    setOriginalPrice("");
    setStock("10");
    setDescription("");
    setImageUrl1("https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80");
    setImageUrl2("");
    setSelectedSizes(["P", "M", "G", "GG"]);
    setModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price.toString());
    setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : "");
    setStock(product.stock.toString());
    setDescription(product.description || "");
    setImageUrl1(product.images[0] || "");
    setImageUrl2(product.images[1] || "");
    setSelectedSizes(product.sizes || ["P", "M", "G", "GG"]);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Preencha o nome e preço do produto.");
      return;
    }

    const images = [imageUrl1];
    if (imageUrl2) images.push(imageUrl2);

    const productPayload = {
      name,
      category,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      stock: parseInt(stock, 10) || 0,
      description,
      images,
      sizes: selectedSizes,
      colors: [
        { name: "Preto Gold", hex: "#09090B" },
        { name: "Off White", hex: "#F4F4F0" }
      ],
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      isNew: true
    };

    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...productPayload });
    } else {
      onAddProduct(productPayload);
    }

    setModalOpen(false);
  };

  const toggleSize = (sz) => {
    if (selectedSizes.includes(sz)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== sz));
    } else {
      setSelectedSizes([...selectedSizes, sz]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
            Gestão de Produtos
          </h1>
          <p className="text-xs text-zinc-400">
            Cadastre novos itens (camisetas, polos, bermudas, tênis, acessórios) e edite preços e estoque.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>NOVO PRODUTO</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {categoryTabs.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all uppercase ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-zinc-950"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 uppercase">
              <tr>
                <th className="p-4">Produto</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Estoque</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">
                    Nenhum produto cadastrado nesta categoria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="p-4 font-bold text-zinc-100 flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover bg-zinc-950 border border-zinc-800 shrink-0"
                      />
                      <div>
                        <span className="block">{p.name}</span>
                        <div className="flex gap-1 mt-1">
                          {p.sizes.map((s) => (
                            <span key={s} className="px-1 text-[9px] bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    <td className="p-4 uppercase text-amber-400 font-bold">
                      {p.category}
                    </td>

                    <td className="p-4">
                      <div className="font-extrabold text-white">R$ {p.price.toFixed(2)}</div>
                      {p.originalPrice && (
                        <div className="text-[10px] text-zinc-500 line-through">
                          R$ {p.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          p.stock > 5
                            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                            : "bg-red-500/20 border border-red-500/40 text-red-400"
                        }`}
                      >
                        {p.stock} em estoque
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 rounded-lg transition-all"
                          title="Editar Produto"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Deseja realmente excluir "${p.name}"?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="p-2 bg-zinc-800 hover:bg-red-950 text-red-400 rounded-lg transition-all"
                          title="Excluir Produto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-auto p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-xl font-extrabold text-white font-heading">
                {editingProduct ? "Editar Produto" : "Cadastrar Novo Produto"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Nome do Produto *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Camiseta Oversized MS Heavy Gold"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Categoria *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100"
                  >
                    {categories.length === 0 && (
                      <option value="">— Cadastre categorias primeiro —</option>
                    )}
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Preço Atual (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="159.90"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Preço Antigo (De: R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="199.90"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Estoque (Unidades)</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Tamanhos Disponíveis</label>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {SIZES.slice(0, 8).map((sz) => (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          selectedSizes.includes(sz)
                            ? "bg-amber-500 text-zinc-950"
                            : "bg-zinc-950 border border-zinc-800 text-zinc-500"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">URL Foto Principal</label>
                <input
                  type="url"
                  value={imageUrl1}
                  onChange={(e) => setImageUrl1(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">URL Foto Secundária (Hover)</label>
                <input
                  type="url"
                  value={imageUrl2}
                  onChange={(e) => setImageUrl2(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Descrição Detalhada</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black uppercase tracking-wider shadow-md shadow-amber-500/20"
                >
                  {editingProduct ? "Salvar Alterações" : "Cadastrar Produto"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
