const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://api.emanjameel.pro/api';

/**
 * Resolves an image URL to ensure it is publicly accessible.
 *
 * Handles these cases:
 * 1. R2 endpoint URLs (e.g. https://xxx.r2.cloudflarestorage.com/bucket/key)
 *    → Converts to backend proxy: /api/upload/files/{key}
 * 2. Relative URLs → Prepends API base
 * 3. Already-correct URLs (data:, public URLs) → Returns as-is
 */
export function resolveImageUrl(url: string | undefined | null): string {
  if (!url) return '';

  // Already a data URL or blob URL - return as-is
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  // If it's an R2 endpoint URL (private, not publicly accessible)
  // Pattern: https://<account-id>.r2.cloudflarestorage.com/<bucket>/<key>
  const r2Match = url.match(/https?:\/\/[^/]+\.r2\.cloudflarestorage\.com\/[^/]+\/(.+)/);
  if (r2Match) {
    const key = r2Match[1];
    return `${API_BASE_URL}/upload/files/${key}`;
  }

  // If it already points to our API upload endpoint, return as-is
  if (url.includes('/api/upload/files/')) {
    return url;
  }

  // If it's a full URL (http/https), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Relative URL - prepend API base
  return `${API_BASE_URL}/${url.replace(/^\//, '')}`;
}
