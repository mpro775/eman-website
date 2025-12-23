# Eman Portfolio - Backend API

## 📋 وصف المشروع

Backend API لموقع البورتفوليو الشخصي للمبرمجة إيمان، مبني باستخدام NestJS، TypeScript، و MongoDB.

## 🚀 الميزات الرئيسية

- ✅ معمارية Modular احترافية
- ✅ نظام مصادقة JWT كامل
- ✅ نظام أخطاء وردود موحد
- ✅ حماية متكاملة (Helmet, CORS, Rate Limiting)
- ✅ 9 وحدات رئيسية
- ✅ Swagger API Documentation
- ✅ Pagination و Filtering
- ✅ Input Validation
- ✅ Database Indexing

## 📦 التقنيات المستخدمة

- **Framework**: NestJS 10
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (Passport)
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Throttler

## 🛠 التثبيت

### المتطلبات

- Node.js (v18 أو أحدث)
- npm أو yarn
- MongoDB (محلي أو MongoDB Atlas)

### خطوات التثبيت

```bash
# 1. تثبيت الحزم
npm install

# 2. نسخ ملف البيئة
cp .env.example .env

# 3. تعديل متغيرات البيئة في .env
# قم بتحديث MONGODB_URI و JWT secrets

# 4. تشغيل Database Seeds
npm run seed

# 5. تشغيل التطبيق
npm run start:dev
```

## 🔐 المصادقة

### المستخدم الافتراضي (بعد تشغيل Seeds)

- **البريد الإلكتروني**: `admin@eman.com`
- **كلمة المرور**: `Admin@123`

### استخدام الـ API

1. قم بتسجيل الدخول عبر `/api/auth/login`
2. استخدم الـ `accessToken` في Header:
   ```
   Authorization: Bearer YOUR_ACCESS_TOKEN
   ```

## 📚 الوحدات (Modules)

### 1. Auth Module
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/logout` - تسجيل الخروج
- `POST /api/auth/refresh` - تحديث التوكن
- `POST /api/auth/change-password` - تغيير كلمة المرور
- `GET /api/auth/me` - معلومات المستخدم

### 2. Profile Module
- `GET /api/profile` - عرض الملف الشخصي (Public)
- `PUT /api/profile` - تحديث الملف الشخصي (Admin)

### 3. Projects Module
- `GET /api/projects` - عرض المشاريع (Public)
- `GET /api/projects/:id` - عرض مشروع واحد (Public)
- `POST /api/projects` - إضافة مشروع (Admin)
- `PUT /api/projects/:id` - تحديث مشروع (Admin)
- `DELETE /api/projects/:id` - حذف مشروع (Admin)

### 4. Blog Module

**Posts:**
- `GET /api/blog/posts` - عرض المقالات (Public)
- `GET /api/blog/posts/:id` - عرض مقال (Public)
- `GET /api/blog/posts/slug/:slug` - عرض مقال بالـ slug (Public)
- `POST /api/blog/posts` - إضافة مقال (Admin)
- `PUT /api/blog/posts/:id` - تحديث مقال (Admin)
- `DELETE /api/blog/posts/:id` - حذف مقال (Admin)

**Categories:**
- `GET /api/blog/categories` - عرض التصنيفات (Public)
- `POST /api/blog/categories` - إضافة تصنيف (Admin)
- CRUD كامل

**Tags:**
- `GET /api/blog/tags` - عرض الوسوم (Public)
- `POST /api/blog/tags` - إضافة وسم (Admin)
- CRUD كامل

### 5. Technologies Module
- `GET /api/technologies` - عرض التقنيات (Public)
- `POST /api/technologies` - إضافة تقنية (Admin)
- CRUD كامل

### 6. Services Module
- `GET /api/services` - عرض الخدمات (Public)
- `POST /api/services` - إضافة خدمة (Admin)
- CRUD كامل

### 7. Contact Module
- `POST /api/contact` - إرسال رسالة (Public + Rate Limited)
- `GET /api/contact/messages` - عرض الرسائل (Admin)
- `PATCH /api/contact/messages/:id/status` - تحديث حالة (Admin)
- `DELETE /api/contact/messages/:id` - حذف رسالة (Admin)

### 8. Links Module
- `GET /api/links` - عرض الروابط (Public)
- `POST /api/links` - إضافة رابط (Admin)
- CRUD كامل

### 9. FAQs Module
- `GET /api/faqs` - عرض الأسئلة (Public)
- `POST /api/faqs` - إضافة سؤال (Admin)
- CRUD كامل

## 📖 API Documentation

بعد تشغيل التطبيق، يمكنك الوصول إلى Swagger Documentation:

```
http://localhost:3000/api/docs
```

## 🔒 الحماية

### Rate Limiting

- **عام**: 10 طلبات في الدقيقة
- **Contact Form**: 3 رسائل في الساعة لكل IP

### Headers

- Helmet لحماية HTTP Headers
- CORS محدد للنطاقات المصرح بها

### Validation

- التحقق الشامل من جميع المدخلات
- رسائل خطأ واضحة بالعربية

## 🧪 الاختبار

### اختبار الـ APIs يدوياً

1. استخدم Postman أو Thunder Client
2. قم بتسجيل الدخول أولاً للحصول على التوكن
3. اختبر جميع الـ Endpoints

### اختبار الـ Endpoints العامة (بدون توكن)

```bash
# عرض الملف الشخصي
GET http://localhost:3000/api/profile

