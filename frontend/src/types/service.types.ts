export interface Service {
  _id: string;
  name: string;
  description: string;
  icon?: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceDto {
  name: string;
  description: string;
  icon?: string;
  order?: number;
  isPublished?: boolean;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {}

