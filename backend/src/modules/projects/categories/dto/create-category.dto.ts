import { IsString, IsOptional, IsNumber, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
  name: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}

