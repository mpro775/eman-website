import React from "react";
import { motion } from "framer-motion";
import FloatingSkillCard from "./FloatingSkillCard";

// Image imports
import uxUiDesignerImage from "../../../assets/images/UxUiDesginer.png";
import appDeveloperImage from "../../../assets/images/appDeveloper.png";
import graphicDesignerImage from "../../../assets/images/GraphicDesginer.png";

interface AboutViewProps {
    aboutElementsVariants: {
        visible: { opacity: number; x: number };
        hidden: { opacity: number; x: number };
    };
}

/**
 * About view content - displays the "من أنا" (Who Am I) section
 * Includes: Section title, info card, floating skill cards
 */
const AboutView: React.FC<AboutViewProps> = ({ aboutElementsVariants }) => {
    return (
        <>
            {/* Section title "من أنا" */}
            <motion.div
                className="absolute right-[50px] top-[100px] z-20"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={aboutElementsVariants}
                transition={{ duration: 0.5 }}
            >
                <div className="relative inline-block">
                    <h2 className="text-2xl md:text-3xl text-white font-arabic font-bold pb-2 pl-4">
                        مـــن أنا
                    </h2>
                    <span className="absolute bottom-1 right-0 w-12 h-1 bg-gradient-to-l from-[var(--color-accent-purple)] to-transparent rounded-full"></span>
                </div>
            </motion.div>

            {/* Transparent box with content */}
            <motion.div
                className="absolute right-[50px] top-[150px] z-20 w-[50%]"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={aboutElementsVariants}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="relative rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-10 lg:p-12 overflow-hidden group hover:border-white/20 transition-colors duration-500">
                    {/* Light glow effect */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--color-accent-pink)] opacity-[0.08] blur-[80px] rounded-full pointer-events-none" />

                    {/* Arabic name */}
                    <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-arabic font-bold text-[var(--color-accent-pink)] mb-0 leading-tight drop-shadow-lg">
                        إيمان جميل
                    </h1>

                    {/* Job title */}
                    <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-english font-medium text-white mb-8 tracking-wide leading-tight">
                        UX/UI Designer
                    </h2>

                    {/* Description text */}
                    <p className="text-[var(--color-text-secondary)] font-arabic text-lg md:text-xl leading-relaxed mb-10 max-w-xl text-justify opacity-90 font-light">
                        أؤمـــن بأن جوهـــر التصميم يكمـــن في الإحساس، لذا أعمل على تصميم
                        تجارب رقمية واعية، وبناء واجهات مستـــخدم تعكس هويــة العلامة
                        التجاريــة بدقـــة وتـــوازن بين الجمال والوضوح.
                    </p>
                </div>
            </motion.div>

            {/* Floating Skill Cards */}
            <FloatingSkillCard
                icon={uxUiDesignerImage}
                label="UX/UI Designer"
                className="left-[35%] top-[60%]"
                delay={0.4}
            />
            <FloatingSkillCard
                icon={appDeveloperImage}
                label="App Developer"
                className="left-[10%] top-[70%]"
                delay={0.7}
            />
            <FloatingSkillCard
                icon={graphicDesignerImage}
                label="Graphic Designer"
                className="left-[33%] bottom-[12%]"
                delay={1.0}
            />
        </>
    );
};

export default AboutView;
