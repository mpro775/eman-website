import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowLeft, HiPhone, HiEnvelope } from "react-icons/hi2";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import Container from "../../components/common/Container";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    address: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const socialLinks = [
    { icon: FaFacebookF, href: "#", color: "hover:bg-blue-600" },
    { icon: FaTwitter, href: "#", color: "hover:bg-sky-500" },
    { icon: FaLinkedinIn, href: "#", color: "hover:bg-blue-700" },
    { icon: FaInstagram, href: "#", color: "hover:bg-pink-600" },
    { icon: FaYoutube, href: "#", color: "hover:bg-red-600" },
  ];

  return (
    <section
      id="contact"
      className="scroll-section relative w-full bg-bg-primary overflow-hidden py-20"
    >
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
            className="order-2 lg:order-1"
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
            <div className="space-y-4 mb-8">
              {/* Phone */}
              <div className="flex items-center justify-end gap-4">
                <div className="text-right">
                  <p className="text-text-muted text-xs mb-1">تواصل معي</p>
                  <p className="text-white font-medium">+1-202-555-0190</p>
                </div>
                <div className="w-10 h-10 bg-accent-pink/20 rounded-full flex items-center justify-center">
                  <HiPhone className="text-accent-pink text-lg" />
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-end gap-4">
                <div className="text-right">
                  <p className="text-text-muted text-xs mb-1">أرسل لي رسالة</p>
                  <p className="text-white font-medium">emyjameel1@gmail.com</p>
                </div>
                <div className="w-10 h-10 bg-accent-pink/20 rounded-full flex items-center justify-center">
                  <HiEnvelope className="text-accent-pink text-lg" />
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <p className="text-text-secondary text-sm mb-4 text-right">
                تابعني على منصات التواصل الاجتماعي
              </p>
              <div className="flex items-center justify-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:scale-110`}
                  >
                    <social.icon className="text-base" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Left Side - Contact Form */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Form Heading */}
            <h3 className="text-white text-lg md:text-xl font-medium mb-6 text-right flex items-center justify-end gap-2">
              <span>فقط قل مرحباً</span>
              <span className="text-2xl">👋</span>
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="الإيميل"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم الكامل"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Row 2: Address */}
              <input
                type="text"
                name="address"
                placeholder="العنوان"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300"
              />

              {/* Row 3: Service & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                  style={{ direction: "rtl" }}
                >
                  <option value="" disabled>الميزانية</option>
                  <option value="500-1000">500$ - 1000$</option>
                  <option value="1000-5000">1000$ - 5000$</option>
                  <option value="5000+">5000$+</option>
                </select>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                  style={{ direction: "rtl" }}
                >
                  <option value="" disabled>الخدمة</option>
                  <option value="ui-design">تصميم واجهات</option>
                  <option value="ux-design">تصميم تجربة المستخدم</option>
                  <option value="branding">الهوية البصرية</option>
                  <option value="app-design">تصميم تطبيقات</option>
                </select>
              </div>

              {/* Row 4: Message */}
              <textarea
                name="message"
                placeholder="الرسالة"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 resize-none"
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
    </section>
  );
};

export default ContactSection;
