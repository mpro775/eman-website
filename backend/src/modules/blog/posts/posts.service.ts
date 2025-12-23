import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder, Types } from 'mongoose';
import { PostBlog, PostStatus } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { createPaginatedResponse } from '../../../common/utils/pagination.util';

@Injectable()
export class PostsService {
  constructor(@InjectModel(PostBlog.name) private postModel: Model<PostBlog>) { }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }

  async create(createPostDto: CreatePostDto, authorId: string): Promise<PostBlog> {
    const slug = this.generateSlug(createPostDto.title);
    const readTime =
      createPostDto.readTime || this.calculateReadTime(createPostDto.content);

    const post = new this.postModel({
      ...createPostDto,
      slug,
      readTime,
      author: authorId,
    });

    return post.save();
  }

  async findAll(filterDto: FilterPostDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'publishDate',
      sortOrder = 'desc',
      category,
      tag,
      status,
    } = filterDto;

    const query: Record<string, unknown> = {};

    // Apply filters
    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    if (status) {
      query.status = status;
    } else {
      // By default, show only published posts for public
      query.status = PostStatus.PUBLISHED;
    }

    // Apply search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, SortOrder> = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [data, total] = await Promise.all([
      this.postModel
        .find(query)
        .populate('category', 'name slug')
        .populate('tags', 'name slug')
        .populate('author', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.postModel.countDocuments(query),
    ]);

    return createPaginatedResponse(data, total, page, limit);
  }

  async getRelatedPosts(
    categoryId: string,
    excludePostId: string,
    limit: number = 5,
  ): Promise<PostBlog[]> {
    if (!categoryId) {
      return [];
    }

    const query: Record<string, unknown> = {
      category: new Types.ObjectId(categoryId),
      _id: { $ne: new Types.ObjectId(excludePostId) },
      status: PostStatus.PUBLISHED,
    };

    return this.postModel
      .find(query)
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .populate('author', 'name email')
      .sort({ publishDate: -1 })
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<PostBlog> {
    const post = await this.postModel
      .findById(id)
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .populate('author', 'name email');

    if (!post) {
      throw new NotFoundException('المقال غير موجود');
    }

    return post;
  }

  async findBySlug(slug: string): Promise<PostBlog> {
    const post = await this.postModel
      .findOne({ slug })
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .populate('author', 'name email');

    if (!post) {
      throw new NotFoundException('المقال غير موجود');
    }

    // Increment views
    post.views += 1;
    await post.save();

    return post;
  }

  async incrementLove(id: string): Promise<PostBlog> {
    const post = await this.postModel.findByIdAndUpdate(
      id,
      { $inc: { loves: 1 } },
      { new: true },
    );

    if (!post) {
      throw new NotFoundException('المقال غير موجود');
    }

    return post;
  }

  async incrementShare(id: string): Promise<PostBlog> {
    const post = await this.postModel.findByIdAndUpdate(
      id,
      { $inc: { shares: 1 } },
      { new: true },
    );

    if (!post) {
      throw new NotFoundException('المقال غير موجود');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostBlog> {
    const updateData: Record<string, unknown> = { ...updatePostDto };

    if (updatePostDto.title) {
      updateData.slug = this.generateSlug(updatePostDto.title);
    }

    if (updatePostDto.content && !updatePostDto.readTime) {
      updateData.readTime = this.calculateReadTime(updatePostDto.content);
    }

    updateData.updatedDate = new Date();

    const post = await this.postModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!post) {
      throw new NotFoundException('المقال غير موجود');
    }

    return post;
  }

  async remove(id: string): Promise<void> {
    const result = await this.postModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('المقال غير موجود');
    }
  }
}
