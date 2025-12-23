import api from './api';
import type { ApiResponse, PaginatedResponse } from '../types/api.types';
import type {
  UsedProgram,
  CreateUsedProgramDto,
  UpdateUsedProgramDto,
} from '../types/program.types';

export const programsService = {
  async getAll(page?: number, limit?: number): Promise<PaginatedResponse<UsedProgram>> {
    const response = await api.get<ApiResponse<PaginatedResponse<UsedProgram>>>(
      '/used-programs',
      {
        params: { page, limit },
      }
    );
    return response.data.data;
  },

  async getById(id: string): Promise<UsedProgram> {
    const response = await api.get<ApiResponse<UsedProgram>>(`/used-programs/${id}`);
    return response.data.data;
  },

  async create(data: CreateUsedProgramDto): Promise<UsedProgram> {
    const response = await api.post<ApiResponse<UsedProgram>>('/used-programs', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateUsedProgramDto): Promise<UsedProgram> {
    const response = await api.put<ApiResponse<UsedProgram>>(`/used-programs/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<ApiResponse<null>>(`/used-programs/${id}`);
  },
};

