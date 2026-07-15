export interface Project {
  _id: string;
  name: string;
  image: string;
  description: string;
  /** Always populated by the API, but may be a bare id before population. */
  category: string | { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCategory {
  _id: string;
  name: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectCategoryDto {
  name: string;
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
  page?: number | undefined;
  limit?: number | undefined;
  category?: string | undefined;
  search?: string | undefined;
}

