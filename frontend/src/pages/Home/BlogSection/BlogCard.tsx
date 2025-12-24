import React from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight, HiOutlineChatBubbleLeft, HiOutlineHeart } from "react-icons/hi2";

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
 * Individual blog post card with hover effects and stats
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
            {/* Card Container */}
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-accent-purple/10">
                {/* Header Image */}
                <div className="relative h-48 md:h-52 overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Bottom Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content Body */}
                <div className="p-5 md:p-6">
                    <h3 className="text-white text-base md:text-lg font-semibold mb-2 line-clamp-2 text-right group-hover:text-accent-pink transition-colors duration-300">
                        {post.title}
                    </h3>

                    <p className="text-text-muted text-sm text-right mb-4">
                        {post.category}
                    </p>

                    {/* Footer with Read More and Stats */}
                    <div className="flex flex-row-reverse items-center justify-between pt-4 border-t border-white/10">
                        {/* Action Button */}
                        <button className="flex items-center gap-2 text-accent-pink text-sm font-medium hover:text-accent-pink-light transition-colors duration-300">
                            <HiArrowUpRight className="text-base" />
                            <span>قراءة المزيد</span>
                        </button>

                        {/* Engagement Stats */}
                        <div className="flex items-center gap-4 text-text-muted text-sm">
                            <div className="flex items-center gap-1">
                                <span>{post.likes}</span>
                                <HiOutlineHeart className="text-base" />
                            </div>

                            <div className="flex items-center gap-1">
                                <span>{post.comments}</span>
                                <HiOutlineChatBubbleLeft className="text-base" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default BlogCard;
