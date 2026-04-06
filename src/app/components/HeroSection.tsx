// Color palette: 4 columns × 7 rows, decreasing opacity
const paletteColumns = [
  { color: "#ffa800", flex: "1" },
  { color: "#d30052", flex: "1" },
  { color: "#5e3279", flex: "1" },
  { color: "#222b37", flex: "0.75" },
];

const opacities = [1, 0.8, 0.6, 0.6, 0.4, 0.2, 0.05];

function ColorPalette() {
  return (
    <div className="flex h-full min-h-[490px] gap-[3px]">
      {paletteColumns.map(({ color, flex }) => (
        <div
          key={color}
          className="flex flex-col gap-[3px]"
          style={{ flex }}
        >
          {opacities.map((opacity, rowIdx) => (
            <div
              key={rowIdx}
              className="flex-1"
              style={{ backgroundColor: color, opacity }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="w-full bg-[#f2e8de] px-12 py-16 flex items-start justify-between gap-12 min-h-[680px]">
      {/* Left: content */}
      <div className="flex flex-col gap-10 max-w-[580px] pt-4">
        {/* Eyebrow */}
        <p
          className="text-[#75777a] text-xs tracking-[1.8px] uppercase"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
        >
          Print House · Sibiu
        </p>

        {/* Headline */}
        <div className="flex flex-col">
          <h1
            className="text-[#222b37] leading-tight"
            style={{ fontFamily: "Mulish, sans-serif", fontWeight: 800, fontSize: "64px" }}
          >
            Fiecare idee
          </h1>
          <h1
            className="leading-tight bg-clip-text text-transparent"
            style={{
              fontFamily: "Mulish, sans-serif",
              fontWeight: 800,
              fontSize: "64px",
              backgroundImage: "linear-gradient(90deg, #f5a623, #c7185b 50%, #6b2fa0)",
            }}
          >
            merită culoare.
          </h1>

          {/* Description */}
          <p
            className="text-[#75777a] text-[17px] leading-[1.55] mt-5 max-w-[456px]"
            style={{ fontFamily: "Mulish, sans-serif" }}
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
              className="bg-[#222b37] text-white text-sm tracking-[0.84px] px-8 py-3 hover:bg-[#3a4556] transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              CERE OFERTĂ
            </button>
            <button
              className="border border-[#222b37] text-[#222b37] text-sm tracking-[0.84px] px-8 py-3 hover:bg-[#222b37] hover:text-white transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              VEZI SERVICII
            </button>
          </div>

          {/* Tagline */}
          <p
            className="text-[13px] tracking-[2.6px] uppercase"
            style={{ fontFamily: "Mulish, sans-serif" }}
          >
            <span style={{ color: "#f5a623" }}>Idee</span>
            <span className="text-[#222b37]"> · </span>
            <span style={{ color: "#d30052" }}>Culoare</span>
            <span className="text-[#222b37]"> · </span>
            <span style={{ color: "#5e3279" }}>Poveste</span>
          </p>
        </div>
      </div>

      {/* Right: color palette */}
      <div className="hidden lg:block flex-shrink-0 w-[38%] max-w-[550px] self-stretch">
        <ColorPalette />
      </div>
    </section>
  );
}