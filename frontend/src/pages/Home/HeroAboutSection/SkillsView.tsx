import React from "react";
import SkillCard from "./SkillCard";
import { useMediaQuery } from "../../../hooks";

// Skill chip 3D icons (Figma 820:1595)
import iconUxUi from "../../../assets/skills/icon-uxui.png";
import iconApp from "../../../assets/skills/icon-app.png";
import iconGraphic from "../../../assets/skills/icon-graphic.png";
import iconTeaching from "../../../assets/skills/icon-teaching.png";
// Decorative + mobile portrait
import gridDeco from "../../../assets/skills/grid.svg";
import frameDeco from "../../../assets/skills/frame-deco.svg";
// Skills portrait (Figma 851:381 "ChatGPT Image") — distinct from the hero photo
import skillsPortrait from "../../../assets/skills/portrait.png";

interface AboutViewProps {
    aboutElementsVariants: {
        visible: { opacity: number; x: number };
        hidden: { opacity: number; x: number };
    };
}

interface SkillEntry {
    id: number;
    icon: string;
    title: string;
    description: string;
    iconRotate: number;
    /** Absolute desktop position (anchored to the 1440 canvas center) */
    position: React.CSSProperties;
}

// Content + positions pixel-matched to Figma 820:1595 (frame center = 722px).
const skillsData: SkillEntry[] = [
    {
        id: 1,
        icon: iconUxUi,
        title: "UX/UI Designer",
        description:
            "تصميم تجــربة المستخدم وواجهــات الاستخــدام للتطبيقات و المواقـع ،بـــدءًا من دراسة المستخدم وتحليل الاحتياجات ، وصـولًا إلى تصميم واجهـات واضحـة، سهلــة، وقابلـــة للتنفيــــذ.",
        iconRotate: -14,
        position: { left: "calc(50% - 129.5px)", top: "560px" },
    },
    {
        id: 2,
        icon: iconGraphic,
        title: "Graphic Designer",
        description:
            "تصميم الجرافيكس والمواد البصرية المختلفة ، بمـــا في ذلك الهـوية البصريـــة، تصاميـم السـوشيـل ميديـــا، والمحتـوى المرئي الــــذي يوضّح الفكرة ويعـزّز العلامة.",
        iconRotate: -14,
        position: { left: "calc(50% + 318.72px)", top: "332.39px" },
    },
    {
        id: 3,
        icon: iconApp,
        title: "App Developer",
        description:
            "تصميــــم و تحليــــل و تطــــوير تطبيقــات المــوبايــل ، بـدءًا من الفكــــرة والتخطيــــط ، وصــــولًا إلى تطبيـــــق جاهــــز للاستخــــدام",
        iconRotate: -8.21,
        position: { left: "calc(50% + 91px)", top: "460px" },
    },
    {
        id: 4,
        icon: iconUxUi,
        title: "Automation",
        description:
            "أتمتـــــة العمـــليـــــات الــرقميـــــة لتسهيـــــل العمـــــل، تحسيـــن سيــــر المهــــام، وربــــط الأدوات والأنظمـــة لزيـــادة الكفـــاءة وتقليـل الوقـــت والجهــد.",
        iconRotate: -14,
        position: { left: "calc(50% - 367.36px)", top: "460px" },
    },
    {
        id: 5,
        icon: iconTeaching,
        title: "Teaching Assistant",
        description:
            "دعم العملية التعليمية في مجال الحاسوب والبرمجة، والإسهـــام في بناء مهارات الطلاب التقنيــة والبرمجيـــة بأساليب تعليمية حديثة.",
        iconRotate: -14,
        position: { left: "calc(50% - 577.87px)", top: "332.39px" },
    },
];

/**
 * Skills view ("مهاراتي") — pixel-matched to Figma node 820:1595.
 * A centered portrait with five floating skill chips arranged around it,
 * a large faded "UX  UI" watermark, and soft decorative grid/frame glows.
 * Desktop uses absolute positioning; mobile stacks the chips vertically.
 */
const AboutView: React.FC<AboutViewProps> = () => {
    // Align with the `lg` breakpoint (>=1024 shows the desktop canvas) to avoid
    // the mobile branch rendering inside the visible desktop canvas at 1024px.
    const isMobile = useMediaQuery("(max-width: 1023px)");

    if (isMobile) {
        return (
            <div className="relative w-full flex flex-col items-center pt-24 pb-10 gap-5 overflow-y-auto">
                <div className="relative w-[min(60vw,240px)] aspect-[532/574] overflow-hidden mb-2">
                    <img src={skillsPortrait} alt="Eman" className="w-full h-full object-cover object-top" />
                </div>
                {skillsData.map((s, i) => (
                    <SkillCard
                        key={s.id}
                        inFlow
                        icon={s.icon}
                        title={s.title}
                        description={s.description}
                        iconRotate={s.iconRotate}
                        delay={0.1 + i * 0.08}
                    />
                ))}
            </div>
        );
    }

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
            {/* Decorative grid glow (Figma 820:1597) */}
            <img
                src={gridDeco}
                alt=""
                aria-hidden="true"
                className="absolute z-[1] pointer-events-none select-none"
                style={{ left: "calc(50% - 380px)", top: "584px", width: "749px", height: "543px", overflow: "visible" }}
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
