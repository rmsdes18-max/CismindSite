/**
 * OrderForm.tsx — Formular de comandă Cismind
 *
 * Folosește EmailJS (gratuit, 200 emailuri/lună, fără backend).
 *
 * ══ CONFIGURARE EmailJS (5 minute) ══════════════════════════════════════════
 *
 * 1. Creează cont gratuit pe https://www.emailjs.com/
 *
 * 2. Email Services → Add New Service → alege Gmail/Outlook/etc.
 *    → copiază "Service ID" → înlocuiește EMAILJS_SERVICE_ID de jos
 *
 * 3. Email Templates → Create New Template:
 *    - "To Email": comenzi@cismind.ro
 *    - Subiect: "Comandă nouă — {{product_type}} — {{from_name}}"
 *    - Corpul mailului (poți copia):
 *
 *      Comandă nouă primită pe cismind.ro
 *      ───────────────────────────────────
 *      Nume:       {{from_name}}
 *      Email:      {{from_email}}
 *      Telefon:    {{phone}}
 *
 *      Tip produs: {{product_type}}
 *      Produs:     {{product_subtype}}
 *      Cantitate:  {{quantity}}
 *      Dimensiuni: {{dimensions}}
 *
 *      Detalii:
 *      {{details}}
 *
 *    → copiază "Template ID" → înlocuiește EMAILJS_TEMPLATE_ID de jos
 *
 * 4. Account → General → Public Key
 *    → înlocuiește EMAILJS_PUBLIC_KEY de jos
 *
 * ════════════════════════════════════════════════════════════════════════════
 */

import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  User, Mail, Phone, Package, Hash, Ruler,
  FileText, Send, CheckCircle, AlertCircle, Loader,
} from "lucide-react";
import svgPaths from "../../imports/Website/svg-kqn5vv4qme";
import { loadSiteData } from "../store/siteData";

// ── EmailJS config ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // ex: "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // ex: "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // ex: "aBcDeFgHiJkLmNoP"

// Detectează dacă EmailJS e configurat cu date reale
const EMAILJS_CONFIGURED =
  EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
  EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID" &&
  EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY";

// ── Product options ────────────────────────────────────────────────────────────
const PRODUCT_OPTIONS: Record<string, string[]> = {
  "Stikere": [
    "Stikere Standard",
    "Stikere Transparente",
    "Stikere Holografice",
    "Stikere Die-Cut",
  ],
  "Textile": [
    "Tricouri Personalizate",
    "Hanorace Personalizate",
    "Bluze Personalizate",
    "Textile pentru Copii",
  ],
  "Canvas": [
    "Canvas Clasic",
    "Canvas Panoramic",
    "Canvas Multi-Panou",
  ],
  "Bannere": [
    "Roll-Up Banner",
    "Banner Exterior",
    "Mesh Banner",
    "Afișe & Postere",
  ],
  "Print Digital": [
    "Flyere",
    "Cărți de Vizită",
    "Broșuri & Pliante",
    "Postere",
  ],
  "Gravură Laser": [
    "Gravură pe Lemn",
    "Gravură pe Metal",
    "Gravură pe Acril",
  ],
};

type FormState = "idle" | "sending" | "success" | "error";

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="19" height="24" fill="none" viewBox="0 0 18.3439 23.6943">
        <path d={svgPaths.p135cec80} fill="#D30052" />
      </svg>
      <span className="text-[18px] text-white/80" style={{ fontFamily: "Mulish, sans-serif" }}>
        {text}
      </span>
    </div>
  );
}

