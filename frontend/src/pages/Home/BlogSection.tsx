import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowUpRight, HiOutlineChatBubbleLeft, HiOutlineHeart } from "react-icons/hi2";
import Container from "../../components/common/Container";

// Blog posts data with placeholder images
const blogPosts = [
  {
    id: 1,
    title: "A Decisive Victory for Progressive Policies",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    comments: 124,
    likes: "10k",
  },
  {
    id: 2,
    title: "Tech Giants Unveil Cutting-Edge AI Innovations",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    comments: 124,
    likes: "10k",
  },
  {
    id: 3,
    title: "COVID-19 Variants",
    category: "Health",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    comments: 124,
    likes: "10k",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section
      id="blog"
      className="scroll-section relative min-h-screen w-full bg-bg-primary overflow-hidden flex flex-col items-center justify-center py-20"
    >
      {/* Background gradient effects */}
      <div className="absolute top-0 right-0 w-[30%] h-[40%] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[25%] h-[30%] bg-accent-pink/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Container>
        {/* Section Title */}
        <motion.div
          className="text-right mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            المدونة
          </h2>
          {/* الخط تحت العنوان - متدرج */}
          <div
            className="h-[3px] rounded-full mt-2"
            style={{
              background: 'linear-gradient(to left, #6366f1, #8b5cf6, transparent)',
              width: '100%',
              maxWidth: '200px',
            }}
          />
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Card */}
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
                    <button className="flex items-center gap-2 text-accent-pink text-sm font-medium hover:text-accent-pink-light transition-colors duration-300">
                      <HiArrowUpRight className="text-base" />
                      <span>قراءة المزيد</span>
                    </button>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-text-muted text-sm">
                      {/* Likes */}
                      <div className="flex items-center gap-1">
                        <span>{post.likes}</span>
                        <HiOutlineHeart className="text-base" />
                      </div>

                      {/* Comments */}
                      <div className="flex items-center gap-1">
                        <span>{post.comments}</span>
                        <HiOutlineChatBubbleLeft className="text-base" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/blog" className="bg-transparent border border-accent-pink text-accent-pink px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-accent-pink hover:text-white hover:shadow-glow-pink">
            عرض جميع المدونات
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default BlogSection;
