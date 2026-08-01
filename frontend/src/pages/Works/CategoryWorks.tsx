import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import WorkCard, { type WorkItem } from "../Home/WorksSection/WorkCard";
import Footer from "../../components/layout/Footer";
import Container from "../../components/common/Container";
import { useSEO } from "../../hooks/useSEO";
import { projectsService } from "../../services/projects.service";
import type { Project, ProjectCategory } from "../../types/project.types";

export const CategoryWorks: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [category, setCategory] = useState<ProjectCategory | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useSEO({
        title: category ? `${category.name} | أعمال إيمان جميل` : "فئة الأعمال | إيمان جميل",
        description: `استعرض جميع المشاريع والأعمال الخاصة بفئة ${category?.name || "الأعمال"}`,
    });

    useEffect(() => {
        if (!id) return;
        let cancelled = false;

        setLoading(true);
        window.scrollTo({ top: 0, behavior: "smooth" });

        const loadCategoryData = async () => {
            try {
                const [catData, projectsRes] = await Promise.all([
                    projectsService.getCategoryById(id),
                    projectsService.getAll({ category: id, limit: 100, sortBy: "createdAt", sortOrder: "desc" }),
                ]);

                if (cancelled) return;
                setCategory(catData);
                setProjects(projectsRes?.data || []);
            } catch (err) {
                console.error("Failed to load category works:", err);
                if (!cancelled) setError(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadCategoryData();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const workItems: WorkItem[] = projects.map((p) => {
        const item: WorkItem = {
            id: p._id,
            title: p.name,
            category: typeof p.category === "object" && p.category ? p.category.name : category?.name || "",
            image: p.image,
        };
        if (p.projectLink) item.link = p.projectLink;
        if (p.figmaLink) item.figmaLink = p.figmaLink;
        if (p.description) item.description = p.description;
        return item;
    });

    return (
        <div className="min-h-screen bg-[#040404] text-white flex flex-col justify-between" dir="rtl">
            {/* Background rotated glow */}
            <div
                className="fixed pointer-events-none z-0"
                style={{
                    width: "700px",
                    height: "350px",
                    top: "-50px",
                    right: "-100px",
                    transform: "rotate(-45deg)",
                    background: "linear-gradient(177.25deg, rgba(187,161,254,0.3) 2.26%, rgba(33,13,83,0.4) 97.74%)",
                    filter: "blur(180px)",
                    borderRadius: "50%",
                }}
            />

            <main className="relative z-10 py-12 lg:py-16">
                <Container>
                    {/* Top Navigation / Back button */}
                    <div className="mb-10 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/#portfolio")}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                        >
                            <HiArrowRight className="w-5 h-5 text-accent-pink group-hover:-translate-x-1 transition-transform" />
                            <span className="font-arabic font-medium text-sm sm:text-base">العودة للرئيسية</span>
                        </button>

                        <Link
                            to="/"
                            className="text-xs sm:text-sm text-text-muted hover:text-white transition-colors font-arabic"
                        >
                            إيمان جميل / أعمالي
                        </Link>
                    </div>

                    {/* Category Title Header */}
                    <div className="flex flex-col items-start mb-12 border-b border-white/10 pb-8">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-pink/10 border border-accent-pink/20 text-accent-pink text-xs font-medium font-arabic mb-4">
                            <span>فئة أعمال</span>
                        </div>

                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}
                        >
                            {category?.name || "جاري التحميل..."}
                        </h1>

                        <p className="text-text-secondary text-sm sm:text-base font-arabic">
                            {loading
                                ? "جاري تحميل أعمال الفئة..."
                                : `تم العثور على ${projects.length} ${projects.length === 1 ? "عمل" : "أعمال"} في هذه الفئة.`}
                        </p>
                    </div>

                    {/* Works Grid */}
                    {loading ? (
                        <div className="py-20 text-center">
                            <div className="w-12 h-12 border-4 border-accent-pink/20 border-t-accent-pink rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-text-muted font-arabic">جاري تحميل الأعمال...</p>
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center">
                            <p className="text-red-400 font-arabic text-lg mb-4">تعذّر تحميل أعمال هذه الفئة.</p>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-accent-pink/20 text-accent-pink rounded-full hover:bg-accent-pink/30 transition-colors font-arabic"
                            >
                                إعادة المحاولة
                            </button>
                        </div>
                    ) : workItems.length === 0 ? (
                        <div className="py-20 text-center bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-text-muted font-arabic text-lg mb-4">لا توجد أعمال مضافة تحت هذه الفئة حتى الآن.</p>
                            <button
                                type="button"
                                onClick={() => navigate("/#portfolio")}
                                className="px-6 py-2.5 bg-accent-pink text-white rounded-full hover:bg-accent-pink/80 transition-colors font-arabic text-sm"
                            >
                                تصفح الفئات الأخرى
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {workItems.map((work, i) => (
                                <WorkCard key={work.id} work={work} delay={0.05 * i} />
                            ))}
                        </div>
                    )}
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default CategoryWorks;
