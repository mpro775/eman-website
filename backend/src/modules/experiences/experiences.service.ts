import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience } from './schemas/experience.schema';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
    constructor(
        @InjectModel(Experience.name) private experienceModel: Model<Experience>,
    ) { }

    async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
        const experience = new this.experienceModel(createExperienceDto);
        return experience.save();
    }

    async findAll(): Promise<Experience[]> {
        return this.experienceModel.find().sort({ order: 1 }).exec();
    }

    async findOne(id: string): Promise<Experience> {
        const experience = await this.experienceModel.findById(id).exec();
        if (!experience) {
            throw new NotFoundException('الخبرة غير موجودة');
        }
        return experience;
    }

    async update(
        id: string,
        updateExperienceDto: UpdateExperienceDto,
    ): Promise<Experience> {
        const experience = await this.experienceModel
            .findByIdAndUpdate(id, updateExperienceDto, { new: true })
            .exec();

        if (!experience) {
            throw new NotFoundException('الخبرة غير موجودة');
        }
        return experience;
    }

    async remove(id: string): Promise<void> {
        const result = await this.experienceModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException('الخبرة غير موجودة');
        }
    }
}
