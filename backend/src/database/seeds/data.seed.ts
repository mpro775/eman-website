import { Model } from 'mongoose';
import { Experience } from '../../modules/experiences/schemas/experience.schema';
import { Service } from '../../modules/services/schemas/service.schema';
import { UsedProgram } from '../../modules/used-programs/schemas/used-program.schema';
import { Testimonial } from '../../modules/testimonials/schemas/testimonial.schema';
import { ProjectCategory } from '../../modules/projects/categories/schemas/project-category.schema';
import { Project } from '../../modules/projects/schemas/project.schema';

export async function seedExperiences(model: Model<Experience>) {
  const experiences = [
    { name: 'UX/UI', description: 'في محفظة جيب', order: 1 },
    { name: 'أستاذ مساعد', description: 'في جامعة العلوم الحديثة', order: 2 },
    { name: 'أستاذة UX/UI', description: 'في أكاديمية سمارت ديف', order: 3 },
    { name: 'Graphic Designer', description: 'في وكالة حريف', order: 4 },
    { name: 'UX/UI & Graphic Designer', description: 'أعمال حرة', order: 5 },
    { name: 'دعم فني', description: 'في مجموعة هائل سعيد أنعم', order: 6 },
    { name: 'Flutter App', description: 'مشروع تخرج في جامعة العلوم الحديثة', order: 7 },
    { name: 'سكرتارية + أمين صندوق', description: 'في مركز يونك للأنظمة المحاسبية', order: 8 },
  ];

  await model.deleteMany({});
  await model.insertMany(experiences);
  console.log('Experiences seeded successfully!');
}

export async function seedServices(model: Model<Service>) {
  const services = [
    {
      name: 'Digital Marketing',
      description: 'إنشاء صفحات السوشل ميديا, وإدارة الحملات الإعلانية، والرد على العملاء',
      icon: 'digital_Service.png',
      order: 1,
      isPublished: true,
    },
    {
      name: 'Graphic Designs',
      description: 'تصميم الهوية التجارية المتكاملة ، شعارات . بوسترات إعلانية و بنرات',
      icon: 'graghic_Service.png',
      order: 2,
      isPublished: true,
    },
    {
      name: 'UX / UI Design',
      description: 'تطبيقات الموبايل ، المواقع الإلكترونية ، لوحات التحكم و الإنظمة المتكاملة',
      icon: 'ui_ux_Service.png',
      order: 3,
      isPublished: true,
    },
  ];

  await model.deleteMany({});
  await model.insertMany(services);
  console.log('Services seeded successfully!');
}

export async function seedUsedPrograms(model: Model<UsedProgram>) {
  const programs = [
    { name: 'VS Code', image: 'vscode.png', orderNumber: 1 },
    { name: 'InDesign', image: 'id.png', orderNumber: 2 },
    { name: 'Illustrator', image: 'ai.png', orderNumber: 3 },
    { name: 'Photoshop', image: 'photoshop.png', orderNumber: 4 },
    { name: 'Figma', image: 'figma.png', orderNumber: 5 },
  ];

  await model.deleteMany({});
  await model.insertMany(programs);
  console.log('UsedPrograms seeded successfully!');
}

export async function seedTestimonials(model: Model<Testimonial>) {
  const testimonials = [
    {
      personName: 'Fletcher Howard',
      companyName: 'Chief Executive Officer - GIGL',
      ratingText: 'A great worker. He thinks about design and has a awesome working morale',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      orderNumber: 1,
    },
    {
      personName: 'Cameron Williamson',
      companyName: 'Chief Executive Officer - GIGL',
      ratingText:
        'Kevin Did a wonderful job animating set of static stickers. Work was done very quickly and the quality is outstanding. she managed to create great looking, flawless animation even with very limited number of frames allowed per stickers',
      image: 'https://randomuser.me/api/portraits/men/44.jpg',
      orderNumber: 2,
    },
    {
      personName: 'Savannah Nguyen',
      companyName: 'Chief Executive Officer - GIGL',
      ratingText:
        "Great Designer, does great work and is open to change. if you're a programmer and looking for a designer is definitely well qualified.",
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      orderNumber: 3,
    },
  ];

  await model.deleteMany({});
  await model.insertMany(testimonials);
  console.log('Testimonials seeded successfully!');
}

