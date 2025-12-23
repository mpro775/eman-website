import api from './api';
import type { ApiResponse } from '../types/api.types';
import type { Service, CreateServiceDto, UpdateServiceDto } from '../types/service.types';

export const servicesService = {
  async getAll(): Promise<Service[]> {
    const response = await api.get<ApiResponse<Service[]>>('/services');
    return response.data.data;
  },

  async getById(id: string): Promise<Service> {
    const response = await api.get<ApiResponse<Service>>(`/services/${id}`);
    return response.data.data;
  },

  async create(data: CreateServiceDto): Promise<Service> {
    const response = await api.post<ApiResponse<Service>>('/services', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateServiceDto): Promise<Service> {
    const response = await api.put<ApiResponse<Service>>(`/services/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<ApiResponse<null>>(`/services/${id}`);
  },
};

