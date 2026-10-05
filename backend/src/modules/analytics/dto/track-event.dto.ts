import {
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class TrackEventDto {
  @IsIn([
    'page_view',
    'engagement',
    'contact_click',
    'contact_submit',
    'newsletter_subscribe',
    'external_click',
  ])
  type: string;

  @IsString()
  @MaxLength(120)
  visitorId: string;

  @IsString()
  @MaxLength(120)
  sessionId: string;

  @IsString()
  @MaxLength(500)
  path: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  referrer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  language?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(3600000)
  durationMs?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  target?: string;

  @IsOptional()
  @IsObject()
  campaign?: Record<string, string>;
}
