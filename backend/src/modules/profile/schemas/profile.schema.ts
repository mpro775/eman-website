import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ICertificate {
  title: string;
  issuer: string;
  date: Date;
  url?: string;
}

@Schema({ timestamps: true })
export class Profile extends Document {
  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  bio: string;

  @Prop()
  profileImage: string;

  @Prop()
  cvFile: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: [Object], default: [] })
  socialLinks: ISocialLink[];

  @Prop({ type: Number, default: 0 })
  yearsOfExperience: number;

  @Prop({ type: [Object], default: [] })
  certificates: ICertificate[];

  createdAt: Date;
  updatedAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

