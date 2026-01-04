import React from "react";
import { motion } from "framer-motion";
import { Container, SectionTitle } from "../../../components";
import ProgramIcon, { type Program } from "./ProgramIcon";

// Assets
import aiIcon from "../../../assets/skills/ai.png";
import figmaIcon from "../../../assets/skills/figma.png";
import indesignIcon from "../../../assets/skills/id.png";
import photoshopIcon from "../../../assets/skills/photoshop.png";
import vscodeIcon from "../../../assets/skills/vscode.png";

// Grid data
const programs: Program[] = [
    { id: 1, name: "VS Code", image: vscodeIcon },
    { id: 2, name: "InDesign", image: indesignIcon },
    { id: 3, name: "Illustrator", image: aiIcon },
    { id: 4, name: "Photoshop", image: photoshopIcon },
    { id: 5, name: "Figma", image: figmaIcon },
];

/**
 * Technical stack / programs used section
 */
const ProgramsSection: React.FC = () => {
    return (
        <section
            id="programs"
            className="scroll-section relative min-h-screen w-full bg-bg-primary overflow-hidden flex flex-col items-center justify-center py-20"
        >
            {/* Bottom-Left Blur Glow Effect */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "566px",
                    left: "9    66px",
                    transform: "rotate(121.23deg)",
                    background: "linear-gradient(177.25deg, rgba(187, 161, 254, 0.8) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)",
                    filter: "blur(488px)",
                    borderRadius: "50%",
                }}
            ></div>

            <Container>
                {/* Section Title */}
                <SectionTitle title="البرامج المستخدمة" maxWidth="350px" />

                {/* Icons Grid */}
                <motion.div
                    className="relative z-10 flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {programs.map((program, index) => (
                        <ProgramIcon key={program.id} program={program} index={index} />
                    ))}
                </motion.div>
            </Container>
        </section>
    );
};

export default ProgramsSection;