export async function seedProjectsAndCategories(
  categoryModel: Model<ProjectCategory>,
  projectModel: Model<Project>
) {
  // Categories mirror the site's "أعمالي" filter tabs (Figma 820:2810).
  // The "الكل" tab is a client-side view, not a stored category.
  const categories = [
    { name: 'UI/UX', order: 1 },
    { name: 'جرافيك', order: 2 },
    { name: 'هوية بصرية', order: 3 },
    { name: 'تطبيقات', order: 4 },
  ];

  await categoryModel.deleteMany({});
  await projectModel.deleteMany({});

  const seededCats = await categoryModel.insertMany(categories);
  console.log('Project categories seeded!');

  // Map category names to their database documents
  const catMap: Record<string, ProjectCategory> = {};
  seededCats.forEach((cat) => {
    catMap[cat.name] = cat;
  });

  const projects = [
    // UI/UX
    {
      name: 'لوحة تحكم متجر إلكتروني',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description:
        'تصميم لوحة تحكم متكاملة لإدارة المتاجر الإلكترونية، تشمل التحليلات وإدارة الطلبات ورؤى العملاء بواجهة واضحة وسهلة.',
      category: catMap['UI/UX']._id,
    },
    {
      name: 'منصة تحليلات البيانات',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description:
        'منصة تحليلات متقدمة مع عرض بصري للبيانات في الوقت الفعلي وتقارير قابلة للتصدير، صُمّمت لتبسيط القرارات.',
      category: catMap['UI/UX']._id,
    },
    {
      name: 'نظام إدارة المخزون',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
      description:
        'نظام ذكي لإدارة المخزون مع تتبّع تلقائي وتنبيهات فورية، يوازن بين كثافة المعلومات ووضوح الواجهة.',
      category: catMap['UI/UX']._id,
    },

    // جرافيك
    {
      name: 'حملة سوشيال ميديا',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop',
      description:
        'سلسلة تصاميم بصرية لحملة على منصات التواصل الاجتماعي، تجمع بين الوضوح والاتساق مع الهوية البصرية للعلامة.',
      category: catMap['جرافيك']._id,
    },
    {
      name: 'بوسترات إعلانية',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop',
      description:
        'مجموعة بوسترات إعلانية مطبوعة ورقمية بتوجيه فني موحّد، تركّز على التسلسل البصري وإيصال الرسالة بسرعة.',
      category: catMap['جرافيك']._id,
    },

    // هوية بصرية
    {
      name: 'هوية علامة نوفا',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600&h=400&fit=crop',
      description:
        'تصميم هوية بصرية متكاملة تشمل الشعار ولوحة الألوان وأنظمة الخطوط ودليل الاستخدام لضمان اتساق العلامة.',
      category: catMap['هوية بصرية']._id,
    },

    // تطبيقات
    {
      name: 'تطبيق توصيل الطعام',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      description:
        'تصميم تجربة وواجهات تطبيق توصيل طعام، من تصفّح المطاعم حتى تتبّع الطلب، بتركيز على سرعة إتمام المهمة.',
      category: catMap['تطبيقات']._id,
    },
    {
      name: 'تطبيق تتبّع اللياقة',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
      description:
        'تطبيق شامل لتتبّع اللياقة البدنية مع خطط التمارين وتتبّع التغذية وتقارير التقدّم بواجهة محفّزة وبسيطة.',
      category: catMap['تطبيقات']._id,
    },
  ];

  await projectModel.insertMany(projects);
  console.log('Projects seeded successfully!');
}
