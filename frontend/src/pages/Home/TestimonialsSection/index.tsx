import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Container, SectionTitle } from "../../../components";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";

// Testimonial data
const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Fletcher Howard",
        position: "Chief Executive Officer",
        company: "GIGL",
        quote: "A great worker. He thinks about design and has a awesome working morale",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        name: "Cameron Williamson",
        position: "Chief Executive Officer",
        company: "GIGL",
        quote: '"Kevin Did a wonderful job animating set of static stickers. Work was done very quickly and the quality is outstanding. she managed to create great looking, flawless animation even with very limited number of frames allowed per stickers"',
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
        id: 3,
        name: "Savannah Nguyen",
        position: "Chief Executive Officer",
        company: "GIGL",
        quote: "Great Designer, does great work and is open to change. if you're a programmer and looking for a designer is definitely well qualified.",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
];

/**
 * Testimonials section with auto-rotating carousel
 */
const TestimonialsSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(1);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getCardStyle = (index: number) => {
        const diff = index - activeIndex;
        const normalizedDiff =
            diff > testimonials.length / 2
                ? diff - testimonials.length
                : diff < -testimonials.length / 2
                    ? diff + testimonials.length
                    : diff;

        if (normalizedDiff === 0) {
            return { x: 0, scale: 1, opacity: 1, zIndex: 10 };
        } else if (normalizedDiff === -1 || normalizedDiff === testimonials.length - 1) {
            return { x: -320, scale: 0.85, opacity: 0.6, zIndex: 5 };
        } else if (normalizedDiff === 1 || normalizedDiff === -(testimonials.length - 1)) {
            return { x: 320, scale: 0.85, opacity: 0.6, zIndex: 5 };
        } else {
            return { x: normalizedDiff > 0 ? 600 : -600, scale: 0.7, opacity: 0, zIndex: 1 };
        }
    };

    return (
        <section
            id="testimonials"
            className="scroll-section relative min-h-screen w-full bg-bg-primary overflow-hidden flex items-center justify-center py-20"
        >
            {/* Background gradient effects */}
            <div className="absolute top-0 left-0 w-[40%] h-[60%] bg-accent-purple/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
            <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-accent-pink/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <Container>
                {/* Section Title */}
                <SectionTitle title="آراء العملاء" maxWidth="280px" />

                {/* Testimonials Carousel */}
                <div className="relative w-full flex justify-center items-center min-h-[400px]">
                    <div className="relative w-full max-w-[400px] h-[350px]">
                        <AnimatePresence mode="popLayout">
                            {testimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                    index={index}
                                    activeIndex={activeIndex}
                                    cardStyle={getCardStyle(index)}
                                    onClick={() => setActiveIndex(index)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                ? "bg-accent-pink w-6"
                                : "bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TestimonialsSection;
