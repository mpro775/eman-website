import React from "react";
import arrowUpRight from "../../../assets/hero/arrow-up-right.svg";

// Figma hero assets (node 820:2060)
import sparkImage from "../../../assets/illustrations/hero/spark.svg";
import quoteIcon from "../../../assets/illustrations/hero/quote.svg";
import heroImage from "../../../assets/illustrations/hero/portrait.png";

const headingFontSize = "clamp(2.1rem, 10vw, 3rem)";

const dockLabelStyle: React.CSSProperties = {
    fontFamily: '"Urbanist", "Tajawal", sans-serif',
    fontWeight: 700,
    fontSize: "clamp(1rem, 4.5vw, 1.25rem)",
    letterSpacing: "-0.335px",
};

/**
 * Mobile / small-screen hero — a vertical-flow version of the Figma hero
 * (node 820:2060). Rendered only below the `lg` breakpoint; the desktop
 * pixel-perfect absolute layout lives in index.tsx and is hidden on mobile.
 */
const HeroMobile: React.FC = () => {
    return (
        <div className="lg:hidden relative w-full min-h-screen flex flex-col items-center text-center px-6 pt-28 pb-12 overflow-hidden">
            {/* Purple glow (top) */}
            <div
                className="absolute top-[-6%] left-1/2 -translate-x-1/2 w-[150%] h-[340px] rounded-full pointer-events-none"
                style={{
                    background: "linear-gradient(177deg, rgba(187,161,254,0.45) 0%, rgba(33,13,83,0.65) 100%)",
                    filter: "blur(90px)",
                }}
            />

            {/* Badge "مرحباً" + spark */}
            <div className="relative z-10 inline-flex">
                <img
                    src={sparkImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute"
                    style={{ top: "-12px", left: "70%", width: "26px", height: "27px" }}
                />
                <div className="bg-white/10 border border-white rounded-full flex items-center justify-center px-6 py-2">
                    <span className="font-zain text-white whitespace-nowrap" style={{ fontSize: "1.25rem", letterSpacing: "-0.34px" }}>
                        مرحباً
                    </span>
                </div>
            </div>

            {/* Heading: أنا إيمان, / UX/UI Designer */}
            <h2
                className="z-10 mt-4 text-white"
                style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif', fontWeight: 500, fontSize: headingFontSize, lineHeight: 1.1, letterSpacing: "-0.5px", margin: "1rem 0 0" }}
            >
                أنا{" "}
                <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(to right, rgba(198,117,136,0.5) 0%, #de97a7 100%)" }}
                >
                    إيمان
                </span>
                ,
            </h2>
            <h1
                className="z-10 text-white"
                style={{ fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif', fontWeight: 500, fontSize: headingFontSize, lineHeight: 1.1, margin: 0 }}
            >
                UX/UI Designer
            </h1>

            {/* Portrait with maroon halo */}
            <div className="relative z-10 mt-7 w-[min(72vw,300px)]">
                <div
                    className="absolute inset-[-12%_-8%] rounded-[50%] pointer-events-none"
                    style={{ background: "linear-gradient(180deg, #7A464D 0%, #120002 100%)", filter: "blur(45px)" }}
                />
                <div className="relative w-full aspect-[531/606] overflow-hidden">
                    <img
                        src={heroImage}
                        alt="Eman UI Designer"
                        className="absolute max-w-none object-cover pointer-events-none"
                        style={{ width: "164.01%", height: "216.16%", left: "-30.86%", top: "-36%" }}
                    />
                </div>
            </div>

            {/* Quote */}
            <div className="z-10 mt-7 w-full max-w-[360px] flex flex-col items-center">
                <img src={quoteIcon} alt="" aria-hidden="true" className="mb-3" style={{ width: "32px", height: "32px" }} />
                <p
                    className="text-white text-center"
                    style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif', fontWeight: 500, fontSize: "clamp(0.95rem, 4vw, 1.05rem)", lineHeight: 1.6, direction: "rtl" }}
                >
                    أؤمـــن بأن جوهـــر التصميـــم يكمـــــن فــي الإحساس، لذا أعمل على تصميم تجارب
                    رقمية واعيـــة، وبنـــــاء واجهــــات مستخــــدم تعكــــــس هويـــة العلامــــة
                    التجاريــــة بدقـــــة وتــــوازن بيـن الجمـال والوضــــوح.
                </p>
            </div>

            {/* Action dock (dir=ltr → أعمالي on the left, تواصل معي on the right — Figma) */}
            <div dir="ltr" className="z-10 mt-8 w-full max-w-[373px] flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full p-[6px]">
                <a
                    href="#portfolio"
                    className="flex-[3] flex items-center justify-center gap-2 bg-black border border-[#d0d5dd] rounded-full px-8 py-4 transition-transform active:scale-95"
                >
                    <span className="text-white whitespace-nowrap" style={dockLabelStyle}>أعمالي</span>
                    <img src={arrowUpRight} alt="" className="shrink-0" style={{ width: "36px", height: "36px" }} />
                </a>
                <a
                    href="#contact"
                    className="flex-[2] flex items-center justify-center px-4 py-3 rounded-full transition-colors active:bg-white/10"
                >
                    <span className="text-white whitespace-nowrap" style={dockLabelStyle}>تواصل معي</span>
                </a>
            </div>
        </div>
    );
};

export default HeroMobile;
