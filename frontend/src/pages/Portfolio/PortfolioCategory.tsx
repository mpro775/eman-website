import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import BrushIcon from "../../assets/icons/brush.svg";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Container from "../../components/common/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import { useSEO } from "../../hooks/useSEO";
import { projectsService } from "../../services/projects.service";

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
  projectLink?: string;
}



// Category mapping
const categoryMapping: Record<string, { title: string; titleAr: string }> = {
  "ux-ui": { title: "UX / UI", titleAr: "تصميم واجهات" },
  "mobile": { title: "Mobile App", titleAr: "تطبيقات الموبايل" },
  "graphic": { title: "Graphic Design", titleAr: "التصميم الجرافيكي" },
};

const PortfolioCard: React.FC<{
  item: PortfolioItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ item, index, isExpanded, onToggle }) => {
  const hasProjectLink =
    typeof item.projectLink === "string" &&
    item.projectLink.trim().length > 0 &&
    item.projectLink.trim() !== "#";
  const panelPath = `M 12 10 L 32 10 C 42 10 43 5 50 4 C 58 5 59 10 70 10 L 96 10 C 99 11 100 13 100 16 L 100 88 A 12 12 0 0 1 88 100 L 12 100 A 12 12 0 0 1 0 88 L 0 16 C 0 13 1 11 4 10 Z`;
  // Panel colors and opacity controls
  const panelFill = "rgba(255, 254, 248, 0.7)"; // Panel fill color and opacity
  const panelStroke = "rgba(255, 255, 255, 0.76)"; // Panel stroke color and opacity

  // Glass effect settings (مثل الكود الذي أعجبك)
  const glassBlur = 20; // px
  const shadowOpacity = 0.30;
  const clipPathId = `panel-clip-${item.id}-${index}`;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* Card Container */}
      <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
        </div>

        {/* Sliding Panel - تصعد من الأسفل بدون تمدد */}
        <motion.div
          onClick={onToggle}
          className="absolute bottom-0 left-0 right-0 cursor-pointer h-[70%] select-none"
          initial={false}
          animate={{
            // يظهر 20% فقط عند الإخفاء (مخفي 80%)
            y: isExpanded ? 0 : "65%",
          }}
          transition={{
            duration: 0.55,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Shape Container */}
          <div className="relative h-full" style={{ filter: `drop-shadow(0px 20px 10px rgba(0, 0, 0, ${shadowOpacity}))` }}>
            {/* SVG Definitions for clipPath and mask */}
            <svg className="absolute w-0 h-0" aria-hidden="true">
              <defs>
                <clipPath id={clipPathId} clipPathUnits="userSpaceOnUse">
                  <path d={panelPath} />
                </clipPath>
                <mask id={`panel-mask-${item.id}-${index}`}>
                  <rect width="100" height="100" fill="white" />
                  <path d={panelPath} fill="black" />
                </mask>
              </defs>
            </svg>

            {/* Glass Layer (طبقة blur على صورة الخلفية) - استخدام SVG مباشرة */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id={`blur-${item.id}-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation={glassBlur / 2} />
                </filter>
              </defs>
              <image
                href={item.image}
                x="0"
                y="0"
                width="100"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                filter={`url(#blur-${item.id}-${index})`}
                clipPath={`url(#${clipPathId})`}
              />
            </svg>

            {/* White Background Shape (خلفية بيضاء) */}
            {/* <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d={panelPath}
                fill="rgba(255, 255, 255, 0.84)"
                vectorEffect="non-scaling-stroke"
              />
            </svg> */}

            {/* Panel Shape (الخلفية + الندبة + البوردر كقطعة واحدة) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d={panelPath}
                fill={panelFill}
                stroke={panelStroke}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Glass Borders (بوردرات شفافة على الحواف - كما في المثال) */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                borderTop: '2px solid rgba(225, 225, 225, 0.2)',
                borderLeft: '1px solid rgba(225, 225, 225, 0.1)',
                borderRight: '1px solid rgba(225, 225, 225, 0.89)',
                clipPath: `url(#${clipPathId})`,
              }}
            />

            {/* Chevron (كما في الصورة: أعلى المنتصف) */}
            <div className="absolute top-5 left-0 right-0 flex justify-center pointer-events-none z-20">
              <motion.div
                initial={false}
                animate={{ rotate: isExpanded ? 0 : 180 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  className="text-[#c77e8c]"
                  fill="none"
                >
                  <path
                    d="M1 1L6 5L11 1"
                    stroke="currentColor"
                    strokeWidth="1.08"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative h-full px-6 pt-8 pb-6 text-right flex flex-col z-30">
              {/* Header */}
              <div className="flex items-center justify-between gap-4">

                <div className="min-w-0 flex-1 text-right">
                  <h3
                    className="text-[#7a3b1c] truncate"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 700,
                      fontSize: '21.57px',
                      lineHeight: '130%',
                      letterSpacing: '0%',
                    }}
                  >
                    {item.titleAr}
                  </h3>
                  {isExpanded && (
                    <p className="text-gray-700 text-sm mt-1 truncate">
                      {item.subtitleAr}
                    </p>
                  )}
                </div>


                {/* Icon box (كما في الصورة: مربع أيقونة ثابت في أقصى اليسار) */}
                <div className="w-11 h-11 rounded-2xl bg-[#c77e8c] flex items-center justify-center shadow-lg shrink-0 mt-2">
                  <img src={BrushIcon} alt="brush" className="w-6 h-6" />
                </div>
              </div>

              {/* Body (ثابت ضمن اللوحة، مع تمرير عند الحاجة) */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  y: isExpanded ? 0 : 8,
                }}
                transition={{ duration: 0.25 }}
                className={`mt-5 flex-1 overflow-y-auto ${isExpanded ? "pointer-events-auto" : "pointer-events-none"
                  }`}
              >
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.descriptionAr}
                </p>

                <div className="mt-5 flex flex-wrap justify-end gap-2">
                  {item.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-200/70 text-purple-900 border border-purple-300/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {hasProjectLink && (
                  <div className="mt-6 flex justify-start">
                    <a
                      href={item.projectLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#c77e8c] text-white shadow-md hover:opacity-95 transition-opacity"
                    >
                      <span>عرض المشروع</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="opacity-95"
                      >
                        <path
                          d="M10 14L21 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 3H21V9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 14V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const categoryNameMap: Record<string, string> = {
  "ux-ui": "UX / UI",
  "mobile": "Mobile App",
  "graphic": "Graphic Design",
};

const PortfolioCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Get category data
  const categoryKey = category || "ux-ui";
  const categoryInfo = categoryMapping[categoryKey] || categoryMapping["ux-ui"];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const categories = await projectsService.getCategories();
        const targetCategoryName = categoryNameMap[categoryKey];
        const targetCategory = categories.find(cat => cat.name === targetCategoryName);

        if (targetCategory) {
          const response = await projectsService.getAll({ category: targetCategory._id });
          const projects = response.data || [];
          const mapped: PortfolioItem[] = projects.map((p, index) => ({
            id: index + 1,
            title: p.name,
            titleAr: p.titleAr || p.name,
            subtitle: p.subtitle || "",
            subtitleAr: p.subtitleAr || "",
            description: p.description,
            descriptionAr: p.descriptionAr || p.description,
            category: typeof p.category === "object" ? p.category.name : "",
            categoryAr: typeof p.category === "object" ? p.category.name : "",
            image: p.image,
            tools: p.tools || [],
            projectLink: p.projectLink || "#",
          }));
          setItems(mapped);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio projects:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [categoryKey]);

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
          <SectionTitle title={categoryInfo.title} maxWidth="200px" centered />

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
            {!loading && items.length === 0 && (
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

            {/* Loading State */}
            {loading && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-text-secondary text-lg">
                  جاري تحميل المشاريع...
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
