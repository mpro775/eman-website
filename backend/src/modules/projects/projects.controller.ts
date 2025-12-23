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
import { ProjectsService } from './projects.service';
import { CategoriesService } from './categories/categories.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilterProjectDto } from './dto/filter-project.dto';
import { CreateCategoryDto } from './categories/dto/create-category.dto';
import { UpdateCategoryDto } from './categories/dto/update-category.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly categoriesService: CategoriesService,
  ) { }

  // Categories
  @Public()
  @Get('categories')
  async findAllCategories() {
    const categories = await this.categoriesService.findAll();
    return {
      message: 'تم جلب الفئات بنجاح',
      data: categories,
    };
  }

  @Public()
  @Get('categories/:id')
  async findOneCategory(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(id);
    return {
      message: 'تم جلب الفئة بنجاح',
      data: category,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('categories')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.create(createCategoryDto);
    return {
      message: 'تم إنشاء الفئة بنجاح',
      data: category,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('categories/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.update(id, updateCategoryDto);
    return {
      message: 'تم تحديث الفئة بنجاح',
      data: category,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('categories/:id')
  async removeCategory(@Param('id') id: string) {
    await this.categoriesService.remove(id);
    return {
      message: 'تم حذف الفئة بنجاح',
      data: null,
    };
  }

  // Projects

  @Public()
  @Get()
  async findAll(@Query() filterDto: FilterProjectDto) {
    const result = await this.projectsService.findAll(filterDto);
    return {
      message: 'تم جلب المشاريع بنجاح',
      data: result,
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.projectsService.findOne(id);
    return {
      message: 'تم جلب المشروع بنجاح',
      data: project,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectsService.create(createProjectDto);
    return {
      message: 'تم إنشاء المشروع بنجاح',
      data: project,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectsService.update(id, updateProjectDto);
    return {
      message: 'تم تحديث المشروع بنجاح',
      data: project,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.projectsService.remove(id);
    return {
      message: 'تم حذف المشروع بنجاح',
      data: null,
    };
  }
}

