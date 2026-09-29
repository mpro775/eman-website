import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
    kind: "sunset" | "portrait";
    paused: boolean;
    className?: string;
}

/** Decorative motion pauses when hidden, offscreen, or in a background tab. */
export default function HeroVideo({ kind, paused, className = "" }: HeroVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);
    const [failed, setFailed] = useState(false);
    const base = `${import.meta.env.BASE_URL}videos/${kind === "portrait" ? "portrait-black" : kind}`;

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
                src={`${base}.${kind === "portrait" ? "webm" : "mp4"}`}
                poster={`${base}.webp`}
                muted loop playsInline preload="auto" tabIndex={-1}
                onError={() => setFailed(true)}
                className={`absolute inset-0 w-full h-full ${kind === "portrait" ? "object-contain object-bottom" : "object-cover"}`}
            />}
        </div>
    );
}

