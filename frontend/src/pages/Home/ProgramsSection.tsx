import React from "react";
import { motion } from "framer-motion";
import Container from "../../components/common/Container";

// Import program icons
import aiIcon from "../../assets/images/ai.png";
import figmaIcon from "../../assets/images/figma.png";
import indesignIcon from "../../assets/images/id.png";
import photoshopIcon from "../../assets/images/photoshop.png";
import vscodeIcon from "../../assets/images/vscode.png";

// Programs data with actual icons
const programs = [
  {
    id: 1,
    name: "VS Code",
    image: vscodeIcon,
  },
  {
    id: 2,
    name: "InDesign",
    image: indesignIcon,
  },
  {
    id: 3,
    name: "Illustrator",
    image: aiIcon,
  },
  {
    id: 4,
    name: "Photoshop",
    image: photoshopIcon,
  },
  {
    id: 5,
    name: "Figma",
    image: figmaIcon,
  },
];

const ProgramsSection: React.FC = () => {
  return (
    <section
      id="programs"
      className="scroll-section relative min-h-screen w-full bg-bg-primary overflow-hidden flex flex-col items-center justify-center py-20"
    >
      {/* Background gradient effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-accent-purple/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <Container>
        {/* Section Title */}
        <motion.div
          className="text-right mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            البرامج المستخدمة
          </h2>
          {/* الخط تحت العنوان - متدرج */}
          <div
            className="h-[3px] rounded-full mt-2"
            style={{
              background: 'linear-gradient(to left, #6366f1, #8b5cf6, transparent)',
              width: '100%',
              maxWidth: '350px',
            }}
          />
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          className="relative z-10 flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              className="group relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Card */}
              <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-accent-purple/10">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Program Image */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-contain transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-text-secondary text-xs whitespace-nowrap">
                  {program.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default ProgramsSection;
