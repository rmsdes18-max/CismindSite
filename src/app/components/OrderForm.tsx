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
  Zap, Palette, MapPin,
} from "lucide-react";
import svgPaths from "../../imports/Website/svg-kqn5vv4qme";
import { loadSiteData } from "../store/siteData";

// ── EmailJS config (set in .env) ────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? "";

// Detectează dacă EmailJS e configurat cu date reale
const EMAILJS_CONFIGURED =
  EMAILJS_SERVICE_ID !== "" &&
  EMAILJS_TEMPLATE_ID !== "" &&
  EMAILJS_PUBLIC_KEY !== "";

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
        <path d={svgPaths.p135cec80} fill="#e70050" />
      </svg>
      <span className="text-[18px] text-white/80 font-['Mulish',sans-serif]">
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
  htmlFor,
}: {
  label: string;
  icon: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  htmlFor?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1.5 text-[13px] text-white/75 font-['Mulish',sans-serif] font-semibold"
      >
        <span className="text-white/60">{icon}</span>
        {label}
        {required && <span className="text-[#ffa300]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[#ffa300] text-[12px] flex items-center gap-1 font-['Mulish',sans-serif]">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 text-[14px] text-white placeholder-white/40 outline-none transition-colors duration-200 border border-white/20 bg-white/5 hover:border-white/35 focus:border-[#ffa300] rounded-xl font-['Mulish',sans-serif]";

// ── Info cards ─────────────────────────────────────────────────────────────────
const infoCards = [
  {
    Icon: Zap,
    color: "#ffa300",
    title: "Răspuns rapid",
    desc: "Îți trimitem oferta în maxim 24h lucrătoare de la primirea cererii.",
  },
  {
    Icon: Palette,
    color: "#e70050",
    title: "Consultanță gratuită",
    desc: "Echipa noastră te ajută să alegi materialele și finisajele potrivite.",
  },
  {
    Icon: MapPin,
    color: "#652f7d",
    title: "Livrare în toată România",
    desc: "Livrăm prin curier sau poți ridica personal din Timișoara.",
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
      className="w-full py-20"
      style={{ background: "linear-gradient(145deg, #1a1f29 0%, #222b37 50%, #2a1a3e 100%)" }}
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-10">
      {/* ── Header ── */}
      <div className="flex flex-col gap-3 max-w-xl">
        <SectionLabel text="Formular de comandă" />
        <div className="flex flex-col" style={{ gap: "2px" }}>
          <h2
            className="text-white font-['Mulish',sans-serif] font-extrabold leading-[1.1]"
            style={{ fontSize: "clamp(28px, 3.3vw, 48px)" }}
          >
            Plasează o comandă
          </h2>
          <h2
            className="font-['Mulish',sans-serif] font-extrabold leading-[1.1]"
            style={{
              fontSize: "clamp(28px, 3.3vw, 48px)",
              color: "#e70050",
            }}
          >
            simplu și rapid
          </h2>
        </div>
        <p
          className="text-white/55 text-[16px] leading-relaxed mt-2 font-['Mulish',sans-serif]"
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
              className="flex flex-col items-center gap-5 py-16 px-8 rounded-xl text-center"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(245,166,35,0.15)" }}>
                <CheckCircle size={32} color="#ffa300" />
              </div>
              <div>
                <h3
                  className="text-white text-[24px] font-['Mulish',sans-serif] font-extrabold"
                >
                  Cerere trimisă cu succes!
                </h3>
                <p
                  className="text-white/55 text-[15px] mt-2 leading-relaxed font-['Mulish',sans-serif]"
                >
                  Am primit comanda ta. Te contactăm în maxim 24h lucrătoare la emailul sau telefonul furnizat.
                </p>
              </div>
              <button
                onClick={() => setFormState("idle")}
                className="mt-2 px-8 py-3 text-[12px] tracking-[0.84px] uppercase transition-colors hover:bg-[#b0003f] font-['Inter',sans-serif] font-semibold text-white rounded-xl"
                style={{
                  background: "#e70050",
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
                <InputWrapper label="Nume complet" icon={<User size={13} />} required error={errors.from_name} htmlFor="from_name">
                  <input
                    id="from_name"
                    type="text"
                    name="from_name"
                    placeholder="Radu Marcel"
                    aria-required="true"
                    aria-invalid={!!errors.from_name}
                    className={inputClass}

                  />
                </InputWrapper>

                <InputWrapper label="Adresă email" icon={<Mail size={13} />} required error={errors.from_email} htmlFor="from_email">
                  <input
                    id="from_email"
                    type="email"
                    name="from_email"
                    placeholder="ion@firma.ro"
                    aria-required="true"
                    aria-invalid={!!errors.from_email}
                    className={inputClass}

                  />
                </InputWrapper>
              </div>

              {/* ── Row 2: Telefon ── */}
              <InputWrapper label="Număr de telefon" icon={<Phone size={13} />} required error={errors.phone} htmlFor="phone">
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="07xx xxx xxx"
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  className={inputClass}
                />
              </InputWrapper>

              {/* ── Row 3: Tip produs + Sub-tip ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputWrapper label="Tip produs" icon={<Package size={13} />} required error={errors.product_type} htmlFor="product_type">
                  <select
                    id="product_type"
                    value={productType}
                    onChange={(e) => {
                      setProductType(e.target.value);
                      setProductSubtype("");
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.product_type}
                    className={inputClass + " cursor-pointer"}
                    style={{ appearance: "none" }}
                  >
                    <option value="" disabled style={{ background: "#222b37" }}>Alege categoria...</option>
                    {Object.keys(PRODUCT_OPTIONS).map((cat) => (
                      <option key={cat} value={cat} style={{ background: "#222b37" }}>{cat}</option>
                    ))}
                  </select>
                </InputWrapper>

                <InputWrapper label="Produs specific" icon={<Package size={13} />} htmlFor="product_subtype">
                  <select
                    id="product_subtype"
                    value={productSubtype}
                    onChange={(e) => setProductSubtype(e.target.value)}
                    disabled={subtypes.length === 0}
                    className={inputClass + " cursor-pointer disabled:opacity-40"}
                    style={{ appearance: "none" }}
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
                <InputWrapper label="Cantitate estimată" icon={<Hash size={13} />} htmlFor="quantity">
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    min="1"
                    placeholder="ex: 100"
                    className={inputClass}

                  />
                </InputWrapper>

                <InputWrapper label="Dimensiuni / Format" icon={<Ruler size={13} />} htmlFor="dimensions">
                  <input
                    id="dimensions"
                    type="text"
                    name="dimensions"
                    placeholder="ex: A4, 50×70cm, XL"
                    className={inputClass}

                  />
                </InputWrapper>
              </div>

              {/* ── Row 5: Detalii ── */}
              <InputWrapper label="Detalii comandă" icon={<FileText size={13} />} required error={errors.details} htmlFor="details">
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  aria-required="true"
                  aria-invalid={!!errors.details}
                  placeholder="Descrie ce dorești: material, finisaj, culori, fișier disponibil, termen dorit..."
                  className={inputClass + " resize-none"}
                />
              </InputWrapper>

              {/* ── Error general ── */}
              {formState === "error" && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-[13px] font-['Mulish',sans-serif]"
                  style={{
                    background: "rgba(211,0,82,0.12)",
                    border: "1px solid rgba(211,0,82,0.3)",
                    color: "#ffa300",
                  }}
                >
                  <AlertCircle size={15} />
                  A apărut o eroare la trimitere. Verifică configurarea EmailJS sau scrie-ne direct la comenzi@cismind.ro
                </div>
              )}

              {/* ── Submit button ── */}
              <button
                type="submit"
                disabled
                className="w-full flex items-center justify-center gap-2.5 py-4 text-white text-[12px] tracking-[0.84px] uppercase mt-2 font-['Inter',sans-serif] font-semibold rounded-xl opacity-50 cursor-not-allowed"
                style={{
                  background: "#e70050",
                }}
              >
                <Send size={18} strokeWidth={2.2} />
                Momentan indisponibil — revenim în curând
              </button>

              <p
                className="text-center text-white/60 text-[12px] font-['Mulish',sans-serif]"
              >
                Datele tale sunt confidențiale și nu sunt distribuite terților.
              </p>
            </form>
          )}
        </div>

        {/* ── INFO sidebar ── (2/5) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Info cards */}
          {infoCards.map(({ Icon, color, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 p-5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}20` }}
              >
                <Icon size={18} color={color} strokeWidth={2} />
              </div>
              <div>
                <p className="text-white text-[14px] font-['Mulish',sans-serif] font-bold">
                  {title}
                </p>
                <p className="text-white/60 text-[13px] mt-1 leading-relaxed font-['Mulish',sans-serif]">
                  {desc}
                </p>
              </div>
            </div>
          ))}

          {/* Contact direct */}
          <div
            className="mt-2 p-5 rounded-xl flex flex-col gap-3"
            style={{ background: "rgba(211,0,82,0.1)", border: "1px solid rgba(211,0,82,0.2)" }}
          >
            <p
              className="text-white/60 text-[12px] uppercase tracking-widest font-['Mulish',sans-serif] font-bold"
            >
              Contact direct
            </p>
            <a
              href="mailto:comenzi@cismind.ro"
              className="flex items-center gap-2 text-white hover:text-[#ffa300] transition-colors font-['Mulish',sans-serif] font-bold"
            >
              <Mail size={15} color="#e70050" />
              comenzi@cismind.ro
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}