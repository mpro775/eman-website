import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import HeroView from "./HeroView";
import AboutView from "./SkillsView";
import ActionDock from "./ActionDock";
import BackgroundGlows from "./BackgroundGlows";
import BottomBlurEffect from "./BottomBlurEffect";

// Image import (Figma hero portrait — node 820:2098)
import heroImage from "../../../assets/illustrations/hero/portrait.png";

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

    // Animation variants — hero state matches Figma 820:2098 (top-anchored, 531×606).
    // The about/skills state keeps the portrait functional (re-design later).
    const imageVariants = {
        hero: {
            x: "-50%",
            left: "calc(50% - 14.5px)",
            top: "321px",
            scale: 1,
        },
        about: {
            x: "0%",
            left: "12%",
            top: "150px",
            scale: 1.35,
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
            {/* Black background overlay - covers entire section in About view */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                    backgroundColor: isAboutView ? "#000000" : "transparent",
                }}
                transition={{ duration: transitionDuration, ease: transitionEase }}
            />

            {/* Canvas Container - 1440px × 918px (Figma frame 820:2060) */}
            <div
                className="relative w-full max-w-[1440px] mx-auto overflow-visible h-auto min-h-screen lg:h-[918px] lg:min-h-0"
            >
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

                {/* Personal Image (shared - animates between views).
                    Hero state: 531×606 crop box matching Figma 820:2098. */}
                <motion.div
                    className="absolute z-[25] overflow-hidden"
                    style={{ width: "531px", height: "606px" }}
                    initial={false}
                    animate={isAboutView ? "about" : "hero"}
                    variants={imageVariants}
                    transition={{ duration: transitionDuration, ease: transitionEase }}
                >
                    <img
                        src={heroImage}
                        alt="Eman UI Designer"
                        className="absolute max-w-none object-cover pointer-events-none"
                        style={{ width: "164.01%", height: "216.16%", left: "-30.86%", top: "-36%" }}
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
