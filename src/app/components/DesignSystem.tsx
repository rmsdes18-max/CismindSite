import { colors, fonts, spacing, TAB_COLORS } from "../design-tokens";
import { Tag } from "lucide-react";

// ── Color Swatch ─────────────────────────────────────────────────────────────

function Swatch({ color, label }: { color: string; label: string }) {
  const isLight = ["#f5ece0", "#f7f4fb", "#fff4dd", "#ffd7e9", "#f0e0ff", "#e0f5ea", "#ddeeff", "#e8ecf0", "#e0d9e6", "#e0d3c7"].includes(color);
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full h-16 rounded-lg border border-black/10"
        style={{ background: color }}
      />
      <p className="text-[12px] font-mono text-[#445e79]">{color}</p>
      <p className="text-[13px] font-['Mulish',sans-serif] font-semibold text-[#202b38]">{label}</p>
    </div>
  );
}

// ── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[24px] font-['Mulish',sans-serif] font-extrabold text-[#202b38] border-b border-[#e0d9e6] pb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ── Product Card Preview ─────────────────────────────────────────────────────

function CardPreview({ tabName, active, light }: { tabName: string; active: string; light: string }) {
  return (
    <div className="w-[200px] flex-shrink-0 overflow-hidden flex flex-col">
      <div
        className="w-full h-[100px] flex items-center justify-center"
        style={{ background: light }}
      >
        <Tag size={32} color={active} strokeWidth={1.5} />
      </div>
      <div
        className="p-3 bg-white rounded-t-lg flex flex-col gap-2"
        style={{ border: `1px solid ${active}` }}
      >
        <p className="text-[14px] font-['Mulish',sans-serif] font-bold text-[#202b38]">
          Produs {tabName}
        </p>
        <span className="text-[12px] font-['Mulish',sans-serif] font-semibold text-[#445e79]">
          Vezi detalii &rsaquo;
        </span>
      </div>
    </div>
  );
}

// ── Main Design System Page ──────────────────────────────────────────────────

