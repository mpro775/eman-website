/** Matches a URI scheme prefix such as `https:`, `mailto:` or `tel:`. */
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;

/**
 * Prepares an admin-entered link for use in an `href`.
 *
 * Admins paste things like `behance.net/eman`, which the browser would resolve
 * as a relative path. Anything without a scheme gets `https://`. Blank input
 * stays blank so callers can treat `''` as "no link" and hide the button.
 */
export function normalizeExternalUrl(url: string | undefined | null): string {
    const trimmed = (url || '').trim();
    if (!trimmed) return '';
    return SCHEME.test(trimmed) ? trimmed : `https://${trimmed}`;
}
