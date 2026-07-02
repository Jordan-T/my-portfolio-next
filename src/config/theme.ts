// Single source of truth for the colour layer of the design system.
//
// The site consumes these as CSS custom properties: `scripts/generate-tokens.ts`
// writes `siteColors()` into `src/styles/tokens.generated.css`, which
// `globals.css` imports. The CV generator (which cannot read CSS variables)
// imports `cvTheme` directly. Non-colour tokens (spacing, radii, typography,
// breakpoints) are not themeable and stay in CSS.
//
// To add a variant (e.g. high-contrast or light), define a new `BrandPalette`
// and emit it under a `[data-theme="…"]` selector — every derived token below
// references the primitives, so the whole system follows.

export interface BrandPalette {
  bg: string;
  surface: string;
  surfaceRaised: string;
  accent: string;
  accent2: string;
  accentAlert: string;
  /** green-500, signals positive availability (contact badge). */
  accentSuccess: string;
  text: string;
  textMuted: string;
  white: string;
  /** indigo-400, used for the language tag (distinct from accent2). */
  indigo: string;
  shadow: string;
  textRaised: string;
}

/** Onyx & Azure — the default (and currently only) brand palette. */
export const brand: BrandPalette = {
  bg: "#060b14",
  surface: "#0b1221",
  surfaceRaised: "#111a2e",
  accent: "#0ea5e9",
  accent2: "#6366f1",
  accentAlert: "#f59e0b",
  accentSuccess: "#22c55e",
  text: "#ededed",
  textMuted: "#94a3b8",
  textRaised: "#fff",
  white: "#ffffff",
  indigo: "#818cf8",
  shadow: "rgba(0, 0, 0, 0.5)",
};

const mix = (token: string, pct: number) =>
  `color-mix(in srgb, var(${token}) ${pct}%, transparent)`;

/**
 * The full colour layer as CSS custom properties. Primitives come from the
 * palette; every translucent or blended token is derived from a primitive, so
 * a palette swap updates the whole set.
 */
export function siteColors(p: BrandPalette = brand): Record<string, string> {
  return {
    // Surfaces
    "--color-bg": p.bg,
    "--color-surface": p.surface,
    "--color-surface-raised": p.surfaceRaised,
    "--color-surface-accent":
      "color-mix(in srgb, var(--color-accent) 15%, var(--color-bg))",
    "--color-surface-accent-raised":
      "color-mix(in srgb, var(--color-accent) 30%, var(--color-bg))",

    // Accents
    "--color-accent": p.accent,
    "--color-accent2": p.accent2,
    "--color-accent-alert": p.accentAlert,
    "--color-accent-success": p.accentSuccess,

    // Text
    "--color-text": p.text,
    "--color-text-muted": p.textMuted,
    "--color-text-raised": p.textRaised,
    "--color-white": p.white,

    // Shadows
    "--shadow-color": p.shadow,

    // Tag system
    "--tag-framework-bg": "transparent",
    "--tag-framework-c": "var(--color-accent)",
    "--tag-framework-b": mix("--color-accent", 20),
    "--tag-language-bg": "transparent",
    "--tag-language-c": p.indigo,
    "--tag-language-b": mix("--color-accent2", 20),
    "--tag-tool-bg": "transparent",
    "--tag-tool-c": "var(--color-text-muted)",
    "--tag-tool-b": mix("--color-text-muted", 20),
    "--tag-concept-bg": "transparent",
    "--tag-concept-c": "var(--color-accent-alert)",
    "--tag-concept-b": mix("--color-accent-alert", 25),

    // Statuses
    "--status-wip-c": "var(--color-text-muted)",
    "--status-wip-b": mix("--color-text-muted", 30),
    "--status-done-c": "var(--color-text-muted)",
    "--status-done-b": mix("--color-text-muted", 30),
    "--status-client-c": "var(--color-accent)",
    "--status-client-b": mix("--color-accent", 20),
    "--status-available-bg": mix("--color-accent-success", 8),
    "--status-available-c": "var(--color-accent-success)",
    "--status-available-b": mix("--color-accent-success", 35),
    "--status-listening-bg": "transparent",
    "--status-listening-c": p.accent,
    "--status-listening-b": mix("--color-accent", 20),

    // Lines and grids
    "--border-subtle": mix("--color-white", 4),
    "--border-accent-soft": mix("--color-accent", 10),
    "--color-line": mix("--color-white", 6),

    // Derived accent/alert washes
    "--accent-wash": mix("--color-accent", 10),
    "--accent-wash-soft": mix("--color-accent", 5),
    "--accent-edge": mix("--color-accent", 30),
    "--accent-edge-soft": mix("--color-accent", 15),
    "--alert-edge": mix("--color-accent-alert", 30),
    "--alert-wash": mix("--color-accent-alert", 4),
  };
}

/**
 * High-contrast, print-oriented palette for the generated CV: a dark Onyx
 * sidebar against a light main column. Shared hues derive from `brand`;
 * print-specific values (greyscale-legible) are defined here.
 */
export const cvTheme = {
  sidebar: brand.surface,
  sidebarLine: "#33415a",
  ink: brand.surface,
  inkSoft: "#363e49",
  inkSofter: "#8a95a8",
  onDark: "#f4f7fb",
  onDarkSoft: "#d4deec",
  onDarkRaised: brand.textRaised,
  onDarkAccent: "hsl(199, 89%, 66%)", // base #0ea5e9 hsl(199, 89%, 48%)
  accent: brand.accent,
  rule: "#9aa7b8",
  card: brand.white,
  /** matches --color-surface-accent-raised (accent 30% over bg), resolved. */
  hexFill: "#083954",
} as const;
