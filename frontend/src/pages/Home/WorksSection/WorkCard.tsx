import React from "react";
import { motion } from "framer-motion";

export interface WorkItem {
    id: number;
    title: string;
    image: string;
    slug: string;
}

interface WorkCardProps {
    work: WorkItem;
    index: number;
    activeIndex: number;
    onClick: () => void;
}

/**
 * Individual work/portfolio card with carousel animation
 */
const WorkCard: React.FC<WorkCardProps> = ({
    work,
    index,
    activeIndex,
    onClick,
}) => {
    const isActive = index === activeIndex;
    const offset = index - activeIndex;
    const position = offset * 120;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, x: `${position}%` }}
            animate={{
                opacity: isActive ? 1 : 0.6,
                scale: isActive ? 1 : 0.8,
                x: `${position}%`,
                filter: isActive ? "blur(0px)" : "blur(3px)",
            }}
            transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="absolute w-full max-w-sm md:max-w-md lg:max-w-lg"
            style={{
                zIndex: isActive ? 20 : 10 - Math.abs(offset),
            }}
            onClick={onClick}
        >
            <div
                className={`relative rounded-2xl overflow-hidden backdrop-blur-md border transition-all duration-300 cursor-pointer ${isActive
                    ? "bg-[#2a1a3e]/95 border-accent-purple/60 shadow-[0_0_50px_rgba(157,78,221,0.6)]"
                    : "bg-[#1e1e2e]/90 border-accent-purple/20 hover:border-accent-purple/40"
                    }`}
            >
                {/* Card Image Container */}
                <div className="relative w-full aspect-[4/3] flex items-center justify-center p-6 md:p-8 bg-gradient-to-b from-transparent to-black/20">
                    <img
                        src={work.image}
                        alt={work.title}
                        className={`w-full h-full object-contain transition-all duration-300 ${isActive ? "scale-105" : "scale-100"
                            }`}
                    />
                </div>

                {/* Card Title */}
                <div className="p-5 md:p-6 text-center border-t border-accent-purple/20 bg-black/20">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                        {work.title}
                    </h3>
                </div>

                {/* Active indicator glow effect */}
                {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-purple/20 via-transparent to-transparent pointer-events-none"></div>
                )}
            </div>
        </motion.div>
    );
};

export default WorkCard;
