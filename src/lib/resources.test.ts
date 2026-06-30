import { describe, it, expect } from "vitest";
import { sortResources, getResources } from "./resources";
import type { Resource } from "@/types";

const base: Omit<Resource, "id" | "title" | "date" | "level"> = {
  url: "https://example.com/placeholder",
  source: "example.com",
  category: "Test",
  type: "article",
};

function make(
  title: string,
  date: string,
  level?: Resource["level"],
): Resource {
  return {
    ...base,
    id: title.toLowerCase().replace(/\s+/g, "-"),
    url: `https://example.com/${title}`,
    title,
    date,
    level,
  };
}

describe("sortResources", () => {
  it("sorts essential before recommended before interesting", () => {
    const items = [
      make("Interesting", "2025", "interesting"),
      make("Essential", "2025", "essential"),
      make("Recommended", "2025", "recommended"),
    ];
    expect(sortResources(items).map((r) => r.title)).toEqual([
      "Essential",
      "Recommended",
      "Interesting",
    ]);
  });

  it("within same level, sorts newest first", () => {
    const items = [
      make("Older", "2023", "essential"),
      make("Newer", "2025", "essential"),
    ];
    expect(sortResources(items).map((r) => r.title)).toEqual([
      "Newer",
      "Older",
    ]);
  });

  it("places unlabelled resources last", () => {
    const items = [
      make("No level", "2025"),
      make("Essential", "2024", "essential"),
    ];
    expect(sortResources(items).map((r) => r.title)).toEqual([
      "Essential",
      "No level",
    ]);
  });

  it("sorts unlabelled resources by date among themselves", () => {
    const items = [
      make("Old unlabelled", "2020"),
      make("New unlabelled", "2025"),
    ];
    expect(sortResources(items).map((r) => r.title)).toEqual([
      "New unlabelled",
      "Old unlabelled",
    ]);
  });

  it("applies limit", () => {
    const items = [
      make("A", "2025", "essential"),
      make("B", "2025", "recommended"),
      make("C", "2025", "interesting"),
    ];
    expect(sortResources(items, 2)).toHaveLength(2);
    expect(sortResources(items, 2)[0]?.title).toBe("A");
  });

  it("returns all items when no limit is given", () => {
    const items = [
      make("A", "2025", "essential"),
      make("B", "2024", "recommended"),
    ];
    expect(sortResources(items)).toHaveLength(2);
  });
});

describe("getResources", () => {
  it("returns at least one resource", () => {
    expect(getResources().length).toBeGreaterThan(0);
  });

  it("respects limit", () => {
    expect(getResources(1)).toHaveLength(1);
  });

  it("returns fewer items than limit when limit exceeds total", () => {
    const all = getResources();
    expect(getResources(all.length + 10)).toHaveLength(all.length);
  });
});
