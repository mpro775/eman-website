import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  name: string;
}

const sections: Section[] = [
  { id: "home", name: "الرئيسية" },
  { id: "experience", name: "الخبرات العملية" },
  { id: "services", name: "الخدمات" },
  { id: "portfolio", name: "أعمالي" },
  { id: "testimonials", name: "آراء العملاء" },
  { id: "programs", name: "البرامج" },
  { id: "blog", name: "المدونة" },
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

  const isFirstItem = (index: number) => index === 0;
  const isLastItem = (index: number) => index === sections.length - 1;

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
                ${isActive
                  ? "bg-accent-pink scale-125 shadow-glow-pink"
                  : "bg-white/30 hover:bg-white/50"
                }
              `}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />

            {/* Line BEFORE active dot - only show if not first item */}
            {isActive && !isFirstItem(index) && (
              <motion.div
                className="absolute left-1/2 bottom-full -translate-x-1/2 w-0.5"
                style={{
                  background: 'linear-gradient(to top, var(--color-accent-pink), transparent)',
                }}
                initial={{ height: 0 }}
                animate={{ height: 16 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Line AFTER active dot - only show if not last item */}
            {isActive && !isLastItem(index) && (
              <motion.div
                className="absolute left-1/2 top-full -translate-x-1/2 w-0.5"
                style={{
                  background: 'linear-gradient(to bottom, var(--color-accent-pink), transparent)',
                }}
                initial={{ height: 0 }}
                animate={{ height: 16 }}
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
