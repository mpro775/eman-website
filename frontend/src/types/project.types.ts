export interface Project {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string | { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCategory {
  _id: string;
  name: string;
  image: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectCategoryDto {
  name: string;
  image: string;
  order?: number;
}

export interface UpdateProjectCategoryDto extends Partial<CreateProjectCategoryDto> { }

export interface CreateProjectDto {
  name: string;
  image: string;
  description: string;
  category: string;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> { }

export interface FilterProjectDto {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

