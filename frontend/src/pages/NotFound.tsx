import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

const NotFound = () => {
    useSEO({
        title: "الصفحة غير موجودة",
        description: "تعذر العثور على الصفحة المطلوبة.",
        url: window.location.pathname,
        noindex: true,
    });

    return (
        <main className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-6 px-6 text-center" dir="rtl">
            <p className="text-accent-pink text-lg">404</p>
            <h1 className="text-white text-3xl font-bold">الصفحة غير موجودة</h1>
            <p className="text-text-secondary">قد يكون الرابط غير صحيح أو تم نقل الصفحة.</p>
            <Link
                to="/"
                className="rounded-xl bg-accent-pink px-6 py-3 text-white transition-opacity hover:opacity-90"
            >
                العودة إلى الصفحة الرئيسية
            </Link>
        </main>
    );
};

export default NotFound;
