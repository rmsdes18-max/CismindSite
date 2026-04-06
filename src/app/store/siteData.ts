// ── Central site data store (localStorage-backed) ────────────────────────────
// All editable content lives here. Components read from this store.
// Admin dashboard writes to this store.

export type GalleryPhoto = {
  id: string;
  src: string;
  label: string;
  tag: string;
  accent: string;
};

export type ProductCard = {
  id: string;
  title: string;
};

export type ProductTab = {
  id: string;
  label: string;
  products: ProductCard[];
};

export type SiteData = {
  galleryPhotos: GalleryPhoto[];
  productTabs: ProductTab[];
  exploreSectionTitle: string;
  exploreSectionSubtitle: string;
  contactEmail: string;
};

// ── Default data ──────────────────────────────────────────────────────────────

export const DEFAULT_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1609837784093-0d850eca5fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Stikere Die-Cut",
    tag: "Stikere",
    accent: "#d30052",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1773525912476-213bff96b8a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Tricouri Personalizate",
    tag: "Textile",
    accent: "#5e3279",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1685643096239-9b517edf150f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Tablouri Canvas",
    tag: "Canvas",
    accent: "#222b37",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1670067608901-236c6d61d215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Rulouri Vinil Color",
    tag: "Stikere",
    accent: "#d30052",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1617355405361-29f0f0a3d737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Roll-Up & Bannere",
    tag: "Bannere",
    accent: "#f5a623",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1718670013921-2f144aba173a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Cărți de Vizită",
    tag: "Print Digital",
    accent: "#222b37",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1693031630369-bd429a57f115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Print Format Mare",
    tag: "Bannere",
    accent: "#f5a623",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1774520504555-1afc8a82e024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Gravură Lemn",
    tag: "Gravură",
    accent: "#5e3279",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1695634281181-b2357af34c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Broșuri & Flyere",
    tag: "Print Digital",
    accent: "#d30052",
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1585377038583-e23df03ec7fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    label: "Gravură Acril",
    tag: "Gravură",
    accent: "#222b37",
  },
];

export const DEFAULT_PRODUCT_TABS: ProductTab[] = [
  {
    id: "tab-stikere",
    label: "Stikere",
    products: [
      { id: "p1", title: "Stikere Standard" },
      { id: "p2", title: "Transparente" },
      { id: "p3", title: "Holografice" },
      { id: "p4", title: "Die-Cut" },
    ],
  },
  {
    id: "tab-textile",
    label: "Textile",
    products: [
      { id: "p5", title: "Tricouri" },
      { id: "p6", title: "Hanorace" },
      { id: "p7", title: "Bluze" },
      { id: "p8", title: "Kids" },
    ],
  },
  {
    id: "tab-canva",
    label: "Canva",
    products: [
      { id: "p9", title: "Canvas Clasic" },
      { id: "p10", title: "Canvas Panoramic" },
      { id: "p11", title: "Canvas Multi-Panou" },
    ],
  },
  {
    id: "tab-bannere",
    label: "Bannere",
    products: [
      { id: "p12", title: "Roll-Up" },
      { id: "p13", title: "Banner Exterior" },
      { id: "p14", title: "Mesh Banner" },
      { id: "p15", title: "Afișe Print" },
    ],
  },
  {
    id: "tab-print",
    label: "Print Digital",
    products: [
      { id: "p16", title: "Flyere" },
      { id: "p17", title: "Cărți de Vizită" },
      { id: "p18", title: "Broșuri & Pliante" },
      { id: "p19", title: "Postere" },
    ],
  },
  {
    id: "tab-gravura",
    label: "Gravura",
    products: [
      { id: "p20", title: "Gravură Lemn" },
      { id: "p21", title: "Gravură Metal" },
      { id: "p22", title: "Gravură Acril" },
    ],
  },
];

export const DEFAULT_SITE_DATA: SiteData = {
  galleryPhotos: DEFAULT_GALLERY_PHOTOS,
  productTabs: DEFAULT_PRODUCT_TABS,
  exploreSectionTitle: "Ce poți",
  exploreSectionSubtitle: "comanda",
  contactEmail: "rms.des18@gmail.com",
};

// ── Storage key ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "cismind_site_data";

// ── Read / write helpers ──────────────────────────────────────────────────────

export function loadSiteData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_DATA;
    const parsed = JSON.parse(raw) as Partial<SiteData>;
    return {
      galleryPhotos: parsed.galleryPhotos ?? DEFAULT_SITE_DATA.galleryPhotos,
      productTabs: parsed.productTabs ?? DEFAULT_SITE_DATA.productTabs,
      exploreSectionTitle: parsed.exploreSectionTitle ?? DEFAULT_SITE_DATA.exploreSectionTitle,
      exploreSectionSubtitle: parsed.exploreSectionSubtitle ?? DEFAULT_SITE_DATA.exploreSectionSubtitle,
      contactEmail: parsed.contactEmail ?? DEFAULT_SITE_DATA.contactEmail,
    };
  } catch {
    return DEFAULT_SITE_DATA;
  }
}

export function saveSiteData(data: SiteData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error("Failed to save site data to localStorage");
  }
}

export function resetSiteData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// ── Accent colors palette (used in admin dropdowns) ───────────────────────────

export const ACCENT_COLORS = [
  { label: "Roșu Cismind", value: "#d30052" },
  { label: "Violet Cismind", value: "#5e3279" },
  { label: "Albastru închis", value: "#222b37" },
  { label: "Portocaliu Cismind", value: "#f5a623" },
  { label: "Albastru", value: "#2563eb" },
  { label: "Verde", value: "#16a34a" },
  { label: "Cyan", value: "#0891b2" },
  { label: "Portocaliu aprins", value: "#ea580c" },
];