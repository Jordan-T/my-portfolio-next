import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type { Tag } from "@/types";
import Tags from "./Tags";

describe("Tags", () => {
  it("renders nothing when the list is empty", () => {
    const { container } = render(<Tags tags={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders one item per tag", () => {
    const tags: Tag[] = [
      { label: "Rust", type: "language" },
      { label: "Tauri", type: "framework" },
    ];
    const { getAllByRole } = render(<Tags tags={tags} />);

    expect(getAllByRole("listitem")).toHaveLength(2);
  });
});
