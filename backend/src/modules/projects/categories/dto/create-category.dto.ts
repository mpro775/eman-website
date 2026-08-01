import { IsString, IsOptional, IsNumber, MinLength, IsArray, IsMongoId } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
  name: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  featuredProjects?: string[];
}

