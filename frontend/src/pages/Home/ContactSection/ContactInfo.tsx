import React, { useState, useEffect } from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaBehance,
    FaTelegramPlane,
    FaGithub,
    FaDribbble,
    FaYoutube,
    FaTiktok,
    FaWhatsapp,
    FaSnapchat
} from "react-icons/fa";
import emailIcon from "../../../assets/icons/email.svg";
import { playTap } from "../../../utils/soundManager";
import { profileService, type SocialLink, SOCIAL_PLATFORMS } from "../../../services/profile.service";

const FONT = '"Thmanyah Sans", "Tajawal", sans-serif';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    linkedin: FaLinkedinIn,
    github: FaGithub,
    twitter: FaTwitter,
    behance: FaBehance,
    dribbble: FaDribbble,
    instagram: FaInstagram,
    facebook: FaFacebookF,
    youtube: FaYoutube,
    tiktok: FaTiktok,
    whatsapp: FaWhatsapp,
    telegram: FaTelegramPlane,
    snapchat: FaSnapchat,
};

const DEFAULT_SOCIALS: SocialLink[] = [
    { platform: "facebook", url: "#" },
    { platform: "twitter", url: "#" },
    { platform: "linkedin", url: "#" },
    { platform: "instagram", url: "#" },
    { platform: "behance", url: "#" },
];

const InfoRow: React.FC<{ icon: React.ReactNode | string; label: string; value: string; href?: string }> = ({ icon, label, value, href }) => {
    const content = (
        <div className="flex items-center gap-4 group">
            <div
                className="shrink-0 flex items-center justify-center rounded-[15px] bg-[rgba(42,51,80,0.12)] border border-[rgba(42,51,80,0.2)] text-[#d9778b] group-hover:border-[#d9778b]/40 transition-colors"
                style={{ padding: "16px" }}
            >
                {typeof icon === "string" ? <img src={icon} alt="" className="w-6 h-6" /> : icon}
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

    return href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
            {content}
        </a>
    ) : (
        content
    );
};

const socialBtn =
    "flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110";
const socialSize = "w-11 h-11 sm:w-12 sm:h-12";

/**
 * Contact info column — dynamically connected to profile API.
 * Heading + intro paragraph, telegram / email rows, and a "follow me" card
 * with customizable social buttons managed from the admin panel (/admin/profile).
 */
const ContactInfo: React.FC = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [email, setEmail] = useState<string>("emyjameel1@gmail.com");
    const [telegramInfo, setTelegramInfo] = useState<{ value: string; href: string }>({
        value: "@Emy_jameel",
        href: "https://t.me/Emy_jameel"
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await profileService.get();
                if (profile) {
                    if (profile.email) {
                        setEmail(profile.email);
                    }
                    if (profile.socialLinks && profile.socialLinks.length > 0) {
                        setSocialLinks(profile.socialLinks);

                        // If telegram link is present in socialLinks, update telegram info row dynamically
                        const tgLink = profile.socialLinks.find(l => l.platform === 'telegram');
                        if (tgLink && tgLink.url) {
                            const urlParts = tgLink.url.replace(/\/$/, '').split('/');
                            const handle = urlParts[urlParts.length - 1];
                            setTelegramInfo({
                                value: handle ? (handle.startsWith('@') ? handle : `@${handle}`) : "@Emy_jameel",
                                href: tgLink.url
                            });
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch profile in ContactInfo:", error);
            }
        };
        fetchProfile();
    }, []);

    const linksToRender = socialLinks.length > 0 ? socialLinks : DEFAULT_SOCIALS;

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

            {/* Telegram + email */}
            <div className="flex flex-col gap-6">
                <InfoRow
                    icon={<FaTelegramPlane className="w-6 h-6 text-[#d9778b]" style={{ color: "#d9778b" }} />}
                    label="تواصل تلجرام"
                    value={telegramInfo.value}
                    href={telegramInfo.href}
                />
                <InfoRow
                    icon={emailIcon}
                    label="ارسل لي رسالة"
                    value={email}
                    href={`mailto:${email}`}
                />
            </div>

            {/* Follow me card */}
            <div className="rounded-[16px] bg-[rgba(42,51,80,0.6)] flex flex-col items-end gap-4 px-5 pt-[23px] pb-8 sm:px-8">
                <p
                    className="text-right w-full"
                    style={{ fontFamily: "Urbanist, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#fff" }}
                >
                    تابعني على منصات التواصل الاجتماعي
                </p>
                <div dir="ltr" className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 w-full">
                    <span className="hidden sm:block w-6 h-0.5 rounded-full bg-white/40" />
                    {linksToRender.map((link, index) => {
                        const Icon = ICON_MAP[link.platform] || FaLinkedinIn;
                        const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
                        const label = platformInfo?.name || link.platform;

                        return (
                            <a
                                key={`${link.platform}-${index}`}
                                href={link.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                onMouseEnter={() => playTap({ volume: 0.25 })}
                                className={`${socialBtn} ${socialSize} bg-white/20 hover:bg-[#c67588]/40 border border-transparent hover:border-[#c67588] transition-all duration-300`}
                            >
                                <Icon className="text-white text-lg" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;

