import React from "react";
import { Link } from "react-router-dom";
import { playTap } from "../../../utils/soundManager";

import readMoreIcon from "../../../assets/blog/readmore.svg";
import shareIcon from "../../../assets/blog/share.svg";
import heartIcon from "../../../assets/blog/heart.svg";

export interface BlogPost {
    id: string | number;
    title: string;
    category: string;
    image: string;
    /** Share count, e.g. "124" */
    shares: string;
    /** Like count, e.g. "10k" */
    likes: string;
}

interface BlogCardProps {
    post: BlogPost;
}

const statPill = "flex items-center justify-center gap-1 rounded-full bg-[rgba(42,51,80,0.3)] border border-[#262626]";
const statText: React.CSSProperties = {
    fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "1.5",
    letterSpacing: "-0.42px",
    color: "#98989a",
};

/**
 * Blog card — pixel-matched to Figma 820:1818 (cards 820:1825 / 1845 / 1865).
 * A rounded cover image, title + category, then a "read more" button beside
 * two share / like stat pills.
 */
const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <article className="group flex flex-col gap-4">
            {/* Cover image */}
            <Link
                to={`/blog/${post.id}`}
                onMouseEnter={() => playTap({ volume: 0.25 })}
                className="block relative rounded-[10px] overflow-hidden"
                style={{ height: "185px" }}
            >
                <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Title + category */}
            <div className="flex flex-col gap-1 w-full text-right">
                <p
                    className="text-white w-full"
                    style={{
                        fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                        fontWeight: 500,
                        fontSize: "18px",
                        lineHeight: "1.5",
                        letterSpacing: "-0.54px",
                    }}
                >
                    {post.title}
                </p>
                <p
                    className="w-full"
                    style={{
                        fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                        fontWeight: 300,
                        fontSize: "18px",
                        lineHeight: "1.5",
                        letterSpacing: "-0.54px",
                        color: "#98989a",
                    }}
                >
                    {post.category}
                </p>
            </div>

            {/* Read more + stats */}
            <div dir="ltr" className="flex items-center gap-4 w-full">
                <Link
                    to={`/blog/${post.id}`}
                    onMouseEnter={() => playTap({ volume: 0.25 })}
                    className="flex-1 flex items-center justify-center gap-1 rounded-[12px] bg-[rgba(42,51,80,0.2)] border border-[#2a3350] transition-colors duration-300 group-hover:bg-[rgba(42,51,80,0.45)]"
                    style={{ padding: "14px 20px" }}
                >
                    <img src={readMoreIcon} alt="" className="w-5 h-5 shrink-0" />
                    <span
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "1.5",
                            letterSpacing: "-0.42px",
                            color: "#98989a",
                        }}
                    >
                        قراءة المزيد
                    </span>
                </Link>

                <div className="flex items-center gap-2 shrink-0">
                    <div className={statPill} style={{ padding: "6px 14px" }}>
                        <img src={shareIcon} alt="" className="w-5 h-5 shrink-0" />
                        <span style={statText}>{post.shares}</span>
                    </div>
                    <div className={statPill} style={{ padding: "6px 14px" }}>
                        <img src={heartIcon} alt="" className="w-5 h-5 shrink-0" />
                        <span style={statText}>{post.likes}</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
