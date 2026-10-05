import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard, { type BlogPost } from "./BlogCard";
import { playTap } from "../../../utils/soundManager";
import { blogService } from "../../../services/blog.service";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop";

const formatCount = (count = 0): string =>
    count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;

/**
 * Blog teaser section ("المدونة") — pixel-matched to Figma node 820:1818.
 * Arabic title + gradient underline, a 3-card responsive grid, and a pink
 * gradient "view all" button. Static CSS (no rAF) so it works backgrounded.
 */
const BlogSection: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchLatestPosts = async () => {
            try {
                const response = await blogService.getPosts({ limit: 3 });

                if (!isMounted) return;

                setPosts(
                    response.data.map((post) => ({
                        id: post._id,
                        title: post.title,
                        category:
                            typeof post.category === "object"
                                ? post.category.name
                                : "غير مصنف",
                        image: post.featuredImage || FALLBACK_IMAGE,
                        shares: formatCount(post.shares),
                        likes: formatCount(post.loves),
                    })),
                );
            } catch (error) {
                console.error("Failed to load homepage blog posts:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchLatestPosts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section
            id="blog"
            className="scroll-section relative min-h-screen w-full bg-[#040404] flex items-center justify-center overflow-hidden py-20"
        >
            {/* Purple glow — top-left, rotated (Figma 820:1819) */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1030px",
                    height: "515px",
                    top: "-260px",
                    left: "-360px",
                    transform: "rotate(121.23deg)",
                    background: "linear-gradient(177deg, rgba(187,161,254,0.4) 2%, rgba(33,13,83,0.6) 98%)",
                    filter: "blur(220px)",
                    borderRadius: "50%",
                }}
            />

            <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center px-6" style={{ gap: "48px" }}>
                {/* Title + underline (Figma 829:3924) */}
                <div className="flex flex-col items-center" style={{ gap: "14px" }}>
                    <h2
                        className="text-white text-center whitespace-nowrap"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 500,
                            fontSize: "clamp(2rem, 5vw, 48px)",
                            lineHeight: 1,
                            letterSpacing: "-0.72px",
                        }}
                    >
                        المـدونــــــة
                    </h2>
                    <div
                        style={{
                            width: "328px",
                            maxWidth: "82vw",
                            height: "3px",
                            borderRadius: "2px",
                            background:
                                "linear-gradient(90deg, rgba(139,92,246,0) 0%, #C084FC 50%, rgba(139,92,246,0) 100%)",
                        }}
                    />
                </div>

                {/* Cards grid (Figma 820:1824) */}
                <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {loading && (
                    <p className="text-[#98989a] text-lg">جاري تحميل المقالات...</p>
                )}

                {!loading && posts.length === 0 && (
                    <p className="text-[#98989a] text-lg">لا توجد مقالات منشورة حالياً</p>
                )}

                {/* View all button (Figma 820:1885) */}
                <Link
                    to="/blog"
                    onMouseEnter={() => playTap({ volume: 0.25 })}
                    className="flex items-center justify-center rounded-[12px] transition-transform duration-300 hover:-translate-y-0.5"
                    style={{
                        padding: "0 32px",
                        height: "64px",
                        backgroundImage: "linear-gradient(3deg, #c67588 7.33%, #603942 92.67%)",
                        boxShadow: "0px 24px 24px rgba(146,73,242,0.12)",
                    }}
                >
                    <span
                        className="text-white capitalize"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 500,
                            fontSize: "20px",
                            lineHeight: "64px",
                        }}
                    >
                        عرض جميع المدونات
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default BlogSection;
