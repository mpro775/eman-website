import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import HeroAboutSection from "./HeroAboutSection";
import ProgramsSection from "./ProgramsSection";
import ExperienceSection from "./ExperienceSection";
import ServicesSection from "./ServicesSection";
import WorksSection from "./WorksSection";
import TestimonialsSection from "./TestimonialsSection";
import BlogSection from "./BlogSection";
import ContactSection from "./ContactSection";
import ScrollPagination from "../../components/layout/ScrollPagination";
import { useSEO } from "../../hooks/useSEO";
import { ViewProvider, useView } from "../../context/ViewContext";

// Inner component that uses the context
const HomeContent: React.FC = () => {
  const { isAboutView } = useView();

  // SEO optimization for home page
  useSEO({
    title: undefined,
    description: 'إيمان خبيرة في تصميم واجهات المستخدم وتجربة المستخدم (UI/UX) وتطوير تطبيقات الموبايل. أقدم خدمات التصميم الجرافيكي والتدريب والاستشارات. تواصل معي لتحويل أفكارك إلى واقع رقمي مبهر.',
    keywords: 'إيمان, مصممة UI/UX, تصميم واجهات, تجربة المستخدم, تطوير تطبيقات, مطورة موبايل, تصميم جرافيكي, Figma, Adobe XD, Flutter, React Native, برامج تدريبية, استشارات تقنية',
    url: '/',
  });

  return (
    <div className="scroll-container bg-bg-primary">
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

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Main Home component with ViewProvider
const Home: React.FC = () => {
  return (
    <ViewProvider>
      <HomeContent />
    </ViewProvider>
  );
};

export default Home;

