import React from "react";
import { motion } from "framer-motion";

interface FloatingSkillCardProps {
    icon: string;
    label: string;
    className: string;
    delay: number;
}

/**
 * Floating skill card component with Liquid Glass effect
 * Used in the About view to show skills like UX/UI Designer, App Developer, etc.
 */
const FloatingSkillCard: React.FC<FloatingSkillCardProps> = ({
    icon,
    label,
    className,
    delay,
}) => (
    <motion.div
        className={`absolute z-30 ${className}`}
        initial={{ opacity: 0, scale: 0.5, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.5, x: 20 }}
        transition={{ duration: 0.5 }}
    >
        <motion.div
            className="relative"
            animate={{ y: [0, -12, 0] }}
            transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
        >
            {/* Liquid Glass Card */}
            <div
                className="relative rounded-full overflow-visible flex items-center justify-center"
                style={{
                    width: "226px",
                    height: "51px",
                    borderRadius: "47px",
                    padding: "9.4px",
                    gap: "9.4px",
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: `
            0 8px 32px rgba(0,0,0,0.25),
            inset 0 1px 1px rgba(255,255,255,0.15),
            inset 0 -1px 1px rgba(0,0,0,0.1)
          `,
                }}
            >
                {/* Top reflection effect */}
                <div
                    className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                    }}
                />

                {/* Label text */}
                <span
                    className="relative font-english font-semibold italic"
                    style={{
                        fontSize: "18px",
                        color: "#9d7bbb",
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                >
                    {label}
                </span>
            </div>

            {/* Icon - positioned at top left corner */}
            <img
                src={icon}
                alt={label}
                className="absolute drop-shadow-2xl"
                style={{
                    rotate: "-15deg",
                    width: "53px",
                    height: "53px",
                    left: "-15px",
                    top: "-20px",
                }}
            />
        </motion.div>
    </motion.div>
);

export default FloatingSkillCard;
