import React from "react";
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
 * bottom vignette gradient, and responsive glowing category badge.
 */
const WorkCard: React.FC<WorkCardProps> = ({ work, delay }) => {
    return (
        <div
            data-no-splash="true"
            className="group relative flex flex-col overflow-hidden bg-[rgba(17,15,46,0.35)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,92,131,0.4)] transition-all duration-500 ease-out shadow-lg hover:shadow-[0_12px_32px_rgba(255,92,131,0.15)] w-full hover:-translate-y-1.5"
            style={{
                borderRadius: "16px",
                opacity: 0,
                animation: `skillIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s forwards`,
            }}
        >
            {/* Ambient glow highlight on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,rgba(255,92,131,0.12),transparent_70%)] z-10" />

            {/* Cover image container (aspect-ratio: 166 / 209) */}
            <div className="relative w-full overflow-hidden bg-[#0d0c1d]" style={{ aspectRatio: "166 / 209" }}>
                <img
                    src={resolveImageUrl(work.image)}
                    alt={work.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                />
                {/* Bottom gradient overlay for smooth transition into info bar */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(17,15,46,0.9)] to-transparent pointer-events-none" />
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

                    {/* Category chip (left) */}
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
                </div>
            </div>
        </div>
    );
};

export default WorkCard;
