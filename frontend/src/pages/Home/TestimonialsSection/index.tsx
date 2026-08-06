import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import TestimonialCard, { type TestimonialData } from "./TestimonialCard";
import { testimonialsService } from "../../../services/testimonials.service";

import estherAvatar from "../../../assets/testimonials/esther.png";
import cameronAvatar from "../../../assets/testimonials/cameron.png";
import savannahAvatar from "../../../assets/testimonials/savannah.png";

// Fallback testimonials (Includes both text & image reviews for rich demonstration)
const FALLBACK_TESTIMONIALS: TestimonialData[] = [
    {
        _id: "fb-1",
        type: "text",
        personName: "Cameron Williamson",
        companyName: "المدير التنفيذي - GIGL",
        quote:
            "عمل ممتاز ومتقن جداً في تحريك التصاميم والمؤثرات البصرية. تم إنجاز العمل بسرعة فائقة وجودة استثنائية تفوق التوقعات!",
        image: cameronAvatar,
    },
    {
        _id: "fb-2",
        type: "image",
        personName: "سارة الشمري",
        companyName: "متجر ريادة الإلكتروني",
        reviewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        quote: "تقييم العميل ورأيه عبر المحادثة المباشرة",
        image: estherAvatar,
    },
    {
        _id: "fb-3",
        type: "text",
        personName: "Savannah Nguyen",
        companyName: "مؤسسة الابتكار التقني",
        quote:
            "مصممة مبدعة ومحترفة للغاية، تفهم متطلبات واجهات المستخدم UX/UI بدقة وتنفذها بأعلى معايير الدقة والجمال.",
        image: savannahAvatar,
    },
    {
        _id: "fb-4",
        type: "text",
        personName: "Esther Howard",
        companyName: "شركة الرؤية المستقبلية",
        quote:
            "التعامل راقي جداً والالتزام بالمواعيد ممتاز. تم تطوير الموقع بشكل احترافي ومتوافق مع جميع الشاشات.",
        image: estherAvatar,
    },
];

/**
 * TestimonialsSection — Stacked Cards Redesign inspired by Zid Login Showcase.
 * Interactive 3D Stack Layering with Text and Image Reviews support.
 */
