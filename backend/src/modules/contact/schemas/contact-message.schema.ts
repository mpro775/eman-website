import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum MessageStatus {
  NEW = 'new',
  READ = 'read',
  REPLIED = 'replied',
  ARCHIVED = 'archived',
}

@Schema({ timestamps: true })
export class ContactMessage extends Document {
  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ trim: true })
  phone: string;

  @Prop({ required: true, trim: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({
    type: String,
    enum: MessageStatus,
    default: MessageStatus.NEW,
  })
  status: MessageStatus;

  @Prop({ type: Types.ObjectId, ref: 'Service' })
  selectedService: Types.ObjectId;

  @Prop({ type: Number, min: 0 })
  budget: number;

  @Prop()
  ipAddress: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ContactMessageSchema =
  SchemaFactory.createForClass(ContactMessage);

ContactMessageSchema.index({ status: 1, createdAt: -1 });
