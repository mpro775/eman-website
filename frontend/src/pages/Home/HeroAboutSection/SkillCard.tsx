import React from "react";
import { motion } from "framer-motion";
import frameButtonSvg from "../../../assets/logos/Frame_button.png";

interface SkillCardProps {
    icon: string;
    title: string;
    description: string;
    position: React.CSSProperties;
    delay: number;
}

/**
 * Skill card component for the "مهاراتي" (My Skills) section
 * Features gradient background, blur effects, and floating action button
 * Designed with RTL support for Arabic content
 */
const SkillCard: React.FC<SkillCardProps> = ({
    title,
    description,
    position,
    delay,
}) => {
    return (
        <motion.div
            className="absolute z-30"
            style={position}
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {/* Floating animation wrapper */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay * 0.5,
                }}
            >
                {/* Card Container */}
                <div
                    className="relative overflow-hidden"
                    style={{
                        width: "320px",
                        height: "170px",
                        borderRadius: "17.86px",
                        padding: "12px 16px",
                        background: "linear-gradient(242.45deg, #3B3156 38.21%, #000000 98.39%)",
                        boxShadow: "0px 2.98px 2.98px 0px #60606040",
                        direction: "rtl",
                    }}
                >
                    {/* Top reflection */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
                        style={{
                            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
                            borderRadius: "17.86px 17.86px 0 0",
                        }}
                    />

                    {/* Liquid Glass Button - using SVG from Figma */}
                    <div className="relative mb-3 flex justify-center">
                        <div className="relative flex items-center justify-center cursor-pointer transition-all hover:scale-105">
                            {/* Button SVG Background */}
                            <img
                                src={frameButtonSvg}
                                alt=""
                                style={{
                                    width: "170px",   // عدّل العرض كما تريد
                                    height: "40px",   // عدّل الارتفاع كما تريد
                                }}
                            />

                            {/* Label text - positioned on top of SVG */}
                            <span
                                className="absolute font-english font-bold text-center"
                                style={{
                                    fontFamily: "'Urbanist', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "16px",
                                    lineHeight: "111%",
                                    letterSpacing: "-0.015em",
                                    color: "#FFFFFF",
                                }}
                            >
                                {title}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p
                        className="text-right"
                        style={{
                            fontFamily: "'Urbanist', sans-serif",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "125%",
                            letterSpacing: "-0.015em",
                            color: "#FFFFFF",
                        }}
                    >
                        {description}
                    </p>

                    {/* Subtle glow effect */}
                    <div
                        className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(157, 78, 221, 0.2) 0%, transparent 70%)",
                            filter: "blur(20px)",
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SkillCard;
