import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import svgPaths from "../../imports/Website/svg-kqn5vv4qme";
import { loadSiteData, type GalleryPhoto } from "../store/siteData";

// ── 4-color divider bar ───────────────────────────────────────────────────────

export function ColorDivider() {
  const bars = [
    { color: "#fcb52c" },
    { color: "#d92e6e" },
    { color: "#7c568d" },
    { color: "#4c5158" },
  ];
  return (
    <div className="w-full flex h-2">
      {bars.map(({ color }) => (
        <div key={color} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

// ── Label with triangle icon ──────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="19" height="24" fill="none" viewBox="0 0 18.3439 23.6943">
        <path d={svgPaths.p135cec80} fill="#D30052" />
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

// ── Gallery slider: 2 rows × 3 cols, paginated ────────────────────────────────

const COLS = 3;
const ROWS = 2;
const PAGE_SIZE = COLS * ROWS; // 6

function GallerySlider() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [animating, setAnimating] = useState(false);

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
      {/* Slide area */}
      <div className="overflow-hidden rounded-2xl">
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
            style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 220px)` }}
          >
            {pagePhotos.map((photo) => (
              <GalleryCard key={photo.id} photo={photo} />
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
                background: i === page ? "#d30052" : "#d30052aa",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={page === 0}
            className="w-10 h-10 flex items-center justify-center transition-all duration-200"
            style={{
              background: page === 0 ? "rgba(34,43,55,0.08)" : "#222b37",
              color: page === 0 ? "#222b3740" : "white",
              cursor: page === 0 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={next}
            disabled={page === totalPages - 1}
            className="w-10 h-10 flex items-center justify-center transition-all duration-200"
            style={{
              background: page === totalPages - 1 ? "rgba(34,43,55,0.08)" : "#d30052",
              color: page === totalPages - 1 ? "#222b3740" : "white",
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

// ── Single gallery card ───────────────────────────────────────────────────────

function GalleryCard({ photo }: { photo: GalleryPhoto }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={photo.src}
        alt={photo.label}
        className="w-full h-full object-cover"
        style={{
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
          className="px-2.5 py-1 rounded-full text-white text-[11px]"
          style={{
            fontFamily: "Mulish, sans-serif",
            fontWeight: 700,
            background: photo.accent,
            letterSpacing: "0.05em",
          }}
        >
          {photo.tag}
        </span>
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
        <p
          className="text-white leading-tight"
          style={{
            fontFamily: "Mulish, sans-serif",
            fontWeight: 700,
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
    <section className="w-full bg-[#f2e8de] px-12 py-16 flex flex-col gap-12">

      {/* Header */}
      <div className="flex flex-col gap-3">
        <SectionLabel text="Galerie de produse" />
        <div className="flex flex-col" style={{ gap: "2px" }}>
          <h2
            className="text-[#222b37]"
            style={{ fontFamily: "Mulish, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.3vw, 48px)", lineHeight: 1.1 }}
          >
            Ce producem
          </h2>
          <h2
            className="bg-clip-text text-transparent"
            style={{
              fontFamily: "Mulish, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.3vw, 48px)",
              lineHeight: 1.1,
              backgroundImage: "linear-gradient(90deg, #f5a623, #d30052)",
            }}
          >
            pentru tine
          </h2>
        </div>
      </div>

      {/* ── Part A: Gallery slider 2×3 ─────────────────────────────────────── */}
      <GallerySlider />

    </section>
  );
}