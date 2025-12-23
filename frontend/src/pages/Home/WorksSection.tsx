import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import mobileAppImage from "../../assets/images/mobileApp.png";
import uiUxImage from "../../assets/images/UI UX.png";
import graphicImage from "../../assets/images/Graphic.png";

interface WorkItem {
  id: number;
  title: string;
  image: string;
  slug: string;
}

const WorksSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  const [activeIndex, setActiveIndex] = useState(1); // UX/UI Design is the default active one
  const navigate = useNavigate();

  const works: WorkItem[] = [
    {
      id: 1,
      title: "Mobile App Design",
      image: mobileAppImage,
      slug: "mobile",
    },
    {
      id: 2,
      title: "UX/UI Design",
      image: uiUxImage,
      slug: "ux-ui",
    },
    {
      id: 3,
      title: "Graphic design",
      image: graphicImage,
      slug: "graphic",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const handleCardClick = (index: number, slug: string) => {
    if (index === activeIndex) {
      // If already active, navigate to portfolio page
      navigate(`/portfolio/${slug}`);
    } else {
      // Otherwise, make it active
      setActiveIndex(index);
    }
  };

  return (
    <section
      id="portfolio"
      ref={ref}
      className="scroll-section relative min-h-screen w-full bg-gradient-to-b from-[#1a0e2e] via-[#0f0a1a] to-[#0a0a0f] flex items-center justify-center pt-[100px] pb-20"
    >
      {/* Purple gradient background effect */}
      <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-accent-purple/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full relative z-10"
        >
          {/* العنوان الرئيسي */}
          <motion.div
            variants={itemVariants}
            className="mb-16 text-right flex justify-end"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 relative inline-block">
              أعمالي
              {/* الخط الأرجواني تحت العنوان */}
              <span className="absolute bottom-[-8px] right-0 w-20 h-0.5 bg-accent-purple"></span>
            </h2>
          </motion.div>

          {/* Carousel Container */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-12"
          >
            {/* Cards Container - Slider */}
            <div className="relative w-full max-w-7xl mx-auto px-4 overflow-visible">
              <div className="relative flex items-center justify-center h-[500px] md:h-[600px]">
                {works.map((work, index) => {
                  const isActive = index === activeIndex;
                  const offset = index - activeIndex;
                  // المسافة بين البطاقات: 120% من عرض البطاقة
                  const position = offset * 120; // نسبة مئوية من العرض

                  return (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, scale: 0.8, x: `${position}%` }}
                      animate={{
                        opacity: isActive ? 1 : 0.6,
                        scale: isActive ? 1 : 0.8,
                        x: `${position}%`,
                        filter: isActive ? "blur(0px)" : "blur(3px)",
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="absolute w-full max-w-sm md:max-w-md lg:max-w-lg"
                      style={{
                        zIndex: isActive ? 20 : 10 - Math.abs(offset),
                      }}
                      onClick={() => handleCardClick(index, work.slug)}
                    >
                      <div
                        className={`relative rounded-2xl overflow-hidden backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-[#2a1a3e]/95 border-accent-purple/60 shadow-[0_0_50px_rgba(157,78,221,0.6)]"
                            : "bg-[#1e1e2e]/90 border-accent-purple/20 hover:border-accent-purple/40"
                        }`}
                      >
                        {/* Card Image Container */}
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center p-6 md:p-8 bg-gradient-to-b from-transparent to-black/20">
                          <img
                            src={work.image}
                            alt={work.title}
                            className={`w-full h-full object-contain transition-all duration-300 ${
                              isActive ? "scale-105" : "scale-100"
                            }`}
                          />
                        </div>

                        {/* Card Title */}
                        <div className="p-5 md:p-6 text-center border-t border-accent-purple/20 bg-black/20">
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                            {work.title}
                          </h3>
                        </div>

                        {/* Active indicator glow effect */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-purple/20 via-transparent to-transparent pointer-events-none"></div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + works.length) % works.length
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-accent-purple/20 hover:bg-accent-purple/40 backdrop-blur-md border border-accent-purple/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % works.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-accent-purple/20 hover:bg-accent-purple/40 backdrop-blur-md border border-accent-purple/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2.5 md:gap-3">
              {works.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "w-10 md:w-12 h-1.5 md:h-2 bg-accent-pink"
                      : "w-6 md:w-8 h-1.5 md:h-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WorksSection;
