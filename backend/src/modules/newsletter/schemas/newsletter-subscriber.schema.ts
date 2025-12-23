import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum SubscriberStatus {
  SUBSCRIBED = 'subscribed',
  UNSUBSCRIBED = 'unsubscribed',
}

@Schema({ timestamps: true })
export class NewsletterSubscriber extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({
    type: String,
    enum: SubscriberStatus,
    default: SubscriberStatus.SUBSCRIBED,
  })
  status: SubscriberStatus;

  @Prop({ type: Date, required: false, default: null })
  unsubscribedAt: Date | null;

  @Prop()
  ipAddress: string;

  createdAt: Date;
  updatedAt: Date;
}

export const NewsletterSubscriberSchema =
  SchemaFactory.createForClass(NewsletterSubscriber);

NewsletterSubscriberSchema.index({ email: 1 });
NewsletterSubscriberSchema.index({ status: 1, createdAt: -1 });

