import React, { useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Container, SectionTitle } from "../../../components";
import ExperienceCard, { type ExperienceItem } from "./ExperienceCard";
import { experiencesService } from "../../../services/experiences.service";

/**
 * Experience section with timeline layout
 * Shows work experience in a two-column layout with connecting lines
 */
const ExperienceSection: React.FC = () => {
    const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: true });

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                setLoading(true);
                const data = await experiencesService.getAll();
                const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
                const mapped = sorted.map((exp, index) => ({
                    id: index + 1,
                    title: exp.name,
                    description: exp.description
                }));
                setExperiences(mapped);
            } catch (error) {
                console.error("Failed to fetch experiences:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    // Split experiences into two columns
    const half = Math.ceil(experiences.length / 2);
    const rightColumnExperiences = experiences.slice(0, half);
    const leftColumnExperiences = experiences.slice(half);

    return (
        <section
            id="experience"
            ref={ref}
            className="scroll-section relative min-h-screen w-full bg-gradient-to-b from-[#1a0e2e] via-[#0f0a1a] to-[#0a0a0f] flex items-center justify-center pt-[100px] pb-20 overflow-hidden"
        >
            {/* Bottom-Left Blur Glow Effect */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "- 466px",
                    left: "-466px",
                    transform: "rotate(121.23deg)",
                    background: "linear-gradient(177.25deg, rgba(187, 161, 254, 0.8) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)",
                    filter: "blur(488px)",
                    borderRadius: "50%",
                }}
            ></div>

            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="w-full"
                >
                    {/* Section Title */}
                    <SectionTitle title="الخبـــرات العملية" maxWidth="400px" variants={itemVariants} />

                    {/* Experience Grid / Loading Fallback */}
                    {loading ? (
                        <div className="text-center py-20 col-span-full">
                            <div className="w-10 h-10 border-4 border-accent-pink/20 border-t-accent-pink rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-text-secondary text-base">جاري تحميل الخبرات...</p>
                        </div>
                    ) : experiences.length === 0 ? (
                        <div className="text-center py-20 col-span-full">
                            <p className="text-text-secondary text-base">لا توجد خبرات عملية مضافة حالياً</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 relative">
                            {/* Right Column (1-4) */}
                            <div className="flex flex-col gap-8 relative">
                                <div className="absolute right-[-40px] lg:right-[-60px] top-0 bottom-0 w-0.5 bg-accent-purple hidden lg:block"></div>
                                {rightColumnExperiences.map((experience) => (
                                    <ExperienceCard
                                        key={experience.id}
                                        experience={experience}
                                        variants={itemVariants}
                                        isRightColumn={true}
                                    />
                                ))}
                            </div>

                            {/* Left Column (5-8) */}
                            <div className="flex flex-col gap-8 relative mt-8 lg:mt-0">
                                <div className="absolute left-[-40px] lg:left-[-60px] top-0 bottom-0 w-0.5 bg-accent-purple hidden lg:block"></div>
                                {leftColumnExperiences.map((experience) => (
                                    <ExperienceCard
                                        key={experience.id}
                                        experience={experience}
                                        variants={itemVariants}
                                        isRightColumn={false}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </Container>
        </section>
    );
};

export default ExperienceSection;
