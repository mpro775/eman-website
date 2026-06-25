import React from "react";
import ExperienceCard, { type ExperienceItem } from "./ExperienceCard";

// Content pixel/text-matched to Figma node 820:1646 ("الخبرات العملية").
// Left column (820:1653) then right column (820:1702).
const LEFT_COLUMN: ExperienceItem[] = [
    { id: 1, title: "UX/UI & Graphic Designer", subtitle: "أعمال حرة" },
    { id: 2, title: "دعم فني", subtitle: "في مجموعة هائل سعيد أنعم" },
    { id: 3, title: "Flutter App", subtitle: "مشروع تخرج في جامعة العلوم الحديثة" },
    { id: 4, title: "سكرتارية + أمين صندوق", subtitle: "في مركز يونك للإنظمة المحاسبية" },
];

const RIGHT_COLUMN: ExperienceItem[] = [
    { id: 5, title: "UX/UI", subtitle: "في محفظة جيب  &  Free Lancer" },
    { id: 6, title: "أستاذ مساعد", subtitle: "في جامعة العلوم الحديثة" },
    { id: 7, title: "أستاذة UX/UI", subtitle: "في أكاديمية سمارت ديف" },
    { id: 8, title: "Graphic Designer", subtitle: "في وكالة حريف" },
];

/**
 * Experience section ("الخبرات العملية") — pixel-matched to Figma node 820:1646.
 * Solid #040404 backdrop with a rotated purple glow, a centered title with
 * underline, and a two-column timeline of experience cards.
 */
const ExperienceSection: React.FC = () => {
    return (
        <section
            id="experience"
            className="scroll-section relative min-h-screen w-full bg-[#040404] flex items-center justify-center overflow-hidden py-20"
        >
            {/* Purple glow — top-left, rotated (Figma 820:1647) */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "-160px",
                    left: "-320px",
                    transform: "rotate(121.23deg)",
                    background: "linear-gradient(177.25deg, rgba(187,161,254,0.5) 2.26%, rgba(33,13,83,0.65) 97.74%)",
                    filter: "blur(220px)",
                    borderRadius: "50%",
                }}
            />

            <div className="relative z-10 w-full max-w-[1249px] mx-auto px-6 flex flex-col items-center" style={{ gap: "60px" }}>
                {/* Title + underline (centered — Figma 820:1649) */}
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
                        الـخبــــرات العملية
                    </h2>
                    <div
                        style={{
                            width: "530px",
                            maxWidth: "85vw",
                            height: "3px",
                            borderRadius: "2px",
                            background: "linear-gradient(90deg, rgba(139,92,246,0) 0%, #C084FC 50%, rgba(139,92,246,0) 100%)",
                        }}
                    />
                </div>

                {/* Two columns (Figma 820:1652) — LTR layout, RTL text inside cards.
                    Left column sits on the left, right column on the right; gap 78.702px. */}
                <div
                    dir="ltr"
                    className="flex flex-col lg:flex-row lg:justify-center w-full items-center gap-[36.5px] lg:gap-[78.702px]"
                >
                    <div className="flex flex-col items-center w-full lg:w-auto" style={{ gap: "36.499px" }}>
                        {LEFT_COLUMN.map((exp, i) => (
                            <ExperienceCard key={exp.id} experience={exp} delay={0.1 + i * 0.08} />
                        ))}
                    </div>
                    <div className="flex flex-col items-center w-full lg:w-auto" style={{ gap: "36.499px" }}>
                        {RIGHT_COLUMN.map((exp, i) => (
                            <ExperienceCard key={exp.id} experience={exp} delay={0.15 + i * 0.08} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
