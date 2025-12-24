import React from "react";
import { motion, type Variants } from "framer-motion";

interface SectionTitleProps {
    title: string;
    maxWidth?: string;
    variants?: Variants;
}

/**
 * Shared section title component with gradient underline
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    maxWidth = "300px",
    variants,
}) => {
    const defaultVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <motion.div
            variants={variants || defaultVariants}
            className="mb-16 text-right"
        >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 relative inline-block">
                {title}
            </h2>
            {/* Gradient underline */}
            <div
                className="h-[3px] rounded-full mt-2"
                style={{
                    background: "linear-gradient(to left, #6366f1, #8b5cf6, transparent)",
                    width: "100%",
                    maxWidth: maxWidth,
                }}
            />
        </motion.div>
    );
};

export default SectionTitle;