const TestimonialsSection: React.FC = () => {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>(FALLBACK_TESTIMONIALS);
    const [active, setActive] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Fetch testimonials from API with fallback
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await testimonialsService.getAll(1, 20);
                if (response && response.data && response.data.length > 0) {
                    setTestimonials(response.data);
                }
            } catch (err) {
                // Keep fallback data if API is offline
                console.log("Using default testimonials dataset");
            }
        };
        fetchTestimonials();
    }, []);

    const count = testimonials.length;

    // Auto rotate stack every 5 seconds (paused on hover or modal open)
    useEffect(() => {
        if (isHovered || previewImage || count <= 1) return;
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % count);
        }, 5000);
        return () => clearInterval(timer);
    }, [count, isHovered, previewImage]);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % count);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + count) % count);
    };

    return (
        <section
            id="testimonials"
            className="scroll-section relative min-h-screen w-full bg-[#040209] flex flex-col items-center justify-center overflow-hidden py-24 px-4"
        >
            {/* Background Ambient Glows (Zid Style Purple & Violet Flares) */}
            <div
                className="absolute pointer-events-none rounded-full blur-[140px] opacity-40"
                style={{
                    width: "800px",
                    height: "500px",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "radial-gradient(ellipse at center, rgba(168,85,247,0.5) 0%, rgba(91,33,182,0.3) 50%, transparent 80%)",
                }}
            />
            <div
                className="absolute pointer-events-none rounded-full blur-[160px] opacity-25"
                style={{
                    width: "600px",
                    height: "400px",
                    bottom: "5%",
                    right: "-100px",
                    background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-12">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-purple-500/10 border border-purple-500/30 text-purple-300 backdrop-blur-lg">
                        ✨ ماذا يقول عملاؤنا
                    </span>
                    <h2
                        className="text-white text-center font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl drop-shadow-md"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                        }}
                    >
                        آراء العمــــلاء
                    </h2>
                    <div className="w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                </div>

                {/* Main Interactive Stack Container */}
                <div
                    className="relative w-full max-w-xl mx-auto flex items-center justify-center pt-8 pb-12 min-h-[460px]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {testimonials.map((testimonial, i) => {
                        // Calculate stack index relative to active (0 = front active card, 1 = behind 1, 2 = behind 2)
                        let stackIndex = (i - active + count) % count;

                        // Only display top 3 cards in stack
                        const isVisible = stackIndex < 3;
                        if (!isVisible) return null;

                        // Card Depth Styles based on stackIndex
                        // stackIndex 0 (Front): scale 1, translateY 0, opacity 1, zIndex 30
                        // stackIndex 1 (Middle): scale 0.93, translateY -32px, opacity 0.75, zIndex 20
                        // stackIndex 2 (Back): scale 0.86, translateY -64px, opacity 0.45, zIndex 10
                        const translateY = -stackIndex * 32;
                        const scale = 1 - stackIndex * 0.07;
                        const opacity = stackIndex === 0 ? 1 : stackIndex === 1 ? 0.75 : 0.45;
                        const zIndex = 30 - stackIndex * 10;
                        const isFront = stackIndex === 0;

                        return (
                            <div
                                key={testimonial._id || testimonial.id || i}
                                onClick={() => !isFront && setActive(i)}
                                className={`absolute left-0 right-0 mx-auto transition-all duration-500 cubic-bezier(0.25, 0.8, 0.25, 1) ${
                                    isFront ? "cursor-default" : "cursor-pointer hover:opacity-90"
                                }`}
                                style={{
                                    transform: `translateY(${translateY}px) scale(${scale})`,
                                    opacity: opacity,
                                    zIndex: zIndex,
                                    maxWidth: "540px",
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonial}
                                    active={isFront}
                                    onOpenImageModal={(url) => setPreviewImage(url)}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Controls & Navigation (Zid Style Pill Dash Indicators + Arrow Buttons) */}
                <div className="relative z-20 flex items-center justify-between w-full max-w-xs sm:max-w-sm mt-4">
                    {/* Previous Button */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="الرأي السابق"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-purple-500/20 bg-purple-950/40 text-purple-200 hover:text-white hover:bg-purple-600/30 hover:border-purple-400/50 transition-all duration-300 flex items-center justify-center backdrop-blur-md shadow-lg"
                    >
                        <FiChevronRight className="text-xl sm:text-2xl" />
                    </button>

                    {/* Dash Indicators (Zid Login Style) */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/30 border border-purple-500/15 backdrop-blur-md">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setActive(idx)}
                                aria-label={`الانتقال إلى الرأي ${idx + 1}`}
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    idx === active
                                        ? "w-8 sm:w-10 bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.9)]"
                                        : "w-2 bg-purple-500/30 hover:bg-purple-400/50"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label="الرأي التالي"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-purple-500/20 bg-purple-950/40 text-purple-200 hover:text-white hover:bg-purple-600/30 hover:border-purple-400/50 transition-all duration-300 flex items-center justify-center backdrop-blur-md shadow-lg"
                    >
                        <FiChevronLeft className="text-xl sm:text-2xl" />
                    </button>
                </div>
            </div>

            {/* Lightbox Preview Modal for Image Testimonials */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 transition-all duration-300"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative max-w-4xl max-h-[90vh] bg-[#120824] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-4 flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-purple-950/80 border border-purple-400/40 text-white flex items-center justify-center hover:bg-purple-600 transition-colors"
                        >
                            <FiX className="text-xl" />
                        </button>
                        <img
                            src={previewImage}
                            alt="معاينة صورة الرأي"
                            className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default TestimonialsSection;
