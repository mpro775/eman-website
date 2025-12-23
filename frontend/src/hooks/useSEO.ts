import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
}

const DEFAULT_TITLE = 'إيمان - مصممة UI/UX ومطورة تطبيقات محترفة';
const DEFAULT_DESCRIPTION = 'خبيرة في تصميم واجهات المستخدم وتجربة المستخدم (UI/UX) وتطوير تطبيقات الموبايل. أقدم خدمات التصميم الجرافيكي والتدريب والاستشارات.';
const DEFAULT_IMAGE = '/logo.png';
const SITE_URL = 'https://eman.dev';

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
}: SEOProps = {}) => {
    useEffect(() => {
        const fullTitle = title ? `${title} | إيمان` : DEFAULT_TITLE;
        const fullDescription = description || DEFAULT_DESCRIPTION;
        const fullImage = image || DEFAULT_IMAGE;
        const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

        // Update document title
        document.title = fullTitle;

        // Helper function to update or create meta tag
        const updateMeta = (
            selector: string,
            content: string,
            _attribute: 'name' | 'property' = 'name'
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
        if (keywords) {
            updateMeta('meta[name="keywords"]', keywords);
        }
        if (author) {
            updateMeta('meta[name="author"]', author);
        }

        // Open Graph tags
        updateMeta('meta[property="og:type"]', type, 'property');
        updateMeta('meta[property="og:url"]', fullUrl, 'property');
        updateMeta('meta[property="og:title"]', fullTitle, 'property');
        updateMeta('meta[property="og:description"]', fullDescription, 'property');
        updateMeta('meta[property="og:image"]', fullImage, 'property');

        // Article specific tags
        if (type === 'article') {
            if (publishedTime) {
                updateMeta('meta[property="article:published_time"]', publishedTime, 'property');
            }
            if (modifiedTime) {
                updateMeta('meta[property="article:modified_time"]', modifiedTime, 'property');
            }
            if (author) {
                updateMeta('meta[property="article:author"]', author, 'property');
            }
            if (section) {
                updateMeta('meta[property="article:section"]', section, 'property');
            }
            if (tags && tags.length > 0) {
                tags.forEach((tag, index) => {
                    updateMeta(`meta[property="article:tag"][data-index="${index}"]`, tag, 'property');
                });
            }
        }

        // Twitter Card tags
        updateMeta('meta[name="twitter:url"]', fullUrl);
        updateMeta('meta[name="twitter:title"]', fullTitle);
        updateMeta('meta[name="twitter:description"]', fullDescription);
        updateMeta('meta[name="twitter:image"]', fullImage);

        // Cleanup function - reset to defaults when component unmounts
        return () => {
            document.title = DEFAULT_TITLE;
            updateMeta('meta[name="title"]', DEFAULT_TITLE);
            updateMeta('meta[name="description"]', DEFAULT_DESCRIPTION);
            updateMeta('meta[property="og:title"]', DEFAULT_TITLE, 'property');
            updateMeta('meta[property="og:description"]', DEFAULT_DESCRIPTION, 'property');
            updateMeta('meta[property="og:image"]', DEFAULT_IMAGE, 'property');
            updateMeta('meta[property="og:type"]', 'website', 'property');
            updateMeta('meta[name="twitter:title"]', DEFAULT_TITLE);
            updateMeta('meta[name="twitter:description"]', DEFAULT_DESCRIPTION);
            updateMeta('meta[name="twitter:image"]', DEFAULT_IMAGE);
            if (canonical) {
                canonical.href = SITE_URL;
            }
        };
    }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags]);
};

export default useSEO;
