import React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Container, SectionTitle } from "../../../components";
import ExperienceCard, { type ExperienceItem } from "./ExperienceCard";

// Experience data
const experiences: ExperienceItem[] = [
    { id: 1, title: "UX/UI", description: "في محفظة جيب" },
    { id: 2, title: "أستاذ مساعد", description: "في جامعة العلوم الحديثة" },
    { id: 3, title: "أستاذة UX/UI", description: "في أكاديمية سمارت ديف" },
    { id: 4, title: "Graphic Designer", description: "في وكالة حريف" },
    { id: 5, title: "UX/UI & Graphic Designer", description: "أعمال حرة" },
    { id: 6, title: "دعم فني", description: "في مجموعة هائل سعيد أنعم" },
    { id: 7, title: "Flutter App", description: "مشروع تخرج في جامعة العلوم الحديثة" },
    { id: 8, title: "سكرتارية + أمين صندوق", description: "في مركز يونك للأنظمة المحاسبية" },
];

/**
 * Experience section with timeline layout
 * Shows work experience in a two-column layout with connecting lines
 */
const ExperienceSection: React.FC = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: true });

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
    const rightColumnExperiences = experiences.slice(0, 4);
    const leftColumnExperiences = experiences.slice(4, 8);

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

                    {/* Experience Grid */}
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
                </motion.div>
            </Container>
        </section>
    );
};

export default ExperienceSection;
