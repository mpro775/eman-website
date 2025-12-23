import api from './api';
import type { ApiResponse, PaginatedResponse } from '../types/api.types';
import type {
  Project,
  ProjectCategory,
  CreateProjectDto,
  UpdateProjectDto,
  FilterProjectDto,
  CreateProjectCategoryDto,
  UpdateProjectCategoryDto,
} from '../types/project.types';

export const projectsService = {
  async getAll(filters?: FilterProjectDto): Promise<PaginatedResponse<Project>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Project>>>('/projects', {
      params: filters,
    });
    return response.data.data;
  },

  async getById(id: string): Promise<Project> {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data;
  },

  async create(data: CreateProjectDto): Promise<Project> {
    const response = await api.post<ApiResponse<Project>>('/projects', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateProjectDto): Promise<Project> {
    const response = await api.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<ApiResponse<null>>(`/projects/${id}`);
  },

  // Categories
  async getCategories(): Promise<ProjectCategory[]> {
    const response = await api.get<ApiResponse<ProjectCategory[]>>('/projects/categories');
    return response.data.data;
  },

  async getCategoryById(id: string): Promise<ProjectCategory> {
    const response = await api.get<ApiResponse<ProjectCategory>>(`/projects/categories/${id}`);
    return response.data.data;
  },

  async createCategory(data: CreateProjectCategoryDto): Promise<ProjectCategory> {
    const response = await api.post<ApiResponse<ProjectCategory>>('/projects/categories', data);
    return response.data.data;
  },

  async updateCategory(id: string, data: UpdateProjectCategoryDto): Promise<ProjectCategory> {
    const response = await api.put<ApiResponse<ProjectCategory>>(`/projects/categories/${id}`, data);
    return response.data.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete<ApiResponse<null>>(`/projects/categories/${id}`);
  },
};

