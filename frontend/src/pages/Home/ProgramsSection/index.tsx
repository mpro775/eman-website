import React from "react";
import ProgramIcon, { type Program } from "./ProgramIcon";

// Icons
import illustratorIcon from "../../../assets/programs/illustrator.svg";
import adobexdIcon from "../../../assets/programs/adobexd.svg";
import figmaIcon from "../../../assets/programs/figma.svg";
import clickupIcon from "../../../assets/programs/clickup.svg";
import aftereffectsIcon from "../../../assets/programs/aftereffects.svg";
import indesignIcon from "../../../assets/programs/indesign.svg";
import photoshopIcon from "../../../assets/programs/photoshop.svg";
import premiereproIcon from "../../../assets/programs/premierepro.svg";
import chatgptIcon from "../../../assets/programs/chatgpt.svg";
import n8nIcon from "../../../assets/programs/n8n.svg";

const GLOW = (rgb: string) => `0px 8px 21px ${rgb}`;
const GLOW_LG = (rgb: string) => `0px 8px 41px ${rgb}`;

// Tool pills, grouped into the three rows of Figma node 820:1797 (3 / 4 / 3).
const ROWS: Program[][] = [
    [
        {
            id: 1,
            name: "Illustrator",
            icon: illustratorIcon,
            border: "rgba(255,154,0,0.5)",
            shadow: GLOW("rgba(255,154,0,0.28)"),
            gradient: "linear-gradient(160deg, rgb(28,9,0) 0%, rgb(180,83,9) 45%, rgb(255,154,0) 100%)",
            text: "#fef3c7",
        },
        {
            id: 2,
            name: "Adobe XD",
            icon: adobexdIcon,
            border: "rgba(255,97,246,0.5)",
            shadow: GLOW("rgba(255,97,246,0.28)"),
            gradient: "linear-gradient(160deg, rgb(26,0,32) 0%, rgb(134,25,143) 45%, rgb(255,97,246) 100%)",
            text: "#fae8ff",
        },
        {
            id: 3,
            name: "Figma",
            icon: figmaIcon,
            border: "rgba(162,89,255,0.5)",
            shadow: GLOW_LG("rgba(162,89,255,0.28)"),
            gradient: "linear-gradient(154deg, rgba(18,0,46,0) 0%, rgb(91,33,182) 45%, rgb(162,89,255) 100%)",
            text: "#e9d5ff",
        },
    ],
    [
        {
            id: 4,
            name: "ClickUp",
            icon: clickupIcon,
            border: "rgba(139,92,246,0.5)",
            shadow: GLOW("rgba(139,92,246,0.28)"),
            gradient:
                "linear-gradient(158deg, rgb(13,0,36) 0%, rgb(109,40,217) 35%, rgb(219,39,119) 70%, rgb(8,145,178) 100%)",
            text: "#e0e7ff",
        },
        {
            id: 5,
            name: "After Effects",
            icon: aftereffectsIcon,
            border: "rgba(153,153,255,0.5)",
            shadow: GLOW("rgba(153,153,255,0.28)"),
            gradient: "linear-gradient(162deg, rgb(4,0,26) 0%, rgb(55,48,163) 45%, rgb(153,153,255) 100%)",
            text: "#ede9fe",
        },
        {
            id: 6,
            name: "InDesign",
            icon: indesignIcon,
            border: "rgba(255,51,102,0.5)",
            shadow: GLOW("rgba(255,51,102,0.28)"),
            gradient: "linear-gradient(159deg, rgb(26,0,12) 0%, rgb(159,18,57) 45%, rgb(255,51,102) 100%)",
            text: "#fce7f3",
        },
        {
            id: 7,
            name: "Photoshop",
            icon: photoshopIcon,
            shadow: GLOW_LG("rgba(49,168,255,0.28)"),
            gradient: "linear-gradient(161deg, rgba(29,78,216,0) 0%, rgb(49,168,255) 100%)",
            text: "#dbeafe",
        },
    ],
    [
        {
            id: 8,
            name: "Premiere Pro",
            icon: premiereproIcon,
            border: "rgba(224,64,251,0.5)",
            shadow: GLOW("rgba(224,64,251,0.28)"),
            gradient: "linear-gradient(162deg, rgb(6,0,26) 0%, rgb(76,29,149) 45%, rgb(224,64,251) 100%)",
            text: "#f3e8ff",
        },
        {
            id: 9,
            name: "ChatGPT",
            icon: chatgptIcon,
            border: "rgba(16,163,127,0.5)",
            shadow: GLOW("rgba(16,163,127,0.28)"),
            gradient: "linear-gradient(159deg, rgb(0,26,13) 0%, rgb(6,95,70) 45%, rgb(16,163,127) 100%)",
            text: "#d1fae5",
        },
        {
            id: 10,
            name: "N8N",
            icon: n8nIcon,
            border: "rgba(249,115,22,0.5)",
            shadow: GLOW("rgba(249,115,22,0.28)"),
            gradient:
                "linear-gradient(154deg, rgb(18,5,0) 0%, rgb(180,83,9) 40%, rgb(249,115,22) 75%, rgb(251,191,36) 100%)",
            text: "#ffedd5",
        },
    ],
];

/**
 * Programs / tools section ("البرامج المستخدمة") — pixel-matched to Figma
 * node 820:1797. Arabic title + gradient underline, then ten gradient tool
 * pills laid out in 3 / 4 / 3 rows (each row wraps on narrow screens).
 */
const ProgramsSection: React.FC = () => {
    return (
        <section
            id="programs"
            className="scroll-section relative min-h-screen w-full bg-[#040404] flex items-center justify-center overflow-hidden py-20"
        >
            {/* Purple glow — top-right, rotated (Figma 829:3811) */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1000px",
                    height: "500px",
                    top: "-120px",
                    right: "-260px",
                    transform: "rotate(-58deg)",
                    background: "linear-gradient(177deg, rgba(187,161,254,0.4) 2%, rgba(33,13,83,0.6) 98%)",
                    filter: "blur(220px)",
                    borderRadius: "50%",
                }}
            />

            <div className="relative z-10 w-full mx-auto flex flex-col items-center" style={{ gap: "64px" }}>
                {/* Title + underline (Figma 829:3629) */}
                <div className="flex flex-col items-center px-6" style={{ gap: "14px" }}>
                    <h2
                        className="text-white text-center whitespace-nowrap"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 500,
                            fontSize: "clamp(2rem, 5vw, 48px)",
                            lineHeight: 1,
                            letterSpacing: "-0.72px",
                        }}
                    >
                        البرامج المستخدمة
                    </h2>
                    <div
                        style={{
                            width: "512px",
                            maxWidth: "82vw",
                            height: "3px",
                            borderRadius: "2px",
                            background:
                                "linear-gradient(90deg, rgba(139,92,246,0) 0%, #C084FC 50%, rgba(139,92,246,0) 100%)",
                        }}
                    />
                </div>

                {/* Tool pills — 3 / 4 / 3 rows (Figma 829:3640) */}
                <div
                    dir="ltr"
                    className="flex flex-col items-center w-full px-6"
                    style={{ gap: "21px", maxWidth: "900px" }}
                >
                    {ROWS.map((row, r) => (
                        <div key={r} className="flex flex-wrap gap-4 items-center justify-center">
                            {row.map((program) => (
                                <ProgramIcon key={program.id} program={program} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramsSection;
