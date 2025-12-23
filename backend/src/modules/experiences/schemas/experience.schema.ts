import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Experience extends Document {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Number, default: 0 })
    order: number;

    createdAt: Date;
    updatedAt: Date;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);

// Indexes for better performance
ExperienceSchema.index({ order: 1 });
