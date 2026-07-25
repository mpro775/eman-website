import {
  IsString,
  IsMongoId,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * One row of the project detail table. Exactly three properties — `whitelist`
 * applies to nested DTOs too, so anything extra (an `_id` echoed back by the
 * admin form) fails the whole request.
 */
export class ProjectDetailDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  icon?: string;

  @IsString()
  @MinLength(1, { message: 'عنوان الصف مطلوب' })
  @MaxLength(120)
  label: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  value?: string;
}

export class CreateProjectDto {
  @IsString()
  @MinLength(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل' })
  name: string;

  @IsString()
  @MinLength(1, { message: 'الصورة مطلوبة' })
  image: string;

  @IsString()
  @MinLength(20, { message: 'الوصف يجب أن يكون 20 حرف على الأقل' })
  description: string;

  @IsMongoId({ message: 'معرف الفئة غير صحيح' })
  category: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(30)
  gallery?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(20)
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDetailDto)
  @ArrayMaxSize(20)
  details?: ProjectDetailDto[];

  // Deliberately not @IsUrl(): it rejects scheme-less input like "behance.net/x"
  // with an opaque error. The client normalizes before sending instead.
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  projectLink?: string;
}
