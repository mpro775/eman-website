import React from "react";
import { HiArrowLeft, HiChevronLeft } from "react-icons/hi2";

interface ContactFormProps {
    formData: {
        name: string;
        email: string;
        service: string;
        budget: string;
        address: string;
        message: string;
    };
    onFormChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    onSubmit: (e: React.FormEvent) => void;
}

/**
 * Contact form component with all form fields
 * Includes name, email, address, service, budget, and message fields
 */
const ContactForm: React.FC<ContactFormProps> = ({
    formData,
    onFormChange,
    onSubmit,
}) => {
    return (
        <div>
            {/* Form Heading */}
            <h3 className="text-white text-lg md:text-xl font-medium mb-6 flex items-center justify-end gap-2 flex-row-reverse">
                <span className="text-2xl">👋</span>
                <span>فقط قل مرحباً</span>
            </h3>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4" dir="rtl">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="الاسم الكامل"
                        value={formData.name}
                        onChange={onFormChange}
                        className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="الإيميل"
                        value={formData.email}
                        onChange={onFormChange}
                        className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300"
                    />
                </div>

                {/* Row 2: Address */}
                <input
                    type="text"
                    name="address"
                    placeholder="العنوان"
                    value={formData.address}
                    onChange={onFormChange}
                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300"
                />

                {/* Row 3: Service & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <select
                            name="service"
                            value={formData.service}
                            onChange={onFormChange}
                            className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                        >
                            <option value="" disabled>
                                الخدمة
                            </option>
                            <option value="ui-design">تصميم واجهات</option>
                            <option value="ux-design">تصميم تجربة المستخدم</option>
                            <option value="branding">الهوية البصرية</option>
                            <option value="app-design">تصميم تطبيقات</option>
                        </select>
                        <HiChevronLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl rotate-[-90deg]" />
                    </div>
                    <div className="relative">
                        <select
                            name="budget"
                            value={formData.budget}
                            onChange={onFormChange}
                            className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                        >
                            <option value="" disabled>
                                الميزانية
                            </option>
                            <option value="500-1000">500$ - 1000$</option>
                            <option value="1000-5000">1000$ - 5000$</option>
                            <option value="5000+">5000$+</option>
                        </select>
                        <HiChevronLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl rotate-[-90deg]" />
                    </div>
                </div>

                {/* Row 4: Message */}
                <textarea
                    name="message"
                    placeholder="الرسالة"
                    value={formData.message}
                    onChange={onFormChange}
                    rows={5}
                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-text-muted text-right focus:border-accent-pink focus:outline-none transition-colors duration-300 resize-none"
                />

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-accent-pink to-accent-pink-dark text-white text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-glow-pink"
                        style={{
                            width: "197px",
                            height: "72px",
                            borderRadius: "12px",
                            paddingLeft: "36px",
                            paddingRight: "36px",
                        }}
                    >
                        <span>أرسل الرسالة</span>
                        <HiArrowLeft className="text-lg" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
