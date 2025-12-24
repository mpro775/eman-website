import React from "react";
import { motion, type Variants } from "framer-motion";

export interface ServiceItem {
    id: number;
    englishTitle: string;
    arabicDescription: string;
    icon: string;
}

interface ServiceCardProps {
    service: ServiceItem;
    variants: Variants;
}

/**
 * Individual service card with icon and description
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ service, variants }) => {
    return (
        <motion.div variants={variants} className="group">
            <div className="bg-[#1e1e2e]/90 backdrop-blur-sm border border-accent-purple/30 rounded-2xl p-6 lg:p-8 h-full flex flex-col hover:border-accent-purple/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(157,78,221,0.3)]">
                {/* Service Icon in gradient circle */}
                <div className="mb-6 flex items-center justify-start">
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center flex-shrink-0">
                        <img
                            src={service.icon}
                            alt={service.englishTitle}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* English Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-accent-purple-light transition-colors">
                    {service.englishTitle}
                </h3>

                {/* Arabic Description */}
                <p className="text-sm lg:text-base text-white/90 leading-relaxed text-right flex-grow">
                    {service.arabicDescription}
                </p>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
