import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../Footer";
import { CookieBanner } from "../CookieBanner";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Simple header */}
      <header className="sticky top-0 z-50 border-b border-[#e8ecf0]" style={{ background: "#f5ece0" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Cismind" className="h-8 w-auto" onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }} />
            <span className="font-['Mulish',sans-serif] font-extrabold text-[#202b38] text-[18px]">CISMIND</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-[13px] font-['Inter',sans-serif] font-semibold text-[#445e79] hover:text-[#202b38] transition-colors"
          >
            <ArrowLeft size={14} />
            Înapoi la site
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-[800px] mx-auto w-full px-6 md:px-12 py-16">
        <h1 className="text-[#202b38] font-['Mulish',sans-serif] font-extrabold mb-10" style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>
          {title}
        </h1>
        <div className="prose-legal">
          {children}
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
