import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  HiArrowUpRight,
  HiOutlineChatBubbleLeft,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineBookmark,
  HiArrowRight,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineUser
} from "react-icons/hi2";
import Footer from "../../components/layout/Footer";
import Container from "../../components/common/Container";
import { useSEO } from "../../hooks/useSEO";
import { SEOSchema } from "../../components/common/SEOSchema";

// Blog post interface
interface BlogPost {
  id: number;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  image: string;
  comments: number;
  likes: string;
  views: string;
  publishDate: string;
  readingTime: string;
  author: string;
  authorImage: string;
  content: {
    intro: string;
    sections: {
      title: string;
      content: string;
    }[];
  };
}

// Sample blog posts data
const blogPostsData: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Artificial Intelligence in Healthcare",
    titleAr: "صعود الذكاء الاصطناعي في الرعاية الصحية",
    category: "Healthcare",
    categoryAr: "الرعاية الصحية",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    comments: 124,
    likes: "10k",
    views: "245k",
    publishDate: "October 15, 2023",
    readingTime: "10 Min",
    author: "Dr. Emily Walker",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: {
      intro: "Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system. In this blog post, we will delve into the diverse applications of AI in healthcare, from diagnostic imaging to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.",
      sections: [
        {
          title: "Predictive Analytics and Disease Prevention",
          content: "One of the most promising applications of AI in healthcare is its ability to predict and prevent diseases by analyzing vast amounts of patient data. Machine learning algorithms can identify patterns and risk factors that may not be immediately apparent to human clinicians. This enables earlier intervention and more effective prevention strategies, potentially saving countless lives and reducing healthcare costs."
        },
        {
          title: "AI in Diagnostic Imaging",
          content: "AI has made remarkable strides in the field of diagnostic imaging. Deep learning algorithms can analyze medical images such as X-rays, MRIs, and CT scans with incredible precision. These AI systems can detect subtle abnormalities that might be missed by human radiologists, leading to earlier and more accurate diagnoses of conditions ranging from cancer to cardiovascular disease."
        },
        {
          title: "Personalized Treatment Plans",
          content: "Every patient is unique, and AI is helping healthcare providers develop more personalized treatment plans. By analyzing a patient's genetic information, medical history, and lifestyle factors, AI can recommend treatments that are most likely to be effective for that individual. This personalized approach to medicine is revolutionizing how we treat chronic diseases and complex conditions."
        }
      ]
    }
  },
  {
    id: 2,
    title: "A Decisive Victory for Progressive Policies",
    titleAr: "انتصار حاسم للسياسات التقدمية",
    category: "Politics",
    categoryAr: "السياسة",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop",
    comments: 124,
    likes: "10k",
    views: "180k",
    publishDate: "October 10, 2023",
    readingTime: "8 Min",
    author: "John Smith",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content: {
      intro: "In a remarkable turn of events, progressive policies have gained significant ground in recent political developments. This shift represents a fundamental change in public sentiment and political discourse.",
      sections: [
        {
          title: "The Changing Political Landscape",
          content: "The political landscape is evolving rapidly, with voters increasingly favoring policies that address social inequality and environmental concerns."
        }
      ]
    }
  },
  {
    id: 3,
    title: "Tech Giants Unveil Cutting-Edge AI Innovations",
    titleAr: "عمالقة التكنولوجيا يكشفون عن ابتكارات الذكاء الاصطناعي المتقدمة",
    category: "Technology",
    categoryAr: "التكنولوجيا",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    comments: 89,
    likes: "15k",
    views: "320k",
    publishDate: "October 12, 2023",
    readingTime: "12 Min",
    author: "Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: {
      intro: "The world's leading technology companies have unveiled their latest AI innovations, promising to revolutionize industries from healthcare to transportation.",
      sections: [
        {
          title: "Breakthrough in Natural Language Processing",
          content: "New developments in NLP are enabling machines to understand and generate human language with unprecedented accuracy."
        }
      ]
    }
  }
];

