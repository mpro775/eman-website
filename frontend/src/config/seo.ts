const configuredSiteUrl = import.meta.env.VITE_SITE_URL || "https://emanjameel.pro";

export const SITE_URL = configuredSiteUrl.replace(/\/$/, "");
export const SITE_NAME = "إيمان جميل";
export const DEFAULT_SEO_TITLE = "إيمان جميل | مصممة UI/UX ومطورة تطبيقات";
export const DEFAULT_SEO_DESCRIPTION =
    "إيمان جميل، مصممة واجهات وتجربة مستخدم ومطورة تطبيقات. استعرض أعمال UI/UX والتصميم الجرافيكي والمقالات والبرامج التدريبية.";
export const DEFAULT_SEO_IMAGE = `${SITE_URL}/logo.png`;

export const toAbsoluteUrl = (value?: string): string => {
    if (!value) return DEFAULT_SEO_IMAGE;

    try {
        return new URL(value, `${SITE_URL}/`).toString();
    } catch {
        return DEFAULT_SEO_IMAGE;
    }
};

export const toCanonicalUrl = (path?: string): string => {
    if (!path || path === "/") return `${SITE_URL}/`;

    try {
        const url = new URL(path, `${SITE_URL}/`);
        url.search = "";
        url.hash = "";
        return url.toString();
    } catch {
        return `${SITE_URL}/`;
    }
};
