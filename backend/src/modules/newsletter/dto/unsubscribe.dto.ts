import { IsEmail } from 'class-validator';

export class UnsubscribeDto {
  @IsEmail({}, { message: 'البريد الإلكتروني غير صالح' })
  email: string;
}

