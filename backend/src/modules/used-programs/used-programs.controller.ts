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
import { UsedProgramsService } from './used-programs.service';
import { CreateUsedProgramDto } from './dto/create-used-program.dto';
import { UpdateUsedProgramDto } from './dto/update-used-program.dto';
import { FilterUsedProgramDto } from './dto/filter-used-program.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('used-programs')
export class UsedProgramsController {
  constructor(private readonly usedProgramsService: UsedProgramsService) { }

  @Public()
  @Get()
  async findAll(@Query() filterDto: FilterUsedProgramDto) {
    const result = await this.usedProgramsService.findAll(filterDto);
    return {
      message: 'تم جلب البرامج المستخدمة بنجاح',
      data: result,
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const usedProgram = await this.usedProgramsService.findOne(id);
    return {
      message: 'تم جلب البرنامج بنجاح',
      data: usedProgram,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUsedProgramDto: CreateUsedProgramDto) {
    const usedProgram = await this.usedProgramsService.create(createUsedProgramDto);
    return {
      message: 'تم إنشاء البرنامج بنجاح',
      data: usedProgram,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsedProgramDto: UpdateUsedProgramDto,
  ) {
    const usedProgram = await this.usedProgramsService.update(id, updateUsedProgramDto);
    return {
      message: 'تم تحديث البرنامج بنجاح',
      data: usedProgram,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usedProgramsService.remove(id);
    return {
      message: 'تم حذف البرنامج بنجاح',
      data: null,
    };
  }
}

