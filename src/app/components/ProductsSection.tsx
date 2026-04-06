import { useState, useEffect } from "react";
import {
  Scissors,
  Shirt,
  Megaphone,
  Tag,
  Monitor,
  Flame,
  Droplets,
  Ruler,
  ShieldCheck,
  Wind,
  Star,
  X,
  CheckCircle,
  Layers,
  Zap,
  Palette,
  Package,
  Sun,
  Leaf,
  ArrowRight,
  Image,
  AlignLeft,
  Columns,
  Frame,
  MapPin,
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
  PanelTop,
} from "lucide-react";
import svgPaths from "../../imports/Frame28/svg-n7egkoc8x1";
import imgProduct from "figma:asset/8ad1c0e3f1c2721f34205a430fbe5541520f6ffe.png";
import {
  loadSiteData,
  type ProductTab,
} from "../store/siteData";

// ── Types ─────────────────────────────────────────────────────────────────────

type Feature = {
  icon: React.ElementType;
  label: string;
  desc: string;
};
type DrawerData = {
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

const drawerContent: Record<string, DrawerData> = {
  // ── STIKERE ──
  Standard: {
    title: "Stikere Standard",
    tagline: "Simplu. Eficient. Irezistibil de lipite.",
    description:
      "Stikere clasice pe vinil, ideale pentru branding, ambalaje, produse și promoții. Print full-color, adeziv puternic, livrare rapidă.",
    image:
      "https://images.unsplash.com/photo-1617909518542-c07286e21027?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
    image:
      "https://images.unsplash.com/photo-1593747176945-ef77e62547eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
    image:
      "https://images.unsplash.com/photo-1711885417273-cd35d9983a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
  "În coală": {
    title: "Stikere în coală",
    tagline: "Decupate pe acceași coală",
    description:
      "Sticker în coală tipărit color, livrat cu mai multe stickere decupate pe aceeași coală. Ideal pentru aplicare rapidă și organizată.",
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

const productsByTab: Record<
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

const tabs = [
  "Stikere",
  "Textile",
  "Canva",
  "Bannere",
  "Print Digital",
  "Gravura",
];

// ── Chevron icon ──────────────────────────────────────────────────────────────

function ChevronRight() {
  return (
    <div style={{ transform: "rotate(180deg)" }}>
      <svg
        width="8"
        height="15"
        fill="none"
        viewBox="0 0 7.78932 14.071"
      >
        <path d={svgPaths.p3efc7980} fill="#323544" />
      </svg>
    </div>
  );
}

// ── Product Drawer ────────────────────────────────────────────────────────────

function ProductDrawer({
  productKey,
  onClose,
}: {
  productKey: string | null;
  onClose: () => void;
}) {
  const data = productKey ? drawerContent[productKey] : null;
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
                className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <X size={18} color="white" />
              </button>
              {/* Title */}
              <div className="absolute bottom-5 left-6 right-12">
                <p
                  className="text-white/75 text-[11px] mb-1 uppercase tracking-widest"
                  style={{ fontFamily: "Mulish, sans-serif" }}
                >
                  {data.tagline}
                </p>
                <h2
                  className="text-white text-[26px] leading-tight"
                  style={{
                    fontFamily: "Mulish, sans-serif",
                    fontWeight: 800,
                  }}
                >
                  {data.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-7 p-7 flex-1">
              {/* Description */}
              <p
                className="text-[#555] text-[15px] leading-relaxed"
                style={{ fontFamily: "Mulish, sans-serif" }}
              >
                {data.description}
              </p>

              {/* Features */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ background: data.accentColor }}
                  />
                  <h3
                    className="text-[#222b37] text-[15px]"
                    style={{
                      fontFamily: "Mulish, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    Ce primești
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {data.features.map(
                    ({ icon: Icon, label, desc }) => (
                      <div
                        key={label}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f7f4fb] border border-[#ede8f5]"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: `${data.accentColor}18`,
                          }}
                        >
                          <Icon
                            size={14}
                            color={data.accentColor}
                            strokeWidth={2.2}
                          />
                        </div>
                        <div>
                          <p
                            className="text-[#222b37] text-[12px] leading-tight"
                            style={{
                              fontFamily: "Mulish, sans-serif",
                              fontWeight: 700,
                            }}
                          >
                            {label}
                          </p>
                          <p
                            className="text-[#75777a] text-[11px] mt-0.5 leading-snug"
                            style={{
                              fontFamily: "Mulish, sans-serif",
                            }}
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
                    style={{ background: data.accentColor }}
                  />
                  <h3
                    className="text-[#222b37] text-[15px]"
                    style={{
                      fontFamily: "Mulish, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    Materiale disponibile
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.materials.map((name) => (
                    <span
                      key={name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px]"
                      style={{
                        fontFamily: "Mulish, sans-serif",
                        borderColor: `${data.accentColor}55`,
                        color: data.accentColor,
                        background: `${data.accentColor}0d`,
                      }}
                    >
                      <CheckCircle
                        size={10}
                        color={data.accentColor}
                        strokeWidth={2.5}
                      />
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full flex items-center justify-center gap-2 py-4 text-white text-[12px] tracking-[0.84px] uppercase transition-colors hover:opacity-85 active:scale-[0.98] mt-auto"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  background: data.accentColor,
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

// Flat brand colors - max 2, alternating
const CARD_BG = ["#d30052", "#5e3279", "#222b37", "#f5a623"];
const CARD_ACCENT = [
  "#d30052",
  "#5e3279",
  "#222b37",
  "#e69500",
];

// One representative icon per product
const CARD_ICON: Record<string, React.ElementType> = {
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

// ── Card visual - flat color + single icon ────────────────────────────────────

function CardVisual({
  title,
  index,
}: {
  title: string;
  index: number;
}) {
  const Icon = CARD_ICON[title] ?? Palette;
  return (
    <div
      className="w-full h-[140px] flex-shrink-0 flex items-center justify-center"
      style={{ background: CARD_BG[index % 4] }}
    >
      <Icon size={46} color="white" strokeWidth={1.3} />
    </div>
  );
}

// ── Single product card ───────────────────────────────────────────────────────

function ProductCard({
  title,
  index,
  onClick,
}: {
  title: string;
  index: number;
  onClick: () => void;
}) {
  const accent = CARD_ACCENT[index % 4];

  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-[210px] rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow duration-200"
      style={{
        border: "1px solid #e0d9e6",
        background: "#fff",
      }}
    >
      <CardVisual title={title} index={index} />

      <div className="flex flex-col gap-2 p-4 flex-1">
        <p
          className="text-[#222b37] text-[16px] leading-snug"
          style={{
            fontFamily: "Mulish, sans-serif",
            fontWeight: 700,
          }}
        >
          {title}
        </p>

        <div className="flex items-center gap-1 mt-auto pt-1">
          <span
            className="text-[13px]"
            style={{
              fontFamily: "Mulish, sans-serif",
              fontWeight: 600,
              color: accent,
            }}
          >
            Vezi detalii
          </span>
          <svg
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 24 24"
            stroke={accent}
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 18l6-6-6-6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Label with triangle icon ──────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
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
          fill="#D30052"
        />
      </svg>
      <span
        className="text-[18px] text-black"
        style={{ fontFamily: "Mulish, sans-serif" }}
      >
        {text}
      </span>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function ProductsSection() {
  const [productTabs, setProductTabs] = useState<ProductTab[]>(
    [],
  );
  const [activeTabId, setActiveTabId] = useState<string>("");
  const [openProduct, setOpenProduct] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const data = loadSiteData();
    setProductTabs(data.productTabs);
    setActiveTabId(data.productTabs[0]?.id ?? "");
  }, []);

  const activeTab = productTabs.find(
    (t) => t.id === activeTabId,
  );

  return (
    <>
      <ProductDrawer
        productKey={openProduct}
        onClose={() => setOpenProduct(null)}
      />

      <section className="w-full bg-[#f7f4fb] px-12 py-16 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <SectionLabel text="Explorează" />
          <h2
            className="text-[#222b37] leading-tight"
            style={{
              fontFamily: "Mulish, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 3.3vw, 48px)",
            }}
          >
            Ce poți{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #f5a623, #d30052 47%, #5e3279)",
              }}
            >
              comanda
            </span>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3">
          {productTabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-5 py-2.5 text-[12px] tracking-[0.84px] uppercase transition-colors ${
                  isActive
                    ? "bg-[#d30052] text-white"
                    : "border border-[#222b37] text-[#222b37] hover:bg-[#222b37] hover:text-white"
                }`}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product cards - horizontally scrollable */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
          {(activeTab?.products ?? []).map((product, i) => (
            <ProductCard
              key={product.id}
              title={product.title}
              index={i}
              onClick={() => setOpenProduct(product.title)}
            />
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[
            {
              title: "Stikere & Autocolante",
              items: [
                {
                  label: "Forme personalizate",
                  Icon: Scissors,
                },
                { label: "Orice dimensiune", Icon: Ruler },
                { label: "Rezistente la apă", Icon: Droplets },
              ],
            },
            {
              title: "Textile personalizate",
              items: [
                { label: "Tricouri", Icon: Shirt },
                { label: "Hanorace", Icon: Wind },
                { label: "Accesorii", Icon: Star },
              ],
            },
            {
              title: "Bannere & Afișe",
              items: [
                { label: "Interior", Icon: Monitor },
                { label: "Exterior", Icon: Megaphone },
                { label: "Formate mari", Icon: Ruler },
              ],
            },
            {
              title: "Etichete & Ambalaje",
              items: [
                { label: "Etichete produse", Icon: Tag },
                { label: "Ambalaje brand", Icon: ShieldCheck },
                { label: "Tiraje mici", Icon: Scissors },
              ],
            },
            {
              title: "Print Digital",
              items: [
                { label: "Înaltă rezoluție", Icon: Monitor },
                { label: "Livrare rapidă", Icon: Flame },
                { label: "Suporturi variate", Icon: Star },
              ],
            },
            {
              title: "Gravură",
              items: [
                { label: "Lemn", Icon: Flame },
                { label: "Metal", Icon: ShieldCheck },
                { label: "Acril", Icon: Droplets },
              ],
            },
          ].map(({ title, items }) => (
            <div
              key={title}
              className="bg-white/60 rounded-2xl p-6 flex flex-col gap-3 border border-[#e0d3c7] hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-8 h-1 rounded-full bg-[#d30052]" />
              <h3
                className="text-[#222b37] text-[18px]"
                style={{
                  fontFamily: "Mulish, sans-serif",
                  fontWeight: 700,
                }}
              >
                {title}
              </h3>
              <ul className="flex flex-col gap-2 mt-1">
                {items.map(({ label, Icon }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2"
                  >
                    <Icon
                      size={15}
                      color="#d30052"
                      strokeWidth={2.2}
                      className="flex-shrink-0"
                    />
                    <span
                      className="text-[#75777a] text-[15px]"
                      style={{
                        fontFamily: "Mulish, sans-serif",
                      }}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}