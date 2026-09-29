import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import HeroView from "./HeroView";
import HeroMobile from "./HeroMobile";
import AboutView from "./SkillsView";
import SkillsMobile from "./SkillsMobile";
import ActionDock from "./ActionDock";
import HeroVideo from "./HeroVideo";

// Portraits — Figma uses two different photos per view:
//  - Hero (820:2098): beige outfit, full shot
//  - Skills (851:381 "ChatGPT Image"): black outfit, centered close-up

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
    const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(preference.matches);
        preference.addEventListener("change", update);
        return () => preference.removeEventListener("change", update);
    }, []);
    const [motionPaused, setMotionPaused] = useState(false);
    const paused = motionPaused || !!reducedMotion || isAboutView;

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
            className="scroll-section relative w-full min-h-screen bg-bg-primary overflow-visible lg:overflow-hidden flex flex-col lg:flex-row items-center lg:items-end justify-center"
        >
            {!isAboutView && <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <HeroVideo kind="sunset" paused={paused} className="w-full h-full" />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/40" />
            </div>}
            {!isAboutView && !reducedMotion && <button
                type="button"
                onClick={() => setMotionPaused(value => !value)}
                aria-pressed={motionPaused}
                className="absolute left-4 top-24 z-40 rounded-full border border-white/30 bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-md hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
            >{motionPaused ? "تشغيل الحركة" : "إيقاف الحركة"}</button>}
            {/* Black background overlay - covers entire section in About view */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                animate={{
                    backgroundColor: isAboutView ? "#000000" : "transparent",
                }}
                transition={{ duration: transitionDuration, ease: transitionEase }}
            />

            {/* Mobile / small-screen views (vertical flow) — shown below lg */}
            <div className="w-full lg:hidden relative z-10">
                <AnimatePresence mode="wait">
                    {!isAboutView ? (
                        <motion.div
                            key="hero-mobile"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: transitionEase }}
                        >
                            <HeroMobile paused={paused} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="skills-mobile"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: transitionEase }}
                        >
                            <SkillsMobile />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop canvas - 1440px × 918px (Figma frame 820:2060) — lg and up */}
            <div
                className="relative hidden lg:block w-full max-w-[1440px] mx-auto overflow-visible lg:h-[918px]"
            >
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
                        height: "557px",
                        left: "calc(50% - 14.5px)",
                        transform: "translateX(-50%)",
                        top: "370px",
                        opacity: isAboutView ? 0 : 1,
                        transition: `opacity ${transitionDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                    }}
                >
                    <HeroVideo kind="portrait" paused={paused} className="w-full h-full" />
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
