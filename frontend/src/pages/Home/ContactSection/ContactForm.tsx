import React from "react";
import { HiArrowLeft, HiChevronDown } from "react-icons/hi2";
import { playType } from "../../../utils/soundManager";

interface ContactFormProps {
    formData: {
        name: string;
        email: string;
        service: string;
        address: string;
        message: string;
    };
    services?: any[];
    onFormChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const FONT = '"Thmanyah Sans", "Tajawal", sans-serif';
const fieldClass =
    "w-full bg-[rgba(42,51,80,0.2)] border border-[#2a3350] rounded-[6px] px-4 text-white text-right placeholder:text-[#87909d] focus:border-[#c67588] focus:outline-none transition-colors duration-300";
const fieldStyle: React.CSSProperties = { fontFamily: FONT, fontWeight: 500, fontSize: "16px", height: "55px" };

/* ─── Custom Service Dropdown ─── */
const ServiceDropdown: React.FC<{
    value: string;
    services?: any[] | undefined;
    onChange: (serviceId: string) => void;
}> = ({ value, services, onChange }) => {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const selectedService = services?.find((s) => s._id === value);

    // Close on outside click
    React.useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Close on Escape
    React.useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className={`${fieldClass} appearance-none cursor-pointer flex items-center justify-between ${selectedService ? "text-white" : "text-[#87909d]"}`}
                style={{ fontFamily: FONT, fontWeight: 500, fontSize: "16px", height: "55px" }}
            >
                <span className="truncate">
                    {selectedService ? selectedService.name : "الخدمة"}
                </span>
                <HiChevronDown
                    className={`text-[#87909d] text-base flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown panel */}
            <div
                className="absolute z-50 right-0 left-0 mt-2 overflow-hidden rounded-[10px] border border-[#2a3350]/80"
                style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)",
                    pointerEvents: open ? "auto" : "none",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    background: "rgba(18, 22, 40, 0.92)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(198,117,136,0.08)",
                    maxHeight: "260px",
                    overflowY: "auto",
                }}
            >
                {/* Scrollbar styling */}
                <style>{`
                    .service-dropdown-list::-webkit-scrollbar { width: 4px; }
                    .service-dropdown-list::-webkit-scrollbar-track { background: transparent; }
                    .service-dropdown-list::-webkit-scrollbar-thumb { background: rgba(198,117,136,0.3); border-radius: 4px; }
                    .service-dropdown-list::-webkit-scrollbar-thumb:hover { background: rgba(198,117,136,0.5); }
                `}</style>
                <div className="service-dropdown-list py-1.5" style={{ maxHeight: "256px", overflowY: "auto" }}>
                    {services && services.length > 0 ? (
                        services.map((service) => {
                            const isSelected = service._id === value;
                            return (
                                <button
                                    key={service._id}
                                    type="button"
                                    onClick={() => {
                                        onChange(service._id);
                                        setOpen(false);
                                    }}
                                    className="w-full text-right px-4 py-3 transition-all duration-200 group"
                                    style={{
                                        background: isSelected
                                            ? "linear-gradient(90deg, rgba(198,117,136,0.18) 0%, transparent 100%)"
                                            : "transparent",
                                        borderRight: isSelected ? "3px solid #c67588" : "3px solid transparent",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.background =
                                                "rgba(42,51,80,0.45)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.background = "transparent";
                                        }
                                    }}
                                >
                                    <div
                                        className="text-[15px] leading-snug"
                                        style={{
                                            fontFamily: FONT,
                                            fontWeight: 600,
                                            color: isSelected ? "#c67588" : "#e2e8f0",
                                        }}
                                    >
                                        {service.name}
                                    </div>
                                    {service.description && (
                                        <div
                                            className="mt-1 text-[12.5px] leading-relaxed line-clamp-2"
                                            style={{
                                                fontFamily: FONT,
                                                fontWeight: 400,
                                                color: isSelected ? "rgba(198,117,136,0.7)" : "#87909d",
                                            }}
                                        >
                                            {service.description}
                                        </div>
                                    )}
                                </button>
                            );
                        })
                    ) : (
                        <div
                            className="px-4 py-4 text-center text-[14px]"
                            style={{ fontFamily: FONT, color: "#87909d" }}
                        >
                            لا توجد خدمات متاحة
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * Contact form — pixel-matched to Figma 820:1892.
 * Heading, then name/email, address, service select, message, and a
 * full-width pink gradient submit button.
 */
const ContactForm: React.FC<ContactFormProps> = ({ formData, services, onFormChange, onSubmit }) => {
    const lastTypeAtRef = React.useRef(0);

    const onTypeKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const isChar = e.key.length === 1;
        const isBackspace = e.key === "Backspace";
        if (!isChar && !isBackspace) return;
        const now = performance.now();
        if (now - lastTypeAtRef.current < 45) return;
        lastTypeAtRef.current = now;
        playType({ volume: 0.2 });
    };

    /** Synthetic change event so useContactForm's handleChange still works */
    const handleServiceSelect = (serviceId: string) => {
        const syntheticEvent = {
            target: { name: "service", value: serviceId },
        } as React.ChangeEvent<HTMLSelectElement>;
        onFormChange(syntheticEvent);
    };

    return (
        <div className="w-full max-w-[666px]">
            {/* Heading */}
            <h3
                className="text-white text-right mb-5"
                style={{ fontFamily: FONT, fontWeight: 500, fontSize: "26px", lineHeight: "32px" }}
            >
                فقط قل مرحبًا 👋
            </h3>

            <form onSubmit={onSubmit} className="flex flex-col gap-5" dir="rtl">
                {/* Name & email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="الاسم الكامل"
                        value={formData.name}
                        onChange={onFormChange}
                        onKeyDown={onTypeKeyDown}
                        className={fieldClass}
                        style={fieldStyle}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="الإيميل"
                        value={formData.email}
                        onChange={onFormChange}
                        onKeyDown={onTypeKeyDown}
                        className={fieldClass}
                        style={fieldStyle}
                    />
                </div>

                {/* Address */}
                <input
                    type="text"
                    name="address"
                    placeholder="العنوان"
                    value={formData.address}
                    onChange={onFormChange}
                    onKeyDown={onTypeKeyDown}
                    className={fieldClass}
                    style={fieldStyle}
                />

                {/* Service — custom dropdown with name + description */}
                <ServiceDropdown
                    value={formData.service}
                    services={services}
                    onChange={handleServiceSelect}
                />

                {/* Message */}
                <textarea
                    name="message"
                    placeholder="الرسالة"
                    value={formData.message}
                    onChange={onFormChange}
                    onKeyDown={onTypeKeyDown}
                    className="w-full bg-[rgba(42,51,80,0.2)] border border-[#2a3350] rounded-[6px] px-4 py-3 text-white text-right placeholder:text-[#87909d] focus:border-[#c67588] focus:outline-none transition-colors duration-300 resize-none"
                    style={{ fontFamily: FONT, fontWeight: 500, fontSize: "16px", height: "141px" }}
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 rounded-[12px] transition-transform duration-300 hover:-translate-y-0.5"
                    style={{
                        height: "53px",
                        backgroundImage: "linear-gradient(180deg, #c67588 3.75%, #603942 96.25%)",
                        boxShadow: "0px 4px 2px rgba(0,0,0,0.25)",
                    }}
                >
                    <span
                        className="text-white capitalize"
                        style={{ fontFamily: FONT, fontWeight: 500, fontSize: "16px" }}
                    >
                        ارسل الرسالة
                    </span>
                    <HiArrowLeft className="text-white text-xl" />
                </button>
            </form>
        </div>
    );
};

export default ContactForm;

