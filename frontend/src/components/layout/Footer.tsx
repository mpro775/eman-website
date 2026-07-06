import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaYoutube, FaWhatsapp, FaInstagram, FaTwitter, FaBehance } from "react-icons/fa";
import { useNewsletter } from "../../hooks";
import logoMark from "../../assets/footer/logo-mark.png";
import sendIcon from "../../assets/footer/send.svg";
import { playTap, playType } from "../../utils/soundManager";

const FONT = '"Thmanyah Sans", "Tajawal", sans-serif';

const importantLinks = [
    { name: "الرئيسية", id: "home" },
    { name: "من أنا", id: "about" },
    { name: "الخبرات العملية", id: "experience" },
    { name: "أعمالي", id: "portfolio" },
    { name: "تواصل معي", id: "contact" },
];

const contactLinks = [
    { label: "emyjameel1@gmail.com", href: "mailto:emyjameel1@gmail.com", underline: false },
    { label: "emanJameel.pro", href: "https://emanjameel.pro", underline: true },
];

const socials = [
    { Icon: FaFacebook, href: "#", label: "Facebook" },
    { Icon: FaYoutube, href: "#", label: "YouTube" },
    { Icon: FaWhatsapp, href: "#", label: "WhatsApp" },
    { Icon: FaInstagram, href: "#", label: "Instagram" },
    { Icon: FaTwitter, href: "#", label: "Twitter" },
    { Icon: FaBehance, href: "#", label: "Behance" },
];

const heading: React.CSSProperties = { fontFamily: FONT, fontWeight: 500, fontSize: "20px", letterSpacing: "-0.3px", color: "#c67588" };
const linkStyle: React.CSSProperties = { fontFamily: FONT, fontWeight: 500, fontSize: "18px", letterSpacing: "-0.27px", color: "#fcfcfd" };

/**
 * Footer — pixel-matched to Figma node 820:1945.
 * Four columns (newsletter, contact, important links, logo+bio+socials),
 * a divider, then the bottom copyright / legal bar.
 * Restyled to match the Home page's footer design, but maintaining layout routing.
 */
const Footer: React.FC = () => {
    const { email, handleEmailChange, handleSubmit } = useNewsletter();
    const navigate = useNavigate();
    const location = useLocation();
    const lastTypeAtRef = useRef(0);

    const onTypeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const isChar = e.key.length === 1;
        const isBackspace = e.key === "Backspace";
        if (!isChar && !isBackspace) return;
        const now = performance.now();
        if (now - lastTypeAtRef.current < 45) return;
        lastTypeAtRef.current = now;
        playType({ volume: 0.2 });
    };

    const handleNavClick = (sectionId: string) => {
        // If we're not on the home page, navigate there first
        if (location.pathname !== "/") {
            navigate(`/#${sectionId}`);
            // Small delay to allow navigation, then scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else {
            // Already on home page, just scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <footer id="footer" className="relative w-full bg-[#040404] overflow-hidden rounded-t-[50px]">
            {/* Warm maroon glow behind the logo — right (Figma 841:418) */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1000px", height: "500px", top: "-320px", right: "-220px",
                    transform: "rotate(58deg) scaleY(-1)",
                    background: "linear-gradient(177deg, rgba(198,117,136,0.4) 2%, rgba(33,13,83,0.55) 98%)",
                    filter: "blur(200px)", borderRadius: "50%",
                }}
            />
            {/* Purple glow — left (Figma 841:420) */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "1000px", height: "500px", top: "-320px", left: "-300px",
                    transform: "rotate(121deg)",
                    background: "linear-gradient(177deg, rgba(187,161,254,0.32) 2%, rgba(33,13,83,0.5) 98%)",
                    filter: "blur(200px)", borderRadius: "50%",
                }}
            />

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[71px] py-14 md:py-16">
                {/* Columns */}
                <div dir="rtl" className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-8">
                    {/* Logo + bio + socials */}
                    <div className="flex flex-col items-start gap-7 text-right lg:max-w-[490px] lg:order-1">
                        <button
                            onClick={() => handleNavClick("home")}
                            className="focus:outline-none cursor-pointer"
                        >
                            <img src={logoMark} alt="Eman" className="h-[89px] w-auto" />
                        </button>
                        <p
                            className="lg:w-[474px]"
                            style={{ fontFamily: FONT, fontWeight: 500, fontSize: "16px", lineHeight: "1.746", letterSpacing: "-0.24px", color: "#fcfcfd" }}
                        >
                            مصممة تجارب مستخدم وواجهات رقمية أعمل على تحويل الأفكار إلى تجارب مرئية مدروسة، تجمع بين
                            البساطة، الوضوح، والهوية البصرية المتناسقة. أؤمن بأن التصميم الجيد يبدأ بفهم المستخدم وينتهي
                            بتجربة تُحسّ قبل أن تُرى.
                        </p>
                        <div dir="ltr" className="flex items-center gap-[5px]">
                            {socials.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    onMouseEnter={() => playTap({ volume: 0.25 })}
                                    className="text-white hover:text-[#c67588] transition-colors duration-300"
                                >
                                    <Icon className="text-2xl" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Important links */}
                    <div className="flex flex-col items-start gap-7 text-right lg:order-2">
                        <h4 style={heading}>روابط مهمة</h4>
                        <div className="flex flex-col items-start gap-[15px]">
                            {importantLinks.map((l) => (
                                <button
                                    key={l.name}
                                    onClick={() => handleNavClick(l.id)}
                                    style={linkStyle}
                                    className="hover:text-[#c67588] transition-colors duration-300 cursor-pointer focus:outline-none"
                                >
                                    {l.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-start gap-7 text-right lg:order-3">
                        <h4 style={heading}>للتواصل</h4>
                        <div className="flex flex-col items-start gap-5">
                            {contactLinks.map((c) => (
                                <a
                                    key={c.label}
                                    href={c.href}
                                    style={linkStyle}
                                    className={`hover:text-[#c67588] transition-colors duration-300${c.underline ? " underline underline-offset-2" : ""}`}
                                    dir="ltr"
                                >
                                    {c.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col items-start gap-7 text-right lg:order-4">
                        <h4 style={heading}>ابقَ على اطلاع</h4>
                        <form
                            onSubmit={handleSubmit}
                            dir="rtl"
                            className="flex w-[304px] max-w-full h-[51px] overflow-hidden rounded-[14px]"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                onKeyDown={onTypeKeyDown}
                                placeholder="البريد الإلكتروني"
                                required
                                className="flex-1 min-w-0 bg-white text-black text-right px-4 placeholder:text-black/50 focus:outline-none"
                                style={{ fontFamily: FONT, fontWeight: 500, fontSize: "16px" }}
                            />
                            <button
                                type="submit"
                                aria-label="اشترك"
                                onMouseEnter={() => playTap({ volume: 0.25 })}
                                className="w-[46px] shrink-0 bg-[#c67588] flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                <img src={sendIcon} alt="" className="w-6 h-6" style={{ transform: "scaleX(-1)" }} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 my-8" />

                {/* Bottom bar */}
                <div
                    dir="ltr"
                    className="flex flex-col md:flex-row items-center md:justify-between gap-3 text-white text-center"
                    style={{ fontFamily: FONT, fontWeight: 300, letterSpacing: "-0.24px" }}
                >
                    <p className="text-[14px] md:text-[16px]">Copyright© 2025 وكالة سمارت ديف</p>
                    <p className="text-[13px] md:text-[16px]">{`User Terms & Conditions | Privacy Policy`}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
