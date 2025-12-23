import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectCategory } from './schemas/project-category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(ProjectCategory.name) private categoryModel: Model<ProjectCategory>,
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
    const result = await this.categoryModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('الفئة غير موجودة');
    }
  }
}

