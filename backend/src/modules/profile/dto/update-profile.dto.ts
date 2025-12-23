import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class SocialLinkDto {
  @IsString()
  platform: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

class CertificateDto {
  @IsString()
  title: string;

  @IsString()
  issuer: string;

  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  url?: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  cvFile?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLinks?: SocialLinkDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  yearsOfExperience?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  certificates?: CertificateDto[];
}

