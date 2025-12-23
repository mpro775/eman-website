import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { SubscriberStatus } from '../schemas/newsletter-subscriber.schema';

export class FilterSubscribersDto extends PaginationDto {
  @IsOptional()
  @IsString()
  status?: SubscriberStatus;
}

