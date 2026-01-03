import React from "react";
import { motion } from "framer-motion";

interface BackgroundGlowsProps {
    isAboutView: boolean;
    transitionDuration: number;
    transitionEase: [number, number, number, number];
}

/**
 * Animated background glow effects that move based on current view
 * Creates the atmospheric purple/pink lighting effects
 */
const BackgroundGlows: React.FC<BackgroundGlowsProps> = ({
    isAboutView,
    transitionDuration,
    transitionEase,
}) => {
    return (
        <>
            {/* Purple glow background - hidden in About view */}
            <motion.div
                className="absolute pointer-events-none z-0"
                animate={{
                    opacity: isAboutView ? 0 : 1,
                    top: isAboutView ? "0px" : "-100px",
                    left: isAboutView ? "auto" : "-200px",
                    right: isAboutView ? "0px" : "auto",
                }}
                transition={{ duration: transitionDuration, ease: transitionEase }}
                style={{
                    width: "700px",
                    height: "700px",
                    background:
                        "radial-gradient(circle, rgba(157, 78, 221, 0.4) 0%, transparent 60%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Pink glow background - hidden in About view */}
            <motion.div
                className="absolute pointer-events-none z-0"
                animate={{
                    opacity: isAboutView ? 0 : 1,
                    bottom: isAboutView ? "0px" : "-100px",
                    left: isAboutView ? "-10%" : "50%",
                    transform: isAboutView ? "translateX(0%)" : "translateX(-50%)",
                }}
                transition={{ duration: transitionDuration, ease: transitionEase }}
                style={{
                    width: "900px",
                    height: "600px",
                    background:
                        "radial-gradient(ellipse, rgba(217, 119, 139, 0.7) 0%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Additional purple glow - hidden in About view */}
            <motion.div
                className="absolute pointer-events-none z-0"
                animate={{
                    opacity: 0, // Always hidden now
                }}
                transition={{ duration: transitionDuration, ease: transitionEase }}
                style={{
                    top: "20%",
                    left: "-5%",
                    width: "600px",
                    height: "600px",
                    background:
                        "radial-gradient(circle, rgba(157, 78, 221, 0.5) 0%, transparent 60%)",
                    filter: "blur(120px)",
                }}
            />
        </>
    );
};

export default BackgroundGlows;
