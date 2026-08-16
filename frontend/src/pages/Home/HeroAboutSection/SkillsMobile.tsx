import React from "react";
import SkillCard from "./SkillCard";
import { skillsData } from "./SkillsView";

// Assets
import skillsPortrait from "../../../assets/skills/portrait.png";
import sparkImage from "../../../assets/illustrations/hero/spark.svg";
import arrowUpRight from "../../../assets/hero/arrow-up-right.svg";

const dockLabelStyle: React.CSSProperties = {
    fontFamily: '"Urbanist", "Tajawal", sans-serif',
    fontWeight: 700,
    fontSize: "clamp(1rem, 4.5vw, 1.25rem)",
    letterSpacing: "-0.335px",
};

/**
 * Mobile view for Skills ("مهاراتي")
 * A vertical-flow layout with ambient glows, the skills portrait,
 * interactive 3D skill cards, and navigation actions.
 */
const SkillsMobile: React.FC = () => {
    return (
        <div className="relative w-full flex flex-col items-center text-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden">
            {/* Top purple glow */}
            <div
                className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[150%] h-[320px] rounded-full pointer-events-none"
                style={{
                    background: "linear-gradient(177deg, rgba(187,161,254,0.35) 0%, rgba(33,13,83,0.55) 100%)",
                    filter: "blur(90px)",
                }}
            />

            {/* Bottom-center maroon/purple glow */}
            <div
                className="absolute top-[280px] left-1/2 -translate-x-1/2 w-[130%] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, #7A464D 0%, #210D53 100%)",
                    filter: "blur(110px)",
                    opacity: 0.65,
                }}
            />

            {/* Badge "مهاراتي" + spark */}
            <div className="relative z-10 inline-flex items-center">
                <img
                    src={sparkImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute"
                    style={{ top: "-12px", left: "70%", width: "26px", height: "27px" }}
                />
                <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center px-6 py-2 shadow-lg">
                    <span
                        className="font-zain text-white whitespace-nowrap"
                        style={{ fontSize: "1.25rem", letterSpacing: "-0.34px" }}
                    >
                        مهاراتي وخبراتي
                    </span>
                </div>
            </div>

            {/* Subtitle / Header */}
            <h2
                className="z-10 mt-3 text-white"
                style={{
                    fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                    fontWeight: 500,
                    fontSize: "clamp(1.5rem, 6vw, 2rem)",
                    lineHeight: 1.2,
                }}
            >
                مجالات{" "}
                <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(to right, #e293a6 0%, #c67588 100%)" }}
                >
                    التميّز والإبداع
                </span>
            </h2>

            {/* Portrait area with subtle "UX UI" watermark & maroon halo */}
            <div className="relative z-10 mt-5 mb-8 w-[min(65vw,250px)]">
                {/* Maroon halo behind portrait */}
                <div
                    className="absolute inset-[-10%_-6%] rounded-[50%] pointer-events-none"
                    style={{
                        background: "linear-gradient(180deg, #7A464D 0%, #120002 100%)",
                        filter: "blur(40px)",
                    }}
                />

                {/* "UX  UI" watermark behind portrait */}
                <div
                    className="absolute z-0 pointer-events-none select-none flex items-center justify-center -top-6 left-1/2 -translate-x-1/2 w-[280px] -rotate-12"
                >
                    <p
                        className="text-center"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif',
                            fontWeight: 600,
                            fontSize: "52px",
                            lineHeight: 1,
                            color: "rgba(255,255,255,0.08)",
                            whiteSpace: "pre",
                        }}
                    >
                        {"UX      UI"}
                    </p>
                </div>

                {/* Portrait Image with bottom gradient fade */}
                <div
                    className="relative w-full aspect-[532/574] overflow-hidden"
                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                    }}
                >
                    <img
                        src={skillsPortrait}
                        alt="Eman — UI/UX Designer"
                        className="w-full h-full object-cover object-top pointer-events-none"
                    />
                </div>
            </div>

            {/* Skill cards vertical flow */}
            <div className="z-10 w-full flex flex-col items-center gap-5 max-w-[420px]">
                {skillsData.map((s, i) => (
                    <SkillCard
                        key={s.id}
                        inFlow
                        icon={s.icon}
                        title={s.title}
                        description={s.description}
                        iconRotate={s.iconRotate}
                        delay={0.1 + i * 0.08}
                    />
                ))}
            </div>

            {/* Action dock (dir=ltr → أعمالي on left, تواصل معي on right) */}
            <div
                dir="ltr"
                className="z-10 mt-10 w-full max-w-[373px] flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full p-[6px] shadow-xl border border-white/10"
            >
                <a
                    href="#portfolio"
                    className="flex-[3] flex items-center justify-center gap-2 bg-black border border-[#d0d5dd] rounded-full px-8 py-4 transition-transform active:scale-95"
                >
                    <span className="text-white whitespace-nowrap" style={dockLabelStyle}>
                        أعمالي
                    </span>
                    <img src={arrowUpRight} alt="" className="shrink-0" style={{ width: "36px", height: "36px" }} />
                </a>
                <a
                    href="#contact"
                    className="flex-[2] flex items-center justify-center px-4 py-3 rounded-full transition-colors active:bg-white/10"
                >
                    <span className="text-white whitespace-nowrap" style={dockLabelStyle}>
                        تواصل معي
                    </span>
                </a>
            </div>
        </div>
    );
};

export default SkillsMobile;
