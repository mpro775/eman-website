import React from "react";
import { motion } from "framer-motion";

// Image imports
import sparkImage from "../../../assets/illustrations/1.svg";
import arrowImage from "../../../assets/illustrations/2.svg";
import quoteIcon from "../../../assets/illustrations/3.png";

interface HeroViewProps {
    heroElementsVariants: {
        visible: { opacity: number; y: number };
        hidden: { opacity: number; y: number };
    };
}

/**
 * Hero view content - displays the main landing page content
 * Includes: Welcome badge, "أنا إيمان" heading, UX/UI Designer title, quote
 */
const HeroView: React.FC<HeroViewProps> = ({ heroElementsVariants }) => {
    return (
        <>
            {/* Top section: Welcome + أنا إيمان */}
            <motion.div
                className="absolute left-1/2 flex flex-col items-center z-10"
                style={{ top: "120px", transform: "translateX(-50%)" }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={heroElementsVariants}
                transition={{ duration: 0.5 }}
            >
                {/* Welcome badge */}
                <div className="relative">
                    <img
                        src={sparkImage}
                        alt="Spark"
                        className="absolute"
                        style={{ top: "-18px", right: "-20px", width: "32px", height: "32px" }}
                    />
                    <div
                        className="bg-white/5 border border-white/40 backdrop-blur-md rounded-full"
                        style={{ padding: "8px 32px" }}
                    >
                        <span
                            className="text-white font-medium shadow-none"
                            style={{ fontSize: "20px" }}
                        >
                            مرحباً
                        </span>
                    </div>
                </div>

                {/* أنا إيمان */}
                <h2
                    className="text-white text-center"
                    style={{
                        fontFamily: '"Urbanist", "Tajawal", sans-serif',
                        fontWeight: 600,
                        fontSize: "83.48px",
                        lineHeight: "140%",
                        letterSpacing: "-0.015em",
                        marginTop: "16px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }}
                >
                    أنا{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-pink-dark inline-block relative py-1">
                        إيمان.
                    </span>
                </h2>
            </motion.div>

            {/* UX/UI Designer - Hero */}
            <motion.div
                className="absolute w-full text-center pointer-events-none select-none z-[1]"
                style={{ top: "300px" }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={heroElementsVariants}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h1
                    className="text-white"
                    style={{
                        fontFamily: '"Urbanist", "Tajawal", sans-serif',
                        fontWeight: 600,
                        fontSize: "83.48px",
                        lineHeight: "100%",
                        letterSpacing: "-0.015em",
                    }}
                >
                    UX/UI Designer
                </h1>
            </motion.div>

            {/* Arrow decoration */}
            <motion.img
                src={arrowImage}
                alt="Arrow decoration"
                className="absolute z-10"
                style={{ left: "360px", top: "340px", width: "100px", height: "60px" }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={heroElementsVariants}
                transition={{ duration: 0.5, delay: 0.2 }}
            />

            {/* Quote */}
            <motion.div
                className="absolute z-30 text-right"
                style={{ right: "50px", top: "400px", maxWidth: "450px" }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={heroElementsVariants}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <img
                    src={quoteIcon}
                    alt="Quote"
                    className="block"
                    style={{
                        width: "36px",
                        height: "36px",
                        marginBottom: "24px",
                        marginRight: "auto",
                        marginLeft: "0",
                    }}
                />
                <p
                    className="text-white"
                    style={{
                        fontFamily: '"Urbanist", "Tajawal", sans-serif',
                        fontWeight: 400,
                        fontSize: "24px",
                        lineHeight: "111%",
                        letterSpacing: "-0.015em",
                        textAlign: "right",
                        direction: "rtl",
                    }}
                >
                    أؤمــــن بــأن جوهــــــــــر التـــصميم يكمــــــــن
                    <br />
                    في{" "}
                    <span className="font-medium text-accent-pink-light">الإحساس</span>،
                    لذا أعمل على تصميـــــم
                    <br />
                    تجــارب رقميــــة واعيـــــة، وبناء واجهــــــات
                    <br />
                    مســــــستخدم تعكـــــس هويــــة الـــعلامــــــة
                    <br />
                    التجاريــــة بدقــــــة وتـــــــوازن بين الجمـــــال
                    <br />
                    والوضوح.
                </p>
            </motion.div>
        </>
    );
};

export default HeroView;
