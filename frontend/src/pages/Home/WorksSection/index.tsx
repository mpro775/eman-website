import React, { useState, useEffect } from "react";
import WorkCard, { type WorkItem } from "./WorkCard";
import { projectsService } from "../../../services/projects.service";

// Filter tabs (Figma 820:2810) — RTL reading order (الكل on the right).
const FILTERS = ["الكل", "UI/UX", "جرافيك", "هوية بصرية", "تطبيقات"] as const;

/**
 * Works / portfolio section ("اعمالي") — pixel-matched to Figma node 820:1751.
 * Solid #040404 backdrop with a rotated glow, a centered title + underline,
 * a row of filter tabs, and a responsive 3-column grid of project cards.
 */
const WorksSection: React.FC = () => {
    const [active, setActive] = useState<string>("الكل");
    const [works, setWorks] = useState<WorkItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                setLoading(true);
                const response = await projectsService.getAll({ limit: 100 });
                const projects = response.data || [];
                const mappedWorks: WorkItem[] = projects.map((p) => {
                    const catName = typeof p.category === 'object' ? p.category.name : p.category || '';
                    let filterCategory = 'UI/UX';
                    let defaultTag = 'ويب';
                    
                    if (catName === 'UX / UI') {
                        filterCategory = 'UI/UX';
                        defaultTag = 'ويب';
                    } else if (catName === 'Mobile App') {
                        filterCategory = 'تطبيقات';
                        defaultTag = 'تطبيق موبايل';
                    } else if (catName === 'Graphic Design') {
                        filterCategory = 'جرافيك';
                        defaultTag = 'تصميم جرافيك';
                    } else if (catName === 'Visual Identity' || catName === 'هوية بصرية') {
                        filterCategory = 'هوية بصرية';
                        defaultTag = 'براندينج';
                    }

                    return {
                        id: p._id,
                        title: p.titleAr || p.name,
                        tag: p.subtitleAr || p.subtitle || defaultTag,
                        category: filterCategory,
                        image: p.image,
                    };
                });
                setWorks(mappedWorks);
            } catch (error) {
                console.error("Failed to load portfolio works:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorks();
    }, []);

    const visible = active === "الكل" ? works : works.filter((w) => w.category === active);

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

            <div className="relative z-10 w-full max-w-[1232px] mx-auto px-6 flex flex-col items-start">
                {/* Title + underline (right-aligned) */}
                <div className="flex flex-col items-start" style={{ gap: "14px" }}>
                    <h2
                        className="text-white text-right whitespace-nowrap"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 700,
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
                            background: "linear-gradient(to left, #C084FC 0%, rgba(139,92,246,0) 100%)",
                        }}
                    />
                </div>

                {/* Filter tabs (Figma 820:2810) — RTL */}
                <div
                    dir="rtl"
                    className="mt-10 lg:mt-[55px] flex flex-wrap items-center justify-center"
                    style={{ gap: "18.045px" }}
                >
                    {FILTERS.map((label) => {
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
                {loading && works.length === 0 ? (
                    <div className="text-center text-text-secondary mt-10" style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}>
                        جاري تحميل أعمالي...
                    </div>
                ) : (
                    <>
                        <div
                            dir="rtl"
                            className="mt-10 lg:mt-[40px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            style={{ gap: "24px" }}
                        >
                            {visible.map((work, i) => (
                                <WorkCard key={work.id} work={work} delay={0.1 + i * 0.07} />
                            ))}
                        </div>
                        {!loading && visible.length === 0 && (
                            <div className="text-center text-text-secondary mt-10" style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}>
                                لا توجد أعمال في هذا التصنيف حالياً.
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default WorksSection;
