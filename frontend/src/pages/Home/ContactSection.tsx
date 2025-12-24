import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowLeft, HiChevronLeft } from "react-icons/hi2";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaBehance, FaWhatsapp } from "react-icons/fa";
import Container from "../../components/common/Container";
import phoneIcon from "../../assets/images/PhoneCall.svg";
import emailIcon from "../../assets/images/email.svg";
import behanceIcon from "../../assets/images/behance.svg";
import logo from "../../assets/images/logo.png";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    address: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", newsletterEmail);
    setNewsletterEmail("");
  };

  const contactSocialLinks = [
    { icon: FaFacebookF, href: "#" },
    { icon: FaTwitter, href: "#" },
    { icon: FaLinkedinIn, href: "#" },
    { icon: FaInstagram, href: "#" },
    { icon: FaYoutube, href: "#" },
  ];

  const footerSocialLinks = [
    { icon: FaFacebookF, href: "#" },
    { icon: FaYoutube, href: "#" },
    { icon: FaWhatsapp, href: "#" },
    { icon: FaInstagram, href: "#" },
    { icon: FaTwitter, href: "#" },
    { icon: FaBehance, href: "#" },
  ];

  const importantLinks = [
    { name: "الرئيسية", href: "#home" },
    { name: "من أنا", href: "#about" },
    { name: "الخبرات العملية", href: "#experience" },
    { name: "أعمالي", href: "#portfolio" },
    { name: "تواصل معي", href: "#contact" },
  ];

  const contactInfo = [
    { label: "emyjameel1@gmail.com", href: "mailto:emyjameel1@gmail.com" },
    { label: "emanjameel.com", href: "https://emanjameel.com" },
  ];

  return (
    <section
      id="contact"
      className="scroll-section relative w-full overflow-hidden"
    >
      {/* Contact Section */}
      <div className="bg-bg-primary py-20">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-0 w-[30%] h-[40%] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <Container>
          {/* Section Title */}
          <motion.div
            className="text-right mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              تواصل معي
            </h2>
            {/* الخط تحت العنوان - متدرج */}
            <div
              className="h-[3px] rounded-full mt-2"
              style={{
                background: 'linear-gradient(to left, #6366f1, #8b5cf6, transparent)',
                width: '100%',
                maxWidth: '250px',
              }}
            />
          </motion.div>

          {/* Main Content - Two Columns */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Right Side - Contact Info */}
            <motion.div
              className="order-1 lg:order-1"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Heading */}
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-4 text-right">
                يسعدني سماعك، فقط أرسل رسالة.
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 text-right">
                سواء كنت ترغب في بدء مشروع جديد، مناقشة فكرة، أو لديك
                استفسار بسيط — لا تتردد في التواصل.
                أحرص على الرد خلال 48 ساعة كحد أقصى.
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-8" dir="rtl">
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center border border-white/10">
                    <img src={phoneIcon} alt="Phone" className="w-7 h-7" />
                  </div>
                  <div className="text-right">
                    <p className="text-text-muted text-xs mb-1">تواصل معي</p>
                    <p className="text-white font-medium">+1-202-555-0190</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center border border-white/10">
                    <img src={emailIcon} alt="Email" className="w-7 h-7" />
                  </div>
                  <div className="text-right">
                    <p className="text-text-muted text-xs mb-1">أرسل لي رسالة</p>
                    <p className="text-white font-medium">emyjameel1@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-white/5">
                <p className="text-text-secondary text-base mb-6 text-right">
                  تابعني على منصات التواصل الاجتماعي
                </p>
                <div className="flex items-center gap-4">

                  {/* Behance */}
                  <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <img src={behanceIcon} alt="Behance" className="w-7 h-7" />
                  </a>
                  {/* Instagram */}
                  <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <FaInstagram className="text-xl text-accent-pink" />
                  </a>
                  {/* LinkedIn */}
                  <a href="#" className="w-14 h-14 bg-accent-pink rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <FaLinkedinIn className="text-xl text-white" />
                  </a>
                  {/* Twitter */}
                  <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <FaTwitter className="text-xl text-accent-pink" />
                  </a>
                  {/* Facebook */}
                  <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <FaFacebookF className="text-xl text-accent-pink" />
                  </a>
                  <div className="w-10 h-[2px] bg-accent-pink rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Left Side - Contact Form */}
            <motion.div
              className="order-2 lg:order-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Form Heading */}
              <h3 className="text-white text-lg md:text-xl font-medium mb-6 flex items-center justify-end gap-2 flex-row-reverse">
                <span className="text-2xl">👋</span>
                <span>فقط قل مرحباً</span>
              </h3>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="الإيميل"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300"
                  />
                </div>

                {/* Row 2: Address */}
                <input
                  type="text"
                  name="address"
                  placeholder="العنوان"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300"
                />

                {/* Row 3: Service & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>الخدمة</option>
                      <option value="ui-design">تصميم واجهات</option>
                      <option value="ux-design">تصميم تجربة المستخدم</option>
                      <option value="branding">الهوية البصرية</option>
                      <option value="app-design">تصميم تطبيقات</option>
                    </select>
                    <HiChevronLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl rotate-[-90deg]" />
                  </div>
                  <div className="relative">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>الميزانية</option>
                      <option value="500-1000">500$ - 1000$</option>
                      <option value="1000-5000">1000$ - 5000$</option>
                      <option value="5000+">5000$+</option>
                    </select>
                    <HiChevronLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl rotate-[-90deg]" />
                  </div>
                </div>

                {/* Row 4: Message */}
                <textarea
                  name="message"
                  placeholder="الرسالة"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 resize-none"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-accent-pink to-accent-pink-dark text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-glow-pink"
                >
                  <HiArrowLeft className="text-lg" />
                  <span>أرسل الرسالة</span>
                </button>
              </form>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Footer Section */}
      <footer id="footer" className="relative w-full bg-gradient-to-b from-[#1a1025] via-[#15101f] to-[#0d0d14] overflow-hidden rounded-t-[50px]">
        {/* Blur Effect - Right Side */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '1136px',
            height: '568px',
            top: '-599px',
            left: '838px',
            transform: 'rotate(-58.77deg)',
            background: 'linear-gradient(177.25deg, rgba(187, 161, 254, 0.8) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)',
            filter: 'blur(488px)',
            borderRadius: '50%',
          }}
        ></div>
        {/* Blur Effect - Left Side (Mirrored) */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '1136px',
            height: '568px',
            top: '-599px',
            left: '-838px',
            transform: 'rotate(58.77deg)',
            background: 'linear-gradient(177.25deg, rgba(187, 161, 254, 0.8) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)',
            filter: 'blur(488px)',
            borderRadius: '50%',
          }}
        ></div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Column 1: Newsletter - ابق على اطلاع */}
            <div className="text-right lg:order-4">
              <h4 className="text-white text-lg font-semibold mb-6">ابق على اطلاع</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                <button
                  type="submit"
                  className="w-10 h-10 bg-accent-purple rounded-lg flex items-center justify-center text-white hover:bg-accent-purple/80 transition-colors"
                >
                  <HiChevronLeft className="text-xl" />
                </button>
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 text-sm"
                  required
                />
              </form>
            </div>

            {/* Column 2: Contact Info - للتواصل */}
            <div className="text-right lg:order-3">
              <h4 className="text-white text-lg font-semibold mb-6">للتواصل</h4>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-text-secondary hover:text-accent-pink transition-colors duration-300 text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Important Links - روابط مهمة */}
            <div className="text-right lg:order-2">
              <h4 className="text-white text-lg font-semibold mb-6">روابط مهمة</h4>
              <ul className="space-y-3">
                {importantLinks.map((link, index) => (
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

            {/* Column 4: Logo and Description */}
            <div className="lg:order-1 text-right">
              {/* Logo */}
              <div className="mb-6">
                <img src={logo} alt="Eman Logo" className="h-16 w-auto ml-auto" />
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                مصممة تجارب مستخدم وواجهات رقمية أعمل على تحويل الأفكار إلى تجارب
                مرئية مدروسة، تجمع بين البساطة، الوضوح، والهوية البصرية المتناسقة. أؤمن
                بأن التصميم الجيد يبدأ بفهم المستخدم وينتهي بتجربة تُحسن قِيَل أن تُرى.
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-end gap-2">
                {footerSocialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 bg-white/5 hover:bg-accent-pink rounded-full flex items-center justify-center text-text-secondary hover:text-white transition-all duration-300"
                  >
                    <social.icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
              {/* Copyright */}
              <p className="text-center md:text-right order-2 md:order-1">
                Copyright© 2025 وكالة سمارت ديف
              </p>

              {/* Privacy Links */}
              <div className="flex items-center gap-4 order-1 md:order-2">
                <a href="#" className="text-accent-pink hover:text-accent-pink-light transition-colors duration-300">
                  User Terms & Conditions
                </a>
                <span className="text-white/30">|</span>
                <a href="#" className="text-accent-pink hover:text-accent-pink-light transition-colors duration-300">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
