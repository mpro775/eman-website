import React from "react";
import { useContactForm } from "../../../hooks";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import FooterContent from "./FooterContent";

const FONT = '"Thmanyah Sans", "Tajawal", sans-serif';

/**
 * Contact section ("تواصل معي") — pixel-matched to Figma node 820:1886.
 * Arabic title + gradient underline, then a two-column layout: contact form
 * on the left, contact info + socials on the right. Footer rendered below.
 */
const ContactSection: React.FC = () => {
    const { formData, services, handleChange, handleSubmit } = useContactForm();

    return (
        <section id="contact" className="scroll-section relative w-full overflow-hidden">
            <div className="relative bg-[#040404] overflow-hidden py-20">
                {/* Purple glow — bottom (Figma 820:1887) */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: "1136px",
                        height: "568px",
                        left: "50%",
                        bottom: "-260px",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(177deg, rgba(187,161,254,0.35) 2%, rgba(33,13,83,0.55) 98%)",
                        filter: "blur(240px)",
                        borderRadius: "50%",
                    }}
                />

                <div className="relative z-10 w-full max-w-[1240px] mx-auto flex flex-col items-center px-6" style={{ gap: "56px" }}>
                    {/* Title + underline (Figma 829:3928) */}
                    <div className="flex flex-col items-center" style={{ gap: "14px" }}>
                        <h2
                            className="text-white text-center whitespace-nowrap"
                            style={{
                                fontFamily: FONT,
                                fontWeight: 500,
                                fontSize: "clamp(2rem, 5vw, 48px)",
                                lineHeight: 1,
                                letterSpacing: "-0.72px",
                            }}
                        >
                            تواصــــل معـــي
                        </h2>
                        <div
                            style={{
                                width: "430px",
                                maxWidth: "82vw",
                                height: "3px",
                                borderRadius: "2px",
                                background:
                                    "linear-gradient(90deg, rgba(139,92,246,0) 0%, #C084FC 50%, rgba(139,92,246,0) 100%)",
                            }}
                        />
                    </div>

                    {/* Two columns: form (left) + info (right) */}
                    <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-12 lg:gap-[118px]">
                        <ContactInfo />
                        <ContactForm
                            formData={formData}
                            services={services}
                            onFormChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <FooterContent />
        </section>
    );
};

export default ContactSection;
