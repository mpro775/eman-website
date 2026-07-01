import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaBehance } from "react-icons/fa";
import phoneIcon from "../../../assets/icons/PhoneCall.svg";
import emailIcon from "../../../assets/icons/email.svg";
import { playTap } from "../../../utils/soundManager";

const FONT = '"Thmanyah Sans", "Tajawal", sans-serif';

const InfoRow: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center gap-4">
        <div
            className="shrink-0 flex items-center justify-center rounded-[15px] bg-[rgba(42,51,80,0.12)] border border-[rgba(42,51,80,0.2)]"
            style={{ padding: "16px" }}
        >
            <img src={icon} alt="" className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1.5 text-right">
            <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: "14px", lineHeight: "20px", color: "#fff" }}>
                {label}
            </p>
            <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#fff" }}>
                {value}
            </p>
        </div>
    </div>
);

const socialBtn =
    "flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110";
const socialSize = "w-11 h-11 sm:w-12 sm:h-12";

/**
 * Contact info column — pixel-matched to Figma 820:1914.
 * Heading + intro paragraph, phone / email rows, and a "follow me" card
 * with social buttons.
 */
const ContactInfo: React.FC = () => {
    return (
        <div className="w-full max-w-[424px] flex flex-col gap-8">
            {/* Heading */}
            <div className="flex flex-col gap-4 text-right">
                <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: "26px", lineHeight: "32px", color: "#fff" }}>
                    يسعدني سماعك، فقط أرسل رسالة.
                </p>
                <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: "16px", lineHeight: "35px", color: "#fff" }}>
                    سواء كنت ترغب في بدء مشروع جديد، مناقشة فكرة، أو لديك استفسار بسيط — لا تتردد في التواصل.
                    <br />
                    أحرص على الرد خلال 48 ساعة كحد أقصى.
                </p>
            </div>

            {/* Phone + email */}
            <div className="flex flex-col gap-6">
                <InfoRow icon={phoneIcon} label="تواصل معي" value="+1-202-555-0190" />
                <InfoRow icon={emailIcon} label="ارسل لي رسالة" value="emyjaeel1@gmail.com" />
            </div>

            {/* Follow me card */}
            <div className="rounded-[16px] bg-[rgba(42,51,80,0.6)] flex flex-col items-end gap-4 px-5 pt-[23px] pb-8 sm:px-8">
                <p
                    className="text-right w-full"
                    style={{ fontFamily: "Urbanist, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#fff" }}
                >
                    تابعني على منصات التواصل الاجتماعي
                </p>
                <div dir="ltr" className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3 w-full">
                    <span className="hidden sm:block w-6 h-0.5 rounded-full bg-white/40" />
                    <a href="#" aria-label="Facebook" onMouseEnter={() => playTap({ volume: 0.25 })}
                        className={`${socialBtn} ${socialSize} bg-white/20`}>
                        <FaFacebookF className="text-white text-base" />
                    </a>
                    <a href="#" aria-label="Twitter" onMouseEnter={() => playTap({ volume: 0.25 })}
                        className={`${socialBtn} ${socialSize} bg-white/20`}>
                        <FaTwitter className="text-white text-base" />
                    </a>
                    <a href="#" aria-label="LinkedIn" onMouseEnter={() => playTap({ volume: 0.25 })}
                        className={`${socialBtn} ${socialSize}`}
                        style={{ backgroundImage: "linear-gradient(180deg, rgba(198,117,136,0.5), rgba(96,57,66,0.5))" }}>
                        <FaLinkedinIn className="text-white text-base" />
                    </a>
                    <a href="#" aria-label="Instagram" onMouseEnter={() => playTap({ volume: 0.25 })}
                        className={`${socialBtn} ${socialSize} bg-white/20`}>
                        <FaInstagram className="text-white text-base" />
                    </a>
                    <a href="#" aria-label="Behance" onMouseEnter={() => playTap({ volume: 0.25 })}
                        className={`${socialBtn} w-11 h-11 sm:w-[51px] sm:h-[51px] bg-white/20`}>
                        <FaBehance className="text-white text-lg" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
