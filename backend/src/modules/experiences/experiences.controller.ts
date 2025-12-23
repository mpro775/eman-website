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
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('experiences')
export class ExperiencesController {
    constructor(private readonly experiencesService: ExperiencesService) { }

    @Public()
    @Get()
    async findAll() {
        const experiences = await this.experiencesService.findAll();
        return {
            message: 'تم جلب الخبرات بنجاح',
            data: experiences,
        };
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const experience = await this.experiencesService.findOne(id);
        return {
            message: 'تم جلب الخبرة بنجاح',
            data: experience,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createExperienceDto: CreateExperienceDto) {
        const experience = await this.experiencesService.create(createExperienceDto);
        return {
            message: 'تم إنشاء الخبرة بنجاح',
            data: experience,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateExperienceDto: UpdateExperienceDto,
    ) {
        const experience = await this.experiencesService.update(id, updateExperienceDto);
        return {
            message: 'تم تحديث الخبرة بنجاح',
            data: experience,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.experiencesService.remove(id);
        return {
            message: 'تم حذف الخبرة بنجاح',
            data: null,
        };
    }
}
