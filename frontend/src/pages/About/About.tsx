import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import HeroAboutSection from "../Home/HeroAboutSection";
import { useSEO } from "../../hooks/useSEO";

const About: React.FC = () => {
  useSEO({
    title: "مهاراتي - إيمان",
    description:
      "استعرض مهاراتي وخبراتي في تصميم واجهات وتجربة المستخدم (UI/UX) والخدمات المرتبطة.",
    keywords: "مهاراتي, إيمان, UI/UX, تصميم واجهات, تجربة المستخدم",
    url: "/about",
  });

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <main>
        <HeroAboutSection isAboutView={true} />
      </main>
      <Footer />
    </div>
  );
};

export default About;