export function DesignSystem() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-12 flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <p className="text-[12px] uppercase tracking-[2px] text-[#75777a] font-['Inter',sans-serif] font-semibold">
            Dev Only
          </p>
          <h1 className="text-[40px] font-['Mulish',sans-serif] font-extrabold text-[#202b38]">
            Cismind Design System
          </h1>
          <p className="text-[16px] text-[#75777a] font-['Mulish',sans-serif]">
            Token-uri, culori, fonturi si elemente UI. Modifica in <code className="bg-[#f7f4fb] px-1.5 py-0.5 rounded text-[#652f7d] text-[14px]">src/app/design-tokens.ts</code> pentru schimbari globale.
          </p>
        </div>

        {/* ── COLORS ── */}
        <Section title="Culori Brand">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(colors.brand).map(([key, value]) => (
              <Swatch key={key} color={value} label={key} />
            ))}
          </div>
        </Section>

        <Section title="Culori Tab-uri">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {Object.entries(colors.tabs).map(([key, { active, light }]) => (
              <div key={key} className="flex flex-col gap-3">
                <p className="text-[14px] font-['Mulish',sans-serif] font-bold text-[#202b38] capitalize">{key}</p>
                <Swatch color={active} label="active" />
                <Swatch color={light} label="light" />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Culori Text">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {Object.entries(colors.text).map(([key, value]) => (
              <Swatch key={key} color={value} label={key} />
            ))}
          </div>
        </Section>

        {/* ── TYPOGRAPHY ── */}
        <Section title="Tipografie">
          <div className="flex flex-col gap-8">
            {/* Inter */}
            <div className="flex flex-col gap-3 p-6 bg-[#f7f4fb] rounded-xl">
              <p className="text-[12px] uppercase tracking-[1px] text-[#75777a] font-mono">
                {fonts.inter}
              </p>
              <p className="text-[32px] font-['Inter',sans-serif] font-semibold text-[#202b38]">
                Inter — Headlines & Buttons
              </p>
              <div className="flex flex-wrap gap-6 mt-2">
                {[400, 500, 600, 700].map((w) => (
                  <span key={w} className="text-[16px] font-['Inter',sans-serif] text-[#445e79]" style={{ fontWeight: w }}>
                    Weight {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Mulish */}
            <div className="flex flex-col gap-3 p-6 bg-[#f5ece0] rounded-xl">
              <p className="text-[12px] uppercase tracking-[1px] text-[#75777a] font-mono">
                {fonts.mulish}
              </p>
              <p className="text-[32px] font-['Mulish',sans-serif] font-extrabold text-[#202b38]">
                Mulish — Body & Cards
              </p>
              <div className="flex flex-wrap gap-6 mt-2">
                {[400, 500, 600, 700, 800].map((w) => (
                  <span key={w} className="text-[16px] font-['Mulish',sans-serif] text-[#445e79]" style={{ fontWeight: w }}>
                    Weight {w}
                  </span>
                ))}
              </div>
            </div>

            {/* DM Serif */}
            <div className="flex flex-col gap-3 p-6 bg-white border border-[#e0d9e6] rounded-xl">
              <p className="text-[12px] uppercase tracking-[1px] text-[#75777a] font-mono">
                {fonts.dmSerif}
              </p>
              <p className="text-[32px] font-['DM_Serif_Display',serif] text-[#202b38]">
                DM Serif Display — Accent
              </p>
            </div>
          </div>
        </Section>

        {/* ── BUTTONS ── */}
        <Section title="Butoane">
          <div className="flex flex-col gap-6">
            {/* Tab buttons */}
            <div>
              <p className="text-[14px] text-[#75777a] font-['Mulish',sans-serif] mb-3">Tab Buttons (active vs inactive)</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(colors.tabs).map(([key, { active }]) => (
                  <button
                    key={key}
                    className="px-5 py-2.5 text-[12px] tracking-[0.84px] uppercase font-['Inter',sans-serif] font-semibold text-white"
                    style={{ background: active, border: `1px solid ${active}` }}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {Object.entries(colors.tabs).map(([key]) => (
                  <button
                    key={key}
                    className="px-5 py-2.5 text-[12px] tracking-[0.84px] uppercase font-['Inter',sans-serif] font-semibold"
                    style={{ border: `1px solid ${colors.text.tabBorder}`, color: colors.text.tabInactive }}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div>
              <p className="text-[14px] text-[#75777a] font-['Mulish',sans-serif] mb-3">CTA Buttons</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#202b38] text-white text-sm tracking-[0.84px] px-8 py-3 font-['Inter',sans-serif] font-semibold">
                  CERE OFERTĂ
                </button>
                <button className="border border-[#202b38] text-[#202b38] text-sm tracking-[0.84px] px-8 py-3 font-['Inter',sans-serif] font-semibold">
                  VEZI SERVICII
                </button>
                <button className="text-white text-[12px] tracking-[0.84px] px-8 py-3 font-['Inter',sans-serif] font-semibold" style={{ background: colors.brand.pink }}>
                  TRIMITE CEREREA
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── CARDS ── */}
        <Section title="Product Cards (per tab color)">
          <div className="flex flex-wrap gap-6">
            {Object.entries(colors.tabs).map(([key, { active, light }]) => (
              <CardPreview key={key} tabName={key} active={active} light={light} />
            ))}
          </div>
        </Section>

        {/* ── SPACING ── */}
        <Section title="Spacing Reference">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(spacing.gap).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-2 items-center">
                <div
                  className="bg-[#e70050]/20 border border-[#e70050]/40 rounded"
                  style={{ width: value, height: value }}
                />
                <p className="text-[12px] font-mono text-[#445e79]">{value}</p>
                <p className="text-[13px] font-['Mulish',sans-serif] font-semibold text-[#202b38]">{key}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-[#f7f4fb] rounded-lg">
            <p className="text-[13px] font-mono text-[#652f7d]">
              Section padding: <strong>{spacing.sectionPaddingX}</strong> | Max width: <strong>{spacing.maxWidth}</strong>
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
}
