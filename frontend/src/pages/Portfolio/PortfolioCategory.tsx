import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { HiArrowRight, HiXMark } from "react-icons/hi2";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Container from "../../components/common/Container";
import { useSEO } from "../../hooks/useSEO";

// Portfolio item interface
interface PortfolioItem {
  id: number;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  image: string;
  tools: string[];
}

// Portfolio data
const portfolioData: Record<string, PortfolioItem[]> = {
  "ux-ui": [
    {
      id: 1,
      title: "Kleim",
      titleAr: "كليـــم",
      subtitle: "E-commerce Dashboard Management",
      subtitleAr: "لإدارة المتاجر الإلكترونية",
      description: "A comprehensive e-commerce dashboard solution for managing online stores, featuring intuitive analytics, order management, and customer insights. Built with modern design principles to ensure a seamless user experience.",
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tools: ["Figma", "Adobe XD", "Photoshop"],
    },
    {
      id: 2,
      title: "Kleim",
      titleAr: "كليـــم",
      subtitle: "Analytics Platform",
      subtitleAr: "لإدارة المتاجر الإلكترونية",
      description: "Advanced analytics platform with real-time data visualization and reporting capabilities.",
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tools: ["Figma", "Sketch"],
    },
    {
      id: 3,
      title: "Kleim",
      titleAr: "كليـــم",
      subtitle: "Inventory System",
      subtitleAr: "لإدارة المتاجر الإلكترونية",
      description: "Smart inventory management system with automated tracking and alerts.",
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      tools: ["Figma", "Adobe XD"],
    },
    {
      id: 4,
      title: "Kleim",
      titleAr: "كليـــم",
      subtitle: "Customer Portal",
      subtitleAr: "لإدارة المتاجر الإلكترونية",
      description: "Customer-facing portal for order tracking and account management.",
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tools: ["Figma"],
    },
    {
      id: 5,
      title: "Kleim",
      titleAr: "كليـــم",
      subtitle: "Mobile Dashboard",
      subtitleAr: "لإدارة المتاجر الإلكترونية",
      description: "Mobile-responsive dashboard for on-the-go store management.",
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tools: ["Figma", "Illustrator"],
    },
    {
      id: 6,
      title: "Kleim",
      titleAr: "كليـــم",
      subtitle: "Reports Module",
      subtitleAr: "لإدارة المتاجر الإلكترونية",
      description: "Comprehensive reporting module with export capabilities.",
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      tools: ["Figma", "Adobe XD"],
    },
    {
      id: 7,
      title: "Kleim",
      titleAr: "كليـــم",
      subtitle: "Settings Panel",
      subtitleAr: "لإدارة المتاجر الإلكترونية",
      description: "User settings and preferences panel.",
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tools: ["Figma"],
    },
    {
      id: 8,
      title: "Kleim",
      titleAr: "كليـــم",
      subtitle: "Notifications Center",
      subtitleAr: "لإدارة المتاجر الإلكترونية",
      description: "Centralized notifications management system.",
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tools: ["Figma", "Sketch"],
    },
    {
      id: 9,
      title: "Kleim",
      titleAr: "كليـــم",
      subtitle: "Help Center",
      subtitleAr: "لإدارة المتاجر الإلكترونية",
      description: "Help and documentation center.",
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      tools: ["Figma", "Adobe XD"],
    },
  ],
  "mobile": [
    {
      id: 1,
      title: "FitTrack",
      titleAr: "فيت تراك",
      subtitle: "Fitness App",
      subtitleAr: "تطبيق اللياقة البدنية",
      description: "A comprehensive fitness tracking application.",
      descriptionAr: "تطبيق شامل لتتبع اللياقة البدنية مع خطط التمارين وتتبع التغذية",
      category: "Mobile App Design",
      categoryAr: "تصميم تطبيقات الموبايل",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      tools: ["Figma", "Illustrator"],
    },
  ],
  "graphic": [
    {
      id: 1,
      title: "Nova",
      titleAr: "نوفا",
      subtitle: "Brand Identity",
      subtitleAr: "الهوية البصرية",
      description: "Complete brand identity design.",
      descriptionAr: "تصميم هوية العلامة التجارية الكاملة بما في ذلك الشعار ولوحة الألوان",
      category: "Graphic Design",
      categoryAr: "التصميم الجرافيكي",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
      tools: ["Illustrator", "Photoshop"],
    },
  ],
};

// Category mapping
const categoryMapping: Record<string, { title: string; titleAr: string }> = {
  "ux-ui": { title: "UX / UI", titleAr: "تصميم واجهات" },
  "mobile": { title: "Mobile App", titleAr: "تطبيقات الموبايل" },
  "graphic": { title: "Graphic Design", titleAr: "التصميم الجرافيكي" },
};

