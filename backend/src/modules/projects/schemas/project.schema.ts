import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ProjectCategory', required: true })
  category: MongooseSchema.Types.ObjectId;

  @Prop({ trim: true })
  titleAr?: string;

  @Prop({ trim: true })
  subtitle?: string;

  @Prop({ trim: true })
  subtitleAr?: string;

  @Prop({ trim: true })
  descriptionAr?: string;

  @Prop({ type: [String], default: [] })
  tools?: string[];

  @Prop({ trim: true })
  projectLink?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

// Indexes for better performance
ProjectSchema.index({ name: 'text', description: 'text' });
ProjectSchema.index({ category: 1 });

