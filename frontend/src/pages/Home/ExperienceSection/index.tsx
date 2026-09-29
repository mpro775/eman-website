import { useState } from "react";
import { FiArrowDownLeft, FiArrowUpLeft, FiBriefcase, FiCode, FiEdit3, FiBookOpen } from "react-icons/fi";
import "./experience.css";

type Category = "all" | "design" | "teaching" | "tech" | "management";
const filters: { id: Category; label: string }[] = [
    { id: "all", label: "الكل" },
    { id: "design", label: "التصميم" },
    { id: "teaching", label: "التعليم" },
    { id: "tech", label: "التقنية" },
    { id: "management", label: "الإدارة" },
];
const experiences = [
    { id: "01", title: "أستاذة UX/UI", place: "أكاديمية سمارت ديف & أونلاين", year: "2025", category: "teaching" },
    { id: "02", title: "UX/UI Designer", place: "محفظة جيب", year: "2024–2026", category: "design" },
    { id: "03", title: "أستاذ مساعد", place: "جامعة العلوم الحديثة", year: "2024–2026", category: "teaching" },
    { id: "04", title: "Graphic Designer", place: "وكالة حريف", year: "2024–2026", category: "design" },
    { id: "05", title: "Flutter App", place: "مشروع تخرج · جامعة العلوم الحديثة", year: "2024", category: "tech" },
    { id: "06", title: "دعم فني", place: "مجموعة هائل سعيد أنعم", year: "2023", category: "tech" },
    { id: "07", title: "UX/UI & Graphic Designer", place: "عمل حر · Freelance", year: "2022–2026", category: "design" },
    { id: "08", title: "سكرتارية + أمين صندوق", place: "مركز يونك للأنظمة المحاسبية", year: "2019–2021", category: "management" },
] as const;
const icons = { design: FiEdit3, teaching: FiBookOpen, tech: FiCode, management: FiBriefcase };

export default function ExperienceSection() {
    const [category, setCategory] = useState<Category>("all");
    const visible = experiences.filter(item => category === "all" || item.category === category);

    return (
        <section id="experience" className="scroll-section experience-redesign" dir="rtl" aria-labelledby="experience-heading" data-no-splash="true">
            <div className="experience-shell">
                <div className="experience-masthead">
                    <span><span className="experience-dot" /> الخبرات العملية</span>
                    <span lang="en" dir="ltr">THE JOURNEY / 02</span>
                </div>
                <div className="experience-layout">
                    <div className="experience-intro">
                        <p className="experience-eyebrow">كل محطة، منظور جديد.</p>
                        <h2 id="experience-heading">خبرة تصنع<br /><span>فَرقًا.</span><svg viewBox="0 0 150 24" aria-hidden="true"><path d="M3 16C38 4 104 1 146 8M18 23C57 12 100 11 130 13" /></svg></h2>
                        <p className="experience-description">بين التصميم والتقنية والتعليم، تتشكّل رحلتي.<br />تجارب مختلفة يجمعها شغف واحد: تحويل الأفكار إلى تجارب تُلامس الناس.</p>
                        <div className="experience-mark" aria-label="ثماني محطات مهنية بين عامي 2019 و2026">
                            <svg className="experience-orbits" viewBox="0 0 360 180" fill="none" aria-hidden="true">
                                <ellipse cx="180" cy="90" rx="168" ry="58" transform="rotate(-18 180 90)" />
                                <ellipse cx="180" cy="90" rx="168" ry="58" transform="rotate(18 180 90)" />
                                <circle cx="335" cy="46" r="5" />
                            </svg>
                            <span className="experience-count" aria-hidden="true">08</span>
                            <div aria-hidden="true"><span>محطات مهنية</span><b dir="ltr">2019 — 2026</b></div>
                        </div>
                        <a href="#portfolio" className="experience-work-link">اكتشف أثر هذه الرحلة في أعمالي <span><FiArrowUpLeft aria-hidden="true" /></span></a>
                    </div>
                    <div className="experience-ledger">
                        <div className="experience-ledger-heading"><h3>سجلّ الخبرات</h3><FiArrowDownLeft aria-hidden="true" /></div>
                        <div className="experience-filters" role="group" aria-label="تصفية الخبرات حسب المجال">
                            {filters.map(filter => <button key={filter.id} type="button" aria-pressed={category === filter.id} onClick={() => setCategory(filter.id)}>{filter.label}</button>)}
                        </div>
                        <div className="experience-records">
                            <ol aria-label="الخبرات المهنية">
                                {visible.map(item => {
                                    const Icon = icons[item.category];
                                    return <li className="experience-record" key={item.id}>
                                        <span className="experience-record-number" aria-hidden="true">{item.id}</span>
                                        <div className="experience-record-content"><h4 dir="auto">{item.title}</h4><p>{item.place}</p></div>
                                        <div className="experience-record-meta"><span dir="ltr">{item.year}</span><Icon aria-hidden="true" /></div>
                                    </li>;
                                })}
                            </ol>
                        </div>
                        <div className="experience-ledger-footer"><span role="status">{visible.length} من {experiences.length} محطات</span><span>التجربة تُشكّل الرؤية <span aria-hidden="true">✳</span></span></div>
                    </div>
                </div>
                <div className="experience-endnote"><span>تصميم بفهم أعمق.</span><span dir="ltr" lang="en">DESIGN. LEARN. EVOLVE.</span></div>
            </div>
        </section>
    );
}
