import React from "react";
import { motion } from "framer-motion";

export interface Program {
    id: number;
    name: string;
    image: string;
}

interface ProgramIconProps {
    program: Program;
    index: number;
}

/**
 * Individual program icon card with hover effects
 */
const ProgramIcon: React.FC<ProgramIconProps> = ({ program, index }) => {
    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
        >
            {/* Card */}
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-accent-purple/10">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Image */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                    <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-full object-contain transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-text-secondary text-xs whitespace-nowrap">
                    {program.name}
                </span>
            </div>
        </motion.div>
    );
};

export default ProgramIcon;
