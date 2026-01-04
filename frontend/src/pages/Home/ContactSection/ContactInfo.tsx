import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import phoneIcon from "../../../assets/icons/PhoneCall.svg";
import emailIcon from "../../../assets/icons/email.svg";
import behanceIcon from "../../../assets/icons/behance.svg";

/**
 * Contact info component with phone, email, and social media links
 */
const ContactInfo: React.FC = () => {
    return (
        <motion.div
            className="order-1 lg:order-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {/* Heading */}
            <h3 className="text-white text-xl md:text-2xl font-semibold mb-4 text-right">
                يسعدني سماعك، فقط أرسل رسالة.
            </h3>

            {/* Description */}
            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 text-right">
                سواء كنت ترغب في بدء مشروع جديد، مناقشة فكرة، أو لديك استفسار بسيط — لا تتردد
                في التواصل. أحرص على الرد خلال 48 ساعة كحد أقصى.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8" dir="rtl">
                {/* Phone */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center border border-white/10">
                        <img src={phoneIcon} alt="Phone" className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                        <p className="text-text-muted text-xs mb-1">تواصل معي</p>
                        <p className="text-white font-medium">+1-202-555-0190</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center border border-white/10">
                        <img src={emailIcon} alt="Email" className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                        <p className="text-text-muted text-xs mb-1">أرسل لي رسالة</p>
                        <p className="text-white font-medium">emyjameel1@gmail.com</p>
                    </div>
                </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-white/5">
                <p className="text-text-secondary text-base mb-6 text-right">
                    تابعني على منصات التواصل الاجتماعي
                </p>
                <div className="flex items-center gap-4">
                    {/* Behance */}
                    <a
                        href="#"
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                        <img src={behanceIcon} alt="Behance" className="w-7 h-7" />
                    </a>
                    {/* Instagram */}
                    <a
                        href="#"
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                        <FaInstagram className="text-xl text-accent-pink" />
                    </a>
                    {/* LinkedIn */}
                    <a
                        href="#"
                        className="w-14 h-14 bg-accent-pink rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                        <FaLinkedinIn className="text-xl text-white" />
                    </a>
                    {/* Twitter */}
                    <a
                        href="#"
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                        <FaTwitter className="text-xl text-accent-pink" />
                    </a>
                    {/* Facebook */}
                    <a
                        href="#"
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                        <FaFacebookF className="text-xl text-accent-pink" />
                    </a>
                    <div className="w-10 h-[2px] bg-accent-pink rounded-full"></div>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactInfo;
