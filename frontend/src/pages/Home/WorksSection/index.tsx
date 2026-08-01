import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryCardStack } from "./CategoryCardStack";
import { projectsService } from "../../../services/projects.service";
import type { ProjectCategory } from "../../../types/project.types";

/**
 * Works / portfolio section ("اعمالي") — Redesigned to show ONLY Categories
 * as 3-card stack cards with dynamic hover effects.
 */
const WorksSection: React.FC = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ProjectCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const loadCategories = async () => {
            try {
                const cats = await projectsService.getCategories();
                if (cancelled) return;
                const sorted = [...(cats || [])].sort((a, b) => a.order - b.order);
                setCategories(sorted);
            } catch {
                if (!cancelled) setFailed(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadCategories();
        return () => {
            cancelled = true;
        };
    }, []);

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
                {/* Title + underline */}
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

                {/* Subtitle / Hint */}
                <p
                    dir="rtl"
                    className="mt-4 text-[#a5a0c8] text-center max-w-lg font-arabic text-sm sm:text-base"
                >
                    اختر إحدى فئات الأعمال التالية لاستكشاف جميع المشاريع والتصاميم الخاصة بها
                </p>

                {/* Categories Grid — RTL, 3 columns */}
                {loading || categories.length === 0 ? (
                    <p
                        dir="rtl"
                        className="mt-16 text-center font-arabic"
                        style={{
                            fontWeight: 500,
                            fontSize: "18px",
                            color: "#a5a0c8",
                        }}
                    >
                        {loading
                            ? "جاري تحميل فئات الأعمال..."
                            : failed
                              ? "تعذّر تحميل الفئات حالياً."
                              : "لا توجد فئات أُضيفت بعد."}
                    </p>
                ) : (
                    <div
                        dir="rtl"
                        className="mt-14 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-stretch"
                    >
                        {categories.map((cat, i) => (
                            <CategoryCardStack
                                key={cat._id}
                                category={cat}
                                index={i}
                                onClick={() => navigate(`/works/category/${cat._id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default WorksSection;

