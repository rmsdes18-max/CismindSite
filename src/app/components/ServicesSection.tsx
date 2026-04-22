import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import svgPaths from "../../imports/Website/svg-kqn5vv4qme";
import { loadSiteData, type GalleryPhoto } from "../store/siteData";

// ── 4-color divider bar ───────────────────────────────────────────────────────

export function ColorDivider() {
  const bars = [
    { color: "#ffa300" },
    { color: "#e70050" },
    { color: "#652f7d" },
    { color: "#202b38" },
  ];
  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
        <div className="flex h-2">
          {bars.map(({ color }) => (
            <div key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Label with triangle icon ──────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="19" height="24" fill="none" viewBox="0 0 18.3439 23.6943">
        <path d={svgPaths.p135cec80} fill="#652f7d" />
      </svg>
      <span
        className="text-[18px] text-[#445e79] font-['Mulish',sans-serif]"
      >
        {text}
      </span>
    </div>
  );
}

// ── Gallery slider: 2 rows × 3 cols, paginated ────────────────────────────────

const COLS = 3;
const ROWS = 2;
const PAGE_SIZE = COLS * ROWS; // 6

function GallerySlider() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [animating, setAnimating] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    setPhotos(loadSiteData().galleryPhotos);
  }, []);

  const totalPages = Math.ceil(photos.length / PAGE_SIZE);

  function goTo(next: number, dir: 1 | -1) {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setPage(next);
      setAnimating(false);
    }, 320);
  }

  const prev = () => {
    if (page === 0) return;
    goTo(page - 1, -1);
  };

  const next = () => {
    if (page === totalPages - 1) return;
    goTo(page + 1, 1);
  };

  const pagePhotos = photos.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
      {/* Slide area */}
      <div className="overflow-hidden rounded-xl">
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction * 40}px)`
              : "translateX(0)",
            transition: "opacity 0.32s ease, transform 0.32s ease",
          }}
        >
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 280px)` }}
          >
            {pagePhotos.map((photo) => (
              <GalleryCard key={photo.id} photo={photo} onClick={() => setLightboxPhoto(photo)} />
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > page ? 1 : -1)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === page ? "28px" : "8px",
                height: "8px",
                background: i === page ? "#445e79" : "#99aec5",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={page === 0}
            className="w-10 h-10 flex items-center justify-center transition-all duration-200 rounded-xl"
            style={{
              color: page === 0 ? "#99aec5" : "#202b38",
              cursor: page === 0 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={next}
            disabled={page === totalPages - 1}
            className="w-10 h-10 flex items-center justify-center transition-all duration-200 rounded-xl"
            style={{
              color: page === totalPages - 1 ? "#99aec5" : "#202b38",
              cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  photo,
  onClose,
}: {
  photo: GalleryPhoto | null;
  onClose: () => void;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!photo) return;
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [photo, handleKey]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X size={20} color="white" />
      </button>

      {/* Photo container */}
      <div
        className="relative z-10 w-[90vw] h-[85vh] max-w-[900px] max-h-[900px] flex flex-col items-center justify-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.label}
          className="max-w-full max-h-[calc(85vh-60px)] object-contain rounded-xl"
          style={{
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        />
        {/* Label + tag */}
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-white text-[11px] font-['Mulish',sans-serif] font-bold tracking-[0.05em]"
            style={{ background: photo.accent }}
          >
            {photo.tag}
          </span>
          <p className="text-white text-[16px] font-['Mulish',sans-serif] font-semibold">
            {photo.label}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Single gallery card ───────────────────────────────────────────────────────

function GalleryCard({
  photo,
  onClick,
}: {
  photo: GalleryPhoto;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-xl cursor-pointer h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <img
        src={photo.src}
        alt={photo.label}
        className="w-full h-full object-cover"
        style={{
          objectPosition: photo.objectPosition ?? "center center",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Tag */}
      <div className="absolute top-3 left-3">
        <span
          className="px-2.5 py-1 rounded-full text-white text-[11px] font-['Mulish',sans-serif] font-bold tracking-[0.05em]"
          style={{
            background: photo.accent,
          }}
        >
          {photo.tag}
        </span>
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
        <p
          className="text-white leading-tight font-['Mulish',sans-serif] font-bold"
          style={{
            fontSize: "clamp(13px, 1.1vw, 15px)",
          }}
        >
          {photo.label}
        </p>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function ServicesSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-10">

      {/* Header */}
      <div className="flex flex-col gap-3">
        <SectionLabel text="Galerie de produse" />
        <h2
          className="text-[#202b38] leading-tight font-['Mulish',sans-serif] font-extrabold"
          style={{ fontSize: "clamp(32px, 3.3vw, 47.5px)" }}
        >
          Ce producem pentru tine
        </h2>
      </div>

      {/* ── Part A: Gallery slider 2×3 ─────────────────────────────────────── */}
      <GallerySlider />

      </div>
    </section>
  );
}