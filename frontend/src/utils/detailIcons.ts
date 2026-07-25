import type { IconType } from 'react-icons';
import {
    FiActivity, FiAward, FiBarChart2, FiBookOpen, FiBookmark, FiBox, FiBriefcase,
    FiCalendar, FiCamera, FiCheckCircle, FiClock, FiCode, FiCoffee, FiCommand,
    FiCompass, FiCpu, FiCrosshair, FiDatabase, FiDollarSign, FiEdit, FiExternalLink,
    FiEye, FiFeather, FiFigma, FiFile, FiFileText, FiFlag, FiFolder, FiGift,
    FiGlobe, FiGrid, FiHash, FiHeart, FiHome, FiImage, FiInfo, FiKey, FiLayers,
    FiLayout, FiLink, FiLock, FiMail, FiMapPin, FiMonitor, FiMusic, FiPackage,
    FiPenTool, FiPhone, FiPieChart, FiPlay, FiPrinter, FiServer, FiSettings,
    FiShare2, FiShield, FiShoppingBag, FiSliders, FiSmartphone, FiStar, FiTablet,
    FiTag, FiTarget, FiTerminal, FiThumbsUp, FiTool, FiTrendingUp, FiTruck,
    FiUser, FiUsers, FiVideo, FiWatch, FiZap,
} from 'react-icons/fi';

/**
 * A curated icon set shared by the admin picker and the public detail page.
 *
 * Why a hand-written registry instead of looking icons up dynamically: named
 * ESM imports tree-shake per icon, so these ~70 entries cost a few KB. Both
 * alternatives keep the entire `fi` family (~290 icons) in the bundle, because
 * neither `import * as Fi` with a computed key nor `await import('react-icons/fi')`
 * is statically analysable — and the dynamic one would also make every row an
 * async render.
 *
 * `key` is a short, stable slug (`'figma'`, not `'FiFigma'`) so the underlying
 * icon can be swapped without migrating stored data.
 */
export interface DetailIconOption {
    key: string;
    Icon: IconType;
    /** Arabic name shown under the icon in the picker. */
    label: string;
    /** Extra search terms (Arabic + English) — not displayed. */
    keywords: string;
}