# عرض المشاريع
GET http://localhost:3000/api/projects

# عرض المقالات
GET http://localhost:3000/api/blog/posts
```

### اختبار الـ Endpoints المحمية

```bash
# تسجيل الدخول أولاً
POST http://localhost:3000/api/auth/login
Body: {
  "email": "admin@eman.com",
  "password": "Admin@123"
}

# استخدم الـ accessToken في الطلبات التالية
POST http://localhost:3000/api/projects
Headers: {
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
Body: {
  "title": "مشروع جديد",
  "shortDescription": "وصف قصير للمشروع",
  ...
}
```

## 📁 هيكل المشروع

```
backend/
├── src/
│   ├── common/           # الملفات المشتركة
│   │   ├── filters/     # معالجات الأخطاء
│   │   ├── interceptors/ # معالجات الردود
│   │   ├── guards/      # حماية الروابط
│   │   ├── decorators/  # ديكوريتورز مخصصة
│   │   └── dto/         # DTOs مشتركة
│   ├── config/          # إعدادات التطبيق
│   ├── database/        # Database و Seeds
│   ├── modules/         # الوحدات الرئيسية
│   │   ├── auth/
│   │   ├── users/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── blog/
│   │   ├── technologies/
│   │   ├── services/
│   │   ├── contact/
│   │   ├── links/
│   │   └── faqs/
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.example
└── package.json
```

## 🌍 متغيرات البيئة

```env
# Application
NODE_ENV=development
PORT=3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/eman-portfolio

# JWT
JWT_ACCESS_SECRET=your-secret-key
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRATION=7d

# CORS
ALLOWED_ORIGINS=http://localhost:3001

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

## 📝 ملاحظات مهمة

1. **تغيير كلمة المرور الافتراضية**: يُنصح بتغيير كلمة مرور المستخدم الافتراضي فوراً
2. **JWT Secrets**: استخدم secrets قوية في الإنتاج
3. **MongoDB**: استخدم MongoDB Atlas في الإنتاج
4. **CORS**: قم بتحديث ALLOWED_ORIGINS للنطاقات الصحيحة
5. **Rate Limiting**: قم بضبط الحدود حسب احتياجاتك

## 🚀 النشر (Deployment)

### الإعدادات المطلوبة

1. قم بتحديث متغيرات البيئة للإنتاج
2. استخدم MongoDB Atlas
3. قم بإعداد SSL/TLS
4. استخدم PM2 أو Docker للتشغيل
5. قم بإعداد Reverse Proxy (Nginx)

## 📄 الترخيص

هذا المشروع خاص بالمبرمجة إيمان.

## 🤝 المساهمة

لأي استفسارات أو مساهمات، يرجى التواصل مع صاحبة المشروع.

---

**تم بناؤه بـ ❤️ باستخدام NestJS**
