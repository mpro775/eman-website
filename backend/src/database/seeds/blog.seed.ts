import { Model } from 'mongoose';
import { Category } from '../../modules/blog/categories/schemas/category.schema';
import { Tag } from '../../modules/blog/tags/schemas/tag.schema';
import { PostBlog, PostStatus } from '../../modules/blog/posts/schemas/post.schema';
import { User } from '../../modules/users/schemas/user.schema';

// Blog Categories Data
const categoriesData = [
    {
        name: 'التصميم',
        slug: 'design',
        description: 'مقالات حول تصميم واجهات المستخدم وتجربة المستخدم والتصميم الجرافيكي',
        isActive: true,
    },
    {
        name: 'التطوير',
        slug: 'development',
        description: 'مقالات حول تطوير الويب وتطبيقات الموبايل والبرمجة',
        isActive: true,
    },
    {
        name: 'التكنولوجيا',
        slug: 'technology',
        description: 'أحدث الأخبار والاتجاهات في عالم التكنولوجيا',
        isActive: true,
    },
    {
        name: 'ريادة الأعمال',
        slug: 'entrepreneurship',
        description: 'نصائح وإرشادات لرواد الأعمال والمستقلين',
        isActive: true,
    },
    {
        name: 'الإنتاجية',
        slug: 'productivity',
        description: 'طرق ونصائح لتحسين الإنتاجية والعمل بذكاء',
        isActive: true,
    },
];

// Blog Tags Data
const tagsData = [
    { name: 'UI/UX', slug: 'ui-ux', isActive: true },
    { name: 'Figma', slug: 'figma', isActive: true },
    { name: 'React', slug: 'react', isActive: true },
    { name: 'Next.js', slug: 'nextjs', isActive: true },
    { name: 'Node.js', slug: 'nodejs', isActive: true },
    { name: 'TypeScript', slug: 'typescript', isActive: true },
    { name: 'JavaScript', slug: 'javascript', isActive: true },
    { name: 'Flutter', slug: 'flutter', isActive: true },
    { name: 'تطبيقات الموبايل', slug: 'mobile-apps', isActive: true },
    { name: 'الذكاء الاصطناعي', slug: 'ai', isActive: true },
    { name: 'التسويق الرقمي', slug: 'digital-marketing', isActive: true },
    { name: 'العمل الحر', slug: 'freelancing', isActive: true },
    { name: 'CSS', slug: 'css', isActive: true },
    { name: 'Tailwind', slug: 'tailwind', isActive: true },
    { name: 'MongoDB', slug: 'mongodb', isActive: true },
];

