import { describe, it, expect } from "vitest";
import { getCvData } from "./cv";

describe("getCvData", () => {
  it("exposes identity sourced from the site config", () => {
    const cv = getCvData();
    expect(cv.name).toBe("Jordan Taisne");
    expect(cv.email).toContain("@");
    expect(cv.socials.length).toBeGreaterThan(0);
  });

  it("orders experience most recent first", () => {
    const cv = getCvData();
    expect(cv.experience[0]?.company).toBe("Refectory");
  });

  it("formats an ongoing role as 'depuis …'", () => {
    const cv = getCvData();
    const ongoing = cv.experience.find((job) => job.company === "Refectory");
    expect(ongoing?.period.startsWith("depuis ")).toBe(true);
  });

  it("formats a past role as a French span with 'à'", () => {
    const cv = getCvData();
    const past = cv.experience.find((job) => job.company === "altima°");
    expect(past?.period).toContain(" à ");
  });

  it("never uses an em-dash in periods", () => {
    const cv = getCvData();
    expect(cv.experience.some((job) => job.period.includes("—"))).toBe(false);
  });

  it("groups the technical stack with non-empty entries", () => {
    const cv = getCvData();
    expect(cv.stack.length).toBe(3);
    expect(cv.stack.every((group) => group.items.length > 0)).toBe(true);
  });

  it("exposes interests", () => {
    const cv = getCvData();
    expect(cv.interests.length).toBeGreaterThan(0);
  });

  it("computes a rounded tenure in years per role", () => {
    const cv = getCvData();
    const ongoing = cv.experience.find((job) => job.company === "Refectory");
    expect(ongoing?.duration).toMatch(/^\d+ ans?$/);
  });

  it("does not mutate the source experience order across calls", () => {
    const first = getCvData().experience.map((job) => job.company);
    const second = getCvData().experience.map((job) => job.company);
    expect(first).toEqual(second);
  });
});
