import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import {
  AnalyticsEvent,
  AnalyticsEventSchema,
} from './schemas/analytics-event.schema';
import { Project, ProjectSchema } from '../projects/schemas/project.schema';
import {
  ProjectCategory,
  ProjectCategorySchema,
} from '../projects/categories/schemas/project-category.schema';
import { PostBlog, PostSchema } from '../blog/posts/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnalyticsEvent.name, schema: AnalyticsEventSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: ProjectCategory.name, schema: ProjectCategorySchema },
      { name: PostBlog.name, schema: PostSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
