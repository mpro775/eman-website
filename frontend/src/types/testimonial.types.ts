export interface Testimonial {
  _id: string;
  image: string;
  personName: string;
  companyName: string;
  ratingText: string;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialDto {
  image: string;
  personName: string;
  companyName: string;
  ratingText: string;
  orderNumber?: number;
}

export interface UpdateTestimonialDto extends Partial<CreateTestimonialDto> {}

