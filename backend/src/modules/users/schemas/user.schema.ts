import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.ADMIN })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  refreshTokens: string[];

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Index for faster queries
UserSchema.index({ email: 1 });

