import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder, Types } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilterProjectDto } from './dto/filter-project.dto';
import { createPaginatedResponse } from '../../common/utils/pagination.util';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel(createProjectDto);
    await project.save();
    const savedProject = await this.projectModel
      .findById(project._id)
      .populate('category')
      .exec();

    if (!savedProject) {
      throw new NotFoundException('فشل في إنشاء المشروع');
    }

    return savedProject;
  }

  async findAll(filterDto: FilterProjectDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category,
    } = filterDto;

    const query: Record<string, unknown> = {};

    // Apply filters
    if (category) {
      query.category = new Types.ObjectId(category);
    }

    // Apply search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, SortOrder> = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [data, total] = await Promise.all([
      this.projectModel
        .find(query)
        .populate('category')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.projectModel.countDocuments(query),
    ]);

    return createPaginatedResponse(data, total, page, limit);
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel
      .findById(id)
      .populate('category')
      .exec();

    if (!project) {
      throw new NotFoundException('المشروع غير موجود');
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .populate('category')
      .exec();

    if (!project) {
      throw new NotFoundException('المشروع غير موجود');
    }

    return project;
  }

  async remove(id: string): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('المشروع غير موجود');
    }
  }
}
