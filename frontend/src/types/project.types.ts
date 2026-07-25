/** One `[icon] label … value` row of the project detail table. */
export interface ProjectDetailRow {
  /** Key into the shared icon registry — see `utils/detailIcons.ts`. */
  icon: string;
  label: string;
  value: string;
}

export interface Project {
  _id: string;
  name: string;
  image: string;
  description: string;
  /** Always populated by the API, but may be a bare id before population. */
  category: string | { _id: string; name: string };
  /* The detail-page fields are optional so documents created before they
     existed (or a cached response) still type-check; every read site guards. */
  /** Detail-page gallery. `image` is the card cover and is not part of it. */
  gallery?: string[];
  tags?: string[];
  details?: ProjectDetailRow[];
  projectLink?: string;
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
  gallery?: string[];
  tags?: string[];
  details?: ProjectDetailRow[];
  projectLink?: string;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> { }

export interface FilterProjectDto {
  page?: number | undefined;
  limit?: number | undefined;
  category?: string | undefined;
  search?: string | undefined;
  /** Accepted by the API via PaginationDto; pin it so list order is stable. */
  sortBy?: string | undefined;
  sortOrder?: 'asc' | 'desc' | undefined;
}

