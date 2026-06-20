import React from "react";
import { motion } from "framer-motion";

// Figma hero background assets (node 820:2060)
import bgGrid from "../../../assets/illustrations/hero/bg.svg";
import purpleGlow from "../../../assets/illustrations/hero/ellipse4.svg";
import maroonGlow from "../../../assets/illustrations/hero/ellipse2.svg";

interface BackgroundGlowsProps {
    isAboutView: boolean;
    transitionDuration: number;
    transitionEase: [number, number, number, number];
}

/**
 * Atmospheric hero background — pixel-matched to Figma 820:2060.
 * Purple glow (820:2061), faint grid backdrop (822:2968) and the maroon
 * halo behind the portrait (820:2092 / 820:2093). Fades out in the
 * About/Skills view to keep the existing transition.
 */
const BackgroundGlows: React.FC<BackgroundGlowsProps> = ({
    isAboutView,
    transitionDuration,
    transitionEase,
}) => {
    return (
        <motion.div
            className="absolute inset-0 z-0 pointer-events-none overflow-visible"
            animate={{ opacity: isAboutView ? 0 : 1 }}
            transition={{ duration: transitionDuration, ease: transitionEase }}
        >
            {/* Purple glow — top-left, rotated (Figma 820:2061) */}
            <div
                className="absolute flex items-center justify-center"
                style={{ left: "-455.88px", top: "-509.49px", width: "1074.707px", height: "1265.835px" }}
            >
                <div style={{ transform: "rotate(121.23deg)" }}>
                    <img
                        src={purpleGlow}
                        alt=""
                        aria-hidden="true"
                        style={{ width: "1135.968px", height: "567.984px", maxWidth: "none" }}
                    />
                </div>
            </div>

            {/* Faint grid backdrop (Figma 822:2968) */}
            <img
                src={bgGrid}
                alt=""
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: "1080px", height: "1350px", maxWidth: "none" }}
            />

            {/* Maroon halo behind the portrait (Figma 820:2093 + 820:2092) */}
            <img
                src={maroonGlow}
                alt=""
                aria-hidden="true"
                className="absolute -translate-x-1/2"
                style={{ left: "calc(50% + 37px)", top: "498px", width: "980px", height: "490px", maxWidth: "none" }}
            />
            <img
                src={maroonGlow}
                alt=""
                aria-hidden="true"
                className="absolute -translate-x-1/2"
                style={{ left: "calc(50% + 22px)", top: "535px", width: "980px", height: "490px", maxWidth: "none" }}
            />
        </motion.div>
    );
};

export default BackgroundGlows;
