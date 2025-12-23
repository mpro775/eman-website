import api from './api';
import type { ApiResponse, PaginatedResponse } from '../types/api.types';
import type {
  Post,
  BlogCategory,
  BlogTag,
  CreatePostDto,
  UpdatePostDto,
  FilterPostDto,
} from '../types/blog.types';

export const blogService = {
  // Posts
  async getPosts(filters?: FilterPostDto): Promise<PaginatedResponse<Post>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Post>>>('/blog/posts', {
      params: filters,
    });
    return response.data.data;
  },

  async getPostById(id: string): Promise<Post> {
    const response = await api.get<ApiResponse<Post>>(`/blog/posts/${id}`);
    return response.data.data;
  },

  async createPost(data: CreatePostDto): Promise<Post> {
    const response = await api.post<ApiResponse<Post>>('/blog/posts', data);
    return response.data.data;
  },

  async updatePost(id: string, data: UpdatePostDto): Promise<Post> {
    const response = await api.put<ApiResponse<Post>>(`/blog/posts/${id}`, data);
    return response.data.data;
  },

  async deletePost(id: string): Promise<void> {
    await api.delete<ApiResponse<null>>(`/blog/posts/${id}`);
  },

  // Categories
  async getCategories(): Promise<BlogCategory[]> {
    const response = await api.get<ApiResponse<BlogCategory[]>>('/blog/categories');
    return response.data.data;
  },

  async createCategory(name: string, description?: string): Promise<BlogCategory> {
    const response = await api.post<ApiResponse<BlogCategory>>('/blog/categories', {
      name,
      description,
    });
    return response.data.data;
  },

  async updateCategory(id: string, name: string, description?: string): Promise<BlogCategory> {
    const response = await api.put<ApiResponse<BlogCategory>>(`/blog/categories/${id}`, {
      name,
      description,
    });
    return response.data.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete<ApiResponse<null>>(`/blog/categories/${id}`);
  },

  // Tags
  async getTags(): Promise<BlogTag[]> {
    const response = await api.get<ApiResponse<BlogTag[]>>('/blog/tags');
    return response.data.data;
  },

  async createTag(name: string): Promise<BlogTag> {
    const response = await api.post<ApiResponse<BlogTag>>('/blog/tags', { name });
    return response.data.data;
  },

  async updateTag(id: string, name: string): Promise<BlogTag> {
    const response = await api.put<ApiResponse<BlogTag>>(`/blog/tags/${id}`, { name });
    return response.data.data;
  },

  async deleteTag(id: string): Promise<void> {
    await api.delete<ApiResponse<null>>(`/blog/tags/${id}`);
  },
};

