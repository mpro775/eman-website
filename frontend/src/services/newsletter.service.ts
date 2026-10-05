import api from './api';
import type { ApiResponse, PaginatedResponse } from '../types/api.types';
import type {
  NewsletterSubscriber,
  FilterSubscribersDto,
} from '../types/newsletter.types';
import { trackAnalyticsEvent } from './analytics.service';

export const newsletterService = {
  async subscribe(email: string): Promise<void> {
    await api.post('/newsletter/subscribe', { email });
    trackAnalyticsEvent('newsletter_subscribe');
  },

  async getSubscribers(
    filters?: FilterSubscribersDto
  ): Promise<PaginatedResponse<NewsletterSubscriber>> {
    const response = await api.get<ApiResponse<PaginatedResponse<NewsletterSubscriber>>>(
      '/newsletter/subscribers',
      {
        params: filters,
      }
    );
    return response.data.data;
  },

  async unsubscribe(id: string): Promise<void> {
    await api.post<ApiResponse<null>>(`/newsletter/unsubscribe`, { subscriberId: id });
  },
};

