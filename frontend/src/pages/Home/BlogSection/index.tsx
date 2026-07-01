import React from "react";
import { Link } from "react-router-dom";
import BlogCard, { type BlogPost } from "./BlogCard";
import { playTap } from "../../../utils/soundManager";

import card1 from "../../../assets/blog/card1.png";
import card2 from "../../../assets/blog/card2.png";
import card3 from "../../../assets/blog/card3.png";

// Placeholder posts text-matched to Figma node 820:1818 ("المدونة").
const POSTS: BlogPost[] = [
    {
        id: 1,
        title: "A Decisive Victory for Progressive Policies",
        category: "Politics",
        image: card1,
        shares: "124",
        likes: "10k",
    },
    {
        id: 2,
        title: "Tech Giants Unveil Cutting-Edge AI Innovations",
        category: "Technology",
        image: card2,
        shares: "124",
        likes: "10k",
    },
    {
        id: 3,
        title: "COVID-19 Variants",
        category: "Health",
        image: card3,
        shares: "124",
        likes: "10k",
    },
];

/**
 * Blog teaser section ("المدونة") — pixel-matched to Figma node 820:1818.
 * Arabic title + gradient underline, a 3-card responsive grid, and a pink
 * gradient "view all" button. Static CSS (no rAF) so it works backgrounded.
 */
const BlogSection: React.FC = () => {
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
                <div dir="ltr" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full">
                    {POSTS.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

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
