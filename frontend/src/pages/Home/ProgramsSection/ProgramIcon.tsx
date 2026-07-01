import React from "react";

export interface Program {
    id: number;
    name: string;
    icon: string;
    /** Border color (rgba). Omit for the borderless Photoshop pill. */
    border?: string;
    /** Colored drop-glow box-shadow. */
    shadow: string;
    /** CSS gradient for the pill background. */
    gradient: string;
    /** Label text color. */
    text: string;
}

interface ProgramIconProps {
    program: Program;
}

/**
 * Tool pill — pixel-matched to Figma 820:1797 ("البرامج المستخدمة").
 * A rounded-full chip with a per-tool gradient fill, a colored 1px border and
 * a colored drop-glow, an inset top-highlight / bottom-shade, an icon and label.
 */
const ProgramIcon: React.FC<ProgramIconProps> = ({ program }) => {
    return (
        <div
            dir="ltr"
            className="relative flex items-center gap-4 rounded-full transition-transform duration-300 hover:-translate-y-1"
            style={{
                padding: "16px 27px",
                border: program.border ? `1px solid ${program.border}` : "none",
                boxShadow: program.shadow,
            }}
        >
            {/* Gradient fill */}
            <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ backgroundImage: program.gradient }}
            />
            {/* Inset top-highlight + bottom-shade */}
            <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                    boxShadow:
                        "inset 0px 1.294px 0px 0px rgba(255,255,255,0.12), inset 0px -1.294px 0px 0px rgba(0,0,0,0.2)",
                }}
            />

            {/* Icon */}
            <div className="relative shrink-0 flex items-center justify-center" style={{ width: "34px", height: "34px" }}>
                <img src={program.icon} alt={program.name} className="w-full h-full object-contain" loading="lazy" />
            </div>

            {/* Label */}
            <span
                className="relative whitespace-nowrap"
                style={{
                    fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "26px",
                    color: program.text,
                }}
            >
                {program.name}
            </span>
        </div>
    );
};

export default ProgramIcon;
