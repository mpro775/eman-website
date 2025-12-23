import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../modules/users/schemas/user.schema';
import { Profile } from '../../modules/profile/schemas/profile.schema';
import { Category } from '../../modules/blog/categories/schemas/category.schema';
import { Tag } from '../../modules/blog/tags/schemas/tag.schema';
import { PostBlog } from '../../modules/blog/posts/schemas/post.schema';
import { seedUsers } from './user.seed';
import { seedBlogCategories, seedBlogTags, seedBlogPosts } from './blog.seed';

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

    // Seed users
    await seedUsers(userModel);

    // Seed initial profile (optional)
    const existingProfile = await profileModel.findOne();
    if (!existingProfile) {
      const profile = new profileModel({
        fullName: 'إيمان',
        title: 'مطورة برمجيات Full Stack',
        bio: 'مطورة برمجيات متخصصة في تطوير تطبيقات الويب باستخدام تقنيات حديثة',
        email: 'contact@eman.com',
        yearsOfExperience: 3,
        socialLinks: [],
        certificates: [],
      });
      await profile.save();
      console.log('✅ Initial profile created');
    }

    // Seed blog categories
    const categories = await seedBlogCategories(categoryModel);

    // Seed blog tags
    const tags = await seedBlogTags(tagModel);

    // Seed blog posts
    await seedBlogPosts(postModel, userModel, categories, tags);

    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
