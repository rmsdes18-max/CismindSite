// ── Central site data store (localStorage-backed) ────────────────────────────
// All editable content lives here. Components read from this store.
// Admin dashboard writes to this store.

export type GalleryPhoto = {
  id: string;
  src: string;
  label: string;
  tag: string;
  accent: string;
  /** CSS object-position value, e.g. "center center", "top center", "50% 30%" */
  objectPosition?: string;
};

export type ProductCard = {
  id: string;
  title: string;
};

export type ProductTab = {
  id: string;
  label: string;
  color: string;
  colorLight: string;
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
  // ── Page 1 ──
  {
    id: "g1",
    src: "/gallery/stikere-colectie.jpg",
    label: "Stikere Die-Cut",
    tag: "Stikere",
    accent: "#d30052",
  },
  {
    id: "g2",
    src: "/gallery/hanorac-personalizat.jpg",
    label: "Hanorac Personalizat",
    tag: "Textile",
    accent: "#5e3279",
  },
  {
    id: "g3",
    src: "/gallery/cutii-print-uv.jpg",
    label: "Cutii Print UV",
    tag: "Print Digital",
    accent: "#222b37",
  },
  {
    id: "g4",
    src: "/gallery/gravura-lemn.jpg",
    label: "Gravură Laser Lemn",
    tag: "Gravură",
    accent: "#5e3279",
  },
  {
    id: "g5",
    src: "/gallery/banner-casino.jpg",
    label: "Banner Premium",
    tag: "Bannere",
    accent: "#f5a623",
  },
  {
    id: "g6",
    src: "/gallery/carti-vizita.jpg",
    label: "Cărți de Vizită",
    tag: "Print Digital",
    accent: "#222b37",
  },
  // ── Page 2 ──
  {
    id: "g7",
    src: "/gallery/stikere-cismind.jpg",
    label: "Stikere Logo Cismind",
    tag: "Stikere",
    accent: "#d30052",
  },
  {
    id: "g8",
    src: "/gallery/print-casino.jpg",
    label: "Print Premium Casino",
    tag: "Print Digital",
    accent: "#222b37",
  },
  {
    id: "g9",
    src: "/gallery/decupaj-lemn.jpg",
    label: "Decupaj Lemn",
    tag: "Gravură",
    accent: "#5e3279",
  },
  {
    id: "g10",
    src: "/gallery/print-format-mare.jpg",
    label: "Print Format Mare",
    tag: "Bannere",
    accent: "#f5a623",
  },
  {
    id: "g11",
    src: "/gallery/tricou-smelly-cat.jpg",
    label: "Tricou Personalizat",
    tag: "Textile",
    accent: "#5e3279",
  },
  {
    id: "g12",
    src: "/gallery/gravura-actiune.jpg",
    label: "Gravură în Acțiune",
    tag: "Gravură",
    accent: "#222b37",
  },
];

export const DEFAULT_PRODUCT_TABS: ProductTab[] = [
  {
    id: "tab-stikere",
    label: "Stikere",
    color: "#ffa300",
    colorLight: "#fff4dd",
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
    color: "#e70050",
    colorLight: "#ffd7e9",
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
    color: "#7b2fa0",
    colorLight: "#f0e0ff",
    products: [
      { id: "p9", title: "Canvas Clasic" },
      { id: "p10", title: "Canvas Panoramic" },
      { id: "p11", title: "Canvas Multi-Panou" },
    ],
  },
  {
    id: "tab-bannere",
    label: "Bannere",
    color: "#2e8b57",
    colorLight: "#e0f5ea",
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
    color: "#1a6fd4",
    colorLight: "#ddeeff",
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
    color: "#2c3e50",
    colorLight: "#e8ecf0",
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
  contactEmail: "comenzi@cismind.ro",
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