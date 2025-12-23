import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  name: string;
}

const sections: Section[] = [
  { id: "home", name: "الرئيسية" },
  { id: "about", name: "من أنا" },
  { id: "experience", name: "الخبرات العملية" },
  { id: "portfolio", name: "أعمالي" },
  { id: "contact", name: "تواصل معي" },
  { id: "footer", name: "الفوتر" },
];

const ScrollPagination: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          const element = document.getElementById(section.id);
          if (element) {
            observerRef.current?.unobserve(element);
          }
        });
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex-col gap-4">
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        return (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="relative group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            aria-label={`انتقل إلى ${section.name}`}
          >
            {/* Dot */}
            <motion.div
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  isActive
                    ? "bg-accent-pink scale-125 shadow-glow-pink"
                    : "bg-white/30 hover:bg-white/50"
                }
              `}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />

            {/* Active indicator line */}
            {isActive && (
              <motion.div
                className="absolute right-1/2 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-accent-pink"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Tooltip on hover */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg text-sm text-text-primary whitespace-nowrap">
                {section.name}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ScrollPagination;
