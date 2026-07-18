import React, { useRef } from "react";
import { motion } from "framer-motion";
import VariableProximity from "../../../components/ui/VariableProximity";

// Image imports (Figma hero assets — node 820:2060)
import sparkImage from "../../../assets/illustrations/hero/spark.svg";
import arrowImage from "../../../assets/illustrations/hero/arrow.svg";
import quoteIcon from "../../../assets/illustrations/hero/quote.svg";

interface HeroViewProps {
    heroElementsVariants: {
        visible: { opacity: number; y: number };
        hidden: { opacity: number; y: number };
    };
}

/**
 * Hero view content — pixel-matched to Figma node 820:2060 ("إيمان" hero).
 * Positions use a 1440-wide canvas reference, anchored to the horizontal
 * center so the layout stays aligned as the canvas scales down.
 * Includes: welcome badge (مرحباً) + spark, "أنا إيمان," heading,
 * "UX/UI Designer" title + arrow decoration, and the right-side quote.
 */
const HeroView: React.FC<HeroViewProps> = ({ heroElementsVariants }) => {
    const quoteContainerRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            className="relative w-full h-full"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={heroElementsVariants}
            transition={{ duration: 0.5 }}
        >
            {/* Badge + Heading group (Figma 820:2062) — centered, top 153.61px */}
            <div
                className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none flex flex-col items-center"
                style={{ top: "153.61px", width: "797.531px" }}
            >
                {/* Inner stack: badge + heading (gap 8.735px) */}
                <div className="flex flex-col items-center" style={{ gap: "8.735px" }}>
                    {/* Welcome badge (Figma 820:2064/2065) */}
                    <div className="relative">
                        {/* Spark — light blue (Figma 820:2067), top-right of badge */}
                        <img
                            src={sparkImage}
                            alt=""
                            aria-hidden="true"
                            className="absolute"
                            style={{ top: "0px", left: "86.2px", width: "29.356px", height: "30.424px" }}
                        />
                        <div
                            className="bg-white/10 border-white overflow-hidden flex items-center justify-center"
                            style={{
                                marginTop: "16.6px",
                                borderWidth: "1.113px",
                                borderStyle: "solid",
                                borderRadius: "33.4px",
                                padding: "11.133px 22.266px",
                                height: "39.309px",
                            }}
                        >
                            <span
                                className="font-zain text-white whitespace-nowrap"
                                style={{ fontSize: "22.712px", letterSpacing: "-0.3407px", lineHeight: "normal" }}
                            >
                                مرحباً
                            </span>
                        </div>
                    </div>

                    {/* Heading: أنا إيمان, / UX/UI Designer (Figma 820:2070) */}
                    <div
                        className="text-center text-white"
                        style={{ width: "797.531px", letterSpacing: "-1.2522px" }}
                    >
                        <h2
                            style={{
                                fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                                fontWeight: 500,
                                fontSize: "83.48px",
                                lineHeight: 1.05,
                                margin: 0,
                            }}
                        >
                            {" "}أنا{" "}
                            <span
                                className="bg-clip-text text-transparent inline-block"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to right, rgba(198,117,136,0.4) 0%, #de97a7 100%)",
                                }}
                            >
                                إيمان
                            </span>
                            ,
                        </h2>
                        <h1
                            style={{
                                fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif',
                                fontWeight: 500,
                                fontSize: "83.48px",
                                lineHeight: 1.05,
                                margin: 0,
                            }}
                        >
                            UX/UI Designer
                        </h1>
                    </div>
                </div>

                {/* Arrow decoration — pink squiggle (Figma 820:2071) */}
                <img
                    src={arrowImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute"
                    style={{
                        left: "32.49px",
                        top: "181.13px",
                        width: "79.212px",
                        height: "82.093px",
                        transform: "rotate(-166.3deg)",
                    }}
                />
            </div>

            {/* Quote (Figma 820:2094) — right side, top 530px */}
            <div
                ref={quoteContainerRef}
                className="absolute z-30 flex flex-col items-start"
                style={{ left: "calc(50% + 275px)", top: "530px", width: "362px", gap: "20px" }}
            >
                {/* Quote icon, right-aligned */}
                <div className="flex flex-col items-end w-full">
                    <img src={quoteIcon} alt="" aria-hidden="true" style={{ width: "36px", height: "36px" }} />
                </div>
                <VariableProximity
                    label="أؤمـــن بـــأن جوهــــر التصميــــم يكمـــــن فــي الإحساس، لذا أعمل على تصميم تجارب رقمية واعيـــة، وبنـــــاء واجهــــــــات مستخــــــدم تعكــــــس هويــــــــة العلامــــــــــة التجاريــــة بدقـــــــة وتــــوازن بيـن الجمـال والوضــــوح."
                    className="text-white"
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 900, 'opsz' 40"
                    containerRef={quoteContainerRef}
                    radius={100}
                    falloff="linear"
                    style={{
                        fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                        fontWeight: 500,
                        fontSize: "24px",
                        lineHeight: 1.34,
                        letterSpacing: "-0.36px",
                        textAlign: "right" as const,
                        direction: "rtl" as const,
                        width: "354.75px",
                    }}
                />
            </div>
        </motion.div>
    );
};

export default HeroView;
