import React from "react";

export interface ServiceItem {
    id: number;
    /** Arabic service name (bold, white) */
    arabicTitle: string;
    /** English subtitle (muted) */
    englishSubtitle: string;
    /** Arabic description paragraph */
    arabicDescription: string;
    /** Imported SVG icon (stroke = #C4B5FD from Figma) */
    icon: string;
}

interface ServiceCardProps {
    service: ServiceItem;
}

const FONT = '"Thmanyah Sans", "Tajawal", sans-serif';

/**
 * Individual service card — pixel-matched to Figma 820:1553 cards
 * (839:637 / 839:626 / 839:602). Glass card with a translucent indigo fill and
 * faint purple border; right-aligned (RTL) icon → bilingual title → description.
 * Fixed 419×324 on lg+, fluid full-width below. Static CSS (no rAF).
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    return (
        <div
            dir="rtl"
            className="group flex flex-col items-start overflow-hidden bg-[rgba(17,15,46,0.2)] border-[0.729px] border-[rgba(139,92,246,0.13)] w-full lg:w-[419px] lg:shrink-0 lg:h-[324px] transition-colors duration-300 hover:border-[rgba(139,92,246,0.35)]"
            style={{ gap: "17.491px", padding: "26.965px", borderRadius: "17.491px" }}
        >
            {/* Icon chip */}
            <div
                className="flex items-center justify-center shrink-0 bg-[rgba(139,92,246,0.12)] border-[0.729px] border-[rgba(139,92,246,0.2)]"
                style={{ width: "52.473px", height: "52.473px", borderRadius: "15.305px" }}
            >
                <img src={service.icon} alt="" aria-hidden="true" className="block" style={{ width: "24px", height: "24px" }} />
            </div>

            {/* Bilingual title */}
            <div className="flex flex-col items-start w-full" style={{ gap: "13.118px" }}>
                <p
                    className="text-white whitespace-nowrap"
                    style={{ fontFamily: FONT, fontWeight: 700, fontSize: "26.236px", lineHeight: "26.236px" }}
                >
                    {service.arabicTitle}
                </p>
                <p
                    className="text-[#6b6a8e] whitespace-nowrap"
                    style={{ fontFamily: FONT, fontWeight: 500, fontSize: "18px", lineHeight: "17.491px" }}
                >
                    {service.englishSubtitle}
                </p>
            </div>

            {/* Description */}
            <p
                className="text-[#a5a0c8] text-right w-full"
                style={{ fontFamily: FONT, fontWeight: 500, fontSize: "22px", lineHeight: "35px" }}
            >
                {service.arabicDescription}
            </p>
        </div>
    );
};

export default ServiceCard;
