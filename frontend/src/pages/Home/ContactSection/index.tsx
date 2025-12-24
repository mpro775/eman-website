import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "../../../components/common/Container";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import FooterContent from "./FooterContent";

/**
 * Contact section with form, contact info, and footer
 * Main entry point for the contact and footer area
 */
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

    return (
        <section id="contact" className="scroll-section relative w-full overflow-hidden">
            {/* Contact Section */}
            <div className="bg-bg-primary py-20">
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
                        {/* Gradient underline */}
                        <div
                            className="h-[3px] rounded-full mt-2"
                            style={{
                                background: "linear-gradient(to left, #6366f1, #8b5cf6, transparent)",
                                width: "100%",
                                maxWidth: "250px",
                            }}
                        />
                    </motion.div>

                    {/* Main Content - Two Columns */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        {/* Right Side - Contact Info */}
                        <ContactInfo />

                        {/* Left Side - Contact Form */}
                        <motion.div
                            className="order-2 lg:order-2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <ContactForm
                                formData={formData}
                                onFormChange={handleChange}
                                onSubmit={handleSubmit}
                            />
                        </motion.div>
                    </div>
                </Container>
            </div>

            {/* Footer Section */}
            <FooterContent />
        </section>
    );
};

export default ContactSection;
