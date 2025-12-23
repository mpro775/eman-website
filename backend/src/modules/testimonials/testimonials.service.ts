import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial } from './schemas/testimonial.schema';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { FilterTestimonialDto } from './dto/filter-testimonial.dto';
import { createPaginatedResponse } from '../../common/utils/pagination.util';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name) private testimonialModel: Model<Testimonial>,
  ) {}

  async create(createTestimonialDto: CreateTestimonialDto): Promise<Testimonial> {
    const testimonial = new this.testimonialModel(createTestimonialDto);
    await testimonial.save();
    return testimonial;
  }

  async findAll(filterDto: FilterTestimonialDto) {
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
      query.$or = [
        { personName: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { ratingText: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [data, total] = await Promise.all([
      this.testimonialModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.testimonialModel.countDocuments(query),
    ]);

    return createPaginatedResponse(data, total, page, limit);
  }

  async findOne(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialModel.findById(id).exec();

    if (!testimonial) {
      throw new NotFoundException('رأي العميل غير موجود');
    }

    return testimonial;
  }

  async update(id: string, updateTestimonialDto: UpdateTestimonialDto): Promise<Testimonial> {
    const testimonial = await this.testimonialModel
      .findByIdAndUpdate(id, updateTestimonialDto, { new: true })
      .exec();

    if (!testimonial) {
      throw new NotFoundException('رأي العميل غير موجود');
    }

    return testimonial;
  }

  async remove(id: string): Promise<void> {
    const result = await this.testimonialModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('رأي العميل غير موجود');
    }
  }
}