// Blog Posts Data (will be populated with category and tag IDs)
const postsData = [
    {
        title: 'أساسيات تصميم واجهات المستخدم UI للمبتدئين',
        slug: 'ui-design-basics-for-beginners',
        summary: 'دليل شامل للمبتدئين في عالم تصميم واجهات المستخدم. تعرف على المبادئ الأساسية والأدوات المستخدمة.',
        content: `
# مقدمة في تصميم واجهات المستخدم

تصميم واجهات المستخدم (UI) هو فن وعلم إنشاء واجهات بصرية جذابة وسهلة الاستخدام للتطبيقات والمواقع الإلكترونية.

## ما هو تصميم UI؟

تصميم واجهة المستخدم يركز على المظهر المرئي للمنتج الرقمي. يشمل ذلك:
- الألوان والخطوط
- الأزرار والأيقونات
- التخطيط والمسافات
- الصور والرسوميات

## المبادئ الأساسية

### 1. التسلسل الهرمي البصري
يجب أن تكون العناصر الأكثر أهمية هي الأكثر بروزاً في التصميم.

### 2. التناسق
استخدم نفس الأنماط والعناصر عبر جميع صفحات التطبيق.

### 3. المسافات البيضاء
لا تخف من المساحات الفارغة، فهي تساعد على تنظيم المحتوى.

## الأدوات الشائعة

- **Figma**: أداة تصميم سحابية شهيرة
- **Adobe XD**: من أدوات أدوبي القوية
- **Sketch**: مخصصة لمستخدمي Mac

## الخلاصة

تصميم UI مهارة يمكن تعلمها مع الممارسة المستمرة. ابدأ بالأساسيات وتطور تدريجياً.
    `.trim(),
        featuredImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
        categorySlug: 'design',
        tagSlugs: ['ui-ux', 'figma'],
        status: PostStatus.PUBLISHED,
        readTime: 5,
        views: 245,
        loves: 32,
    },
    {
        title: 'الفرق بين UI و UX: دليل شامل',
        slug: 'difference-between-ui-and-ux',
        summary: 'كثيراً ما يتم الخلط بين UI و UX. في هذا المقال نوضح الفرق بينهما وكيف يكمل كل منهما الآخر.',
        content: `
# الفرق بين UI و UX

هل سبق أن تساءلت عن الفرق بين تصميم واجهة المستخدم (UI) وتجربة المستخدم (UX)؟ دعنا نوضح ذلك.

## تجربة المستخدم UX

تجربة المستخدم تركز على **كيف يشعر** المستخدم عند استخدام المنتج:
- سهولة الاستخدام
- إمكانية الوصول
- الكفاءة في إنجاز المهام
- الرضا العام

## واجهة المستخدم UI

واجهة المستخدم تركز على **كيف يبدو** المنتج:
- الألوان والخطوط
- الأيقونات والأزرار
- التخطيط البصري
- الرسوم المتحركة

## العلاقة بينهما

| UX | UI |
|---|---|
| يسأل "لماذا؟" | يسأل "كيف يبدو؟" |
| يركز على الوظيفة | يركز على الشكل |
| أبحاث ودراسات | إبداع وفن |

## الخلاصة

كلاهما ضروري لنجاح أي منتج رقمي. أفضل المنتجات هي التي تجمع بين تجربة مستخدم ممتازة وواجهة جميلة.
    `.trim(),
        featuredImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=450&fit=crop',
        categorySlug: 'design',
        tagSlugs: ['ui-ux'],
        status: PostStatus.PUBLISHED,
        readTime: 4,
        views: 189,
        loves: 28,
    },
    {
        title: 'بناء تطبيقات الويب الحديثة باستخدام React و TypeScript',
        slug: 'building-modern-web-apps-with-react-typescript',
        summary: 'تعلم كيفية بناء تطبيقات ويب قوية وآمنة باستخدام React مع TypeScript.',
        content: `
# بناء تطبيقات الويب الحديثة

React مع TypeScript هو الخيار الأمثل لبناء تطبيقات ويب قابلة للصيانة والتوسع.

## لماذا TypeScript؟

TypeScript يضيف نظام أنواع قوي إلى JavaScript:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = (id: number): User => {
  // ...
};
\`\`\`

## إعداد المشروع

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

## المكونات المكتوبة

\`\`\`tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button className={variant} onClick={onClick}>
      {label}
    </button>
  );
};
\`\`\`

## الخلاصة

الجمع بين React و TypeScript يعطيك أفضل ما في العالمين: مرونة React وأمان TypeScript.
    `.trim(),
        featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
        categorySlug: 'development',
        tagSlugs: ['react', 'typescript', 'javascript'],
        status: PostStatus.PUBLISHED,
        readTime: 8,
        views: 512,
        loves: 67,
    },
    {
        title: 'دليل المبتدئين لـ Next.js 14',
        slug: 'nextjs-14-beginners-guide',
        summary: 'اكتشف ميزات Next.js 14 الجديدة وتعلم كيفية بناء تطبيقات ويب سريعة ومحسنة لمحركات البحث.',
        content: `
# دليل Next.js 14 للمبتدئين

Next.js 14 يأتي بميزات رائعة تجعل تطوير الويب أسهل وأسرع.

## الميزات الجديدة

### 1. App Router
نظام توجيه جديد يعتمد على المجلدات:

\`\`\`
app/
├── page.tsx          # الصفحة الرئيسية
├── about/page.tsx    # صفحة من نحن
└── blog/[slug]/page.tsx
\`\`\`

### 2. Server Components
مكونات تعمل على الخادم افتراضياً:

\`\`\`tsx
// هذا المكون يعمل على الخادم
async function BlogPosts() {
  const posts = await fetchPosts();
  return <PostsList posts={posts} />;
}
\`\`\`

### 3. Server Actions
تنفيذ الإجراءات على الخادم مباشرة:

\`\`\`tsx
async function submitForm(formData: FormData) {
  'use server';
  await saveToDatabase(formData);
}
\`\`\`

## البدء سريعاً

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

## الخلاصة

Next.js 14 يمثل قفزة كبيرة في تطوير الويب الحديث.
    `.trim(),
        featuredImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
        categorySlug: 'development',
        tagSlugs: ['nextjs', 'react', 'typescript'],
        status: PostStatus.PUBLISHED,
        readTime: 7,
        views: 423,
        loves: 54,
    },
    {
        title: 'مستقبل الذكاء الاصطناعي في تصميم المنتجات',
        slug: 'future-of-ai-in-product-design',
        summary: 'كيف سيغير الذكاء الاصطناعي طريقة تصميم المنتجات الرقمية في المستقبل القريب.',
        content: `
# الذكاء الاصطناعي ومستقبل التصميم

الذكاء الاصطناعي يعيد تشكيل صناعة التصميم بطرق لم نتخيلها من قبل.

## أدوات AI في التصميم

### 1. توليد الصور
- DALL-E
- Midjourney
- Stable Diffusion

### 2. مساعدات التصميم
- Figma AI
- Adobe Firefly
- Canva Magic Studio

## كيف سيؤثر AI على المصممين؟

الذكاء الاصطناعي لن يحل محل المصممين، بل سيكون أداة قوية في أيديهم.

### المهام التي سيتولاها AI:
- توليد أفكار أولية
- إنشاء الأصول البصرية
- تحسين الصور
- إنشاء النصوص

### المهام التي ستبقى للمصممين:
- القرارات الإبداعية
- فهم المستخدم
- التفكير الاستراتيجي
- حل المشكلات المعقدة

## الخلاصة

المصمم الذكي هو من يتعلم استخدام أدوات AI ليعزز قدراته الإبداعية.
    `.trim(),
        featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
        categorySlug: 'technology',
        tagSlugs: ['ai', 'ui-ux', 'figma'],
        status: PostStatus.PUBLISHED,
        readTime: 6,
        views: 678,
        loves: 89,
    },
    {
        title: 'كيف تبدأ العمل الحر كمصمم UI/UX',
        slug: 'start-freelancing-as-ui-ux-designer',
        summary: 'دليل عملي خطوة بخطوة للبدء في العمل الحر كمصمم واجهات ومستخدم.',
        content: `
# البدء في العمل الحر كمصمم UI/UX

العمل الحر في مجال التصميم فرصة رائعة لبناء مسيرة مهنية مستقلة ومربحة.

## الخطوة 1: بناء المهارات

قبل البدء، تأكد من إتقان:
- تصميم واجهات المستخدم
- تجربة المستخدم والبحث
- أدوات التصميم (Figma, Adobe XD)
- التواصل مع العملاء

## الخطوة 2: بناء معرض الأعمال

معرض الأعمال هو أهم أداة تسويقية:
- اعرض 5-10 مشاريع قوية
- اشرح العملية وليس النتيجة فقط
- استخدم دراسات حالة مفصلة

## الخطوة 3: اختيار المنصات

### منصات عربية:
- مستقل
- خمسات
- نفذلي

### منصات عالمية:
- Upwork
- Fiverr
- Toptal

## الخطوة 4: تسعير خدماتك

\`\`\`
= (التكلفة الشهرية × 12) ÷ (ساعات العمل السنوية × 0.6)
\`\`\`

## النصيحة الذهبية

ابدأ صغيراً، اجمع تقييمات إيجابية، ثم ارفع أسعارك تدريجياً.
    `.trim(),
        featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop',
        categorySlug: 'entrepreneurship',
        tagSlugs: ['freelancing', 'ui-ux', 'digital-marketing'],
        status: PostStatus.PUBLISHED,
        readTime: 9,
        views: 834,
        loves: 112,
    },
    {
        title: '10 نصائح لزيادة إنتاجيتك كمطور',
        slug: 'productivity-tips-for-developers',
        summary: 'نصائح عملية ومجربة لتحسين إنتاجيتك والعمل بذكاء وليس بجهد أكبر.',
        content: `
# 10 نصائح لزيادة الإنتاجية

كمطور، وقتك ثمين. إليك نصائح لاستغلاله بشكل أفضل.

## 1. استخدم Pomodoro Technique
اعمل 25 دقيقة، استرح 5 دقائق.

## 2. أتمتة المهام المتكررة
\`\`\`bash
# بدلاً من كتابة الأوامر يدوياً
alias gp="git add . && git commit -m"
\`\`\`

## 3. تعلم اختصارات لوحة المفاتيح
كل ثانية يتم توفيرها تتراكم مع الوقت.

## 4. استخدم مدير المهام
- Todoist
- Notion
- Linear

## 5. حدد وقتاً للتحقق من البريد
لا تتحقق منه كل 5 دقائق.

## 6. قل "لا" أكثر
ليس كل مهمة تستحق وقتك.

## 7. احصل على نوم كافٍ
العقل المتعب = إنتاجية منخفضة.

## 8. مارس الرياضة
الجسم السليم = عقل سليم.

## 9. تعلم شيئاً جديداً يومياً
30 دقيقة من التعلم تفرق كثيراً.

## 10. خذ استراحات منتظمة
العمل المستمر بدون راحة يضر أكثر مما ينفع.

## الخلاصة
الإنتاجية ليست عن العمل أكثر، بل عن العمل بذكاء.
    `.trim(),
        featuredImage: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=450&fit=crop',
        categorySlug: 'productivity',
        tagSlugs: ['freelancing'],
        status: PostStatus.PUBLISHED,
        readTime: 5,
        views: 567,
        loves: 78,
    },
    {
        title: 'تطوير تطبيقات Flutter: من الصفر للاحتراف',
        slug: 'flutter-development-guide',
        summary: 'دليلك الشامل لتعلم Flutter وبناء تطبيقات موبايل احترافية لـ iOS و Android.',
        content: `
# تطوير تطبيقات Flutter

Flutter إطار عمل من Google لبناء تطبيقات متعددة المنصات.

## لماذا Flutter؟

- **كود واحد**: iOS و Android من نفس الكود
- **أداء عالي**: يقارب التطبيقات الأصلية
- **Hot Reload**: رؤية التغييرات فوراً
- **مجتمع نشط**: دعم ومكتبات وفيرة

## البدء مع Flutter

### 1. التثبيت
\`\`\`bash
# macOS
brew install flutter

# التحقق
flutter doctor
\`\`\`

### 2. إنشاء مشروع
\`\`\`bash
flutter create my_app
cd my_app
flutter run
\`\`\`

## أهم Widgets

\`\`\`dart
import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('مرحباً')),
        body: Center(
          child: Text('أهلاً بالعالم!'),
        ),
      ),
    );
  }
}
\`\`\`

## State Management

الخيارات الشائعة:
- Provider
- Riverpod
- BLoC
- GetX

## الخلاصة

Flutter خيار ممتاز لمن يريد تطوير تطبيقات لكلا المنصتين بكفاءة.
    `.trim(),
        featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
        categorySlug: 'development',
        tagSlugs: ['flutter', 'mobile-apps'],
        status: PostStatus.PUBLISHED,
        readTime: 10,
        views: 723,
        loves: 95,
    },
];

