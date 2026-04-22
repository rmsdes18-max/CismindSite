import {
  Scissors,
  Shirt,
  Droplets,
  Ruler,
  ShieldCheck,
  Wind,
  Star,
  Layers,
  Zap,
  Palette,
  Package,
  Sun,
  Leaf,
  Image,
  AlignLeft,
  Columns,
  Frame,
  Grid2X2,
  FileText,
  CreditCard,
  BookOpen,
  LayoutTemplate,
  TreePine,
  Hammer,
  Gem,
  Sparkles,
  ScanLine,
  Eye,
  CircleDot,
  Maximize2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type Feature = {
  icon: React.ElementType;
  label: string;
  desc: string;
};
export type DrawerData = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  features: Feature[];
  materials: string[];
  cta: string;
};

// ── Drawer content ────────────────────────────────────────────────────────────

export const drawerContent: Record<string, DrawerData> = {
  // ── STIKERE ──
  "Stikere Standard": {
    title: "Stikere Standard",
    tagline: "Simplu. Eficient. Irezistibil de lipite.",
    description:
      "Stikere clasice pe vinil, ideale pentru branding, ambalaje, produse și promoții. Print full-color, adeziv puternic, livrare rapidă.",
    image: "/products/stikere-standard.jpg",
    accentColor: "#d30052",
    features: [
      {
        icon: Palette,
        label: "Print Full-Color",
        desc: "Culori vii, fidelitate maximă față de design",
      },
      {
        icon: Sun,
        label: "Rezistente la UV",
        desc: "Nu se decolorează la expunere solară",
      },
      {
        icon: Droplets,
        label: "Lăcuire selectivă",
        desc: "Zone mai lucioase ca altele",
      },
      {
        icon: Scissors,
        label: "Forme standard & die-cut",
        desc: "Tăiate după forme standard sau conturul design-ului",
      },
      {
        icon: Layers,
        label: "Tiraje flexibile",
        desc: "De la 10 bucăți fără cantitate minimă",
      },
      {
        icon: Zap,
        label: "Livrare în 24–48h",
        desc: "Producție urgentă disponibilă",
      },
    ],
    materials: ["Vinil alb lucios", "Vinil alb mat"],
    cta: "Solicită ofertă stikere standard",
  },
  Transparente: {
    title: "Stikere Transparente",
    tagline: "Invizibile pe fundal. Vizibile prin impact.",
    description:
      "Stikere pe folie transparentă - par imprimate direct pe suprafață. Perfecte pentru sticle, vitrine, ecrane și ambalaje premium.",
    image: "/products/transparente.jpg",
    accentColor: "#0ea5e9",
    features: [
      {
        icon: Eye,
        label: 'Efect "no-label"',
        desc: "Par lipite direct pe suprafață",
      },
      {
        icon: Droplets,
        label: "Rezistente la apă",
        desc: "Ideale pentru sticle și băuturi",
      },
      {
        icon: Palette,
        label: "Culori vibrante",
        desc: "Culori vii, cu un impact spectaculos",
      },
      {
        icon: Scissors,
        label: "Forme standard & die-cut",
        desc: "Tăiate după forme standard sau conturul design-ului",
      },
      {
        icon: ShieldCheck,
        label: "Adeziv permanent",
        desc: "Nu se dezlipesc în timp",
      },
      {
        icon: Zap,
        label: "Livrare în 24–48h",
        desc: "Producție urgentă disponibilă",
      },
    ],
    materials: [
      "Vinil transparent mat",
      "Vinil transparent lucios",
      "Poliester transparent",
    ],
    cta: "Solicită ofertă transparente",
  },
  Holografice: {
    title: "Stikere Holografice",
    tagline: "Atrag privirile. Imposibil de ignorat.",
    description:
      "Stikere cu efect holografic sau chrome - schimbă culoarea la lumină. Ideale pentru produse premium, colecții limitate sau gifting.",
    image: "/products/holografice.jpg",
    accentColor: "#8b5cf6",
    features: [
      {
        icon: Sparkles,
        label: "Efect holografic",
        desc: "Curcubeu de culori la mișcare",
      },
      {
        icon: Star,
        label: "Look premium",
        desc: "Percepție de brand exclusivist",
      },
      {
        icon: Scissors,
        label: "Forme standard & die-cut",
        desc: "Tăiate după forme standard sau conturul design-ului",
      },
      {
        icon: ShieldCheck,
        label: "Durabilitate",
        desc: "Rezistente la zgârieturi și umiditate",
      },
      {
        icon: Palette,
        label: "Chrome & Mirror",
        desc: "Variante argintiu și auriu",
      },
      {
        icon: Layers,
        label: "Tiraje mici",
        desc: "De la 25 bucăți",
      },
    ],
    materials: [
      "Holografic silver",
      "Holografic gold",
      "Chrome argintiu",
      "Chrome auriu",
      "Rainbow foil",
    ],
    cta: "Solicită ofertă holografice",
  },
  // integrat in stickere s
  "Die-Cut": {
    title: "Stikere Die-Cut",
    tagline: "Forma perfectă pentru brandul tău.",
    description:
      "Stikere tăiate la forma exactă a designului tău — fără margini, fără compromisuri. Ideale pentru branding, ambalaje și cadouri promoționale.",
    image:
      "https://images.unsplash.com/photo-1761276297637-4418549ead2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#f59e0b",
    features: [
      {
        icon: Palette,
        label: "Print Full-Color",
        desc: "Culori vii, fidelitate maximă față de design",
      },
      {
        icon: Scissors,
        label: "Forme standard & die-cut",
        desc: "Tăiate după forme standard sau conturul design-ului",
      },
      {
        icon: Sparkles,
        label: "Alegerea materialului",
        desc: "Materialul perfect pentru ce ai nevoie",
      },
      {
        icon: Zap,
        label: "Livrare în 24–48h",
        desc: "Producție urgentă disponibilă",
      },

    ],
    materials: ["Standard", "Transparent", "Holografic"],
    cta: "Solicită ofertă stikere standard",
  },

  // ── CANVA ──
  "Canvas Clasic": {
    title: "Canvas Clasic",
    tagline: "Fotografia ta. Transformată în artă.",
    description:
      "Tablouri canvas pe șasiu de lemn, cu print UV de înaltă rezoluție. Personalizate cu fotografia, designul sau opera ta de artă preferată.",
    image:
      "https://images.unsplash.com/photo-1674503718104-950f67b26f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#16a34a",
    features: [
      {
        icon: Image,
        label: "Print UV HD",
        desc: "Culori reale, detalii fine, contrast ridicat",
      },
      {
        icon: Frame,
        label: "Șasiu lemn masiv",
        desc: "Stabil, ușor, rezistent în timp",
      },
      {
        icon: Ruler,
        label: "Dimensiuni custom",
        desc: "De la 20×20cm la 200×120cm",
      },
      {
        icon: Palette,
        label: "Profiluri culoare",
        desc: "Calibrare ICC pentru fidelitate maximă",
      },
      {
        icon: ShieldCheck,
        label: "Laminare protectoare",
        desc: "Rezistent la UV, praf și umiditate",
      },
      {
        icon: Package,
        label: "Ambalaj sigur",
        desc: "Livrat protejat pentru transport",
      },
    ],
    materials: [
      "Pânză canvas 380g/m²",
      "Canvas foto lucios",
      "Canvas mat premium",
      "Canvas textura fină",
    ],
    cta: "Solicită ofertă canvas clasic",
  },
  "Canvas Panoramic": {
    title: "Canvas Panoramic",
    tagline: "Umple peretele. Umple camera.",
    description:
      "Tablouri canvas în format larg, ideale pentru peisaje, fotografii de arhitectură sau artă abstractă. Impact vizual maxim în orice spațiu.",
    image:
      "https://images.unsplash.com/photo-1589980785930-a27d2557e7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#0891b2",
    features: [
      {
        icon: Maximize2,
        label: "Format extins",
        desc: "Rapoarte 2:1, 3:1 și custom",
      },
      {
        icon: Image,
        label: "Rezoluție Ultra HD",
        desc: "Clar și la vizionare de aproape",
      },
      {
        icon: Frame,
        label: "Șasiu întărit",
        desc: "Sistem anti-deformare pe formate mari",
      },
      {
        icon: Ruler,
        label: "Până la 300cm lățime",
        desc: "Dimensiuni monumentale posibile",
      },
      {
        icon: ShieldCheck,
        label: "Durabilitate 50+ ani",
        desc: "Cu laminare anti-UV inclusă",
      },
      {
        icon: Package,
        label: "Montaj inclus",
        desc: "Kit de prindere perete inclus",
      },
    ],
    materials: [
      "Canvas panoramic 400g/m²",
      "Canvas foto premium",
      "Canvas mat artistic",
    ],
    cta: "Solicită ofertă panoramic",
  },
  "Canvas Multi-Panou": {
    title: "Canvas Multi-Panou",
    tagline: "O imagine. Mai multe panouri. Un impact.",
    description:
      "Set de tablouri canvas care formează împreună o singură imagine - 2, 3 sau 5 panouri. Efect de galerie modernă, ideal pentru living sau birou.",
    image:
      "https://images.unsplash.com/photo-1645497265341-38cabe0f4414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#7c3aed",
    features: [
      {
        icon: Columns,
        label: "2 / 3 / 5 panouri",
        desc: "Configurații predefinite sau custom",
      },
      {
        icon: Grid2X2,
        label: "Spațiere precisă",
        desc: "Distanțe calculate pentru aliniament perfect",
      },
      {
        icon: Image,
        label: "Print unificat",
        desc: "O singură imagine împărțită armonios",
      },
      {
        icon: Frame,
        label: "Șasiu lemn masiv",
        desc: "Fiecare panou independent și stabil",
      },
      {
        icon: Ruler,
        label: "Dimensiuni custom",
        desc: "Configurăm după peretele tău",
      },
      {
        icon: Package,
        label: "Set complet",
        desc: "Toate panourile + kit montaj inclus",
      },
    ],
    materials: [
      "Canvas 380g/m²",
      "Canvas foto premium",
      "Canvas mat artistic",
    ],
    cta: "Solicită ofertă multi-panou",
  },

  // ── BANNERE ──
  "Roll-Up": {
    title: "Roll-Up Banner",
    tagline: "Montaj în 10 secunde. Impact garantat.",
    description:
      "Bannere retractabile pentru evenimente, târguri, showroom-uri și prezentări. Ușoare, portabile, cu print de înaltă calitate pe ambele fețe.",
    image:
      "https://images.unsplash.com/photo-1765872525902-7370d9a5a5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#ea580c",
    features: [
      {
        icon: Zap,
        label: "Montaj instant",
        desc: "Se desfășoară în sub 10 secunde",
      },
      {
        icon: Package,
        label: "Husă transport",
        desc: "Inclusă, ușoară, cu mâner",
      },
      {
        icon: Ruler,
        label: "85 / 100 / 150cm lățime",
        desc: "Înălțime reglabilă 1.8–2.2m",
      },
      {
        icon: Palette,
        label: "Print full-color",
        desc: "Rezoluție 720–1440 dpi",
      },
      {
        icon: ShieldCheck,
        label: "Mecanism premium",
        desc: "Resorturi duble, durabilitate 10.000+ rulări",
      },
      {
        icon: Layers,
        label: "Față / verso",
        desc: "Print pe ambele fețe disponibil",
      },
    ],
    materials: [
      "Poliester satin 220g/m²",
      "PVC banner 440g/m²",
      "Backlit (retroiluminat)",
    ],
    cta: "Solicită ofertă roll-up",
  },
  "Banner Exterior": {
    title: "Banner Exterior",
    tagline:
      "Vizibil de la distanță. Rezistent la orice vreme.",
    description:
      "Bannere PVC pentru exterior - rezistente la vânt, ploaie și UV. Perfecte pentru fațade, șantiere, evenimente în aer liber.",
    image:
      "https://images.unsplash.com/photo-1763256552751-db613582fb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#b45309",
    features: [
      {
        icon: Sun,
        label: "Rezistent UV",
        desc: "Culori stabile 2–3 ani exterior",
      },
      {
        icon: Droplets,
        label: "Impermeabil",
        desc: "PVC 100% rezistent la apă",
      },
      {
        icon: Wind,
        label: "Rezistent la vânt",
        desc: "Sudură cu inele metalice la colțuri",
      },
      {
        icon: Ruler,
        label: "Orice dimensiune",
        desc: "De la 50×70cm la 5×10m",
      },
      {
        icon: Scissors,
        label: "Finisaje diverse",
        desc: "Buzunare, inele, capse, lipici",
      },
      {
        icon: Palette,
        label: "Print UV solvent",
        desc: "Rezistență maximă la intemperii",
      },
    ],
    materials: [
      "PVC 440g/m² standard",
      "PVC 510g/m² heavy duty",
      "PVC frontlit",
      "PVC backlit",
    ],
    cta: "Solicită ofertă banner exterior",
  },
  "Mesh Banner": {
    title: "Mesh Banner",
    tagline: "Rezistent la vânt. Ideal pentru suprafețe mari.",
    description:
      "Bannere perforate pentru montaj pe garduri, schele sau suprafețe expuse vântului. Aerisit, stabil, eficient vizual chiar și la dimensiuni foarte mari.",
    image:
      "https://images.unsplash.com/photo-1772945858746-e10be2d90613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#065f46",
    features: [
      {
        icon: Wind,
        label: "Perforație 35–50%",
        desc: "Lasă vântul să treacă, imaginea rămâne",
      },
      {
        icon: ShieldCheck,
        label: "Anti-rupere",
        desc: "Material tehnic cu fibră de poliester",
      },
      {
        icon: Ruler,
        label: "Suprafețe mari",
        desc: "Ideal pentru clădiri și garduri de șantier",
      },
      {
        icon: Palette,
        label: "Print UV rezistent",
        desc: "Vizibil clar de la zeci de metri",
      },
      {
        icon: Scissors,
        label: "Inele și prindere",
        desc: "Echipat pentru montaj rapid",
      },
      {
        icon: Sun,
        label: "Durabilitate 3+ ani",
        desc: "Tratat anti-UV și anti-mucegai",
      },
    ],
    materials: ["Mesh PVC 270g/m²", "Mesh poliester 320g/m²"],
    cta: "Solicită ofertă mesh banner",
  },
  "Afișe Print": {
    title: "Afișe & Postere",
    tagline: "Print de galerie. Prețuri accesibile.",
    description:
      "Postere și afișe pentru interior - evenimente, concerte, expoziții, promovare. Hârtie premium mată sau lucioasă, print color fidel 100%.",
    image:
      "https://images.unsplash.com/photo-1635873810723-faf3d8505491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#be185d",
    features: [
      {
        icon: Palette,
        label: "Culori calibrate",
        desc: "Profil ICC, fidelitate 100% față de ecran",
      },
      {
        icon: Ruler,
        label: "A4 → 100×140cm",
        desc: "Orice format standard sau custom",
      },
      {
        icon: Sun,
        label: "Hârtie fotoalbum",
        desc: "Densitate 200–300g/m²",
      },
      {
        icon: ShieldCheck,
        label: "Laminare opțională",
        desc: "Mat, lucios sau catifelat",
      },
      {
        icon: Layers,
        label: "Tiraje de la 1 buc",
        desc: "Fără cantitate minimă",
      },
      {
        icon: Zap,
        label: "Livrare în 24h",
        desc: "Printat și livrat rapid",
      },
    ],
    materials: [
      "Hârtie mată 200g/m²",
      "Hârtie lucioasă 250g/m²",
      "Hârtie foto premium 300g/m²",
      "Hârtie kraft",
    ],
    cta: "Solicită ofertă afișe",
  },

  // ── PRINT DIGITAL ──
  Flyere: {
    title: "Flyere",
    tagline: "Mesajul tău. În mâinile lor.",
    description:
      "Flyere promotionale full-color, față-verso, pe hârtie premium. Ideale pentru evenimente, lansări de produse, restaurante sau campanii outdoor.",
    image:
      "https://images.unsplash.com/photo-1635873810723-faf3d8505491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#2563eb",
    features: [
      {
        icon: Palette,
        label: "Full-color față-verso",
        desc: "Print CMYK de înaltă calitate",
      },
      {
        icon: Ruler,
        label: "A4 / A5 / A6",
        desc: "Sau formate custom la cerere",
      },
      {
        icon: Layers,
        label: "Tiraje mari",
        desc: "Prețuri avantajoase de la 500 buc",
      },
      {
        icon: ShieldCheck,
        label: "Laminare mată/lucioasă",
        desc: "Aspect premium și rezistență",
      },
      {
        icon: Zap,
        label: "Livrare 24–48h",
        desc: "Urgențe acceptate",
      },
      {
        icon: FileText,
        label: "Template gratuit",
        desc: "Te ajutăm cu layout-ul dacă e nevoie",
      },
    ],
    materials: [
      "Hârtie offset 90g/m²",
      "Hârtie mată 130g/m²",
      "Hârtie lucioasă 150g/m²",
      "Hârtie reciclată",
    ],
    cta: "Solicită ofertă flyere",
  },
  "Cărți de Vizită": {
    title: "Cărți de Vizită",
    tagline: "Prima impresie nu se uită.",
    description:
      "Cărți de vizită premium - față-verso, cu finisaje speciale: laminare selectivă UV, folio auriu, relief emboss. Reprezintă-ți brandul la cel mai înalt nivel.",
    image:
      "https://images.unsplash.com/photo-1633415565464-e1d69c3fd906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#1d4ed8",
    features: [
      {
        icon: CreditCard,
        label: "Format standard 85×55mm",
        desc: "Sau rotunjit, pătrat, special",
      },
      {
        icon: Sparkles,
        label: "Folio auriu / argintiu",
        desc: "Efect metalic pe elemente selectate",
      },
      {
        icon: Sun,
        label: "UV selectiv",
        desc: "Lac lucios pe logo sau text",
      },
      {
        icon: Layers,
        label: "Carton 300–700g/m²",
        desc: "Grosimi variate, feeling premium",
      },
      {
        icon: ShieldCheck,
        label: "Emboss / Deboss",
        desc: "Relief tactil pentru impact maxim",
      },
      {
        icon: Palette,
        label: "Față-verso full-color",
        desc: "Design complet pe ambele fețe",
      },
    ],
    materials: [
      "Carton mat 350g/m²",
      "Carton lucios 300g/m²",
      "Carton soft-touch 400g/m²",
      "Kraft natural",
      "Negru mat 600g/m²",
    ],
    cta: "Solicită ofertă cărți de vizită",
  },
  "Broșuri & Pliante": {
    title: "Broșuri & Pliante",
    tagline: "Povestea brandului tău, bine pliatã.",
    description:
      "Pliante bi-fold, tri-fold sau Z-fold, broșuri cusute sau lipite. Full-color, hârtie premium, ideal pentru prezentări de companie, meniuri sau cataloage.",
    image:
      "https://images.unsplash.com/photo-1695634621145-9133286e0247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#0369a1",
    features: [
      {
        icon: BookOpen,
        label: "Bi / Tri / Z-fold",
        desc: "Plieri variate după necesitate",
      },
      {
        icon: AlignLeft,
        label: "Broșuri cusute",
        desc: "8–48 pagini, aspect catalog",
      },
      {
        icon: Palette,
        label: "Full-color interior",
        desc: "Culori stabile pe hârtie premium",
      },
      {
        icon: Ruler,
        label: "A4 / A5 / DL",
        desc: "Sau formate complet personalizate",
      },
      {
        icon: ShieldCheck,
        label: "Copertă laminată",
        desc: "Mată, lucioasă sau soft-touch",
      },
      {
        icon: Layers,
        label: "Tiraje flexibile",
        desc: "De la 50 buc până la tiraje industriale",
      },
    ],
    materials: [
      "Hârtie interior 115g/m²",
      "Hârtie copertă 250g/m²",
      "Hârtie reciclată FSC",
      "Hârtie mată premium",
    ],
    cta: "Solicită ofertă broșuri",
  },
  Postere: {
    title: "Postere",
    tagline: "Artă sau reclame - printăm ambele.",
    description:
      "Postere format mare pentru interior și exterior. De la postere artistice la materiale promoționale, cu print de galerie și finisaje premium.",
    image:
      "https://images.unsplash.com/photo-1645497265341-38cabe0f4414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#7c3aed",
    features: [
      {
        icon: LayoutTemplate,
        label: "A1 / A0 și mai mari",
        desc: "Formate până la 150cm lățime",
      },
      {
        icon: Palette,
        label: "Print foto HD",
        desc: "Rezoluție 1200 dpi pe hârtie foto",
      },
      {
        icon: Sun,
        label: "Cerneală pigment",
        desc: "Rezistentă 75+ ani fără decolorare",
      },
      {
        icon: ShieldCheck,
        label: "Laminare disponibilă",
        desc: "Mat, lucios, anti-reflexie",
      },
      {
        icon: Frame,
        label: "Înrămare opțională",
        desc: "Rame simple sau premium cu paspatur",
      },
      {
        icon: Layers,
        label: "De la 1 bucată",
        desc: "Fără cantitate minimă",
      },
    ],
    materials: [
      "Hârtie foto mată 200g/m²",
      "Hârtie foto lucioasă 250g/m²",
      "Hârtie fină artă 300g/m²",
      "Canvas foto",
    ],
    cta: "Solicită ofertă postere",
  },

  // ── GRAVURĂ ──
  "Gravură Lemn": {
    title: "Gravură pe Lemn",
    tagline: "Natural. Cald. De neprețuit.",
    description:
      "Gravură laser pe lemn masiv, placaj, MDF sau bambus. Personalizare cu text, logo sau ilustrații - cadouri, trofee, tăblițe decorative sau produse artizanale.",
    image:
      "https://images.unsplash.com/photo-1582480203343-4405dbd4f0b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#92400e",
    features: [
      {
        icon: TreePine,
        label: "Esențe variate",
        desc: "Stejar, nuc, cireș, pin, bambus",
      },
      {
        icon: ScanLine,
        label: "Precizie laser 0.1mm",
        desc: "Detalii fine, contururi clare",
      },
      {
        icon: Palette,
        label: "Adâncime reglabilă",
        desc: "De la gravură superficială la sculptare",
      },
      {
        icon: Ruler,
        label: "Orice dimensiune",
        desc: "De la breloc la panou decorativ",
      },
      {
        icon: Package,
        label: "Ideal cadouri",
        desc: "Cutii cadou personalizate disponibile",
      },
      {
        icon: ShieldCheck,
        label: "Finisaj lăcuit",
        desc: "Protecție și luciu estetic",
      },
    ],
    materials: [
      "Lemn masiv stejar",
      "MDF 3mm / 6mm",
      "Bambus",
      "Placaj mesteacăn",
      "Nuc premium",
    ],
    cta: "Solicită ofertă gravură lemn",
  },
  "Gravură Metal": {
    title: "Gravură pe Metal",
    tagline: "Durabil. Precis. Impresionant.",
    description:
      "Gravură laser pe inox, aluminiu, alamă sau oțel. Plăcuțe de identificare, trofee, bijuterii, componente industriale sau elemente decorative de lux.",
    image:
      "https://images.unsplash.com/photo-1732257297170-09599f1bbaec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#374151",
    features: [
      {
        icon: Hammer,
        label: "Laser fibră optică",
        desc: "Marcare permanentă, fără uzură",
      },
      {
        icon: ScanLine,
        label: "Precizie 0.05mm",
        desc: "Microtext și detalii de fineță",
      },
      {
        icon: ShieldCheck,
        label: "Rezistență maximă",
        desc: "Nu se șterge, nu se corodează",
      },
      {
        icon: Layers,
        label: "Alb / negru / color",
        desc: "Marcare cu colorant inclusă",
      },
      {
        icon: Ruler,
        label: "Grosimi variate",
        desc: "De la 0.5mm la 10mm placă",
      },
      {
        icon: Star,
        label: "Trofee & awards",
        desc: "Personalizare completă pentru premii",
      },
    ],
    materials: [
      "Inox 304 / 316",
      "Aluminiu anodizat",
      "Alamă",
      "Oțel carbon",
      "Titan",
    ],
    cta: "Solicită ofertă gravură metal",
  },
  "Gravură Acril": {
    title: "Gravură pe Acril",
    tagline: "Modern. Transparent. Spectaculos.",
    description:
      "Gravură și tăiere laser pe acril colorat sau transparent. Indicatoare, reclame luminoase, decoruri interioare, trofee și signalistică modernă.",
    image:
      "https://images.unsplash.com/photo-1615192512290-58145dd34a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#0e7490",
    features: [
      {
        icon: Gem,
        label: "Margini lustruite",
        desc: "Tăiere laser = margine cristal",
      },
      {
        icon: Sparkles,
        label: "Efect luminos",
        desc: "Acrilul gravat difuzează lumina LED",
      },
      {
        icon: Palette,
        label: "20+ culori acril",
        desc: "Transparent, opac sau oglindă",
      },
      {
        icon: ScanLine,
        label: "Tăiere precisă",
        desc: "Forme complexe fără bavuri",
      },
      {
        icon: Ruler,
        label: "Grosimi 2–20mm",
        desc: "Rigiditate adaptată utilizării",
      },
      {
        icon: CircleDot,
        label: "Gravură față-verso",
        desc: "Efect 3D pe piese transparente",
      },
    ],
    materials: [
      "Acril transparent 3mm",
      "Acril colorat 5mm",
      "Acril oglindă",
      "Acril negru mat",
      "Acril fluorescent",
    ],
    cta: "Solicită ofertă gravură acril",
  },

  // ── TEXTILE (existing) ──
  Tricouri: {
    title: "Tricouri Personalizate",
    tagline: "Poartă-ți identitatea. Exprimă-te prin culoare.",
    description:
      "Tricouri din bumbac 100% sau amestec premium, personalizate prin tehnologiile DTF. Culorile rămân vibrante și după zeci de spălări.",
    image:
      "https://images.unsplash.com/photo-1773525912457-6a7278efb9e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#5e3279",
    features: [
      {
        icon: Layers,
        label: "DTF Transfer",
        desc: "Ideal pentru tiraje mici și detalii fine",
      },
      {
        icon: Leaf,
        label: "Bumbac 100%",
        desc: "Confortabil, respirabil, certificat OEKO-TEX",
      },
      {
        icon: Ruler,
        label: "Mărimi XS – 3XL",
        desc: "Gamă completă pentru orice siluetă",
      },
    ],
    materials: [
      "Bumbac 100% (180g/m²)",
      "Bumbac organic",
      "Bumbac + poliester (ringspun)",
      "Performance / sport",
      "Oversize heavyweight",
    ],
    cta: "Solicită ofertă tricouri",
  },
  Hanorace: {
    title: "Hanorace Personalizate",
    tagline: "Confort premium. Branding de durată.",
    description:
      "Hanorace fleece sau French Terry, personalizate cu logo-ul sau designul tău prin print. Potrivite pentru echipe, evenimente și colecții proprii.",
    image:
      "https://images.unsplash.com/photo-1728394604722-c1007e3edf09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#1a73e8",
    features: [
      {
        icon: Wind,
        label: "Fleece premium",
        desc: "Căldură și confort în sezonul rece",
      },
      {
        icon: Layers,
        label: "Print pe față/spate/mâneci",
        desc: "Suprafețe multiple personalizabile",
      },
      {
        icon: Palette,
        label: "Culori diverse",
        desc: "Peste 20 de culori de bază disponibile",
      },
      {
        icon: ShieldCheck,
        label: "Durabilitate",
        desc: "Nu se deformează, nu pilling după spălare",
      },
      {
        icon: Ruler,
        label: "Mărimi S – 4XL",
        desc: "Inclusiv mărimi oversize și unisex",
      },
    ],
    materials: [
      "Fleece 300g/m²",
      "French Terry 280g/m²",
      "Softshell impermeabil",
      "Bumbac piqué",
      "Recycled poliester",
    ],
    cta: "Solicită ofertă hanorace",
  },
  Bluze: {
    title: "Bluze Personalizate",
    tagline: "Eleganță adaptată brandului tău.",
    description:
      "Bluze polo sau casual, perfecte pentru uniformele de corporate, evenimente sau retail. Print discret sau mare pentru un look profesionist.",
    image:
      "https://images.unsplash.com/photo-1680690517143-d813ac08cd13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#e67e22",
    features: [
      {
        icon: Shirt,
        label: "Polo & casual",
        desc: "Croieli variate pentru orice context",
      },
      {
        icon: Palette,
        label: "Culori corporate",
        desc: "Potrivim exact culoarea Pantone a brandului",
      },
      {
        icon: Leaf,
        label: "Materiale premium",
        desc: "Confort prelungit, aspect îngrijit",
      },
      {
        icon: Package,
        label: "Ambalare individuală",
        desc: "Opțional, pentru gifting corporate",
      },
      {
        icon: Zap,
        label: "Producție rapidă",
        desc: "Livrare în 3–5 zile lucrătoare",
      },
    ],
    materials: [
      "Piqué polo 220g/m²",
      "Bumbac jersey",
      "Viscoza / raion",
      "Lenjerie / in",
    ],
    cta: "Solicită ofertă bluze",
  },
  Kids: {
    title: "Textile pentru Copii",
    tagline: "Sigure, colorate și pline de personalitate.",
    description:
      "Tricouri, body-uri și hanorace pentru cei mici, personalizate cu imprimeuri vesele, non-toxice. Materiale certificate, blânde cu pielea sensibilă.",
    image:
      "https://images.unsplash.com/photo-1657399275210-f78b4bee9478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accentColor: "#27ae60",
    features: [
      {
        icon: ShieldCheck,
        label: "Vopsele non-toxice",
        desc: "Certificate EN 71 – sigure pentru copii",
      },
      {
        icon: Leaf,
        label: "Hipoalergenic",
        desc: "Bumbac organic, fără substanțe iritante",
      },
      {
        icon: Palette,
        label: "Imprimeuri vesele",
        desc: "Personaje, culori vii, motive creative",
      },
      {
        icon: Ruler,
        label: "Mărimi 0–14 ani",
        desc: "Gamă completă de mărimi pentru copii",
      },
      {
        icon: Shirt,
        label: "Body & tricou & hanorac",
        desc: "Toate categoriile de îmbrăcăminte",
      },
      {
        icon: Star,
        label: "Ideal pentru cadouri",
        desc: "Ambalaj de cadou disponibil",
      },
    ],
    materials: [
      "Bumbac organic 160g/m²",
      "Bumbac piqué moale",
      "Interlock bumbac",
      "Fleece copii",
    ],
    cta: "Solicită ofertă kids",
  },
};

