import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container, SectionTitle } from "../../../components";
import BlogCard, { type BlogPost } from "./BlogCard";
import { playTap } from "../../../utils/soundManager";
import { blogService } from "../../../services/blog.service";

/**
 * Blog teaser section with recent posts
 */
const BlogSection: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                setLoading(true);
                const response = await blogService.getPosts({ limit: 3 });
                const items = response.data || [];
                const mapped = items.map((p) => {
                    const categoryName = typeof p.category === "object" ? p.category.name : "Uncategorized";
                    return {
                        id: p._id,
                        title: p.title,
                        category: categoryName,
                        image: p.featuredImage || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
                        comments: p.shares || 0,
                        likes: p.loves >= 1000 ? `${(p.loves / 1000).toFixed(1)}k` : `${p.loves}`,
                    };
                });
                setBlogPosts(mapped);
            } catch (error) {
                console.error("Failed to fetch recent blog posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentPosts();
    }, []);

    return (
        <section
            id="blog"
            className="scroll-section relative min-h-screen w-full bg-bg-primary overflow-hidden flex flex-col items-center justify-center py-20"
        >
            {/* Bottom-Left Blur Glow Effect */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "-366px",
                    left: "-466px",
                    transform: "rotate(121.23deg)",
                    background: "linear-gradient(177.25deg, rgba(187, 161, 254, 0.8) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)",
                    filter: "blur(488px)",
                    borderRadius: "50%",
                }}
            ></div>

            <Container>
                {/* Section Title */}
                <SectionTitle title="المدونة" maxWidth="200px" />

                {/* Blog Feed Grid */}
                <motion.div
                    className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {loading ? (
                        <div className="text-center py-20 col-span-full">
                            <div className="w-10 h-10 border-4 border-accent-pink/20 border-t-accent-pink rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-text-secondary text-base">جاري تحميل المقالات...</p>
                        </div>
                    ) : blogPosts.length === 0 ? (
                        <div className="text-center py-20 col-span-full">
                            <p className="text-text-secondary text-base">لا توجد مقالات منشورة حالياً</p>
                        </div>
                    ) : (
                        blogPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))
                    )}
                </motion.div>

                {/* Action Link */}
                <motion.div
                    className="flex justify-center mt-12 md:mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Link
                        to="/blog"
                        className="bg-transparent border-2 border-accent-pink text-accent-pink transition-all duration-300 hover:bg-accent-pink hover:text-white hover:shadow-glow-pink flex items-center justify-center capitalize"
                        onMouseEnter={() => playTap({ volume: 0.25 })}
                        style={{
                            width: '223px',
                            height: '64px',
                            gap: '12px',
                            paddingLeft: '32px',
                            paddingRight: '32px',
                            borderRadius: '20px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                            fontSize: '18px',
                            lineHeight: '64px',
                            letterSpacing: '0%',
                            textAlign: 'center'
                        }}
                    >
                        عرض جميع المدونات
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
};

export default BlogSection;
