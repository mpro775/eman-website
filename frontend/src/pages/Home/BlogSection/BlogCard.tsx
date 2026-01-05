import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowUpRight, HiOutlineHeart } from "react-icons/hi2";
import { LuSend } from "react-icons/lu";

export interface BlogPost {
    id: number;
    title: string;
    category: string;
    image: string;
    comments: number;
    likes: string;
}

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

/**
 * Blog card matching the reference design with pill-shaped footer buttons
 */
const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
    return (
        <motion.article
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
        >
            <Link to={`/blog/${post.id}`} className="block">
                {/* Card Container - No background */}
                <div className="relative rounded-3xl overflow-hidden transition-all duration-300">
                    {/* Header Image - Large with rounded corners and padding */}
                    <div className="p-3">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="px-5 pt-2 pb-4">
                        {/* Title - Large and bold */}
                        <h3 className="text-white text-xl font-semibold mb-2 line-clamp-2 text-right group-hover:text-accent-pink transition-colors duration-300">
                            {post.title}
                        </h3>

                        {/* Category */}
                        <p className="text-text-muted text-base text-right">
                            {post.category}
                        </p>
                    </div>

                    {/* Footer - Buttons */}
                    <div className="flex flex-row-reverse items-center justify-between gap-4 px-3 pb-4">
                        {/* Read More Button - Large with dark background */}
                        <div
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#141414] border border-[#262626] text-[#98989A] group-hover:text-white group-hover:bg-[#252540] transition-all duration-300"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '150%', letterSpacing: '-0.03em' }}
                        >
                            <span>قراءة المزيد</span>
                            <HiArrowUpRight className="text-lg text-accent-pink" />
                        </div>

                        {/* Stats Group */}
                        <div className="flex items-center gap-2">
                            {/* Likes Count - Pill */}
                            <div
                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#141414] border border-[#262626] text-[#98989A] hover:text-white transition-all duration-300 cursor-pointer"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '150%', letterSpacing: '-0.03em' }}
                            >
                                <span>{post.likes}</span>
                                <HiOutlineHeart className="text-base" />
                            </div>

                            {/* Share Count - Pill */}
                            <div
                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#141414] border border-[#262626] text-[#98989A] hover:text-white transition-all duration-300 cursor-pointer"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '150%', letterSpacing: '-0.03em' }}
                            >
                                <span>{post.comments}</span>
                                <LuSend className="text-base" />
                            </div>


                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default BlogCard;
