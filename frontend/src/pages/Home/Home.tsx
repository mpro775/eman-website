import React, { useEffect, useState } from "react";
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

const HERO_VIDEOS = [
  `${import.meta.env.BASE_URL}videos/sunset.mp4`,
  `${import.meta.env.BASE_URL}videos/portrait-black.webm`,
];

const HomeMediaLoader: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    className="fixed inset-0 z-[9999] grid place-items-center bg-[#040404] text-white"
    dir="rtl"
    role="status"
    aria-live="polite"
    aria-label={`جاري تجهيز الواجهة، ${progress}%`}
  >
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[-15%] top-[-20%] h-[65vw] w-[65vw] rounded-full bg-[#6f55bd]/20 blur-[150px]" />
      <div className="absolute bottom-[-30%] right-[-15%] h-[55vw] w-[55vw] rounded-full bg-[#c67588]/15 blur-[150px]" />
    </div>
    <div className="relative flex w-[min(82vw,390px)] flex-col items-center">
      <div className="mb-7 text-center">
        <span className="block font-english text-[11px] tracking-[0.32em] text-[#bba1fe]">EMAN PORTFOLIO</span>
        <p className="mt-3 font-thmanyah text-2xl">نجهّز لك التجربة</p>
      </div>
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div
          className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-[#c67588] to-[#bba1fe] transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 flex w-full items-center justify-between text-xs text-white/50">
        <span>تحميل المشاهد</span>
        <span className="font-english tabular-nums">{progress}%</span>
      </div>
    </div>
  </div>
);

const useHeroMediaReady = () => {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let completed = 0;
    const videos: HTMLVideoElement[] = [];

    const markComplete = () => {
      completed += 1;
      if (disposed) return;
      setProgress(Math.round((completed / HERO_VIDEOS.length) * 100));
      if (completed === HERO_VIDEOS.length) setReady(true);
    };

    HERO_VIDEOS.forEach((src) => {
      const video = document.createElement("video");
      videos.push(video);
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        markComplete();
      };
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.addEventListener("canplaythrough", settle, { once: true });
      video.addEventListener("error", settle, { once: true });
      video.src = src;
      video.load();
      if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) settle();
    });

    // A connection failure should never trap the visitor on the loading screen.
    const safetyTimer = window.setTimeout(() => {
      if (!disposed) {
        setProgress(100);
        setReady(true);
      }
    }, 12000);

    return () => {
      disposed = true;
      window.clearTimeout(safetyTimer);
      videos.forEach((video) => {
        video.removeAttribute("src");
        video.load();
      });
    };
  }, []);

  useEffect(() => {
    if (ready) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [ready]);

  return { progress, ready };
};


// Inner component that uses the context
const HomeContent: React.FC = () => {
  const { isAboutView } = useView();
  const { progress, ready } = useHeroMediaReady();

  // SEO optimization for home page
  useSEO({
    description: 'إيمان خبيرة في تصميم واجهات المستخدم وتجربة المستخدم (UI/UX) وتطوير تطبيقات الموبايل. أقدم خدمات التصميم الجرافيكي والتدريب والاستشارات. تواصل معي لتحويل أفكارك إلى واقع رقمي مبهر.',
    keywords: 'إيمان, مصممة UI/UX, تصميم واجهات, تجربة المستخدم, تطوير تطبيقات, مطورة موبايل, تصميم جرافيكي, Figma, Adobe XD, Flutter, React Native, برامج تدريبية, استشارات تقنية',
    url: '/',
  });

  return (
    <div className="scroll-container bg-bg-primary">
      {!ready && <HomeMediaLoader progress={progress} />}
      <Header />
      <ScrollPagination />
      <main className="relative">
        {/* Home & About Section (merged) */}
        <HeroAboutSection isAboutView={isAboutView} />

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

