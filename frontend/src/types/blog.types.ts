export const PostStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export type PostStatus = typeof PostStatus[keyof typeof PostStatus];

export interface Post {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage?: string;
  category?: string | { _id: string; name: string };
  tags?: string[] | Array<{ _id: string; name: string }>;
  publishDate?: string;
  status: PostStatus;
  readTime?: number;
  loves: number;
  shares: number;
  views: number;
  seo?: {
    metaTitle: string;
    metaDescription: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogTag {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDto {
  title: string;
  summary: string;
  content: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  publishDate?: string;
  status?: PostStatus;
  readTime?: number;
  seo?: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface UpdatePostDto extends Partial<CreatePostDto> { }

export interface FilterPostDto {
  page?: number;
  limit?: number;
  category?: string;
  status?: PostStatus;
  search?: string;
}

