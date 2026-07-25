import React from "react";
import { FiEye, FiArrowUpRight } from "react-icons/fi";
import { resolveImageUrl } from "../../../utils/imageUrl";

export interface WorkItem {
    id: string;
    /** Project title (Figma 820:2830 — bold white) */
    title: string;
    /** Category name — drives both the filter tabs and the pink chip (Figma 820:2832) */
    category: string;
    /** Card image */
    image: string;
    /** External preview URL or details link */
    link?: string;
    /** Optional project description */
    description?: string;
}

interface WorkCardProps {
    work: WorkItem;
    delay: number;
    onPreview?: (work: WorkItem) => void;
}

/**
 * Portfolio card — redesigned with aspect-ratio 166 / 209 and info bar height 84px.
 * Features glassmorphic backdrop, gradient border highlights, smooth image scaling,
 * bottom vignette gradient, responsive glowing category badge, and interactive preview button.
 */
const WorkCard: React.FC<WorkCardProps> = ({ work, delay, onPreview }) => {
    const handlePreviewClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onPreview) {
            onPreview(work);
        } else if (work.link) {
            window.open(work.link, "_blank", "noopener,noreferrer");
        } else {
            window.open(resolveImageUrl(work.image), "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div
            data-no-splash="true"
            className="group relative flex flex-col overflow-hidden bg-[rgba(17,15,46,0.35)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,92,131,0.4)] transition-all duration-500 ease-out shadow-lg hover:shadow-[0_12px_32px_rgba(255,92,131,0.2)] w-full hover:-translate-y-1.5 cursor-pointer"
            style={{
                borderRadius: "16px",
                opacity: 0,
                animation: `skillIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s forwards`,
            }}
            onClick={handlePreviewClick}
        >
            {/* Ambient glow highlight on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,rgba(255,92,131,0.15),transparent_70%)] z-10" />

            {/* Cover image container (aspect-ratio: 166 / 209) */}
            <div className="relative w-full overflow-hidden bg-[#0d0c1d]" style={{ aspectRatio: "166 / 209" }}>
                <img
                    src={resolveImageUrl(work.image)}
                    alt={work.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                />

                {/* Dark backdrop overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                {/* Animated Hover Preview Button */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <button
                        type="button"
                        onClick={handlePreviewClick}
                        className="pointer-events-auto group/btn opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white font-medium text-sm hover:bg-gradient-to-r hover:from-[#c67588] hover:to-[#8b5cf6] hover:border-transparent hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(255,92,131,0.6)] cursor-pointer"
                    >
                        <FiEye className="w-4 h-4 text-[#ff8ba7] group-hover/btn:text-white transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-6" />
                        <span style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}>معاينة المشروع</span>
                        <FiArrowUpRight className="w-4 h-4 text-white/70 group-hover/btn:text-white group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                    </button>
                </div>

                {/* Bottom gradient overlay for smooth transition into info bar */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(17,15,46,0.9)] to-transparent pointer-events-none z-10" />
            </div>

            {/* Info bar (height: 84px) */}
            <div className="relative z-20 flex items-center justify-center p-4 bg-[rgba(17,15,46,0.4)]" style={{ height: "84px" }}>
                <div dir="rtl" className="flex items-center justify-between w-full gap-3" style={{ maxWidth: "362px" }}>
                    {/* Title (right) */}
                    <p
                        dir="auto"
                        className="text-white font-bold truncate transition-colors duration-300 group-hover:text-[#ffd6e0]"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif',
                            fontWeight: 700,
                            fontSize: "clamp(16px, 2.2vw, 24px)",
                            lineHeight: "27px",
                        }}
                        title={work.title}
                    >
                        {work.title}
                    </p>

                    {/* Category chip + Preview action icon (left) */}
                    <div className="flex items-center gap-2 shrink-0">
                        <div
                            className="flex items-center shrink-0 bg-[rgba(255,92,131,0.15)] border border-[rgba(255,92,131,0.25)] group-hover:border-[rgba(255,92,131,0.5)] group-hover:bg-[rgba(255,92,131,0.25)] transition-all duration-300"
                            style={{ height: "30px", borderRadius: "10px", padding: "0 8px" }}
                        >
                            <span
                                dir="auto"
                                className="whitespace-nowrap"
                                style={{
                                    fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                    color: "rgb(220, 137, 156)",
                                }}
                            >
                                {work.category}
                            </span>
                        </div>

                        {/* Quick preview icon button */}
                        <div
                            onClick={handlePreviewClick}
                            title="معاينة المشروع"
                            className="flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-[rgba(255,92,131,0.4)] hover:border-[rgba(255,92,131,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(255,92,131,0.4)]"
                        >
                            <FiArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkCard;
