import React from "react";
import { motion, useInView } from "framer-motion";
import Container from "../../components/common/Container";
import iconDigitalMarketing from "../../assets/images/Group 9.png";
import iconGraphicDesign from "../../assets/images/Group 10 (1).png";
import iconUXUI from "../../assets/images/Group 10.png";

interface ServiceItem {
  id: number;
  englishTitle: string;
  arabicDescription: string;
  icon: string;
}

const ServicesSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // بيانات الخدمات من الصورة
  const services: ServiceItem[] = [
    {
      id: 1,
      englishTitle: "Digital Marketing",
      arabicDescription:
        "إنشاء صفحات السوشل ميديا, وإدارة الحملات الإعلانية، والرد على العملاء",
      icon: iconDigitalMarketing,
    },
    {
      id: 2,
      englishTitle: "Graphic Designs",
      arabicDescription:
        "تصميم الهوية التجارية المتكاملة ، شعارات . بوسترات إعلانية و بنرات",
      icon: iconGraphicDesign,
    },
    {
      id: 3,
      englishTitle: "UX / UI Design",
      arabicDescription:
        "تطبيقات الموبايل ، المواقع الإلكترونية ، لوحات التحكم و الإنظمة المتكاملة",
      icon: iconUXUI,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section
      id="services"
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
              خدماتي
            </h2>
            {/* الخط تحت العنوان - متدرج */}
            <div
              className="h-[3px] rounded-full mt-2"
              style={{
                background: 'linear-gradient(to left, #6366f1, #8b5cf6, transparent)',
                width: '100%',
                maxWidth: '180px',
              }}
            />
          </motion.div>

          {/* بطاقات الخدمات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-[#1e1e2e]/90 backdrop-blur-sm border border-accent-purple/30 rounded-2xl p-6 lg:p-8 h-full flex flex-col hover:border-accent-purple/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(157,78,221,0.3)]">
                  {/* أيقونة الخدمة في دائرة متدرجة */}
                  <div className="mb-6 flex items-center justify-start">
                    <div
                      className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(157,78,221,1) 0%, rgba(255,105,180,0.9) 50%, rgba(255,165,0,0.8) 100%)",
                        boxShadow: `0 0 20px rgba(157,78,221,0.6)`,
                      }}
                    >
                      <img
                        src={service.icon}
                        alt={service.englishTitle}
                        className="w-10 h-10 lg:w-12 lg:h-12 object-contain filter brightness-0 invert"
                      />
                    </div>
                  </div>

                  {/* العنوان الإنجليزي */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-accent-purple-light transition-colors">
                    {service.englishTitle}
                  </h3>

                  {/* الوصف العربي */}
                  <p className="text-sm lg:text-base text-white/90 leading-relaxed text-right flex-grow">
                    {service.arabicDescription}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ServicesSection;
