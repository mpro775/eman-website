import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Testimonial extends Document {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true, trim: true })
  personName: string;

  @Prop({ required: true, trim: true })
  companyName: string;

  @Prop({ required: true })
  ratingText: string;

  @Prop({ type: Number, required: true, default: 0 })
  orderNumber: number;

  createdAt: Date;
  updatedAt: Date;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);

// Indexes for better performance
TestimonialSchema.index({ orderNumber: 1 });

