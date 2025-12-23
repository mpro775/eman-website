import api from './api';
import type { ApiResponse } from '../types/api.types';
import type {
    Experience,
    CreateExperienceDto,
    UpdateExperienceDto,
} from '../types/experience.types';

export const experiencesService = {
    async getAll(): Promise<Experience[]> {
        const response = await api.get<ApiResponse<Experience[]>>('/experiences');
        return response.data.data;
    },

    async getById(id: string): Promise<Experience> {
        const response = await api.get<ApiResponse<Experience>>(`/experiences/${id}`);
        return response.data.data;
    },

    async create(data: CreateExperienceDto): Promise<Experience> {
        const response = await api.post<ApiResponse<Experience>>('/experiences', data);
        return response.data.data;
    },

    async update(id: string, data: UpdateExperienceDto): Promise<Experience> {
        const response = await api.put<ApiResponse<Experience>>(`/experiences/${id}`, data);
        return response.data.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete<ApiResponse<null>>(`/experiences/${id}`);
    },
};
