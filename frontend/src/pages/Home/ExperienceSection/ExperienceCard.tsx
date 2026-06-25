import React from "react";
import { HiChevronLeft } from "react-icons/hi2";

export interface ExperienceItem {
    id: number;
    /** Role (purple, bold) */
    title: string;
    /** Place / context (muted) */
    subtitle: string;
}

interface ExperienceCardProps {
    experience: ExperienceItem;
    delay: number;
}

/**
 * Experience timeline row — pixel-matched to Figma 820:1646 (e.g. 820:1654).
 * Layout (LTR, per Figma): [glass card] · [chevron ‹] · [timeline node + stub].
 * The card stays on the left, the node on the right; only the text inside the
 * card is RTL (right-aligned Arabic via dir="rtl" + text-right).
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, delay }) => {
    return (
        <div
            dir="ltr"
            className="flex items-center justify-between w-full max-w-[557px]"
            style={{ opacity: 0, animation: `skillIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s forwards` }}
        >
            {/* Glass card */}
            <div
                className="flex flex-col items-center justify-center flex-1 lg:flex-none lg:w-[460px] h-[96px] px-4 border-[0.572px] border-[rgba(58,67,96,0.5)] bg-[rgba(42,51,80,0.2)]"
                style={{ borderRadius: "11.437px" }}
            >
                {/* RTL text block — right-aligned (Figma 820:1656: items-end, gap 18) */}
                <div className="flex flex-col w-[402px] max-w-[88%]" style={{ gap: "18px" }}>
                    <p
                        dir="auto"
                        className="w-full text-right whitespace-nowrap"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif',
                            fontWeight: 700,
                            fontSize: "clamp(16px, 2.4vw, 27.375px)",
                            color: "#bba1fe",
                            letterSpacing: "0.6433px",
                            lineHeight: "19.3px",
                        }}
                    >
                        {experience.title}
                    </p>
                    <p
                        dir="auto"
                        className="w-full text-right"
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

            {/* Chevron pointing left toward the card */}
            <HiChevronLeft className="shrink-0 mx-1" style={{ color: "rgba(178,179,180,0.7)", fontSize: "20px" }} />

            {/* Timeline node + stub line */}
            <div className="flex flex-col items-center shrink-0" style={{ gap: "5.718px" }}>
                <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                        width: "45.748px",
                        height: "45.748px",
                        background: "linear-gradient(135deg, rgba(187,161,254,0.2) 0%, rgba(132,60,77,0.2) 100%)",
                        boxShadow: "0px 0px 7.7px 0px rgba(255,255,255,0.4), 0px 1px 4.289px 0px rgba(187,161,254,0.5)",
                    }}
                >
                    <div className="rounded-full" style={{ width: "19px", height: "19px", background: "rgba(198,117,136,0.5)" }} />
                </div>
                <div style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, #bba1fe, #503f7d)" }} />
            </div>
        </div>
    );
};

export default ExperienceCard;
