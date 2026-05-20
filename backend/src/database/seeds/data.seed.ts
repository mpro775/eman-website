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
  const categories = [
    {
      name: 'UX / UI',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      order: 1,
    },
    {
      name: 'Mobile App',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      order: 2,
    },
    {
      name: 'Graphic Design',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop',
      order: 3,
    },
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
    // UX / UI Projects
    {
      name: 'Kleim',
      titleAr: 'كليـــم',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description:
        'A comprehensive e-commerce dashboard solution for managing online stores, featuring intuitive analytics, order management, and customer insights. Built with modern design principles to ensure a seamless user experience.',
      descriptionAr:
        'لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر ر',
      category: catMap['UX / UI']._id,
      subtitle: 'E-commerce Dashboard Management',
      subtitleAr: 'لإدارة المتاجر الإلكترونية',
      tools: ['Figma', 'Adobe XD', 'Photoshop'],
      projectLink: '#',
    },
    {
      name: 'Kleim',
      titleAr: 'كليـــم',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description:
        'Advanced analytics platform with real-time data visualization and reporting capabilities.',
      descriptionAr:
        'لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر',
      category: catMap['UX / UI']._id,
      subtitle: 'Analytics Platform',
      subtitleAr: 'لإدارة المتاجر الإلكترونية',
      tools: ['Figma', 'Sketch'],
      projectLink: '#',
    },
    {
      name: 'Kleim',
      titleAr: 'كليـــم',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
      description: 'Smart inventory management system with automated tracking and alerts.',
      descriptionAr:
        'لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر',
      category: catMap['UX / UI']._id,
      subtitle: 'Inventory System',
      subtitleAr: 'لإدارة المتاجر الإلكترونية',
      tools: ['Figma', 'Adobe XD'],
      projectLink: '#',
    },
    {
      name: 'Kleim',
      titleAr: 'كليـــم',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description: 'Customer-facing portal for order tracking and account management.',
      descriptionAr:
        'لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر',
      category: catMap['UX / UI']._id,
      subtitle: 'Customer Portal',
      subtitleAr: 'لإدارة المتاجر الإلكترونية',
      tools: ['Figma'],
      projectLink: '#',
    },
    {
      name: 'Kleim',
      titleAr: 'كليـــم',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description: 'Mobile-responsive dashboard for on-the-go store management.',
      descriptionAr:
        'لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر',
      category: catMap['UX / UI']._id,
      subtitle: 'Mobile Dashboard',
      subtitleAr: 'لإدارة المتاجر الإلكترونية',
      tools: ['Figma', 'Illustrator'],
      projectLink: '#',
    },
    {
      name: 'Kleim',
      titleAr: 'كليـــم',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
      description: 'Comprehensive reporting module with export capabilities.',
      descriptionAr:
        'لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر',
      category: catMap['UX / UI']._id,
      subtitle: 'Reports Module',
      subtitleAr: 'لإدارة المتاجر الإلكترونية',
      tools: ['Figma', 'Adobe XD'],
      projectLink: '#',
    },
    {
      name: 'Kleim',
      titleAr: 'كليـــم',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description: 'User settings and preferences panel.',
      descriptionAr:
        'لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر',
      category: catMap['UX / UI']._id,
      subtitle: 'Settings Panel',
      subtitleAr: 'لإدارة المتاجر الإلكترونية',
      tools: ['Figma'],
      projectLink: '#',
    },
    {
      name: 'Kleim',
      titleAr: 'كليـــم',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description: 'Centralized notifications management system.',
      descriptionAr:
        'لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر',
      category: catMap['UX / UI']._id,
      subtitle: 'Notifications Center',
      subtitleAr: 'لإدارة المتاجر الإلكترونية',
      tools: ['Figma', 'Sketch'],
      projectLink: '#',
    },
    {
      name: 'Kleim',
      titleAr: 'كليـــم',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
      description: 'Help and documentation center.',
      descriptionAr:
        'لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر لوحة تحكم لإدارة المتاجر',
      category: catMap['UX / UI']._id,
      subtitle: 'Help Center',
      subtitleAr: 'لإدارة المتاجر الإلكترونية',
      tools: ['Figma', 'Adobe XD'],
      projectLink: '#',
    },

    // Mobile App Projects
    {
      name: 'FitTrack',
      titleAr: 'فيت تراك',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      description: 'A comprehensive fitness tracking application.',
      descriptionAr: 'تطبيق شامل لتتبع اللياقة البدنية مع خطط التمارين وتتبع التغذية',
      category: catMap['Mobile App']._id,
      subtitle: 'Fitness App',
      subtitleAr: 'تطبيق اللياقة البدنية',
      tools: ['Figma', 'Illustrator'],
      projectLink: '#',
    },

    // Graphic Design Projects
    {
      name: 'Nova',
      titleAr: 'نوفا',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop',
      description: 'Complete brand identity design.',
      descriptionAr: 'تصميم هوية العلامة التجارية الكاملة بما في ذلك الشعار ولوحة الألوان',
      category: catMap['Graphic Design']._id,
      subtitle: 'Brand Identity',
      subtitleAr: 'الهوية البصرية',
      tools: ['Illustrator', 'Photoshop'],
      projectLink: '#',
    },
  ];

  await projectModel.insertMany(projects);
  console.log('Projects seeded successfully!');
}
