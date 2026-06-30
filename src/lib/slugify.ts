/** Turns any heading text into a stable kebab-case id usable as a scroll anchor. */
export function slugify(text: string): string {
  return text
    .normalize("NFD") // split accents into base letter + combining mark, so they can be stripped
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
