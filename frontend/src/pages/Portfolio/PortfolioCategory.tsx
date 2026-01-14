import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Container from "../../components/common/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import { useSEO } from "../../hooks/useSEO";
import { ViewProvider } from "../../context/ViewContext";

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
      descriptionAr: "لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر ر",
      category: "UX/UI Design",
      categoryAr: "تصميم UX/UI",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tools: ["Figma", "Adobe XD", "Photoshop"],
      projectLink: "#",
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
      projectLink: "#",
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
      projectLink: "#",
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
      projectLink: "#",
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
      projectLink: "#",
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
      projectLink: "#",
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
      projectLink: "#",
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
      projectLink: "#",
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
      projectLink: "#",
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
      projectLink: "#",
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
      projectLink: "#",
    },
  ],
};

// Category mapping
const categoryMapping: Record<string, { title: string; titleAr: string }> = {
  "ux-ui": { title: "UX / UI", titleAr: "تصميم واجهات" },
  "mobile": { title: "Mobile App", titleAr: "تطبيقات الموبايل" },
  "graphic": { title: "Graphic Design", titleAr: "التصميم الجرافيكي" },
};

// Portfolio Card Component with sliding panel design
// const PortfolioCard: React.FC<{
//   item: PortfolioItem;
//   index: number;
//   isExpanded: boolean;
//   onToggle: () => void;
// }> = ({ item, index, isExpanded, onToggle }) => {
//   return (
//     <motion.div
//       className="group relative"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.05 }}
//     >
//       {/* Card Container */}
//       <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
//         {/* Background Image */}
//         <div className="absolute inset-0">
//           <img
//             src={item.image}
//             alt={item.title}
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//           />
//           {/* Dark Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60"></div>
//         </div>

//         {/* Sliding Panel */}
//         <motion.div
//           onClick={onToggle}
//           className="absolute bottom-0 left-0 right-0 cursor-pointer"
//           initial={false}
//           animate={{
//             height: isExpanded ? "75%" : "auto",
//           }}
//           transition={{
//             duration: 0.5,
//             ease: [0.25, 0.1, 0.25, 1],
//           }}
//         >
//           <div className="relative h-full bg-gradient-to-b from-purple-100/95 via-purple-50/95 to-white/95 backdrop-blur-md rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
//             {/* Chevron Icon at top center when expanded */}
//             {isExpanded && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="flex justify-center pt-3 pb-2"
//               >
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   className="text-[#c77e8c]"
//                 >
//                   <path
//                     d="M5 9L12 15L19 9"
//                     stroke="currentColor"
//                     strokeWidth="2.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </motion.div>
//             )}

//             {/* Content Container */}
//             <div className="px-6 pb-6">
//               {/* Collapsed State Content */}
//               {!isExpanded && (
//                 <motion.div
//                   initial={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="py-4"
//                 >
//                   <div className="text-right">
//                     <h3 className="text-purple-900 text-xl font-bold mb-1">
//                       {item.titleAr}
//                     </h3>
//                     <p className="text-gray-700 text-sm">
//                       {item.subtitleAr}
//                     </p>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Expanded State Content */}
//               {isExpanded && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="h-full flex flex-col"
//                 >
//                   {/* Header with Title and Link Icon - RTL Layout */}
//                   <div className="flex items-start justify-between mb-4 flex-row-reverse">
//                     {/* Title on Left (RTL) */}
//                     <h3 className="text-[#8B4513] text-2xl font-bold text-right flex-1 ml-4">
//                       {item.titleAr}
//                     </h3>

