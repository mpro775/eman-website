import React from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import heroImage from "../../assets/images/image.png";
import sparkImage from "../../assets/images/1.svg";
import arrowImage from "../../assets/images/2.svg";
import quoteIcon from "../../assets/images/3.png";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="scroll-section relative w-full min-h-screen bg-bg-primary overflow-hidden flex items-center justify-center"
    >
      {/* Canvas Container - 1444px × 918px مع التوسيط */}
      <div
        className="relative w-full max-w-[1444px] mx-auto overflow-visible"
        style={{ height: '918px' }}
      >

        {/* خلفية الإضاءة البنفسجية (Top Left) */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '-100px',
            left: '-200px',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(157, 78, 221, 0.4) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />

        {/* خلفية الإضاءة الوردية (Bottom Center) */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            bottom: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(217, 119, 139, 0.6) 0%, transparent 60%)',
            filter: 'blur(120px)',
          }}
        />

        {/* الجزء العلوي: مرحباً + أنا إيمان */}
        <div
          className="absolute left-1/2 flex flex-col items-center z-10"
          style={{
            top: '80px',
            transform: 'translateX(-50%)',
          }}
        >
          {/* شارة مرحباً */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* رسمة السبارك */}
            <img
              src={sparkImage}
              alt="Spark"
              className="absolute"
              style={{
                top: '-14px',
                right: '-18px',
                width: '28px',
                height: '28px',
              }}
            />
            <div
              className="bg-white/5 border border-white/40 backdrop-blur-md rounded-full"
              style={{ padding: '8px 28px' }}
            >
              <span className="text-white font-medium" style={{ fontSize: '18px' }}>
                مرحباً
              </span>
            </div>
          </motion.div>

          {/* أنا إيمان */}
          <motion.h2
            className="font-heading text-white text-center"
            style={{
              fontSize: '80px',
              lineHeight: '1',
              marginTop: '4px',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            أنا{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-pink-dark">
              إيمان.
            </span>
          </motion.h2>
        </div>

        {/* UX/UI Designer - النص الكبير */}
        <motion.div
          className="absolute w-full text-center pointer-events-none select-none z-[1]"
          style={{ top: '210px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1
            className="font-english text-white"
            style={{
              fontSize: '140px',
              fontWeight: 700,
              lineHeight: '1',
              letterSpacing: '-0.03em',
            }}
          >
            UX/UI{" "}
            <span style={{ fontWeight: 300 }}>Designer</span>
          </h1>
        </motion.div>

        {/* رسمة السهم - يسار */}
        <motion.img
          src={arrowImage}
          alt="Arrow decoration"
          className="absolute z-10"
          style={{
            left: '100px',
            top: '360px',
            width: '100px',
            height: '60px',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        />

        {/* الاقتباس - يمين */}
        <motion.div
          className="absolute z-30 text-right"
          style={{
            right: '50px',
            top: '400px',
            maxWidth: '340px',
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* أيقونة الاقتباس */}
          <img
            src={quoteIcon}
            alt="Quote"
            className="block"
            style={{
              width: '52px',
              height: '52px',
              marginBottom: '20px',
              marginLeft: 'auto',
            }}
          />
          <p
            className="text-white font-arabic"
            style={{
              fontSize: '24px',
              lineHeight: '1.7',
              fontWeight: 400,
            }}
          >
            أؤمن بأن جوهر التصميم يكمن
            <br />
            في <span className="font-medium text-accent-pink-light">الإحساس</span>، لذا أعمل على تصميم
            <br />
            تجارب رقمية واعية، وبناء واجهات
            <br />
            مستخدم تعكس هوية العلامة
            <br />
            التجارية بدقة وتوازن بين الجمال
            <br />
            والوضوح.
          </p>
        </motion.div>

        {/* الصورة الشخصية - أسفل المنتصف */}
        <motion.div
          className="absolute z-[15] left-1/2"
          style={{
            bottom: '0px',
            transform: 'translateX(-50%)',
            width: '480px',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={heroImage}
            alt="Eman UI Designer"
            className="w-full h-auto object-contain grayscale contrast-100 brightness-90"
          />
        </motion.div>

        {/* الدوك العائم (Floating Dock) - أسفل المنتصف */}
        <motion.div
          className="absolute z-20 left-1/2"
          style={{
            bottom: '40px',
            transform: 'translateX(-50%)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-black/50 flex items-center"
            style={{ padding: '6px', gap: '4px' }}
          >
            {/* زر تواصل معي */}
            <a
              href="#contact"
              className="text-white font-medium transition-all hover:bg-white/10 rounded-full"
              style={{ padding: '14px 36px', fontSize: '18px' }}
            >
              تواصل معي
            </a>

            {/* زر أعمالي */}
            <button
              className="bg-gradient-to-r from-accent-pink to-accent-pink-dark text-white font-bold rounded-full flex items-center transition-all hover:scale-105 hover:shadow-glow-pink"
              style={{ padding: '14px 36px', fontSize: '18px', gap: '8px' }}
            >
              <HiArrowUpRight style={{ fontSize: '20px' }} />
              <span>أعمالي</span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
