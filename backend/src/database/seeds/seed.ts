import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../modules/users/schemas/user.schema';
import { Profile } from '../../modules/profile/schemas/profile.schema';
import { Category } from '../../modules/blog/categories/schemas/category.schema';
import { Tag } from '../../modules/blog/tags/schemas/tag.schema';
import { PostBlog } from '../../modules/blog/posts/schemas/post.schema';
import { Experience } from '../../modules/experiences/schemas/experience.schema';
import { Service } from '../../modules/services/schemas/service.schema';
import { UsedProgram } from '../../modules/used-programs/schemas/used-program.schema';
import { Testimonial } from '../../modules/testimonials/schemas/testimonial.schema';
import { Project } from '../../modules/projects/schemas/project.schema';
import { ProjectCategory } from '../../modules/projects/categories/schemas/project-category.schema';

import { seedUsers } from './user.seed';
import { seedBlogCategories, seedBlogTags, seedBlogPosts } from './blog.seed';
import {
  seedExperiences,
  seedServices,
  seedUsedPrograms,
  seedTestimonials,
  seedProjectsAndCategories,
} from './data.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🌱 Starting database seeding...\n');

    // Get models
    const userModel = app.get(getModelToken(User.name));
    const profileModel = app.get(getModelToken(Profile.name));
    const categoryModel = app.get(getModelToken(Category.name));
    const tagModel = app.get(getModelToken(Tag.name));
    const postModel = app.get(getModelToken(PostBlog.name));
    const experienceModel = app.get(getModelToken(Experience.name));
    const serviceModel = app.get(getModelToken(Service.name));
    const usedProgramModel = app.get(getModelToken(UsedProgram.name));
    const testimonialModel = app.get(getModelToken(Testimonial.name));
    const projectCategoryModel = app.get(getModelToken(ProjectCategory.name));
    const projectModel = app.get(getModelToken(Project.name));

    // Seed users
    await seedUsers(userModel);

    // Seed initial profile
    await profileModel.deleteMany({});
    const profile = new profileModel({
      fullName: 'إيمان جميل',
      title: 'UX/UI Designer',
      bio: 'خبيرة في تصميم واجهات المستخدم وتجربة المستخدم (UI/UX) وتطوير تطبيقات الموبايل. أقدم خدمات التصميم الجرافيكي والتدريب والاستشارات.',
      email: 'info@emanjameel.pro',
      yearsOfExperience: 5,
      socialLinks: [],
      certificates: [],
    });
    await profile.save();
    console.log('✅ Initial profile created');

    // Seed blog categories
    const categories = await seedBlogCategories(categoryModel);

    // Seed blog tags
    const tags = await seedBlogTags(tagModel);

    // Seed blog posts
    await seedBlogPosts(postModel, userModel, categories, tags);

    // Seed experiences
    await seedExperiences(experienceModel);

    // Seed services
    await seedServices(serviceModel);

    // Seed programs used
    await seedUsedPrograms(usedProgramModel);

    // Seed testimonials
    await seedTestimonials(testimonialModel);

    // Seed project categories and projects
    await seedProjectsAndCategories(projectCategoryModel, projectModel);

    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
