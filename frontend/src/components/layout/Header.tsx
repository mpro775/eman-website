import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiDownload, HiMenuAlt3, HiX } from "react-icons/hi";
import Container from "../common/Container";
import logoImage from "../../assets/images/logo.png";
import downloadIcon from "../../assets/images/download.svg";
import { useView } from "../../context/ViewContext";

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { setIsAboutView } = useView();

  const navLinks = useMemo(
    () => [
      { name: "الرئيسية", href: "#home", id: "home" },
      { name: "من أنا", href: "#about", id: "about" },
      { name: "الخبرات العملية", href: "#experience", id: "experience" },
      { name: "أعمالي", href: "#portfolio", id: "portfolio" },
      { name: "تواصل معي", href: "#contact", id: "contact" },
    ],
    []
  );

  // Handle scroll for background change
  useEffect(() => {
    const handleScrollEffect = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScrollEffect);
    return () => window.removeEventListener("scroll", handleScrollEffect);
  }, []);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-100px 0px -50% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // Handle Hero/About toggle
    if (id === 'about') {
      setIsAboutView(true);
      setActiveSection('about');
      // Scroll to home section (where about is displayed)
      const element = document.getElementById('home');
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (id === 'home') {
      setIsAboutView(false);
      setActiveSection('home');
      // Scroll to home section
      const element = document.getElementById('home');
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // For other sections, scroll to them normally
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Animation variants - RTL: slide from right
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] py-4 md:py-6 rtl transition-all duration-300 ${isScrolled
          ? "bg-bg-primary/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
          }`}
      >
        <Container>
          <nav className="flex items-center justify-between">
            {/* Logo - Right Side (RTL: appears first = right) */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={logoImage}
                alt="Eman Logo"
                className="h-10 sm:h-12 md:h-[50px] w-auto object-contain transition-all duration-300 hover:scale-105"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(198, 117, 136, 0.3))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter =
                    "drop-shadow(0 0 15px rgba(198, 117, 136, 0.5))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter =
                    "drop-shadow(0 0 10px rgba(198, 117, 136, 0.3))";
                }}
              />
            </motion.div>

            {/* Navigation Links - Center (Desktop only) */}
            <ul className="hidden lg:flex items-center gap-10 xl:gap-14 list-none m-0 p-0 flex-1 justify-center">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`
                        text-xl transition-all duration-300 relative whitespace-nowrap font-arabic
                        ${isActive
                          ? "font-bold"
                          : "text-white hover:text-[#C67588] font-normal"
                        }
                      `}
                      style={{
                        color: isActive ? "#C67588" : undefined, // Explicit active color
                      }}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* CV Download - Left Side (RTL: appears last = left) */}
            <motion.a
              href="#cv"
              className="hidden lg:flex items-center gap-3 text-white transition-all duration-300 hover:text-accent-pink flex-shrink-0 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className="transition-colors duration-300"
                style={{
                  fontFamily: '"Urbanist", "Tajawal", sans-serif',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                }}
              >
                السيفي
              </span>
              <img
                src={downloadIcon}
                alt="Download"
                className="w-6 h-6 object-contain transition-all duration-300 group-hover:[filter:brightness(0)_saturate(100%)_invert(58%)_sepia(34%)_saturate(752%)_hue-rotate(305deg)_brightness(94%)_contrast(87%)]"
              />
            </motion.a>

            {/* Mobile Menu Button - Left Side (shows on mobile) */}
            <motion.button
              className="lg:hidden flex items-center justify-center w-10 h-10 text-text-primary hover:text-accent-pink transition-colors duration-300 z-[110]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMobileMenuOpen ? (
                <HiX className="text-2xl" />
              ) : (
                <HiMenuAlt3 className="text-2xl" />
              )}
            </motion.button>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel - RTL: slide from right */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-bg-primary/95 backdrop-blur-lg z-[106] lg:hidden shadow-2xl"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <motion.button
                  className="flex items-center justify-center w-10 h-10 text-text-primary hover:text-accent-pink transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                  aria-label="إغلاق القائمة"
                >
                  <HiX className="text-2xl" />
                </motion.button>
                <span className="text-accent-pink font-semibold text-lg">القائمة</span>
              </div>

              {/* Menu Links */}
              <nav className="p-6">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.id;
                    return (
                      <motion.li
                        key={link.name}
                        custom={index}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.id)}
                          className={`
                            block py-4 px-4 rounded-xl text-lg font-medium transition-all duration-300
                            ${isActive
                              ? "bg-accent-pink/20 text-accent-pink"
                              : "text-text-primary hover:bg-white/5 hover:text-accent-pink"
                            }
                          `}
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* CV Download in Mobile Menu */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  custom={navLinks.length}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <a
                    href="#cv"
                    className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-accent-pink to-accent-cyan text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-pink/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>تحميل السيفي</span>
                    <HiDownload className="text-xl" />
                  </a>
                </motion.div>
              </nav>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-accent-pink/10 to-transparent pointer-events-none" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
