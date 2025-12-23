import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../components/common/Container";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Fletcher Howard",
    position: "Chief Executive Officer",
    company: "GIGL",
    quote:
      "A great worker. He thinks about design and has a awesome working morale",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Cameron Williamson",
    position: "Chief Executive Officer",
    company: "GIGL",
    quote:
      '"Kevin Did a wonderful job animating set of static stickers. Work was done very quickly and the quality is outstanding. she managed to create great looking, flawless animation even with very limited number of frames allowed per stickers"',
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 3,
    name: "Savannah Nguyen",
    position: "Chief Executive Officer",
    company: "GIGL",
    quote:
      "Great Designer, does great work and is open to change. if you're a programmer and looking for a designer is definitely well qualified.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff =
      diff > testimonials.length / 2
        ? diff - testimonials.length
        : diff < -testimonials.length / 2
        ? diff + testimonials.length
        : diff;

    if (normalizedDiff === 0) {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
      };
    } else if (normalizedDiff === -1 || normalizedDiff === testimonials.length - 1) {
      return {
        x: -320,
        scale: 0.85,
        opacity: 0.6,
        zIndex: 5,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -(testimonials.length - 1)) {
      return {
        x: 320,
        scale: 0.85,
        opacity: 0.6,
        zIndex: 5,
      };
    } else {
      return {
        x: normalizedDiff > 0 ? 600 : -600,
        scale: 0.7,
        opacity: 0,
        zIndex: 1,
      };
    }
  };

  return (
    <section
      id="testimonials"
      className="scroll-section relative min-h-screen w-full bg-bg-primary overflow-hidden flex items-center justify-center py-20"
    >
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-[40%] h-[60%] bg-accent-purple/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-accent-pink/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Container>
        {/* Section Title */}
        <motion.div
          className="text-right mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-accent-pink text-2xl md:text-3xl font-medium">
            آراء العملاء
          </h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative w-full flex justify-center items-center min-h-[400px]">
          <div className="relative w-full max-w-[400px] h-[350px]">
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => {
                const style = getCardStyle(index);
                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute top-0 left-1/2 w-[300px] md:w-[350px] cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      x: style.x - 175,
                      scale: style.scale,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut" as const,
                    }}
                    onClick={() => setActiveIndex(index)}
                  >
                    {/* Card */}
                    <div
                      className={`relative bg-[#1a1a2e]/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 border transition-all duration-300 ${
                        index === activeIndex
                          ? "border-white/20 shadow-2xl"
                          : "border-white/10"
                      }`}
                    >
                      {/* Avatar */}
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                              index === activeIndex
                                ? "bg-gradient-to-r from-cyan-400 to-cyan-600 blur-md opacity-60"
                                : "opacity-0"
                            }`}
                          ></div>
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 transition-all duration-300 ${
                              index === activeIndex
                                ? "border-cyan-400"
                                : "border-white/30"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Quote */}
                      <p className="text-text-secondary text-sm md:text-base leading-relaxed text-center mb-6 line-clamp-5">
                        {testimonial.quote}
                      </p>

                      {/* Name and Position */}
                      <div className="text-center">
                        <h4 className="text-white font-semibold text-base md:text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-text-muted text-xs md:text-sm">
                          {testimonial.position} at{" "}
                          <span className="text-accent-pink font-medium">
                            {testimonial.company}
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-accent-pink w-6"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
