import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Container, SectionTitle } from "../../../components";
import WorkCard, { type WorkItem } from "./WorkCard";

// Images
import mobileAppImage from "../../../assets/services/mobileApp.png";
import uiUxImage from "../../../assets/illustrations/UI UX.png";
import graphicImage from "../../../assets/illustrations/Graphic.png";

// Works data
const works: WorkItem[] = [
    { id: 1, title: "Mobile App Design", image: mobileAppImage, slug: "mobile" },
    { id: 2, title: "UX/UI Design", image: uiUxImage, slug: "ux-ui" },
    { id: 3, title: "Graphic design", image: graphicImage, slug: "graphic" },
];

/**
 * Works/Portfolio section with carousel slider
 */
const WorksSection: React.FC = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: true });
    const [activeIndex, setActiveIndex] = useState(1);
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
        },
    };

    const handleCardClick = (index: number, slug: string) => {
        if (index === activeIndex) {
            navigate(`/portfolio/${slug}`);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <section
            id="portfolio"
            ref={ref}
            className="scroll-section relative min-h-screen w-full bg-gradient-to-b from-[#1a0e2e] via-[#0f0a1a] to-[#0a0a0f] flex items-center justify-center pt-[100px] pb-20"
        >
            {/* Background effect */}
            <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-accent-purple/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="w-full relative z-10"
                >
                    {/* Section Title */}
                    <SectionTitle title="أعمالي" maxWidth="200px" variants={itemVariants} />

                    {/* Carousel */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-12">
                        <div className="relative w-full max-w-7xl mx-auto px-4 overflow-visible">
                            <div className="relative flex items-center justify-center h-[500px] md:h-[600px]">
                                {works.map((work, index) => (
                                    <WorkCard
                                        key={work.id}
                                        work={work}
                                        index={index}
                                        activeIndex={activeIndex}
                                        onClick={() => handleCardClick(index, work.slug)}
                                    />
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={() => setActiveIndex((prev) => (prev + 1) % works.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-accent-purple/20 hover:bg-accent-purple/40 backdrop-blur-md border border-accent-purple/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                                aria-label="Next slide"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setActiveIndex((prev) => (prev - 1 + works.length) % works.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-accent-purple/20 hover:bg-accent-purple/40 backdrop-blur-md border border-accent-purple/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                                aria-label="Previous slide"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex items-center justify-center gap-2.5 md:gap-3">
                            {works.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`transition-all duration-300 rounded-full ${index === activeIndex
                                        ? "w-10 md:w-12 h-1.5 md:h-2 bg-accent-pink"
                                        : "w-6 md:w-8 h-1.5 md:h-2 bg-white/40 hover:bg-white/60"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
};

export default WorksSection;
