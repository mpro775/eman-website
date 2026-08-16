export interface Testimonial {
  _id: string;
  type?: 'text' | 'image';
  reviewImage?: string;
  image: string;
  personName: string;
  companyName: string;
  ratingText?: string;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialDto {
  type?: 'text' | 'image';
  reviewImage?: string;
  image: string;
  personName: string;
  companyName: string;
  ratingText?: string;
  orderNumber?: number;
}

export interface UpdateTestimonialDto extends Partial<CreateTestimonialDto> {}