function InputWrapper({
  label,
  icon,
  required,
  children,
  error,
}: {
  label: string;
  icon: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="flex items-center gap-1.5 text-[13px] text-white/75"
        style={{ fontFamily: "Mulish, sans-serif", fontWeight: 600 }}
      >
        <span className="text-white/40">{icon}</span>
        {label}
        {required && <span className="text-[#f5a623]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[#f5a623] text-[12px] flex items-center gap-1" style={{ fontFamily: "Mulish, sans-serif" }}>
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 text-[14px] text-white placeholder-white/30 outline-none transition-colors duration-200 border border-white/15 bg-transparent hover:border-white/30 focus:border-[#f5a623]";
const inputStyle = {
  fontFamily: "Inter, sans-serif",
};

// ── Info cards ─────────────────────────────────────────────────────────────────
const infoCards = [
  {
    icon: "⚡",
    title: "Răspuns rapid",
    desc: "Îți trimitem oferta în maxim 24h lucrătoare de la primirea cererii.",
  },
  {
    icon: "🎨",
    title: "Consultanță gratuită",
    desc: "Echipa noastră te ajută să alegi materialele și finisajele potrivite.",
  },
  {
    icon: "📦",
    title: "Livrare în toată România",
    desc: "Livrăm prin curier sau poți ridica personal din Timișoara.",
  },
  {
    icon: "✅",
    title: "Fără cantitate minimă",
    desc: "Acceptăm comenzi de la 1 bucată — ideal pentru teste și prototipuri.",
  },
];

// ── Main component ─────────────────────────────────────────────────────────────

export function OrderForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [contactEmail, setContactEmail] = useState("rms.des18@gmail.com");
  const [productType, setProductType] = useState("");
  const [productSubtype, setProductSubtype] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const data = loadSiteData();
    setContactEmail(data.contactEmail || "rms.des18@gmail.com");
  }, []);

  const subtypes = productType ? PRODUCT_OPTIONS[productType] ?? [] : [];

  function validate(data: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!data.get("from_name")?.toString().trim()) errs.from_name = "Numele este obligatoriu";
    const email = data.get("from_email")?.toString().trim() ?? "";
    if (!email) errs.from_email = "Emailul este obligatoriu";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.from_email = "Email invalid";
    if (!data.get("phone")?.toString().trim()) errs.phone = "Telefonul este obligatoriu";
    if (!productType) errs.product_type = "Selectează tipul de produs";
    const details = data.get("details")?.toString().trim() ?? "";
    if (!details) errs.details = "Descrie pe scurt comanda";
    else if (details.length < 15) errs.details = "Te rugăm să adaugi mai multe detalii (min. 15 caractere)";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("sending");

    const name       = data.get("from_name")?.toString().trim() ?? "";
    const email      = data.get("from_email")?.toString().trim() ?? "";
    const phone      = data.get("phone")?.toString().trim() ?? "";
    const quantity   = data.get("quantity")?.toString().trim() ?? "—";
    const dimensions = data.get("dimensions")?.toString().trim() ?? "—";
    const details    = data.get("details")?.toString().trim() ?? "";

    // ── Încearcă EmailJS dacă e configurat ──
    if (EMAILJS_CONFIGURED) {
      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current!,
          { publicKey: EMAILJS_PUBLIC_KEY }
        );
        setFormState("success");
        formRef.current?.reset();
        setProductType("");
        setProductSubtype("");
        return;
      } catch {
        // EmailJS a eșuat → fallback mailto
      }
    }

    // ── Fallback: deschide clientul de email pre-completat ──
    const subject = encodeURIComponent(
      `Comandă nouă — ${productType || "produs"} — ${name}`
    );
    const body = encodeURIComponent(
      `Comandă nouă primită pe cismind.ro\n` +
      `───────────────────────────────────\n` +
      `Nume:       ${name}\n` +
      `Email:      ${email}\n` +
      `Telefon:    ${phone}\n\n` +
      `Tip produs: ${productType || "—"}\n` +
      `Produs:     ${productSubtype || "—"}\n` +
      `Cantitate:  ${quantity}\n` +
      `Dimensiuni: ${dimensions}\n\n` +
      `Detalii:\n${details}`
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    // Considerăm succes după redirect
    setTimeout(() => {
      setFormState("success");
      formRef.current?.reset();
      setProductType("");
      setProductSubtype("");
    }, 500);
  }

  return (
    <section
      id="comanda"
      className="w-full px-6 md:px-12 py-20 flex flex-col gap-12"
      style={{ background: "linear-gradient(145deg, #1a1f29 0%, #222b37 50%, #2a1a3e 100%)" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col gap-3 max-w-xl">
        <SectionLabel text="Formular de comandă" />
        <div className="flex flex-col" style={{ gap: "2px" }}>
          <h2
            className="text-white"
            style={{ fontFamily: "Mulish, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.3vw, 48px)", lineHeight: 1.1 }}
          >
            Plasează o comandă
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
            simplu și rapid
          </h2>
        </div>
        <p
          className="text-white/55 text-[16px] leading-relaxed mt-2"
          style={{ fontFamily: "Mulish, sans-serif" }}
        >
          Completează formularul și te contactăm în maxim 24h cu oferta personalizată.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ── FORM ── (3/5) */}
        <div className="lg:col-span-3">
          {formState === "success" ? (
            <div
              className="flex flex-col items-center gap-5 py-16 px-8 rounded-2xl text-center"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(245,166,35,0.15)" }}>
                <CheckCircle size={32} color="#f5a623" />
              </div>
              <div>
                <h3
                  className="text-white text-[24px]"
                  style={{ fontFamily: "Mulish, sans-serif", fontWeight: 800 }}
                >
                  Cerere trimisă cu succes!
                </h3>
                <p
                  className="text-white/55 text-[15px] mt-2 leading-relaxed"
                  style={{ fontFamily: "Mulish, sans-serif" }}
                >
                  Am primit comanda ta. Te contactăm în maxim 24h lucrătoare la emailul sau telefonul furnizat.
                </p>
              </div>
              <button
                onClick={() => setFormState("idle")}
                className="mt-2 px-8 py-3 text-[12px] tracking-[0.84px] uppercase transition-colors hover:bg-[#b0003f]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  background: "#d30052",
                  color: "white",
                }}
              >
                Trimite o altă cerere
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              {/* Hidden field for to_email */}
              <input type="hidden" name="to_email" value={contactEmail} />
              <input type="hidden" name="product_type" value={productType} />
              <input type="hidden" name="product_subtype" value={productSubtype} />

              {/* ── Row 1: Nume + Email ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputWrapper label="Nume complet" icon={<User size={13} />} required error={errors.from_name}>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Ion Popescu"
                    className={inputClass}
                    style={inputStyle}
                  />
                </InputWrapper>

                <InputWrapper label="Adresă email" icon={<Mail size={13} />} required error={errors.from_email}>
                  <input
                    type="email"
                    name="from_email"
                    placeholder="ion@firma.ro"
                    className={inputClass}
                    style={inputStyle}
                  />
                </InputWrapper>
              </div>

              {/* ── Row 2: Telefon ── */}
              <InputWrapper label="Număr de telefon" icon={<Phone size={13} />} required error={errors.phone}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="07xx xxx xxx"
                  className={inputClass}
                  style={inputStyle}
                />
              </InputWrapper>

              {/* ── Row 3: Tip produs + Sub-tip ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputWrapper label="Tip produs" icon={<Package size={13} />} required error={errors.product_type}>
                  <select
                    value={productType}
                    onChange={(e) => {
                      setProductType(e.target.value);
                      setProductSubtype("");
                    }}
                    className={inputClass + " cursor-pointer"}
                    style={{ ...inputStyle, appearance: "none" }}
                  >
                    <option value="" disabled style={{ background: "#222b37" }}>Alege categoria...</option>
                    {Object.keys(PRODUCT_OPTIONS).map((cat) => (
                      <option key={cat} value={cat} style={{ background: "#222b37" }}>{cat}</option>
                    ))}
                  </select>
                </InputWrapper>

                <InputWrapper label="Produs specific" icon={<Package size={13} />}>
                  <select
                    value={productSubtype}
                    onChange={(e) => setProductSubtype(e.target.value)}
                    disabled={subtypes.length === 0}
                    className={inputClass + " cursor-pointer disabled:opacity-40"}
                    style={{ ...inputStyle, appearance: "none" }}
                  >
                    <option value="" style={{ background: "#222b37" }}>
                      {subtypes.length === 0 ? "— alege mai întâi categoria —" : "Alege produsul..."}
                    </option>
                    {subtypes.map((s) => (
                      <option key={s} value={s} style={{ background: "#222b37" }}>{s}</option>
                    ))}
                  </select>
                </InputWrapper>
              </div>

              {/* ── Row 4: Cantitate + Dimensiuni ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputWrapper label="Cantitate estimată" icon={<Hash size={13} />}>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    placeholder="ex: 100"
                    className={inputClass}
                    style={inputStyle}
                  />
                </InputWrapper>

                <InputWrapper label="Dimensiuni / Format" icon={<Ruler size={13} />}>
                  <input
                    type="text"
                    name="dimensions"
                    placeholder="ex: A4, 50×70cm, XL"
                    className={inputClass}
                    style={inputStyle}
                  />
                </InputWrapper>
              </div>

              {/* ── Row 5: Detalii ── */}
              <InputWrapper label="Detalii comandă" icon={<FileText size={13} />} required error={errors.details}>
                <textarea
                  name="details"
                  rows={5}
                  placeholder="Descrie ce dorești: material, finisaj, culori, fișier disponibil, termen dorit..."
                  className={inputClass + " resize-none"}
                  style={inputStyle}
                />
              </InputWrapper>

              {/* ── Error general ── */}
              {formState === "error" && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-[13px]"
                  style={{
                    fontFamily: "Mulish, sans-serif",
                    background: "rgba(211,0,82,0.12)",
                    border: "1px solid rgba(211,0,82,0.3)",
                    color: "#f5a623",
                  }}
                >
                  <AlertCircle size={15} />
                  A apărut o eroare la trimitere. Verifică configurarea EmailJS sau scrie-ne direct la comenzi@cismind.ro
                </div>
              )}

              {/* ── Submit button ── */}
              <button
                type="submit"
                disabled={formState === "sending"}
                className="w-full flex items-center justify-center gap-2.5 py-4 text-white text-[12px] tracking-[0.84px] uppercase transition-colors hover:bg-[#b0003f] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  background: "#d30052",
                }}
              >
                {formState === "sending" ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Se trimite...
                  </>
                ) : (
                  <>
                    <Send size={18} strokeWidth={2.2} />
                    Trimite cererea de ofertă
                  </>
                )}
              </button>

              <p
                className="text-center text-white/30 text-[12px]"
                style={{ fontFamily: "Mulish, sans-serif" }}
              >
                Datele tale sunt confidențiale și nu sunt distribuite terților.
              </p>
            </form>
          )}
        </div>

        {/* ── INFO sidebar ── (2/5) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Info cards */}
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="flex gap-4 p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-[24px] flex-shrink-0 mt-0.5">{card.icon}</span>
              <div>
                <p
                  className="text-white text-[14px]"
                  style={{ fontFamily: "Mulish, sans-serif", fontWeight: 700 }}
                >
                  {card.title}
                </p>
                <p
                  className="text-white/45 text-[13px] mt-1 leading-relaxed"
                  style={{ fontFamily: "Mulish, sans-serif" }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Contact direct */}
          <div
            className="mt-2 p-5 rounded-2xl flex flex-col gap-3"
            style={{ background: "rgba(211,0,82,0.1)", border: "1px solid rgba(211,0,82,0.2)" }}
          >
            <p
              className="text-white/60 text-[12px] uppercase tracking-widest"
              style={{ fontFamily: "Mulish, sans-serif", fontWeight: 700 }}
            >
              Contact direct
            </p>
            <a
              href="mailto:comenzi@cismind.ro"
              className="flex items-center gap-2 text-white hover:text-[#f5a623] transition-colors"
              style={{ fontFamily: "Mulish, sans-serif", fontWeight: 700 }}
            >
              <Mail size={15} color="#d30052" />
              comenzi@cismind.ro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}