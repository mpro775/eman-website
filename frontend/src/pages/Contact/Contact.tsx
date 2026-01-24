import React from "react";
import Header from "../../components/layout/Header";
import ContactSection from "../Home/ContactSection";
import { useSEO } from "../../hooks/useSEO";

const Contact: React.FC = () => {
  useSEO({
    title: "تواصل معي - إيمان",
    description: "صفحة التواصل.",
    keywords: "تواصل, إيمان, contact",
    url: "/contact",
  });

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <main className="pt-24">
        <ContactSection />
      </main>
    </div>
  );
};

export default Contact;

