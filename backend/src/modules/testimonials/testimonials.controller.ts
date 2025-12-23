import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { FilterTestimonialDto } from './dto/filter-testimonial.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) { }

  @Public()
  @Get()
  async findAll(@Query() filterDto: FilterTestimonialDto) {
    const result = await this.testimonialsService.findAll(filterDto);
    return {
      message: 'تم جلب آراء العملاء بنجاح',
      data: result,
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const testimonial = await this.testimonialsService.findOne(id);
    return {
      message: 'تم جلب رأي العميل بنجاح',
      data: testimonial,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTestimonialDto: CreateTestimonialDto) {
    const testimonial = await this.testimonialsService.create(createTestimonialDto);
    return {
      message: 'تم إنشاء رأي العميل بنجاح',
      data: testimonial,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    const testimonial = await this.testimonialsService.update(id, updateTestimonialDto);
    return {
      message: 'تم تحديث رأي العميل بنجاح',
      data: testimonial,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.testimonialsService.remove(id);
    return {
      message: 'تم حذف رأي العميل بنجاح',
      data: null,
    };
  }
}

