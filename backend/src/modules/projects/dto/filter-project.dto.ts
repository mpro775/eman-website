import { IsOptional, IsMongoId } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class FilterProjectDto extends PaginationDto {
  @IsOptional()
  @IsMongoId({ message: 'معرف الفئة غير صحيح' })
  category?: string;
}

