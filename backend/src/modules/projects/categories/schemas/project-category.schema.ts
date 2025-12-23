import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ProjectCategory extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: Number, default: 0 })
  order: number;

  createdAt: Date;
  updatedAt: Date;
}

export const ProjectCategorySchema = SchemaFactory.createForClass(ProjectCategory);

// Indexes for better performance
ProjectCategorySchema.index({ order: 1 });
ProjectCategorySchema.index({ name: 1 });

