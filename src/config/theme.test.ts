import { describe, it, expect } from "vitest";
import { brand, siteColors, cvTheme } from "./theme";

describe("siteColors", () => {
  it("maps primitives onto CSS custom properties", () => {
    const vars = siteColors();
    expect(vars["--color-bg"]).toBe(brand.bg);
    expect(vars["--color-accent"]).toBe(brand.accent);
    expect(vars["--color-text-muted"]).toBe(brand.textMuted);
  });

  it("derives translucent tokens from primitives, not literal rgb", () => {
    const vars = siteColors();
    expect(vars["--tag-framework-b"]).toBe(
      "color-mix(in srgb, var(--color-accent) 20%, transparent)",
    );
    expect(vars["--color-line"]).toContain("var(--color-white)");
  });

  it("follows a palette swap", () => {
    const swapped = siteColors({ ...brand, accent: "#ff0000" });
    expect(swapped["--color-accent"]).toBe("#ff0000");
  });

  it("declares no empty token values", () => {
    const vars = siteColors();
    expect(Object.values(vars).every((v) => v.trim().length > 0)).toBe(true);
  });
});

describe("cvTheme", () => {
  it("shares brand hues with the site", () => {
    expect(cvTheme.accent).toBe(brand.accent);
    expect(cvTheme.sidebar).toBe(brand.surface);
    expect(cvTheme.card).toBe(brand.white);
  });

  it("exposes the keys the CV generator consumes", () => {
    for (const key of [
      "sidebar",
      "sidebarLine",
      "ink",
      "inkSoft",
      "onDark",
      "onDarkSoft",
      "accent",
      "rule",
      "card",
      "hexFill",
    ] as const) {
      expect(cvTheme[key]).toBeTruthy();
    }
  });
});
