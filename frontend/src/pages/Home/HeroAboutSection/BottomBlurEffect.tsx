import React from "react";
import { motion } from "framer-motion";
import bottomBlurEffect from "../../../assets/BottomBlurEffect.svg";

interface GlowDomeEffectProps {
    isVisible: boolean;
    transitionDuration: number;
    transitionEase: [number, number, number, number];
}

/**
 * Arc / Dome glow effect using SVG asset from Figma
 */
const GlowDomeEffect: React.FC<GlowDomeEffectProps> = ({
    isVisible,
    transitionDuration,
    transitionEase,
}) => {
    return (
        <motion.div
            className="pointer-events-none absolute z-[26]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: transitionDuration, ease: transitionEase }}
            style={{
                left: "50%",
                bottom: "-55%",
                transform: "translateX(-50%)",
            }}
        >
            <img
                src={bottomBlurEffect}
                alt=""
                style={{
                    width: "1000px",  // Original SVG width
                    height: "722px",  // Original SVG height
                    transform: "scale(2)",  // Double the size
                    transformOrigin: "center bottom",  // Scale from bottom center
                }}
            />
        </motion.div>
    );
};

export default GlowDomeEffect;
