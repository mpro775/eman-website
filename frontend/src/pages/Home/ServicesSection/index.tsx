import React, { useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Container, SectionTitle } from "../../../components";
import ServiceCard, { type ServiceItem } from "./ServiceCard";
import { servicesService } from "../../../services/services.service";

// Assets
import iconDigitalMarketing from "../../../assets/services/digital_Service.png";
import iconGraphicDesign from "../../../assets/services/graghic_Service.png";
import iconUXUI from "../../../assets/services/ui_ux_Service.png";

const iconMap: Record<string, string> = {
    "digital_Service.png": iconDigitalMarketing,
    "graghic_Service.png": iconGraphicDesign,
    "ui_ux_Service.png": iconUXUI,
};

const getIcon = (iconName?: string) => {
    if (!iconName) return iconUXUI;
    if (iconName.startsWith("http")) return iconName;
    return iconMap[iconName] || iconUXUI;
};

/**
 * Services showcase section
 */
const ServicesSection: React.FC = () => {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await servicesService.getAll();
                const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
                const mapped = sorted.map((svc, index) => ({
                    id: index + 1,
                    englishTitle: svc.name,
                    arabicDescription: svc.description,
                    icon: getIcon(svc.icon),
                }));
                setServices(mapped);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };
        fetchServices();
    }, []);

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