//                     {/* Link Icon on Right (RTL) */}
//                     <div className="w-12 h-12 rounded-2xl bg-[#c77e8c] flex items-center justify-center flex-shrink-0 shadow-lg">
//                       <svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 26 26"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M11.2474 19.8098C11.0856 19.8098 10.9347 19.7667 10.7945 19.6696C10.568 19.5187 10.4386 19.2706 10.4386 19.0011C10.4386 18.8393 10.4278 18.6668 10.4063 18.4942C10.3092 17.7286 9.96412 17.06 9.3818 16.4776C8.79947 15.8953 8.07696 15.5287 7.30053 15.4316C7.17112 15.4208 6.9878 15.4101 6.81526 15.4208C6.53488 15.4424 6.27607 15.3238 6.11431 15.0973C5.95256 14.8816 5.90942 14.5905 5.99569 14.3317C6.15745 13.8895 6.39469 13.4905 6.67507 13.167L8.33577 11.075C11.1935 7.50554 16.9844 3.21359 21.2224 1.50976C22.1174 1.16468 23.0772 1.36957 23.735 2.01659C24.4144 2.69597 24.6193 3.66651 24.2634 4.55078C22.5596 8.79959 18.2784 14.5797 14.709 17.4374L12.5846 19.1412C12.1856 19.4324 11.8621 19.6157 11.5386 19.7451C11.4523 19.7883 11.3444 19.8098 11.2474 19.8098Z"
//                           fill="white"
//                         />
//                         <path
//                           d="M4.39984 24.5331C3.59105 24.5331 2.81462 24.2096 2.2323 23.6272C1.5637 22.9587 1.24019 22.0312 1.34803 21.0823L1.63919 18.4295C1.91957 15.7982 4.07632 13.8464 6.7507 13.7924C6.95559 13.7817 7.22519 13.7924 7.47322 13.814C8.64865 13.965 9.69468 14.4934 10.5358 15.3345C11.3662 16.1649 11.8622 17.157 12.0132 18.2677C12.0455 18.505 12.0671 18.7638 12.0671 18.9902C12.0671 20.4137 11.5171 21.7401 10.525 22.743C9.69467 23.5625 8.62708 24.0694 7.4193 24.2204L4.7557 24.5115C4.63708 24.5223 4.51846 24.5331 4.39984 24.5331Z"
//                           fill="white"
//                         />
//                       </svg>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="flex-1 overflow-y-auto">
//                     <p className="text-gray-700 text-sm leading-relaxed text-right mb-6">
//                       {item.descriptionAr}
//                     </p>

//                     {/* Tools */}
//                     <div className="flex flex-wrap justify-end gap-2">
//                       {item.tools.map((tool, idx) => (
//                         <span
//                           key={idx}
//                           className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-200/80 text-purple-900 border border-purple-300/50"
//                         >
//                           {tool}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };


const PortfolioCard: React.FC<{
  item: PortfolioItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ item, index, isExpanded, onToggle }) => {
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
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
        </div>

        {/* Sliding Panel */}
        <motion.div
          onClick={onToggle}
          className="absolute bottom-0 left-0 right-0 cursor-pointer"
          initial={false}
          animate={{ height: isExpanded ? "78%" : "auto" }}
          transition={{
            duration: 0.55,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Shape Container */}
          <div className="relative h-full">
            <WavyPanelShape />

            {/* Content Layer */}
            <div className="relative px-6 pt-6 pb-6 text-right backdrop-blur-md">
              {/* Chevron */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center mb-3"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-[#c77e8c]"
                    fill="none"
                  >
                    <path
                      d="M5 9L12 15L19 9"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Collapsed */}
              {!isExpanded && (
                <div className="py-4">
                  <h3 className="text-purple-900 text-xl font-bold mb-1">
                    {item.titleAr}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {item.subtitleAr}
                  </p>
                </div>
              )}

              {/* Expanded */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between flex-row-reverse mb-4">
                    <h3 className="text-[#8B4513] text-2xl font-bold flex-1 ml-4">
                      {item.titleAr}
                    </h3>

                    <div className="w-12 h-12 rounded-2xl bg-[#c77e8c] flex items-center justify-center shadow-lg">
                      {/* Link Icon */}
                      {/* (نفس SVG الذي لديك بدون تغيير) */}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                      {item.descriptionAr}
                    </p>

                    <div className="flex flex-wrap justify-end gap-2">
                      {item.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 rounded-full text-xs font-medium
                                     bg-purple-200/80 text-purple-900
                                     border border-purple-300/50"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
const WavyPanelShape = () => (
  <svg
    viewBox="0 0 360 320"
    preserveAspectRatio="none"
    className="absolute inset-0 w-full h-full"
  >
    <defs>
      <linearGradient id="panelGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(237,233,254,0.95)" />
        <stop offset="60%" stopColor="rgba(245,243,255,0.95)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
      </linearGradient>
    </defs>

    <path
      d="
        M0,40
        C120,0 240,0 360,40
        L360,280
        C360,305 335,320 310,320
        L50,320
        C25,320 0,305 0,280
        Z
      "
      fill="url(#panelGradient)"
    />
  </svg>
);


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
    <ViewProvider>
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
    </ViewProvider>
  );
};

export default PortfolioCategory;
