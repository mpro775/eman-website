import { IsString, IsNumber, MinLength, Min, IsOptional, IsIn } from 'class-validator';

export class CreateTestimonialDto {
  @IsOptional()
  @IsIn(['text', 'image'], { message: 'نوع التقييم غير صالح' })
  type?: string;

  @IsOptional()
  @IsString()
  reviewImage?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @MinLength(2, { message: 'اسم الشخص يجب أن يكون حرفين على الأقل' })
  personName: string;

  @IsString()
  @MinLength(2, { message: 'اسم الشركة يجب أن يكون حرفين على الأقل' })
  companyName: string;

  @IsOptional()
  @IsString()
  ratingText?: string;

  @IsNumber()
  @Min(0, { message: 'رقم الترتيب يجب أن يكون أكبر من أو يساوي 0' })
  orderNumber: number;
}
