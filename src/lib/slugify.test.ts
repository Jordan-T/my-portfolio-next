import { describe, it, expect } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(slugify("Mes Projets")).toBe("mes-projets");
  });

  it("strips accents to their base letter", () => {
    expect(slugify("Expérience & Réalisations")).toBe("experience-realisations");
    expect(slugify("À propos")).toBe("a-propos");
  });

  it("collapses special characters and trims leading/trailing hyphens", () => {
    expect(slugify("--Héllo Wörld!!--")).toBe("hello-world");
    expect(slugify("C++ / C#  ")).toBe("c-c");
  });
});
