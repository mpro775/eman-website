export enum SubscriberStatus {
  SUBSCRIBED = 'subscribed',
  UNSUBSCRIBED = 'unsubscribed',
}

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

