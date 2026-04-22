import { Link } from "react-router";
import { Mail, MapPin, Instagram, Facebook } from "lucide-react";

const NAV_LINKS = [
  { label: "Servicii", href: "#servicii" },
  { label: "Produse", href: "#produse" },
  { label: "Cum funcționează", href: "#cum-functioneaza" },
  { label: "Cerere ofertă", href: "#cerere-oferta" },
];

const LEGAL_LINKS = [
  { label: "Politică de Confidențialitate", to: "/politica-de-confidentialitate" },
  { label: "Politică Cookies", to: "/cookies" },
  { label: "Termeni și Condiții", to: "/termeni-si-conditii" },
];

export function Footer() {
  return (
    <footer style={{ background: "#202b38" }} className="text-white">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-16 flex flex-col gap-12">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Cismind logo" className="h-9 w-auto" onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }} />
              <span className="text-[20px] font-['Mulish',sans-serif] font-extrabold tracking-tight">
                CISMIND
              </span>
            </div>
            <p className="text-white/55 text-[14px] leading-relaxed font-['Mulish',sans-serif] max-w-[260px]">
              Atelier de producție print din inima Sibiului. Transformăm ideile în produse care impresionează.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/cismind.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.08)" }}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/cismind"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.08)" }}
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] uppercase tracking-[1.4px] font-['Inter',sans-serif] font-semibold text-white/40">
              Navigare
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/65 hover:text-white text-[14px] font-['Mulish',sans-serif] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + company */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] uppercase tracking-[1.4px] font-['Inter',sans-serif] font-semibold text-white/40">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:comenzi@cismind.ro"
                className="flex items-center gap-2.5 text-white/65 hover:text-white text-[14px] font-['Mulish',sans-serif] transition-colors"
              >
                <Mail size={14} className="flex-shrink-0" style={{ color: "#ffa300" }} />
                comenzi@cismind.ro
              </a>
              <div className="flex items-start gap-2.5 text-white/55 text-[14px] font-['Mulish',sans-serif]">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#ffa300" }} />
                <span>Strada Școlii de Înot 22<br />Sibiu, România</span>
              </div>
            </div>

            {/* Company details */}
            <div className="mt-2 pt-4 border-t border-white/10 flex flex-col gap-1.5">
              <p className="text-white/35 text-[12px] font-['Mulish',sans-serif]">
                CISMIND SOLUTIONS S.R.L.
              </p>
              <p className="text-white/35 text-[12px] font-['Mulish',sans-serif]">
                CUI: RO 52496293
              </p>
            </div>
          </div>
        </div>

        {/* EU Funds placeholder */}
        <div
          className="flex items-center gap-4 px-5 py-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-[20px]"
            style={{ background: "rgba(255,163,0,0.15)" }}
          >
            🇪🇺
          </div>
          <p className="text-white/50 text-[12px] font-['Mulish',sans-serif] leading-relaxed">
            Proiect cofinanțat din fonduri europene.{" "}
            <span className="text-white/30">[Logo fonduri europene — în curs de adăugare]</span>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-white/35 text-[12px] font-['Mulish',sans-serif]">
            © {new Date().getFullYear()} CISMIND SOLUTIONS S.R.L. Toate drepturile rezervate.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {LEGAL_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-white/35 hover:text-white/70 text-[12px] font-['Mulish',sans-serif] transition-colors"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 hover:text-white/70 text-[12px] font-['Mulish',sans-serif] transition-colors"
            >
              ANPC
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
