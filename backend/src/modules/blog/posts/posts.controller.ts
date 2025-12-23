import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Post,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PostBlog } from './schemas/post.schema';
import { Category } from '../categories/schemas/category.schema';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
    name: string;
  };
}

// Helper function to extract category ID from populated or unpopulated category
function extractCategoryId(
  category:
    | Types.ObjectId
    | (Category & { _id: Types.ObjectId })
    | null
    | undefined,
): string | null {
  if (!category) {
    return null;
  }
  // Check if it's a populated category (has _id property and is an object)
  if (typeof category === 'object' && '_id' in category && category._id) {
    return category._id.toString();
  }
  // Otherwise it's an ObjectId
  if (category instanceof Types.ObjectId) {
    return category.toString();
  }
  return null;
}

@Controller('blog/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Public()
  @Get()
  async findAll(@Query() filterDto: FilterPostDto) {
    const result = await this.postsService.findAll(filterDto);
    return {
      message: 'تم جلب المقالات بنجاح',
      data: result,
    };
  }

  @Public()
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const post = await this.postsService.findBySlug(slug);
    const categoryId = extractCategoryId(post.category as any);
    const relatedPosts = await this.postsService.getRelatedPosts(
      categoryId || '',
      post._id.toString(),
      5,
    );

    const postObject = post.toObject() as Record<string, unknown>;

    return {
      message: 'تم جلب المقال بنجاح',
      data: {
        ...postObject,
        relatedPosts,
      },
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    const categoryId = extractCategoryId(post.category as any);
    const relatedPosts = await this.postsService.getRelatedPosts(
      categoryId || '',
      post._id.toString(),
      5,
    );

    const postObject = post.toObject() as Record<string, unknown>;

    return {
      message: 'تم جلب المقال بنجاح',
      data: {
        ...postObject,
        relatedPosts,
      },
    };
  }

  @Public()
  @Post(':id/love')
  async incrementLove(@Param('id') id: string) {
    const post = await this.postsService.incrementLove(id);
    return {
      message: 'تم إضافة قلب بنجاح',
      data: {
        loves: post.loves,
      },
    };
  }

  @Public()
  @Post(':id/share')
  async incrementShare(@Param('id') id: string) {
    const post = await this.postsService.incrementShare(id);
    return {
      message: 'تم تسجيل المشاركة بنجاح',
      data: {
        shares: post.shares,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createPostDto: CreatePostDto,
  ) {
    const post = await this.postsService.create(createPostDto, req.user.userId);
    return {
      message: 'تم إنشاء المقال بنجاح',
      data: post,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postsService.update(id, updatePostDto);
    return {
      message: 'تم تحديث المقال بنجاح',
      data: post,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
    return {
      message: 'تم حذف المقال بنجاح',
      data: null,
    };
  }
}
