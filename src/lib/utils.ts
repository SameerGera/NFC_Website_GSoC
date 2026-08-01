export function normalizeImageUrl(url: string): string {
  if (!url) return "";

  const trimmed = url.trim();

  // Google Drive: /file/d/{id}/...
  const driveFileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}=w800`;
  }

  // Google Drive: /open?id={id}
  const driveOpenMatch = trimmed.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch) {
    return `https://lh3.googleusercontent.com/d/${driveOpenMatch[1]}=w800`;
  }

  // Google Drive: any URL with id= param on google domain
  const driveUcMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveUcMatch && trimmed.includes("google")) {
    return `https://lh3.googleusercontent.com/d/${driveUcMatch[1]}=w800`;
  }

  // Imgur: imgur.com/{id} (no extension, not already i.imgur.com)
  const imgurMatch = trimmed.match(/imgur\.com\/([a-zA-Z0-9]+)$/i);
  if (imgurMatch && !trimmed.includes("i.imgur.com")) {
    return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
  }

  return trimmed;
}
