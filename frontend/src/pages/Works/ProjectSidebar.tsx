import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";
import type { ProjectDetailRow } from "../../types/project.types";
import { resolveDetailIcon } from "../../utils/detailIcons";
import { normalizeExternalUrl } from "../../utils/externalUrl";

interface ProjectSidebarProps {
    categoryName: string;
    title: string;
    description: string;
    tags: string[];
    details: ProjectDetailRow[];
    projectLink: string;
    /** `null` hides the counter and the arrows (list unavailable). */
    position: { index: number; total: number } | null;
    /** Ids of the neighbouring projects across the whole list; `null` at an end. */
    prevId: string | null;
    nextId: string | null;
}

const pad = (n: number) => String(n).padStart(2, "0");

const navClass =
    "flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/80 transition-all duration-300";

/**
 * The detail page's right-hand panel: category, project-to-project navigation,
 * title, description, tags, the free-form details table, and the live-site CTA.
 * Every block below the title hides itself when it has no data.
 */
const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
    categoryName,
    title,
    description,
    tags,
    details,
    projectLink,
    position,
    prevId,
    nextId,
}) => {
    const href = normalizeExternalUrl(projectLink);

    return (
        <aside className="flex flex-col gap-6 p-6 lg:p-8 rounded-2xl bg-[#110f2e] border border-white/10 lg:sticky lg:top-8">
            {/* Category + project navigation. dir="ltr" so the design's
                left-to-right arrangement survives the RTL page. */}
            <div dir="ltr" className="flex items-center justify-between gap-4">
                {categoryName ? (
                    <span
                        dir="auto"
                        className="flex items-center h-[30px] px-2.5 rounded-[10px] bg-[rgba(255,92,131,0.15)] border border-[rgba(255,92,131,0.25)] whitespace-nowrap"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 500,
                            fontSize: "12px",
                            color: "rgb(220, 137, 156)",
                        }}
                    >
                        {categoryName}
                    </span>
                ) : (
                    <span />
                )}

                {position && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[#a5a0c8] tabular-nums whitespace-nowrap">
                            {pad(position.index + 1)} / {pad(position.total)}
                        </span>
                        {/* Physically-left arrow advances (RTL reading order). */}
                        {nextId ? (
                            <Link to={`/works/${nextId}`} aria-label="العمل التالي" className={`${navClass} hover:text-white hover:border-[rgba(255,92,131,0.5)]`}>
                                <FiArrowLeft className="w-4 h-4" />
                            </Link>
                        ) : (
                            <span aria-hidden="true" className={`${navClass} opacity-40`}>
                                <FiArrowLeft className="w-4 h-4" />
                            </span>
                        )}
                        {prevId ? (
                            <Link to={`/works/${prevId}`} aria-label="العمل السابق" className={`${navClass} hover:text-white hover:border-[rgba(255,92,131,0.5)]`}>
                                <FiArrowRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <span aria-hidden="true" className={`${navClass} opacity-40`}>
                                <FiArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <h1
                    dir="auto"
                    className="text-white"
                    style={{
                        fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif',
                        fontWeight: 700,
                        fontSize: "clamp(22px, 3vw, 32px)",
                        lineHeight: 1.25,
                    }}
                >
                    {title}
                </h1>

                {description && (
                    <p
                        dir="auto"
                        className="text-[#a5a0c8]"
                        style={{
                            fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                            fontWeight: 300,
                            fontSize: "15px",
                            lineHeight: "28px",
                        }}
                    >
                        {description}
                    </p>
                )}
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            dir="auto"
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80 whitespace-nowrap"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {details.length > 0 && (
                <dl className="flex flex-col">
                    {details.map((row, i) => {
                        const Icon = resolveDetailIcon(row.icon);
                        return (
                            <div
                                key={`${row.label}-${i}`}
                                className="flex items-center gap-3 py-3 border-b border-white/[0.06] last:border-0"
                            >
                                <dt dir="auto" className="flex items-center gap-2 shrink-0 text-sm text-[#a5a0c8]">
                                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                                    <span>{row.label}</span>
                                </dt>
                                {/* Dot leader — purely decorative, pure CSS. */}
                                <span aria-hidden="true" className="flex-1 self-end mb-1.5 border-b border-dotted border-white/20" />
                                <dd dir="auto" className="shrink-0 text-sm text-white">
                                    {row.value}
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            )}

            {href && (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,92,131,0.45)] active:scale-[0.99]"
                    style={{
                        fontFamily: '"Thmanyah Sans", "Tajawal", sans-serif',
                        background: "linear-gradient(252.89deg, #c67588 1.84%, #603942 98.17%)",
                    }}
                >
                    <span>زيارة المشروع مباشر</span>
                    <FiExternalLink className="w-4 h-4" />
                </a>
            )}
        </aside>
    );
};

export default ProjectSidebar;
