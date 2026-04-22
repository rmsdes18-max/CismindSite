import svgIcons from "../../imports/Section-1/svg-6jnrd90je1";

// ── Step data ─────────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    color: "#ffa300",
    title: "Alegi produsul",
    desc: "Explorezi serviciile noastre și selectezi ce tip de produs ai nevoie.",
    icon: (color: string) => (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d={svgIcons.p19568f00} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 21L16.7 16.7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    color: "#e70050",
    title: "Completezi cererea",
    desc: "Completezi formularul cu detalii: cantitate, dimensiune și specificații tehnice.",
    icon: (color: string) => (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
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
    color: "#652f7d",
    title: "Încarci fișierul",
    desc: "Trimiți fișierele de design gata pentru print sau ceri ajutorul echipei noastre.",
    icon: (color: string) => (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d={svgIcons.p2d557600} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 8L12 3L7 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3V15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    color: "#202b38",
    title: "Primești oferta",
    desc: "În maxim 24h primești o ofertă personalizată cu preț și termen de livrare.",
    icon: (color: string) => (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
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
      className="w-full py-20"
      style={{ background: "#f5ece0" }}
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-14">
        {/* Heading only — no subtitle label */}
        <h2
          className="text-[#202b38] leading-tight font-['Mulish',sans-serif] font-extrabold"
          style={{ fontSize: "clamp(32px, 3.3vw, 47.5px)" }}
        >
          Cum funcționează
        </h2>

        {/* ── Desktop: horizontal timeline (hidden on mobile) ── */}
        <div className="hidden lg:flex items-start">
          {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-5 flex-1">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: `${step.color}1e` }}
                >
                  {step.icon(step.color)}
                </div>
                <div className="flex flex-col gap-2 pr-6">
                  <span
                    className="text-[12px] font-['Inter',sans-serif] font-semibold tracking-[0.05em]"
                    style={{ color: step.color }}
                  >
                    {step.number}.
                  </span>
                  <h3 className="text-[#202b38] font-['Mulish',sans-serif] font-bold text-[17px] tracking-[-0.2px]">
                    {step.title}
                  </h3>
                  <p className="text-[#445e79] text-[13px] leading-relaxed font-['Inter',sans-serif]">
                    {step.desc}
                  </p>
                </div>
              </div>
          ))}
        </div>

        {/* ── Mobile/Tablet: vertical timeline (hidden on desktop) ── */}
        <div className="lg:hidden flex flex-col">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-5">
              {/* Timeline rail */}
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${step.color}1e` }}
                >
                  {step.icon(step.color)}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[2px] flex-1 my-2" style={{
                    backgroundImage: `repeating-linear-gradient(180deg, #c9b99a 0, #c9b99a 8px, transparent 8px, transparent 16px)`,
                  }} />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5 pb-8">
                <span
                  className="text-[12px] font-['Inter',sans-serif] font-semibold tracking-[0.05em]"
                  style={{ color: step.color }}
                >
                  {step.number}.
                </span>
                <h3 className="text-[#202b38] font-['Mulish',sans-serif] font-bold text-[17px] tracking-[-0.2px]">
                  {step.title}
                </h3>
                <p className="text-[#445e79] text-[13px] leading-relaxed font-['Inter',sans-serif]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
