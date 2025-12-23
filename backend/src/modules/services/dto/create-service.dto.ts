import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل' })
  name: string;

  @IsString()
  @MinLength(10, { message: 'الوصف يجب أن يكون 10 أحرف على الأقل' })
  description: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
