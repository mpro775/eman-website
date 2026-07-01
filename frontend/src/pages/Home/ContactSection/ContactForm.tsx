import React from "react";
import { HiArrowLeft, HiChevronDown } from "react-icons/hi2";
import { playType } from "../../../utils/soundManager";

interface ContactFormProps {
    formData: {
        name: string;
        email: string;
        service: string;
        budget: string;
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
const selectStyle: React.CSSProperties = { ...fieldStyle };

/**
 * Contact form — pixel-matched to Figma 820:1892.
 * Heading, then name/email, address, service/budget selects, message, and a
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

                {/* Service & budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <select
                            name="service"
                            value={formData.service}
                            onChange={onFormChange}
                            className={`${fieldClass} appearance-none cursor-pointer ${formData.service ? "" : "text-[#87909d]"}`}
                            style={selectStyle}
                        >
                            <option value="" disabled>
                                الخدمة
                            </option>
                            {services &&
                                services.map((service) => (
                                    <option key={service._id} value={service._id} className="text-black">
                                        {service.name}
                                    </option>
                                ))}
                        </select>
                        <HiChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-[#87909d] text-base pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select
                            name="budget"
                            value={formData.budget}
                            onChange={onFormChange}
                            className={`${fieldClass} appearance-none cursor-pointer ${formData.budget ? "" : "text-[#87909d]"}`}
                            style={selectStyle}
                        >
                            <option value="" disabled>
                                الميزانية
                            </option>
                            <option value="500-1000" className="text-black">500$ - 1000$</option>
                            <option value="1000-5000" className="text-black">1000$ - 5000$</option>
                            <option value="5000+" className="text-black">5000$+</option>
                        </select>
                        <HiChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-[#87909d] text-base pointer-events-none" />
                    </div>
                </div>

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
