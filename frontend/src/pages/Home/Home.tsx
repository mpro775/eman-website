import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header, ScrollPagination } from "../../components";
import { useSEO } from "../../hooks";
import { useView } from "../../context";

// Section imports from new folder structure
import HeroAboutSection from "./HeroAboutSection";
import ExperienceSection from "./ExperienceSection";
import ServicesSection from "./ServicesSection";
import WorksSection from "./WorksSection";
import TestimonialsSection from "./TestimonialsSection";
import ProgramsSection from "./ProgramsSection";
import BlogSection from "./BlogSection";
import ContactSection from "./ContactSection";

type HeroVideoKind = "sunset" | "portrait";
type HeroMediaSources = Record<HeroVideoKind, string>;

const HERO_VIDEOS: HeroMediaSources = {
  sunset: `${import.meta.env.BASE_URL}videos/sunset.mp4`,
  portrait: `${import.meta.env.BASE_URL}videos/portrait-black.webm`,
};

const HomeMediaLoader: React.FC = () => (
  <div
    className="fixed inset-0 z-[9999] grid place-items-center bg-[#040404] text-white"
    dir="rtl"
    role="status"
    aria-live="polite"
    aria-label="يرجى الانتظار قليلًا"
  >
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[-15%] top-[-20%] h-[65vw] w-[65vw] rounded-full bg-[#6f55bd]/20 blur-[150px]" />
      <div className="absolute bottom-[-30%] right-[-15%] h-[55vw] w-[55vw] rounded-full bg-[#c67588]/15 blur-[150px]" />
    </div>
    <div className="relative flex w-[min(82vw,390px)] flex-col items-center text-center">
      <div className="relative mb-8 grid h-20 w-20 place-items-center" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border border-[#bba1fe]/20" />
        <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-[#de97a7] border-r-[#bba1fe]" />
        <span className="h-2 w-2 rounded-full bg-[#de97a7] shadow-[0_0_24px_8px_rgba(222,151,167,.32)]" />
      </div>
      <div>
        <span className="block font-english text-[11px] tracking-[0.32em] text-[#bba1fe]">EMAN PORTFOLIO</span>
        <p className="mt-4 font-thmanyah text-3xl">لحظات ونبدأ</p>
        <p className="mt-2 font-thmanyah text-sm text-white/50">يرجى الانتظار قليلًا</p>
      </div>
    </div>
  </div>
);

const useHeroMediaReady = () => {
  const [sources, setSources] = useState<HeroMediaSources | null>(null);
  const [ready, setReady] = useState(false);
  const playingKinds = useRef(new Set<HeroVideoKind>());

  useEffect(() => {
    let disposed = false;
    const controller = new AbortController();
    const objectUrls: string[] = [];

    const loadVideo = async (src: string) => {
      const response = await fetch(src, { cache: "force-cache", signal: controller.signal });
      if (!response.ok) throw new Error(`Unable to preload ${src}`);
      const objectUrl = URL.createObjectURL(await response.blob());
      objectUrls.push(objectUrl);
      return objectUrl;
    };

    void Promise.all([
      loadVideo(HERO_VIDEOS.sunset),
      loadVideo(HERO_VIDEOS.portrait),
    ]).then(([sunset, portrait]) => {
      if (disposed) return;
      setSources({ sunset, portrait });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReady(true);
    }).catch(() => {
      if (!disposed) setSources(HERO_VIDEOS);
    });

    // Fall back to direct URLs on very slow connections, then let the real
    // video elements report when playback has actually started.
    const sourceFallbackTimer = window.setTimeout(() => {
      if (!disposed) {
        controller.abort();
        setSources(current => current ?? HERO_VIDEOS);
      }
    }, 25000);

    // A broken media response must not trap the visitor indefinitely.
    const finalSafetyTimer = window.setTimeout(() => {
      if (!disposed) setReady(true);
    }, 40000);

    return () => {
      disposed = true;
      controller.abort();
      window.clearTimeout(sourceFallbackTimer);
      window.clearTimeout(finalSafetyTimer);
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const handlePlaying = useCallback((kind: HeroVideoKind) => {
    playingKinds.current.add(kind);
    if (playingKinds.current.size === 2) setReady(true);
  }, []);

  useEffect(() => {
    if (ready) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [ready]);

  return { sources, ready, handlePlaying };
};


// Inner component that uses the context
const HomeContent: React.FC = () => {
  const { isAboutView } = useView();
  const { sources, ready, handlePlaying } = useHeroMediaReady();

  // SEO optimization for home page
  useSEO({
    description: 'إيمان خبيرة في تصميم واجهات المستخدم وتجربة المستخدم (UI/UX) وتطوير تطبيقات الموبايل. أقدم خدمات التصميم الجرافيكي والتدريب والاستشارات. تواصل معي لتحويل أفكارك إلى واقع رقمي مبهر.',
    keywords: 'إيمان, مصممة UI/UX, تصميم واجهات, تجربة المستخدم, تطوير تطبيقات, مطورة موبايل, تصميم جرافيكي, Figma, Adobe XD, Flutter, React Native, برامج تدريبية, استشارات تقنية',
    url: '/',
  });

  return (
    <div className="scroll-container bg-bg-primary">
      {!ready && <HomeMediaLoader />}
      <Header />
      <ScrollPagination />
      <main className="relative">
        {/* Home & About Section (merged) */}
        {sources && <HeroAboutSection isAboutView={isAboutView} mediaSources={sources} onMediaPlaying={handlePlaying} />}

        {/* Experience Section */}
        <ExperienceSection />

        {/* Services Section */}
        <ServicesSection />
        {/* Portfolio Section */}
        <WorksSection />
        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Programs Section */}
        <ProgramsSection />


        {/* Blog Section */}
        <BlogSection />

        {/* Contact Section (includes Footer) */}
        <ContactSection />
      </main>
    </div>
  );
};

// Main Home component with ViewProvider
const Home: React.FC = () => {
  return (
    <HomeContent />
  );
};

export default Home;

