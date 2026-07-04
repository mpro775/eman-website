import React from "react";
import { motion } from "framer-motion";
import arrowUpRight from "../../../assets/hero/arrow-up-right.svg";

interface ActionDockProps {
    isAboutView: boolean;
    transitionDuration: number;
    transitionEase: [number, number, number, number];
}

const dockLabelStyle: React.CSSProperties = {
    fontFamily: '"Urbanist", "Tajawal", sans-serif',
    fontWeight: 700,
    fontSize: "22.335px",
    letterSpacing: "-0.335px",
};

/**
 * Floating action dock — pixel-matched to Figma 820:2099.
 * Glass pill containing the "أعمالي" black bordered button (with up-right arrow)
 * and the "تواصل معي" text action. Animates out of view in the About/Skills view.
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
                left: "calc(50% - 31.5px)",
                bottom: isAboutView ? "-120px" : "36.77px",
                x: "-50%",
                opacity: isAboutView ? 0 : 1,
            }}
            transition={{ duration: transitionDuration, ease: transitionEase }}
        >
            {/* Glass pill container (dir=ltr → أعمالي pill on the left, تواصل معي on the right — Figma) */}
            <div
                dir="ltr"
                className="flex items-center justify-center bg-white/10 backdrop-blur-md overflow-hidden"
                style={{
                    width: "373px",
                    height: "84.234px",
                    gap: "10.272px",
                    padding: "10.272px",
                    borderRadius: "51.362px",
                }}
            >
                {/* أعمالي — black bordered button: "أعمالي" text then up-right arrow (Figma 820:2099) */}
                <a
                    href="#portfolio"
                    className="shrink-0 flex items-center justify-center bg-black overflow-hidden transition-transform hover:scale-[1.03]"
                    style={{
                        width: "213.668px",
                        border: "0.514px solid #d0d5dd",
                        borderRadius: "61.635px",
                        padding: "10.272px 20.545px",
                    }}
                >
                    <span className="text-white whitespace-nowrap" style={dockLabelStyle}>
                        أعمالي
                    </span>
                    <img src={arrowUpRight} alt="" className="shrink-0" style={{ width: "43.144px", height: "43.144px" }} />
                </a>

                {/* تواصل معي — text action */}
                <a
                    href="#contact"
                    className="flex-1 flex items-center justify-center transition-colors hover:bg-white/10"
                    style={{ borderRadius: "61.635px", padding: "10.272px 20.545px" }}
                >
                    <span className="text-white whitespace-nowrap" style={dockLabelStyle}>
                        تواصل معي
                    </span>
                </a>
            </div>
        </motion.div>
    );
};

export default ActionDock;
