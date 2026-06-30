import React from "react";

export interface Testimonial {
    id: number;
    name: string;
    /** Role line, e.g. "Chief Executive Officer of" */
    position: string;
    /** Company (bold, white) appended after the role */
    company: string;
    quote: string;
    avatar: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    /** Center (active) card is taller, brighter and shows the avatar ring. */
    active: boolean;
}

/**
 * Testimonial card — pixel-matched to Figma 820:1783 (cards 820:1784 / 820:1796).
 * A translucent rounded card with a circular avatar overlapping the top edge,
 * a centered quote (Sora), then the person's name and role.
 * Active (center) card: h358, bg rgba(42,51,80,0.3) + shadow.
 * Side cards: h302, bg rgba(19,34,56,0.2).
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, active }) => {
    return (
        <div
            className="relative w-full rounded-[16px]"
            style={{
                height: active ? "358px" : "302px",
                background: active ? "rgba(42,51,80,0.3)" : "rgba(19,34,56,0.2)",
                boxShadow: active ? "0px 40px 64px 0px rgba(19,34,56,0.08)" : "none",
                transition: "height 0.5s cubic-bezier(0.25,0.46,0.45,0.94), background 0.5s ease",
            }}
        >
            {/* Avatar — 100px, overlapping the top edge (-50px) */}
            <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
                style={{
                    width: "100px",
                    height: "100px",
                    top: "-50px",
                    boxShadow: active
                        ? "0px 0px 24px 0px rgba(187,161,254,0.45), 0px 0px 0px 1px rgba(255,255,255,0.15)"
                        : "none",
                }}
            >
                <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Quote */}
            <p
                className="absolute left-1/2 -translate-x-1/2 text-center text-white px-6"
                style={{
                    top: "90px",
                    maxWidth: "568px",
                    width: "100%",
                    fontFamily: '"Sora", sans-serif',
                    fontWeight: 300,
                    fontSize: "clamp(16px, 1.4vw, 20px)",
                    lineHeight: "28px",
                }}
            >
                {testimonial.quote}
            </p>

            {/* Name + role */}
            <div
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-center w-full px-6"
                style={{ bottom: "34px" }}
            >
                <p
                    className="text-white"
                    style={{
                        fontFamily: '"Sora", sans-serif',
                        fontWeight: 400,
                        fontSize: "20px",
                        lineHeight: "28px",
                    }}
                >
                    {testimonial.name}
                </p>
                <p
                    style={{
                        fontFamily: '"Sora", sans-serif',
                        fontWeight: 300,
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#697484",
                    }}
                >
                    {testimonial.position}{" "}
                    <span className="text-white" style={{ fontWeight: 400 }}>
                        {testimonial.company}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default TestimonialCard;
