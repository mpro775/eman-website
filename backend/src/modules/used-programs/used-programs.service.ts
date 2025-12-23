import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsedProgram } from './schemas/used-program.schema';
import { CreateUsedProgramDto } from './dto/create-used-program.dto';
import { UpdateUsedProgramDto } from './dto/update-used-program.dto';
import { FilterUsedProgramDto } from './dto/filter-used-program.dto';
import { createPaginatedResponse } from '../../common/utils/pagination.util';

@Injectable()
export class UsedProgramsService {
  constructor(
    @InjectModel(UsedProgram.name) private usedProgramModel: Model<UsedProgram>,
  ) {}

  async create(createUsedProgramDto: CreateUsedProgramDto): Promise<UsedProgram> {
    const usedProgram = new this.usedProgramModel(createUsedProgramDto);
    await usedProgram.save();
    return usedProgram;
  }

  async findAll(filterDto: FilterUsedProgramDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'orderNumber',
      sortOrder = 'asc',
    } = filterDto;

    const query: any = {};

    // Apply search
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [data, total] = await Promise.all([
      this.usedProgramModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.usedProgramModel.countDocuments(query),
    ]);

    return createPaginatedResponse(data, total, page, limit);
  }

  async findOne(id: string): Promise<UsedProgram> {
    const usedProgram = await this.usedProgramModel.findById(id).exec();

    if (!usedProgram) {
      throw new NotFoundException('البرنامج غير موجود');
    }

    return usedProgram;
  }

  async update(id: string, updateUsedProgramDto: UpdateUsedProgramDto): Promise<UsedProgram> {
    const usedProgram = await this.usedProgramModel
      .findByIdAndUpdate(id, updateUsedProgramDto, { new: true })
      .exec();

    if (!usedProgram) {
      throw new NotFoundException('البرنامج غير موجود');
    }

    return usedProgram;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usedProgramModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('البرنامج غير موجود');
    }
  }
}

