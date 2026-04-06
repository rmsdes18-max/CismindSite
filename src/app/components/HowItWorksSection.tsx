import svgPaths from "../../imports/Website/svg-kqn5vv4qme";
import svgIcons from "../../imports/Section-1/svg-6jnrd90je1";

// ── Section label (same as in OrderForm / HeroSection) ────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <svg width="19" height="24" fill="none" viewBox="0 0 18.3439 23.6943">
        <path d={svgPaths.p135cec80} fill="#D30052" />
      </svg>
      <span
        className="text-[18px] text-white/60"
        style={{ fontFamily: "Mulish, sans-serif" }}
      >
        {text}
      </span>
    </div>
  );
}

// ── Step data ─────────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    accent: "#F5A623",
    title: "Alegi produsul",
    desc: "Explorezi serviciile noastre și selectezi ce tip de produs ai nevoie.",
    icon: (color: string) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d={svgIcons.p19568f00} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 21L16.7 16.7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    accent: "#D30052",
    title: "Completezi cererea",
    desc: "Completezi formularul cu detalii: cantitate, dimensiune și specificații tehnice.",
    icon: (color: string) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d={svgIcons.pb47f400} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={svgIcons.p17a13100} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 9H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 17H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    accent: "#5E3279",
    title: "Încarci fișierul",
    desc: "Trimiți fișierele de design gata pentru print sau ceri ajutorul echipei noastre.",
    icon: (color: string) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d={svgIcons.p2d557600} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 8L12 3L7 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3V15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    accent: "#F5A623",
    title: "Primești oferta",
    desc: "În maxim 24h primești o ofertă personalizată cu preț și termen de livrare.",
    icon: (color: string) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d={svgIcons.p1f023100} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11L12 14L22 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// ── Main component ─────────────────────────────────────────────────────────────
export function HowItWorksSection() {
  return (
    <section
      className="w-full px-6 md:px-12 py-20 flex flex-col items-center gap-14"
      style={{ background: "#1c2130" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col items-center gap-3 text-center max-w-xl">
        <SectionLabel text="Procesul nostru" />
        <h2
          className="text-white mt-1"
          style={{
            fontFamily: "Mulish, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 3.3vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
          }}
        >
          Cum funcționează
        </h2>
        <p
          className="text-white/45 text-[15px] leading-relaxed mt-1"
          style={{ fontFamily: "Mulish, sans-serif" }}
        >
          Procesul simplu în 4 pași — de la idee până la produsul finit livrat la ușa ta.
        </p>
      </div>

      {/* ── Steps grid ── */}
      <div className="w-full max-w-5xl relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">

        {/* Connecting line — desktop only */}
        <div
          className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 15%, rgba(255,255,255,0.08) 85%, rgba(255,255,255,0) 100%)",
          }}
        />

        {steps.map((step, i) => (
          <div
            key={step.number}
            className="flex flex-col gap-5 px-6 lg:px-5 relative"
            style={{
              borderRight: i < steps.length - 1
                ? "1px solid rgba(255,255,255,0.06)"
                : "none",
            }}
          >
            {/* Icon box + badge */}
            <div className="relative w-fit">
              {/* Badge */}
              <div
                className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center z-10"
                style={{ background: step.accent }}
              >
                <span
                  className="text-white"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "9px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Icon container */}
              <div
                className="w-16 h-16 flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${step.accent}30`,
                }}
              >
                {step.icon(step.accent)}
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h3
                className="text-white"
                style={{
                  fontFamily: "Mulish, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  letterSpacing: "-0.1px",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-white/40 text-[13px] leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA button ── */}
      <a
        href="#comanda"
        className="flex items-center gap-3 px-10 py-4 text-white text-[12px] tracking-[1.1px] uppercase transition-colors hover:bg-[#b0003f] mt-2"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          background: "#D30052",
        }}
      >
        Începe acum → Cere ofertă
      </a>
    </section>
  );
}
