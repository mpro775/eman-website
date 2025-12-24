import React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Container, SectionTitle } from "../../../components";
import ServiceCard, { type ServiceItem } from "./ServiceCard";

// Assets
import iconDigitalMarketing from "../../../assets/images/digital_Service.png";
import iconGraphicDesign from "../../../assets/images/graghic_Service.png";
import iconUXUI from "../../../assets/images/ui_ux_Service.png";

// Service data
const services: ServiceItem[] = [
    {
        id: 1,
        englishTitle: "Digital Marketing",
        arabicDescription: "إنشاء صفحات السوشل ميديا, وإدارة الحملات الإعلانية، والرد على العملاء",
        icon: iconDigitalMarketing,
    },
    {
        id: 2,
        englishTitle: "Graphic Designs",
        arabicDescription: "تصميم الهوية التجارية المتكاملة ، شعارات . بوسترات إعلانية و بنرات",
        icon: iconGraphicDesign,
    },
    {
        id: 3,
        englishTitle: "UX / UI Design",
        arabicDescription: "تطبيقات الموبايل ، المواقع الإلكترونية ، لوحات التحكم و الإنظمة المتكاملة",
        icon: iconUXUI,
    },
];

/**
 * Services showcase section
 */
const ServicesSection: React.FC = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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

    return (
        <section
            id="services"
            ref={ref}
            className="scroll-section relative min-h-screen w-full bg-gradient-to-b from-[#1a0e2e] via-[#0f0a1a] to-[#0a0a0f] flex items-center justify-center pt-[100px] pb-20 overflow-hidden"
        >
            {/* Bottom-Left Blur Glow Effect */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "466px",
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
                    <SectionTitle title="خدماتي" maxWidth="180px" variants={itemVariants} />

                    {/* Service Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} variants={itemVariants} />
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default ServicesSection;