export async function seedBlogCategories(categoryModel: Model<Category>) {
    console.log('\n📂 Seeding blog categories...');

    const createdCategories: { slug: string; _id: any }[] = [];

    for (const categoryData of categoriesData) {
        const existing = await categoryModel.findOne({ slug: categoryData.slug });
        if (!existing) {
            const category = await categoryModel.create(categoryData);
            createdCategories.push({ slug: category.slug, _id: category._id });
            console.log(`   ✅ Created category: ${categoryData.name}`);
        } else {
            createdCategories.push({ slug: existing.slug, _id: existing._id });
            console.log(`   ⏭️  Category exists: ${categoryData.name}`);
        }
    }

    return createdCategories;
}

export async function seedBlogTags(tagModel: Model<Tag>) {
    console.log('\n🏷️  Seeding blog tags...');

    const createdTags: { slug: string; _id: any }[] = [];

    for (const tagData of tagsData) {
        const existing = await tagModel.findOne({ slug: tagData.slug });
        if (!existing) {
            const tag = await tagModel.create(tagData);
            createdTags.push({ slug: tag.slug, _id: tag._id });
            console.log(`   ✅ Created tag: ${tagData.name}`);
        } else {
            createdTags.push({ slug: existing.slug, _id: existing._id });
            console.log(`   ⏭️  Tag exists: ${tagData.name}`);
        }
    }

    return createdTags;
}