// ── Product card data ─────────────────────────────────────────────────────────

export const productsByTab: Record<
  string,
  { id: number; title: string }[]
> = {
  Stikere: [
    { id: 1, title: "Standard" },
    { id: 2, title: "Transparente" },
    { id: 3, title: "Holografice" },
    { id: 4, title: "Die-Cut" },
  ],
  Textile: [
    { id: 1, title: "Tricouri" },
    { id: 2, title: "Hanorace" },
    { id: 3, title: "Bluze" },
    { id: 4, title: "Kids" },
  ],
  Canva: [
    { id: 1, title: "Canvas Clasic" },
    { id: 2, title: "Canvas Panoramic" },
    { id: 3, title: "Canvas Multi-Panou" },
  ],
  Bannere: [
    { id: 1, title: "Roll-Up" },
    { id: 2, title: "Banner Exterior" },
    { id: 3, title: "Mesh Banner" },
    { id: 4, title: "Afișe Print" },
  ],
  "Print Digital": [
    { id: 1, title: "Flyere" },
    { id: 2, title: "Cărți de Vizită" },
    { id: 3, title: "Broșuri & Pliante" },
    { id: 4, title: "Postere" },
  ],
  Gravura: [
    { id: 1, title: "Gravură Lemn" },
    { id: 2, title: "Gravură Metal" },
    { id: 3, title: "Gravură Acril" },
  ],
};

// ── Filter tabs ──────────────────────────────────────────────────────────────

export const tabs = [
  "Stikere",
  "Textile",
  "Canva",
  "Bannere",
  "Print Digital",
  "Gravura",
];
