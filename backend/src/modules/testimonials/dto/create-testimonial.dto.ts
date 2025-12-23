import { IsString, IsNumber, MinLength, Min } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  @MinLength(1, { message: 'الصورة مطلوبة' })
  image: string;

  @IsString()
  @MinLength(2, { message: 'اسم الشخص يجب أن يكون حرفين على الأقل' })
  personName: string;

  @IsString()
  @MinLength(2, { message: 'اسم الشركة يجب أن يكون حرفين على الأقل' })
  companyName: string;

  @IsString()
  @MinLength(10, { message: 'نص التقييم يجب أن يكون 10 أحرف على الأقل' })
  ratingText: string;

  @IsNumber()
  @Min(0, { message: 'رقم الترتيب يجب أن يكون أكبر من أو يساوي 0' })
  orderNumber: number;
}

