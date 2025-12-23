import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowUpRight, HiOutlineChatBubbleLeft, HiOutlineHeart } from "react-icons/hi2";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Container from "../../components/common/Container";
import { useSEO } from "../../hooks/useSEO";

// Blog post interface
interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  comments: number;
  likes: string;
  categoryColor?: string;
}

// Extended blog posts data for the full page
const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "A Decisive Victory for Progressive Policies",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    comments: 124,
    likes: "10k",
    categoryColor: "text-accent-pink",
  },
  {
    id: 2,
    title: "Tech Giants Unveil Cutting-Edge AI Innovations",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    comments: 124,
    likes: "10k",
    categoryColor: "text-accent-cyan",
  },
  {
    id: 3,
    title: "COVID-19 Variants",
    category: "Health",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    comments: 124,
    likes: "10k",
    categoryColor: "text-green-400",
  },
  {
    id: 4,
    title: "A Decisive Victory for Progressive Policies",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    comments: 128,
    likes: "15k",
    categoryColor: "text-accent-pink",
  },
  {
    id: 5,
    title: "Tech Giants Unveil Cutting-Edge AI Innovations",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    comments: 89,
    likes: "8k",
    categoryColor: "text-accent-cyan",
  },
  {
    id: 6,
    title: "COVID-19 Variants",
    category: "Health",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
    comments: 256,
    likes: "20k",
    categoryColor: "text-green-400",
  },
  {
    id: 7,
    title: "A Decisive Victory for Progressive Policies",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
    comments: 67,
    likes: "5k",
    categoryColor: "text-accent-pink",
  },
  {
    id: 8,
    title: "Tech Giants Unveil Cutting-Edge AI Innovations",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    comments: 312,
    likes: "25k",
    categoryColor: "text-accent-cyan",
  },
  {
    id: 9,
    title: "COVID-19 Variants",
    category: "Health",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
    comments: 145,
    likes: "12k",
    categoryColor: "text-green-400",
  },
];

// Blog Card Component
const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Card */}
      <Link to={`/blog/${post.id}`}>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-accent-purple/10">
          {/* Image */}
          <div className="relative h-48 md:h-52 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-60"></div>

            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md ${post.categoryColor || 'text-white'}`}>
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            {/* Title */}
            <h3 className="text-white text-base md:text-lg font-semibold mb-2 line-clamp-2 text-right group-hover:text-accent-pink transition-colors duration-300">
              {post.title}
            </h3>

            {/* Category */}
            <p className="text-text-muted text-sm text-right mb-4">
              {post.category}
            </p>

            {/* Footer: Read More & Stats */}
            <div className="flex flex-row-reverse items-center justify-between pt-4 border-t border-white/10">
              {/* Read More Button */}
              <button className="flex items-center gap-2 text-accent-pink text-sm font-medium hover:text-accent-pink-light transition-colors duration-300 group/btn">
                <HiArrowUpRight className="text-base transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                <span>قراءة المزيد</span>
              </button>

              {/* Stats */}
              <div className="flex items-center gap-4 text-text-muted text-sm">
                {/* Likes */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-1 transition-colors duration-300 ${isLiked ? 'text-red-500' : 'hover:text-red-400'}`}
                >
                  <span>{post.likes}</span>
                  <HiOutlineHeart className={`text-base ${isLiked ? 'fill-current' : ''}`} />
                </button>

                {/* Comments */}
                <div className="flex items-center gap-1 hover:text-accent-cyan transition-colors duration-300 cursor-pointer">
                  <span>{post.comments}</span>
                  <HiOutlineChatBubbleLeft className="text-base" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

// Filter Button Component
const FilterButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
      ? "bg-gradient-to-r from-accent-pink to-accent-pink-dark text-white shadow-glow-pink"
      : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/10"
      }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
  </motion.button>
);

const Blog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visiblePosts, setVisiblePosts] = useState<number>(9);

  // SEO optimization for blog page
  useSEO({
    title: 'المدونة',
    description: 'استكشف أحدث المقالات والأفكار في عالم التصميم والتكنولوجيا. مقالات متخصصة في UI/UX، تطوير التطبيقات، والتصميم الجرافيكي.',
    keywords: 'مدونة إيمان, مقالات تصميم, UI/UX, تطوير تطبيقات, تكنولوجيا, تصميم جرافيك, Figma, Adobe XD',
    url: '/blog',
  });

  const filters = [
    { id: "all", label: "الكل" },
    { id: "technology", label: "التكنولوجيا" },
    { id: "politics", label: "السياسة" },
    { id: "health", label: "الصحة" },
  ];

  // Filter posts based on active filter
  const filteredPosts = activeFilter === "all"
    ? allBlogPosts
    : allBlogPosts.filter(post => post.category.toLowerCase() === activeFilter);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < filteredPosts.length;

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="pt-32 pb-20">
        {/* Background gradient effects */}
        <div className="fixed top-0 right-0 w-[30%] h-[40%] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-0 left-0 w-[25%] h-[30%] bg-accent-pink/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <Container>
          {/* Page Title */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-accent-pink text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              المدونة
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
              استكشف أحدث المقالات والأفكار في عالم التصميم والتكنولوجيا
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filters.map((filter) => (
              <FilterButton
                key={filter.id}
                label={filter.label}
                isActive={activeFilter === filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setVisiblePosts(9);
                }}
              />
            ))}
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {displayedPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-text-secondary text-lg">
                لا توجد مقالات في هذا التصنيف حالياً
              </p>
            </motion.div>
          )}

          {/* Load More Button */}
          {hasMorePosts && (
            <motion.div
              className="flex justify-center mt-12 md:mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={loadMorePosts}
                className="bg-transparent border border-accent-pink text-accent-pink px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-accent-pink hover:text-white hover:shadow-glow-pink"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                تحميل المزيد
              </motion.button>
            </motion.div>
          )}

          {/* Stats Section */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { value: "50+", label: "مقالة منشورة" },
              { value: "10k+", label: "قارئ شهري" },
              { value: "500+", label: "تعليق" },
              { value: "3k+", label: "مشاركة" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-accent-pink/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-accent-pink mb-2">
                  {stat.value}
                </h3>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
