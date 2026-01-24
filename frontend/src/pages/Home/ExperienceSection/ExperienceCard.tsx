import React from "react";
import { motion, type Variants } from "framer-motion";
import { playTap } from "../../../utils/soundManager";

export interface ExperienceItem {
    id: number;
    title: string;
    description: string;
}

interface ExperienceCardProps {
    experience: ExperienceItem;
    variants: Variants;
    isRightColumn?: boolean;
}

/**
 * Individual experience card with numbered circle indicator
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({
    experience,
    variants,
    isRightColumn = true,
}) => {
    return (
        <motion.div
            key={experience.id}
            variants={variants}
            className="relative flex items-center gap-4 flex-row-reverse group"
        >
            {/* Card */}
            <div
                className="flex-1 bg-[#1e1e2e]/90 backdrop-blur-sm border border-accent-purple/30 rounded-xl p-6 relative hover:border-accent-purple/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(157,78,221,0.3)] group"
                onMouseEnter={() => playTap({ volume: 0.25 })}
            >
                <div className="text-right">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent-purple-light transition-colors">
                        {experience.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#b4b4b4]">
                        {experience.description}
                    </p>
                </div>
            </div>

            {/* Arrow between card and circle */}
            <div className="hidden lg:flex items-center justify-center text-white/60 text-xl group-hover:text-accent-purple transition-colors">
                &gt;
            </div>

            {/* Numbered circle */}
            <div className="relative flex-shrink-0 hidden lg:flex items-center justify-center w-14 h-14">
                <div
                    className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                        background:
                            "radial-gradient(circle at 30% 30%, rgba(157,78,221,0.8), rgba(209, 97, 253,0.8) 40%, rgba(100,50,180,0.9))",
                        boxShadow: isRightColumn
                            ? "0 0 20px rgba(157,78,221,0.6)"
                            : `
                0 0 20px rgba(157,78,221,0.6),
                0 8px 16px rgba(0,0,0,0.4),
                inset -3px -3px 8px rgba(0,0,0,0.3),
                inset 3px 3px 8px rgba(255,255,255,0.2)
              `,
                    }}
                >
                    <div
                        className={`absolute top-2 left-3 w-4 h-4 rounded-full ${!isRightColumn ? "opacity-60" : ""
                            }`}
                    ></div>
                    <span
                        className={`text-white font-bold text-xl relative z-10 ${!isRightColumn ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""
                            }`}
                    >
                        {experience.id}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ExperienceCard;
