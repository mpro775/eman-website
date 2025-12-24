import React from "react";
import { motion, useInView } from "framer-motion";
import Container from "../../components/common/Container";

interface ExperienceItem {
  id: number;
  title: string;
  description: string;
}

const ExperienceSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });

  // بيانات الخبرات العملية من الصورة
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "UX/UI",
      description: "في محفظة جيب",
    },
    {
      id: 2,
      title: "أستاذ مساعد",
      description: "في جامعة العلوم الحديثة",
    },
    {
      id: 3,
      title: "أستاذة UX/UI",
      description: "في أكاديمية سمارت ديف",
    },
    {
      id: 4,
      title: "Graphic Designer",
      description: "في وكالة حريف",
    },
    {
      id: 5,
      title: "UX/UI & Graphic Designer",
      description: "أعمال حرة",
    },
    {
      id: 6,
      title: "دعم فني",
      description: "في مجموعة هائل سعيد أنعم",
    },
    {
      id: 7,
      title: "Flutter App",
      description: "مشروع تخرج في جامعة العلوم الحديثة",
    },
    {
      id: 8,
      title: "سكرتارية + أمين صندوق",
      description: "في مركز يونك للأنظمة المحاسبية",
    },
  ];

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

  // تقسيم الخبرات إلى عمودين
  const rightColumnExperiences = experiences.slice(0, 4); // 1-4
  const leftColumnExperiences = experiences.slice(4, 8); // 5-8

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-section relative min-h-screen w-full bg-gradient-to-b from-[#1a0e2e] via-[#0f0a1a] to-[#0a0a0f] flex items-center justify-center pt-[100px] pb-20"
    >
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full"
        >
          {/* العنوان الرئيسي */}
          <motion.div variants={itemVariants} className="mb-16 text-right">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 relative inline-block">
              الخبـــرات العملية
            </h2>
            {/* الخط تحت العنوان - متدرج */}
            <div
              className="h-[3px] rounded-full mt-2"
              style={{
                background: 'linear-gradient(to left, #6366f1, #8b5cf6, transparent)',
                width: '100%',
                maxWidth: '400px',
              }}
            />
          </motion.div>

          {/* محتوى الخبرات */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 relative">
            {/* العمود الأيمن (الخبرات 1-4) */}
            <div className="flex flex-col gap-8 relative">
              {/* الخط العمودي المتصل للعمود الأيمن */}
              <div className="absolute right-[-40px] lg:right-[-60px] top-0 bottom-0 w-0.5 bg-accent-purple hidden lg:block"></div>

              {rightColumnExperiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  className="relative flex items-center gap-4 flex-row-reverse group"
                >
                  {/* البطاقة */}
                  <div className="flex-1 bg-[#1e1e2e]/90 backdrop-blur-sm border border-accent-purple/30 rounded-xl p-6 relative hover:border-accent-purple/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(157,78,221,0.3)] group">
                    <div className="text-right">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent-purple-light transition-colors">
                        {experience.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#b4b4b4]">
                        {experience.description}
                      </p>
                    </div>
                  </div>

                  {/* السهم بين البطاقة والدائرة */}
                  <div className="hidden lg:flex items-center justify-center text-white/60 text-xl group-hover:text-accent-purple transition-colors">
                    &gt;
                  </div>

                  {/* الدائرة المرقمة - خارج البطاقة على اليمين */}
                  <div className="relative flex-shrink-0 hidden lg:flex items-center justify-center w-14 h-14">
                    {/* الدائرة المجسمة */}
                    <div
                      className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(157,78,221,0.8), rgba(209, 97, 253,0.8) 40%, rgba(100,50,180,0.9))",
                        boxShadow: `
                          0 0 20px rgba(157,78,221,0.6),
                        `,
                      }}
                    >
                      {/* Highlight لإعطاء تأثير الضوء */}
                      <div className="absolute top-2 left-3 w-4 h-4 rounded-full "></div>
                      <span className="text-white font-bold text-xl relative z-10 ">
                        {experience.id}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* العمود الأيسر (الخبرات 5-8) */}
            <div className="flex flex-col gap-8 relative mt-8 lg:mt-0">
              {/* الخط العمودي المتصل للعمود الأيسر */}
              <div className="absolute left-[-40px] lg:left-[-60px] top-0 bottom-0 w-0.5 bg-accent-purple hidden lg:block"></div>

              {leftColumnExperiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  className="relative flex items-center gap-4 flex-row-reverse group"
                >
                  {/* البطاقة */}
                  <div className="flex-1 bg-[#1e1e2e]/90 backdrop-blur-sm border border-accent-purple/30 rounded-xl p-6 relative hover:border-accent-purple/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(157,78,221,0.3)] group">
                    <div className="text-right">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent-purple-light transition-colors">
                        {experience.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#b4b4b4]">
                        {experience.description}
                      </p>
                    </div>
                  </div>

                  {/* السهم بين البطاقة والدائرة */}
                  <div className="hidden lg:flex items-center justify-center text-white/60 text-xl group-hover:text-accent-purple transition-colors">
                    &gt;
                  </div>

                  {/* الدائرة المرقمة - خارج البطاقة على اليسار */}
                  <div className="relative flex-shrink-0 hidden lg:flex items-center justify-center w-14 h-14">
                    {/* الدائرة المجسمة */}
                    <div
                      className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(157,78,221,0.8), rgba(209, 97, 253,0.8) 40%, rgba(100,50,180,0.9))",
                        boxShadow: `
                          0 0 20px rgba(157,78,221,0.6),
                          0 8px 16px rgba(0,0,0,0.4),
                          inset -3px -3px 8px rgba(0,0,0,0.3),
                          inset 3px 3px 8px rgba(255,255,255,0.2)
                        `,
                      }}
                    >
                      {/* Highlight لإعطاء تأثير الضوء */}
                      <div className="absolute top-2 left-3 w-4 h-4 rounded-full opacity-60"></div>
                      <span className="text-white font-bold text-xl relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {experience.id}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ExperienceSection;
