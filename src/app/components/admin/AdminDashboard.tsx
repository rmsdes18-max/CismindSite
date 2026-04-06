import { useState, useEffect, useRef } from "react";
import {
  Settings, Image, Grid3X3, Save, Plus, Trash2,
  RotateCcw, CheckCircle, X, ExternalLink, Edit3,
  Package, Mail, ShieldCheck, AlertTriangle,
} from "lucide-react";
import {
  loadSiteData, saveSiteData, resetSiteData,
  type SiteData, type GalleryPhoto, type ProductTab, type ProductCard,
  ACCENT_COLORS, DEFAULT_SITE_DATA,
} from "../../store/siteData";

// ── Notification toast ────────────────────────────────────────────────────────

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-3 px-5 py-3 text-white text-[13px]"
      style={{ background: "#222b37", fontFamily: "Inter, sans-serif", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
    >
      <CheckCircle size={16} color="#f5a623" />
      {message}
    </div>
  );
}

// ── Sidebar nav (desktop) ────────────────────────────���────────────────────────

type AdminTab = "gallery" | "products" | "settings";

function Sidebar({ active, onChange }: { active: AdminTab; onChange: (t: AdminTab) => void }) {
  const items: { id: AdminTab; icon: React.ElementType; label: string }[] = [
    { id: "gallery", icon: Image, label: "Galerie Foto" },
    { id: "products", icon: Grid3X3, label: "Produse & Tab-uri" },
    { id: "settings", icon: Settings, label: "Setări" },
  ];

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col" style={{ background: "#141820", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Logo */}
      <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="flex gap-1 mb-3">
          {["#d30052", "#5e3279", "#222b37", "#f5a623"].map((c) => (
            <div key={c} className="h-1 flex-1" style={{ background: c }} />
          ))}
        </div>
        <p className="text-white text-[15px]" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 800 }}>
          Cismind Admin
        </p>
        <p className="text-white/30 text-[11px] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          Panou de administrare
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {items.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex items-center gap-3 px-4 py-3 text-[13px] text-left transition-colors"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: active === id ? 600 : 400,
              background: active === id ? "rgba(211,0,82,0.12)" : "transparent",
              color: active === id ? "#d30052" : "rgba(255,255,255,0.5)",
              borderLeft: active === id ? "2px solid #d30052" : "2px solid transparent",
            }}
          >
            <Icon size={15} strokeWidth={active === id ? 2.5 : 1.8} />
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-white/30 hover:text-white/60 transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <ExternalLink size={13} />
          Vezi site-ul
        </a>
      </div>
    </aside>
  );
}

// ── Bottom nav (mobile) ───────────────────────────────────────────────────────

function BottomNav({ active, onChange }: { active: AdminTab; onChange: (t: AdminTab) => void }) {
  const items: { id: AdminTab; icon: React.ElementType; label: string }[] = [
    { id: "gallery", icon: Image, label: "Galerie" },
    { id: "products", icon: Grid3X3, label: "Produse" },
    { id: "settings", icon: Settings, label: "Setări" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center"
      style={{ background: "#141820", borderTop: "1px solid rgba(255,255,255,0.1)", height: "64px" }}
    >
      {items.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors"
          style={{ color: active === id ? "#d30052" : "rgba(255,255,255,0.4)" }}
        >
          <Icon size={20} strokeWidth={active === id ? 2.5 : 1.8} />
          <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", fontWeight: active === id ? 700 : 400 }}>
            {label}
          </span>
        </button>
      ))}
      <a
        href="/"
        className="flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        <ExternalLink size={20} strokeWidth={1.8} />
        <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
          Site
        </span>
      </a>
    </nav>
  );
}

// ── Gallery editor ────────────────────────────────────────────────────────────

