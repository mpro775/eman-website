import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiFolder } from "react-icons/fi";
import { resolveImageUrl } from "../../../utils/imageUrl";
import type { ProjectCategory } from "../../../types/project.types";

interface CategoryCardStackProps {
  category: ProjectCategory;
  onClick: () => void;
  index?: number;
}

export const CategoryCardStack: React.FC<CategoryCardStackProps> = ({
  category,
  onClick,
  index = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Extract preview projects (up to 3)
  const rawProjects = category.previewProjects || [];
  const count = category.projectsCount ?? rawProjects.length;

  // Build 3 cards array. If fewer than 3, duplicate or provide fallback placeholders
  const cardImages: string[] = [];
  if (rawProjects.length > 0) {
    cardImages.push(resolveImageUrl(rawProjects[0]?.image));
    cardImages.push(resolveImageUrl(rawProjects[1]?.image || rawProjects[0]?.image));
    cardImages.push(resolveImageUrl(rawProjects[2]?.image || rawProjects[0]?.image));
  } else {
    // Empty state placeholders
    cardImages.push("");
    cardImages.push("");
    cardImages.push("");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer flex flex-col items-center w-full max-w-[360px] mx-auto py-2"
      dir="rtl"
    >
      {/* Cards Stack Container */}
      <div className="relative w-full h-[320px] sm:h-[340px] flex items-center justify-center">
        {/* Glow backdrop effect on hover */}
        <div
          className={`absolute inset-2 rounded-3xl bg-gradient-to-tr from-[#c67588]/40 via-[#8b5cf6]/30 to-[#603942]/50 blur-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100 scale-110" : "opacity-30 scale-95"
          }`}
        />

        {/* --- CARD 3 (Left Layer) --- */}
        <motion.div
          animate={
            isHovered
              ? { x: -68, y: -16, rotate: -16, scale: 0.98 }
              : { x: -34, y: -8, rotate: -10, scale: 0.94 }
          }
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="absolute w-[84%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/30 bg-[#0e0d1d] shadow-[0_12px_30px_rgba(0,0,0,0.6)] z-10 group-hover:border-[#8b5cf6]/50 transition-colors duration-300"
        >
          {cardImages[2] ? (
            <img
              src={cardImages[2]}
              alt=""
              className="w-full h-full object-cover brightness-90 group-hover:brightness-105 group-hover:scale-105 transition-all duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1429] to-[#0a0814] flex items-center justify-center">
              <FiFolder className="w-10 h-10 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>

        {/* --- CARD 2 (Right Layer) --- */}
        <motion.div
          animate={
            isHovered
              ? { x: 68, y: -16, rotate: 16, scale: 0.98 }
              : { x: 34, y: -8, rotate: 10, scale: 0.94 }
          }
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="absolute w-[84%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/30 bg-[#0e0d1d] shadow-[0_12px_30px_rgba(0,0,0,0.6)] z-20 group-hover:border-[#c67588]/50 transition-colors duration-300"
        >
          {cardImages[1] ? (
            <img
              src={cardImages[1]}
              alt=""
              className="w-full h-full object-cover brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#211633] to-[#0c0919] flex items-center justify-center">
              <FiFolder className="w-10 h-10 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>

        {/* --- CARD 1 (Center / Front Main Layer) --- */}
        <motion.div
          animate={
            isHovered
              ? { y: 6, scale: 1.02, rotate: 0 }
              : { y: 12, scale: 0.98, rotate: 0 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="absolute w-[85%] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/40 bg-[#141226] shadow-[0_20px_45px_rgba(0,0,0,0.8)] z-30 group-hover:border-[#c67588] transition-all duration-300"
        >
          {cardImages[0] ? (
            <img
              src={cardImages[0]}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2a1d40] to-[#120d20] flex flex-col items-center justify-center gap-3">
              <FiFolder className="w-12 h-12 text-[#c67588]" />
              <span className="text-white/40 text-xs font-arabic">لا توجد أعمال بعد</span>
            </div>
          )}
          {/* Overlay gradient for front card text/badge readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Top Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-white text-xs font-medium font-arabic flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#c67588] animate-pulse" />
            <span>{count} {count === 1 ? "عمل" : "أعمال"}</span>
          </div>
        </motion.div>
      </div>

      {/* Category Info Footer */}
      <div className="mt-4 text-center flex flex-col items-center gap-2 z-40 w-full px-2">
        <h3
          className="text-white text-xl sm:text-2xl font-bold font-arabic tracking-wide group-hover:text-[#c67588] transition-colors duration-300"
          style={{ fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif' }}
        >
          {category.name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-[#a5a0c8] group-hover:text-white transition-colors duration-300">
          <span>استكشف أعمال الفئة</span>
          <motion.div
            animate={isHovered ? { x: -6 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <FiArrowLeft className="w-4 h-4 text-[#c67588]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCardStack;
