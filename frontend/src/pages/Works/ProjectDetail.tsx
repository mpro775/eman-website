import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import Footer from "../../components/layout/Footer";
import Container from "../../components/common/Container";
import { useSEO } from "../../hooks/useSEO";
import { projectsService } from "../../services/projects.service";
import { resolveImageUrl } from "../../utils/imageUrl";
import type { Project } from "../../types/project.types";
import ProjectGallery from "./ProjectGallery";
import ProjectSidebar from "./ProjectSidebar";

/** The API caps `limit` at 100, so the sibling list is fetched page by page. */
const PAGE_SIZE = 100;
const MAX_PAGES = 5;

/**
 * Every project, in the same order the works grid uses. The sort is pinned
 * explicitly (rather than relying on the API default) so the `03 / 06` counter
 * can never disagree with the position of the card the visitor clicked.
 */
const fetchAllProjects = async (): Promise<Project[]> => {
    const all: Project[] = [];

    for (let page = 1; page <= MAX_PAGES; page++) {
        const res = await projectsService.getAll({
            page,
            limit: PAGE_SIZE,
            sortBy: "createdAt",
            sortOrder: "desc",
        });
        all.push(...(res?.data || []));
        if (!res?.meta || page >= res.meta.totalPages) break;
    }

    return all;
};

/**
 * Project detail page (`/works/:id`).
 *
 * Deliberately renders no site header — only a back button — so the project
 * itself carries the page. Entrance motion is plain CSS (the project avoids
 * framer-motion, whose rAF loop stalls in background tabs).
 */
const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [project, setProject] = useState<Project | null>(null);
    const [siblings, setSiblings] = useState<Project[]>([]);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        let cancelled = false;

        setLoading(true);
        setProject(null);
        setGalleryIndex(0);
        window.scrollTo({ top: 0 });

        const load = async () => {
            try {
                // A failing sibling list must not take the page down with it —
                // it only powers the counter and the prev/next arrows.
                const [current, all] = await Promise.all([
                    projectsService.getById(id),
                    fetchAllProjects().catch(() => [] as Project[]),
                ]);
                if (cancelled) return;
                setProject(current);
                setSiblings(all);
            } catch {
                if (!cancelled) setProject(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const categoryName =
        project && typeof project.category === "object" && project.category ? project.category.name : "";

    // Gallery falls back to the card cover when no gallery was uploaded.
    const images = useMemo(() => {
        if (!project) return [];
        const gallery = (project.gallery || []).filter(Boolean);
        if (gallery.length) return gallery;
        return project.image ? [project.image] : [];
    }, [project]);

    const position = useMemo(() => {
        if (!project || siblings.length === 0) return null;
        const index = siblings.findIndex((p) => p._id === project._id);
        return index === -1 ? null : { index, total: siblings.length };
    }, [project, siblings]);

    useSEO({
        title: project?.name,
        description: project?.description?.slice(0, 160),
        keywords: project ? [categoryName, ...(project.tags || [])].filter(Boolean).join(", ") : undefined,
        image: project?.image ? resolveImageUrl(project.image) : undefined,
        url: id ? `/works/${id}` : undefined,
        type: "article",
        section: categoryName || undefined,
        tags: project?.tags,
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-[#040404] flex items-center justify-center" dir="rtl">
                <p className="text-[#a5a0c8] text-lg" style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}>
                    جاري تحميل تفاصيل المشروع...
                </p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-[#040404] flex flex-col items-center justify-center gap-4" dir="rtl">
                <p className="text-white text-xl" style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}>
                    المشروع غير موجود
                </p>
                <Link to="/" className="text-[#c67588] hover:underline">
                    العودة إلى الأعمال
                </Link>
            </div>
        );
    }

    // navigate(-1) restores the exact scroll position inside the works grid;
    // a `/#portfolio` link cannot, because Home is a scroll-snap container.
    const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate("/"));

    return (
        <div dir="rtl" className="min-h-screen bg-[#040404]">
            <Container size="xl">
                {/* Top bar: back button only — no header, logo or nav on this page.
                    justify-end puts it on the visual left under RTL. */}
                <div className="flex justify-end pt-8">
                    <button
                        type="button"
                        onClick={goBack}
                        data-no-splash="true"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 cursor-pointer hover:text-white hover:border-[rgba(255,92,131,0.5)] transition-all duration-300"
                        style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}
                    >
                        <span>العودة إلى الأعمال</span>
                        <HiArrowRight className="text-base" />
                    </button>
                </div>

                {/* DOM order is gallery-then-sidebar so mobile stacks correctly.
                    At lg the RTL grid flows right-to-left, so the *higher* order
                    lands on the left — hence the gallery taking order-2. */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 py-6 lg:py-10 animate-fade-in">
                    <div className="lg:col-span-2 lg:order-2">
                        {images.length > 0 && (
                            <ProjectGallery
                                images={images}
                                title={project.name}
                                index={Math.min(galleryIndex, images.length - 1)}
                                onIndexChange={setGalleryIndex}
                            />
                        )}
                    </div>

                    <div className="lg:order-1">
                        <ProjectSidebar
                            categoryName={categoryName}
                            title={project.name}
                            description={project.description || ""}
                            tags={(project.tags || []).filter(Boolean)}
                            details={(project.details || []).filter((row) => row?.label)}
                            projectLink={project.projectLink || ""}
                            figmaLink={project.figmaLink || ""}
                            position={position}
                            prevId={position && position.index > 0 ? siblings[position.index - 1]._id : null}
                            nextId={
                                position && position.index < siblings.length - 1
                                    ? siblings[position.index + 1]._id
                                    : null
                            }
                        />
                    </div>
                </div>
            </Container>

            <Footer />
        </div>
    );
};

export default ProjectDetail;
