import React from "react";
import { Link } from "react-router-dom";
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
}

interface WorkCardProps {
    work: WorkItem;
    delay: number;
}

/**
 * Portfolio card — redesigned with aspect-ratio 166 / 209 and info bar height 84px.
 * Features glassmorphic backdrop, gradient border highlights, smooth image scaling,
 * bottom vignette gradient, and a responsive glowing category badge.
 *
 * The whole card is one link to `/works/:id`; the hover button and the corner
 * icon are decorative, so each card is a single tab stop with no nested controls.
 */
const WorkCard: React.FC<WorkCardProps> = ({ work, delay }) => {
    return (
        <Link
            to={`/works/${work.id}`}
            aria-label={`عرض تفاصيل ${work.title}`}
            data-no-splash="true"
            className="group relative flex flex-col overflow-hidden bg-[rgba(17,15,46,0.35)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,92,131,0.4)] transition-all duration-500 ease-out shadow-lg hover:shadow-[0_12px_32px_rgba(255,92,131,0.2)] w-full hover:-translate-y-1.5 cursor-pointer"
            style={{
                borderRadius: "16px",
                opacity: 0,
                animation: `skillIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s forwards`,
            }}
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

                {/* Animated hover preview affordance — decorative; the card is the link */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <span
                        aria-hidden="true"
                        className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#c67588] group-hover:to-[#8b5cf6] group-hover:shadow-[0_0_20px_rgba(255,92,131,0.6)] text-white font-medium text-sm"
                    >
                        <FiEye className="w-4 h-4 text-[#ff8ba7] group-hover:text-white transition-all duration-300" />
                        <span style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}>معاينة المشروع</span>
                        <FiArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white transition-transform duration-300" />
                    </span>
                </div>

                {/* Bottom gradient overlay for smooth transition into info bar */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(17,15,46,0.9)] to-transparent pointer-events-none z-10" />
            </div>

            {/* Info bar (height: 84px) */}
            <div className="relative z-20 flex items-center justify-center p-4 bg-[rgba(17,15,46,0.4)]" style={{ height: "84px" }}>
                <div className="flex items-center justify-between w-full gap-3" style={{ maxWidth: "362px" }}>
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

                    {/* Category chip + decorative action icon (left) */}
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

                        <div
                            aria-hidden="true"
                            className="flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-white/5 border border-white/10 text-white/70 group-hover:text-white group-hover:bg-[rgba(255,92,131,0.4)] group-hover:border-[rgba(255,92,131,0.6)] group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_12px_rgba(255,92,131,0.4)]"
                        >
                            <FiArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WorkCard;
