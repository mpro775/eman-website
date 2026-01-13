import React from "react";
import { motion, type MotionStyle } from "framer-motion";
import SkillCard from "./SkillCard";
import { useMediaQuery } from "../../../hooks";

// Image imports
import uxUiDesignerImage from "../../../assets/personas/UxUiDesginer.png";
import appDeveloperImage from "../../../assets/personas/appDeveloper.png";
import graphicDesignerImage from "../../../assets/personas/GraphicDesginer.png";
import frameButtonPng from "../../../assets/logos/Frame_button.png";

interface AboutViewProps {
    aboutElementsVariants: {
        visible: { opacity: number; x: number };
        hidden: { opacity: number; x: number };
    };
}

// بيانات المهارات
const skillsData = [
    {
        id: 1,
        icon: uxUiDesignerImage,
        title: "UX/UI Designer",
        description: "تصميم تجربة المستخدم وواجهات الاستخدام للتطبيقات والمواقع بدءاً من دراسة المستخدم وتحليل الاحتياجات، وصولاً إلى تصميم واجهات واضحة، سهلة، وقابلة للتنفيذ.",
        position: { top: "300px", left: "0%" },
        delay: 0.2,
    },
    {
        id: 2,
        icon: graphicDesignerImage,
        title: "Graphic Designer",
        description: "تصميم الجرافيكس والمواد البصرية المختلفة، بما في ذلك الهوية البصرية، تصاميم السوشيال ميديا والمحتوى المرئي الذي يوضح الفكرة ويعزز العلامة.",
        position: { top: "300px", right: "0%" },
        delay: 0.4,
    },
    {
        id: 3,
        icon: uxUiDesignerImage,
        title: "Automation",
        description: "أتمتة العمليات الرقمية لتسهيل العمل، تحسين سير المهام، وربط الأدوات والأنظمة لزيادة الكفاءة وتقليل الوقت والجهد.",
        position: { top: "440px", left: "20%" },
        delay: 0.6,
    },
    {
        id: 4,
        icon: appDeveloperImage,
        title: "App Developer",
        description: "تصميم وتحليل وتطوير تطبيقات الموبايل بدءاً من الفكرة والتخطيط وصولاً إلى تطبيق جاهز للاستخدام.",
        position: { top: "440px", right: "20%" },
        delay: 0.8,
    },
    {
        id: 5,
        icon: uxUiDesignerImage,
        title: "UX/UI Designer",
        description: "تصميم تجربة المستخدم وواجهات الاستخدام للتطبيقات والمواقع بدءاً من دراسة المستخدم وتحليل الاحتياجات، وصولاً إلى تصميم واجهات واضحة، سهلة، وقابلة للتنفيذ.",
        position: { bottom: "50px", left: "39%", transform: "translateX(-50%)" } as React.CSSProperties,
        delay: 1.0,
    },
];

/**
 * Skills view content - displays the "مهاراتي" (My Skills) section
 * Includes: Section title, skill cards with animations
 * Supports RTL for Arabic content
 */
const AboutView: React.FC<AboutViewProps> = ({ aboutElementsVariants }) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");

    return (
        <div className={isMobile ? "relative w-full h-full flex flex-col items-center pt-20 pb-10 gap-6 overflow-y-auto" : ""}>
            {/* Section title "مهاراتي" */}
            <motion.div
                className={isMobile ? "relative mb-8 text-center z-20" : "absolute right-[50px] top-[50px] z-20"}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={aboutElementsVariants}
                transition={{ duration: 0.5 }}
            >
                <div className="relative inline-block" style={{ direction: "rtl" }}>
                    <h2
                        className="text-white font-arabic font-bold pb-2"
                        style={{
                            fontSize: isMobile ? "36px" : "48px",
                            fontWeight: 700,
                            letterSpacing: "0.02em",
                        }}
                    >
                        مهاراتي
                    </h2>
                    <span className="absolute bottom-1 right-0 w-16 h-1 bg-gradient-to-l from-[var(--color-accent-purple)] to-transparent rounded-full"></span>
                </div>
            </motion.div>

            {/* Name badge - Liquid Glass button style */}
            <motion.div
                className={isMobile ? "relative mb-4 z-[30] order-first" : "absolute z-[30]"}
                style={isMobile ? {} : {
                    top: "468.51px",
                    left: "636.43px"
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                {/* Button using PNG image */}
                <div className="relative flex items-center justify-center cursor-pointer transition-all hover:scale-105">
                    {/* Button Image Background */}
                    <img
                        src={frameButtonPng}
                        alt=""
                        style={{
                            width: "180px",
                            height: "45px",
                        }}
                    />

                    {/* Name text - positioned on top of image */}
                    <h1
                        className="absolute text-white text-right"
                        style={{
                            fontFamily: "'Urbanist', sans-serif",
                            fontWeight: 600,
                            fontSize: "23.23px",
                            lineHeight: "100%",
                            letterSpacing: "-0.015em",
                            direction: "rtl",
                        }}
                    >
                        إيمــان جمـيــــل
                    </h1>
                </div>
            </motion.div>

            {/* Skill Cards */}
            {skillsData.map((skill) => (
                <SkillCard
                    key={skill.id}
                    icon={skill.icon}
                    title={skill.title}
                    description={skill.description}
                    position={isMobile ? { position: "relative", transform: "none", left: "auto", top: "auto", right: "auto", bottom: "auto", marginTop: "10px", margin: "0 auto", width: "90%", maxWidth: "340px" } as MotionStyle : skill.position as MotionStyle}
                    delay={skill.delay}
                />
            ))}
        </div>
    );
};

export default AboutView;
