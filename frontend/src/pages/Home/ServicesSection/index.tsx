import React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import ServiceCard, { type ServiceItem } from "./ServiceCard";

// Service icons (Figma 820:1553 — cleaned line icons, stroke = currentColor)
import iconDigitalMarketing from "../../../assets/services/digital-marketing.svg";
import iconGraphicDesign from "../../../assets/services/graphic-design.svg";
import iconUXUI from "../../../assets/services/ui-ux.svg";

// Services content — pixel/text-matched to Figma 820:1553. Left → right.
const SERVICES: ServiceItem[] = [
    {
        id: 1,
        arabicTitle: "تسويق إلكتروني",
        englishSubtitle: "Digital Marketing",
        arabicDescription:
            "تخطيط وتنفيذ استراتيجيات تسويق رقمي، إدارة المنصات ، إعداد الحملات الإعلانية وصناعة محتوى يعزز نمو العلامة التجارية.",
        icon: iconDigitalMarketing,
    },
    {
        id: 2,
        arabicTitle: "التصميم الجرافيكي",
        englishSubtitle: "Graphic Design",
        arabicDescription:
            "تصاميـــم إبداعيـــة بصريـــة تعكـس هويـــــة علامتك التجارية وتترك انطباعاً قوياً ودائماً لـــدى جمهــــورك.",
        icon: iconGraphicDesign,
    },
    {
        id: 3,
        arabicTitle: "تصميم واجهات المستخدم",
        englishSubtitle: "UI/UX Design",
        arabicDescription:
            "تصميم تجارب مستخدم مميزة وواجهات جذابة تجمع الجمـــال بالوظيفيـــة لتحقيــق أهـــداف المستخـــدم.",
        icon: iconUXUI,
    },
];

/**
 * Services showcase ("خدماتي") — pixel-matched to Figma node 820:1553.
 * Solid #040404 backdrop with a rotated purple glow (top-left), a right
 * aligned title with underline, and a centered row of three glass cards.
 */
const ServicesSection: React.FC = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <section
            id="services"
            ref={ref}
            className="scroll-section relative min-h-screen w-full bg-[#040404] flex items-center justify-center overflow-hidden py-20"
        >
            {/* Purple glow — top-left, rotated (Figma 820:1554) */}
            <div
                className="absolute pointer-events-none -z-0"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "-66px",
                    left: "-370px",
                    transform: "rotate(-121.23deg) scaleY(-1)",
                    background: "linear-gradient(177.25deg, rgba(187, 161, 254, 0.55) 2.26%, rgba(33, 13, 83, 0.65) 97.74%)",
                    filter: "blur(220px)",
                    borderRadius: "50%",
                }}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative z-10 w-full max-w-[1297px] mx-auto px-6 lg:px-0 flex flex-col items-start"
            >
                {/* Title "خدماتي" + underline — right aligned (Figma 820:1555) */}
                <motion.div variants={itemVariants} className="flex flex-col items-start" style={{ gap: "14px" }}>
                    <h2
                        className="text-white text-right whitespace-nowrap"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 700,
                            fontSize: "clamp(2rem, 5vw, 48px)",
                            lineHeight: 1,
                            letterSpacing: "-0.72px",
                        }}
                    >
                        خدمـــــاتي
                    </h2>
                    <div
                        style={{
                            width: "226.465px",
                            maxWidth: "60vw",
                            height: "3px",
                            borderRadius: "2px",
                            background: "linear-gradient(to left, #C084FC 0%, rgba(139,92,246,0) 100%)",
                        }}
                    />
                </motion.div>

                {/* Cards row — RTL flow: first service on the right */}
                <div
                    dir="rtl"
                    className="mt-12 lg:mt-[110px] w-full flex flex-col lg:flex-row lg:justify-center items-stretch"
                    style={{ gap: "20px" }}
                >
                    {SERVICES.map((service) => (
                        <ServiceCard key={service.id} service={service} variants={itemVariants} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default ServicesSection;
