import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'analytics_events' })
export class AnalyticsEvent extends Document {
  @Prop({ required: true, index: true }) type: string;
  @Prop({ required: true, index: true }) visitorId: string;
  @Prop({ required: true, index: true }) sessionId: string;
  @Prop({ required: true, index: true }) path: string;
  @Prop() title?: string;
  @Prop() referrer?: string;
  @Prop({ index: true }) source: string;
  @Prop() medium: string;
  @Prop() campaignName?: string;
  @Prop() campaignContent?: string;
  @Prop() campaignTerm?: string;
  @Prop() device: string;
  @Prop() browser: string;
  @Prop() os: string;
  @Prop() language?: string;
  @Prop() country?: string;
  @Prop() city?: string;
  @Prop() target?: string;
  @Prop({ default: 0 }) durationMs: number;
  @Prop({ required: true, index: true }) occurredAt: Date;
  @Prop({ required: true, expires: 60 * 60 * 24 * 400 }) expiresAt: Date;
  createdAt: Date;
}

export const AnalyticsEventSchema =
  SchemaFactory.createForClass(AnalyticsEvent);
AnalyticsEventSchema.index({ occurredAt: 1, type: 1 });
AnalyticsEventSchema.index({ sessionId: 1, type: 1, path: 1, occurredAt: 1 });
