import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Public()
  @Get()
  async findAll() {
    const services = await this.servicesService.findAll();
    return {
      message: 'تم جلب الخدمات بنجاح',
      data: services,
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = await this.servicesService.findOne(id);
    return {
      message: 'تم جلب الخدمة بنجاح',
      data: service,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const service = await this.servicesService.create(createServiceDto);
    return {
      message: 'تم إنشاء الخدمة بنجاح',
      data: service,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const service = await this.servicesService.update(id, updateServiceDto);
    return {
      message: 'تم تحديث الخدمة بنجاح',
      data: service,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.servicesService.remove(id);
    return {
      message: 'تم حذف الخدمة بنجاح',
      data: null,
    };
  }
}

