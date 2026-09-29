import { useEffect, useRef, useState } from "react";

const warmedPortraitSources = new Set<string>();

interface HeroVideoProps {
    kind: "sunset" | "portrait";
    paused: boolean;
    src?: string;
    onPlaying?: ((kind: "sunset" | "portrait") => void) | undefined;
    className?: string;
}

/** Decorative motion pauses when hidden, offscreen, or in a background tab. */
export default function HeroVideo({ kind, paused, src, onPlaying, className = "" }: HeroVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);
    const [failed, setFailed] = useState(false);
    const base = `${import.meta.env.BASE_URL}videos/${kind === "portrait" ? "portrait-black" : kind}`;
    const mediaSrc = src ?? `${base}.${kind === "portrait" ? "webm" : "mp4"}`;
    const warmingRef = useRef(kind === "portrait" && !warmedPortraitSources.has(mediaSrc));
    const lastMediaTimeRef = useRef(0);

    const finishPortraitWarmup = () => {
        const video = ref.current;
        if (!video || !warmingRef.current) return;

        warmingRef.current = false;
        warmedPortraitSources.add(mediaSrc);
        video.pause();
        video.playbackRate = 1;
        video.currentTime = 0;

        const resume = () => {
            if (!paused && !document.hidden) {
                void video.play().catch(() => { /* Poster remains if autoplay is blocked. */ });
            }
        };
        video.addEventListener("seeked", resume, { once: true });
    };

    useEffect(() => {
        const video = ref.current;
        if (!video || failed) return;
        let visible = false;
        const sync = () => {
            if (visible && !paused && !document.hidden) {
                void video.play().catch(() => { /* Poster remains if autoplay is blocked. */ });
            } else video.pause();
        };
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            sync();
        });
        observer.observe(video);
        document.addEventListener("visibilitychange", sync);
        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", sync);
            video.pause();
        };
    }, [paused, failed]);

    return (
        <div className={`relative ${className}`} aria-hidden="true">
            {failed && <img src={`${base}.webp`} alt="" className={`absolute inset-0 w-full h-full ${kind === "portrait" ? "object-contain object-bottom" : "object-cover"}`} />}
            {!failed && <video
                ref={ref}
                src={mediaSrc}
                poster={`${base}.webp`}
                muted loop playsInline preload="auto" tabIndex={-1}
                onError={() => {
                    setFailed(true);
                    onPlaying?.(kind);
                }}
                onLoadedMetadata={(event) => {
                    if (warmingRef.current) event.currentTarget.playbackRate = 4;
                }}
                onTimeUpdate={(event) => {
                    if (!warmingRef.current) return;
                    const video = event.currentTarget;
                    const looped = lastMediaTimeRef.current > video.duration / 2 && video.currentTime < lastMediaTimeRef.current;
                    lastMediaTimeRef.current = video.currentTime;
                    if (looped || video.currentTime >= Math.max(0.5, video.duration - 0.75)) {
                        finishPortraitWarmup();
                    }
                }}
                onPlaying={() => {
                    if (!warmingRef.current) onPlaying?.(kind);
                }}
                className={`absolute inset-0 w-full h-full ${kind === "portrait" ? "object-contain object-bottom" : "object-cover"}`}
                style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            />}
        </div>
    );
}

