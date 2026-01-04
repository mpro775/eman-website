import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaBehance } from "react-icons/fa";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const quickLinks = [
    { name: "الرئيسية", href: "#home" },
    { name: "مهاراتي", href: "#about" },
    { name: "الخبرات", href: "#experience" },
    { name: "الخدمات", href: "#services" },
  ];

  const servicesLinks = [
    { name: "تصميم واجهات", href: "#" },
    { name: "تصميم تطبيقات", href: "#" },
    { name: "الهوية البصرية", href: "#" },
    { name: "استشارات تصميم", href: "#" },
  ];



  const socialLinks = [
    { icon: FaFacebookF, href: "#" },
    { icon: FaTwitter, href: "#" },
    { icon: FaLinkedinIn, href: "#" },
    { icon: FaInstagram, href: "#" },
    { icon: FaYoutube, href: "#" },
    { icon: FaBehance, href: "#" },
  ];

  return (
    <footer id="footer" className="scroll-section relative w-full bg-gradient-to-b from-bg-primary to-[#0d0d14] border-t border-white/5 min-h-screen flex flex-col justify-center">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Logo and Description */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-pink-light">
                إيمان.
              </h3>
            </div>

            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed mb-6 text-right">
              مصممة تجارب مستخدم وواجهات رقمية أعمل على تحويل الأفكار إلى تجارب
              مرئية مدروسة. تجمع بين المساحات، الموضوع، والهوية البصرية المتناسقة. أؤمن
              بأن التصميم الجيد يبدأ بفهم المستخدم ويتمتع بحرية تحمل قيم كل ذوق.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 bg-white/5 hover:bg-accent-pink rounded-full flex items-center justify-center text-text-secondary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-right">
            <h4 className="text-white text-lg font-semibold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-accent-pink transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="text-right">
            <h4 className="text-white text-lg font-semibold mb-6">الخدمات المقدمة</h4>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-accent-pink transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="text-right">
            <h4 className="text-white text-lg font-semibold mb-6">اشترك في النشرة</h4>
            <p className="text-text-secondary text-sm mb-4">
              احصل على آخر التحديثات والمقالات مباشرة إلى بريدك
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="emyJameel1@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 text-sm"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-accent-pink to-accent-pink-dark text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-glow-pink"
              >
                اشترك الآن
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
            {/* Copyright */}
            <p className="text-center md:text-left">
              Copyright© 2025 إيمان جميل - جميع الحقوق محفوظة
            </p>

            {/* Privacy Links */}
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-accent-pink transition-colors duration-300">
                سياسة الخصوصية
              </a>
              <a href="#" className="hover:text-accent-pink transition-colors duration-300">
                الشروط والأحكام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
