import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container, SectionTitle } from "../../../components";
import BlogCard, { type BlogPost } from "./BlogCard";

// Mock data
const blogPosts: BlogPost[] = [
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

/**
 * Blog teaser section with recent posts
 */
const BlogSection: React.FC = () => {
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
                    className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {blogPosts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
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
