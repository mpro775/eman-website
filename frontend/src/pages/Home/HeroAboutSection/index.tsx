import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import HeroView from "./HeroView";
import HeroMobile from "./HeroMobile";
import AboutView from "./SkillsView";
import ActionDock from "./ActionDock";
import BackgroundGlows from "./BackgroundGlows";

// Portraits — Figma uses two different photos per view:
//  - Hero (820:2098): beige outfit, full shot
//  - Skills (851:381 "ChatGPT Image"): black outfit, centered close-up
import heroImage from "../../../assets/illustrations/hero/portrait.png";
import skillsImage from "../../../assets/skills/portrait.png";

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

            {/* Mobile / small-screen hero (vertical flow) — shown below lg */}
            <HeroMobile />

            {/* Desktop canvas - 1440px × 918px (Figma frame 820:2060) — lg and up */}
            <div
                className="relative hidden lg:block w-full max-w-[1440px] mx-auto overflow-visible lg:h-[918px]"
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
                {/* Hero portrait (Figma 820:2098) — fades out in Skills view */}
                <div
                    className="absolute z-[25] overflow-hidden pointer-events-none"
                    style={{
                        width: "531px",
                        height: "606px",
                        left: "calc(50% - 14.5px)",
                        transform: "translateX(-50%)",
                        top: "321px",
                        opacity: isAboutView ? 0 : 1,
                        transition: `opacity ${transitionDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                    }}
                >
                    <img
                        src={heroImage}
                        alt="Eman UI Designer"
                        className="absolute max-w-none object-cover pointer-events-none"
                        style={{ width: "164.01%", height: "216.16%", left: "-30.86%", top: "-36%" }}
                    />
                </div>

                {/* Skills portrait (Figma 851:381 "ChatGPT Image") — fades in in Skills view */}
                <div
                    className="absolute z-[25] overflow-hidden pointer-events-none"
                    style={{
                        width: "532px",
                        height: "574px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        top: "101px",
                        opacity: isAboutView ? 1 : 0,
                        transition: `opacity ${transitionDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                    }}
                >
                    <img
                        src={skillsImage}
                        alt="Eman — UI/UX Designer"
                        className="absolute max-w-none pointer-events-none"
                        style={{ width: "100%", height: "139.2%", left: "0", top: "-19.6%" }}
                    />
                </div>

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
