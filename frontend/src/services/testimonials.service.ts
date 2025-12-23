import api from './api';
import type { ApiResponse, PaginatedResponse } from '../types/api.types';
import type {
  Testimonial,
  CreateTestimonialDto,
  UpdateTestimonialDto,
} from '../types/testimonial.types';

export const testimonialsService = {
  async getAll(page?: number, limit?: number): Promise<PaginatedResponse<Testimonial>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Testimonial>>>('/testimonials', {
      params: { page, limit },
    });
    return response.data.data;
  },

  async getById(id: string): Promise<Testimonial> {
    const response = await api.get<ApiResponse<Testimonial>>(`/testimonials/${id}`);
    return response.data.data;
  },

  async create(data: CreateTestimonialDto): Promise<Testimonial> {
    const response = await api.post<ApiResponse<Testimonial>>('/testimonials', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateTestimonialDto): Promise<Testimonial> {
    const response = await api.put<ApiResponse<Testimonial>>(`/testimonials/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<ApiResponse<null>>(`/testimonials/${id}`);
  },
};

