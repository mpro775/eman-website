export const SubscriberStatus = {
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
} as const;

export type SubscriberStatus = typeof SubscriberStatus[keyof typeof SubscriberStatus];

export interface NewsletterSubscriber {
  _id: string;
  email: string;
  status: SubscriberStatus;
  unsubscribedAt?: string;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterSubscribersDto {
  page?: number;
  limit?: number;
  status?: SubscriberStatus;
  search?: string;
}

