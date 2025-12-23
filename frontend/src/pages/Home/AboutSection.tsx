import React from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import Container from "../../components/common/Container";

// استيراد الصور الخاصة بك
import emanImage from "../../assets/images/eman.png";
import uxUiDesignerImage from "../../assets/images/UxUiDesginer.png";
import appDeveloperImage from "../../assets/images/appDeveloper.png";
import graphicDesignerImage from "../../assets/images/GraphicDesginer.png";

// مكون فرعي لتبسيط حركة الصور العائمة
const FloatingImage = ({ src, alt, className, delay, width }: any) => (
  <motion.div
    className={`absolute z-20 ${className}`}
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    <motion.img
      src={src}
      alt={alt}
      className="drop-shadow-2xl h-auto"
      style={{ width: width || "140px" }} // حجم افتراضي قابل للتعديل
      animate={{
        y: [0, -15, 0], // حركة الطفو للأعلى والأسفل
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay, // تأخير مختلف لكل صورة لتبدو الحركة طبيعية
      }}
    />
  </motion.div>
);

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="scroll-section relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* خلفية الإضاءة (Glow Effects) */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[var(--color-accent-purple)] opacity-10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[var(--color-accent-pink)] opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        {/* العنوان العلوي "من أنا" */}
        <motion.div
          className="flex justify-end mb-8 lg:mb-0 relative z-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block">
            <h2 className="text-2xl md:text-3xl text-white font-arabic font-bold pb-2 pl-4">
              مـــن أنا
            </h2>
            <span className="absolute bottom-1 right-0 w-12 h-1 bg-gradient-to-l from-[var(--color-accent-purple)] to-transparent rounded-full"></span>
          </div>
        </motion.div>

        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* ================= القسم الأيمن: النصوص ================= */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* الصندوق الشفاف المحيط بالنص */}
            <div className="relative rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-10 lg:p-12 overflow-hidden group hover:border-white/20 transition-colors duration-500">

              {/* تأثير إضاءة خفيف داخل الصندوق */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--color-accent-pink)] opacity-[0.08] blur-[80px] rounded-full pointer-events-none" />

              {/* الاسم العربي (ضخم) */}
              <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-arabic font-bold text-[var(--color-accent-pink)] mb-0 leading-tight drop-shadow-lg">
                إيمان جميل
              </h1>

              {/* المسمى الوظيفي (إنجليزي) */}
              <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-english font-medium text-white mb-8 tracking-wide leading-tight">
                UX/UI Designer
              </h2>

              {/* النص الوصفي */}
              <p className="text-[var(--color-text-secondary)] font-arabic text-lg md:text-xl leading-relaxed mb-10 max-w-xl text-justify opacity-90 font-light">
                أؤمـــن بأن جوهـــر التصميم يكمـــن في الإحساس، لذا أعمل
                على تصميم تجارب رقمية واعية، وبناء واجهات مستـــخدم تعكس
                هويــة العلامة التجاريــة بدقـــة وتـــوازن بين الجمال والوضوح.
              </p>

              {/* الأزرار */}
              <div className="flex flex-row-reverse justify-end items-center gap-5">

                {/* زر تواصل معي (شفاف) */}
                <a
                  href="#contact"
                  className="px-8 py-3.5 rounded-full border border-white/20 text-white font-arabic text-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                >
                  تواصل معي
                </a>

                {/* زر أعمالي (متدرج) */}
                <a
                  href="#portfolio"
                  className="group relative px-8 py-3.5 rounded-full overflow-hidden text-white font-arabic text-lg font-bold shadow-[var(--shadow-glow-pink)] transition-transform hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #d9778b 0%, #b55a6d 100%)" }}
                >
                  {/* تأثير لمعان الزر */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                  <span className="relative flex items-center gap-2">
                    <HiArrowUpRight className="text-xl" />
                    أعمالي
                  </span>
                </a>

              </div>
            </div>
          </motion.div>

          {/* ================= القسم الأيسر: الصورة والبطاقات العائمة ================= */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start mt-8 lg:mt-0">
            {/* Image Container */}
            <div className="relative w-full h-[550px] md:h-[650px] lg:h-[750px] flex items-end justify-center">

              {/* الصورة الشخصية */}
              <motion.img
                src={emanImage}
                alt="Eman Jameel"
                className="relative z-10 w-full h-full object-contain grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94], // cubic-bezier for smooth professional feel
                  opacity: { duration: 0.6 },
                  scale: { duration: 1, ease: "easeOut" }
                }}
              />

              {/* تأثير خلف الصورة (Shadow/Glow) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] via-transparent to-transparent z-10 bottom-0 h-1/2 w-full opacity-80" />

              {/* --- البطاقات العائمة (الصور) --- */}

              {/* 1. UX/UI Designer (يمين، أعلى الكتف) */}
              <FloatingImage
                src={uxUiDesignerImage}
                alt="UX/UI Designer"
                className="-right-4 top-[10%] md:-right-8 md:top-[15%]"
                width="140px" // عدل الحجم حسب الحاجة
                delay={0.2}
              />

              {/* 2. App Developer (يسار، الوسط) */}
              <FloatingImage
                src={appDeveloperImage}
                alt="App Developer"
                className="-left-4 top-[40%] md:-left-12"
                width="150px"
                delay={0.7}
              />

              {/* 3. Graphic Designer (يمين، أسفل) */}
              <FloatingImage
                src={graphicDesignerImage}
                alt="Graphic Designer"
                className="right-0 bottom-[10%] md:right-8"
                width="145px"
                delay={1.2}
              />
            </div>
          </div>


        </div>
      </Container>
    </section>
  );
};

export default AboutSection;