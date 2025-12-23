export enum MessageStatus {
  NEW = 'new',
  READ = 'read',
  REPLIED = 'replied',
  ARCHIVED = 'archived',
}

export interface ContactMessage {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  selectedService?: string | { _id: string; name: string };
  budget?: number;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateStatusDto {
  status: MessageStatus;
}

