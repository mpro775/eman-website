import React from "react";
import SkillCard from "./SkillCard";

// Skill chip 3D icons (Figma 820:1595)
import iconUxUi from "../../../assets/skills/icon-uxui.png";
import iconApp from "../../../assets/skills/icon-app.png";
import iconGraphic from "../../../assets/skills/icon-graphic.png";
import iconTeaching from "../../../assets/skills/icon-teaching.png";
// Decorative
import frameDeco from "../../../assets/skills/frame-deco.svg";

export interface AboutViewProps {
    aboutElementsVariants?: {
        visible: { opacity: number; x: number };
        hidden: { opacity: number; x: number };
    };
}

export interface SkillEntry {
    id: number;
    icon: string;
    title: string;
    description: string;
    iconRotate: number;
    /** Absolute desktop position (anchored to the 1440 canvas center) */
    position: React.CSSProperties;
}

// Content + positions pixel-matched to Figma 820:1595 (frame center = 722px).
export const skillsData: SkillEntry[] = [
    {
        id: 1,
        icon: iconUxUi,
        title: "UX/UI Designer",
        description:
            "تصميم تجــربة المستخدم وواجهــات الاستخــدام للتطبيقات و المواقـع ،بـــدءًا من دراسة المستخدم وتحليل الاحتياجات ، وصـولًا إلى تصميم واجهـات واضحـة، سهلــة، وقابلـــة للتنفيــــذ.",
        iconRotate: -14,
        position: { left: "calc(50% - 155.5px)", top: "610px" },
    },
    {
        id: 2,
        icon: iconGraphic,
        title: "Graphic Designer",
        description:
            "تصميم الجرافيكس والمواد البصرية المختلفة ، بمـــا في ذلك الهـوية البصريـــة، تصاميـم السـوشيـل ميديـــا، والمحتـوى المرئي الــــذي يوضّح الفكرة ويعـزّز العلامة.",
        iconRotate: -14,
        position: { left: "calc(50% + 390px)", top: "310px" },
    },
    {
        id: 3,
        icon: iconApp,
        title: "App Developer",
        description:
            "تصميــــم و تحليــــل و تطــــوير تطبيقــات المــوبايــل ، بـدءًا من الفكــــرة والتخطيــــط ، وصــــولًا إلى تطبيـــــق جاهــــز للاستخــــدام",
        iconRotate: -8.21,
        position: { left: "calc(50% + 140px)", top: "485px" },
    },
    {
        id: 4,
        icon: iconUxUi,
        title: "Automation",
        description:
            "أتمتـــــة العمـــليـــــات الــرقميـــــة لتسهيـــــل العمـــــل، تحسيـــن سيــــر المهــــام، وربــــط الأدوات والأنظمـــة لزيـــادة الكفـــاءة وتقليـل الوقـــت والجهــد.",
        iconRotate: -14,
        position: { left: "calc(50% - 425px)", top: "485px" },
    },
    {
        id: 5,
        icon: iconTeaching,
        title: "Teaching Assistant",
        description:
            "دعم العملية التعليمية في مجال الحاسوب والبرمجة، والإسهـــام في بناء مهارات الطلاب التقنيــة والبرمجيـــة بأساليب تعليمية حديثة.",
        iconRotate: -14,
        position: { left: "calc(50% - 680px)", top: "310px" },
    },
];

/**
 * Skills view ("مهاراتي") — pixel-matched to Figma node 820:1595.
 * A centered portrait with five floating skill chips arranged around it,
 * a large faded "UX  UI" watermark, and soft decorative grid/frame glows.
 */
const AboutView: React.FC<AboutViewProps> = () => {
    return (
        <div className="absolute inset-0">
            {/* Decorative top-right frame glow (Figma 822:3051) */}
            <img
                src={frameDeco}
                alt=""
                aria-hidden="true"
                className="absolute z-[1] pointer-events-none select-none opacity-70"
                style={{ left: "calc(50% + 513px)", top: "18px", width: "568px", height: "822px", transform: "translateX(-50%)" }}
            />
            {/* Background glow (Figma 820:1597 "Group 10143") — broad maroon→purple
                glow rising from the bottom-center behind the portrait, fading to
                black at the edges. Reproduced as a blurred CSS gradient ellipse
                (the exported SVG's oversized blur bounds squish when scaled). */}
            <div
                className="absolute z-[1] pointer-events-none select-none"
                style={{
                    left: "50%",
                    bottom: "-120px",
                    width: "780px",
                    height: "620px",
                    transform: "translateX(-50%)",
                    borderRadius: "50%",
                    background: "linear-gradient(180deg, #7A464D 0%, #210D53 100%)",
                    opacity: 0.8,
                    filter: "blur(160px)",
                }}
            />

            {/* "UX  UI" watermark behind the portrait (Figma 822:2883) */}
            <div
                className="absolute z-[5] pointer-events-none select-none flex items-center justify-center"
                style={{ left: "calc(50% - 12.41px)", top: "132px", width: "419px", height: "217px", transform: "translateX(-50%) rotate(-20.43deg)" }}
            >
                <p
                    className="text-center"
                    style={{
                        fontFamily: '"Thmanyah Sans", "Urbanist", "Tajawal", sans-serif',
                        fontWeight: 500,
                        fontSize: "71.949px",
                        lineHeight: 1.05,
                        letterSpacing: "-1.0792px",
                        color: "rgba(255,255,255,0.1)",
                        opacity: 0.5,
                        whiteSpace: "pre",
                    }}
                >
                    {"UX               UI"}
                </p>
            </div>

            {/* Skill chips */}
            {skillsData.map((s, i) => (
                <SkillCard
                    key={s.id}
                    icon={s.icon}
                    title={s.title}
                    description={s.description}
                    iconRotate={s.iconRotate}
                    position={s.position}
                    delay={0.15 + i * 0.1}
                />
            ))}
        </div>
    );
};

export default AboutView;
