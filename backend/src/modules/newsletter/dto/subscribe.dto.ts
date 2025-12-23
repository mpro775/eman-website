import { IsEmail } from 'class-validator';

export class SubscribeDto {
  @IsEmail({}, { message: 'البريد الإلكتروني غير صالح' })
  email: string;
}

