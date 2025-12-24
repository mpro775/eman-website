import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaYoutube,
    FaBehance,
    FaWhatsapp,
    FaInstagram,
} from "react-icons/fa";
import { useNewsletter } from "../../../hooks";
import logo from "../../../assets/images/logo.png";
import subtractIcon from "../../../assets/images/Subtract.svg";

// Types
interface SocialLink {
    icon: React.ComponentType<{ className?: string }>;
    href: string;
}

interface ContactInfoItem {
    label: string;
    href: string;
}

interface ImportantLink {
    name: string;
    href: string;
}

/**
 * Footer content component with logo, description, social links, and navigation
 */
const FooterContent: React.FC = () => {
    const { email: newsletterEmail, handleEmailChange, handleSubmit: handleNewsletterSubmit } = useNewsletter();

    const footerSocialLinks: SocialLink[] = [
        { icon: FaFacebookF, href: "#" },
        { icon: FaYoutube, href: "#" },
        { icon: FaWhatsapp, href: "#" },
        { icon: FaInstagram, href: "#" },
        { icon: FaTwitter, href: "#" },
        { icon: FaBehance, href: "#" },
    ];

    const importantLinks: ImportantLink[] = [
        { name: "الرئيسية", href: "#home" },
        { name: "من أنا", href: "#about" },
        { name: "الخبرات العملية", href: "#experience" },
        { name: "أعمالي", href: "#portfolio" },
        { name: "تواصل معي", href: "#contact" },
    ];

    const contactInfo: ContactInfoItem[] = [
        { label: "emyjameel1@gmail.com", href: "mailto:emyjameel1@gmail.com" },
        { label: "emanjameel.com", href: "https://emanjameel.com" },
    ];

    return (

        <footer
            id="footer"
            className="relative w-full bg-gradient-to-b from-[#1a1025] via-[#15101f] to-[#0d0d14] overflow-hidden rounded-t-[50px]"
        >
            {/* Blur Effect - Right Side */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "-599px",
                    left: "838px",
                    transform: "rotate(-58.77deg)",
                    background:
                        "linear-gradient(177.25deg, rgba(187, 161, 254, 0.8) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)",
                    filter: "blur(488px)",
                    borderRadius: "50%",
                }}
            ></div>
            {/* Blur Effect - Left Side (Mirrored) */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1136px",
                    height: "568px",
                    top: "-599px",
                    left: "-838px",
                    transform: "rotate(58.77deg)",
                    background:
                        "linear-gradient(177.25deg, rgba(187, 161, 254, 0.8) 2.26%, rgba(33, 13, 83, 0.8) 97.74%)",
                    filter: "blur(488px)",
                    borderRadius: "50%",
                }}
            ></div>

            {/* Main Footer Content - Two sections side by side */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Section 1: Logo, Description, Social Icons (Left Side) */}
                    <div className="text-right lg:order-1">
                        {/* Logo */}
                        <div className="mb-6">
                            <img src={logo} alt="Eman Logo" className="h-16 w-auto ml-auto" />
                        </div>

                        {/* Description */}
                        <p
                            className="mb-8 text-right"
                            style={{
                                fontFamily: "Urbanist, sans-serif",
                                fontWeight: 500,
                                fontSize: "20px",
                                lineHeight: "140%",
                                letterSpacing: "-0.015em",
                                color: "#FCFCFD",
                            }}
                        >
                            مصممة تجارب مستخدم وواجهات رقمية أعمل على تحويل الأفكار إلى تجارب
                            مرئية مدروسة، تجمع بين البساطة، الوضوح، والهوية البصرية المتناسقة.
                            أؤمن بأن التصميم الجيد يبدأ بفهم المستخدم وينتهي بتجربة تُحسن قِيَل
                            أن تُرى.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center justify-end gap-3 flex-row-reverse">
                            {footerSocialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#1a1025] hover:bg-accent-pink hover:text-white transition-all duration-300"
                                >
                                    <social.icon className="text-base" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Three Columns - Newsletter, Contact, Links (Right Side) */}
                    <div className="lg:order-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                            {/* Column 1: Newsletter */}
                            <div className="text-right md:order-3">
                                <h4 className="text-[#C67588] text-lg font-semibold mb-6">
                                    ابق على اطلاع
                                </h4>
                                <form
                                    onSubmit={handleNewsletterSubmit}
                                    className="relative w-[280px]"
                                    dir="rtl"
                                >
                                    <input
                                        type="email"
                                        placeholder="البريد الإلكتروني"
                                        value={newsletterEmail}
                                        onChange={handleEmailChange}
                                        className="w-full bg-white rounded-xl px-4 py-3 pl-14 text-black placeholder:text-black text-right focus:outline-none transition-colors duration-300"

                                        style={{
                                            fontFamily: "Urbanist, sans-serif",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "100%",
                                            letterSpacing: "-0.015em",
                                        }}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center hover:opacity-80 transition-opacity"
                                        style={{
                                            width: "46px",
                                            height: "45px",
                                            background: "#C67588",
                                            borderTopRightRadius: "13px",
                                            borderBottomRightRadius: "13px",
                                            borderTopLeftRadius: "0",
                                            borderBottomLeftRadius: "0",
                                            padding: "10px 8px",
                                            transform: "rotate(-180deg)",
                                        }}
                                    >
                                        <img
                                            src={subtractIcon}
                                            alt="Send"
                                            className="w-5 h-5"
                                            style={{ transform: "rotate(180deg)" }}
                                        />
                                    </button>
                                </form>
                            </div>

                            {/* Column 2: Contact Info */}
                            <div className="text-right md:order-2">
                                <h4 className="text-[#C67588] text-lg font-semibold mb-6">
                                    للتواصل
                                </h4>
                                <ul className="space-y-3">
                                    {contactInfo.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                className="text-text-secondary hover:text-accent-pink transition-colors duration-300 text-sm"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 3: Important Links */}
                            <div className="text-right md:order-1">
                                <h4 className="text-[#C67588] text-lg font-semibold mb-6">
                                    روابط مهمة
                                </h4>
                                <ul className="space-y-3">
                                    {importantLinks.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="text-text-secondary hover:text-accent-pink transition-colors duration-300 text-sm"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
                        {/* Copyright */}
                        <p className="text-center md:text-right order-1 md:order-2">
                            Copyright© 2025 وكالة سمارت ديف
                        </p>

                        {/* Privacy Links */}
                        <div className="flex items-center gap-4 order-2 md:order-1">
                            <a
                                href="#"
                                className="text-accent-pink hover:text-accent-pink-light transition-colors duration-300"
                            >
                                User Terms & Conditions
                            </a>
                            <span className="text-white/30">|</span>
                            <a
                                href="#"
                                className="text-accent-pink hover:text-accent-pink-light transition-colors duration-300"
                            >
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterContent;
