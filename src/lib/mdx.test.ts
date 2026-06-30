import { describe, it, expect } from "vitest";
import { extractHeadings } from "./mdx";

describe("extractHeadings", () => {
  it("returns level-2 headings with slugified ids, in document order", () => {
    const content = "## Contexte\n\nText\n\n## Réalisation\n\nMore";
    expect(extractHeadings(content)).toEqual([
      { id: "contexte", title: "Contexte" },
      { id: "realisation", title: "Réalisation" },
    ]);
  });

  it("ignores other heading levels", () => {
    const content = "# Title\n\n## Section\n\n### Subsection";
    expect(extractHeadings(content)).toEqual([
      { id: "section", title: "Section" },
    ]);
  });

  it("strips bold markers from the title", () => {
    expect(extractHeadings("## Le **point** clé")).toEqual([
      { id: "le-point-cle", title: "Le point clé" },
    ]);
  });
});
