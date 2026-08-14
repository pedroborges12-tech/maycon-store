import React, { useState } from "react";
import { Plus, Pencil, Trash2, Check, X, Tag } from "lucide-react";

export default function CategoryManager({ categories, onAddCategory, onRenameCategory, onDeleteCategory, products = [] }) {
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const slugify = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddCategory({ name: newName.trim(), slug: newSlug.trim() || slugify(newName.trim()) });
    setNewName("");
    setNewSlug("");
  };

  const handleEditSave = (id) => {
    if (!editName.trim()) return;
    onRenameCategory(id, editName.trim());
    setEditingId(null);
    setEditName("");
  };

  const countProducts = (slug) => products.filter((p) => p.category === slug).length;

  return (
    <div className="space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
          Categorias
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Gerencie as categorias que aparecem nos filtros da loja pública.
        </p>
      </div>

      {/* Add Category Form */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-amber-400" />
          Nova Categoria
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="Nome da categoria (ex: Camisetas Oversized)"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
              setNewSlug(slugify(e.target.value));
            }}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Slug (auto)"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            className="w-40 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-400 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Adicionar
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">
            Categorias Cadastradas ({categories.length})
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="p-10 text-center">
            <Tag className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500 text-sm">Nenhuma categoria cadastrada.</p>
            <p className="text-zinc-600 text-xs mt-1">Adicione a primeira acima.</p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800/70">
            {categories.map((cat) => {
              const prodCount = countProducts(cat.slug);
              const isEditing = editingId === cat.id;
              const isConfirmDelete = confirmDeleteId === cat.id;

              return (
                <li key={cat.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-zinc-900/60 transition-colors gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Tag className="w-3.5 h-3.5" />
                    </div>

                    {isEditing ? (
                      <input
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleEditSave(cat.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        className="flex-1 bg-zinc-950 border border-amber-500 rounded-lg px-3 py-1.5 text-xs text-zinc-100 focus:outline-none"
                      />
                    ) : (
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-zinc-100 block truncate">{cat.name}</span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          slug: <span className="text-amber-400/70">{cat.slug}</span>
                          {" · "}
                          <span className={prodCount > 0 ? "text-zinc-400" : "text-zinc-600"}>
                            {prodCount} produto{prodCount !== 1 ? "s" : ""}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleEditSave(cat.id)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : isConfirmDelete ? (
                      <>
                        <span className="text-[11px] text-red-400 font-semibold">
                          {prodCount > 0 ? `${prodCount} produtos perderão categoria!` : "Confirmar exclusão?"}
                        </span>
                        <button
                          onClick={() => { onDeleteCategory(cat.id); setConfirmDeleteId(null); }}
                          className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold text-[11px] transition-all"
                        >
                          Excluir
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 font-bold text-[11px] hover:bg-zinc-700 transition-all"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-amber-400 hover:bg-zinc-700 transition-all"
                          title="Renomear"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(cat.id)}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-950/30 transition-all"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
