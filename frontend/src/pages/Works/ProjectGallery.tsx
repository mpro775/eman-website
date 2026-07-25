import React, { useCallback, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { resolveImageUrl } from "../../utils/imageUrl";

interface ProjectGalleryProps {
    /** Non-empty, already ordered. The parent handles the `[image]` fallback. */
    images: string[];
    title: string;
    index: number;
    onIndexChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 40;

/**
 * Image viewer for the project detail page: one large frame with overlay arrows
 * and a counter, plus a horizontal thumbnail strip.
 *
 * Direction note — the page is RTL, so "forward" reads leftward: the physically
 * left arrow and `ArrowLeft` both advance. Positions use physical `left-*` /
 * `right-*` (Tailwind does not flip those under `dir="rtl"`), which is what
 * keeps the layout identical to the design.
 */
const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title, index, onIndexChange }) => {
    const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const touchStartX = useRef<number | null>(null);
    const hasMany = images.length > 1;

    const go = useCallback(
        (delta: 1 | -1) => {
            if (images.length < 2) return;
            onIndexChange((index + delta + images.length) % images.length);
        },
        [images.length, index, onIndexChange]
    );

    // Arrow keys, unless the user is typing or holding a modifier.
    useEffect(() => {
        if (!hasMany) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            // The target is `window`/`document` when nothing is focused, so
            // check for an Element before reaching for `closest`.
            const target = e.target;
            if (
                target instanceof Element &&
                target.closest("input, textarea, select, [contenteditable='true']")
            ) {
                return;
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                go(1);
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                go(-1);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [go, hasMany]);

    // Keep the active thumbnail in view when navigating by arrow or keyboard.
    useEffect(() => {
        thumbRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }, [index]);

    const handleTouchEnd = (e: React.TouchEvent) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start === null) return;

        const deltaX = (e.changedTouches[0]?.clientX ?? start) - start;
        if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
        go(deltaX < 0 ? 1 : -1);
    };

    const arrowClass =
        "absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full " +
        "bg-black/50 backdrop-blur-md border border-white/20 text-white cursor-pointer " +
        "hover:bg-[rgba(255,92,131,0.55)] hover:border-[rgba(255,92,131,0.7)] active:scale-95 transition-all duration-300";

    return (
        <div>
            {/* Main frame */}
            <div
                className="relative w-full overflow-hidden rounded-2xl bg-[#0d0c1d] border border-white/10"
                style={{ aspectRatio: "16 / 10" }}
                onTouchStart={(e) => {
                    touchStartX.current = e.touches[0]?.clientX ?? null;
                }}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    key={images[index]}
                    src={resolveImageUrl(images[index])}
                    alt={`${title} — صورة ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover animate-fade-in"
                />

                {hasMany && (
                    <>
                        <button type="button" onClick={() => go(1)} aria-label="الصورة التالية" className={`${arrowClass} left-4`}>
                            <FiChevronLeft className="w-5 h-5" />
                        </button>
                        <button type="button" onClick={() => go(-1)} aria-label="الصورة السابقة" className={`${arrowClass} right-4`}>
                            <FiChevronRight className="w-5 h-5" />
                        </button>

                        {/* dir="ltr" — otherwise "1 / 6" reorders to "6 / 1" */}
                        <span
                            dir="ltr"
                            className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs tabular-nums"
                        >
                            {index + 1} / {images.length}
                        </span>
                    </>
                )}
            </div>

            {/* Thumbnail strip */}
            {hasMany && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {images.map((src, i) => (
                        <button
                            key={`${src}-${i}`}
                            type="button"
                            ref={(el) => {
                                thumbRefs.current[i] = el;
                            }}
                            onClick={() => onIndexChange(i)}
                            aria-label={`عرض الصورة ${i + 1}`}
                            aria-current={i === index}
                            className={`shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                                i === index
                                    ? "border-[#c67588] opacity-100"
                                    : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                        >
                            <img
                                src={resolveImageUrl(src)}
                                alt=""
                                aria-hidden="true"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectGallery;
