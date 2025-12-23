import { IsString, IsNumber, IsOptional, MinLength, Min } from 'class-validator';

export class CreateUsedProgramDto {
  @IsString()
  @MinLength(1, { message: 'الصورة مطلوبة' })
  image: string;

  @IsString()
  @MinLength(2, { message: 'اسم البرنامج يجب أن يكون حرفين على الأقل' })
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'رقم الترتيب يجب أن يكون أكبر من أو يساوي 0' })
  orderNumber?: number;
}

