import { useState, useEffect } from "react";
import {
  Scissors, Shirt, Megaphone, Tag, Monitor, Flame, Droplets,
  Ruler, ShieldCheck, Wind, Star, X, CheckCircle, ArrowRight,
  Image, Columns, FileText, CreditCard, BookOpen, LayoutTemplate,
  TreePine, Hammer, Gem, Sparkles, Eye, Maximize2, PanelTop,
} from "lucide-react";
import {
  loadSiteData,
  type ProductTab,
} from "../store/siteData";
import { drawerContent } from "../data/products";

// ── Product Drawer ────────────────────────────────────────────────────────────

function ProductDrawer({
  productKey,
  tabColor,
  onClose,
}: {
  productKey: string | null;
  tabColor: string;
  onClose: () => void;
}) {
  const data = productKey ? drawerContent[productKey] : null;
  const color = tabColor || data?.accentColor || "#ffa300";
  const isOpen = !!data;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${!isOpen ? "hidden" : ""}`}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-full max-w-[560px] bg-white shadow-2xl flex flex-col overflow-y-auto"
        style={{
          transform: isOpen
            ? "translateX(0)"
            : "translateX(100%)",
          transition:
            "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {data && (
          <>
            {/* Hero image */}
            <div className="relative h-[240px] flex-shrink-0 overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)`,
                }}
              />
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors rounded-xl"
              >
                <X size={18} color="white" />
              </button>
              {/* Title */}
              <div className="absolute bottom-5 left-6 right-12">
                <p
                  className="text-white/75 text-[11px] mb-1 uppercase tracking-widest font-['Mulish',sans-serif]"
                >
                  {data.tagline}
                </p>
                <h2
                  className="text-white text-[26px] leading-tight font-['Mulish',sans-serif] font-extrabold"
                >
                  {data.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-7 p-7 flex-1">
              {/* Description */}
              <p
                className="text-[#555] text-[15px] leading-relaxed font-['Mulish',sans-serif]"
              >
                {data.description}
              </p>

              {/* Features */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ background: color }}
                  />
                  <h3
                    className="text-[#202b38] text-[15px] font-['Mulish',sans-serif] font-bold"
                  >
                    Ce primești
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {data.features.map(
                    ({ icon: Icon, label, desc }) => (
                      <div
                        key={label}
                        className="flex items-start gap-2.5 p-3 rounded-xl"
                        style={{
                          background: `${color}0d`,
                          border: `1px solid ${color}20`,
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: `${color}18`,
                          }}
                        >
                          <Icon
                            size={14}
                            color={color}
                            strokeWidth={2.2}
                          />
                        </div>
                        <div>
                          <p
                            className="text-[#202b38] text-[12px] leading-tight font-['Mulish',sans-serif] font-bold"
                          >
                            {label}
                          </p>
                          <p
                            className="text-[#75777a] text-[11px] mt-0.5 leading-snug font-['Mulish',sans-serif]"
                          >
                            {desc}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Materials */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ background: color }}
                  />
                  <h3
                    className="text-[#202b38] text-[15px] font-['Mulish',sans-serif] font-bold"
                  >
                    Materiale disponibile
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.materials.map((name) => (
                    <span
                      key={name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-['Mulish',sans-serif]"
                      style={{
                        borderColor: `${color}55`,
                        color: color,
                        background: `${color}0d`,
                      }}
                    >
                      <CheckCircle
                        size={10}
                        color={color}
                        strokeWidth={2.5}
                      />
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full flex items-center justify-center gap-2 py-4 text-white text-[12px] tracking-[0.84px] uppercase transition-colors hover:opacity-85 active:scale-[0.98] mt-auto font-['Inter',sans-serif] font-semibold rounded-xl"
                style={{
                  background: color,
                }}
              >
                {data.cta}
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// One representative icon per product
const CARD_ICON: Record<string, React.ElementType> = {
  "Stikere Standard": Tag,
  Standard: Tag,
  Transparente: Eye,
  Holografice: Sparkles,
  "Die-Cut": Scissors,
  Tricouri: Shirt,
  Hanorace: Wind,
  Bluze: Shirt,
  Kids: Star,
  "Canvas Clasic": Image,
  "Canvas Panoramic": Maximize2,
  "Canvas Multi-Panou": Columns,
  "Roll-Up": PanelTop,
  "Banner Exterior": Megaphone,
  "Mesh Banner": Wind,
  "Afișe Print": FileText,
  Flyere: FileText,
  "Cărți de Vizită": CreditCard,
  "Broșuri & Pliante": BookOpen,
  Postere: LayoutTemplate,
  "Gravură Lemn": TreePine,
  "Gravură Metal": Hammer,
  "Gravură Acril": Gem,
};

// ── Single product card (Figma design) ───────────────────────────────────────

function ProductCard({
  title,
  tabColor,
  tabColorLight,
  onClick,
}: {
  title: string;
  tabColor: string;
  tabColorLight: string;
  onClick: () => void;
}) {
  const Icon = CARD_ICON[title] ?? Tag;
  const cardImage = drawerContent[title]?.image;

  return (
    <div
      onClick={onClick}
      className="flex flex-col cursor-pointer group overflow-hidden rounded-xl"
      style={{ border: `1px solid ${tabColor}` }}
    >
      {/* Image or icon area */}
      <div
        className="w-full h-[240px] flex items-center justify-center overflow-hidden"
        style={{ background: tabColorLight }}
      >
        {cardImage ? (
          <img
            src={cardImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Icon size={46} color={tabColor} strokeWidth={1.3} />
        )}
      </div>

      {/* Info area */}
      <div className="flex flex-col gap-4 p-4 bg-white">
        <p className="text-[#202b38] text-[16px] leading-snug font-['Mulish',sans-serif] font-bold">
          {title}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-['Mulish',sans-serif] font-semibold text-[#445e79] group-hover:text-[#202b38] transition-colors">
            Vezi detalii
          </span>
          <svg width="4" height="7" fill="none" viewBox="0 0 4 7">
            <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#445e79" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Label with triangle icon ──────────────────────────────────────────────────

function SectionLabel({ text, color = "#ffa300" }: { text: string; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="19"
        height="24"
        fill="none"
        viewBox="0 0 18.3439 23.6943"
      >
        <path
          d="M0 0V23.6899L18.3439 23.6943L0 0Z"
          fill={color}
          style={{ transition: "fill 0.3s ease" }}
        />
      </svg>
      <span
        className="text-[18px] text-[#445e79] font-['Mulish',sans-serif]"
      >
        {text}
      </span>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function ProductsSection() {
  const [productTabs, setProductTabs] = useState<ProductTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("");
  const [openProduct, setOpenProduct] = useState<string | null>(null);

  useEffect(() => {
    const data = loadSiteData();
    setProductTabs(data.productTabs);
    if (data.productTabs.length > 0) {
      setActiveTabId(data.productTabs[0].id);
    }
  }, []);

  const activeTab = productTabs.find((t) => t.id === activeTabId);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(activeTabId === tabId ? "" : tabId);
  };

  return (
    <>
      <ProductDrawer
        productKey={openProduct}
        tabColor={activeTab?.color ?? "#ffa300"}
        onClose={() => setOpenProduct(null)}
      />

      <section className="w-full bg-white py-20">
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <SectionLabel text="Explorează" color={activeTab?.color ?? "#ffa300"} />
          <h2
            className="text-[#202b38] leading-tight font-['Mulish',sans-serif] font-extrabold"
            style={{ fontSize: "clamp(32px, 3.3vw, 47.5px)" }}
          >
            Ce poți comanda
          </h2>
        </div>

        {/* Filter tabs — Figma style */}
        <div className="flex flex-wrap gap-2">
          {productTabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="px-5 py-2.5 text-[12px] tracking-[0.84px] uppercase transition-colors font-['Inter',sans-serif] font-semibold rounded-xl"
                style={
                  isActive
                    ? { background: tab.color, color: "#fff", border: `1px solid ${tab.color}` }
                    : { border: "1px solid #99aec5", color: "#445e79" }
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product cards — grid, only visible when a tab is selected */}
        {activeTab && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeTab.products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                tabColor={activeTab.color}
                tabColorLight={activeTab.colorLight}
                onClick={() => setOpenProduct(product.title)}
              />
            ))}
          </div>
        )}

        </div>
      </section>
    </>
  );
}