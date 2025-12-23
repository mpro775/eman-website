import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

// استيراد الصور
import heroImage from "../../assets/images/image.png";
import sparkImage from "../../assets/images/1.svg";
import arrowImage from "../../assets/images/2.svg";
import quoteIcon from "../../assets/images/3.png";
import uxUiDesignerImage from "../../assets/images/UxUiDesginer.png";
import appDeveloperImage from "../../assets/images/appDeveloper.png";
import graphicDesignerImage from "../../assets/images/GraphicDesginer.png";

// مكون فرعي للبطاقات العائمة
const FloatingImage = ({ src, alt, className, delay, width }: any) => (
    <motion.div
        className={`absolute z-20 ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
    >
        <motion.img
            src={src}
            alt={alt}
            className="drop-shadow-2xl h-auto"
            style={{ width: width || "140px" }}
            animate={{
                y: [0, -15, 0],
            }}
            transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
        />
    </motion.div>
);

// Props type
interface HeroAboutSectionProps {
    isAboutView: boolean;
    onViewChange?: (isAbout: boolean) => void;
}

const HeroAboutSection: React.FC<HeroAboutSectionProps> = ({ isAboutView }) => {
    // Animation duration
    const transitionDuration = 0.8;
    const transitionEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

    // Variants للعناصر المختلفة
    const imageVariants = {
        hero: {
            x: "-50%",
            y: 0,
            left: "50%",
            bottom: "0px",
            width: "906.4px",
            height: "605.3px",
            scale: 1,
        },
        about: {
            x: "0%",
            y: 0,
            left: "0%",
            bottom: "0px",
            width: "100%",
            height: "750px",
            scale: 1,
        },
    };

    const heroElementsVariants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -30 },
    };

    const aboutElementsVariants = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: 50 },
    };

    return (
        <section
            id="home"
            className="scroll-section relative w-full min-h-screen bg-bg-primary overflow-hidden flex items-center justify-center"
        >
            {/* Canvas Container - 1444px × 918px */}
            <div
                className="relative w-full max-w-[1444px] mx-auto overflow-visible"
                style={{ height: '918px' }}
            >

                {/* خلفية الإضاءة البنفسجية */}
                <motion.div
                    className="absolute pointer-events-none z-0"
                    animate={{
                        top: isAboutView ? '0px' : '-100px',
                        left: isAboutView ? 'auto' : '-200px',
                        right: isAboutView ? '0px' : 'auto',
                    }}
                    transition={{ duration: transitionDuration, ease: transitionEase }}
                    style={{
                        width: '700px',
                        height: '700px',
                        background: 'radial-gradient(circle, rgba(157, 78, 221, 0.4) 0%, transparent 60%)',
                        filter: 'blur(100px)',
                    }}
                />

                {/* خلفية الإضاءة الوردية - تتحرك خلف الصورة في About */}
                <motion.div
                    className="absolute pointer-events-none z-0"
                    animate={{
                        bottom: isAboutView ? '0px' : '-100px',
                        left: isAboutView ? '-10%' : '50%',
                        transform: isAboutView ? 'translateX(0%)' : 'translateX(-50%)',
                    }}
                    transition={{ duration: transitionDuration, ease: transitionEase }}
                    style={{
                        width: '900px',
                        height: '600px',
                        background: 'radial-gradient(ellipse, rgba(217, 119, 139, 0.7) 0%, transparent 70%)',
                        filter: 'blur(100px)',
                    }}
                />

                {/* خلفية إضاءة بنفسجية إضافية - تظهر في About لتغطية المنطقة الداكنة */}
                <motion.div
                    className="absolute pointer-events-none z-0"
                    animate={{
                        opacity: isAboutView ? 1 : 0,
                    }}
                    transition={{ duration: transitionDuration, ease: transitionEase }}
                    style={{
                        top: '20%',
                        left: '-5%',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(157, 78, 221, 0.5) 0%, transparent 60%)',
                        filter: 'blur(120px)',
                    }}
                />

                {/* ================= عناصر HERO (تختفي عند التحول) ================= */}
                <AnimatePresence>
                    {!isAboutView && (
                        <>
                            {/* الجزء العلوي: مرحباً + أنا إيمان */}
                            <motion.div
                                className="absolute left-1/2 flex flex-col items-center z-10"
                                style={{ top: '120px', transform: 'translateX(-50%)' }}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={heroElementsVariants}
                                transition={{ duration: 0.5 }}
                            >
                                {/* شارة مرحباً */}
                                <div className="relative">
                                    <img
                                        src={sparkImage}
                                        alt="Spark"
                                        className="absolute"
                                        style={{ top: '-18px', right: '-20px', width: '32px', height: '32px' }}
                                    />
                                    <div
                                        className="bg-white/5 border border-white/40 backdrop-blur-md rounded-full"
                                        style={{ padding: '8px 32px' }}
                                    >
                                        <span className="text-white font-medium shadow-none" style={{ fontSize: '20px' }}>
                                            مرحباً
                                        </span>
                                    </div>
                                </div>

                                {/* أنا إيمان */}
                                <h2
                                    className="text-white text-center"
                                    style={{
                                        fontFamily: '"Urbanist", "Tajawal", sans-serif',
                                        fontWeight: 600,
                                        fontSize: '83.48px',
                                        lineHeight: '140%',
                                        letterSpacing: '-0.015em',
                                        marginTop: '16px',
                                        paddingTop: '10px',
                                        paddingBottom: '10px',
                                    }}
                                >
                                    أنا{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-pink-dark inline-block relative py-1">
                                        إيمان.
                                    </span>
                                </h2>
                            </motion.div>

                            {/* UX/UI Designer - Hero */}
                            <motion.div
                                className="absolute w-full text-center pointer-events-none select-none z-[1]"
                                style={{ top: '300px' }}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={heroElementsVariants}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h1
                                    className="text-white"
                                    style={{
                                        fontFamily: '"Urbanist", "Tajawal", sans-serif',
                                        fontWeight: 600,
                                        fontSize: '83.48px',
                                        lineHeight: '100%',
                                        letterSpacing: '-0.015em',
                                    }}
                                >
                                    UX/UI Designer
                                </h1>
                            </motion.div>

                            {/* رسمة السهم */}
                            <motion.img
                                src={arrowImage}
                                alt="Arrow decoration"
                                className="absolute z-10"
                                style={{ left: '360px', top: '340px', width: '100px', height: '60px' }}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={heroElementsVariants}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />

                            {/* الاقتباس */}
                            <motion.div
                                className="absolute z-30 text-right"
                                style={{ right: '50px', top: '400px', maxWidth: '450px' }}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={heroElementsVariants}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <img
                                    src={quoteIcon}
                                    alt="Quote"
                                    className="block"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        marginBottom: '24px',
                                        marginRight: 'auto',
                                        marginLeft: '0',
                                    }}
                                />
                                <p
                                    className="text-white"
                                    style={{
                                        fontFamily: '"Urbanist", "Tajawal", sans-serif',
                                        fontWeight: 400,
                                        fontSize: '24px',
                                        lineHeight: '111%',
                                        letterSpacing: '-0.015em',
                                        textAlign: 'right',
                                        direction: 'rtl',
                                    }}
                                >
                                    أؤمــــن بــأن جوهــــــــــر التـــصميم يكمــــــــن
                                    <br />
                                    في <span className="font-medium text-accent-pink-light">الإحساس</span>، لذا أعمل على تصميـــــم
                                    <br />
                                    تجــارب رقميــــة واعيـــــة، وبناء واجهــــــات
                                    <br />
                                    مســــــتخدم تعكـــــس هويــــة الـــعلامــــــة
                                    <br />
                                    التجاريــــة بدقــــــة وتـــــــوازن بين الجمـــــال
                                    <br />
                                    والوضوح.
                                </p>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* ================= عناصر ABOUT (تظهر عند التحول) ================= */}
                <AnimatePresence>
                    {isAboutView && (
                        <>
                            {/* العنوان "من أنا" */}
                            <motion.div
                                className="absolute right-[50px] top-[50px] z-20"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={aboutElementsVariants}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="relative inline-block">
                                    <h2 className="text-2xl md:text-3xl text-white font-arabic font-bold pb-2 pl-4">
                                        مـــن أنا
                                    </h2>
                                    <span className="absolute bottom-1 right-0 w-12 h-1 bg-gradient-to-l from-[var(--color-accent-purple)] to-transparent rounded-full"></span>
                                </div>
                            </motion.div>

                            {/* الصندوق الشفاف مع المحتوى */}
                            <motion.div
                                className="absolute right-[50px] top-[120px] z-20 w-[50%]"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={aboutElementsVariants}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="relative rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-10 lg:p-12 overflow-hidden group hover:border-white/20 transition-colors duration-500">

                                    {/* تأثير إضاءة خفيف */}
                                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--color-accent-pink)] opacity-[0.08] blur-[80px] rounded-full pointer-events-none" />

                                    {/* الاسم العربي */}
                                    <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-arabic font-bold text-[var(--color-accent-pink)] mb-0 leading-tight drop-shadow-lg">
                                        إيمان جميل
                                    </h1>

                                    {/* المسمى الوظيفي */}
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
                                        <a
                                            href="#contact"
                                            className="px-8 py-3.5 rounded-full border border-white/20 text-white font-arabic text-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                                        >
                                            تواصل معي
                                        </a>
                                        <a
                                            href="#portfolio"
                                            className="group relative px-8 py-3.5 rounded-full overflow-hidden text-white font-arabic text-lg font-bold shadow-[var(--shadow-glow-pink)] transition-transform hover:scale-105"
                                            style={{ background: "linear-gradient(135deg, #d9778b 0%, #b55a6d 100%)" }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center gap-2">
                                                <HiArrowUpRight className="text-xl" />
                                                أعمالي
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* البطاقات العائمة */}
                            <FloatingImage
                                src={uxUiDesignerImage}
                                alt="UX/UI Designer"
                                className="left-[35%] top-[10%]"
                                width="140px"
                                delay={0.4}
                            />
                            <FloatingImage
                                src={appDeveloperImage}
                                alt="App Developer"
                                className="left-[5%] top-[40%]"
                                width="150px"
                                delay={0.7}
                            />
                            <FloatingImage
                                src={graphicDesignerImage}
                                alt="Graphic Designer"
                                className="left-[30%] bottom-[15%]"
                                width="145px"
                                delay={1.0}
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* ================= الصورة الشخصية (مشتركة - تتحرك) ================= */}
                <motion.div
                    className="absolute z-[15]"
                    initial={false}
                    animate={isAboutView ? "about" : "hero"}
                    variants={imageVariants}
                    transition={{ duration: transitionDuration, ease: transitionEase }}
                >
                    <img
                        src={heroImage}
                        alt="Eman UI Designer"
                        className="w-full h-full object-contain grayscale contrast-100 brightness-90"
                    />
                </motion.div>

                {/* ================= الدوك العائم (مشترك - يتحرك) ================= */}
                <AnimatePresence>
                    {!isAboutView && (
                        <motion.div
                            className="absolute z-20 left-1/2"
                            style={{ bottom: '48px' }}
                            initial={{ opacity: 0, y: 20, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div
                                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-black/50 flex items-center"
                                style={{ padding: '6px', gap: '6px' }}
                            >
                                <a
                                    href="#contact"
                                    className="text-white font-medium transition-all hover:bg-white/10 rounded-full"
                                    style={{ padding: '16px 40px', fontSize: '18px' }}
                                >
                                    تواصل معي
                                </a>
                                <button
                                    className="bg-gradient-to-r from-accent-pink to-accent-pink-dark text-white font-bold rounded-full flex items-center transition-all hover:scale-105 hover:shadow-glow-pink"
                                    style={{ padding: '16px 40px', fontSize: '18px', gap: '10px' }}
                                >
                                    <HiArrowUpRight style={{ fontSize: '22px' }} />
                                    <span>أعمالي</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default HeroAboutSection;
