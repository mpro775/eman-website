import { IsString, IsOptional, IsNumber, MinLength } from 'class-validator';

export class CreateExperienceDto {
    @IsString()
    @MinLength(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
    name: string;

    @IsString()
    @MinLength(10, { message: 'الوصف يجب أن يكون 10 أحرف على الأقل' })
    description: string;

    @IsOptional()
    @IsNumber()
    order?: number;
}
