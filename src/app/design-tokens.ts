// ── Cismind Design Tokens ────────────────────────────────────────────────────
// Single source of truth for all visual tokens.
// Change here → changes everywhere.

export const colors = {
  brand: {
    pink: "#e70050",
    purple: "#652f7d",
    orange: "#ffa300",
    dark: "#202b38",
    cream: "#f5ece0",
    lavender: "#f7f4fb",
  },

  // Tab colors — each product category has its own palette
  tabs: {
    stikere:  { active: "#ffa300", light: "#fff4dd" },
    textile:  { active: "#e70050", light: "#ffd7e9" },
    canva:    { active: "#7b2fa0", light: "#f0e0ff" },   // placeholder — update later
    bannere:  { active: "#2e8b57", light: "#e0f5ea" },   // placeholder — update later
    print:    { active: "#1a6fd4", light: "#ddeeff" },   // placeholder — update later
    gravura:  { active: "#2c3e50", light: "#e8ecf0" },   // placeholder — update later
  } as Record<string, { active: string; light: string }>,

  text: {
    primary: "#202b38",
    secondary: "#445e79",
    muted: "#445e79",
    tabInactive: "#445e79",
    tabBorder: "#99aec5",
  },

  ui: {
    cardBorder: "#e0d9e6",
    sectionDivider: "#e0d3c7",
    hoverPink: "#b0003f",
  },
} as const;

// Tab color lookup by tab id (matches siteData tab ids)
export const TAB_COLORS: Record<string, { active: string; light: string }> = {
  "tab-stikere": colors.tabs.stikere,
  "tab-textile": colors.tabs.textile,
  "tab-canva":   colors.tabs.canva,
  "tab-bannere": colors.tabs.bannere,
  "tab-print":   colors.tabs.print,
  "tab-gravura": colors.tabs.gravura,
};

export const fonts = {
  inter:   "'Inter', sans-serif",
  mulish:  "'Mulish', sans-serif",
  dmSerif: "'DM Serif Display', serif",
} as const;

export const spacing = {
  sectionPaddingX: "px-6 md:px-12",
  sectionPaddingY: "py-16",
  maxWidth: "max-w-[1440px] mx-auto w-full",
  gap: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    section: "48px",
  },
} as const;
