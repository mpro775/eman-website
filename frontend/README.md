# Eman Portfolio - Frontend

موقع البورتفوليو الشخصي للمبرمجة إيمان - واجهة المستخدم الأمامية

## 🎨 التصميم

تصميم Dark Mode حديث مع تأثيرات Neon وGradients، مستوحى من التصميم الأصلي للموقع.

### نظام الألوان

- **خلفية داكنة**: تدرجات من بنفسجي داكن إلى أسود (#1A0E2E → #0A0A0F → #2E0E1E)
- **ألوان Accent**:
  - وردي نيون: #FF0080
  - أزرق نيون: #00F0FF
  - بنفسجي: #9D4EDD
- **نص**: أبيض (#FFFFFF) مع تدرجات رمادية

### الميزات البصرية

- ✅ تأثيرات Neon Glow
- ✅ Gradients متحركة
- ✅ تأثيرات إضاءة ناعمة
- ✅ Animations باستخدام Framer Motion
- ✅ دعم RTL كامل
- ✅ Typography عربي/إنجليزي

## 🚀 التقنيات المستخدمة

- **React 19** - المكتبة الأساسية
- **TypeScript** - للـ Type Safety
- **Vite** - Build Tool سريع
- **Framer Motion** - للأنيميشن
- **React Icons** - للأيقونات
- **CSS Modules** - للتنسيق

## 📁 هيكل المشروع

```
frontend/
├── public/              # ملفات عامة
├── src/
│   ├── assets/         # صور وأيقونات
│   ├── components/     # مكونات React
│   │   ├── layout/    # Header, Footer
│   │   ├── ui/        # Button, Typography
│   │   └── common/    # Container, etc.
│   ├── pages/         # صفحات التطبيق
│   │   └── Home/      # الصفحة الرئيسية
│   ├── styles/        # ملفات CSS
│   │   ├── theme.ts   # نظام الألوان
│   │   └── global.css # أنماط عامة
│   ├── hooks/         # Custom Hooks
│   ├── services/      # API Services
│   ├── types/         # TypeScript Types
│   ├── utils/         # Helper Functions
│   ├── App.tsx        # المكون الرئيسي
│   └── main.tsx       # نقطة الدخول
├── package.json
└── vite.config.ts
```

## 🎯 المكونات المنجزة

### ✅ المكونات الأساسية (Base Components)

1. **Button** - ثلاثة أنواع:
   - Primary: gradient pink button
   - Secondary: transparent with glow
   - Outline: minimal bordered

2. **Typography** - عناصر النصوص:
   - Heading (H1-H6) مع دعم Glow effects
   - Text مع أحجام وأوزان مختلفة
   - Label للنماذج

3. **Container** - للتخطيط:
   - أحجام متعددة (sm, md, lg, xl, full)
   - دعم RTL
   - Responsive padding

### ✅ Layout Components

1. **Header**:
   - Logo (إيمان) مع pink glow
   - Navigation links (5 روابط)
   - CV Download button
   - Fixed position مع backdrop blur
   - Hover effects و animations

### ✅ الصفحة الرئيسية (Home Page)

1. **Hero Section**:
   - Badge "مرحباً" مع neon line
   - عنوان رئيسي: "أنا إيمان." + "UX/UI Designer"
   - خطوط neon زرقاء زخرفية
   - مكان للصورة الشخصية مع إضاءة من الأسفل
   - Quote section على اليمين
   - زرين CTA: "أعمالي" و "تواصل معي"

2. **Background Effects**:
   - Gradient متحرك
   - 3 Glow effects (pink, cyan, purple)
   - Floating animations
   - Radial gradients

## 🛠 التثبيت والتشغيل

### المتطلبات

- Node.js (v18 أو أحدث)
- npm أو yarn

### خطوات التشغيل

```bash
# 1. الانتقال إلى مجلد frontend
cd frontend

# 2. تثبيت الحزم (تم بالفعل)
npm install

# 3. تشغيل التطبيق في وضع التطوير
npm run dev

# 4. بناء التطبيق للإنتاج
npm run build

# 5. معاينة البناء
npm run preview
```

التطبيق سيعمل على: `http://localhost:5173`

## 🎨 نظام الثيم (Theme System)

### استخدام الألوان

```typescript
import theme from './styles/theme';

// استخدام الألوان
const pinkColor = theme.colors.accent.pink;
const gradient = theme.colors.gradients.button;
```

### CSS Variables

```css
/* متاح في جميع ملفات CSS */
background: var(--accent-pink);
color: var(--text-primary);
box-shadow: var(--shadow-glow-pink);
```

### Utility Classes

```jsx
<div className="glow-pink">نص مع تأثير نيون وردي</div>
<div className="gradient-text">نص بـ gradient</div>
<div className="animated-gradient">خلفية متحركة</div>
```

## 🌐 دعم RTL

جميع المكونات تدعم RTL بشكل افتراضي:

```css
html {
  direction: rtl;
}
```

## ♿ Accessibility

- دعم ARIA labels
- Focus states واضحة
- Keyboard navigation
- Semantic HTML

## 📱 Responsive Design

التصميم متجاوب على جميع الشاشات:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚧 ما سيتم إضافته لاحقاً

- [ ] Router Setup (React Router)
- [ ] صفحات إضافية (About, Portfolio, Blog, Contact)
- [ ] API Integration مع Backend
- [ ] State Management (Zustand)
- [ ] Forms و Validation
- [ ] Loading States
- [ ] Error Handling
- [ ] SEO Optimization
- [ ] Performance Optimization

## 🎯 الأداء

- ⚡ Vite للبناء السريع
- 🎨 Code Splitting
- 🖼 Lazy Loading للصور
- 🎭 Animations محسّنة
- 📦 Bundle Size صغير

## 📝 ملاحظات التطوير

### إضافة مكون جديد

```tsx
// في components/ui/MyComponent.tsx
import React from 'react';
import './MyComponent.css';

interface MyComponentProps {
  // props here
}

const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <div>My Component</div>;
};

export default MyComponent;
```

### استخدام Framer Motion

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  محتوى متحرك
</motion.div>
```

## 🤝 المساهمة

هذا مشروع خاص بالمبرمجة إيمان.

## 📄 الترخيص

جميع الحقوق محفوظة © 2024 إيمان

---

**تم بناؤه بـ ❤️ باستخدام React 19 + TypeScript + Vite**
