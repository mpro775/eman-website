import { IsString, IsMongoId, MinLength } from 'class-validator';

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
}

