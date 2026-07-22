import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { blogService } from "../../services/blog.service";
import { resolveImageUrl } from "../../utils/imageUrl";

// Blog post interface
interface BlogPost {
  id: string | number;
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

const parsePostContent = (rawContent: string) => {
  if (!rawContent) {
    return { intro: "", sections: [] };
  }
  const content = rawContent.replace(/\r\n/g, "\n");
  const headerRegex = /(?:^|\n)##\s+(.+?)(?=\n|$)/g;
  const sections: { title: string; content: string }[] = [];
  const parts = content.split(/(?:^|\n)##\s+.+?(?=\n|$)/);
  const intro = parts[0]?.trim() || "";

  const headers: string[] = [];
  let match;
  headerRegex.lastIndex = 0;
  while ((match = headerRegex.exec(content)) !== null) {
    headers.push(match[1].trim());
  }

  for (let i = 0; i < headers.length; i++) {
    const sectionContent = parts[i + 1]?.trim() || "";
    sections.push({
      title: headers[i],
      content: sectionContent,
    });
  }

  return { intro, sections };
};

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
  post: { id: string | number; title: string; category: string; image: string; comments: number; likes: string };
  index: number;
}> = ({ post, index }) => (
  <motion.article
    className="group relative"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
  >
    <Link to={`/blog/${post.id}`} className="block">
      <div data-no-splash="true" className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-accent-pink/30 hover:shadow-glow-pink/10 transition-all duration-300">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={resolveImageUrl(post.image)}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 text-right">
          <h3 className="text-white text-base font-semibold mb-2 group-hover:text-accent-pink transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-text-muted text-xs text-right mb-3">
            {post.category}
          </p>
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
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Custom toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToastMessage = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load liked & bookmarked status on mount or id change
  useEffect(() => {
    if (!id) return;
    try {
      const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
      setIsLiked(likedPosts.includes(id));
      
      const bookmarkedPosts = JSON.parse(localStorage.getItem("bookmarked_posts") || "[]");
      setIsBookmarked(bookmarkedPosts.includes(id));
    } catch (err) {
      console.error("Failed to read localStorage:", err);
    }
  }, [id]);

  const handleLike = async () => {
    if (!post || !id) return;
    try {
      const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
      if (!isLiked) {
        setIsLiked(true);
        // Call backend API
        const res = await blogService.lovePost(id);
        const newLoves = res.loves;
        setPost(prev => prev ? { ...prev, likes: newLoves >= 1000 ? `${(newLoves / 1000).toFixed(1)}k` : `${newLoves}` } : null);
        localStorage.setItem("liked_posts", JSON.stringify([...likedPosts, id]));
        showToastMessage("شكراً لتفاعلك! تم تسجيل إعجابك بالمقال.", "success");
      } else {
        setIsLiked(false);
        // Decrement locally
        setPost(prev => {
          if (!prev) return null;
          const currentLoves = prev.likes.includes('k') ? parseFloat(prev.likes) * 1000 : parseInt(prev.likes) || 0;
          const newLoves = Math.max(0, currentLoves - 1);
          return {
            ...prev,
            likes: newLoves >= 1000 ? `${(newLoves / 1000).toFixed(1)}k` : `${newLoves}`
          };
        });
        const updated = likedPosts.filter((item: string) => item !== id);
        localStorage.setItem("liked_posts", JSON.stringify(updated));
        showToastMessage("تم إلغاء الإعجاب.", "info");
      }
    } catch (err) {
      console.error(err);
      showToastMessage("عذراً، حدث خطأ أثناء تسجيل الإعجاب.", "error");
    }
  };

  const handleBookmark = () => {
    if (!id) return;
    try {
      const bookmarkedPosts = JSON.parse(localStorage.getItem("bookmarked_posts") || "[]");
      if (!isBookmarked) {
        setIsBookmarked(true);
        localStorage.setItem("bookmarked_posts", JSON.stringify([...bookmarkedPosts, id]));
        showToastMessage("تم حفظ المقال في مفضلتك!", "success");
      } else {
        setIsBookmarked(false);
        const updated = bookmarkedPosts.filter((item: string) => item !== id);
        localStorage.setItem("bookmarked_posts", JSON.stringify(updated));
        showToastMessage("تم إزالة المقال من مفضلتك.", "info");
      }
    } catch (err) {
      console.error(err);
      showToastMessage("عذراً، حدث خطأ أثناء حفظ المقال.", "error");
    }
  };

  const handleShare = async () => {
    if (!post || !id) return;
    const shareUrl = window.location.href;
    const shareTitle = post.title;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
        showToastMessage("تمت المشاركة بنجاح!", "success");
      } else {
        await navigator.clipboard.writeText(shareUrl);
        showToastMessage("تم نسخ رابط المقال بنجاح!", "success");
      }
      
      // Increment share count in backend
      const res = await blogService.sharePost(id);
      const newShares = res.shares;
      setPost(prev => prev ? { ...prev, comments: newShares } : null);
    } catch (err) {
      // AbortError is triggered if the user cancels sharing dialog, we don't treat it as error
      if (err instanceof Error && err.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(shareUrl);
          showToastMessage("تم نسخ رابط المقال بنجاح!", "success");
        } catch (clipErr) {
          showToastMessage("فشل في مشاركة الرابط أو نسخه.", "error");
        }
      }
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const rawPost = await blogService.getPostById(id);
        const categoryName = typeof rawPost.category === "object" ? rawPost.category.name : "Uncategorized";
        const parsed = parsePostContent(rawPost.content);
        
