import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './categories.service';
import { ProjectCategory, ProjectCategorySchema } from './schemas/project-category.schema';
import { Project, ProjectSchema } from '../schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectCategory.name, schema: ProjectCategorySchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule { }

