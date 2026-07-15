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

  createdAt: Date;
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

// Indexes for better performance
ProjectSchema.index({ name: 'text', description: 'text' });
ProjectSchema.index({ category: 1 });

