// config/themes.ts

export type Theme = {
  // --- BRAND ---
  primary: string;
  primaryHover: string;
  primaryActive?: string;        // pressed state (falls back to primaryHover)
  primaryFg?: string;            // text on primary (falls back to textInverse)
  accent: string;
  accentHover?: string;
  accentFg?: string;

  // --- SURFACES (layered backgrounds) ---
  background: string;            // page canvas
  surface: string;               // cards, panels
  surfaceElevated?: string;      // raised cards, modals (falls back to surface)
  surfaceSunken?: string;        // insets, wells (falls back to background)
  ligterbg?: string;             // your existing token — kept for compat
  border: string;
  borderStrong?: string;         // emphasized dividers (falls back to border)

  // --- TEXT ---
  text: string;
  textMuted: string;
  textSubtle?: string;           // timestamps, tiny meta (falls back to textMuted)
  textInverse: string;
  textOnAccent?: string;         // (falls back to textInverse)

  // --- HERO / FEATURED ---
  heroBg: string;
  heroText: string;
  heroOverlay?: string;          // gradient/overlay color over hero images

  // --- NAVIGATION ---
  navBg?: string;                // (falls back to primary)
  navText?: string;              // (falls back to textInverse)
  navTextMuted?: string;         // inactive links

  // --- FOOTER ---
  footerBg?: string;             // (falls back to background)
  footerText?: string;           // (falls back to text)
  footerTextMuted?: string;      // (falls back to textMuted)

  // --- SEMANTIC / STATUS ---
  success?: string;
  warning?: string;
  danger?: string;
  info?: string;

  // --- CINEMA-SPECIFIC (badges, seat maps, formats) ---
  badge?: string;                // "LUX", "IMAX" chips
  badgeFg?: string;
  soldOut?: string;              // grey-out color
  seatAvailable?: string;        // seat map — available
  seatSelected?: string;         // seat map — selected
  seatTaken?: string;            // seat map — taken

  // --- TYPOGRAPHY ---
  fontBody: string;
  fontHeading: string;
};



export const cinemaTheme: Theme = {
  // BRAND
  primary: "#c8102e",
  primaryHover: "#a00d26",
  primaryActive: "#7a0019",
  primaryFg: "#ffffff",
  accent: "#d4af37",           // gold
  accentHover: "#b8942a",
  accentFg: "#0a0a0a",

  // SURFACES — three layers of darkness
  background: "#0a0a0a",       // page canvas
  surface: "#171717",          // cards
  surfaceElevated: "#1f1f1f",  // hovered cards, modals, date chips
  surfaceSunken: "#050505",    // wells, video bars
  ligterbg: "#1a1a1a",
  border: "#2a2a2a",
  borderStrong: "#3f3f3f",

  // TEXT
  text: "#f5f5f5",
  textMuted: "#a3a3a3",
  textSubtle: "#737373",
  textInverse: "#0a0a0a",
  textOnAccent: "#0a0a0a",     // dark text on gold

  // HERO
  heroBg: "#000000",
  heroText: "#ffffff",
  heroOverlay: "rgba(0,0,0,0.55)",  // darkens backdrop image

  // NAV — deep red bar, white links
  navBg: "#c8102e",
  navText: "#ffffff",
  navTextMuted: "rgba(255,255,255,0.75)",

  // FOOTER — pure black, quiet
  footerBg: "#050505",
  footerText: "#f5f5f5",
  footerTextMuted: "#737373",

  // STATUS
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",

  // CINEMA-SPECIFIC
  badge: "#d4af37",
  badgeFg: "#0a0a0a",
  soldOut: "#4b4b4b",
  seatAvailable: "#374151",
  seatSelected: "#c8102e",
  seatTaken: "#1a1a1a",

  // TYPOGRAPHY
  fontBody: "var(--font-inter), system-ui, sans-serif",
  fontHeading: "var(--font-inter), system-ui, sans-serif",
};