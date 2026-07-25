import React, { useEffect, useState } from "react";
import { FiX, FiExternalLink } from "react-icons/fi";
import WorkCard, { type WorkItem } from "./WorkCard";
import { projectsService } from "../../../services/projects.service";
import { resolveImageUrl } from "../../../utils/imageUrl";

/** The "show everything" tab — a client-side view, not a stored category. */
const ALL = "الكل";

/**
 * Works / portfolio section ("اعمالي") — pixel-matched to Figma node 820:1751.
 * Solid #040404 backdrop with a rotated glow, a centered title + underline,
 * a row of filter tabs, and a responsive 3-column grid of project cards.
 */
const WorksSection: React.FC = () => {
    const [active, setActive] = useState<string>(ALL);
    const [filters, setFilters] = useState<string[]>([ALL]);
    const [works, setWorks] = useState<WorkItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const [categories, paginated] = await Promise.all([
                    projectsService.getCategories(),
                    projectsService.getAll({ limit: 100 }),
                ]);
                if (cancelled) return;

                const ordered = [...(categories || [])].sort((a, b) => a.order - b.order);
                setFilters([ALL, ...ordered.map((c) => c.name)]);

                setWorks(
                    (paginated?.data || []).map((p) => ({
                        id: p._id,
                        title: p.name,
                        category: typeof p.category === "object" && p.category ? p.category.name : "",
                        image: p.image,
                        description: p.description,
                    }))
                );
            } catch {
                if (!cancelled) setFailed(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const visible = active === ALL ? works : works.filter((w) => w.category === active);

    return (
        <section
            id="portfolio"
            className="scroll-section relative min-h-screen w-full bg-[#040404] flex items-center justify-center overflow-hidden py-20"
        >
            {/* Rotated glow — right side (Figma 826:3266) */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "804px",
                    height: "402px",
                    top: "120px",
                    right: "-180px",
                    transform: "rotate(-58deg)",
                    background: "linear-gradient(177.25deg, rgba(187,161,254,0.45) 2.26%, rgba(33,13,83,0.6) 97.74%)",
                    filter: "blur(200px)",
                    borderRadius: "50%",
                }}
            />

            <div className="relative z-10 w-full max-w-[1232px] mx-auto px-6 flex flex-col items-center">
                {/* Title + underline (centered — Figma 829:3374) */}
                <div className="flex flex-col items-center" style={{ gap: "14px" }}>
                    <h2
                        className="text-white text-center whitespace-nowrap"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 500,
                            fontSize: "clamp(2rem, 5vw, 48px)",
                            lineHeight: 1,
                            letterSpacing: "-0.72px",
                        }}
                    >
                        اعمـــــالـــي
                    </h2>
                    <div
                        style={{
                            width: "350px",
                            maxWidth: "80vw",
                            height: "3px",
                            borderRadius: "2px",
                            background: "linear-gradient(90deg, rgba(139,92,246,0) 0%, #C084FC 50%, rgba(139,92,246,0) 100%)",
                        }}
                    />
                </div>

                {/* Filter tabs (Figma 820:2810) — RTL */}
                <div
                    dir="rtl"
                    className="mt-10 lg:mt-[55px] flex flex-wrap items-center justify-center"
                    style={{ gap: "18.045px" }}
                >
                    {filters.map((label) => {
                        const isActive = label === active;
                        return (
                            <button
                                key={label}
                                type="button"
                                onClick={() => setActive(label)}
                                className="flex items-center justify-center transition-all duration-300 cursor-pointer"
                                style={{
                                    borderRadius: "11.278px",
                                    padding: "10.752px 33.752px",
                                    fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                                    fontWeight: 500,
                                    fontSize: "18px",
                                    lineHeight: "22.557px",
                                    whiteSpace: "nowrap",
                                    ...(isActive
                                        ? {
                                              color: "#ffffff",
                                              background: "linear-gradient(252.89deg, #c67588 1.84%, #603942 98.17%)",
                                              border: "0.752px solid transparent",
                                              filter: "drop-shadow(0px 4.511px 9.023px rgba(204,204,204,0.4))",
                                          }
                                        : {
                                              color: "#a5a0c8",
                                              background: "rgba(42,51,80,0.1)",
                                              border: "0.752px solid rgba(139,92,246,0.2)",
                                          }),
                                }}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                {/* Cards grid (Figma 820:2740) — RTL, 3 columns, gap 24px */}
                {loading || visible.length === 0 ? (
                    <p
                        dir="rtl"
                        className="mt-10 lg:mt-[40px] text-center"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 500,
                            fontSize: "18px",
                            color: "#a5a0c8",
                        }}
                    >
                        {loading
                            ? "جاري تحميل الأعمال..."
                            : failed
                              ? "تعذّر تحميل الأعمال حالياً."
                              : "لا توجد أعمال في هذا التصنيف حالياً."}
                    </p>
                ) : (
                    <div
                        dir="rtl"
                        className="mt-10 lg:mt-[40px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        style={{ gap: "24px" }}
                    >
                        {visible.map((work, i) => (
                            <WorkCard
                                key={work.id}
                                work={work}
                                delay={0.1 + i * 0.07}
                                onPreview={(w) => setSelectedWork(w)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Project Preview Modal Overlay */}
            {selectedWork && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
                    onClick={() => setSelectedWork(null)}
                >
                    <div
                        dir="rtl"
                        className="relative w-full max-w-4xl bg-[#110f2e]/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setSelectedWork(null)}
                            className="absolute top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white hover:bg-[#c67588] transition-all duration-300 cursor-pointer"
                        >
                            <FiX className="w-5 h-5" />
                        </button>

                        {/* Image Preview Container */}
                        <div className="relative w-full bg-black max-h-[70vh] flex items-center justify-center overflow-hidden">
                            <img
                                src={resolveImageUrl(selectedWork.image)}
                                alt={selectedWork.title}
                                className="w-full h-full max-h-[70vh] object-contain"
                            />
                        </div>

                        {/* Details Footer */}
                        <div className="p-6 bg-[#0a091d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/5">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3
                                        className="text-2xl font-bold text-white"
                                        style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}
                                    >
                                        {selectedWork.title}
                                    </h3>
                                    {selectedWork.category && (
                                        <span className="px-3 py-1 text-xs rounded-full bg-[rgba(255,92,131,0.15)] text-[#c67588] border border-[rgba(255,92,131,0.3)]">
                                            {selectedWork.category}
                                        </span>
                                    )}
                                </div>
                                {selectedWork.description && (
                                    <p className="text-gray-300 text-sm mt-1 max-w-xl">
                                        {selectedWork.description}
                                    </p>
                                )}
                            </div>

                            {selectedWork.link && (
                                <a
                                    href={selectedWork.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c67588] to-[#8b5cf6] text-white font-medium text-sm hover:shadow-[0_0_20px_rgba(255,92,131,0.5)] hover:scale-105 transition-all duration-300 shrink-0"
                                >
                                    <span>زيارة المشروع</span>
                                    <FiExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default WorksSection;
