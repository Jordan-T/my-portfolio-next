import type { ComponentProps } from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import type { Project, Resource } from "@/types";
import { findA11yViolations } from "@/test/axe";

// Render Next primitives as plain elements so axe sees the real output.
// Forward props (aria-label, className…) so accessibility attributes survive.
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: ComponentProps<"a">) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import Nav from "@/components/layout/Nav/Nav";
import Footer from "@/components/layout/Footer/Footer";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/Vision/Vision";
import Experience from "@/components/sections/Experience/Experience";
import ProjectCard from "@/components/cards/ProjectCard/ProjectCard";
import ResourceItem from "@/components/cards/ResourceItem/ResourceItem";
import ContactCard from "@/components/cards/ContactCard/ContactCard";

const project: Project = {
  slug: "demo",
  title: "Demo",
  description: "A demo project.",
  status: "wip",
  featured: false,
  published: true,
  date: "2024-01-01",
  tags: [{ label: "TypeScript", type: "language" }],
  links: { external: "https://example.com" },
};

const resource: Resource = {
  id: "test-resource",
  title: "A resource",
  url: "https://example.com",
  source: "example.com",
  category: "Architecture",
  type: "article",
  date: "2025",
};

const resourceNoUrl: Resource = {
  id: "test-resource-no-url",
  title: "A book without a URL",
  source: "An Author",
  category: "Craft",
  type: "book",
  date: "2020",
};

describe("accessibility", () => {
  it("Nav has no detectable violations", async () => {
    const { container } = render(<Nav />);
    expect(await findA11yViolations(container)).toEqual([]);
  });

  it("Hero has no detectable violations", async () => {
    const { container } = render(<Hero />);
    expect(await findA11yViolations(container)).toEqual([]);
  });

  it("Footer has no detectable violations", async () => {
    const { container } = render(<Footer />);
    expect(await findA11yViolations(container)).toEqual([]);
  });

  it("About has no detectable violations", async () => {
    const { container } = render(<About />);
    expect(await findA11yViolations(container)).toEqual([]);
  });

  it("Experience has no detectable violations", async () => {
    const { container } = render(<Experience />);
    expect(await findA11yViolations(container)).toEqual([]);
  });

  it("ProjectCard has no detectable violations", async () => {
    const { container } = render(<ProjectCard project={project} />);
    expect(await findA11yViolations(container)).toEqual([]);
  });

  it("ResourceItem has no detectable violations", async () => {
    const { container } = render(<ResourceItem resource={resource} />);
    expect(await findA11yViolations(container)).toEqual([]);
  });

  it("ResourceItem without URL has no detectable violations", async () => {
    const { container } = render(<ResourceItem resource={resourceNoUrl} />);
    expect(await findA11yViolations(container)).toEqual([]);
  });

  it("ContactCard has no detectable violations", async () => {
    const { container } = render(<ContactCard />);
    expect(await findA11yViolations(container)).toEqual([]);
  });
});
