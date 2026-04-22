import { useState } from "react";
import svgPaths from "../../imports/Website/svg-kqn5vv4qme";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Servicii", href: "#servicii" },
  { label: "Produse", href: "#produse" },
  { label: "Cum funcționează", href: "#cum-functioneaza" },
  { label: "Cerere ofertă", href: "#cerere-oferta" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth" });
}

function CismindLogo() {
  return (
    <a
      href="#hero"
      onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
      className="flex items-center gap-2.5"
    >
      <svg width="30" height="28" fill="none" viewBox="0 0 30.185 27.1096" className="shrink-0">
        <path d={svgPaths.p10b00d00} fill="#e70050" />
        <path d={svgPaths.p2425f80} fill="#652f7d" />
        <path d={svgPaths.p3e726000} fill="#FFA800" />
      </svg>
      <span className="text-[#202b38] tracking-widest uppercase font-semibold text-[15px]" style={{ fontFamily: "Inter, sans-serif" }}>
        CISMIND
      </span>
    </a>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollTo(href);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f5ece0] py-4">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex items-center justify-between">
        <CismindLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-[#445e79] text-sm tracking-[0.14px] hover:opacity-70 transition-opacity font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cerere-oferta"
            onClick={(e) => handleNav(e, "#cerere-oferta")}
            className="bg-[#202b38] text-white text-[13px] tracking-[0.65px] px-5 py-2.5 hover:bg-[#314559] transition-colors font-semibold rounded-xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            CERE OFERTĂ
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#202b38]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Închide meniu" : "Deschide meniu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="absolute top-full left-0 right-0 bg-[#f5ece0] border-t border-[#e0d5c9] py-4 md:hidden shadow-lg">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-[#202b38] text-base font-medium py-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
