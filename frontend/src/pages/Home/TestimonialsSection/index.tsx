import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Container, SectionTitle } from "../../../components";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";
import { testimonialsService } from "../../../services/testimonials.service";

/**
 * Testimonials section with auto-rotating carousel
 */
const TestimonialsSection: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await testimonialsService.getAll();
                const items = response.data || [];
                const sorted = items.sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
                const mapped = sorted.map((t, index) => {
                    const parts = t.companyName.split(" - ");
                    return {
                        id: index + 1,
                        name: t.personName,
                        position: parts[0] || "Client",
                        company: parts[1] || "",
                        quote: t.ratingText,
                        avatar: t.image,
                    };
                });
                setTestimonials(mapped);
                if (mapped.length > 0) {
                    setActiveIndex(0);
                }
            } catch (error) {
                console.error("Failed to fetch testimonials:", error);
            }
        };
        fetchTestimonials();
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        if (testimonials.length === 0) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

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
            {/* Bottom-Left Blur Glow Effect */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "-366px",
                    left: "-466px",
                    transform: "rotate(121.23deg)",
                    background: "linear-gradient(177.25deg, rgba(187, 161, 254, 0.8) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)",
                    filter: "blur(488px)",
                    borderRadius: "50%",
                }}
            ></div>

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
