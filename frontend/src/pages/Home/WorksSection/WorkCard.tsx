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
 * Portfolio card — pixel-matched to Figma 820:1751 cards (e.g. 820:2742).
 * A translucent rounded card: cover image on top, then an info bar with the
 * project title (right, RTL) and a pink category chip (left).
 *
 * Uses a CSS entrance animation so it stays smooth across re-renders.
 */
const WorkCard: React.FC<WorkCardProps> = ({ work, delay }) => {
    return (
        <div
            data-no-splash="true"
            className="group flex flex-col overflow-hidden bg-[rgba(17,15,46,0.2)] border-[0.667px] border-[rgba(38,38,38,0.15)] w-full"
            style={{
                borderRadius: "16px",
                opacity: 0,
                animation: `skillIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s forwards`,
            }}
        >
            {/* Cover image (Figma 820:2743 — h220 within w394.667) */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "395 / 220" }}>
                <img
                    src={resolveImageUrl(work.image)}
                    alt={work.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Info bar (Figma 820:2745 — h88, p16) */}
            <div className="flex items-center justify-center p-4" style={{ height: "88px" }}>
                <div dir="rtl" className="flex items-start justify-between w-full" style={{ maxWidth: "362px" }}>
                    {/* Title (right) */}
                    <p
                        dir="auto"
                        className="text-white whitespace-nowrap"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif',
                            fontWeight: 700,
                            fontSize: "clamp(18px, 2.2vw, 24px)",
                            lineHeight: "27px",
                        }}
                    >
                        {work.title}
                    </p>

                    {/* Category chip (left) */}
                    <div
                        className="flex items-center shrink-0 bg-[rgba(255,92,131,0.15)]"
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
                                color: "#c67588",
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
