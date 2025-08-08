export const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export function detectLinks(
  text: string,
): Array<{ url: string; start: number; end: number }> {
  const links: Array<{ url: string; start: number; end: number }> = [];
  let match;

  while ((match = URL_REGEX.exec(text)) !== null) {
    links.push({
      url: match[1],
      start: match.index,
      end: match.index + match[1].length,
    });
  }

  return links;
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

export function extractUrls(text: string): string[] {
  const matches = text.match(URL_REGEX);
  return matches?.filter(isValidUrl) || [];
}
