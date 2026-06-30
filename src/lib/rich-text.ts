export interface RichTextSegment {
  text: string;
  bold?: boolean;
}

/** Splits `**bold**` markers out of a string, shared by the HTML and PDF renderers. */
export function parseRichText(text: string): RichTextSegment[] {
  const segments: RichTextSegment[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index) });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex) });
  }

  return segments;
}
