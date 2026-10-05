import { useEffect } from 'react';
import { DEFAULT_SEO_IMAGE, SITE_NAME, SITE_URL, toAbsoluteUrl, toCanonicalUrl } from '../../config/seo';

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface ArticleSchema {
    title: string;
    description: string;
    image?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    category?: string;
    url?: string;
}

interface ServiceSchema {
    name: string;
    description: string;
    image?: string;
    price?: string;
}

interface ProjectSchema {
    name: string;
    description: string;
    image?: string;
    category?: string;
    url?: string;
}

interface SEOSchemaProps {
    type: 'article' | 'service' | 'project' | 'breadcrumb' | 'faq';
    data: ArticleSchema | ServiceSchema | ProjectSchema | BreadcrumbItem[] | { question: string; answer: string }[];
}

/**
 * Component for injecting structured data (JSON-LD) into the page
 * Supports articles, services, projects, breadcrumbs, and FAQs
 */
export const SEOSchema: React.FC<SEOSchemaProps> = ({ type, data }) => {
    useEffect(() => {
        const scriptId = `seo-schema-${type}`;

        // Remove existing script if present
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.remove();
        }

        let schema: object;

        switch (type) {
            case 'article': {
                const articleData = data as ArticleSchema;
                schema = {
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: articleData.title,
                    description: articleData.description,
                    image: toAbsoluteUrl(articleData.image || DEFAULT_SEO_IMAGE),
                    author: {
                        '@type': 'Person',
                        name: articleData.author || SITE_NAME,
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: SITE_NAME,
                        logo: {
                            '@type': 'ImageObject',
                            url: `${SITE_URL}/logo.png`,
                        },
                    },
                    datePublished: articleData.datePublished,
                    dateModified: articleData.dateModified || articleData.datePublished,
                    mainEntityOfPage: {
                        '@type': 'WebPage',
                        '@id': toCanonicalUrl(articleData.url),
                    },
                    articleSection: articleData.category,
                };
                break;
            }

            case 'service': {
                const serviceData = data as ServiceSchema;
                schema = {
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: serviceData.name,
                    description: serviceData.description,
                    image: toAbsoluteUrl(serviceData.image || DEFAULT_SEO_IMAGE),
                    provider: {
                        '@type': 'Person',
                        name: SITE_NAME,
                        url: SITE_URL,
                    },
                    areaServed: {
                        '@type': 'Country',
                        name: 'Saudi Arabia',
                    },
                    ...(serviceData.price && { priceRange: serviceData.price }),
                };
                break;
            }

            case 'project': {
                const projectData = data as ProjectSchema;
                schema = {
                    '@context': 'https://schema.org',
                    '@type': 'CreativeWork',
                    name: projectData.name,
                    description: projectData.description,
                    image: toAbsoluteUrl(projectData.image || DEFAULT_SEO_IMAGE),
                    creator: {
                        '@type': 'Person',
                        name: SITE_NAME,
                        url: SITE_URL,
                    },
                    ...(projectData.category && { genre: projectData.category }),
                    ...(projectData.url && { url: toCanonicalUrl(projectData.url) }),
                };
                break;
            }

            case 'breadcrumb': {
                const breadcrumbData = data as BreadcrumbItem[];
                schema = {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: breadcrumbData.map((item, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: item.name,
                        item: toCanonicalUrl(item.url),
                    })),
                };
                break;
            }

            case 'faq': {
                const faqData = data as { question: string; answer: string }[];
                schema = {
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqData.map((item) => ({
                        '@type': 'Question',
                        name: item.question,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: item.answer,
                        },
                    })),
                };
                break;
            }

            default:
                return;
        }

        // Create and inject script
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);

        // Cleanup on unmount
        return () => {
            const scriptToRemove = document.getElementById(scriptId);
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [type, data]);

    return null;
};

export default SEOSchema;
