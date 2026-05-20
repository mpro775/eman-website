export interface Project {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string | { _id: string; name: string };
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  descriptionAr?: string;
  tools?: string[];
  projectLink?: string;
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
  page?: number | undefined;
  limit?: number | undefined;
  category?: string | undefined;
  search?: string | undefined;
}

