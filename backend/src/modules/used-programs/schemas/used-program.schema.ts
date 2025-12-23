import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UsedProgram extends Document {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: Number, default: 0 })
  orderNumber: number;

  createdAt: Date;
  updatedAt: Date;
}

export const UsedProgramSchema = SchemaFactory.createForClass(UsedProgram);

// Indexes for better performance
UsedProgramSchema.index({ orderNumber: 1 });

