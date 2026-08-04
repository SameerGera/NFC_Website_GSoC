export function sanitizeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  // If the URL starts with javascript: (case-insensitive), return undefined
  if (url.trim().toLowerCase().startsWith("javascript:")) {
    return undefined;
  }
  // Ensure it has a protocol if it's meant to be an absolute URL, but for now just prevent javascript:
  return url;
}
