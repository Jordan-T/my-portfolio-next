import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllProjects, getProjectSlugs, getProjectBySlug } from "./projects";

const dir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "__fixtures__",
  "projects",
);

describe("getAllProjects", () => {
  it("returns featured projects before non-featured ones", () => {
    const projects = getAllProjects({ dir });
    const firstNonFeatured = projects.findIndex((p) => !p.featured);
    const lastFeatured = projects.findLastIndex((p) => p.featured);

    expect(lastFeatured).toBeLessThan(firstNonFeatured);
  });

  it("sorts non-featured projects by date, newest first", () => {
    const titles = getAllProjects({ dir })
      .filter((p) => !p.featured)
      .map((p) => p.title);

    expect(titles).toEqual(["Zeta", "Alpha"]); // 2025-06 before 2024-03
  });

  it("excludes unpublished projects", () => {
    const slugs = getAllProjects({ dir }).map((p) => p.slug);

    expect(slugs).not.toContain("hidden");
  });

  it("caps the result with `limit`", () => {
    const projects = getAllProjects({ dir, limit: 2 });

    expect(projects).toHaveLength(2);
    expect(projects[0]?.title).toBe("Featured One");
  });

  it("applies defaults when frontmatter fields are missing", () => {
    const alpha = getAllProjects({ dir }).find((p) => p.slug === "alpha");

    expect(alpha?.status).toBe("wip"); // default when `status` is absent
    expect(alpha?.tags).toEqual([]); // default when `tags` is absent
    expect(alpha?.published).toBe(true); // default when `published` is absent
  });

  it("parses links from frontmatter", () => {
    const zeta = getProjectBySlug("zeta", dir);

    expect(zeta?.links.external).toBe("https://example.com/zeta");
    expect(zeta?.links.github).toBeUndefined();
  });
});

describe("getProjectSlugs", () => {
  it("returns only published slugs", () => {
    expect(getProjectSlugs(dir).sort()).toEqual([
      "alpha",
      "featured-one",
      "zeta",
    ]);
  });
});

describe("getProjectBySlug", () => {
  it("returns the matching project", () => {
    expect(getProjectBySlug("zeta", dir)?.title).toBe("Zeta");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist", dir)).toBeUndefined();
  });

  it("returns undefined for an unpublished project", () => {
    expect(getProjectBySlug("hidden", dir)).toBeUndefined();
  });
});
