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
                    top: isAboutView ? "0px" : "-300px",
                    left: isAboutView ? "0px" : "-300px",
                    right: isAboutView ? "auto" : "auto",
                }}
                transition={{ duration: transitionDuration, ease: transitionEase }}
                style={{
                    width: "600px",
                    height: "600px",
                    background: "linear-gradient(177.25deg, rgba(187, 161, 254, 0.53) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)",
                    borderRadius: "50%",
                    filter: "blur(100px)",
                }}
            />

            {/* Pink glow background - hidden in About view */}
            <motion.div 
              className="absolute pointer-events-none z-0" 
              animate={{ 
                opacity: isAboutView ? 0 : 1, 
                bottom: isAboutView ? "0px" : "-100px", 
                left: isAboutView ? "0%" : "50%", 
                transform: isAboutView ? "translateX(0%)" : "translateX(-50%)", 
            }} 
            transition={{ duration: transitionDuration, ease: transitionEase }} 
            style={{ 
                width: "600px",   
                height: "500px",  
                background: "linear-gradient(180deg, #7A464D 0%, #120002 100%)", 
                filter: "blur(50px)", 
                borderRadius: "50% 50% 0 0", 
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