function GalleryEditor({
  photos,
  onChange,
}: {
  photos: GalleryPhoto[];
  onChange: (photos: GalleryPhoto[]) => void;
}) {
  const [newPhoto, setNewPhoto] = useState<Omit<GalleryPhoto, "id">>({
    src: "",
    label: "",
    tag: "",
    accent: "#d30052",
  });
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);

  function updatePhoto(id: string, field: keyof GalleryPhoto, value: string) {
    onChange(photos.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function deletePhoto(id: string) {
    onChange(photos.filter((p) => p.id !== id));
  }

  function addPhoto() {
    if (!newPhoto.src || !newPhoto.label) return;
    const photo: GalleryPhoto = { ...newPhoto, id: `g${Date.now()}` };
    onChange([...photos, photo]);
    setNewPhoto({ src: "", label: "", tag: "", accent: "#d30052" });
    setAddOpen(false);
  }

  function handleFileUpload(file: File, onUrl: (url: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => { if (e.target?.result) onUrl(e.target.result as string); };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-white text-[18px] sm:text-[20px]" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 800 }}>
            Galerie Foto
          </h2>
          <p className="text-white/40 text-[12px] sm:text-[13px] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            {photos.length} fotografii · modifică, adaugă sau șterge
          </p>
        </div>
        <button
          onClick={() => setAddOpen(!addOpen)}
          className="flex items-center gap-2 px-4 py-2.5 text-white text-[11px] sm:text-[12px] tracking-[0.7px] uppercase transition-colors hover:opacity-85 flex-shrink-0"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, background: "#d30052" }}
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Adaugă fotografie</span>
          <span className="sm:hidden">Adaugă</span>
        </button>
      </div>

      {/* Add form */}
      {addOpen && (
        <div className="p-4 sm:p-5 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-white text-[14px]" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>
            Fotografie nouă
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Upload from device */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/50 text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                Încarcă de pe dispozitiv
              </label>
              <button
                onClick={() => newFileInputRef.current?.click()}
                className="w-full px-4 py-2.5 text-white/60 text-[12px] uppercase tracking-wider transition-colors hover:text-white text-left flex items-center gap-2"
                style={{ border: "1px dashed rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.03)", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
              >
                <Plus size={14} />
                Alege fișier (foto/cameră)
              </button>
              <input
                ref={newFileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, (url) => setNewPhoto({ ...newPhoto, src: url }));
                }}
              />
            </div>
            <FieldInput
              label="Sau introdu URL imagine"
              placeholder="https://images.unsplash.com/..."
              value={newPhoto.src.startsWith("data:") ? "" : newPhoto.src}
              onChange={(v) => setNewPhoto({ ...newPhoto, src: v })}
            />
            <FieldInput
              label="Nume / Titlu *"
              placeholder="ex: Stikere Die-Cut"
              value={newPhoto.label}
              onChange={(v) => setNewPhoto({ ...newPhoto, label: v })}
            />
            <FieldInput
              label="Tag categorie"
              placeholder="ex: Stikere, Textile, Gravură"
              value={newPhoto.tag}
              onChange={(v) => setNewPhoto({ ...newPhoto, tag: v })}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-white/50 text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                Culoare accent
              </label>
              <AccentPicker value={newPhoto.accent} onChange={(v) => setNewPhoto({ ...newPhoto, accent: v })} />
            </div>
          </div>

          {/* Preview */}
          {newPhoto.src && (
            <div className="flex items-center gap-3 p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <img src={newPhoto.src} alt="preview" className="w-20 h-14 object-cover flex-shrink-0" onError={(e) => (e.currentTarget.style.display = "none")} />
              <div>
                <p className="text-white text-[13px]" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 600 }}>{newPhoto.label || "—"}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-white text-[10px]" style={{ background: newPhoto.accent, fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>
                  {newPhoto.tag || "TAG"}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={addPhoto}
              disabled={!newPhoto.src || !newPhoto.label}
              className="flex-1 sm:flex-none px-6 py-2.5 text-white text-[12px] tracking-[0.84px] uppercase transition-colors hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, background: "#d30052" }}
            >
              Adaugă
            </button>
            <button
              onClick={() => setAddOpen(false)}
              className="flex-1 sm:flex-none px-6 py-2.5 text-white/50 text-[12px] tracking-[0.84px] uppercase transition-colors hover:text-white border border-white/10"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Anulează
            </button>
          </div>
        </div>
      )}

      {/* Photo list */}
      <div className="flex flex-col gap-3">
        {photos.map((photo, idx) => (
          <PhotoRow
            key={photo.id}
            photo={photo}
            index={idx}
            isEditing={editId === photo.id}
            onToggleEdit={() => setEditId(editId === photo.id ? null : photo.id)}
            onUpdate={(field, value) => updatePhoto(photo.id, field, value)}
            onDelete={() => deletePhoto(photo.id)}
          />
        ))}
        {photos.length === 0 && (
          <div className="py-16 text-center text-white/25 text-[14px]" style={{ fontFamily: "Mulish, sans-serif" }}>
            Nicio fotografie. Apasă „Adaugă fotografie" pentru a începe.
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoRow({
  photo, index, isEditing, onToggleEdit, onUpdate, onDelete,
}: {
  photo: GalleryPhoto;
  index: number;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdate: (field: keyof GalleryPhoto, value: string) => void;
  onDelete: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => { if (e.target?.result) onUpdate("src", e.target.result as string); };
    reader.readAsDataURL(file);
  }

  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.08)", background: isEditing ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)" }}>
      {/* Row header */}
      <div className="flex items-center gap-3 p-3 sm:p-4">
        <span className="text-white/20 text-[12px] w-4 text-right flex-shrink-0 hidden sm:block" style={{ fontFamily: "Inter, sans-serif" }}>
          {index + 1}
        </span>
        <img
          src={photo.src}
          alt={photo.label}
          className="w-14 h-10 sm:w-20 sm:h-14 object-cover flex-shrink-0"
          style={{ background: "#2a2f3e" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.background = "#2a2f3e"; }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-white text-[13px] sm:text-[14px] truncate" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 600 }}>
            {photo.label}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 text-white text-[10px]" style={{ background: photo.accent, fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>
              {photo.tag}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            onClick={onToggleEdit}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[11px] uppercase tracking-wider transition-colors"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              color: isEditing ? "#f5a623" : "rgba(255,255,255,0.4)",
              border: `1px solid ${isEditing ? "#f5a623" : "rgba(255,255,255,0.1)"}`,
            }}
          >
            <Edit3 size={11} />
            <span className="hidden sm:inline">{isEditing ? "Închide" : "Editează"}</span>
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-red-500/10"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Trash2 size={13} color="#d30052" />
          </button>
        </div>
      </div>

      {/* Edit fields */}
      {isEditing && (
        <div className="px-3 sm:px-4 pb-4 sm:pb-5 pt-1 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Upload from device */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
              Schimbă imaginea
            </label>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2.5 text-white/60 text-[12px] uppercase tracking-wider transition-colors hover:text-white text-left flex items-center gap-2"
              style={{ border: "1px dashed rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.03)", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              <Plus size={14} />
              Încarcă de pe dispozitiv (foto/cameră)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldInput
              label="Sau URL imagine"
              value={photo.src.startsWith("data:") ? "" : photo.src}
              onChange={(v) => onUpdate("src", v)}
              placeholder="https://..."
            />
            <FieldInput
              label="Titlu fotografie"
              value={photo.label}
              onChange={(v) => onUpdate("label", v)}
              placeholder="ex: Stikere Die-Cut"
            />
            <FieldInput
              label="Tag categorie"
              value={photo.tag}
              onChange={(v) => onUpdate("tag", v)}
              placeholder="ex: Stikere"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-white/50 text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                Culoare accent
              </label>
              <AccentPicker value={photo.accent} onChange={(v) => onUpdate("accent", v)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Products & Tabs editor ────────────────────────────────────────────────────

function ProductsEditor({
  tabs,
  onChange,
}: {
  tabs: ProductTab[];
  onChange: (tabs: ProductTab[]) => void;
}) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");
  const [newTabLabel, setNewTabLabel] = useState("");
  const [newProductTitle, setNewProductTitle] = useState("");

  const activeTab = tabs.find((t) => t.id === activeTabId);

  function updateTabLabel(id: string, label: string) {
    onChange(tabs.map((t) => (t.id === id ? { ...t, label } : t)));
  }

  function deleteTab(id: string) {
    const remaining = tabs.filter((t) => t.id !== id);
    onChange(remaining);
    if (activeTabId === id) setActiveTabId(remaining[0]?.id ?? "");
  }

  function addTab() {
    if (!newTabLabel.trim()) return;
    const tab: ProductTab = { id: `tab-${Date.now()}`, label: newTabLabel.trim(), products: [] };
    onChange([...tabs, tab]);
    setNewTabLabel("");
    setActiveTabId(tab.id);
  }

  function updateProduct(tabId: string, productId: string, title: string) {
    onChange(tabs.map((t) =>
      t.id === tabId
        ? { ...t, products: t.products.map((p) => (p.id === productId ? { ...p, title } : p)) }
        : t
    ));
  }

  function deleteProduct(tabId: string, productId: string) {
    onChange(tabs.map((t) =>
      t.id === tabId ? { ...t, products: t.products.filter((p) => p.id !== productId) } : t
    ));
  }

  function addProduct() {
    if (!newProductTitle.trim() || !activeTabId) return;
    const product: ProductCard = { id: `p${Date.now()}`, title: newProductTitle.trim() };
    onChange(tabs.map((t) =>
      t.id === activeTabId ? { ...t, products: [...t.products, product] } : t
    ));
    setNewProductTitle("");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-white text-[18px] sm:text-[20px]" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 800 }}>
          Produse & Tab-uri
        </h2>
        <p className="text-white/40 text-[12px] sm:text-[13px] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          Gestionează categoriile (tab-uri) și produsele din secțiunea „Explorează"
        </p>
      </div>

      {/* Tab list */}
      <div className="flex flex-col gap-3">
        <p className="text-white/50 text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
          Categorii (tab-uri)
        </p>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="flex items-center"
              style={{ border: `1px solid ${activeTabId === tab.id ? "#d30052" : "rgba(255,255,255,0.1)"}` }}
            >
              <button
                onClick={() => setActiveTabId(tab.id)}
                className="px-3 sm:px-4 py-2 text-[12px] uppercase tracking-wider transition-colors"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  color: activeTabId === tab.id ? "#d30052" : "rgba(255,255,255,0.5)",
                  background: activeTabId === tab.id ? "rgba(211,0,82,0.08)" : "transparent",
                }}
              >
                {tab.label}
              </button>
              <button
                onClick={() => deleteTab(tab.id)}
                className="w-7 h-full flex items-center justify-center border-l transition-colors hover:bg-red-500/10"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <X size={11} color="#d30052" />
              </button>
            </div>
          ))}
        </div>

        {/* Add tab */}
        <div className="flex gap-2 mt-1">
          <input
            value={newTabLabel}
            onChange={(e) => setNewTabLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTab()}
            placeholder="Nume categorie nouă..."
            className="px-3 sm:px-4 py-2 text-white text-[13px] outline-none flex-1"
            style={{ fontFamily: "Inter, sans-serif", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <button
            onClick={addTab}
            disabled={!newTabLabel.trim()}
            className="px-4 sm:px-5 py-2 text-white text-[12px] uppercase tracking-wider transition-colors hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, background: "#5e3279" }}
          >
            <Plus size={13} />
            <span className="hidden sm:inline">Adaugă</span>
          </button>
        </div>
      </div>

      {/* Tab detail editor */}
      {activeTab && (
        <div className="flex flex-col gap-5 p-4 sm:p-5" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center gap-3">
            <div className="w-1 h-6" style={{ background: "#d30052" }} />
            <p className="text-white text-[14px] sm:text-[15px]" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>
              Categoria: {activeTab.label}
            </p>
          </div>

          <FieldInput
            label="Redenumește categoria"
            value={activeTab.label}
            onChange={(v) => updateTabLabel(activeTab.id, v)}
            placeholder="Nume categorie"
          />

          {/* Products list */}
          <div className="flex flex-col gap-2">
            <p className="text-white/50 text-[11px] uppercase tracking-widest mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
              Produse în această categorie ({activeTab.products.length})
            </p>
            {activeTab.products.map((product, idx) => (
              <div
                key={product.id}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
              >
                <span className="text-white/20 text-[11px] w-4 text-right flex-shrink-0 hidden sm:block" style={{ fontFamily: "Inter, sans-serif" }}>
                  {idx + 1}
                </span>
                <Package size={13} color="#5e3279" className="flex-shrink-0" />
                <input
                  value={product.title}
                  onChange={(e) => updateProduct(activeTab.id, product.id, e.target.value)}
                  className="flex-1 bg-transparent text-white text-[13px] outline-none border-b border-transparent focus:border-white/20 transition-colors"
                  style={{ fontFamily: "Mulish, sans-serif", fontWeight: 600 }}
                />
                <button
                  onClick={() => deleteProduct(activeTab.id, product.id)}
                  className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-red-500/10 flex-shrink-0"
                >
                  <Trash2 size={13} color="#d30052" />
                </button>
              </div>
            ))}
            {activeTab.products.length === 0 && (
              <p className="text-white/20 text-[13px] py-4 text-center" style={{ fontFamily: "Mulish, sans-serif" }}>
                Niciun produs în această categorie
              </p>
            )}

            {/* Add product */}
            <div className="flex gap-2 mt-1">
              <input
                value={newProductTitle}
                onChange={(e) => setNewProductTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addProduct()}
                placeholder="Titlu produs nou..."
                className="px-3 sm:px-4 py-2.5 text-white text-[13px] outline-none flex-1"
                style={{ fontFamily: "Inter, sans-serif", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
              <button
                onClick={addProduct}
                disabled={!newProductTitle.trim()}
                className="px-4 sm:px-5 py-2 text-white text-[12px] uppercase tracking-wider transition-colors hover:opacity-85 disabled:opacity-40 flex items-center gap-2"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, background: "#d30052" }}
              >
                <Plus size={13} />
                <span className="hidden sm:inline">Adaugă</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Reusable field input ──────────────────────────────────────────────────────

function FieldInput({
  label, value, onChange, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/50 text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-2.5 text-white text-[13px] outline-none transition-colors"
        style={{ fontFamily: "Inter, sans-serif", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(245,166,35,0.6)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
      />
    </div>
  );
}

// ── Accent color picker ───────────────────────────────────────────────────────

function AccentPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ACCENT_COLORS.map(({ label, value: c }) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          title={label}
          className="w-7 h-7 transition-transform hover:scale-110"
          style={{
            background: c,
            outline: value === c ? `2px solid white` : "2px solid transparent",
            outlineOffset: "2px",
          }}
        />
      ))}
    </div>
  );
}

// ── Settings editor ───────────────────────────────────────────────────────────

function SettingsEditor({
  contactEmail,
  onChange,
}: {
  contactEmail: string;
  onChange: (email: string) => void;
}) {
  const [localEmail, setLocalEmail] = useState(contactEmail);
  const [emailError, setEmailError] = useState("");

  useEffect(() => { setLocalEmail(contactEmail); }, [contactEmail]);

  function handleEmailChange(v: string) {
    setLocalEmail(v);
    setEmailError("");
    if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setEmailError("Adresa de email nu este validă");
    } else {
      onChange(v);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-white text-[18px] sm:text-[20px]" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 800 }}>
          Setări
        </h2>
        <p className="text-white/40 text-[12px] sm:text-[13px] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          Configurări generale pentru site
        </p>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:p-6" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(211,0,82,0.15)" }}>
            <Mail size={15} color="#d30052" />
          </div>
          <div>
            <p className="text-white text-[14px]" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>
              Email pentru comenzi
            </p>
            <p className="text-white/35 text-[12px]" style={{ fontFamily: "Inter, sans-serif" }}>
              Toate comenzile trimise prin formular vor ajunge la această adresă
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
            Adresă email destinatar
          </label>
          <div className="relative">
            <Mail size={14} color="#ffffff30" className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={localEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="exemplu@gmail.com"
              className="w-full pl-10 pr-4 py-3 text-white text-[14px] outline-none transition-colors"
              style={{
                fontFamily: "Inter, sans-serif",
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${emailError ? "#d30052" : "rgba(255,255,255,0.12)"}`,
              }}
              onFocus={(e) => !emailError && (e.target.style.borderColor = "rgba(245,166,35,0.6)")}
              onBlur={(e) => !emailError && (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
            />
          </div>
          {emailError ? (
            <p className="text-[#d30052] text-[12px] flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
              <AlertTriangle size={11} />
              {emailError}
            </p>
          ) : localEmail && (
            <p className="text-white/30 text-[12px] flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
              <CheckCircle size={11} color="#16a34a" />
              Comenzile vor fi trimise la <span className="text-white/60 ml-1">{localEmail}</span>
            </p>
          )}
        </div>

        <div className="p-3 flex items-start gap-2.5" style={{ background: "rgba(245,166,35,0.07)", border: "1px solid rgba(245,166,35,0.15)" }}>
          <ShieldCheck size={13} color="#f5a623" className="flex-shrink-0 mt-0.5" />
          <p className="text-white/40 text-[12px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Apasă <strong className="text-white/60">Salvează</strong> din bara de sus după ce modifici emailul.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Dashboard ──────────────────────────────────────────────────────

const TAB_LABELS: Record<AdminTab, string> = {
  gallery: "Galerie Foto",
  products: "Produse & Tab-uri",
  settings: "Setări",
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("gallery");
  const [data, setData] = useState<SiteData>(() => loadSiteData());
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function updateData(partial: Partial<SiteData>) {
    setData((prev) => ({ ...prev, ...partial }));
    setDirty(true);
  }

  function handleSave() {
    saveSiteData(data);
    setDirty(false);
    setToast("Modificările au fost salvate!");
  }

  function handleReset() {
    if (!confirm("Ești sigur? Toate modificările vor fi șterse și datele vor reveni la cele originale.")) return;
    resetSiteData();
    setData(DEFAULT_SITE_DATA);
    setDirty(false);
    setToast("Date resetate la valorile originale.");
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#1a1f29", fontFamily: "Inter, sans-serif" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b flex-shrink-0 gap-2"
          style={{ borderColor: "rgba(255,255,255,0.07)", background: "#141820" }}
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Brand dots on mobile */}
            <div className="flex gap-0.5 md:hidden flex-shrink-0">
              {["#d30052", "#5e3279", "#222b37", "#f5a623"].map((c) => (
                <div key={c} className="w-3 h-3" style={{ background: c }} />
              ))}
            </div>
            <span className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-widest truncate">
              {TAB_LABELS[activeTab]}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {dirty && (
              <span className="text-[#f5a623] text-[11px] sm:text-[12px] flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
                <span className="hidden sm:inline">Modificări nesalvate</span>
              </span>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-white/40 text-[11px] sm:text-[12px] uppercase tracking-wider transition-colors hover:text-white/70 border border-white/10"
              style={{ fontWeight: 600 }}
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 text-white text-[11px] sm:text-[12px] uppercase tracking-wider transition-colors hover:opacity-85"
              style={{ fontWeight: 600, background: dirty ? "#d30052" : "#333b49" }}
            >
              <Save size={13} />
              Salvează
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
          {activeTab === "gallery" && (
            <GalleryEditor
              photos={data.galleryPhotos}
              onChange={(photos) => updateData({ galleryPhotos: photos })}
            />
          )}
          {activeTab === "products" && (
            <ProductsEditor
              tabs={data.productTabs}
              onChange={(productTabs) => updateData({ productTabs })}
            />
          )}
          {activeTab === "settings" && (
            <SettingsEditor
              contactEmail={data.contactEmail}
              onChange={(contactEmail) => updateData({ contactEmail })}
            />
          )}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
