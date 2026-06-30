import React, { useState, useEffect } from "react";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";

import estherAvatar from "../../../assets/testimonials/esther.png";
import cameronAvatar from "../../../assets/testimonials/cameron.png";
import savannahAvatar from "../../../assets/testimonials/savannah.png";

// Testimonials text-matched to Figma node 820:1778 ("أراء العملاء").
// Order places Cameron in the centre on first paint (activeIndex = 1).
const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Esther Howard",
        position: "Chief Executive Officer of",
        company: "GIGL",
        quote:
            "“Kevin is very hard and great worker. He thinks about prolem, find solution and has a awesome working morale”",
        avatar: estherAvatar,
    },
    {
        id: 2,
        name: "Cameron Williamson",
        position: "Chief Executive Officer of",
        company: "GIGL",
        quote:
            "“Kevin Did a wonderful job animating set of static stickers. Work was done very quickly and the quality is outstanding. she managed to create great looking, flawless animation even with very limited number of frames allowed per stickers”",
        avatar: cameronAvatar,
    },
    {
        id: 3,
        name: "Savannah Nguyen",
        position: "Chief Executive Officer of",
        company: "GIGL",
        quote:
            "Great Designer, does great work and is very flexible with change. if you’re a programmer and are looking for UI/UX designer is definitely well qualified for the job.",
        avatar: savannahAvatar,
    },
];

/**
 * Testimonials section ("أراء العملاء") — pixel-matched to Figma node 820:1778.
 * A three-card carousel: the centre card is taller/brighter with a glowing
 * avatar; the two neighbours peek in from the screen edges (lg+), dimmed.
 * Positioning uses CSS transforms + transitions (no rAF) so it keeps animating
 * even while the tab is backgrounded.
 */
const TestimonialsSection: React.FC = () => {
    const [active, setActive] = useState(1);
    const n = TESTIMONIALS.length;

    // Auto-rotate
    useEffect(() => {
        const t = setInterval(() => setActive((p) => (p + 1) % n), 5500);
        return () => clearInterval(t);
    }, [n]);

    // Relative position of card i to the active card, normalised to [-1, 0, 1].
    const relPos = (i: number) => {
        let d = i - active;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        return d;
    };

    return (
        <section
            id="testimonials"
            className="scroll-section relative min-h-screen w-full bg-[#040404] flex items-center justify-center overflow-hidden py-20"
        >
            {/* Purple glow — top-left, rotated (Figma 820:1779) */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "-200px",
                    left: "-360px",
                    transform: "rotate(121.23deg)",
                    background: "linear-gradient(177.25deg, rgba(187,161,254,0.5) 2.26%, rgba(33,13,83,0.65) 97.74%)",
                    filter: "blur(220px)",
                    borderRadius: "50%",
                }}
            />

            <div className="relative z-10 w-full mx-auto flex flex-col items-center" style={{ gap: "64px" }}>
                {/* Title + underline (centered — Figma 829:3625) */}
                <div className="flex flex-col items-center px-6" style={{ gap: "14px" }}>
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
                        أراء العمــــلاء
                    </h2>
                    <div
                        style={{
                            width: "406px",
                            maxWidth: "82vw",
                            height: "3px",
                            borderRadius: "2px",
                            background: "linear-gradient(90deg, rgba(139,92,246,0) 0%, #C084FC 50%, rgba(139,92,246,0) 100%)",
                        }}
                    />
                </div>

                {/* Carousel — center card emphasized, neighbours peek (lg+) */}
                <div className="relative w-full" style={{ height: "410px" }}>
                    {TESTIMONIALS.map((t, i) => {
                        const rel = relPos(i);
                        const isCenter = rel === 0;
                        const offset = rel * 672; // px, Figma spacing
                        const hideClass = isCenter ? "block" : "hidden lg:block";
                        return (
                            <div
                                key={t.id}
                                onClick={() => !isCenter && setActive(i)}
                                className={`${hideClass} absolute bottom-0 left-1/2`}
                                style={{
                                    width: "clamp(300px, 92vw, 648px)",
                                    transform: `translateX(calc(-50% + ${offset}px)) scale(${isCenter ? 1 : 0.93})`,
                                    opacity: isCenter ? 1 : 0.6,
                                    zIndex: isCenter ? 30 : 20,
                                    cursor: isCenter ? "default" : "pointer",
                                    transition:
                                        "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease",
                                }}
                            >
                                <TestimonialCard testimonial={t} active={isCenter} />
                            </div>
                        );
                    })}
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 -mt-4">
                    {TESTIMONIALS.map((t, i) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            className="rounded-full transition-all duration-300"
                            style={{
                                height: "8px",
                                width: i === active ? "24px" : "8px",
                                background: i === active ? "#c67588" : "rgba(255,255,255,0.3)",
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
