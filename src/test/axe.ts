import axe from "axe-core";

/**
 * Runs axe-core on a rendered container and returns readable violation labels.
 *
 * Disabled rules are page-level concerns that can't be assessed on an isolated
 * component rendered in jsdom:
 * - `color-contrast`: jsdom doesn't compute layout/colors.
 * - `region` / `heading-order`: depend on the full page structure.
 */
export async function findA11yViolations(
  container: Element,
): Promise<string[]> {
  const { violations } = await axe.run(container, {
    rules: {
      "color-contrast": { enabled: false },
      region: { enabled: false },
      "heading-order": { enabled: false },
    },
  });

  return violations.map((v) => `${v.id}: ${v.help}`);
}
