import React from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { FiMaximize2 } from "react-icons/fi";
import { resolveImageUrl } from "../../../utils/imageUrl";

export interface TestimonialData {
    _id?: string;
    id?: number | string;
    type?: "text" | "image";
    reviewImage?: string;
    image?: string;
    personName: string;
    companyName: string;
    position?: string;
    quote?: string;
    ratingText?: string;
    avatar?: string;
}

interface TestimonialCardProps {
    testimonial: TestimonialData;
    active: boolean;
    onOpenImageModal?: (imageUrl: string) => void;
}

/**
 * TestimonialCard Component — Zid Stacked Glassmorphism Style
 * Supports both Text reviews and Image (Screenshot) reviews.
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
    testimonial,
    active,
    onOpenImageModal,
}) => {
    const isImageTestimonial = testimonial.type === "image" && !!testimonial.reviewImage;
    const reviewImgUrl = testimonial.reviewImage ? resolveImageUrl(testimonial.reviewImage) : "";
    const quoteText = testimonial.quote || testimonial.ratingText || "";
    const personName = testimonial.personName || "عميل مميز";
    const companyName = testimonial.companyName || testimonial.position || "";

    return (
        <div
            data-no-splash="true"
            className={`relative w-full rounded-3xl p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between overflow-hidden border backdrop-blur-2xl select-none ${
                active
                    ? "border-purple-400/30 bg-gradient-to-b from-[#24133d]/90 via-[#180c2e]/95 to-[#0f071f]/95 shadow-[0_20px_50px_rgba(139,92,246,0.25)]"
                    : "border-purple-900/20 bg-[#120824]/70 shadow-lg"
            }`}
            style={{
                minHeight: isImageTestimonial ? "420px" : "360px",
            }}
        >
            {/* Ambient inner card purple light glow */}
            <div
                className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-32 pointer-events-none rounded-full blur-3xl opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(192,132,252,0.8) 0%, rgba(139,92,246,0) 70%)",
                }}
            />

            {/* Top Row: Star Ratings & Type Badge */}
            <div className="relative z-10 flex items-center justify-between w-full mb-4">
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-amber-400 text-sm sm:text-base drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 border border-purple-400/20 text-purple-300 backdrop-blur-md">
                        {isImageTestimonial ? "🖼️ رأي مصور" : "💬 رأي عميل"}
                    </span>
                </div>
            </div>

            {/* Middle Section: Image Review OR Text Quote */}
            <div className="relative z-10 flex-1 flex flex-col justify-center my-2">
                {isImageTestimonial ? (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenImageModal && reviewImgUrl) {
                                onOpenImageModal(reviewImgUrl);
                            }
                        }}
                        className="relative group rounded-2xl overflow-hidden border border-purple-500/20 bg-[#0a0414] cursor-pointer max-h-56 sm:max-h-64 flex items-center justify-center shadow-inner"
                    >
                        <img
                            src={reviewImgUrl}
                            alt={`رأي ${personName}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        {/* Hover Overlay with Zoom Icon */}
                        <div className="absolute inset-0 bg-purple-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-sm">
                            <FiMaximize2 className="text-xl text-purple-300 animate-pulse" />
                            <span>تكبير المعاينة</span>
                        </div>
                    </div>
                ) : (
                    <div className="relative text-center px-2 sm:px-4">
                        <FaQuoteRight className="text-purple-400/25 text-3xl sm:text-4xl mx-auto mb-2" />
                        <p
                            className="text-gray-100 font-normal leading-relaxed text-sm sm:text-base md:text-lg line-clamp-4 sm:line-clamp-5"
                            style={{
                                fontFamily: '"Thmanyah Sans", "Tajawal", "Sora", sans-serif',
                            }}
                        >
                            "{quoteText}"
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom Row: Client Details (No Avatar) */}
            <div className="relative z-10 flex flex-col items-center text-center pt-4 mt-2 border-t border-purple-500/15">
                <h3 className="text-white font-bold text-sm sm:text-base truncate drop-shadow-sm">
                    {personName}
                </h3>
                <p className="text-purple-300/70 text-xs sm:text-sm font-medium truncate mt-0.5">
                    {companyName}
                </p>
            </div>
        </div>
    );
};

export default TestimonialCard;
