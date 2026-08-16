import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { PostsModule } from './posts/posts.module';
import { AuthorSettingsModule } from './author-settings/author-settings.module';

@Module({
  imports: [CategoriesModule, TagsModule, PostsModule, AuthorSettingsModule],
  exports: [CategoriesModule, TagsModule, PostsModule, AuthorSettingsModule],
})
export class BlogModule {}

