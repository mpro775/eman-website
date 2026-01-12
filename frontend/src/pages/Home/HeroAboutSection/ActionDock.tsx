import React from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

interface ActionDockProps {
    isAboutView: boolean;
    transitionDuration: number;
    transitionEase: [number, number, number, number];
}

/**
 * Floating action dock with contact and portfolio buttons
 * Animates position based on current view (Hero vs About)
 */
const ActionDock: React.FC<ActionDockProps> = ({
    isAboutView,
    transitionDuration,
    transitionEase,
}) => {
    return (
        <motion.div
            className="absolute z-30"
            initial={false}
            animate={{
                left: "50%",
                bottom: isAboutView ? "-100px" : "48px",
                x: "-50%",
                scale: 1,
                opacity: isAboutView ? 0 : 1,
            }}
            transition={{ duration: transitionDuration, ease: transitionEase }}
        >
            {/* Liquid Glass Container */}
            <div
                className="relative rounded-full flex items-center overflow-hidden"
                style={{
                    padding: "6px",
                    gap: "6px",
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: `
            0 8px 32px rgba(0,0,0,0.3),
            inset 0 1px 1px rgba(255,255,255,0.2),
            inset 0 -1px 1px rgba(0,0,0,0.1),
            0 0 40px rgba(217,119,139,0.15)
          `,
                }}
            >
                {/* Highlight overlay for liquid effect */}
                <div
                    className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
                    }}
                />

                <a
                    href="#contact"
                    className="relative text-white font-medium transition-all hover:bg-white/15 rounded-full"
                    style={{ padding: "14px 44px", fontSize: "18px" }}
                >
                    تواصل معي
                </a>
                <button
                    className="relative bg-gradient-to-r from-accent-pink to-accent-pink-dark text-white font-bold rounded-full flex items-center transition-all hover:scale-105"
                    style={{
                        padding: "14px 44px",
                        fontSize: "18px",
                        gap: "10px",
                        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3)",
                    }}
                >
                    <HiArrowUpRight style={{ fontSize: "22px" }} />
                    <span>أعمالي</span>
                </button>
            </div>
        </motion.div>
    );
};

export default ActionDock;
