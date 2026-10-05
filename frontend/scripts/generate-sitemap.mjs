import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_URL = (process.env.VITE_SITE_URL || "https://emanjameel.pro").replace(/\/$/, "");
const API_URL = (process.env.VITE_API_URL || "https://api.emanjameel.pro/api").replace(/\/$/, "");
const outputPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/sitemap.xml");

const escapeXml = (value) =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");

const normalizeDate = (value) => {
    if (!value) return undefined;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const fetchJson = async (url) => {
    const response = await fetch(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
    return response.json();
};

const fetchCollection = async (endpoint) => {
    const first = await fetchJson(`${API_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}page=1&limit=100`);
    const firstPage = first?.data;
    const items = [...(firstPage?.data || [])];
    const totalPages = firstPage?.meta?.totalPages || 1;

    for (let page = 2; page <= totalPages; page += 1) {
        const response = await fetchJson(
            `${API_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}page=${page}&limit=100`,
        );
        items.push(...(response?.data?.data || []));
    }

    return items;
};

const renderUrl = ({ path: pathname, lastmod }) => {
    const lastModified = normalizeDate(lastmod);
    return [
        "  <url>",
        `    <loc>${escapeXml(`${SITE_URL}${pathname}`)}</loc>`,
        ...(lastModified ? [`    <lastmod>${lastModified}</lastmod>`] : []),
        "  </url>",
    ].join("\n");
};

const generate = async () => {
    const [posts, projects, categoriesResponse] = await Promise.all([
        fetchCollection("/blog/posts"),
        fetchCollection("/projects"),
        fetchJson(`${API_URL}/projects/categories`),
    ]);
    const categories = categoriesResponse?.data || [];

    const entries = [
        { path: "/" },
        { path: "/about" },
        { path: "/experience" },
        { path: "/contact" },
        { path: "/blog" },
        ...categories.map((category) => ({
            path: `/works/category/${encodeURIComponent(category._id)}`,
            lastmod: category.updatedAt,
        })),
        ...projects.map((project) => ({
            path: `/works/${encodeURIComponent(project._id)}`,
            lastmod: project.updatedAt || project.createdAt,
        })),
        ...posts.map((post) => ({
            path: `/blog/${encodeURIComponent(post._id)}`,
            lastmod: post.updatedAt || post.updatedDate || post.publishDate,
        })),
    ];

    const uniqueEntries = [...new Map(entries.map((entry) => [entry.path, entry])).values()];
    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...uniqueEntries.map(renderUrl),
        "</urlset>",
        "",
    ].join("\n");

    await writeFile(outputPath, xml, "utf8");
    console.log(`Generated sitemap with ${uniqueEntries.length} URLs.`);
};

try {
    await generate();
} catch (error) {
    console.warn(`Sitemap generation skipped; keeping the existing file. ${error.message}`);
}
