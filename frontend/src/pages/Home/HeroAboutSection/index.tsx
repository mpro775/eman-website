import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import HeroView from "./HeroView";
import AboutView from "./AboutView";
import ActionDock from "./ActionDock";
import BackgroundGlows from "./BackgroundGlows";
import BottomBlurEffect from "./BottomBlurEffect";

// Image import
import heroImage from "../../../assets/images/image.png";

// Types
export interface HeroAboutSectionProps {
    isAboutView: boolean;
    onViewChange?: (isAbout: boolean) => void;
}

/**
 * Combined Hero and About section with smooth transitions
 * Switches between Hero and About views based on isAboutView prop
 */
const HeroAboutSection: React.FC<HeroAboutSectionProps> = ({ isAboutView }) => {
    // Animation configuration
    const transitionDuration = 0.8;
    const transitionEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

    // Animation variants
    const imageVariants = {
        hero: {
            x: "-50%",
            y: 0,
            left: "50%",
            bottom: "0px",
            width: "906.4px",
            height: "605.3px",
            scale: 1,
        },
        about: {
            x: "0%",
            y: 0,
            left: "25%",
            bottom: "0px",
            width: "55%",
            height: "auto",
            scale: 1.1,
        },
    };

    const heroElementsVariants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -30 },
    };

    const aboutElementsVariants = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: 50 },
    };

    return (
        <section
            id="home"
            className="scroll-section relative w-full min-h-screen bg-bg-primary overflow-hidden flex items-end justify-center"
        >
            {/* Canvas Container - 1444px × 918px */}
            <div
                className="relative w-full max-w-[1444px] mx-auto overflow-visible h-auto min-h-screen lg:h-[918px] lg:min-h-0"
            >
                {/* Background Glow Effects */}
                <BackgroundGlows
                    isAboutView={isAboutView}
                    transitionDuration={transitionDuration}
                    transitionEase={transitionEase}
                />

                {/* Hero Elements (disappear on transition) */}
                <AnimatePresence>
                    {!isAboutView && (
                        <HeroView heroElementsVariants={heroElementsVariants} />
                    )}
                </AnimatePresence>

                {/* About Elements (appear on transition) */}
                <AnimatePresence>
                    {isAboutView && (
                        <AboutView aboutElementsVariants={aboutElementsVariants} />
                    )}
                </AnimatePresence>

                {/* Personal Image (shared - animates between views) */}
                <motion.div
                    className="absolute z-[25]"
                    initial={false}
                    animate={isAboutView ? "about" : "hero"}
                    variants={imageVariants}
                    transition={{ duration: transitionDuration, ease: transitionEase }}
                >
                    <img
                        src={heroImage}
                        alt="Eman UI Designer"
                        className="w-full h-full object-contain grayscale contrast-100 brightness-90"
                    />
                </motion.div>

                {/* Bottom Blur Effect - appears in Skills view */}
                <BottomBlurEffect
                    isVisible={isAboutView}
                    transitionDuration={transitionDuration}
                    transitionEase={transitionEase}
                />

                {/* Floating Action Dock (shared - animates between views) */}
                <ActionDock
                    isAboutView={isAboutView}
                    transitionDuration={transitionDuration}
                    transitionEase={transitionEase}
                />
            </div>
        </section>
    );
};

export default HeroAboutSection;
