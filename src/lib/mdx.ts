import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { slugify } from "@/lib/slugify";

export async function compileMDX(content: string) {
  const { default: MDXContent } = await evaluate(content, runtime);
  return MDXContent;
}

export interface Heading {
  id: string;
  title: string;
}

/** Extracts level-2 headings (`## …`) from raw MDX, in document order, for a table of contents. */
export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /^##[ \t]+(.+?)[ \t]*$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content))) {
    const title = match[1].replace(/\*\*(.+?)\*\*/g, "$1");
    headings.push({ id: slugify(title), title });
  }

  return headings;
}
