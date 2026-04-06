import svgPaths from "../../imports/Website/svg-kqn5vv4qme";

const navLinks = ["Servicii", "Produse", "Comanda ta", "Cerere ofertă", "Contact"];

function CismindLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="30" height="28" fill="none" viewBox="0 0 30.185 27.1096" className="shrink-0">
        <path d={svgPaths.p10b00d00} fill="#D30052" />
        <path d={svgPaths.p2425f80} fill="#5E3279" />
        <path d={svgPaths.p3e726000} fill="#FFA800" />
      </svg>
      <span
        className="text-[#222b37] tracking-widest uppercase"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15 }}
      >
        CISMIND
      </span>
    </div>
  );
}

export function Navbar() {
  return (
    <header className="w-full bg-[#f2e8de] px-12 py-4 flex items-center justify-between">
      <CismindLogo />

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[#222b37] text-sm tracking-[0.14px] hover:opacity-70 transition-opacity"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
          >
            {link}
          </a>
        ))}
      </nav>

      <button
        className="bg-[#111] text-white text-[13px] tracking-[0.65px] px-5 py-2.5 hover:bg-[#333] transition-colors"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
      >
        CERE OFERTĂ
      </button>
    </header>
  );
}
