import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AuthorSettings extends Document {
  @Prop({ required: true, trim: true, default: 'إيمان جميل' })
  name: string;

  @Prop({ required: true, trim: true, default: 'كاتب ومتخصص في التكنولوجيا والذكاء الاصطناعي' })
  title: string;

  @Prop({ default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' })
  image: string;

  @Prop({ default: 'عرض المزيد من المقالات' })
  buttonText: string;

  @Prop({ default: '/blog' })
  buttonLink: string;

  @Prop({ default: true })
  isEnabled: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const AuthorSettingsSchema = SchemaFactory.createForClass(AuthorSettings);
