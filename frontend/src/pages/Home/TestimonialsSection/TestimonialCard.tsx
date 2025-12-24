import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
    id: number;
    name: string;
    position: string;
    company: string;
    quote: string;
    avatar: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    index: number;
    activeIndex: number;
    cardStyle: {
        x: number;
        scale: number;
        opacity: number;
        zIndex: number;
    };
    onClick: () => void;
}

/**
 * Individual testimonial card component
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
    testimonial,
    index,
    activeIndex,
    cardStyle,
    onClick,
}) => {
    return (
        <motion.div
            className="absolute top-0 left-1/2 w-[300px] md:w-[350px] cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                x: cardStyle.x - 175,
                scale: cardStyle.scale,
                opacity: cardStyle.opacity,
                zIndex: cardStyle.zIndex,
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut" as const,
            }}
            onClick={onClick}
        >
            <div
                className={`relative bg-[#1a1a2e]/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 border transition-all duration-300 ${index === activeIndex
                        ? "border-white/20 shadow-2xl"
                        : "border-white/10"
                    }`}
            >
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div
                            className={`absolute inset-0 rounded-full transition-opacity duration-300 ${index === activeIndex
                                    ? "bg-gradient-to-r from-cyan-400 to-cyan-600 blur-md opacity-60"
                                    : "opacity-0"
                                }`}
                        ></div>
                        <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 transition-all duration-300 ${index === activeIndex ? "border-cyan-400" : "border-white/30"
                                }`}
                        />
                    </div>
                </div>

                {/* Quote */}
                <p className="text-text-secondary text-sm md:text-base leading-relaxed text-center mb-6 line-clamp-5">
                    {testimonial.quote}
                </p>

                {/* Name and Position */}
                <div className="text-center">
                    <h4 className="text-white font-semibold text-base md:text-lg">
                        {testimonial.name}
                    </h4>
                    <p className="text-text-muted text-xs md:text-sm">
                        {testimonial.position} at{" "}
                        <span className="text-accent-pink font-medium">
                            {testimonial.company}
                        </span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default TestimonialCard;
