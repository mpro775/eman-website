import React from "react";

interface SkillCardProps {
    icon: string;
    title: string;
    description: string;
    position?: React.CSSProperties;
    delay: number;
    /** Icon tilt in degrees (Figma varies per card) */
    iconRotate?: number;
    /** When true, lays out in normal flow (mobile stack) instead of absolute */
    inFlow?: boolean;
}

/**
 * Skill chip card — pixel-matched to Figma 820:1595 cards (e.g. 820:1618).
 * A translucent gradient card containing a glass pill (3D icon overlapping
 * its top-left + English label) and a right-aligned Arabic description.
 *
 * Uses CSS animations (not framer-motion) so the entrance + idle float stay
 * smooth even while the page re-renders.
 */
const SkillCard: React.FC<SkillCardProps> = ({
    icon,
    title,
    description,
    position = {},
    delay,
    iconRotate = -14,
    inFlow = false,
}) => {
    return (
        <div
            data-no-splash="true"
            className={`${inFlow ? "relative w-full max-w-[340px] mx-auto" : "absolute w-[311px]"} z-30`}
            style={{
                ...position,
                opacity: 0,
                animation: `skillIn 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s forwards`,
            }}
        >
            {/* Idle float wrapper */}
            <div style={{ animation: `skillFloat 4s ease-in-out ${delay}s infinite` }}>
                <div
                    dir="rtl"
                    className="relative flex flex-col items-center rounded-[30px] border border-white/10 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
                    style={{
                        padding: "12px 16px",
                        gap: "10.2px",
                        background: "linear-gradient(229.7deg, rgba(59,49,86,0.3) 38.21%, rgba(0,0,0,0.3) 98.39%)",
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                    }}
                >
                    {/* Chip: glass pill + overlapping 3D icon */}
                    <div className="relative shrink-0" style={{ width: "194.2px", height: "59.6px" }}>
                        <div
                            className="absolute flex items-center justify-center bg-white/10 border border-white/10 overflow-hidden"
                            style={{ left: "19.4px", top: "20px", width: "174.8px", height: "39.6px", borderRadius: "61.6px" }}
                        >
                            <span
                                className="text-white text-center whitespace-nowrap"
                                style={{
                                    fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif',
                                    fontWeight: 600,
                                    fontSize: "16.8px",
                                    letterSpacing: "-0.21px",
                                }}
                            >
                                {title}
                            </span>
                        </div>
                        <img
                            src={icon}
                            alt=""
                            aria-hidden="true"
                            className="absolute object-contain pointer-events-none drop-shadow-lg"
                            style={{ left: "0px", top: "0px", width: "48px", height: "48px", transform: `rotate(${iconRotate}deg)` }}
                        />
                    </div>

                    {/* Description */}
                    <p
                        className="text-white text-right"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 500,
                            fontSize: "14.4px",
                            lineHeight: 1.56,
                            letterSpacing: "-0.18px",
                            width: "100%",
                            maxWidth: "284px",
                        }}
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkillCard;
