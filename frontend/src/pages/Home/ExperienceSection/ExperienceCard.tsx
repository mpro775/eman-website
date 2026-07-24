import React from "react";
import cardStreak from "../../../assets/experience/card-streak.svg";

export interface ExperienceItem {
    id: number;
    /** Role (purple, bold) */
    title: string;
    /** Place / context (muted) */
    subtitle: string;
    /** Year or year range shown on the left (purple) */
    year: string;
    /** The first card uses a solid, more prominent background (Figma 994:601) */
    highlight?: boolean;
}

interface ExperienceCardProps {
    experience: ExperienceItem;
    delay: number;
}

/**
 * Experience row — pixel-matched to Figma node 820:1646 (cards 994:601…994:644).
 * A rounded glass card, `justify-between`: year on the left, role + place on the
 * right (RTL, right-aligned). A faint purple streak sweeps behind it and a pink
 * inset glow lines the edge. Static CSS entrance so it renders while backgrounded.
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, delay }) => {
    return (
        <div
            data-no-splash="true"
            dir="ltr"
            className="relative flex items-center justify-between w-full lg:w-[557px] h-[123px] px-5 sm:px-[39px] overflow-hidden border-[0.572px] border-[rgba(58,67,96,0.5)]"
            style={{
                borderRadius: "11.437px",
                background: experience.highlight ? "#0b0d13" : "rgba(11,13,19,0.2)",
                boxShadow: "inset -8px 1px 13px 0px rgba(198,117,136,0.42)",
                opacity: 0,
                animation: `skillIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s forwards`,
            }}
        >
            {/* Decorative purple streak (Figma 994:606 — Vector 432) */}
            <img
                src={cardStreak}
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none select-none max-w-none"
                style={{ left: "-131.57px", top: "-87.57px", width: "571px", height: "280.5px" }}
            />

            {/* Year (left) */}
            <p
                dir="auto"
                className="relative z-10 text-right whitespace-nowrap shrink-0"
                style={{
                    fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                    fontWeight: 300,
                    fontSize: "clamp(13px, 1.6vw, 18px)",
                    color: "#bba1fe",
                    lineHeight: "18.585px",
                }}
            >
                {experience.year}
            </p>

            {/* Role + place (right, RTL) */}
            <div className="relative z-10 flex flex-col items-end" style={{ gap: "14px" }}>
                <p
                    dir="auto"
                    className="text-right whitespace-nowrap"
                    style={{
                        fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif',
                        fontWeight: 700,
                        fontSize: "clamp(17px, 2.4vw, 27.375px)",
                        color: "#bba1fe",
                        letterSpacing: "0.6433px",
                        lineHeight: "1.2",
                    }}
                >
                    {experience.title}
                </p>
                <p
                    dir="auto"
                    className="text-right"
                    style={{
                        fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                        fontWeight: 300,
                        fontSize: "clamp(13px, 1.6vw, 18px)",
                        color: "#b2b3b4",
                        lineHeight: "18.585px",
                    }}
                >
                    {experience.subtitle}
                </p>
            </div>
        </div>
    );
};

export default ExperienceCard;
