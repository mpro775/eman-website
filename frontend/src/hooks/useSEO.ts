import { useEffect } from 'react';
import {
    DEFAULT_SEO_DESCRIPTION,
    DEFAULT_SEO_IMAGE,
    DEFAULT_SEO_TITLE,
    SITE_NAME,
    toAbsoluteUrl,
    toCanonicalUrl,
} from '../config/seo';

interface SEOProps {
    title?: string | undefined;
    description?: string | undefined;
    keywords?: string | undefined;
    image?: string | undefined;
    url?: string | undefined;
    type?: 'website' | 'article' | 'profile' | undefined;
    author?: string | undefined;
    publishedTime?: string | undefined;
    modifiedTime?: string | undefined;
    section?: string | undefined;
    tags?: string[] | undefined;
    noindex?: boolean | undefined;
}

/**
 * Custom hook for managing SEO meta tags dynamically
 * Updates document head with provided meta information
 */
export const useSEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    noindex = false,
}: SEOProps = {}) => {
    useEffect(() => {
        const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_SEO_TITLE;
        const fullDescription = description || DEFAULT_SEO_DESCRIPTION;
        const fullImage = toAbsoluteUrl(image || DEFAULT_SEO_IMAGE);
        const fullUrl = toCanonicalUrl(url);

        // Update document title
        document.title = fullTitle;

        // Helper function to update or create meta tag
        const updateMeta = (
            selector: string,
            content: string,
        ) => {
            let element = document.querySelector(selector) as HTMLMetaElement;
            if (!element) {
                element = document.createElement('meta');
                const attrName = selector.includes('property=') ? 'property' : 'name';
                const attrValue = selector.match(/"([^"]+)"/)?.[1] || '';
                element.setAttribute(attrName, attrValue);
                document.head.appendChild(element);
            }
            element.content = content;
        };

        // Update canonical URL
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = fullUrl;

        // Basic meta tags
        updateMeta('meta[name="title"]', fullTitle);
        updateMeta('meta[name="description"]', fullDescription);
        updateMeta(
            'meta[name="robots"]',
            noindex
                ? 'noindex, nofollow'
                : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        );
        if (keywords) {
            updateMeta('meta[name="keywords"]', keywords);
        }
        if (author) {
            updateMeta('meta[name="author"]', author);
        }

        // Open Graph tags
        updateMeta('meta[property="og:type"]', type);
        updateMeta('meta[property="og:url"]', fullUrl);
        updateMeta('meta[property="og:title"]', fullTitle);
        updateMeta('meta[property="og:description"]', fullDescription);
        updateMeta('meta[property="og:image"]', fullImage);
        updateMeta('meta[property="og:image:secure_url"]', fullImage);
        updateMeta('meta[property="og:image:alt"]', fullTitle);
        updateMeta('meta[property="og:locale"]', 'ar_SA');
        updateMeta('meta[property="og:site_name"]', SITE_NAME);

        // Article specific tags
        if (type === 'article') {
            if (publishedTime) {
                updateMeta('meta[property="article:published_time"]', publishedTime);
            }
            if (modifiedTime) {
                updateMeta('meta[property="article:modified_time"]', modifiedTime);
            }
            if (author) {
                updateMeta('meta[property="article:author"]', author);
            }
            if (section) {
                updateMeta('meta[property="article:section"]', section);
            }
            if (tags && tags.length > 0) {
                tags.forEach((tag, index) => {
                    updateMeta(`meta[property="article:tag"][data-index="${index}"]`, tag);
                });
            }
        }

        // Twitter Card tags
        updateMeta('meta[name="twitter:url"]', fullUrl);
        updateMeta('meta[name="twitter:title"]', fullTitle);
        updateMeta('meta[name="twitter:description"]', fullDescription);
        updateMeta('meta[name="twitter:image"]', fullImage);
        updateMeta('meta[name="twitter:image:alt"]', fullTitle);

        // Cleanup function - reset to defaults when component unmounts
        return () => {
            document.querySelectorAll('meta[property^="article:"]').forEach((element) => element.remove());
            document.title = DEFAULT_SEO_TITLE;
            updateMeta('meta[name="title"]', DEFAULT_SEO_TITLE);
            updateMeta('meta[name="description"]', DEFAULT_SEO_DESCRIPTION);
            updateMeta('meta[name="robots"]', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
            updateMeta('meta[property="og:title"]', DEFAULT_SEO_TITLE);
            updateMeta('meta[property="og:description"]', DEFAULT_SEO_DESCRIPTION);
            updateMeta('meta[property="og:image"]', DEFAULT_SEO_IMAGE);
            updateMeta('meta[property="og:type"]', 'website');
            updateMeta('meta[name="twitter:title"]', DEFAULT_SEO_TITLE);
            updateMeta('meta[name="twitter:description"]', DEFAULT_SEO_DESCRIPTION);
            updateMeta('meta[name="twitter:image"]', DEFAULT_SEO_IMAGE);
            if (canonical) {
                canonical.href = toCanonicalUrl('/');
            }
        };
    }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags, noindex]);
};

export default useSEO;
