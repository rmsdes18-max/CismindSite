import { useState, useEffect } from "react";
import { Link } from "react-router";
import { X, Cookie } from "lucide-react";

const COOKIE_KEY = "cismind_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4 md:px-6"
    >
      <div
        className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl shadow-2xl"
        style={{
          background: "#202b38",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Cookie size={22} color="#ffa300" className="flex-shrink-0 mt-0.5 sm:mt-0" />

        <p className="text-white/70 text-[13px] font-['Mulish',sans-serif] leading-relaxed flex-1">
          Folosim cookie-uri pentru a îmbunătăți experiența pe site. Prin continuarea navigării ești de acord cu{" "}
          <Link
            to="/cookies"
            className="text-[#ffa300] hover:underline"
          >
            Politica de Cookies
          </Link>
          .
        </p>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-[12px] font-['Inter',sans-serif] font-semibold text-white/50 hover:text-white transition-colors rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Refuză
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-[12px] font-['Inter',sans-serif] font-semibold text-white rounded-xl transition-opacity hover:opacity-85"
            style={{ background: "#ffa300" }}
          >
            Acceptă
          </button>
          <button
            onClick={decline}
            className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            aria-label="Închide"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
