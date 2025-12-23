import React from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import Container from "../../components/common/Container";
import heroImage from "../../assets/images/image.png";
import sparkImage from "../../assets/images/1.svg";
import arrowImage from "../../assets/images/2.svg";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="scroll-section relative min-h-screen min-h-[100dvh] w-full bg-bg-primary overflow-hidden flex items-center justify-center pt-16 sm:pt-20 md:pt-24"
    >
      {/* خلفية الإضاءة (Spotlight Effect) - متجاوبة */}
      <div className="absolute top-0 -left-[100px] sm:-left-[150px] md:-left-[200px] lg:-left-[300px] w-[70%] sm:w-[60%] md:w-full h-[50%] sm:h-[60%] md:h-[70%] max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] bg-accent-purple/20 sm:bg-accent-purple/25 md:bg-accent-purple/30 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* تأثير الإضاءة من الأسفل (Bottom Spotlight Effect) - متجاوب */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] sm:w-[90%] md:w-full h-[20%] sm:h-[25%] md:h-[30%] max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] bg-accent-pink/30 sm:bg-accent-pink/40 md:bg-accent-pink/50 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Container>
        <div className="relative z-[10] w-full flex flex-col items-center justify-start min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-100px)] px-4 sm:px-6 md:px-0 pt-4 sm:pt-6 md:pt-8">
          {/* الجزء العلوي: النصوص */}
          <div className="flex flex-col items-center relative">
            {/* التاج: مرحباً - متجاوب */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* رسمة السبارك - متجاوبة */}
              <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 md:-top-6 md:-right-6">
                <img
                  src={sparkImage}
                  alt="Spark decoration"
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
              </div>

              <div className="bg-white/5 border border-white/40 px-4 sm:px-5 md:px-6 py-1 rounded-full backdrop-blur-md relative z-10">
                <span className="text-white text-xs sm:text-sm md:text-base font-medium">
                  مرحباً
                </span>
              </div>
            </motion.div>

            {/* العنوان الرئيسي: أنا إيمان - متجاوب */}
            <motion.div
              className="text-center relative z-20 mt-0 sm:mt-1 md:mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-heading text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] text-white leading-tight">
                أنا{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-pink-dark">
                  إيمان.
                </span>
              </h2>
            </motion.div>
          </div>

          {/* الجزء الأوسط: النص الكبير + الصورة (الصورة أمام النص) */}
          <div className="relative w-full flex flex-col items-center justify-center mt-[-10px] sm:mt-[-15px] md:mt-[-25px]">
            {/* النص الكبير UX/UI Designer - يأتي خلف الصورة */}
            <motion.div
              className="relative z-[1] text-center pointer-events-none select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="font-english text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] font-bold text-white leading-none tracking-tighter opacity-100 mix-blend-overlay">
                UX/UI <span className="font-light">Designer</span>
              </h1>
            </motion.div>

            {/* رسمة السهم - على يسار الصورة تحت UX/UI */}
            <motion.div
              className="absolute z-[10] left-[5%] sm:left-[10%] md:left-[15%] lg:left-[18%] xl:left-[20%] top-[60%] sm:top-[55%] md:top-[50%]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <img
                src={arrowImage}
                alt="Arrow decoration"
                className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-16 lg:w-32 lg:h-20"
              />
            </motion.div>

          </div>

          {/* الاقتباس للموبايل - يظهر فقط على الموبايل */}
          <motion.div
            className="block lg:hidden w-full max-w-[320px] sm:max-w-[400px] text-center mt-4 mb-2 px-4 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light">
              أؤمن بأن جوهر التصميم يكمن في{" "}
              <span className="text-white font-medium">الإحساس</span>، لذا
              أعمل على تصميم تجارب رقمية واعية.
            </p>
          </motion.div>

          {/* الاقتباس (يمين الشاشة - مخفي في الموبايل والتابلت) */}
          <motion.div
            className="absolute right-4 lg:right-8 xl:right-16 top-[45%] lg:top-[50%] max-w-[250px] lg:max-w-[280px] xl:max-w-[320px] hidden lg:block z-30 text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-2xl lg:text-3xl xl:text-4xl text-left text-white/80 font-english block mb-1 lg:mb-2 leading-none">
              "
            </span>
            <p className="text-white text-sm lg:text-base xl:text-lg leading-normal font-light text-justify">
              أؤمن بأن جوهر التصميم يكمن في{" "}
              <span className="text-white font-medium">الإحساس</span>، لذا
              أعمل على تصميم تجارب رقمية واعية، وبناء واجهات مستخدم تعكس هوية
              العلامة التجارية بدقة وتوازن بين الجمال والوضوح.
            </p>
          </motion.div>

        </div>
      </Container>

      {/* الصورة الشخصية - ملتصقة بأسفل القسم */}
      <motion.div
        className="absolute z-[15] w-full max-w-[320px] sm:max-w-[420px] md:max-w-[550px] lg:max-w-[650px] xl:max-w-[750px] bottom-0 left-1/2 -translate-x-1/2"
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

      {/* الجزء السفلي: الدوك العائم (Floating Dock) - أمام الصورة */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-[20] w-[calc(100%-2rem)] sm:w-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-0.5 rounded-full shadow-2xl shadow-black/50 flex items-center justify-center gap-0.5 sm:gap-1">
          {/* زر تواصل معي - متجاوب */}
          <a
            href="#contact"
            className="text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-medium text-xs sm:text-sm md:text-base transition-all hover:bg-white/10 hover:shadow-glow-pink whitespace-nowrap"
          >
            تواصل معي
          </a>

          {/* زر أعمالي - متجاوب */}
          <button className="bg-gradient-to-r from-accent-pink to-accent-pink-dark text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-1.5 md:gap-2 transition-all hover:scale-105 hover:shadow-glow-pink whitespace-nowrap">
            <HiArrowUpRight className="text-sm sm:text-base md:text-lg" />
            <span>أعمالي</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