        const mapped: BlogPost = {
          id: rawPost._id,
          title: rawPost.title,
          titleAr: rawPost.title,
          category: categoryName,
          categoryAr: categoryName,
          image: rawPost.featuredImage || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop",
          comments: rawPost.shares || 0,
          likes: rawPost.loves >= 1000 ? `${(rawPost.loves / 1000).toFixed(1)}k` : `${rawPost.loves}`,
          views: rawPost.views >= 1000 ? `${(rawPost.views / 1000).toFixed(1)}k` : `${rawPost.views}`,
          publishDate: rawPost.publishDate ? new Date(rawPost.publishDate).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }) : new Date(rawPost.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }),
          readingTime: rawPost.readTime ? `${rawPost.readTime} دقيقة` : "5 دقائق",
          author: "إيمان جميل",
          authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
          content: parsed
        };
        setPost(mapped);

        const catId = typeof rawPost.category === "object" ? rawPost.category._id : undefined;
        const relatedRes = await blogService.getPosts({ category: catId, limit: 4 });
        const relatedItems = relatedRes.data || [];
        const filteredRelated = relatedItems
          .filter(item => item._id !== id)
          .slice(0, 3)
          .map((item) => ({
            id: item._id,
            title: item.title,
            category: typeof item.category === "object" ? item.category.name : "Uncategorized",
            image: item.featuredImage || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
            comments: item.shares || 0,
            likes: item.loves >= 1000 ? `${(item.loves / 1000).toFixed(1)}k` : `${item.loves}`,
          }));
        
        if (filteredRelated.length < 3) {
          const generalRes = await blogService.getPosts({ limit: 6 });
          const generalItems = generalRes.data || [];
          const additional = generalItems
            .filter(item => item._id !== id && !filteredRelated.some(r => r.id === item._id))
            .map(item => ({
              id: item._id,
              title: item.title,
              category: typeof item.category === "object" ? item.category.name : "Uncategorized",
              image: item.featuredImage || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
              comments: item.shares || 0,
              likes: item.loves >= 1000 ? `${(item.loves / 1000).toFixed(1)}k` : `${item.loves}`,
            }));
          setRelatedPosts([...filteredRelated, ...additional].slice(0, 3));
        } else {
          setRelatedPosts(filteredRelated);
        }
      } catch (error) {
        console.error("Failed to load blog post details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
  }, [id]);

  useSEO({
    title: post ? (post.titleAr || post.title) : 'تفاصيل المقال',
    description: post ? post.content.intro.substring(0, 160) : 'تفاصيل المقال',
    keywords: post ? `${post.categoryAr}, ${post.category}, مقالات, ${post.author}` : 'مقالات',
    image: post ? post.image : undefined,
    url: `/blog/${id}`,
    type: 'article',
    author: post ? post.author : undefined,
    publishedTime: post ? post.publishDate : undefined,
    section: post ? post.categoryAr : undefined,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary text-lg">جاري تحميل تفاصيل المقال...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-4">
        <p className="text-text-secondary text-lg">المقال غير موجود</p>
        <Link to="/blog" className="text-accent-pink hover:underline">العودة للمدونة</Link>
      </div>
    );
  }

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
            src={resolveImageUrl(post.image)}
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
              {post.categoryAr || post.category}
            </motion.h2>

            {/* Intro Paragraphs */}
            {post.content.intro.split('\n').map((paragraph, index) => paragraph.trim() && (
              <motion.p
                key={index}
                className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                {paragraph}
              </motion.p>
            ))}

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
                  {section.content.split('\n').map((p, pIdx) => p.trim() && (
                    <p key={pIdx} className="text-text-secondary text-base md:text-lg leading-relaxed text-center mb-4">
                      {p}
                    </p>
                  ))}
                </motion.div>
              ))}

              {/* Fade overlay - only show when not expanded and has sections to expand */}
              {!isExpanded && post.content.sections.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none"></div>
              )}
            </div>

            {/* Read More Button - only show when not expanded and has sections to expand */}
            {!isExpanded && post.content.sections.length > 1 && (
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
                {section.content.split('\n').map((p, pIdx) => p.trim() && (
                  <p key={pIdx} className="text-text-secondary text-base md:text-lg leading-relaxed text-center mb-4">
                    {p}
                  </p>
                ))}
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
                onClick={handleLike}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${isLiked
                  ? "bg-red-500/20 border-red-500 text-red-400 cursor-pointer"
                  : "border-white/20 text-text-secondary hover:border-red-500 hover:text-red-400 cursor-pointer"
                  }`}
              >
                <HiOutlineHeart className={`text-lg ${isLiked ? "fill-current" : ""}`} />
                <span>أعجبني</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${isBookmarked
                  ? "bg-accent-pink/20 border-accent-pink text-accent-pink cursor-pointer"
                  : "border-white/20 text-text-secondary hover:border-accent-pink hover:text-accent-pink cursor-pointer"
                  }`}
              >
                <HiOutlineBookmark className={`text-lg ${isBookmarked ? "fill-current" : ""}`} />
                <span>حفظ المقال</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-text-secondary hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300 cursor-pointer"
              >
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

      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-8 left-8 z-[2000] px-6 py-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border backdrop-blur-md flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : toast.type === 'error'
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : 'bg-white/5 border-white/10 text-white'
            }`}
            dir="rtl"
          >
            <span className="font-arabic text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="text-white/60 hover:text-white transition-colors text-lg font-bold mr-2 cursor-pointer"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogDetail;
