import React from "react";
import { motion, useInView } from "framer-motion";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProgramsSection from "./ProgramsSection";
import ExperienceSection from "./ExperienceSection";
import ServicesSection from "./ServicesSection";
import WorksSection from "./WorksSection";
import TestimonialsSection from "./TestimonialsSection";
import BlogSection from "./BlogSection";
import ContactSection from "./ContactSection";
import ScrollPagination from "../../components/layout/ScrollPagination";
import Container from "../../components/common/Container";
import { useSEO } from "../../hooks/useSEO";

// Component for animated section with staggered animations
const AnimatedSection: React.FC<{
  id: string;
  title: string;
  children?: React.ReactNode;
}> = ({ id, title, children }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { threshold: 0.3, once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id={id}
      ref={ref}
      className="scroll-section min-h-screen w-full bg-bg-primary flex items-center justify-center pt-[100px]"
    >
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-8">
              {title}
            </h2>
          </motion.div>
          {children && (
            <motion.div variants={itemVariants}>{children}</motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
};

const Home: React.FC = () => {
  // SEO optimization for home page
  useSEO({
    title: undefined, // Uses default title
    description: 'إيمان خبيرة في تصميم واجهات المستخدم وتجربة المستخدم (UI/UX) وتطوير تطبيقات الموبايل. أقدم خدمات التصميم الجرافيكي والتدريب والاستشارات. تواصل معي لتحويل أفكارك إلى واقع رقمي مبهر.',
    keywords: 'إيمان, مصممة UI/UX, تصميم واجهات, تجربة المستخدم, تطوير تطبيقات, مطورة موبايل, تصميم جرافيكي, Figma, Adobe XD, Flutter, React Native, برامج تدريبية, استشارات تقنية',
    url: '/',
  });

  return (
    <div className="scroll-container bg-bg-primary">
      <Header />
      <ScrollPagination />
      <main className="relative">
        {/* Home Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

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

export default Home;
