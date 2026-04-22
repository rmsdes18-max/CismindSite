import { motion } from "motion/react";
import { useState } from "react";

const COLUMNS = [
  { top: "#ffa300", bottom: "#fff3d0", label: "Orange" },
  { top: "#e70050", bottom: "#ffd6e7", label: "Pink" },
  { top: "#652f7d", bottom: "#e8d5f5", label: "Purple" },
  { top: "#202b38", bottom: "#c5d5e8", label: "Dark" },
  { top: "#ffffff", bottom: "#f0f0f0", label: "White" },
  { top: "#e8e8e8", bottom: "#ffffff", label: "Gloss" },
];

function ColorPalette() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="flex h-full gap-3 py-6"
      onMouseLeave={() => setHovered(null)}
    >
      {COLUMNS.map(({ top, bottom, label }, i) => {
        const isHovered = hovered === i;
        const isOther = hovered !== null && !isHovered;

        return (
          <motion.div
            key={label}
            className="rounded-2xl overflow-hidden relative cursor-pointer"
            style={{
              background:
                label === "Gloss"
                  ? "linear-gradient(160deg, #ffffff 0%, #d0d0d0 30%, #f8f8f8 55%, #b8b8b8 75%, #ffffff 100%)"
                  : `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`,
              transformOrigin: "bottom center",
              border:
                label === "Gloss" || label === "White"
                  ? "1px solid rgba(0,0,0,0.08)"
                  : "none",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: 1,
              opacity: isOther ? 0.5 : 1,
              flex: isHovered ? 2.2 : 1,
            }}
            transition={{
              scaleY: { duration: 0.75, delay: i * 0.13, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.25 },
              flex: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
            }}
            onHoverStart={() => setHovered(i)}
          />
        );
      })}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="w-full bg-[#f5ece0]">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-14 lg:py-20 flex items-center justify-between gap-12">
      {/* Left: content */}
      <div className="flex flex-col gap-10 max-w-[580px] pt-4">
        {/* Eyebrow */}
        <p
          className="text-[#445e79] text-xs tracking-[1.8px] uppercase font-['Inter',sans-serif] font-semibold"
        >
          Print House · Sibiu
        </p>

        {/* Headline */}
        <div className="flex flex-col">
          <h1
            className="text-[#202b38] leading-[80px] font-['Mulish',sans-serif] font-extrabold text-[64px]"
          >
            Fiecare idee
          </h1>
          <h1
            className="leading-[80px] bg-clip-text text-transparent font-['Mulish',sans-serif] font-extrabold text-[64px]"
            style={{
              backgroundImage: "linear-gradient(90deg, #ffa300, #e70050 50%, #652f7d)",
            }}
          >
            merită culoare.
          </h1>

          {/* Description */}
          <p
            className="text-[#445e79] text-[17px] leading-[26.35px] mt-5 max-w-[456px] font-['Mulish',sans-serif]"
          >
            Suntem un atelier de producție print din inima Sibiului. De la stickere și bannere
            până la textile personalizate și gravură — transformăm ideile tale în produse care
            impresionează.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <button
              className="bg-[#202b38] text-white text-sm tracking-[0.84px] px-8 py-3 hover:bg-[#314559] transition-colors font-['Inter',sans-serif] font-semibold rounded-xl"
            >
              CERE OFERTĂ
            </button>
            <button
              className="border border-[#202b38] text-[#202b38] text-sm tracking-[0.84px] px-8 py-3 hover:bg-[#202b38] hover:text-white transition-colors font-['Inter',sans-serif] font-semibold rounded-xl"
            >
              VEZI SERVICII
            </button>
          </div>

          {/* Tagline */}
          <p
            className="text-[13px] tracking-[2.6px] uppercase font-['Mulish',sans-serif]"
          >
            <span className="text-[#ffa300]">Idee</span>
            <span className="text-[#202b38]"> · </span>
            <span className="text-[#e70050]">Culoare</span>
            <span className="text-[#202b38]"> · </span>
            <span className="text-[#652f7d]">Poveste</span>
          </p>
        </div>
      </div>

      {/* Right: color palette */}
      <div className="hidden lg:flex flex-shrink-0 w-[48%] max-w-[640px] items-center">
        <div className="w-full h-[65vh] max-h-[560px] min-h-[380px]">
          <ColorPalette />
        </div>
      </div>
      </div>
    </section>
  );
}
