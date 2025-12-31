import React from "react";
import { motion } from "framer-motion";
import SkillCard from "./SkillCard";
import { useMediaQuery } from "../../../hooks";

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

// بيانات المهارات
const skillsData = [
    {
        id: 1,
        icon: uxUiDesignerImage,
        title: "UX/UI Designer",
        description: "تصميم تجربة المستخدم وواجهات الاستخدام للتطبيقات والمواقع بدءاً من دراسة المستخدم وتحليل الاحتياجات، وصولاً إلى تصميم واجهات واضحة، سهلة، وقابلة للتنفيذ.",
        position: { top: "120px", left: "80px" },
        delay: 0.2,
    },
    {
        id: 2,
        icon: graphicDesignerImage,
        title: "Graphic Designer",
        description: "تصميم الجرافيكس والمواد البصرية المختلفة، بما في ذلك الهوية البصرية، تصاميم السوشيال ميديا والمحتوى المرئي الذي يوضح الفكرة ويعزز العلامة.",
        position: { top: "120px", right: "80px" },
        delay: 0.4,
    },
    {
        id: 3,
        icon: uxUiDesignerImage,
        title: "Automation",
        description: "أتمتة العمليات الرقمية لتسهيل العمل، تحسين سير المهام، وربط الأدوات والأنظمة لزيادة الكفاءة وتقليل الوقت والجهد.",
        position: { top: "320px", left: "60px" },
        delay: 0.6,
    },
    {
        id: 4,
        icon: appDeveloperImage,
        title: "App Developer",
        description: "تصميم وتحليل وتطوير تطبيقات الموبايل بدءاً من الفكرة والتخطيط وصولاً إلى تطبيق جاهز للاستخدام.",
        position: { top: "380px", right: "100px" },
        delay: 0.8,
    },
    {
        id: 5,
        icon: uxUiDesignerImage,
        title: "UX/UI Designer",
        description: "تصميم تجربة المستخدم وواجهات الاستخدام للتطبيقات والمواقع بدءاً من دراسة المستخدم وتحليل الاحتياجات، وصولاً إلى تصميم واجهات واضحة، سهلة، وقابلة للتنفيذ.",
        position: { bottom: "120px", left: "50%", transform: "translateX(-50%)" } as React.CSSProperties,
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

            {/* Name badge near the image - Hide on small mobile if blocking, or adjust position */}
            <motion.div
                className={isMobile ? "relative mb-4 z-[26] order-first" : "absolute z-[26]"}
                style={isMobile ? {} : { left: "42%", top: "45%" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <div
                    className="text-center"
                    style={{ direction: "rtl" }}
                >
                    <h1
                        className="font-arabic font-bold text-white"
                        style={{
                            fontSize: isMobile ? "32px" : "42px",
                            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        }}
                    >
                        إيــمان جميــل
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
                    position={isMobile ? { position: "relative", transform: "none", left: "auto", top: "auto", right: "auto", bottom: "auto", marginTop: "10px", margin: "0 auto", width: "90%", maxWidth: "340px" } : skill.position}
                    delay={skill.delay}
                />
            ))}
        </div>
    );
};

export default AboutView;
