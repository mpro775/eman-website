import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectCategory } from './schemas/project-category.schema';
import { Project } from '../schemas/project.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(ProjectCategory.name) private categoryModel: Model<ProjectCategory>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ProjectCategory> {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findAll(): Promise<ProjectCategory[]> {
    return this.categoryModel.find().sort({ order: 1, createdAt: -1 });
  }

  async findOne(id: string): Promise<ProjectCategory> {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('الفئة غير موجودة');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<ProjectCategory> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );

    if (!category) {
      throw new NotFoundException('الفئة غير موجودة');
    }

    return category;
  }

  async remove(id: string): Promise<void> {
    // Refuse to orphan projects: a project's `category` is required and every read
    // populates it, so deleting a referenced category would break the works section.
    const query: Record<string, unknown> = { category: new Types.ObjectId(id) };
    const linkedProjects = await this.projectModel.countDocuments(query);

    if (linkedProjects > 0) {
      throw new BadRequestException(
        `لا يمكن حذف الفئة لأنها مرتبطة بـ ${linkedProjects} من الأعمال. انقل هذه الأعمال إلى فئة أخرى أو احذفها أولاً.`,
      );
    }

    const result = await this.categoryModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('الفئة غير موجودة');
    }
  }
}