// Related posts data
const relatedPosts = [
  {
    id: 4,
    title: "A Decisive Victory for Progressive Policies",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    comments: 124,
    likes: "10k",
  },
  {
    id: 5,
    title: "Tech Giants Unveil Cutting-Edge AI Innovations",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    comments: 124,
    likes: "10k",
  },
  {
    id: 6,
    title: "COVID-19 Variants",
    category: "Health",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    comments: 124,
    likes: "10k",
  },
];

// Meta Info Item Component
const MetaInfoItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
}> = ({ icon: Icon, label, value }) => (
  <div className="text-center">
    <p className="text-text-muted text-xs mb-1 flex items-center justify-center gap-1">
      <Icon className="text-sm" />
      <span>{label}</span>
    </p>
    <p className="text-white text-sm font-medium">{value}</p>
  </div>
);

// Related Post Card Component
const RelatedPostCard: React.FC<{
  post: typeof relatedPosts[0];
  index: number;
}> = ({ post, index }) => (
  <motion.article
    className="group relative"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link to={`/blog/${post.id}`}>
      <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-accent-purple/10">
        {/* Image */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <h3 className="text-white text-sm md:text-base font-semibold mb-2 line-clamp-2 text-right group-hover:text-accent-pink transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-text-muted text-xs text-right mb-3">
            {post.category}
          </p>

          {/* Footer */}
          <div className="flex flex-row-reverse items-center justify-between pt-3 border-t border-white/10">
            <button className="flex items-center gap-1 text-accent-pink text-xs font-medium hover:text-accent-pink-light transition-colors duration-300">
              <HiArrowUpRight className="text-sm" />
              <span>قراءة المزيد</span>
            </button>

            <div className="flex items-center gap-3 text-text-muted text-xs">
              <div className="flex items-center gap-1">
                <span>{post.likes}</span>
                <HiOutlineHeart className="text-sm" />
              </div>
              <div className="flex items-center gap-1">
                <span>{post.comments}</span>
                <HiOutlineChatBubbleLeft className="text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
);

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Find the blog post by ID
  const post = blogPostsData.find(p => p.id === Number(id)) || blogPostsData[0];

  // SEO optimization for blog detail page
  useSEO({
    title: post.titleAr || post.title,
    description: post.content.intro.substring(0, 160),
    keywords: `${post.categoryAr}, ${post.category}, مقالات, ${post.author}`,
    image: post.image,
    url: `/blog/${id}`,
    type: 'article',
    author: post.author,
    publishedTime: post.publishDate,
    section: post.categoryAr,
  });

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* SEO Schema for Article */}
      <SEOSchema
        type="article"
        data={{
          title: post.titleAr || post.title,
          description: post.content.intro.substring(0, 160),
          image: post.image,
          author: post.author,
          datePublished: post.publishDate,
          category: post.categoryAr,
        }}
      />

      {/* Hero Image Section */}
      <section className="relative w-full h-[45vh] md:h-[50vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay - Subtle shadow at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent"></div>
        </div>
      </section>

      {/* Title & Stats Section */}
      <section className="bg-bg-primary py-8 md:py-12">
        <Container>
          {/* Title - Centered */}
          <motion.h1
            className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post.title}
          </motion.h1>

          {/* Stats Row - Pills left, Meta right */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Left Side - Stats Pills */}
            <div className="flex items-center gap-3">
              {/* Send/Share */}
              <div className="flex items-center gap-2 bg-[#1a1a2e] border border-white/10 px-4 py-2 rounded-full">
                <HiArrowUpRight className="text-base text-white/70" />
                <span className="text-sm text-white/80">{post.comments}</span>
              </div>
              {/* Views */}
              <div className="flex items-center gap-2 bg-[#1a1a2e] border border-white/10 px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
                <span className="text-sm text-white/80">{post.views}</span>
              </div>
              {/* Likes - Orange/Pink Heart */}
              <div className="flex items-center gap-2 bg-[#1a1a2e] border border-white/10 px-4 py-2 rounded-full">
                <HiOutlineHeart className="text-base text-orange-500 fill-current" />
                <span className="text-sm text-white/80">{post.likes}</span>
              </div>
            </div>

            {/* Right Side - Meta Info */}
            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              <MetaInfoItem
                icon={HiOutlineCalendar}
                label="Publication Date"
                value={post.publishDate}
              />
              <MetaInfoItem
                icon={HiOutlineBookmark}
                label="Category"
                value={post.category}
              />
              <MetaInfoItem
                icon={HiOutlineClock}
                label="Reading Time"
                value={post.readingTime}
              />
              <MetaInfoItem
                icon={HiOutlineUser}
                label="Author Name"
                value={post.author}
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Main Title - Right aligned */}
            <motion.h2
              className="text-accent-pink text-xl md:text-2xl font-bold text-right mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Artificial Intelligence (AI)
            </motion.h2>

            {/* Intro Paragraph */}
            <motion.p
              className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {post.content.intro}
            </motion.p>

            {/* Second paragraph - repeat for design match */}
            <motion.p
              className="text-text-secondary text-base md:text-lg leading-relaxed mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              {post.content.intro}
            </motion.p>

            {/* Content Sections with fade effect */}
            <div className="relative">
              {post.content.sections.slice(0, 1).map((section, index) => (
                <motion.div
                  key={index}
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <h3 className="text-white text-xl md:text-2xl font-semibold mb-4 text-right">
                    {section.title}
                  </h3>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed text-center">
                    {section.content}
                  </p>
                </motion.div>
              ))}

              {/* Fade overlay - only show when not expanded */}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none"></div>
              )}
            </div>

            {/* Read More Button - only show when not expanded */}
            {!isExpanded && (
              <motion.div
                className="flex justify-center mt-8 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setIsExpanded(true)}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#1a1a2e] border border-white/10 text-text-secondary hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <span>قراءة باقي المدونة</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </motion.div>
            )}

            {/* Rest of Content Sections - only show when expanded */}
            {isExpanded && post.content.sections.slice(1).map((section, index) => (
              <motion.div
                key={index + 1}
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-4 text-right">
                  {section.title}
                </h3>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed text-center">
                  {section.content}
                </p>
              </motion.div>
            ))}

            {/* Share Section */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 py-8 border-t border-b border-white/10 my-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${isLiked
                  ? "bg-red-500/20 border-red-500 text-red-400"
                  : "border-white/20 text-text-secondary hover:border-red-500 hover:text-red-400"
                  }`}
              >
                <HiOutlineHeart className={`text-lg ${isLiked ? "fill-current" : ""}`} />
                <span>أعجبني</span>
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${isBookmarked
                  ? "bg-accent-pink/20 border-accent-pink text-accent-pink"
                  : "border-white/20 text-text-secondary hover:border-accent-pink hover:text-accent-pink"
                  }`}
              >
                <HiOutlineBookmark className={`text-lg ${isBookmarked ? "fill-current" : ""}`} />
                <span>حفظ المقال</span>
              </button>

              <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-text-secondary hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300">
                <HiOutlineShare className="text-lg" />
                <span>مشاركة</span>
              </button>
            </motion.div>

            {/* Author Card */}
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 flex flex-col md:flex-row items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-20 h-20 rounded-full object-cover border-2 border-accent-pink"
              />
              <div className="text-center md:text-right flex-1">
                <h4 className="text-white text-lg font-semibold mb-2">{post.author}</h4>
                <p className="text-text-secondary text-sm mb-4">
                  كاتب ومتخصص في التكنولوجيا والذكاء الاصطناعي
                </p>
                <button className="text-accent-pink text-sm font-medium hover:text-accent-pink-light transition-colors duration-300">
                  عرض المزيد من المقالات
                </button>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Related Posts Section */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <Container>
          {/* Section Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent-pink text-2xl md:text-3xl font-bold mb-4">
              مواضيع مشابهة
            </h2>
            <p className="text-text-secondary">
              اكتشف المزيد من المقالات المشابهة
            </p>
          </motion.div>

          {/* Related Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {relatedPosts.map((post, index) => (
              <RelatedPostCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Back to Blog Button */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/blog"
              className="flex items-center gap-2 bg-transparent border border-accent-pink text-accent-pink px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-accent-pink hover:text-white hover:shadow-glow-pink"
            >
              <HiArrowRight className="text-lg" />
              <span>العودة للمدونة</span>
            </Link>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;