export const DETAIL_ICON_OPTIONS: DetailIconOption[] = [
    // نوع المشروع / التصنيف
    { key: 'layers', Icon: FiLayers, label: 'طبقات', keywords: 'layers نوع المشروع type stack' },
    { key: 'grid', Icon: FiGrid, label: 'شبكة', keywords: 'grid شبكة layout' },
    { key: 'layout', Icon: FiLayout, label: 'تخطيط', keywords: 'layout تخطيط واجهة ui' },
    { key: 'box', Icon: FiBox, label: 'صندوق', keywords: 'box صندوق منتج product' },
    { key: 'package', Icon: FiPackage, label: 'حزمة', keywords: 'package حزمة تسليم' },
    { key: 'monitor', Icon: FiMonitor, label: 'شاشة', keywords: 'monitor شاشة ويب web desktop' },
    { key: 'smartphone', Icon: FiSmartphone, label: 'جوال', keywords: 'smartphone جوال هاتف تطبيق mobile app' },
    { key: 'tablet', Icon: FiTablet, label: 'لوحي', keywords: 'tablet لوحي ايباد' },
    { key: 'globe', Icon: FiGlobe, label: 'موقع', keywords: 'globe موقع ويب website لغة' },
    { key: 'home', Icon: FiHome, label: 'رئيسية', keywords: 'home رئيسية منزل' },

    // الوقت
    { key: 'calendar', Icon: FiCalendar, label: 'تقويم', keywords: 'calendar سنة تاريخ year date' },
    { key: 'clock', Icon: FiClock, label: 'ساعة', keywords: 'clock مدة وقت duration time' },
    { key: 'watch', Icon: FiWatch, label: 'ساعة يد', keywords: 'watch مدة زمن' },

    // الأدوات
    { key: 'tool', Icon: FiTool, label: 'أدوات', keywords: 'tool أدوات tools' },
    { key: 'figma', Icon: FiFigma, label: 'فيجما', keywords: 'figma أدوات تصميم design' },
    { key: 'pen-tool', Icon: FiPenTool, label: 'قلم تصميم', keywords: 'pen tool تصميم رسم vector' },
    { key: 'edit', Icon: FiEdit, label: 'تحرير', keywords: 'edit تحرير كتابة' },
    { key: 'code', Icon: FiCode, label: 'كود', keywords: 'code كود برمجة development' },
    { key: 'terminal', Icon: FiTerminal, label: 'طرفية', keywords: 'terminal طرفية console' },
    { key: 'command', Icon: FiCommand, label: 'أمر', keywords: 'command أمر اختصار' },
    { key: 'cpu', Icon: FiCpu, label: 'معالج', keywords: 'cpu معالج تقنية hardware' },
    { key: 'sliders', Icon: FiSliders, label: 'إعدادات', keywords: 'sliders تحكم ضبط controls' },
    { key: 'settings', Icon: FiSettings, label: 'ضبط', keywords: 'settings إعدادات ضبط' },

    // أشخاص
    { key: 'user', Icon: FiUser, label: 'مستخدم', keywords: 'user عميل client مستخدم' },
    { key: 'users', Icon: FiUsers, label: 'فريق', keywords: 'users فريق team مجموعة' },
    { key: 'briefcase', Icon: FiBriefcase, label: 'عمل', keywords: 'briefcase عمل شركة وظيفة job' },
    { key: 'award', Icon: FiAward, label: 'جائزة', keywords: 'award جائزة تكريم' },

    // تصنيف ووسوم
    { key: 'tag', Icon: FiTag, label: 'وسم', keywords: 'tag وسم تصنيف' },
    { key: 'hash', Icon: FiHash, label: 'هاشتاق', keywords: 'hash هاشتاق رقم' },
    { key: 'bookmark', Icon: FiBookmark, label: 'إشارة', keywords: 'bookmark حفظ إشارة' },
    { key: 'star', Icon: FiStar, label: 'نجمة', keywords: 'star نجمة تقييم مميز' },
    { key: 'heart', Icon: FiHeart, label: 'قلب', keywords: 'heart إعجاب مفضل' },
    { key: 'flag', Icon: FiFlag, label: 'علم', keywords: 'flag علم حالة' },
    { key: 'thumbs-up', Icon: FiThumbsUp, label: 'إعجاب', keywords: 'thumbs up إعجاب رضا' },

    // روابط وملفات
    { key: 'link', Icon: FiLink, label: 'رابط', keywords: 'link رابط' },
    { key: 'external-link', Icon: FiExternalLink, label: 'رابط خارجي', keywords: 'external link رابط خارجي زيارة' },
    { key: 'share', Icon: FiShare2, label: 'مشاركة', keywords: 'share مشاركة نشر' },
    { key: 'folder', Icon: FiFolder, label: 'مجلد', keywords: 'folder مجلد' },
    { key: 'file', Icon: FiFile, label: 'ملف', keywords: 'file ملف' },
    { key: 'file-text', Icon: FiFileText, label: 'مستند', keywords: 'file text مستند وثيقة' },
    { key: 'book-open', Icon: FiBookOpen, label: 'كتاب', keywords: 'book كتاب دراسة تعليم' },

    // وسائط
    { key: 'image', Icon: FiImage, label: 'صورة', keywords: 'image صورة' },
    { key: 'camera', Icon: FiCamera, label: 'كاميرا', keywords: 'camera كاميرا تصوير' },
    { key: 'video', Icon: FiVideo, label: 'فيديو', keywords: 'video فيديو موشن' },
    { key: 'play', Icon: FiPlay, label: 'تشغيل', keywords: 'play تشغيل عرض' },
    { key: 'music', Icon: FiMusic, label: 'صوت', keywords: 'music صوت موسيقى' },
    { key: 'printer', Icon: FiPrinter, label: 'طباعة', keywords: 'printer طباعة مطبوعات' },

    // بيانات وأعمال
    { key: 'database', Icon: FiDatabase, label: 'قاعدة بيانات', keywords: 'database قاعدة بيانات' },
    { key: 'server', Icon: FiServer, label: 'خادم', keywords: 'server خادم استضافة' },
    { key: 'bar-chart', Icon: FiBarChart2, label: 'رسم بياني', keywords: 'bar chart تحليلات analytics إحصاء' },
    { key: 'pie-chart', Icon: FiPieChart, label: 'رسم دائري', keywords: 'pie chart تحليلات نسب' },
    { key: 'trending-up', Icon: FiTrendingUp, label: 'نمو', keywords: 'trending نمو زيادة' },
    { key: 'activity', Icon: FiActivity, label: 'نشاط', keywords: 'activity نشاط أداء' },
    { key: 'dollar-sign', Icon: FiDollarSign, label: 'ميزانية', keywords: 'dollar ميزانية سعر تكلفة budget' },
    { key: 'shopping-bag', Icon: FiShoppingBag, label: 'متجر', keywords: 'shopping متجر تجارة ecommerce' },
    { key: 'truck', Icon: FiTruck, label: 'توصيل', keywords: 'truck توصيل شحن' },
    { key: 'gift', Icon: FiGift, label: 'هدية', keywords: 'gift هدية عرض' },

    // متنوّع
    { key: 'target', Icon: FiTarget, label: 'هدف', keywords: 'target هدف غاية' },
    { key: 'crosshair', Icon: FiCrosshair, label: 'تركيز', keywords: 'crosshair تركيز دقة' },
    { key: 'zap', Icon: FiZap, label: 'سرعة', keywords: 'zap سرعة طاقة' },
    { key: 'check-circle', Icon: FiCheckCircle, label: 'مكتمل', keywords: 'check مكتمل حالة تم' },
    { key: 'eye', Icon: FiEye, label: 'مشاهدة', keywords: 'eye مشاهدة عرض' },
    { key: 'map-pin', Icon: FiMapPin, label: 'موقع جغرافي', keywords: 'map pin موقع مكان بلد' },
    { key: 'compass', Icon: FiCompass, label: 'بوصلة', keywords: 'compass اتجاه استكشاف' },
    { key: 'feather', Icon: FiFeather, label: 'ريشة', keywords: 'feather كتابة خفة' },
    { key: 'coffee', Icon: FiCoffee, label: 'قهوة', keywords: 'coffee قهوة مقهى' },
    { key: 'shield', Icon: FiShield, label: 'حماية', keywords: 'shield حماية أمان' },
    { key: 'lock', Icon: FiLock, label: 'قفل', keywords: 'lock قفل خصوصية' },
    { key: 'key', Icon: FiKey, label: 'مفتاح', keywords: 'key مفتاح وصول' },
    { key: 'mail', Icon: FiMail, label: 'بريد', keywords: 'mail بريد ايميل' },
    { key: 'phone', Icon: FiPhone, label: 'هاتف', keywords: 'phone هاتف اتصال' },
    { key: 'info', Icon: FiInfo, label: 'معلومة', keywords: 'info معلومة عام' },
];

const ICON_MAP: Record<string, IconType> = Object.fromEntries(
    DETAIL_ICON_OPTIONS.map((option) => [option.key, option.Icon])
);

/** Shown for an empty or unrecognised key, so stored data can never break a render. */
export const DEFAULT_DETAIL_ICON: IconType = FiInfo;

export const resolveDetailIcon = (key?: string): IconType =>
    (key && ICON_MAP[key]) || DEFAULT_DETAIL_ICON;
