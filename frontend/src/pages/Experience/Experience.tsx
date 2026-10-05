import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ExperienceSection from "../Home/ExperienceSection";
import { useSEO } from "../../hooks/useSEO";

const Experience: React.FC = () => {
  useSEO({
    title: "الخبرات العملية والمسار المهني",
    description: "استعرض خبرات إيمان جميل العملية ومسيرتها في تصميم UI/UX وتطوير التطبيقات والتصميم الجرافيكي.",
    keywords: "خبرات, إيمان, UX/UI, خبرة عملية",
    url: "/experience",
  });

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <main>
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
};

export default Experience;

