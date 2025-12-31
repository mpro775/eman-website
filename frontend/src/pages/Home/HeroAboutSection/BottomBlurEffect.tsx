import React from "react";
import { motion } from "framer-motion";

interface BottomBlurEffectProps {
    isVisible: boolean;
    transitionDuration: number;
    transitionEase: [number, number, number, number];
}

/**
 * Gradient blur effect positioned at the bottom of the hero image
 * Creates an atmospheric purple glow effect as per Figma specifications
 */
const BottomBlurEffect: React.FC<BottomBlurEffectProps> = ({
    isVisible,
    transitionDuration,
    transitionEase,
}) => {
    return (
        <motion.div
            className="absolute pointer-events-none z-[24]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: transitionDuration, ease: transitionEase }}
            style={{
                width: "710.48px",
                height: "355.24px",
                bottom: "0px",
                left: "50%",
                transform: "translateX(-50%) rotate(-0.24deg)",
                background: "linear-gradient(177.25deg, rgba(187, 161, 254, 0.8) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)",
                backdropFilter: "blur(488.2px)",
                WebkitBackdropFilter: "blur(488.2px)",
                borderRadius: "50% 50% 0 0",
            }}
        />
    );
};

export default BottomBlurEffect;