// Portfolio Card Component with Expandable Details
const PortfolioCard: React.FC<{
  item: PortfolioItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ item, index, isExpanded, onToggle }) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      layout
    >
      <motion.div
        onClick={onToggle}
        className={`relative bg-[#1e1e2e]/80 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${isExpanded
            ? "border-accent-purple/60 shadow-[0_0_40px_rgba(157,78,221,0.4)]"
            : "border-accent-purple/20 hover:border-accent-purple/40 hover:shadow-[0_0_20px_rgba(157,78,221,0.2)]"
          }`}
        layout
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <motion.div
            className={`relative overflow-hidden ${isExpanded ? 'md:w-1/2' : 'w-full'}`}
            layout
          >
            <div className="aspect-[4/3] md:aspect-auto md:h-full min-h-[200px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e2e]/90 via-[#1e1e2e]/30 to-transparent"></div>

              {/* Title Overlay on Image */}
              <div className="absolute bottom-0 right-0 left-0 p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239d4edd'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3C/svg%3E"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span className="text-accent-purple text-sm font-medium">kleim</span>
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold text-right">
                  {item.titleAr}
                </h3>
                <p className="text-text-secondary text-sm md:text-base text-right">
                  {item.subtitleAr}
                </p>
              </div>

              {/* Expand Icon */}
              {!isExpanded && (
                <div className="absolute bottom-4 left-4">
                  <div className="w-10 h-10 rounded-full bg-accent-pink/80 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Expanded Details Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="md:w-1/2 p-6 md:p-8 bg-[#f5f5f5] flex flex-col justify-between"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "50%" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-600 hover:bg-white hover:text-accent-purple transition-colors duration-300 z-10"
                >
                  <HiXMark className="text-lg" />
                </button>

                {/* Title */}
                <div className="mb-6">
                  <h3 className="text-accent-purple text-2xl md:text-3xl font-bold text-right mb-4">
                    {item.titleAr}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed text-right">
                    {item.descriptionAr}
                  </p>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap justify-end gap-2 mt-auto">
                  {item.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full text-sm bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Get category data
  const categoryKey = category || "ux-ui";
  const categoryInfo = categoryMapping[categoryKey] || categoryMapping["ux-ui"];
  const items = portfolioData[categoryKey] || portfolioData["ux-ui"];

  // SEO optimization for portfolio category page
  useSEO({
    title: `${categoryInfo.titleAr} - معرض الأعمال`,
    description: `استعرض أعمالي في ${categoryInfo.titleAr}. مجموعة من المشاريع الاحترافية في ${categoryInfo.title} التي تعكس خبرتي ومهاراتي.`,
    keywords: `${categoryInfo.titleAr}, ${categoryInfo.title}, معرض أعمال, portfolio, تصميم, إيمان`,
    url: `/portfolio/${categoryKey}`,
  });

  // All categories for navigation
  const allCategories = [
    { slug: "ux-ui", title: "UX / UI" },
    { slug: "mobile", title: "Mobile App" },
    { slug: "graphic", title: "Graphic Design" },
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="pt-32 pb-20">
        {/* Background Effects */}
        <div className="fixed top-0 right-0 w-[40%] h-[50%] bg-accent-purple/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-0 left-0 w-[30%] h-[40%] bg-accent-pink/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <Container>
          {/* Page Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {categoryInfo.title}
            </h1>
            <div className="w-24 h-1 bg-accent-purple mx-auto rounded-full"></div>
          </motion.div>

          {/* Category Navigation */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/portfolio/${cat.slug}`}
                onClick={() => setExpandedId(null)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${category === cat.slug
                    ? "bg-gradient-to-r from-accent-purple to-accent-purple-light text-white shadow-[0_0_20px_rgba(157,78,221,0.5)]"
                    : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
              >
                {cat.title}
              </Link>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10"
            layout
          >
            {items.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                isExpanded={expandedId === item.id}
                onToggle={() => toggleExpand(item.id)}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {items.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-text-secondary text-lg">
                لا توجد أعمال في هذا التصنيف حالياً
              </p>
            </motion.div>
          )}

          {/* Back Button */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/#portfolio"
              className="flex items-center gap-2 bg-transparent border border-accent-purple text-accent-purple px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-accent-purple hover:text-white hover:shadow-[0_0_20px_rgba(157,78,221,0.5)]"
            >
              <HiArrowRight className="text-lg" />
              <span>العودة للرئيسية</span>
            </Link>
          </motion.div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioCategory;