export async function seedBlogPosts(
    postModel: Model<PostBlog>,
    userModel: Model<User>,
    categories: { slug: string; _id: any }[],
    tags: { slug: string; _id: any }[]
) {
    console.log('\n📝 Seeding blog posts...');

    // Find admin user to be the author
    const adminUser = await userModel.findOne({ email: 'admin@eman.com' });
    if (!adminUser) {
        console.log('   ❌ Admin user not found. Please run user seed first.');
        return;
    }

    for (const postData of postsData) {
        const existing = await postModel.findOne({ slug: postData.slug });
        if (existing) {
            console.log(`   ⏭️  Post exists: ${postData.title}`);
            continue;
        }

        // Find category ID
        const category = categories.find(c => c.slug === postData.categorySlug);
        if (!category) {
            console.log(`   ❌ Category not found for post: ${postData.title}`);
            continue;
        }

        // Find tag IDs
        const postTagIds = postData.tagSlugs
            .map(slug => tags.find(t => t.slug === slug)?._id)
            .filter(Boolean);

        // Create post document using new model instance to avoid type issues
        const postDoc = new postModel();
        postDoc.title = postData.title;
        postDoc.slug = postData.slug;
        postDoc.summary = postData.summary;
        postDoc.content = postData.content;
        postDoc.featuredImage = postData.featuredImage;
        postDoc.category = category._id;
        postDoc.tags = postTagIds;
        postDoc.author = adminUser._id as any;
        postDoc.status = postData.status;
        postDoc.readTime = postData.readTime;
        postDoc.views = postData.views;
        postDoc.loves = postData.loves;
        postDoc.publishDate = new Date();
        postDoc.seo = {
            metaTitle: postData.title,
            metaDescription: postData.summary,
        };

        await postDoc.save();

        console.log(`   ✅ Created post: ${postData.title}`);
    }
}

