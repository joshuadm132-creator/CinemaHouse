// config/ThemeToCSS.ts
import type { CSSProperties } from "react";
import type { Theme } from "./themes";

export function themeToCssVars(theme: Theme): CSSProperties {
  const vars: Record<string, string | undefined> = {
    // BRAND
    "--color-primary": theme.primary,
    "--color-primary-hover": theme.primaryHover,
    "--color-primary-active": theme.primaryActive ?? theme.primaryHover,
    "--color-primary-fg": theme.primaryFg ?? theme.textInverse,
    "--color-accent": theme.accent,
    "--color-accent-hover": theme.accentHover ?? theme.accent,
    "--color-accent-fg": theme.accentFg ?? theme.textInverse,

    // SURFACES
    "--color-background": theme.background,
    "--color-surface": theme.surface,
    "--color-surface-elevated": theme.surfaceElevated ?? theme.surface,
    "--color-surface-sunken": theme.surfaceSunken ?? theme.background,
    "--color-ligter-gr": theme.ligterbg,
    "--color-border": theme.border,
    "--color-border-strong": theme.borderStrong ?? theme.border,

    // TEXT
    "--color-text": theme.text,
    "--color-text-muted": theme.textMuted,
    "--color-text-subtle": theme.textSubtle ?? theme.textMuted,
    "--color-text-inverse": theme.textInverse,
    "--color-text-on-accent": theme.textOnAccent ?? theme.textInverse,

    // HERO
    "--color-hero-bg": theme.heroBg,
    "--color-hero-text": theme.heroText,
    "--color-hero-overlay": theme.heroOverlay ?? "transparent",

    // NAV
    "--color-nav-bg": theme.navBg ?? theme.primary,
    "--color-nav-text": theme.navText ?? theme.textInverse,
    "--color-nav-text-muted": theme.navTextMuted ?? theme.textInverse,

    // FOOTER
    "--color-footer-bg": theme.footerBg ?? theme.background,
    "--color-footer-text": theme.footerText ?? theme.text,
    "--color-footer-text-muted": theme.footerTextMuted ?? theme.textMuted,

    // STATUS
    "--color-success": theme.success ?? "#10b981",
    "--color-warning": theme.warning ?? "#f59e0b",
    "--color-danger": theme.danger ?? "#ef4444",
    "--color-info": theme.info ?? "#3b82f6",

    // CINEMA-SPECIFIC
    "--color-badge": theme.badge ?? theme.accent,
    "--color-badge-fg": theme.badgeFg ?? theme.textInverse,
    "--color-sold-out": theme.soldOut ?? theme.textMuted,
    "--color-seat-available": theme.seatAvailable ?? theme.surface,
    "--color-seat-selected": theme.seatSelected ?? theme.primary,
    "--color-seat-taken": theme.seatTaken ?? theme.textMuted,

    // FONTS
    "--font-body": theme.fontBody,
    "--font-heading": theme.fontHeading,
  };

  // Strip undefined so we don't override CSS defaults with "undefined" strings
  const cleaned: Record<string, string> = {};
  for (const [k, v] of Object.entries(vars)) {
    if (v !== undefined) cleaned[k] = v;
  }
  return cleaned as CSSProperties;
}