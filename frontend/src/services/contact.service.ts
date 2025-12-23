import api from './api';
import type { ApiResponse, PaginatedResponse } from '../types/api.types';
import type { ContactMessage, MessageStatus } from '../types/contact.types';

export const contactService = {
  async getMessages(
    page?: number,
    limit?: number,
    status?: MessageStatus
  ): Promise<PaginatedResponse<ContactMessage>> {
    const response = await api.get<ApiResponse<PaginatedResponse<ContactMessage>>>(
      '/contact/messages',
      {
        params: { page, limit, status },
      }
    );
    return response.data.data;
  },

  async getMessageById(id: string): Promise<ContactMessage> {
    const response = await api.get<ApiResponse<ContactMessage>>(`/contact/messages/${id}`);
    return response.data.data;
  },

  async updateStatus(id: string, status: MessageStatus): Promise<ContactMessage> {
    const response = await api.patch<ApiResponse<ContactMessage>>(
      `/contact/messages/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<ApiResponse<null>>(`/contact/messages/${id}`);
  },
};

